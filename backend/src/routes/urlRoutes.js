// backend/src/routes/urlRoutes.js
import { Router } from "express";
import { shortenUrl, redirectUrl, listUrls } from "../controllers/urlController.js";

const router = Router();

router.post("/shorten", shortenUrl);
router.get("/:shortId", redirectUrl);
router.get("/list/all", listUrls);

export default router;
