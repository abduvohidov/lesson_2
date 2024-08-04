import { Router } from "express"
import { responseHandler } from "../utils/response.handler.js"
import { categoryRouter, moviesRouter, usersRouter } from "../modules/index.js"
const { sendError } = responseHandler

export const router = Router()

router.use('/categories', categoryRouter)
router.use('/users', usersRouter)
router.use('/movies', moviesRouter)
router.use('*', (_, res) => {
    sendError(res, 404, "Uncorrent url location")
})