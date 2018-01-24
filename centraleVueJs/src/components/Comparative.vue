<template>
  <div style="margin-top:20px">
    <table class="table table-hover table-dark">
      <thead>
        <tr>
          <th scope="col">N°</th>
          <th scope="col">Température</th>
          <th scope="col">Pression</th>
          <th scope="col">Humidité</th>
          <th scope="col">Luminosité</th>
          <th scope="col">Pluviométrie</th>
          <th scope="col">Vent</th>
        </tr>
      </thead>
    <tbody>
    <tr v-for="sonde in sondes">
      <th scope="row">Sonde {{sonde.num}}</th>
      <td>{{sonde.temperature}}</td>
      <td>{{sonde.pressure}}</td>
      <td>{{sonde.humidity}}</td>
      <td>{{sonde.luminosity}}</td>
      <td>{{sonde.rainfall}}</td>
      <td>{{sonde.wind_speed_avg}}</td>
    </tr>
  </tbody>
</table>
  </div>
</template>

<script>
export default
{
    name: 'Comparative',
     props:  ['comp'],
     data:  function() {
       return {
              sondes:[],
              tabLocation:[]
       }

     },
     created: function()
         {
             this.fetchItems();
         },

  methods: {

             fetchItems()
             {
                   var tabPromises = [];
                   var locations = [];
                   tabPromises.push(this.axios.get("http://172.31.43.65:3000/last"));
                   tabPromises.push(this.axios.get("http://172.31.43.58:3000/last"));
                   tabPromises.push(this.axios.get("http://172.31.43.60:3000/last"));
                   tabPromises.push(this.axios.get("http://172.31.43.61:3000/last"));
                   tabPromises.push(this.axios.get("http://172.31.43.62:3000/last"));
                   var indexEchec = []
                   Promise.all(tabPromises.map(p => p.catch(() => {
                     indexEchec.push(tabPromises.indexOf(p));
                     })))
                   .then((results) =>
                   {
                     for (var i = 0; i < results.length; i++)
                     {
                       if(indexEchec.indexOf(i)==-1)
                       {
                         this.sondes.push(
                         { num:i+1,
                           temperature:results[i].data.measurements[0].temperature,
                           pressure:results[i].data.measurements[0].pressure,
                           humidity:results[i].data.measurements[0].humidity,
                           luminosity:results[i].data.measurements[0].luminosity,
                           rainfall:results[i].data.rainfall[0].date,
                           wind_speed_avg:results[i].data.measurements[0].wind_speed_avg,

                         });

                           locations.push({
                           sondeId:i+1,
                           latitude:(results[i].data.location)?results[i].data.location[0].latitude:results[i].data[0].latitude,
                           longitude:(results[i].data.location)?results[i].data.location[0].longitude:results[i].data[0].longitude
                         })
                       }
                       else {
                         this.sondes.push({ num:i+1,
                          temperature:"Sonde ne répond pas",
                          pressure:null,
                          humidity:null,
                          luminosity:null,
                          rainfall:null,
                          wind_speed_avg:null});
                       }

                     }

                     this.$emit('update:tabLocation',locations);
                     //console.log(this.tabLocation);
                     // dans la méthode du composant A

               })
               .catch(function(err) {
                  console.log(err.message); // some coding error in handling happened
                });
             },
 },
}
</script>

<style>

</style>
