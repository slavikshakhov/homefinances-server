module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  User.associate = (models) => {
    User.hasMany(models.Income, {
      onDelete: "cascade",
    }),
      User.hasMany(models.Expense, {
        onDelete: "cascade",
      });
    User.hasMany(models.Balance, {
      onDelete: "cascade",
    });
  };
  return User;
};
