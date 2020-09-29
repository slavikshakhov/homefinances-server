module.exports = (sequelize, DataTypes) => {
  const Balance = sequelize.define("Balance", {
    balance: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  });
  Balance.associate = (models) => {
    Balance.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      },
    });
  };
  return Balance;
};
