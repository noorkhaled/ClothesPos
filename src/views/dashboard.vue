
<template>
  <div class="aboutPage">
    <div class="gradient-section">
      <!-- <h1 class="title">About us</h1> -->
  <div class="d-flex text">
    <div class="card ">
      <h2>
        عدد القطع المباعة من كل فرد
      </h2>
      <Chart type="pie" :data="chartData" :options="chartOptions"  class="h-30rem w-15rem" />
      </div>

      <div class="card">
        <h2>
          المبيعات  من حيث الكمية و السعر طبفا للاصناف
        </h2>
    <Chart type="bar" :data="chartDatabar" :options="chartOptions" class="h-30rem w-15rem"  />
    <hr>

    <h2>
          المبيعات  من حيث الكمية و السعر طبفا للتواريخ
        </h2>
    <Chart type="line" :data="chartlinebar" :options="chartOptions" class="h-30rem w-15rem" />

  </div>
  <div
  class="card"
  >
<h2 style="">
  عدد القطع المباعة اليوم
  {{ TODAY_CNT }}
</h2>
<h2>
  مبيعات اليوم
  {{ TODAY_SALES }}
</h2>
<hr>
<h2>
        قيمة مبيعات كل فرد
      </h2>
<Chart type="bar" :data="chartData2" :options="chartOptions"  class="h-30rem w-15rem"/>

</div>

  </div>
</div>
    <img class="heroAbout" src="@/assets/img/heroAbout.jpg" />
  </div>

 
</template>

<script >

import "primevue/resources/primevue.min.css";
import Chart from 'primevue/chart';
export default{
  components:{
    Chart
  },
  data(){
    return {
      chartlinebar:{ labels: [],
        datasets: [
            {
                label: 'العدد',
                backgroundColor: '#5468ff',
                borderColor: '#5468ff',
                data: []
            },
            {
                label: 'السعر',
                backgroundColor: '#ec4899',
                borderColor:'#ec4899',
                data: []
            }
        ]},
      chartDatabar:{ labels: [],
        datasets: [
            {
                label: 'العدد',
                backgroundColor: '#5468ff',
                borderColor: '#5468ff',
                data: []
            },
            {
                label: 'السعر',
                backgroundColor: '#ec4899',
                borderColor:'#ec4899',
                data: []
            }
        ]},

       chartOptions:{
  plugins: {
      legend: {
          labels: {
              usePointStyle: true
          }
      }
  }
},
chartData:{
      labels: [],
      datasets: [
          {
              data: [],
              backgroundColor: [
              '#198754',
'#ffc107',
'#0d6efd',
'#dc3545' 
             ],
            borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)'],
          }
      ]
  },
  chartData2:{
      labels: [],
      datasets: [
          {
              data: [],
              backgroundColor: [       
              '#dc3545',
              '#ffc107',
'#0d6efd',

'#198754',
],
            borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)'],
          }
      ]
  },
  TODAY_CNT:0,
  TODAY_SALES:0,
    }
  },
  methods:{
    MY_DASHBOARD(){
this.$store.dispatch("GetDashboard").then(res=>{
  // if(res.data.StatusCode="200")
  // {
    
res.data.USERS.forEach(element => {
  
  this.chartData.labels.push(element.CR_NAME)
  this.chartData2.labels.push(element.CR_NAME)

  this.chartData.datasets[0].data.push(element.COUNT_ITEMS)
  this.chartData2.datasets[0].data.push(element.SELL_PRICE)
  
  
})
    
res.data.ITEMS.forEach(element => {
  
  this.chartDatabar.labels.push(element.ITEM_NAME)
  

  this.chartDatabar.datasets[0].data.push(element.QTY)
  this.chartDatabar.datasets[1].data.push(element.SELL_PRICE)


  
  
}



);

    
res.data.ORDERS.forEach(element => {
  
  this.chartlinebar.labels.push(element.ORDER_DATE)
  

  this.chartlinebar.datasets[0].data.push(element.COUNT_ORDERS)
  this.chartlinebar.datasets[1].data.push(element.SELL)


  
  
}



);
res.data.TODAY_SALES.forEach(element => {
  
  this.TODAY_SALES+=element.TODAY_SALES


  
  
})
this.TODAY_CNT=res.data.TODAY_SALES.length
    

// }
}
)    }
  },
  mounted(){
    this.MY_DASHBOARD()
  }
}

 

</script>


<style scoped>
.card{
  width: 30%;
}
.gradient-section {
  display: flex;
  flex-direction: column;
  position: fixed;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(transparent, rgb(0, 0, 0));
  z-index: -1;
  text-align: center;
  align-items: center;
  justify-content: top;
  overflow: hidden;
}
.gradient-section .title {
  position: absolute;
  align-self: center;
  text-align: center;
  letter-spacing: 0.3em;
  font-weight: 100;
  text-indent: 0.3em;
  font-size: 3rem;
  color: #fff;
  text-transform: uppercase;
  font-family: "Magisho", sans-serif;
  margin-top: 6em;
  text-shadow: 1px 1px 2px black;
}
.gradient-section .text {
  position: absolute;
  align-self: center;
  text-align: center;
  font-family: "Magisho", sans-serif;
  font-size: 1.3rem;
  font-weight: 100;
  letter-spacing: 0.1em;
  margin-top: 10em;
  /* padding: 0em 20em; */
  width:100%;
  text-shadow: 1px 1px 2px black;
  color: #fff;
}

.heroAbout {
  position: fixed;
  right: 0;
  bottom: 0;
  z-index: -5;
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  z-index: -2;
  object-position: top;
  animation: fade-in 0.5s forwards;
  overflow: hidden;
}

@media only screen and (max-width: 600px) {
  .gradient-section .title {
    font-size: 2rem;
  }
  .gradient-section .text {
    font-size: 1rem;
    width: 40vh;
  }
}

</style>