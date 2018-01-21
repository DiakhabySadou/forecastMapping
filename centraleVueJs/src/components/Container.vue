<template>
  <div class="container">
 <Row  :url="url"/>
  </div>
</template>
<<script>
    import Row from '../components/Row'
    
    export default {
  name: 'Container',
    props:  ['url'],
  components: {
    Row
  },
   created: function()
        {
          console.log("sdfsdfsdf"+this.url);
          
        }

}
</script>