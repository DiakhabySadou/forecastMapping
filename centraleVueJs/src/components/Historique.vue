<template>
<div class="history"  v-if="!hideHist" >

<div  class="card"><Chart  :url="url" :temperature="temperature"></Chart></div>
<div  class="card"><Chart  :url="url"></Chart></div>
<div  class="card"><Chart  :url="url"></Chart></div>
<div  class="card"><Chart  :url="url"></Chart></div>

</div>
</template>

<script>
import Chart from '../components/Chart'


export default {
    name: "Historique",
      props:  ['hideHist','url'],
      data:  function() {
    return {

    items: [],
       temp: 0,
       hum: 0,
       pre: 0,
       rain: 0,
       lum: 0 ,
       wind: 0,
       temperature:[],
       pressure:[]


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
                // initUri()
                var today = new Date();
                var week = new Date()
                week.setDate(today.getDate()-7);
                var stop  = (week.toISOString()).split('T')[0];
                var urlInterval = this.url+"/interval?start="+today.toISOString()+"&stop="+stop;
                console.log(urlInterval);
                this.axios.get(this.url).then((response) => {
                this.items = response.data;
                this.temp=this.items.measurements[0].temperature;
                this.hum=this.items.measurements[0].humidity;
                this.lum=this.items.measurements[0].luminosity;
                this.pre=this.items.measurements[0].pressure;
                this.wind=(this.items.measurements[0].wind_speed_avg).toFixed(2);
                     //rainfall

              });
            },
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
