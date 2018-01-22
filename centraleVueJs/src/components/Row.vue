<template>
  <div class="row">
 <Temperature :temperature="temp"></Temperature>
 <Humidity :humidity="hum"></Humidity>
 <Pressure :pressure="pre" > </Pressure>
 <Rain :rain="rain"></Rain>
 <Luminosity :luminosity="lum"></Luminosity>
 <Wind :wind="wind"></Wind>
  
{{fetchItems()}}
  </div>
</template>
<script>
   
    import Temperature from '../components/Temperature'
    import Humidity from '../components/Humidity'
    import Luminosity from '../components/Luminosity'
    import Pressure from '../components/Pressure'
    import Rain from '../components/Rain'
    import Wind from '../components/Wind'
    export default {
  name: 'Row',
  data:  function() {
    return {
    
    items: [],
       temp: 0,
       hum: 0,
       pre: 0,
       rain: 0,
       lum: 0 ,
       wind: 0,
     
        
    }
   
   },
     props:  ['url'] ,
    created: function()
        {
            this.fetchItems();
        },

 methods: {
           
            fetchItems()
            {
             // initUri()
             console.log("+++++++"+this.url) 
              this.axios.get(this.url+"/last").then((response) => {
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
  components: {
    Temperature,
    Humidity,
    Luminosity,
    Pressure,
    Rain,
    Wind
  },

  
}
</script>

