import { JWTConfig } from "../config/jwt.js";
import { responseHandler } from "../utils/response.handler.js";
import { usersSchema } from "../modules/users/index.js";

const { verify } = new JWTConfig();
const { sendError, sendOk } = responseHandler;

class Verification {
    role(...roles) {
        return async (req, res, next) => {
            try {
                const token = req.headers['token'];
                if (!token) {
                    sendError(res, 403, "Invalid token");
                    return;
                }

                const { id } = verify(token);

                const user = await usersSchema.findById(id);

                if (user) {
                    if (roles.includes(user.role)) {
                        next();
                    } else {
                        sendError(res, 403, "User isn't authorized");
                        return;
                    }
                } else {
                    sendError(res, 404, "User not found");
                    return;
                }
            } catch (error) {
                sendError(res, 500, error.message);
                return;
            }
        }
    }
}

export const verification = new Verification()
