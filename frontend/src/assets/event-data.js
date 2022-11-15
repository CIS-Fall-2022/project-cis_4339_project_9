export const eventChartData = {
    type: "line",
    data: {
      labels: ["GEFORCE", "Anime Matsuri", "PC Builder Con", "Japanese Car Meet", "Alumni Gathering"],
      datasets: [
        {
          label: "Number of People that Signed up For Events",
          data: [1, 2, 3, 4, 2, 3, 4, 5],
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
