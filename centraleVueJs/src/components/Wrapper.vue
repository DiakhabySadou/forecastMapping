<template>
   <div class="wrapper">
            <!-- Sidebar Holder -->
            <nav id="sidebar">
                <div class="sidebar-header">
                    <h3>Centrale Sidebar</h3>
                </div>

                <ul class="list-unstyled components">
                    
                    <li class="active" v-on:click="switchContainer" >
                        <a href="#homeSubmenu" data-toggle="collapse" aria-expanded="false">Sondes</a>
                        <ul class="collapse list-unstyled" id="homeSubmenu">
                            <li><a href="#" v-on:click="sonde2">Sonde 2</a></li>
                            <li><a href="#" v-on:click="sonde3">Sonde 3</a></li>
                            <li><a href="#" v-on:click="sonde4">Sonde 4</a></li>
                            <li><a href="#" v-on:click="sonde5">Sonde 5</a></li>
                            <li><a href="#" v-on:click="sonde6">Sonde 6</a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="#pageSubmenu" data-toggle="collapse" aria-expanded="false">Historique</a>
                        <ul class="collapse list-unstyled" id="pageSubmenu">
                            <li><a  href="#" v-on:click="week_click">1 semaine</a></li>
                            <li><a href="#">1 mois</a></li>
                            <li><a href="#">1 an</a></li>
                        </ul>
                    </li>
                   
                    <li>
                        <a href="#">Contact</a>
                    </li>
                </ul>

               
            </nav>

            <!-- Page Content Holder -->
            <div id="content">

                <nav class="navbar navbar-default">
                    <div class="container-fluid">

                        <div class="navbar-header">
                            <button type="button" id="sidebarCollapse" class="btn btn-info navbar-btn">
                                <i class="glyphicon glyphicon-align-left"></i>
                                <span>Menu</span>
                            </button>
                        </div>

                       
                    </div>
                </nav>
          </div>
<<<<<<< HEAD

        <container :url="url" v-hide />
        <Historique  v-hide/>

=======
        
        <container :url="url" :hide="hide" />
        <Historique :url="url"   :hideHist="hideHist" />
>>>>>>> 65eea39cab06016b16ac7911d2f508ad2bceeec7
     </div> 
  
</template>
<script>   
import Container from '../components/Container'
import Historique from '../components/Historique'
    export default {
  name: 'Wrapper',

  data: function() {
  return {
    url: "http://localhost:3000/last/all",
     week_clicked: false,
     container_clicked: true, 
     hide: false,
     hideHist: true,

 }
  },
  created: function(){
     

  },
  methods: {
      sonde2: function(){

          this.url="http://localhost:3000/last/all"
          //console.log(this.url)
          this.$emit("url", this.url)
          
      },
       sonde3: function(){
          this.url="http://localhost:3003/last/all"
         // console.log(this.url)
          this.$emit("url", this.url)

      },
       sonde4: function(){
          this.url="http://localhost:3004/last/all"
         // console.log(this.url)
          this.$emit("url", this.url)

      },
       sonde5: function(){
          this.url="http://localhost:3005/last/all"
         // console.log(this.url)
          this.$emit("url", this.url)

      },
       sonde6: function(){
          this.url="http://localhost:3006/last/all"
         // console.log(this.url)
          this.$emit("url", this.url)
      
      },
      week_click: function(){
        this.hideHist= false; 
        this.hide=true;
        this.$emit("hide", this.hide)
        this.$emit("hideHist", this.hideHist)
        
      },
      switchContainer: function () {
         this.hideHist=true;
          this.hide=false;
        this.$emit("hideHist", this.hide)
        this.$emit("hide", this.hide)
      },
      updateUrl: function(){
    console.log(this.url)

    return {
        url: this.url
    }
    }

  },
  
   components: {
       Container,
       Historique
   }
 
}
</script>
<<<<<<< HEAD
Fin de la discussion
Écrivez un message...

Sélect. fichiers
=======
<style >
</style>
>>>>>>> 65eea39cab06016b16ac7911d2f508ad2bceeec7
