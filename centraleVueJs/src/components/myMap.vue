<template>
  <div style="z-index:2000" class="col-md-10">
     <div id="mapid" style=" margin-bottom:2%"></div>
     <div style="display:none">
       {{tabLocation}}
     </div>
     {{fetchItems()}}
   </div>
</template>

<script>
export default
    {
          name: 'myMap',
          props:  ['url','tabLocation','sonde'],
          data: function(){
            return {
              markers:null,
              mymap:null,
            }
          }
     ,
     mounted:function()
       {
          this.mymap=L.map('mapid').setView([51.505, -0.09], 2)
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

      methods:
      {
        fetchItems()
        {  // initUri()
          if (this.markers!=null) {
            this.markers.clearLayers();
          }

          this.axios.get(this.url+"/last/location").then((response) => {
            var latitude=(response.data.location)?response.data.location[0].latitude:response.data[0].latitude;
            var longitude=(response.data.location)?response.data.location[0].longitude:response.data[0].longitude;

          L.marker([latitude, longitude])
          .bindPopup("<b>"+this.sonde+"</b><br>").openPopup()
          .addTo(this.markers);
          for (var i = 0; i < this.tabLocation.length; i++)
          {
            if ("Sonde " +this.tabLocation[i].sondeId!=this.sonde)
            {
              L.marker([this.tabLocation[i].latitude, this.tabLocation[i].longitude])
              .bindPopup("<b>Sonde "+this.tabLocation[i].sondeId+"</b><br>").openPopup()
              .addTo(this.markers);
            }
          }
          this.mymap.setView([latitude, longitude])
          });
        },
      },
}


</script>

<style>
#mapid { width: 88%; height: 300px}
</style>
