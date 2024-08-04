import { Router } from "express"
import { responseHandler } from "../utils/response.handler.js"
import { categoryRouter } from "../modules/index.js"

const { sendError, sendOk } = responseHandler
export const router = Router()

router.use('/categories', categoryRouter)
router.use('*', (_, res) => {
    sendError(res, 404, "Uncorrent url location")
})