

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
                    <li><a href="#" v-on:click="week_click">1 semaine</a></li>
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

    <container :url="url" v-hide />
    <Historique v-hide />

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
            week: false
        }
    },
    methods: {
        sonde2: function() {

            this.url = "http://localhost:3000/last/all"
                //console.log(this.url)
            this.$emit("url", this.url)

        },
        sonde3: function() {
            this.url = "http://localhost:3003/last/all"
                // console.log(this.url)
            this.$emit("url", this.url)

        },
        sonde4: function() {
            this.url = "http://localhost:3004/last/all"
                // console.log(this.url)
            this.$emit("url", this.url)

        },
        sonde5: function() {
            this.url = "http://localhost:3005/last/all"
                // console.log(this.url)
            this.$emit("url", this.url)

        },
        sonde6: function() {
            this.url = "http://localhost:3006/last/all"
                // console.log(this.url)
            this.$emit("url", this.url)

        },
        week_click: function() {
            console.log(this.week);
            this.week = true;
            this.$emit("week_click", this.week)
        },
        updateUrl: function() {
            console.log(this.url)

            return {
                url: this.url
            }
        }

    },
    directives: {
        hide: function(el, binding, vnode) {
            console.log(el);
            let isClick = vnode.tag === "vue-component-4-Historique"
            if (isClick) {
                //  el.style.display="none"
                //this.week= false
            } else {
                // el.style.display= this.week? "none":"block"

            }

        }
    },

    components: {
        Container,
        Historique
    }

}

</script>
