// import db from "./index";
module.exports = (sequelize, DataTypes) => {
    const onBoarding = sequelize.define('onBoarding',
        {
            firstName: { type: DataTypes.STRING, allowNull: true },
            lastName: { type: DataTypes.STRING, allowNull: true },
            phoneNumber: { type: DataTypes.BIGINT, allowNull: true, unique: true },
            email: { type: DataTypes.STRING, allowNull: false },
            gender: { type: DataTypes.STRING, allowNull: false },
            password: { type: DataTypes.STRING, allowNull: true },
            code: { type: DataTypes.STRING, allowNull: true },
            state: { type: DataTypes.STRING, allowNull: false },
            country: { type: DataTypes.STRING, allowNull: false },
            authType: { type: DataTypes.STRING, allowNull: false },
            isVerified: { type: DataTypes.BOOLEAN, allowNull: false },
            isBlocked: { type: DataTypes.BOOLEAN, allowNull: true },
        },
        {}
    );
    onBoarding.associate = (models) => {
        // association goes here
    };
    return onBoarding;
};
