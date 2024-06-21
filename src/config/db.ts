import dotenv from "dotenv";
dotenv.config();
import { Sequelize, Op } from "sequelize";
import fs from "fs";
import path from "path";
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_PORT } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
  {
    logging: false,
    native: false,
  }
);

const basename = path.basename(__filename);

interface ModelDefinerModule {
  default: (sequelize: Sequelize) => void;
}

const modelDefiners: ModelDefinerModule[] = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "../models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".ts"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "../models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model.default(sequelize));

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Hospital, AsignacionInsumo, EntregaInsumo, Insumo } = sequelize.models;

// Un Hospital puede tener múltiples Asignaciones de Insumos
Hospital.hasMany(AsignacionInsumo, {
  foreignKey: "hospitalId",
});

// Un Hospital puede tener múltiples Entregas de Insumos
Hospital.hasMany(EntregaInsumo, {
  foreignKey: "hospitalId",
});

// Un Insumo puede estar involucrado en múltiples Asignaciones
Insumo.hasMany(AsignacionInsumo, {
  foreignKey: "insumoId",
});

// Un Insumo puede estar involucrado en múltiples Entregas
Insumo.hasMany(EntregaInsumo, {
  foreignKey: "insumoId",
});

AsignacionInsumo.hasOne(EntregaInsumo, {
  foreignKey: "asignacionId",
});

export { Hospital, AsignacionInsumo, EntregaInsumo, Insumo, Op, sequelize };
