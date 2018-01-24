<template>
   <div class="card temperature" >
       <p >
           <span class="temp-value">{{ temperature }}<span>°C</span></span>
       </p>
       <img  alt="100%x280" style="width: 100% ;display: block;text-align: center;overflow: hidden;background-color: aqua" src="../assets/image/temperature.jpg" data-holder-rendered="true">          
    </div>
</template>

<script>
export default {
  name: 'Temperature',
  props:  ['temperature'],
  data: function(){
      return {
          src: "../assets/image/temperature.jpg",
      }

  },
  created: function(){

      this.src = (this.temperature<10)?"../assets/image/image_bis/a.png" : "../assets/image/temperature.jpg"
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
