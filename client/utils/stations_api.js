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
    });

  let activeInfoWindow;
  function closeAllInfoWindows() {
    if (activeInfoWindow) {
      activeInfoWindow.close();
    }
  }
}
