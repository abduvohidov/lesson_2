import Router from "express"
import { categoriesModule } from "./index.js"

export const categoryRouter = Router();

categoryRouter.post("/", categoriesModule.create);
categoryRouter.get("/", categoriesModule.getAll);
categoryRouter.get("/:id", categoriesModule.getById);
categoryRouter.patch("/:id", categoriesModule.update);
categoryRouter.delete("/:id", categoriesModule.remove);