import { Router } from "express"
import { responseHandler } from "../utils/response.handler.js"

const { sendError, sendOk } = responseHandler
export const router = Router()

router.use('*', (_, res) => {
    sendError(res, 404, "Uncorrent url location")
})