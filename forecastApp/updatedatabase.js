const Influx = require('influx')
const express = require('express')
const http = require('http')
const os = require('os')
const fs = require('fs')

const app = express()

const influx = new Influx.InfluxDB({
  host: 'localhost',
  database: 'forecast',
  schema:
        [
          {
            measurement: 'sensors',
            fields: {
              measurement: 'sensors',
              date: Influx.FieldType.STRING,
              temperature: Influx.FieldType.FLOAT,
              pressure: Influx.FieldType.FLOAT,
              humidity: Influx.FieldType.FLOAT,
              luminosity: Influx.FieldType.FLOAT
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

setInterval(function(){
  var sensors = readFile();
  updateDataBase(sensors);
}, 1000)

//Read Sensors File
function readFile()
{
  var obj;
  fs.readFile('./sensors', 'utf8', function (err, data) {
  if (err) throw err;
  obj = JSON.parse(data);
  return obj;
}

function updateDataBase(obj)
{
  influx.writePoints([
  {
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
