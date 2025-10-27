import cookieParser from "cookie-parser";
import express from "express"
import cors from "cors"
import "dotenv/config"
import { connectDB } from "./config/db.js";
import userRouter from "./routes/userRoute.js";
import sellerRouter from "./routes/sellerRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import addressRouter from "./routes/addressRoute.js";
import orderRouter from "./routes/orderRoute.js";

const app = express();

const PORT = process.env.PORT || 3000;

await connectDB()

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

// product Routes
app.use("api/product", productRouter)

// cart Route
app.use("api/cart", cartRouter)

// address Routes
app.use("api/address", addressRouter)

// order routes
app.use("/api/order", orderRouter)

app.listen(PORT, ()=> {
    console.log(`http://localhost:${PORT}`)
});
