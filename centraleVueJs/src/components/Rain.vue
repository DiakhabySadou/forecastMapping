<template>
  <div class="card pluie">
       <p >
      <span class="temp-value">{{rain}}<span>mm/1h</span></span>
       </p>
      <img  alt="100%x280" style="height: 280px; width: 100%; display: block;" src="../assets/image/pluie.jpg" data-holder-rendered="true">
 </div>
</template>

<script>
export default {
    name: 'Rain',
     props:  ['rain']
}
</script>

<style>

</style>
