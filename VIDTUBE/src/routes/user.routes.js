import { Router } from "express";
import { registerUser, logoutUser } from "../controllers/user.controller.js";

import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router();

// /api/v1/healthcheck/test

router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  registerUser
);

//secured routes

router.route("/logout").post(verifyJWT, logoutUser);

// // Optional test route
// router.get("/healthcheck", (req, res) => {
//   res.status(200).json({ success: true, message: "User route is working 🚀" });
// });

export default router;
