const express = require("express");
const router = express.Router();

  router.get("/voeux", async (req, res) => {
  try {
    // Recuperer les données via l'api
    const response = await fetch("http://localhost:3000/api/voeux");
    if (!response.ok) throw new Error(`erreur de requete statut: ${response.status}`);

    const voeux = await response.json(); 

    // Charger les voeux dans la vue
    res.render("voeux", { voeux });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
  });


  module.exports = router;

