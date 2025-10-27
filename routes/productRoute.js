import express from "express"
<<<<<<< HEAD
import { addProduct, changeStock, productById, productList } from "../controllers/productController.js"
import { upload } from "../config/multer.js"
import {authSeller} from "../middlewares/authSeller.js"
const productRouter = express.Router()

productRouter.post("/add", upload([images]), authSeller , addProduct)
productRouter.post("/list",  productList)
productRouter.post("/id", productById)
productRouter.post("/stock", changeStock)
=======
import { upload } from "../config/multer.js";
import { authSeller } from "../middlewares/authSeller.js";
import { addProduct, changeStock, productById, productList } from "../controllers/productController.js";
const productRouter = express.Router();

productRouter.post('/add', upload.array([images]), authSeller, addProduct)
productRouter.get('/list', productList)
productRouter.get('/id', productById)
productRouter.post('/stock', authSeller, changeStock)
>>>>>>> bae04014d289be2616c472ed0c5aeb4e86e43fdc

export default productRouter