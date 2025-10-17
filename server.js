import cookieParser from "cookie-parser";
import express from "express"
import cors from "cors"
import "dotenv/config"
import { connectDB } from "./config/db.js";
import userRouter from "./routes/userRoute.js";

const app = express();

const PORT = process.env.PORT || 3000;

await connectDB()

// allow multiple origins
const allowedOrigin = ["http://localhost:5173"]

// middleware configuration
app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: allowedOrigin, credentails: true}))


app.get("/", (req, res)=>{
    res.send("Home")
})

// user Routes
app.use("/api/user", userRouter)

app.listen(PORT, ()=> {
    console.log(`http://localhost:${PORT}`)
});
