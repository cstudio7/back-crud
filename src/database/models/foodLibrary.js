// import db from "./index";
module.exports = (sequelize, DataTypes) => {
    const foodLib = sequelize.define('foodLib',
        {
            userId: { type: DataTypes.UUID, defaultValue: DataTypes.UUID },
            details: { type: DataTypes.JSONB }
        },
        {}
    );
    foodLib.associate = (models) => {
        // association goes here
    };
    return foodLib;
};
