<template>
  <div style="z-index:2000" class="col-md-10">
     <div id="mapid"></div>
     {{fetchItems()}}
   </div>
</template>

<script>
export default {
    name: 'myMap',
     props:  ['url'],
     data: function(){
       return {
         markers:null,
         mymap:null
       }
     }
     ,
     mounted:function()
     {
       this.mymap=L.map('mapid').setView([51.505, -0.09], 8)
       L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoic2Fkb3UiLCJhIjoiY2lvZXc0bXFkMDAzbHc0ajdxNHZmY3g1MiJ9.Ct7zHhmOLwKhD8b9mvyHJg', {
         attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
         maxZoom: 8,
         id: 'mapbox.streets',
         accessToken: 'pk.eyJ1Ijoic2Fkb3UiLCJhIjoiY2lvZXc0bXFkMDAzbHc0ajdxNHZmY3g1MiJ9.Ct7zHhmOLwKhD8b9mvyHJg'
       }).addTo(this.mymap);
         this.markers = L.layerGroup().addTo(this.mymap);
     },
created: function()
    {



    },

methods: {

        fetchItems()
        {
              // initUri()
              this.axios.get(this.url+"/last/location").then((response) => {
              L.marker([response.data[0].latitude, response.data[0].longitude]).addTo(this.markers);
              this.mymap.setView([response.data[0].latitude, response.data[0].longitude])
          });
        },
},
}


</script>

<style>
#mapid { width: 88%; height: 300px}
</style>
