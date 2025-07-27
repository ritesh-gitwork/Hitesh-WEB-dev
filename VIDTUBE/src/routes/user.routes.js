import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";

import { upload } from "../middlewares/multer.middleware.js";

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

// // Optional test route
// router.get("/healthcheck", (req, res) => {
//   res.status(200).json({ success: true, message: "User route is working 🚀" });
// });

export default router;
