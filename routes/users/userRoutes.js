const express=require("express");
const { resgisterUserController, loginUserController, profileUserController, deleteUserController, updateUserController } = require("../../Controllers/users/usersCtrl");
const isLogin = require("../../middlewares/isLogin");
const userRoute=express.Router();



//Post/api/v2/users/register
userRoute.post("/register",resgisterUserController);


//Post/api/v2/users/login
userRoute.post("/login",loginUserController);


//GET/api/v2/users/profile:id
userRoute.get("/profile/",isLogin,profileUserController);

//DELETE/api/v2/users/profile:id
userRoute.delete("/",isLogin,deleteUserController);

//PUT/api/v2/users/profile
userRoute.put("/",isLogin,updateUserController);



module.exports=userRoute;
