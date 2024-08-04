import Router from "express";
import { moviesModule } from "./index.js";
import { verification } from "../../middlewares/verification.js"

export const moviesRouter = Router();

moviesRouter.post("/", verification.role('admin'), moviesModule.create);
moviesRouter.get("/", moviesModule.getAll);
moviesRouter.get("/:id", moviesModule.getById);
moviesRouter.patch("/:id", verification.role('admin'), moviesModule.update);
moviesRouter.delete("/:id", verification.role('admin'), moviesModule.remove);
