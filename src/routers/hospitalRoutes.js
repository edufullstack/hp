import express from "express";
import {
  getHospitals,
  saveHospital,
  updateHospital,
  removeHospital,
} from "../controllers/hospitalController";

const router = express.Router();

router.get("/", getHospitals);
router.post("/", saveHospital);
router.put("/:id", updateHospital);
router.delete("/:id", removeHospital);

export default router;
