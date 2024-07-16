import express from "express";
import userSignup from "../controller/userSignup.js";
import userSignin from "../controller/userSignin.js";
import userDetail from "../controller/userDetail.js";
import authToken from "../middleware/authToken.js";
import userLogout from "../controller/userLogout.js";
import allUsers from "../controller/allUsers.js";
import updateUser from "../controller/updateUser.js";
import uploadProduct from "../controller/uploadProduct.js";
import getProduct from "../controller/getProduct.js";
import getCategory from "../controller/getCategory.js";
import getCategoryWiseProducts from "../controller/getCatrgoryWiseProducts.js";
import getProductDetails from "../controller/getProductDetails.js";
import addToCart from "../controller/addToCart.js";
import countCart from "../controller/countCart.js";
import viewCart from "../controller/viewCart.js";
import updateCart from "../controller/updateCart.js";
import deleteProduct from "../controller/deleteProduct.js";


const router = express.Router()
router.post("/signup",userSignup);
router.post("/login",userSignin);
router.get("/user-details",authToken,userDetail);
router.delete("/logout",userLogout);

router.get("/admin/all-users",authToken,allUsers);
router.post("/admin/update-user",authToken,updateUser);

router.post("/admin/upload-product",authToken,uploadProduct);
router.get("/admin/get-product",authToken,getProduct);
router.get("/get-category",getCategory);
router.post("/category-product",getCategoryWiseProducts);
router.post("/product-details",getProductDetails);

router.post("/addToCart",authToken,addToCart)
router.get("/countCart",authToken,countCart)
router.get("/viewCart",authToken,viewCart);
router.post("/updateCart",authToken,updateCart);
router.post("/deleteProduct",authToken,deleteProduct);

export default router;