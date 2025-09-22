import express from "express"
import {getAllUsers,getUser,updateUser,createUser,deleteUser} from "../controller/userController.js"

const router =  express.Router()

router.use((req,res,next)=>{
    console.log("user route  middleware runs");
    next();
});

router.get("/",getAllUsers);
router.post("/create",createUser);
router.route("/:id").put(updateUser).delete(deleteUser).get(getUser)

export default router;