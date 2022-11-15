<template>
  <main>
    <div>
      <h1 class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10">Welcome!</h1>
    </div>
    <div class="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
          <h2 class="text-2xl font-bold">Events for Client</h2>

          <div class="flex flex-col col-span-2">
            <table class="min-w-full shadow-md rounded">
              <thead class="bg-gray-50 text-xl">
                <tr>
                  <th class="p-4 text-left">Event Name</th>
                  <th class="p-4 text-left">Date</th>
                  <th class="p-4 text-left"># of Attendees</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-300">
                <tr v-for="event in clientEvents" :key="event._id">
                  <td class="p-2 text-left">{{ event.eventName }}</td>
                  <td class="p-2 text-left">{{ formattedDate(event.eventDate) }}</td>
                  <td class="p-3 text-left">{{ event.attendees.length}}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
  </main>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import axios from "axios";
import { DateTime } from "luxon";

export default {
  props: ["id"],
  setup() {
    return { v$: useVuelidate({ $autoDirty: true }) };
  },
  data() {
    return {
      // list of events shown in table
      clientEvents: [],
    };
  },
  mounted() {
    window.scrollTo(0, 0);
  },
  beforeMount() {
    axios
      .get(
        import.meta.env.VITE_ROOT_API +
          `/eventdata/`
      )
      .then((resp) => {
        let data = resp.data;
        resp.data.forEach((event) => {
          this.clientEvents.push({
            eventName: event.eventName,
            eventDate: event.date,
            attendees: event.attendees
          });
        });
      });
  },
  methods: {
    formattedDate(datetimeDB) {
      return DateTime.fromISO(datetimeDB).plus({ days: 1 }).toLocaleString();
    },
},
};
</script>
