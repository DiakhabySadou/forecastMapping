var express = require('express');
var router = express.Router();
const Influx = require('influx')
const influx = new Influx.InfluxDB('http://127.0.0.1:8086/forecast')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/last/location', function (req, res)
{
  influx.query('select * from location GROUP BY * ORDER BY DESC LIMIT 1')
  .then(rows =>
    {
      clearObj(rows);
      res.send(rows)})
})


router.get('/last/rainfall',function(req,res,next)
{
  influx.query('select * from rainfall GROUP BY * ORDER BY DESC LIMIT 1')
  .then(rows =>
    {
      clearObj(rows);
      res.send(rows);})
})

router.get('/last/measures',function(req,res,next)
{
  influx.query('select * from sensors GROUP BY * ORDER BY DESC LIMIT 1')
  .then(rows =>
    {
      clearObj(rows);
      res.send(rows);
    })
})

router.get('/last/all',function(req,res,next)
{
  var tabPromise= [];
  tabPromise.push(influx.query('select date,longitude,latitude from location GROUP BY * ORDER BY DESC LIMIT 1'))
  tabPromise.push(influx.query('select date from rainfall GROUP BY * ORDER BY DESC LIMIT 1'))
  tabPromise.push(influx.query('select date,temperature,pressure,humidity,luminosity,wind_heading,wind_speed_max,wind_speed_min,wind_speed_avg from sensors GROUP BY * ORDER BY DESC LIMIT 1'))

  Promise.all(tabPromise)
  .then(results=>{
      clearObj(results[0]);
      clearObj(results[1]);
      clearObj(results[2]);
      result = {"location":results[0],"rainfall":results[1],"measurements":results[2]}
      res.send(result)
    })
  })

//Fonction permettant de supprimer les colonnes time et host du resultat des requêtes
function clearObj(rows)
{
  rows.forEach((row)=>{delete row.time;delete row.host})
}

module.exports = router;
