<template>
  <main>
    <div>
      <h1 class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10">Event Table and Graphs</h1>
    </div>
    <div class="px-10 pt-20">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
      </div>
    </div>
    

    <hr class="mt-10 mt-0" />
    <!-- Display Found Data -->
<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
      <div class="ml-10">
      </div>
      <div class="flex flex-col col-span-4">
        <table class="min-w-full shadow-md rounded">
          <thead class="bg-gray-400 text-xl">
            <tr>
              <th class="p-4 text-left text-red-700">Event Name</th>
              <th class="p-4 text-left text-red-700">Event Date</th>
              <th class="p-4 text-left text-red-700">Attendees</th>
            </tr>
              <tr>
              <th class="p-4 text-left">GEFORCE RTX CON </th>
              <th class="p-4 text-left">October 31st 2022</th>
              <th class="p-4 text-left">6</th>
            </tr>
              <tr>
              <th class="p-4 text-left">Anime Matsuri</th>
              <th class="p-4 text-left">November 12th 2022</th>
              <th class="p-4 text-left">4</th>
            </tr>
              <tr>
              <th class="p-4 text-left">PC Builder CON</th>
              <th class="p-4 text-left">November 20th 2022</th>
              <th class="p-4 text-left">2</th>
            </tr>
              <tr>
              <th class="p-4 text-left">JP Import Car Meet</th>
              <th class="p-4 text-left">October 14th 2022</th>
              <th class="p-4 text-left">4</th>
              <tr>
              <th class="p-4 text-left">UH Alumni Gathering</th>
              <th class="p-4 text-left">October 12th 2022</th>
              <th class="p-4 text-left">1</th>
            </tr>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-300">
          </tbody>
        </table>
      </div>
    </div>
  </main>



 <!-- form field start to load the chart and bar graph --> 
  <section class="container">
    <div class="columns">
      <div class="column">
        <h3 class="font-bold text-4xl text-green-700 tracking-widest text-center mt-10">Event Participation</h3>
        <EventChart />
      </div>
      <div class="column">
        <h3 class="font-bold text-4xl text-blue-700 tracking-widest text-center mt-10">Participation per Month</h3>
        <div>
          <div>
            <EnrollmentBar
              v-if="!loading && !error"
              :label="labels"
              :chart-data="enrolled"
            ></EnrollmentBar>

            <!-- Start of loading animation -->
            <div class="mt-40" v-if="loading">
              <p
                class="
                  text-6xl
                  font-bold
                  text-center text-gray-500
                  animate-pulse
                "
              >
                Loading...
              </p>
            </div>
            <!-- End of loading animation -->

            <!-- Start of error alert -->
            <div class="mt-12 bg-red-50" v-if="error">
              <h3 class="px-4 py-1 text-4xl font-bold text-white bg-red-800">
                {{ error.title }}
              </h3>
              <p class="p-4 text-lg font-bold text-red-900">
                {{ error.message }}
              </p>
            </div>
            <!-- End of error alert -->
            <br />
            <br />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import EventChart from "@/components/EventChart.vue";
import EnrollmentBar from "@/components/BarChartComponent.vue";

export default {
  components: {
    EventChart,
    EnrollmentBar,
  },
  data() {
    return {
      labels: [],
      enrolled: [],
      loading: false,
      error: null,
    };
  },
  methods: {
    async fetchData() {
      try {
        this.error = null;
        this.loading = true;
        const url = `http://localhost:3000/participation`;
        const response = await axios.get(url);
        //"re-organizing" - mapping json from the response
        this.labels = response.data.map((item) => item.monthName);
        this.enrolled = response.data.map((item) => item.participants);
      } catch (err) {
        if (err.response) {
          // client received an error response (5xx, 4xx)
          this.error = {
            title: "Server Response",
            message: err.message,
          };
        } else if (err.request) {
          // client never received a response, or request never left
          this.error = {
            title: "Unable to Reach Server",
            message: err.message,
          };
        } else {
          // There's probably an error in your code
          this.error = {
            title: "Application Error",
            message: err.message,
          };
        }
      }
      this.loading = false;
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>
