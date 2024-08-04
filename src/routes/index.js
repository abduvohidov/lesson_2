import { Router } from "express"
import { responseHandler } from "../utils/response.handler.js"
import { categoryRouter, moviesRouter, usersRouter, authRouter } from "../modules/index.js"
const { sendError } = responseHandler

export const router = Router()

router.use('/categories', categoryRouter)
router.use('/users', usersRouter)
router.use('/movies', moviesRouter)
router.use('/login', authRouter)
router.use('*', (_, res) => {
    sendError(res, 404, "Uncorrent url location")
})