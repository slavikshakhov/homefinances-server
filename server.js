const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const db = require("./models");
// const path = require("path");
// const publicPath = path.join(__dirname, "/personalfinances", "build");
// app.use(express.static(publicPath));

const PORT = process.env.PORT || 4000;
var cors = require("cors");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());
/*
app.get("*", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});
*/
let authRoutes = require("./routes/authRoutes");
let expensesRoutes = require("./routes/expensesRoutes");
let incomesRoutes = require("./routes/incomesRoutes");
let balanceRoutes = require("./routes/balanceRoutes");
app.use("/auth", authRoutes);
app.use("/expenses", expensesRoutes);
app.use("/incomes", incomesRoutes);
app.use("/balances", balanceRoutes);

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`listening on: http://localhost:${PORT}`);
  });
});
