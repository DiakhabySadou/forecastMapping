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
      props:  ['hideHist','url'],
      data:  function() {
    return {

    datas : {
         'date':[],
         'temperature':[],
         'pressure':[],
         'humidity':[]
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
                // initUri()
                var today = new Date();
                var week = new Date();
                week.setDate(today.getDate()-7);
                var stop  = (week.toISOString()).split('T')[0];
                var urlInterval = this.url+"/interval?start="+stop+"&stop="+today.toISOString();

                this.axios.get(urlInterval).then((response) => {
                for (var i = 0; i < response.data.measurements.length; i++)
                  {
                    this.datas.date.push((response.data.measurements[i].date).substr(0,10));
                    this.datas.temperature.push(response.data.measurements[i].temperature);
                    this.datas.humidity.push(response.data.measurements[i].humidity);
                    this.datas.pressure.push(response.data.measurements[i].pressure);
                  }
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
