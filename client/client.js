let map;
const stationIcons = {
  Caltex: "Caltex.png",
  "7-Eleven Pty Ltd": "7-Eleven_Pty_Ltd.png",
  United: "United.png",
  Shell: "Shell.png",
  Mobil: "Mobil.png",
  Liberty: "Liberty.png",
  BP: "BP.png",
};

let userLat;
let userLng;

navigator.geolocation.getCurrentPosition(async (position) => {
  userLat = await position.coords.latitude;
  userLng = await position.coords.longitude;
  console.log(userLat, userLng);
  initMap();
});

async function initMap() {
  const { Map } = await google.maps.importLibrary("maps");

  map = new Map(document.getElementById("map"), {
    center: { lat: userLat, lng: userLng },
    zoom: 13,
    minZoom: 9,
  });

  google.maps.event.addListener(map, "bounds_changed", function () {
    const bounds = this.getBounds();
    const ne = bounds.getNorthEast();
    const sw = bounds.getSouthWest();

    fetchStationsByBounds(sw.lat(), ne.lat(), sw.lng(), ne.lng());
  });

  //// MAP CENTER LOCATION  ////
  let latitudeCordinates = document.querySelector(".map-latitude");
  let longitudeCordinates = document.querySelector(".map-longitude");

  google.maps.event.addListener(map, "center_changed", function () {
    const center = this.getCenter();
    const latitude = center.lat();
    const longitude = center.lng();

    latitudeCordinates.innerHTML = latitude;
    longitudeCordinates.innerHTML = longitude;
  });
  ////////////////////////////
  //   fetch("http://localhost:8080/api/stations/all")
  //     .then((res) => res.json())
  //     .then((stations) => {
  //       for (const station of stations) {
  //         const marker = new google.maps.Marker({
  //           position: { lat: station.lat, lng: station.lng },
  //           map: map,
  //           title: station.name,
  //           icon: {
  //             url: `/images/${stationIcons[station.owner] || "fuel_icon.png"}`,
  //             scaledSize: new google.maps.Size(45, 45),
  //           },
  //         });

  //         const infoWindow = new google.maps.InfoWindow({
  //           content: `<div> ${station.name}</div>
  //                           <div> ${station.address}</div>`,
  //         });

  //         marker.addListener("click", () => {
  //           closeAllInfoWindows();

  //           infoWindow.open({
  //             anchor: marker,
  //             map,
  //           });
  //           activeInfoWindow = infoWindow;
  //         });
  //       }
  //     });

  //   let activeInfoWindow;
  //   function closeAllInfoWindows() {
  //     if (activeInfoWindow) {
  //       activeInfoWindow.close();
  //     }
  //   }
  // }
}
// Clock

function startTime() {
  let today = new Date();
  let hr = today.getHours();
  let min = today.getMinutes();
  let sec = today.getSeconds();
  ap = hr < 12 ? "<span>AM</span>" : "<span>PM</span>";
  hr = hr > 12 ? hr - 12 : hr;
  hr = checkTime(hr);
  min = checkTime(min);
  sec = checkTime(sec);

  document.getElementById("clock").innerHTML =
    hr + ":" + min + ":" + sec + " " + ap;

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let curWeekDay = days[today.getDay()];
  let curDay = today.getDate();
  let curMonth = months[today.getMonth()];
  let curYear = today.getFullYear();
  let date = curWeekDay + ", " + curDay + " " + curMonth + " " + curYear;
  document.getElementById("date").innerHTML = date;

  let time = setTimeout(function () {
    startTime();
  }, 500);
}
function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

// list of 10 stations
startTime();

// fetch("/api/stations/all")
//   .then((response) => response.json())
//   .then((stations) => {
//     const stationsList = document.querySelector(".stationsList"); // Select the .stationsList class

//     stations.slice(0, 10).forEach((station) => {
//       const stationElement = document.createElement("div");
//       stationElement.className = "nearest-station-item";
//       stationElement.innerHTML = `
//         <img src="/images/${
//           stationIcons[station.owner] || "fuel_icon.png"
//         }" alt="${station.name}">
//         <div>
//           <p>${station.name}</p>
//           <p>${station.address}</p>
//         </div>
//       `;
//       stationsList.appendChild(stationElement);
//     });
//   });

// function getLocation() {
//   navigator.geolocation.getCurrentPosition((position) => {
//     const lat = position.coords.latitude;
//     const lng = position.coords.longitude;
//     return {
//       lat,
//       lng,
//     };
//   });
// }
// console.log(getLocation());

// Latest Oil Prices
async function fetchData(symbol) {
  const url = `https://api.futures-api.com/last?symbol=${symbol}`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "x-api-key": "",
    },
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();
  return data;
}

let naturalGasPrice = document.querySelector(".last-naturalgas-price");
let crudeOilPrice = document.querySelector(".last-crude-price");
let brentOilPrice = document.querySelector(".last-brent-price");

fetchAndUpdatePrice("NG", naturalGasPrice, "Natural Gas");
fetchAndUpdatePrice("CL", crudeOilPrice, "WTI Crude Oil");
fetchAndUpdatePrice("BB", brentOilPrice, "Brent Oil");

async function fetchAndUpdatePrice(symbol, element, name) {
  try {
    let latestPrice;
    try {
      const data = await fetchData(symbol);
      console.log(`${symbol} Data:`, data.data[0].last);
      latestPrice = data.data[0].last;
    } catch (error) {
      console.error(error);
      switch (symbol) {
        case "NG":
          latestPrice = 3.09;
          break;
        case "CL":
          latestPrice = 88.45;
          break;
        case "BB":
          latestPrice = 91.36;
          break;
        default:
          latestPrice = "N/A";
      }
    }
    element.innerHTML = `${name}: $${latestPrice} USD`;
  } catch (error) {
    console.error(error);
  }
}
