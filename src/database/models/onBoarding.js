// import db from "./index";
module.exports = (sequelize, DataTypes) => {
    const onBoarding = sequelize.define('onBoarding',
        {
            userId: { type: DataTypes.UUID, defaultValue: DataTypes.UUID },
            typeOfDiabetes: { type: DataTypes.STRING, allowNull: false },
            diagnosedDate: { type: DataTypes.STRING, allowNull: false },
            insulin: { type: DataTypes.BOOLEAN, allowNull: false },
            diabetesRelatedComplication: { type: DataTypes.STRING, allowNull: false },
            comorbidities: { type: DataTypes.STRING, allowNull: false },
            onMedication: { type: DataTypes.BOOLEAN, allowNull: false },
            medicationDetails1: { type: DataTypes.JSONB},
            medicationDetails2: { type: DataTypes.JSONB },
        },
        {}
    );
    onBoarding.associate = (models) => {
        // association goes here
    };
    return onBoarding;
};
