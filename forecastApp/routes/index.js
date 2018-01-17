var express = require('express');
var router = express.Router();
const Influx = require('influx')
const influx = new Influx.InfluxDB('http://127.0.0.1:8086/forecast')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/last/location', function (req, res) {
  var result="sdfsdf"

  influx.query('select * from location ;')
.then(rows => {
rows.forEach(row => result=row)

  res.send(result)
})

})


router.get('/last/rainfull',function(req,res,next)
{
  influx.query('select * from rainfall')
  .then(rows =>
    {
      res.send(rows);
    })
})


router.get('/last/all',function(req,res,next)
{
  // Connect to a single host with a DSN:
  var result;
  var location = null;
  var rainfall = null;
  var sensors = null;

  var tabPromise= [];
  tabPromise.push(influx.query('select date,longitude,latitude from location'))
  tabPromise.push(influx.query('select date from rainfall'))
  tabPromise.push(influx.query('select date,temperature,pressure,humidity,luminosity,wind_heading,wind_speed_max,wind_speed_min,wind_speed_avg from sensors'))

  Promise.all(tabPromise)
  .then(results=>{
      result = {"location":results[0],"rainfall":results[1],"measurements":results[2]}
      res.send(result)
    })
  })


module.exports = router;

