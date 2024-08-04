import Router from "express";
import { usersModule } from "./index.js";

export const usersRouter = Router();

usersRouter.post("/", usersModule.create);
usersRouter.get("/", usersModule.getAll);
usersRouter.get("/:id", usersModule.getById);
usersRouter.patch("/:id", usersModule.update);
usersRouter.delete("/:id", usersModule.remove);
