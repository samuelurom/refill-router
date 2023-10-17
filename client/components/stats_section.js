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

  let statsChart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
      datasets: [
        {
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            "red",
            "blue",
            "yellow",
            "green",
            "purple",
            "orange",
          ],
        },
      ],
    },
    options: {
      cutout: "70%",
    },
  });
});
