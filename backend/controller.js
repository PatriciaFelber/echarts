const fs = require('fs');

//Path zu den CSV-Dateien festlegen
const reflectivityPointwise = '../assets/reflectivityPointwise.csv';
const thicknessPointwise = '../assets/thicknessPointwise.csv';

//Funktion zum einlesen der CSV-Datei
function readCSV(filePath) {
    console.log('Daten erfolgreich eingelesen: ', fs.readFileSync(filePath,'utf-8'));
    return fs.readFileSync(filePath, 'utf-8');
}

//Daten String in ein Array umwandeln mit dem echarts arbeiten kann 
function formatString(csvString) {
    const rows = csvString.split('\n');
    const result = [];

    for(let i = 2; i < rows.length; i++) {
        const values = rows[i].split(',');
        const coordinates = [parseFloat(values[0]), parseFloat(values[1]), parseFloat(values[2])];
        result.push(coordinates);
    }

    console.log('Daten erfolgreich formatiert: ', result);
    return result;
}

exports.getReflectivity = (req, res) => {
    const reflectivityData = formatString(readCSV(reflectivityPointwise));
    res.json(reflectivityData);
}

exports.getThickness = (req, res) => {
    const thicknessData = formatString(readCSV(thicknessPointwise));

    res.json(thicknessData);
}