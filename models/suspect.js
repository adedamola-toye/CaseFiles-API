const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");


class Suspect extends Model {}

Suspect.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    known_aliases: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_seen_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    last_seen_location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    case_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Cases",  
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "Suspect",
    timestamps: true,
  }
);




module.exports = Suspect;
