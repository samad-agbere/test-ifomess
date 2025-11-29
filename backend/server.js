const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const voeuxRouters = require('./routes/voeux');
const frontRouters = require('../front/routes/voeux');
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.use('/uploads', express.static('uploads'));
app.use('/public', express.static('public'));

app.use("/", voeuxRouters);
app.use("/", frontRouters);

// Demarrer le seurveur
const PORT = process.env.SERVER_PORT || 3000;
app.listen(PORT, () =>
  console.log(`Serveur demaré sur : http://localhost:${PORT}`)
);
