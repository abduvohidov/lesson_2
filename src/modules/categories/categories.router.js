import Router from "express"
import { categoriesModule } from "./index.js"

export const categoryRouter = Router();

categoryRouter.post("/", categoriesModule.create)