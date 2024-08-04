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
            console.log(category)


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

}

export const categoriesModule = new CategoriesModule()