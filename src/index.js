import express from "express"
import { router } from "./routes/index.js"
import { mongo } from "./config/mongo.js"

const app = express()
const PORT = 9000
mongo()
    .then(() => console.log("db was  connected"))
    .catch((err) => console.log(err))

app.use(express.json())
app.use("/", router)

app.listen(PORT, () => console.log(`server is running on port: http://localhost:${PORT}`))