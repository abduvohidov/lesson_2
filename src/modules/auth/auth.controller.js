import { JWTConfig } from "../../config/jwt.js";
import { responseHandler } from "../../utils/response.handler.js";
import { usersSchema } from "../users/users.model.js";
import bcrypt from 'bcrypt';

const { sign } = new JWTConfig();
const { sendError, sendOk } = responseHandler;

class AuthController {
    async login(req, res) {
        try {
            const { username, password } = req.body;

            const user = await usersSchema.findOne({ username: username });

            if (user && await bcrypt.compare(password, user.password)) {
                const token = sign({ id: user._id });
                const responseToken = { user: user, token: token };
                sendOk(res, 200, "Token generated successfully", responseToken);
            } else {
                sendError(res, 404, "Invalid username or password");
            }

        } catch (e) {
            console.log(e);
            sendError(res, 500, e.message);
        }
    }
}

export const authController = new AuthController()