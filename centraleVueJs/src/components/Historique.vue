<template>
<div class="history"  v-if="!hideHist" >

<Chart  :url="url" :datas="datas" ></Chart>
{{fetchItems()}}

</div>
</template>

<script>
import Chart from '../components/Chart'


export default {
    name: "Historique",
      props:  ['hideHist','url','histo'],
      data:  function() {
    return {

    datas : {
         'date':[],
         'temperature':[],
         'pressure':[],
         'humidity':[],
         'wind_speed_avg':[],
         'luminosity':[]

       }


    }

   },
    components: {
    Chart
  },
    created: function()
        {
            this.fetchItems();

        },
      methods: {


            fetchItems()
            {
              if (this.histo.week){
                var today = new Date();
                var week = new Date();
                week.setDate(today.getDate()-7);
                //this.datas={};
                this.getchart(today,week,10)
              }
              else if(this.histo.month)
              {
               var today = new Date();
                var month = new Date();
                month.setDate(today.getDate()-30);

                this.getchart(today,month,7)
              }
              else if(this.histo.year) {

               var today = new Date();
                var year = new Date();
                year.setDate(today.getDate()-365);
                console.log("hello on est dans années");

               this.getchart(today,year,4)
              }

            },
            getchart(today,before,long){
            console.log(today+"   "+before);

                var stop  = (before.toISOString()).split('T')[0];
                var urlInterval = this.url+"/interval?start="+stop+"&stop="+today.toISOString();

                this.axios.get(urlInterval).then((response) => {


                 var temp = [];
                 var hum = [];
                 var lum =[];
                 var wind = [];
                 var press = [];
                for (var i = 0; i < response.data.measurements.length; i++)
                  {
                    temp.push({'date':(response.data.measurements[i].date).substr(0,long),
                      'value':response.data.measurements[i].temperature});

                    this.datas.date.push((response.data.measurements[i].date).substr(0,long));

                    hum.push({'date':(response.data.measurements[i].date).substr(0,long),
                      'value':response.data.measurements[i].humidity});

                    press.push({'date':(response.data.measurements[i].date).substr(0,long),
                      'value':response.data.measurements[i].pressure}
                    );
                    lum.push({'date':(response.data.measurements[i].date).substr(0,long),
                      'value':response.data.measurements[i].luminosity}
                    );

                    wind.push({'date':(response.data.measurements[i].date).substr(0,long),
                      'value':response.data.measurements[i].wind_speed_avg}
                    );


                  }

                 this.datas.temperature = temp;
                 this.datas.luminosity =lum;
                 this.datas.humidity =hum;
                 this.datas.wind_speed_avg =wind;
                 this.datas.pressure =press;

              });
            }
},

}
</script>

<style>
.graph .labels.x-labels {
  text-anchor: middle;
}

.graph .labels.y-labels {
  text-anchor: end;
}


.graph {
  height: 500px;
  width: 800px;
}

.graph .grid {
  stroke: #ccc;
  stroke-dasharray: 0;
  stroke-width: 1;
}

.labels {
  font-size: 13px;
}

.label-title {
  font-weight: bold;
  text-transform: uppercase;
  font-size: 12px;
  fill: black;
}

.data {
  fill: red;
  stroke-width: 1;
}
</style>
