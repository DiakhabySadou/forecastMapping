<template>
  <div>

    <canvas  ref='temperature' class="col-xs-4 col-md-6" title="Température" width="500px"  ></canvas>

    <canvas  ref='pressure' class="col-xs-4 col-md-6" title="Pression" width="500px" ></canvas>

    <canvas  ref='myChart3' class="col-xs-4 col-md-6" title="hello" width="500px" ></canvas>
    <canvas  ref='myChart4' class="col-xs-4 col-md-6" title="hello" width="500px" ></canvas>
    <canvas  ref='myChart5' class="col-xs-4 col-md-6" width="500px" ></canvas>
    <canvas  ref='myChart6' class="col-xs-4 col-md-6" width="500px" ></canvas>
  </div>

</template>

<script>

export default {
  name: 'Chart',
   props:['datas'],

   mounted : function()
   {
     var ctx = this.$refs.temperature.getContext('2d');
     this.drawCanvas(ctx,this.groupByDate(this.datas.temperature)[0],this.groupByDate(this.datas.temperature)[1]);

     var ctxpressure = this.$refs.pressure.getContext('2d');
     this.drawCanvas(ctxpressure,this.groupByDate(this.datas.pressure)[0],this.groupByDate(this.datas.pressure)[1]);
   },
   methods:
   {
     groupByDate(object)
     {
       Array.prototype.groupBy = function(prop)
       {
       return this.reduce(function(groups, item) {
         var val = item[prop];
         groups[val] = groups[val] || [];
         groups[val].push(item);
         return groups;
       }, {});}

       var bydate = object.groupBy('date');
       var values = [];
       var labels =  Object.keys(bydate);
       Object.keys(bydate).forEach(function(key,index) {
  	      var moy =0;
          for(var i= 0; i<Object.values(bydate)[index].length;i++)
          {moy +=Object.values(bydate)[index][i].value};
  	       moy=moy/Object.values(bydate)[index].length;
           values.push(moy);
  	        console.log(moy,Object.values(bydate)[index].length)
          });
      return [labels,values];
     },
     drawCanvas(ctx,lab,dat)
     {

       var myChart = new Chart(ctx, {
         type: 'bar',
         data: {
        labels: lab,
        datasets: [{
            label: '# of Votes',
            data: dat,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:false
                }
            }]
        },
        responsive:false
    }
  });
     }
   }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
