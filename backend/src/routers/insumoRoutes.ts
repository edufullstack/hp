import express from "express";
import {
  getInsumos,
  getInsumosById,
  saveInsumo,
  updateInsumo,
  removeInsumo,
} from "../controllers/insumoController";

const router = express.Router();

// GET /insumos: Listar todos los insumos disponibles.
// POST /insumos: Añadir un nuevo insumo al inventario.
// PUT /insumos/:id: Actualizar la información o cantidad de un insumo.
// DELETE /insumos/:id: Eliminar un insumo del inventario.
//REVISAR QUE TENGAN BORRADO LOGICO

router.get("/", getInsumos);
router.get("/:id", getInsumosById);
router.post("/", saveInsumo);
router.put("/:id", updateInsumo);
router.delete("/:id", removeInsumo);

export default router;
