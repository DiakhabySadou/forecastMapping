var express = require('express');
var router = express.Router();
const Influx = require('influx')
const client = new Influx.InfluxDB('http://127.0.0.1:8086/forecast')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/last/location', function (req, res) {
  var result="sdfsdf"

  client.query('select * from location ;')
.then(rows => {
rows.forEach(row => result=row)

  res.send(result)
})

})


module.exports = router;

