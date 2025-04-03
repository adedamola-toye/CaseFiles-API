const {Model, DataTypes} = require("sequelize")
const sequelize = require("../config/database")
const Suspect = require("./suspect")

class Case extends Model{}

Case.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey:true,
            allowNull:false,
            defaultValue: DataTypes.UUIDV4
        },
        title: {
            type:DataTypes.STRING,
            allowNull: false
        },
        description: {
            type:DataTypes.TEXT,
            allowNull: false
        },
        location: {
            type:DataTypes.STRING,
            allowNull: false
        },
        date: {
            type:DataTypes.DATE,
            allowNull: false
        },
        status: {
            type:DataTypes.ENUM('Unsolved', 'Solved'),
            allowNull: false,
            defaultValue: "Unsolved"
        },
    },
    {
        sequelize,
        modelName: "Case",
        timestamps:true,
    }
);

Case.hasMany(Suspect)

Suspect.belongsTo(Case)

module.exports = Case;