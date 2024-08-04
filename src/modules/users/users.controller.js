import { responseHandler } from "../../utils/response.handler.js";
import { usersSchema } from "./index.js";

const { sendError, sendOk } = responseHandler;

class UsersModule {

    async create(req, res) {
        try {
            const { body } = req;

            if (!body) {
                sendError(res, 404, "Request body is empty or undefined.");
                return;
            }

            const { username, email, password, role } = body;

            if (!username || !email || !password || !role) {
                sendError(res, 400, "Username, email, password, and role are required.");
                return;
            }

            let user = await usersSchema.create({ username, email, password, role });

            if (user) {
                user.save();
                sendOk(res, 200, "User added successfully", user);
                return;
            } else {
                sendError(res, 500, "Server error");
                return;
            }

        } catch (error) {
            sendError(res, 500, error.message);
            return;
        }
    }

    async getAll(req, res) {
        try {
            const users = await usersSchema.find();
            sendOk(res, 200, 'Users data received successfully', users);
            return;
        } catch (error) {
            sendError(res, 500, error.message);
            return;
        }
    }

    async getById(req, res) {
        try {
            const { id } = req.params;
            const user = await usersSchema.findById(id);

            if (user) {
                sendOk(res, 200, 'User data received successfully', user);
                return;
            } else {
                sendError(res, 404, "User not found");
                return;
            }
        } catch (error) {
            sendError(res, 500, error.message);
            return;
        }
    }

    async update(req, res) {
        const { body, params } = req;

        if (!body) {
            sendError(res, 404, "Request body is empty or undefined");
            return;
        }

        if (!params || !params.id) {
            sendError(res, 404, "Request params is empty or undefined");
            return;
        }

        try {
            const { username, email, password, role } = body;
            const { id } = params;

            const user = await usersSchema.findById(id);

            if (user) {
                await usersSchema.updateOne({ _id: id }, { username, email, password, role });
                sendOk(res, 200, "User updated successfully", user);
                return;
            } else {
                sendError(res, 404, "User not found");
                return;
            }
        } catch (error) {
            sendError(res, 500, error.message);
            return;
        }
    }

    async remove(req, res) {
        const { params } = req;

        if (!params || !params.id) {
            sendError(res, 404, "Request params is empty or undefined");
            return;
        }

        try {
            const { id } = params;

            const user = await usersSchema.findById(id);

            if (user) {
                await usersSchema.deleteOne({ _id: id });
                sendOk(res, 200, "User deleted successfully", user);
                return;
            } else {
                sendError(res, 404, "User not found");
                return;
            }
        } catch (error) {
            sendError(res, 500, error.message);
            return;
        }
    }
}

export const usersModule = new UsersModule();
