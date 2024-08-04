import Router from "express";
import { moviesModule } from "./index.js";

export const moviesRouter = Router();

moviesRouter.post("/", moviesModule.create);
moviesRouter.get("/", moviesModule.getAll);
moviesRouter.get("/:id", moviesModule.getById);
moviesRouter.patch("/:id", moviesModule.update);
moviesRouter.delete("/:id", moviesModule.remove);
