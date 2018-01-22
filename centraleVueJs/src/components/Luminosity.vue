<template>
  <div class="card lum">
    <p >
      <span class="temp-value">{{luminosity}}<span>lux</span></span>  
     </p>
     <img  alt="100%x280" class="imgStyle" src="../assets/image/lum.jpg" data-holder-rendered="true">
 </div>
</template>

<script>
export default {
    name: 'Lumisosity',
      props:  ['luminosity']

}
</script>

<style>

</style>
