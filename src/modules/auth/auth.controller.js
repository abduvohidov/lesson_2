import { JWTConfig } from "../../config/jwt.js";
import { responseHandler } from "../../utils/response.handler.js";
import { usersSchema } from "../users/index.js";
import bcrypt from 'bcrypt';

const { sign } = new JWTConfig();
const { sendError, sendOk } = responseHandler;

class AuthController {
    async login(req, res) {
        try {
            const { username, password } = req.body;

            const user = await usersSchema.findOne({ username });

            if (user && await bcrypt.compare(password, user.password)) {
                const token = sign({ id: user._id });
                const responseToken = { user, token };
                sendOk(res, 200, "Token generated successfully", responseToken);
                return
            } else {
                sendError(res, 401, "Invalid username or password");
                return
            }

        } catch (e) {
            console.error(e);
            sendError(res, 500, "Server error");
        }
    }
}

export const authController = new AuthController();
