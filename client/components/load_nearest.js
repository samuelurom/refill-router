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
            <p><a href="" class="${station.lat} ${station.lng}">${
      station.name
    }</a> <strong>${station.distance.toFixed(2)} km</strong></p>
  
              <p>${station.address}</p>
             
            </div>
          `;

    stationsList.appendChild(stationElement);
  });

  const nearestTitles = document.querySelectorAll(".nearest-station-item a");

  nearestTitles.forEach((stationTitle) => {
    stationTitle.addEventListener("click", handleChangeNearestCenter);
  });

  function handleChangeNearestCenter(e) {
    e.preventDefault();
    initMap(Number(e.target.classList[0]), Number(e.target.classList[1]));
  }
}
