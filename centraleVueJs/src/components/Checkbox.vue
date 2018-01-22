<template>
  <div class="card vent">
        <input type="checkbox" value="temperature" v-checkData>Température
        <input type="checkbox" value="humidity">Humidité
        <input type="checkbox" value="luminosity">Luminosité
        <input type="checkbox" value="wind_heading">Direction du vent
        <input type="checkbox" value="wind_speed_min">Vitesse minimale du vent
        <input type="checkbox" value="wind_speed_max">Vitesse minimale du vent
        <input type="checkbox" value="wind_speed_avg">Moyenne vent

 </div>
</template>

<script>
export default {
    name: 'Checkbox',

    props:  ['url'],

    directives: {
         checkData: function(el,binding,vnode){
            console.log(el);
         }
       }
}
</script>

<style>

</style>
