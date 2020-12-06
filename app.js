const express = require("express");
const body_parser = require("body-parser");
const { create_admin } = require("./utils/admin");

const app = express();
// importing database
const sequelize = require("./config/Database");

// importing models
const Admin = require("./models/Admin");
const Offre = require("./models/Offre");
const TypePaiment = require("./models/TypePaiment");
const TypeAgriculture = require("./models/TypeAgriculture");
const TypeTerre = require("./models/TypeTerre");
const Coupon = require("./models/Coupon");
const Client = require("./models/Client");
const Commande = require("./models/Commande");
const CommandeOffre = require("./models/CommandeOffre");
const Contrat = require("./models/Contrat");
const Facture = require("./models/Facture");
const Terre = require("./models/Terre");
const Meteo = require("./models/Meteo");
const CycleVegetal = require("./models/CycleVegetal");
const Zone = require("./models/Zone");
const Irrigation = require("./models/Irrigation");
const Pompe = require("./models/Pompe");
const Robinet = require("./models/Robinet");

// importing routes
const adminRoutes = require("./routes/admin");

app.use(body_parser.json());
app.use(body_parser.urlencoded());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // pour definir les domain qui peuvent accéder a notre serveur
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,PATCH"); //pour ajouter les methodes qu'on peut utiliser
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization"); // pour ajouter un Content-Type et une autorization
  next();
});

app.use("/admin", adminRoutes);

// app.use("/", (req, res, next) => {
//   res.send("Hey from GreenIt API");
// });

// error middelware
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.status_code || 500;
  const message = error.message || "une erreur est produit";
  const data = error.data;
  res.status(status).json({ data: data, message: message, status: status });
});

// database relations

TypePaiment.belongsTo(Admin, {
  constraints: true,
  onDelete: "CASCADE",
  foreignKey: "id_admin",
});
TypeAgriculture.belongsTo(Admin, {
  constraints: true,
  onDelete: "CASCADE",
  foreignKey: "id_admin",
});
TypeTerre.belongsTo(Admin, {
  constraints: true,
  onDelete: "CASCADE",
  foreignKey: "id_admin",
});
Offre.belongsTo(Admin, {
  constraints: true,
  onDelete: "CASCADE",
  foreignKey: "id_admin",
});
Coupon.belongsTo(Offre, {
  constraints: true,
  onDelete: "CASCADE",
  foreignKey: "id_offre",
});

TypePaiment.hasMany(Client, {
  constraints: true,
  onDelete: "CASCADE",
  foreignKey: "id_type_paiment",
});
Client.hasMany(Commande, {
  constraints: true,
  onDelete: "CASCADE",
  foreignKey: "id_client",
});

Contrat.belongsTo(Client, {
  constraints: true,
  onDelete: "CASCADE",
  foreignKey: "id_client",
});
Contrat.belongsTo(Offre, {
  constraints: true,
  onDelete: "CASCADE",
  foreignKey: "id_offre",
});
Contrat.belongsTo(Commande, {
  constraints: true,
  onDelete: "CASCADE",
  foreignKey: "id_commande",
});

Offre.belongsToMany(Commande, {
  through: CommandeOffre,
  uniqueKey: "id_offre",
});

Commande.belongsToMany(Offre, {
  through: CommandeOffre,
});

Facture.belongsTo(TypePaiment, {
  constraints: true,
  onDelete: "CASCADE",
  foreignKey: "id_type_paiment",
});
Facture.belongsTo(Client, {
  constraints: true,
  onDelete: "CASCADE",
  foreignKey: "id_client",
});
Meteo.belongsTo(Terre, {
  constraints: true,
  onDelete: "CASCADE",
  foreignKey: "id_terre",
});

Terre.belongsTo(Client, {
  constraints: true,
  onDelete: "CASCADE",
  foreignKey: "id_client",
});
Terre.belongsTo(Offre, {
  constraints: true,
  onDelete: "CASCADE",
  foreignKey: "id_offre",
});
Terre.belongsTo(TypeTerre, {
  constraints: true,
  onDelete: "CASCADE",
  foreignKey: "id_type_terre",
}),
  CycleVegetal.belongsTo(TypeTerre, {
    constraints: true,
    onDelete: "CASCADE",
    foreignKey: "id_type_terre",
  });
CycleVegetal.belongsTo(TypeAgriculture, {
  constraints: true,
  onDelete: "CASCADE",
  foreignKey: "id_type_agriculture",
});
Zone.belongsTo(Terre, {
  constraints: true,
  onDelete: "CASCADE",
  foreignKey: "id_terre",
});
Zone.belongsTo(TypeAgriculture, {
  constraints: true,
  onDelete: "CASCADE",
  foreignKey: "id_type_agriculture",
});
Zone.belongsTo(CycleVegetal, {
  constraints: true,
  onDelete: "CASCADE",
  foreignKey: "id_cycle",
});
Irrigation.belongsTo(Zone, {
  constraints: true,
  onDelete: "CASCADE",
  foreignKey: "id_zone",
});

Pompe.belongsTo(Terre, {
  constraints: true,
  onDelete: "CASCADE",
  foreignKey: "id_terre",
});

Robinet.belongsTo(Pompe, {
  constraints: true,
  onDelete: "CASCADE",
  foreignKey: "id_pompe",
});
Robinet.belongsTo(Zone, {
  constraints: true,
  onDelete: "CASCADE",
  foreignKey: "id_zone",
});
sequelize
  //   .sync({ force: true })
  .sync()
  .then((result) => {
    console.log("Database connected");
    // creating the admin if he does not existe
    create_admin();
    const PORT = process.env.PORT || 5000;
    app.listen(PORT);
    console.log("Server is listening in port: " + PORT);
  })
  .catch((err) => {
    console.error(err);
  });
