let map;

async function initMap() {
  const { Map } = await google.maps.importLibrary("maps");

  map = new Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
  });

  const stationIcons = {
    Caltex: "Caltex.png",
    "7-Eleven Pty Ltd": "7-Eleven_Pty_Ltd.png",
    United: "United.png",
    Shell: "Shell.png",
    Mobil: "Mobil.png",
    Liberty: "Liberty.png",
    BP: "BP.png",
  };

  //// MAP CENTER LOCATION  ////
  let latitudeCordinates = document.querySelector(".map-latitude");
  let longitudeCordinates = document.querySelector(".map-longitude");

  google.maps.event.addListener(map, "center_changed", function () {
    const center = this.getCenter();
    const latitude = center.lat();
    const longitude = center.lng();
    console.log("current latitude is: " + latitude);
    console.log("current longitude is: " + longitude);

    latitudeCordinates.innerHTML = latitude;
    longitudeCordinates.innerHTML = longitude;
  });
  ////////////////////////////

  fetch("http://localhost:8080/api/stations/all")
    .then((res) => res.json())
    .then((stations) => {
      console.log(stations);
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
      }
    });
}

initMap();
