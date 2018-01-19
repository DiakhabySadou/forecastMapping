<template>
   <div class="wrapper">
            <!-- Sidebar Holder -->
            <nav id="sidebar">
                <div class="sidebar-header">
                    <h3>Centrale Sidebar</h3>
                </div>

                <ul class="list-unstyled components">
                    
                    <li class="active">
                        <a href="#homeSubmenu" data-toggle="collapse" aria-expanded="false">Sondes</a>
                        <ul class="collapse list-unstyled" id="homeSubmenu">
                            <li><a href="#">Sonde 2</a></li>
                            <li><a href="#">Sonde 3</a></li>
                            <li><a href="#">Sonde 4</a></li>
                            <li><a href="#">Sonde 5</a></li>
                            <li><a href="#">Sonde 6</a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="#pageSubmenu" data-toggle="collapse" aria-expanded="false">Historique</a>
                        <ul class="collapse list-unstyled" id="pageSubmenu">
                            <li><a href="#">1 semaine</a></li>
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

        <container/>

     </div>
  
</template>
<script>   
import Container from '../components/Container'
    export default {
  name: 'Wrapper',
   components: {
       Container,
   }
 
}
</script>