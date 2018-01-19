
<template>
<div class="card atmo" >
     <p >
     <span class="temp-value">{{pressure}}<span>hPa</span></span>  
     </p>
     <img  alt="100%x280" style="height: 280px; width: 100%; display: block;" src="../assets/image/atmo.jpg" data-holder-rendered="true">
 </div>
</template>

<script>
export default {
 name: 'Pressure',
   props:  ['pressure']
}
</script>

<style>

</style>

