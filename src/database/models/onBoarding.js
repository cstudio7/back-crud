// import db from "./index";
module.exports = (sequelize, DataTypes) => {
    const onBoarding = sequelize.define('onBoarding',
        {
            userId: { type: DataTypes.UUID, defaultValue: DataTypes.UUID },
            manage: { type: DataTypes.STRING },
            typeOfDiabetes: { type: DataTypes.STRING },
            habit: { type: DataTypes.STRING },
            habitDetails: { type: DataTypes.STRING },
            improvement: { type: DataTypes.BOOLEAN },
            habitManagement: {
                type: DataTypes.ARRAY(DataTypes.STRING ),
            },
            conditionOfHypertension:{ type: DataTypes.STRING },
            diagnosedDate: { type: DataTypes.DATE },
            diagnosedStyle: { type: DataTypes.STRING },
            insulin: { type: DataTypes.BOOLEAN },
            relatedComplication: {
                type: DataTypes.ARRAY(DataTypes.STRING ),
            },
            comorbidities: {
                type: DataTypes.ARRAY(DataTypes.STRING ),
            },
            onMedication: { type: DataTypes.BOOLEAN },
            medicationInterval: { type: DataTypes.STRING },
            medicationDetails: {
                type: DataTypes.ARRAY(DataTypes.JSON),
            },
            averageBloodGlucose: { type: DataTypes.STRING },
            averageBloodPressure: { type: DataTypes.STRING },
            bloodGlucose: { type: DataTypes.STRING },
            weight:  { type: DataTypes.STRING },
            height:  { type: DataTypes.STRING },
            mainGoal: {
                type: DataTypes.ARRAY(DataTypes.STRING),
            },
            isCareTeamPresent: { type: DataTypes.BOOLEAN },
            careTeam: {
                type: DataTypes.ARRAY(DataTypes.STRING),
            },
            isCareTeamList: { type: DataTypes.BOOLEAN },
            progressRate:{ type: DataTypes.STRING },
            needsACareTeam: { type: DataTypes.BOOLEAN },
            foodTimetable: { type: DataTypes.BOOLEAN },
            personalizedFoodTimetable: { type: DataTypes.BOOLEAN }
        },
        {}
    );
    onBoarding.associate = (models) => {
        // association goes here
    };
    return onBoarding;
};
