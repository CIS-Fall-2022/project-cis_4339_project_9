export const eventChartData = {
  type: "line",
  data: {
    labels: ["GEFORCE RTX CON", "Anime Matsuri", "PC Builder Con", "Japanese Import Car Meet", "Alumni Gathering"],
    datasets: [
      {
        label: "Number of Attendees",
        data: [6, 4, 2, 4, 2, 3, 4, 1],
        backgroundColor: "rgba(71, 183,132,.5)",
        borderColor: "#47b784",
        borderWidth: 3
      }
    ]
  },
  options: {
    responsive: true,
    lineTension: 1
  }
};

export default eventChartData;
