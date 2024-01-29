import { Router } from "express";
import hospitalRouter from "./hospitalRoutes";
import insumosRouter from "./insumoRoutes";
import asignacionesRouter from "./asignacionRoutes";
import entregaRouter from "./entregaRoutes";

const router = Router();

router.use("/hospital", hospitalRouter);
router.use("/insumos", insumosRouter);
router.use("/asignaciones", asignacionesRouter);
router.use("/entregas", entregaRouter);

export default router;
