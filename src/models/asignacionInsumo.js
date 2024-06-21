import { Sequelize, DataTypes } from "sequelize";

export default (sequelize) => {
  sequelize.define(
    "AsignacionInsumo",
    {
      asignacionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      hospitalId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      insumoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      cantidadAsignada: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          min: 0,
        },
      },
      fechaAsignacion: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      asignado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      borrado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
