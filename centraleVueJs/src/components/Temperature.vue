<template>
   <div class="card temperature" >
       <p >
           <span class="temp-value">{{ temperature }}<span>°C</span></span>  
       </p>
       <img  alt="100%x280" style="height: 280px; width: 100%; display: block;text-align: center;overflow: hidden;background-color: aqua" src="../assets/image/temperature.jpg" data-holder-rendered="true">          
    </div>
</template>

<script>
export default {
  name: 'Temperature',
  props:  ['temperature']
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

