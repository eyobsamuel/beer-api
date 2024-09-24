const express = require("express");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const beerRoutes = require("./routes/beerRoutes");
const sequelize = require("../config/database");

const app = express();
app.use(express.json());

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Beer Collection API",
      version: "1.0.0",
    },
  },
  apis: ["./api/routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get("/", (req, res) => {
  res.redirect("/api-docs");
});

app.use("/api/beers", beerRoutes);

const start = async () => {
  await sequelize.sync();
  app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
  });
};

start();
