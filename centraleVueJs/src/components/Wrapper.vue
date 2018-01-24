<template>
   <div class="wrapper col-md-12" >
            <!-- Sidebar Holder -->
            <nav id="sidebar" class="col-md-2">
                <div class="sidebar-header">
                    <h3>Forecast Mapping</h3>
                </div>

                <ul class="list-unstyled components">

                    <li class="active" >
                        <a href="#homeSubmenu" data-toggle="collapse" aria-expanded="false">Sondes</a>
                        <ul class="collapse list-unstyled" id="homeSubmenu">
                            <li><a href="#" v-on:click="sonde1">Sonde 1</a></li>
                            <li><a href="#" v-on:click="sonde2">Sonde 2</a></li>
                            <li><a href="#" v-on:click="sonde3">Sonde 3</a></li>
                            <li><a href="#" v-on:click="sonde4">Sonde 4</a></li>
                            <li><a href="#" v-on:click="sonde5">Sonde 5</a></li>
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
                      <button v-on:click="getAllSonds" type="button" class="btn btn-info navbar-btn" style="margin-top:30%">Toutes les sondes</button>
                    </li>
                </ul>


            </nav>

            <!-- Page Content Holder -->
            <div id="content" class="col-md-1">

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
                <br><br><br><br>

          </div>

      <div style="display:inline;" class="col-md-9">
        <nav class="navbar navbar-inverse bg-default" style="text-align:center">
          <h1>{{sonde}}</h1></nav>
        <myMap :url="url" :sonde="sonde" :tabLocation="tabSync"></myMap>
        <container :url="url" :hide="hide" />
        <Historique :url="url" :hideHist="hideHist" :histo="histo" />
        
        <Comparative v-if="allSonds" :tabLocation.sync="tabSync"></Comparative>

      </div>

     </div>

</template>
<script>
import Container from '../components/Container'
import Historique from '../components/Historique'
import myMap from '../components/myMap'
import Comparative from '../components/Comparative'
    export default {
  name: 'Wrapper',
  props:['tabLocation'],
  data: function() {
  return {
    url: "http://172.31.43.65:3000",
     week_clicked: false,
     container_clicked: true,
     hide: false,
     sonde:"Sonde 1",
     hideHist: true,
     allSonds:false,
     tabSync:[],
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
           this.tabSync = [];this.sonde="Sonde 1"
           this.url="http://172.31.43.65:3000"
            this.switchContainer();
      },
      sonde2: function(){
           this.tabSync = [];this.sonde="Sonde 2"
           this.switchContainer();
          this.url="http://172.31.43.58:3000"

      },
       sonde3: function(){
                      this.tabSync = [];this.sonde="Sonde 3"
                      this.switchContainer();
          this.url="http://172.31.43.60:3000"
      },
       sonde4: function(){
                     this.tabSync = [];this.sonde="Sonde 4"
                     this.switchContainer();
          this.url="http://172.31.43.61:3000"

      },
       sonde5: function(){
                      this.tabSync = [];this.sonde="Sonde 5"
                      this.switchContainer();
          this.url="http://172.31.43.62:3000"

      },

      getAllSonds:function()
      {
          this.allSonds=true;
          this.hideHist= true;
          this.hide=true;
      },
      week_click: function(){
        this.hideHist= false;
        this.histo.week=true;
        this.histo.year=false;
        this.histo.month=false;
        this.hide=true;
        this.allSonds=false;

      },
      month_click(){
        this.hideHist= false;
        this.hide=true;
        this.histo.week=false;
        this.histo.year=false;
        this.histo.month=true;
        this.allSonds=false;
      },
       year_click(){
        this.hideHist= false;
        this.hide=true;
        this.histo.week=false;
        this.histo.year=true;
        this.histo.month=false;
        this.allSonds=false;
      },
      switchContainer: function () {
         this.hideHist=true;
          this.hide=false;
          this.allSonds=false;

      },

  },

   components: {
       Container,
       Historique,
       myMap,
       Comparative
   }

}
</script>

<style >
</style>
