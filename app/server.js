var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser'); // omogucava da citam iz tela (body) requesta

app.use(bodyParser.json()); // kazem serveru da koristi opciju citanja iz tela requesta
app.use(cors());
app.options('*', cors());

var oglasi = [
    {
        "id": 1,
        "kategorija": "kategorija",
        "datum": "2022-05-12",
        "cena": 100,
        "tekstOglasa": "Ovo je tekst oglasa1",
        "tag": ["tag1", "tag2"],
        "email": "email@gmail.com"
    },
    {
        "id": 2,
        "kategorija": "kategorija2",
        "datum": "2022-05-22",
        "cena": 150,
        "tekstOglasa": "Ovo je tekst oglasa2",
        "tag": ["tag2", "tag3"],
        "email": "email2@gmail.com"
    }
]

app.get('/oglasi', function (req, res) {
    res.set("Access-Control-Allow-Origin", "*");
    res.json(oglasi);
});

app.get("/oglasi/:id", function (req, res) {
    res.set("Access-Control-Allow-Origin", "*");
    var resultOglas = {};

    oglasi.forEach(oglas => {
        // req.params.id vraca id koji se posalje => oglasi/1 - vraca 1 (request param koji se nalazi u url)
        if (oglas.id == req.params.id) {
            resultOglas = oglas;
        }
    });

    res.json(resultOglas);
});

app.get("/oglasi/filter/:filter", function (req, res) {
    var filtriraniOglasi = [];

    var filter = req.params.filter;

    console.log(filter);

    oglasi.forEach(oglas => {
        if(oglas.id == filter || oglas.kategorija.includes(filter) || oglas.tekstOglasa.includes(filter)) {
            filtriraniOglasi.push(oglas);
        }
    });

    res.json(filtriraniOglasi);
});

app.post('/oglasi', function (req, res) {//kreiranje
    res.set("Access-Control-Allow-Origin", "*");
    var oglas = {};

    oglas["id"] = sledeciId();
    oglas["kategorija"] = req.body.kategorija;
    oglas["datum"] = req.body.datum;
    oglas["cena"] = req.body.cena;
    oglas["tekstOglasa"] = req.body.tekstOglasa;
    oglas["tag"] = req.body.tag;
    oglas["email"] = req.body.email;

    oglasi.push(oglas);

    res.end("OK");
});

app.put('/oglasi/:id', (req, res) => {//azuriranje
    oglasi.forEach(oglas => {
        // req.params.id vraca id koji se posalje => oglasi/1 - vraca 1 (request param koji se nalazi u url)
        if (oglas.id == req.params.id) {
            oglas["kategorija"] = req.body.kategorija;
            oglas["datum"] = req.body.datum;
            oglas["cena"] = req.body.cena;
            oglas["tekstOglasa"] = req.body.tekstOglasa;
            oglas["tag"] = req.body.tag;
            oglas["email"] = req.body.email;
        }
    });

    res.end('OK');
});

app.delete('/oglasi/:id', (req, res) => {
    var oglasiPom = [];

    oglasi.forEach(oglas => {
        if (oglas.id != req.params.id) {
            oglasiPom.push(oglas);
        }
    });

    oglasi = oglasiPom;

    res.end('OK');
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

function sledeciId() {
    if(oglasi.length > 0) {
        var id = oglasi[oglasi.length - 1].id + 1;
        return id;
    }
    return 1;
}