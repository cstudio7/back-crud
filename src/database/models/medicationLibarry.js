// import db from "./index";
module.exports = (sequelize, DataTypes) => {
    const medLibrary = sequelize.define('medLibrary',
        {
            userId: { type: DataTypes.UUID, defaultValue: DataTypes.UUID },
            details: { type: DataTypes.STRING }
        },
        {}
    );
    medLibrary.associate = (models) => {
        // association goes here
    };
    return medLibrary;
};
