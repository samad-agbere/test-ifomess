const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const db = require("../db");


// Configurer Multer pour enregistrer les fichiers dans ./uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  }
});
const upload = multer({ storage });

// creer un voeux avec image
router.post("/api/voeux", upload.single("image"), async (req, res) => {
  const { nom, texte } = req.body;
  const imagePath = req.file ? req.file.path : null;

  if (!nom) return res.status(400).json({ error: "Le nom est obligatoire" });

  try {
    const result = db.query(
      "INSERT INTO voeux (nom, texte, image) VALUES ($1, $2, $3)",
      [nom, texte, imagePath]
    );
    res.redirect('/voeux');
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'err.texte' });
  }
});

// Recuperer tous les voeux
router.get("/api/voeux", async (request, response) => {
  try {
    const result = await db.query(
      "SELECT * FROM voeux ORDER BY date_publication DESC"
    );
    response.json(result.rows); 
  } catch (err) {
    console.error(err);
    response.status(500).json({ error: err.texte });
  }
});

// Recuperer un voeu
router.get("/api/voeux/:id", async (request, response) => {
    const id = parseInt(request.params.id);
    const voeuByIdQuery =  "SELECT * FROM voeux where id=$1";
    if (isNaN(id)) {
        return response.status(400).send("message", "Mauvaise requete. Id invalide");        
    }

    db.query(voeuByIdQuery,[id], (err, result) => {
        if (err) {
            response.send(err);
        } else {
            response.send(result.rows);
        }
    }); 
});

module.exports = router;
