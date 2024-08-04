import { responseHandler } from "../../utils/response.handler.js"
import { categoriesSchema } from "./index.js"
const { sendError, sendOk } = responseHandler

class CategoriesModule {

    async create(req, res) {
        try {
            const { body } = req

            if (!body) {
                sendError(res, 404, "Request body is empty or undefined.")
            }


            const { name } = body

            if (!name) {
                sendError(res, 400, "Category name is required.");
                return
            }

            let category = await categoriesSchema.create({ name })

            if (category) {
                category.save()
                sendOk(res, 200, "category added successfully", category)
                return
            } else {
                sendError(res, 500, "server error")
                return
            }

        } catch (error) {
            sendError(res, 500, error.message);
            return
        }
    }

    async getAll(req, res) {
        try {
            const categories = await categoriesSchema.find();
            sendOk(res, 200, 'Categories data received successfully', categories);
            return
        } catch (error) {
            sendError(res, 500, error.message);
            return
        }
    }

    async getById(req, res) {
        try {
            const { id } = req.params
            const categories = await categoriesSchema.findById(id);
            console.log(categories)
            sendOk(res, 200, 'Categories data received successfully', categories);
            return
        } catch (error) {
            sendError(res, 500, error.message);
            return
        }
    }

    async update(req, res) {
        const { body, params } = req


        if (!body) {
            sendError(res, 404, "Request body is empty or undefined");
            return
        }

        if (!params || !params.id) {
            sendError(res, 404, "Request params is empty or undefined");
            return
        }
        try {
            const { name } = body
            const { id } = params

            const category = await categoriesSchema.findById(id);

            if (category) {
                await categoriesSchema.updateOne({ _id: id }, { name });
                sendOk(res, 200, "Category updated successfully", category);
                return
            } else {
                sendError(res, 404, "This identifier was not found")
                return
            }
        } catch (error) {
            sendError(res, 500, error.message)
            return
        }
    }

    async remove(req, res) {
        const { body, params } = req


        if (!body) {
            sendError(res, 404, "Request body is empty or undefined");
            return
        }

        if (!params || !params.id) {
            sendError(res, 404, "Request params is empty or undefined");
            return
        }
        try {
            const { name } = body
            const { id } = params

            const category = await categoriesSchema.findById(id);

            if (category) {
                await categoriesSchema.deleteOne({ _id: id }, { name });
                sendOk(res, 200, "Category deleted successfully", category);
                return
            } else {
                sendError(res, 404, "This identifier was not found")
                return
            }
        } catch (error) {
            sendError(res, 500, error.message)
            return
        }
    }

}

export const categoriesModule = new CategoriesModule()