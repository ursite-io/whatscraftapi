import { Router } from "express";
import srv from "../services/sendMessages";
const router = Router();
router.post('/', srv.sendMessage);
export default router;