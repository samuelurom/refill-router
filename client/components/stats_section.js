const statsSection = document.querySelector(".stats-section");

function renderStats() {
  const html = `
    <h2>Stats</h2>
    <h3>Total Stations: <span class="stations-stats"></span></h3>
    <h3>Total Owners: <span class="owners-stats"></span></h3>
    <canvas class="stats-chart"></canvas>
  `;

  return html;
}

const stats = document.createElement("div");
stats.innerHTML = renderStats();
statsSection.appendChild(stats);

// Render Chart
document.addEventListener("DOMContentLoaded", function () {
  let chartCanvas = document.querySelector(".stats-chart");
  let ctx = chartCanvas.getContext("2d");

  fetch("http://localhost:8080/api/stats")
    .then((res) => res.json())
    .then((stats) => {
      console.log(stats);

      const totalStationsSpan = document.querySelector(".stations-stats");
      const totalOwnersSpan = document.querySelector(".owners-stats");
      totalStationsSpan.textContent = stats.total_stations;
      totalOwnersSpan.textContent = stats.total_owners;

      let statsChart = new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: stats.owners.map((station) => station.owner),
          datasets: [
            {
              data: stats.owners.map((station) => Number(station.total)),
              backgroundColor: [
                "red",
                "teal",
                "yellow",
                "green",
                "purple",
                "orange",
                "blue",
              ],
            },
          ],
        },
        options: {
          cutout: "70%",
        },
      });
    });
});
