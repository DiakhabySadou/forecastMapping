<template>
   <div class="card humidity">
      <p >
        <span class="temp-value">{{humidity}}<span>%HR</span></span>  
      </p>
     <img class="imgStyle" alt="100%x280" style="height: 280px; width: 100%; display: block;" src="../assets/image/hum.jpeg" data-holder-rendered="true">
    </div>
</template>

<script>
export default {
  name: 'Humidity',
   props:  ['humidity'],
   
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

