import express from "express";
import {
  getAsignaciones,
  getAsignacionesById,
  saveAsignaciones,
  updateAsignaciones,
  removeAsignaciones,
} from "../controllers/asignacionController";

const router = express.Router();

// GET /asignaciones: Ver todas las asignaciones de insumos a hospitales.
// POST /asignaciones: Crear una nueva asignación de insumos a un hospital.
// PUT /asignaciones/:id: Modificar una asignación existente.
// DELETE /asignaciones/:id: Eliminar una asignación.
//REVISAR QUE TENGAN BORRADO LOGICO

router.get("/", getAsignaciones);
router.get("/:id", getAsignacionesById);
router.post("/", saveAsignaciones);
router.put("/:id", updateAsignaciones);
router.delete("/:id", removeAsignaciones);

export default router;
