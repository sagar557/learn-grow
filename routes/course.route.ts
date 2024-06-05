import express  from "express";
import { addAnswer, addQuestion, addReplyToReview, addReview, deleteCourse, editCourse, generateVideoUrl, getAdminAllCourses, getAllCourses, getCourseByUser, getSingleCourse, uploadCourse } from './../controllers/course.controller';
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
const courseRouter = express.Router();

// courseRouter.post("/create-course", updateAccessToken, , authorizeRoles("admin"),uploadCourse);
courseRouter.post("/create-course",isAuthenticated, authorizeRoles("admin"),uploadCourse);
courseRouter.put("/edit-course/:id", authorizeRoles("admin"),editCourse);
courseRouter.get("/get-course/:id", getSingleCourse);
courseRouter.get("/get-courses", getAllCourses);
courseRouter.get("/get-admin-courses", authorizeRoles("admin"), getAdminAllCourses );

courseRouter.get("/get-course-content/:id",getCourseByUser);
courseRouter.put("/add-question", addQuestion);
courseRouter.put("/add-answer", addAnswer);
courseRouter.put("/add-review/:id", addReview);
courseRouter.put("/add-reply",authorizeRoles("admin"), addReplyToReview);

courseRouter.get("/get-courses",authorizeRoles("admin"), getAllCourses);
courseRouter.post("/get-video-cipherOTP", generateVideoUrl);

courseRouter.delete("/delete-courses/:id",authorizeRoles("admin"), deleteCourse);






export default courseRouter;
