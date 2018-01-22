var express = require('express');
var router = express.Router();
const Influx = require('influx')
const influx = new Influx.InfluxDB('http://127.0.0.1:8086/forecast')

router.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/last', function (req, res)
{
    getLatestData(req,res);
  })

  router.get('/interval', function (req, res)
  {
      getDataByInterval(req,res);
    })

router.get('/:periode/:data', function (req, res)
{
  var periode = req.params.periode;
  switch (periode) {
    case "last":
        getLatestData(req,res);
      break;
    case "interval":
      getDataByInterval(req,res);
      break;
    default:

  }

})

function getDataByInterval(req,res)
{
  var start = req.query.start;
  var stop= req.query.stop;
  var data = req.params.data;

  if (start==null || stop== null)
  {
    res.send([]);
  }

  else if (data=="all" || data == null)
  {
    var tabPromise= [];
    tabPromise.push(influx.query("select * from location where time>'"+start+"' and time< '"+stop+"'"))
    tabPromise.push(influx.query("select * from rainfall where time>'"+start+"' and time< '"+stop+"'"))
    tabPromise.push(influx.query("select * from measures where time>'"+start+"' and time< '"+stop+"'"))

    Promise.all(tabPromise)
    .then(results=>{
        clearObj(results[0]);
        clearObj(results[1]);
        clearObj(results[2]);
        result = {"location":results[0],"rainfall":results[1],"measurements":results[2]}
        res.send(result)
      })
  }
  else
  {
    if (data == "measurements") {
      data = "measures";
    }
    console.log(data);
    influx.query("select * from "+data+" where time>'"+start+"' and time< '"+stop+"'")
    .then(rows =>
      {
        clearObj(rows);
        res.send(rows)})
      }
}


function getLatestData(req,res)
{
  var data = req.params.data;
  if (data == "all" || data ==null)
  {
    var tabPromise= [];
    tabPromise.push(influx.query('select * from location GROUP BY * ORDER BY DESC LIMIT 1'))
    tabPromise.push(influx.query('select * from rainfall GROUP BY * ORDER BY DESC LIMIT 1'))
    tabPromise.push(influx.query('select * from measures GROUP BY * ORDER BY DESC LIMIT 1'))

    Promise.all(tabPromise)
    .then(results=>{
        clearObj(results[0]);
        clearObj(results[1]);
        clearObj(results[2]);
        result = {"location":results[0],"rainfall":results[1],"measurements":results[2]}
        res.send(result)
      })
  }

  else
  {
    if (data == "measurements") {
      data = "measures";
    }
    influx.query("select * from "+ data+ " GROUP BY * ORDER BY DESC LIMIT 1")
    .then(rows =>
      {
        clearObj(rows);
        res.send(rows);})
  }
}

//Fonction permettant de supprimer les colonnes time et host du resultat des requêtes
function clearObj(rows)
{
  rows.forEach((row)=>
  {
    row.date = row.time;delete row.time;delete row.host
  })
}

module.exports = router;
