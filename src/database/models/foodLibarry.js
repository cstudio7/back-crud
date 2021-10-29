// import db from "./index";
module.exports = (sequelize, DataTypes) => {
    const foodLibrary = sequelize.define('foodLibrary',
        {
            userId: { type: DataTypes.UUID, defaultValue: DataTypes.UUID },
            details: { type: DataTypes.STRING }
        },
        {}
    );
    foodLibrary.associate = (models) => {
        // association goes here
    };
    return foodLibrary;
};
