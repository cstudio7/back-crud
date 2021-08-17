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
            medicationDetails: {
                type: DataTypes.ARRAY(DataTypes.JSON),
            },
            mainGoal: {
                type: DataTypes.ARRAY(DataTypes.STRING),
                allowNull: true,
            },
            careTeam:{
                type: DataTypes.ARRAY(DataTypes.STRING),
                allowNull: true,
            },
        },
        {}
    );
    onBoarding.associate = (models) => {
        // association goes here
    };
    return onBoarding;
};
