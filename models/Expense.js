module.exports = (sequelize, DataTypes) => {
  const Expense = sequelize.define("Expense", {
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
  Expense.associate = (models) => {
    Expense.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      },
    });
  };
  return Expense;
};
