module.exports = (sequelize, DataTypes) => {
  const Income = sequelize.define("Income", {
    item: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    money: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    activity: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
  Income.associate = (models) => {
    Income.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      },
    });
  };

  return Income;
};
