import express from "express"
import { router } from "./routes/index.js"
import { mongo } from "./config/mongo.js"
import "dotenv/config";

const app = express()
const PORT = process.env.PORT || 9000
mongo()
    .then(() => console.log("db was  connected"))
    .catch((err) => console.log(err))

app.use(express.json())
app.use("/api/v1", router)

app.listen(PORT, () => console.log(`server is running on port: http://localhost:${PORT}`))