<template>
  <div class="card vent">
        <p >
         <span class="temp-value">{{wind}}<span>km/h</span></span>
        </p>
         <img  alt="100%x280" style=" width: 100%; display: block;" src="../assets/image/vent.jpg" data-holder-rendered="true">
     </div>
</template>

<script>
export default {
    name: 'Wind',

    props:  ['wind']

}
</script>

<style>

</style>
