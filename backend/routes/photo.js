const express = require("express");
const router = express.Router();
const db = require("../db");

// Config upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});
const upload = multer({ storage });

// Liste des photos
router.get("/", async (req, res) => {
    const result = await db.query("SELECT * FROM photos ORDER BY date_publication DESC");
    res.json(result.rows);
});

// Upload photo
router.post("/", upload.single("photo"), async (req, res) => {
    const { nom } = req.body;
    const fileUrl = "/uploads/" + req.file.filename;

    const result = await db.query(
        "INSERT INTO photos (nom, url) VALUES ($1, $2)",
        [nom, fileUrl]
    );

    res.json(result.rows[0]);
});

module.exports = router;
