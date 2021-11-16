// import db from "./index";
module.exports = (sequelize, DataTypes) => {
    const medLibrary = sequelize.define('medLib',
        {
            userId: { type: DataTypes.UUID, defaultValue: DataTypes.UUID },
            details: { type: DataTypes.JSONB }
        },
        {}
    );
    medLibrary.associate = (models) => {
        // association goes here
    };
    return medLibrary;
};
