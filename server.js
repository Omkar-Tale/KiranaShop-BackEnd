import cookieParser from "cookie-parser";
import express from "express"
import cors from "cors"
import "dotenv/config"
import { connectDB } from "./config/db.js";
import userRouter from "./routes/userRoute.js";
import sellerRouter from "./routes/sellerRoute.js";
<<<<<<< HEAD
=======
import { connectCloudinary } from "./config/cloudnary.js";
>>>>>>> bae04014d289be2616c472ed0c5aeb4e86e43fdc
import productRouter from "./routes/productRoute.js";

const app = express();

const PORT = process.env.PORT || 3000;

await connectDB();
await connectCloudinary()

// allow multiple origins
const allowedOrigin = ["http://localhost:5173"]

// middleware configuration
app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: allowedOrigin, credentials: true}))


app.get("/", (req, res)=>{
    res.send("Home")
})

// user Routes
app.use("/api/user", userRouter)

// seller Routes
app.use("/api/seller", sellerRouter)

<<<<<<< HEAD
// product Routes
app.use("api/product", productRouter)
=======
// product router
app.use("api/product", productRouter)

>>>>>>> bae04014d289be2616c472ed0c5aeb4e86e43fdc

app.listen(PORT, ()=> {
    console.log(`http://localhost:${PORT}`)
});
