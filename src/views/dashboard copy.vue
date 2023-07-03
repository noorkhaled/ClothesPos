
<template>
  <div class="card flex justify-content-center">
      <Chart type="pie" :data="chartData" :options="chartOptions" class="w-full md:w-30rem" />
      <Chart type="bar" :data="chartData" :options="chartOptions" />

      <div @click="CHAGE">HSASSAASSA</div>
  </div>
</template>

<script setup>

import { ref, onMounted } from "vue";
import "primevue/resources/primevue.min.css";
import Chart from 'primevue/chart';
onMounted(() => {
  chartData.value = setChartData();
});

const chartData = ref();
const chartOptions = ref({
  plugins: {
      legend: {
          labels: {
              usePointStyle: true
          }
      }
  }
});

const setChartData = () => {
  const documentStyle = getComputedStyle(document.body);
  this.$store.dispatch("GetDashboard").then(res=>{
    debugger
  })
  return {
      labels: ['A', 'B', 'C'],
      datasets: [
          {
              data: [540, 325, 702],
              backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)'],
            borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)'],
          }
      ]
  };
 
};
</script>


<style scoped>
.card{
  width: 30%;
}
</style>