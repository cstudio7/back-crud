/* eslint-disable no-unused-vars */
module.exports = (sequelize, DataTypes) => {
  const bloodPressure = sequelize.define(
    'bloodPressure',
    {
        type: {
            type: DataTypes.STRING,
        },
        readingValue: {
            type: DataTypes.STRING,
        },
        time: {
            type: DataTypes.TIME,
        },
        desc: {
            type: DataTypes.STRING,
        }
    },
  );
    bloodPressure.associate = (models) => {
    // associations can be defined here
    // mediaLikes.belongsTo(models.media, {
    //   foreignKey: 'mediaId',
    //   onDelete: 'CASCADE',
    //   onUpdate: 'CASCADE',
    // });
  };
  return bloodPressure;
};
