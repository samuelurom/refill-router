function fetchStationsByBounds(swLat, neLat, swLng, neLng) {
  fetch(
    `/api/stations/bounds?neLat=${neLat}&neLng=${neLng}&swLat=${swLat}&swLng=${swLng}`
  )
    .then((res) => res.json())
    .then((stations) => {
      for (const station of stations) {
        const marker = new google.maps.Marker({
          position: { lat: station.lat, lng: station.lng },
          map: map,
          title: station.name,
          icon: {
            url: `/images/${stationIcons[station.owner] || "fuel_icon.png"}`,
            scaledSize: new google.maps.Size(45, 45),
          },
        });

        const infoWindow = new google.maps.InfoWindow({
          content: `<div> ${station.name}</div>
                        <div> ${station.address}</div>`,
        });

        marker.addListener("click", () => {
          closeAllInfoWindows();

          infoWindow.open({
            anchor: marker,
            map,
          });
          activeInfoWindow = infoWindow;
        });
      }
      const stationsList = document.querySelector(".stationsList"); // Select the .stationsList class

      stations.slice(0, 10).forEach((station) => {
        const stationElement = document.createElement("div");
        stationElement.className = "nearest-station-item";
        stationElement.innerHTML = `
          <img src="/images/${
            stationIcons[station.owner] || "fuel_icon.png"
          }" alt="${station.name}">
          <div>
            <p>${station.name}</p>
            <p>${station.address}</p>
          </div>
        `;
        stationsList.appendChild(stationElement);
      });
    });

  let activeInfoWindow;
  function closeAllInfoWindows() {
    if (activeInfoWindow) {
      activeInfoWindow.close();
    }
  }
}
