<template>
  <div>
    <!-- canvas element for chart -->
    <canvas id="event-chart"></canvas>
  </div>
</template>


<script>
import { Chart, registerables } from 'chart.js'
import eventChartData from '../assets/event-data.js'

//we have to register the registerables with Chart object
Chart.register(...registerables);
export default {
  name: 'EventChart',
  data() {
    return {
      eventChartData: eventChartData
    }
  },
  //establish Chart object after mounting the component
  mounted() {
    const ctx = document.getElementById('event-chart');
    new Chart(ctx, this.eventChartData);
  }
}
</script>