import express from "express";
const relaxationRouter = express.Router();
import { userAuth } from "../middlewares/userAuth.js";
import {
  getRelaxationActivities,
  startRelaxationActivity,
  completeRelaxationActivity,
} from "../controllers/relaxationHub.controllers.js";

// Relaxation Hub Endpoints
relaxationRouter.get(
  "/relaxation/activities",
  userAuth,
  getRelaxationActivities
);

relaxationRouter.post(
  "/relaxation/activities/:activityId/start",
  userAuth,
  startRelaxationActivity
);

relaxationRouter.post(
  "/relaxation/activities/:sessionId/complete",
  userAuth,
  completeRelaxationActivity
);

export default relaxationRouter;
