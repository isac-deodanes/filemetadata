var express = require('express');
var cors = require('cors');

require('dotenv').config()

const multer  = require('multer');

var app = express();



const storage = multer.memoryStorage();
const upload = multer({ storage: storage });



app.use(cors({ origin: '*' }));

// Middleware manual para asegurar que los encabezados de control de acceso se inyecten siempre
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});




app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});


app.post('/api/fileanalyse', upload.single('upfile'), function(req, res) {
  if (!req.file) {
    return res.json({ error: "seleccione un archivo valido" });
  }

  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  });
});



const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});


