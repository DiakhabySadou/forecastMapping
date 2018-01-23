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
                            <li><a href="#" v-on:click="sonde1">Sonde 1</a></li>
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
                            <li><a  href="#" v-on:click="week_click" ref="week">1 semaine</a></li>
                            <li><a href="#" v-on:click="month_click">1 mois</a></li>
                            <li><a href="#" v-on:click="year_click">1 an</a></li>
                        </ul>
                    </li>

                    <li>
                        <a href="#">{{sonde}}</a>
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


        <container :url="url" :hide="hide" />
        <Historique :url="url"   :hideHist="hideHist" :histo="histo" />

     </div>

</template>
<script>
import Container from '../components/Container'
import Historique from '../components/Historique'
    export default {
  name: 'Wrapper',

  data: function() {
  return {
    url: "http://172.31.43.65:3000",
     week_clicked: false,
     container_clicked: true,
     hide: false,
     sonde:"sonde 1",
     hideHist: true,
     histo: {
        week: false,
        month:false,
        year:false,
     }
     

 }
  },
  created: function(){


  },
  methods: {
       sonde1: function(){
           this.sonde="sonde 1"
          this.url="http://172.31.43.65:3000"
      },
      sonde2: function(){
           this.sonde="sonde 2"

          this.url="http://172.31.43.60:3000"

      },
       sonde3: function(){
                      this.sonde="sonde 3"

          this.url="http://172.31.43.61:3000"
      },
       sonde4: function(){
                     this.sonde="sonde 4"
 
          this.url="http://localhost:3004"

      },
       sonde5: function(){
                      this.sonde="sonde 5"

          this.url="http://localhost:3005"

      },
       sonde6: function(){
                      this.sonde="sonde 6"

          this.url="http://localhost:3006"

      },
      week_click: function(){  
        this.hideHist= false;
        this.histo.week=true;
        this.histo.year=false;
        this.histo.month=false;
        this.hide=true;


        

      },
      month_click(){
        this.hideHist= false;
        this.hide=true;
        this.histo.week=false;
        this.histo.year=false;
        this.histo.month=true;
      },
       year_click(){
        this.hideHist= false;
        this.hide=true;
        this.histo.week=false;
        this.histo.year=true;
        this.histo.month=false;
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

<style >
</style>
