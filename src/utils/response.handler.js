class ResponseHandler {
    sendOk(res, statusCode, msg = "success", data = []) {
        res.status(statusCode).send({
            success: true,
            message: msg,
            data: data
        });
    }

    sendError(res, statusCode = 500, message = "An error occurred", error = []) {
        res.status(statusCode).send({
            success: false,
            message: message,
            data: error
        });
    }
}

export const responseHandler = new ResponseHandler()