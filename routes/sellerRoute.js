import express from "express"
import { isSellerAuth, sellerLogin, sellerLogout } from "../controllers/sellerController.js";
import { authSeller } from "../middlewares/authSeller.js";

const sellerRouter = express.Router();

sellerRouter.post("/sellerLogin", sellerLogin)
sellerRouter.get("/isSellerAuth", authSeller, isSellerAuth)
sellerRouter.get("/sellerLogout", sellerLogout)

export default sellerRouter;