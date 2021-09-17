// import db from "./index";
module.exports = (sequelize, DataTypes) => {
    const onBoarding = sequelize.define('onBoarding',
        {
            userId: { type: DataTypes.UUID, defaultValue: DataTypes.UUID },
            manage: { type: DataTypes.STRING, allowNull: false },
            typeOfDiabetes: { type: DataTypes.STRING },
            habit: { type: DataTypes.STRING },
            habitDetails: { type: DataTypes.STRING },
            conditionOfHypertension:{ type: DataTypes.STRING },
            diagnosedDate: { type: DataTypes.STRING },
            diagnosedStyle: { type: DataTypes.STRING },
            insulin: { type: DataTypes.BOOLEAN },
            relatedComplication: { type: DataTypes.STRING },
            comorbidities: { type: DataTypes.STRING },
            onMedication: { type: DataTypes.BOOLEAN },
            medicationInterval: { type: DataTypes.STRING },
            medicationDetails: {
                type: DataTypes.ARRAY(DataTypes.JSON),
            },
            averageBloodGlucose: { type: DataTypes.STRING },
            bloodGlucose: { type: DataTypes.JSONB },
            weight:  { type: DataTypes.JSONB },
            height:  { type: DataTypes.JSONB },
            mainGoal: {
                type: DataTypes.ARRAY(DataTypes.STRING),
            },
            isCareTeamPresent: { type: DataTypes.BOOLEAN },
            isCareTeamList: { type: DataTypes.BOOLEAN },
            progressRate:{ type: DataTypes.STRING },
            needsACareTeam: { type: DataTypes.BOOLEAN },
        },
        {}
    );
    onBoarding.associate = (models) => {
        // association goes here
    };
    return onBoarding;
};
