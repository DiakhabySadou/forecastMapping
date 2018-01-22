const Influx = require('influx')
const os = require('os')
const fs = require('fs')


const influx = new Influx.InfluxDB({
  host: 'localhost',
  database: 'forecast',
  schema:
        [
          {
            measurement: 'measures',
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
          },
          {
            measurement: 'location',
            fields: {
              date: Influx.FieldType.STRING,
              longitude: Influx.FieldType.FLOAT,
              latitude: Influx.FieldType.FLOAT
            },
            tags: [
              'host'
            ]
          },
          {
            measurement: 'rainfall',
            fields: {
              date: Influx.FieldType.STRING,
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
console.log('Server running at http://127.0.0.1:3600/');

var sensorPath = '/dev/shm/sensors';
var gpsPath = '/dev/shm/gpsNmea';
var rainFallPath = '/dev/shm/rainCounter.log';

var sensorFile = fs.readFileSync(sensorPath);
var gpsFile = fs.readFileSync(gpsPath);
var rainFallFile = fs.readFileSync(rainFallPath);

execute(sensorPath, "sensors");
execute(gpsPath, "location");
execute(rainFallPath, "rainfall");


fs.watchFile(sensorPath, function() {
    console.log('sensors File Changed ...');
    sensorFile = fs.readFileSync(sensorPath);
    execute(sensorPath, "sensors");
});


fs.watchFile(gpsPath, function() {
    console.log('location File Changed ...');
    gpsFile = fs.readFileSync(gpsPath);
    execute(gpsPath, "location");
});

fs.watchFile(rainFallPath, function() {
    console.log('rainfall File Changed ...');
    rainFallFile = fs.readFileSync(rainFallPath);
    execute(rainFallPath, "rainfall");
});

function execute(fileToRead,dataType)
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
    var data = readFile(fileToRead,dataType);
    updateDataBase(data,dataType);
}

//Read Sensors File
function readFile(fileToRead,dataType)
{
  var obj=null;
  var content;
  try
  {
      content = fs.readFileSync(fileToRead, 'utf8')
      if (dataType=="sensors")
      {
        obj = JSON.parse(content);
      }
      else if (dataType=="location")
      {
          var ligne1_splite = content.split('\n')[0].split(',');
          var tabHoraire = ligne1_splite[1];

          var hh = tabHoraire.substr(0,2);
          var mm = tabHoraire.substr(2,2);
          var ss = tabHoraire.substr(4,tabHoraire.length);

          var ligne2_splite = content.split('\n')[1].split(',');
          var date = ligne2_splite[ligne2_splite.length-3];
          var yyyy = "20"+date.substr(4,2);
          var mM = date.substr(2,2);
          var dd = date.substr(0,2);

          var dateTo = new Date(yyyy+" "+mM+" "+dd+" "+hh+":"+mm+":"+ss)

          var convertedCoords = DMS2LatLong([ligne1_splite[4].substr(1,ligne1_splite[4].length-1),ligne1_splite[2]],[ligne1_splite[5],ligne1_splite[3]])

          obj = {'date': dateTo.toISOString(), 'longitude':convertedCoords[0], 'latitude':convertedCoords[1]}

      }
      else {
        obj = {'date':content.substr(0,content.length-2)};
      }
  } catch (err)
  {
    throw err;
  }

  return obj;
}

function DMS2LatLong(coord,direction)
{
  var dms = require("dms-conversion");
  var dmsStrings = [];

  for (var i = 0; i < coord.length; i++)
  {
    var dd = parseFloat(coord[i].substr(0,2));
    var mm = parseFloat(coord[i].substr(2,2));
    var ss = parseFloat(coord[i].substr(4,coord[i].length-4));

    var res = dd+ mm/60 +ss/3600;
    if (direction[i] == 'S' || direction[i] == 'W') {
       res = res * -1;
     }
    dmsStrings.push(res)
  }

  return dmsStrings;
}

function updateDataBase(obj,dataType)
{
  console.log("Writting "+dataType+" data.....");
  switch (dataType) {
    case 'sensors':
        updateSensor(obj);
      break;

    case 'location':
        updateGPS(obj);
      break;
    case 'rainfall':
        updateRainFall(obj);
      break;
    default:
        console.log("!!!! Unknown file......");
  }

}

function updateSensor(obj)
{
  var timestamp = new Date(obj.date);
 var date = timestamp.getTime()*1000;
  influx.writePoints([
  {
    measurement: 'measures',
    tags: { host: os.hostname() },
    fields:
    {
      date:date,
      temperature:obj.measure[0].value,
      pressure: obj.measure[1].value,
      humidity:obj.measure[2].value,
      luminosity:obj.measure[3].value,
      wind_heading:obj.measure[4].value,
      wind_speed_max:obj.measure[5].value,
      wind_speed_min:obj.measure[6].value,
      wind_speed_avg:obj.measure[7].value
     },
	date
    }],
  {
    database: 'forecast'
  })
  .catch(err => {
    console.error(`Error saving data to InfluxDB! ${err.stack}`)
  })
}

function updateGPS(obj)
{
 var timestamp = new Date(obj.date);
 var date = timestamp.getTime()*1000;
  influx.writePoints([
  {
    measurement: 'location',
    tags: { host: os.hostname() },
    fields:
    {
      date:date,
      longitude:obj.longitude,
      latitude: obj.latitude,
     },
    date
    }],
  {
    database: 'forecast'
  })
  .catch(err => {
    console.error(`Error saving data to InfluxDB! ${err.stack}`)
  })
}

function updateRainFall(obj)
{
 var timestamp = new Date(obj.date);
 var date = timestamp.getTime()*1000;
  influx.writePoints([
  {
    measurement: 'rainfall',
    tags: { host: os.hostname() },
    fields:
    {
      date:timestamp,
      },
      date
    }],
  {
    database: 'forecast'
  })
  .catch(err => {
    console.error(`Error saving data to InfluxDB! ${err.stack}`)
  })
}

function ConvertDMSToDD(degrees, minutes, seconds, direction) {
    var dd = degrees + minutes/60 + seconds/(60*60);

    if (direction == "S" || direction == "W") {
        dd = dd * -1;
    } // Don't do anything for N or E
    return dd;
}
