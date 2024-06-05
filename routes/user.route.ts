import express  from "express";
import { activateUser,deleteUser,getAllUsers,getUserInfo,loginUser, logoutUser, registrationUser, socialAuth, updatePassword, updateProfilePicture, updateUserInfo, updateUserRole } from "../controllers/user.controller";
import { authorizeRoles } from "../middleware/auth";
const userRouter = express.Router();

userRouter.post("/registration",registrationUser);
userRouter.post("/activate-user", activateUser);
userRouter.post("/login", loginUser);
// userRouter.get("/logout",authorizeRoles("admin"), logoutUser);
userRouter.get("/logout", logoutUser);
userRouter.get("/refresh",);
userRouter.get("/me" , getUserInfo);

userRouter.post("/social-auth",socialAuth);
userRouter.put("/update-user-info", updateUserInfo);

userRouter.put("/update-user-password", updatePassword);
userRouter.put("/update-user-avatar", updateProfilePicture);
userRouter.get("/get-users", authorizeRoles("admin"), getAllUsers);
userRouter.put("/update-user", authorizeRoles("admin"), updateUserRole);
userRouter.delete("/delete-user/:id", authorizeRoles("admin"), deleteUser);






export default userRouter;


