const db = require("./db");


    const voeuxTable = `CREATE TABLE voeux (
  id SERIAL PRIMARY KEY,
  nom VARCHAR(100) NOT NULL,
  texte TEXT NOT NULL,
  image TEXT,
  date_publication TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`;

db.query(voeuxTable, (err) => {
  if (err) {
    console.error('Echec de creation de la table:', err);
  } else {
    console.log('Creation effectuée');
  }
});

const voeuxData = [
  ['Alice Dupont', 'Bonne année 2026 ! Que tous vos projets se réalisent.'],
  ['Bob Martin', 'Meilleurs vœux pour cette nouvelle année pleine de succès.'],
  ['Charlie Bernard', 'Que la santé et le bonheur vous accompagnent toute l’année !'],
];

async function insertVoeux() {
  for (const [nom, texte] of voeuxData) {
    await db.query(
      'INSERT INTO voeux (nom, texte) VALUES ($1, $2)',
      [nom, texte]
    );
  }
  console.log('Donnée enregistrées.');
  db.end();
}

insertVoeux();
