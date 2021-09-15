// import db from "./index";
module.exports = (sequelize, DataTypes) => {
    const onBoardingType = sequelize.define('onBoardingType',
        {
            form: {
                type: DataTypes.ARRAY(DataTypes.ARRAY),
            },
        },
        {}
    );
    onBoardingType.associate = (models) => {
        // association goes here
    };
    return onBoardingType;
};
