import { Sequelize, DataTypes } from "sequelize";

export default (sequelize: Sequelize) => {
  sequelize.define(
    "EntregaInsumo",
    {
      entregaId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      asignacionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      hospitalId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      insumoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      cantidadEntregada: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          min: 0,
        },
      },
      fechaEntrega: {
        type: DataTypes.DATE,
        allowNull: false,
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
