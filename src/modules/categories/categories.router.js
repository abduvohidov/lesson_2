import Router from "express"
import { categoriesModule } from "./index.js"
import { verification } from "../../middlewares/verification.js"

export const categoryRouter = Router();

categoryRouter.post("/", verification.role('admin'), categoriesModule.create);
categoryRouter.get("/", categoriesModule.getAll);
categoryRouter.get("/:id", categoriesModule.getById);
categoryRouter.patch("/:id", verification.role('admin'), categoriesModule.update);
categoryRouter.delete("/:id", verification.role('admin'), categoriesModule.remove);