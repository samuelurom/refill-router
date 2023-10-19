function loadNearestStations(stations) {
  const stationsList = document.querySelector(".stationsList"); // Select the .stationsList class
  stationsList.innerHTML = "";
  const heading = document.createElement("h2");
  heading.textContent = "Nearest";
  stationsList.appendChild(heading);

  stations.forEach((station) => {
    const stationElement = document.createElement("div");
    stationElement.className = "nearest-station-item";
    stationElement.innerHTML = `
            <img src="/images/${
              stationIcons[station.owner] || "fuel_icon.png"
            }" alt="${station.name}">
            <div>
            <p>${station.name} <strong>${station.distance.toFixed(
      2
    )} km's</strong></p>
  
              <p>${station.address}</p>
             
            </div>
          `;
    stationsList.appendChild(stationElement);
  });
}
