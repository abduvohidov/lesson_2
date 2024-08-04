import jwt from "jsonwebtoken";
import "dotenv/config";

export class JWTConfig {
    constructor() {
        this.secretKey = process.env.SECRET_KEY;
        if (!this.secretKey) {
            throw new Error("SECRET_KEY is not defined in the environment variables");
        }
    }

    sign(payload, options = {}) {
        return jwt.sign(payload, this.secretKey, options);
    }

    verify(token, options = {}) {
        try {
            return jwt.verify(token, this.secretKey, options);
        } catch (error) {
            throw new Error("Invalid token");
        }
    }
}
