import express from "express";
import {
  getEntregas,
  saveEntregas,
  updateEntregas,
  removeEntregas,
} from "../controllers/entregaController";

const router = express.Router();

// GET /entregas: Listar todas las entregas realizadas a los hospitales.
// POST /entregas: Registrar una nueva entrega de insumos a un hospital.
// PUT /entregas/:id: Actualizar los detalles de una entrega.
// DELETE /entregas/:id: Cancelar o eliminar un registro de entrega.
//REVISAR QUE TENGAN BORRADO LOGICO

router.get("/", getEntregas);
router.post("/", saveEntregas);
router.put("/:id", updateEntregas);
router.delete("/:id", removeEntregas);

export default router;
