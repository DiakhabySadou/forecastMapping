<template>
  <div class="container" v-if="!hide" >
 <Row  :url="url"/>  
  </div>

</template>
<<script>
    import Row from '../components/Row'
    
    export default {
  name: 'Container',
    props:  ['url','hide'],
  components: {
    Row
  },
   created: function()
        {
          console.log("++++++"+this.hide);
          
        }

}
</script>

