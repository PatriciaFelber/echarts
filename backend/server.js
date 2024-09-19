const express = require('express');
const app = express();
const controller = require('./controller');

//Port für den Server festlegen 
const port = 3000;

//Middleware zum Parsen von JSON-Daten
app.use(express.json());

//Route zum Parsen der CSV-Dateien und Rückgabe der geparseten Daten
app.get('/api/reflectivity', controller.getReflectivity);
app.get('/api/thickness', controller.getThickness);

//Server starten
app.listen(port, () => {
    console.log(`Server läuft auf Port ${port}`);
});