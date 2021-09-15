// import db from "./index";
module.exports = (sequelize, DataTypes) => {
    const onBoarding = sequelize.define('onBoarding',
        {
            userId: { type: DataTypes.UUID, defaultValue: DataTypes.UUID },
            manage: { type: DataTypes.STRING, allowNull: false },
            typeOfDiabetes: { type: DataTypes.STRING },
            diagnosedDate: { type: DataTypes.STRING },
            diagnosedStyle: { type: DataTypes.STRING },
            insulin: { type: DataTypes.BOOLEAN },
            diabetesRelatedComplication: { type: DataTypes.STRING },
            comorbidities: { type: DataTypes.STRING },
            onMedication: { type: DataTypes.BOOLEAN },
            medicationInterval: { type: DataTypes.STRING },
            medicationDetails: {
                type: DataTypes.ARRAY(DataTypes.JSON),
            },
            averageBloodGlucose: { type: DataTypes.STRING },
            mainGoal: {
                type: DataTypes.ARRAY(DataTypes.JSON),
            },
            careTeam:{
                type: DataTypes.ARRAY(DataTypes.STRING)
            },
        },
        {}
    );
    onBoarding.associate = (models) => {
        // association goes here
    };
    return onBoarding;
};
