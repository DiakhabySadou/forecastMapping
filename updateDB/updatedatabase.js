const Influx = require('influx')
const os = require('os')
const fs = require('fs')
const path='./sensors'


var filePath = '/var/log/sensors';
var file = fs.readFileSync(filePath);
console.log('Initial File content : ' + file);

fs.watchFile(filePath, function() {
    console.log('File Changed ...');
    file = fs.readFileSync(filePath);
    execute();
});


const influx = new Influx.InfluxDB({
  host: 'localhost',
  database: 'forecast',
  schema:
        [
          {
            measurement: 'sensors',
            fields: {
              date: Influx.FieldType.STRING,
              temperature: Influx.FieldType.FLOAT,
              pressure: Influx.FieldType.FLOAT,
              humidity: Influx.FieldType.FLOAT,
              luminosity: Influx.FieldType.FLOAT,
              wind_heading: Influx.FieldType.FLOAT,
              wind_speed_max: Influx.FieldType.FLOAT,
              wind_speed_min: Influx.FieldType.FLOAT,
              wind_speed_avg: Influx.FieldType.FLOAT
            },
            tags: [
              'host'
            ]
          }
        ]
})

var http = require('http').createServer((req, res) =>
{
  res.end("Updating dataBase programm");
});

http.listen(3600);
console.log('Server running at http://127.0.0.1:88/');


/******************** */



/*********************** */

function execute()
{
  //Test Database existence
  influx.getDatabaseNames()
  .then(names =>
    {
      if (names.indexOf('forecast')==-1)
        {
        return influx.createDatabase('forecast');
        }
      })
  .catch(err =>
     {
       console.error(`Error creating Influx database!${err.stack}`);
     })
//  setInterval(function(){
    var sensors = readFile();
    updateDataBase(sensors);
 // }, 500)
}
//Read Sensors File
function readFile()
{
  var obj=null;
  var content;
  try
  {
      content = fs.readFileSync('./sensors', 'utf8')
      obj = JSON.parse(content);
  } catch (err)
  {
    throw err;
  }

  return obj;
}

function updateDataBase(obj)
{
  console.log('Writting data...');
  influx.writePoints([
  {
    measurement: 'sensors',
    tags: { host: os.hostname() },
    fields:
    {
      date:obj.date,
      temperature:obj.measure[0].value,
      pressure: obj.measure[1].value,
      humidity:obj.measure[2].value,
      luminosity:obj.measure[3].value,
      wind_heading:obj.measure[4].value,
      wind_speed_max:obj.measure[5].value,
      wind_speed_min:obj.measure[6].value,
      wind_speed_avg:obj.measure[7].value
     },
    }],
  {
    database: 'forecast'
  })
  .catch(err => {
    console.error(`Error saving data to InfluxDB! ${err.stack}`)
  })
}
