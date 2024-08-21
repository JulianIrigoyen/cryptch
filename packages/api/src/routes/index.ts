import { Router } from "express";

import testRoute from "./test/route.js";

const router = Router();

router.use("/test", testRoute);

// User API
router.use("/login", testRoute);
router.use("/get-users", testRoute);
router.use("/get-likes", testRoute);

// Mission API
router.use("/create-mission", testRoute);
router.use("/end-mission", testRoute);
router.use("/get-missions", testRoute);

// $BLENDER API
router.use("/mint-token", testRoute);
router.use("/send-token", testRoute);
router.use("/burn-token", testRoute);

export default router;
