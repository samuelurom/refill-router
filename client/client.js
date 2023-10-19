let map;
let marker;
let geocoder;
let responseDiv;
let response;

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

async function initMap(stationLat = null, stationLng = null) {
  if (stationLat && stationLng) {
    userLat = stationLat;
    userLng = stationLng;
  }

  const { Map } = await google.maps.importLibrary("maps");

  map = new Map(document.getElementById("map"), {
    center: { lat: userLat, lng: userLng },
    zoom: 13,
    minZoom: 9,
  });

  geocoder = new google.maps.Geocoder();
  // console.log("geocoder is here");

  google.maps.event.addListener(map, "bounds_changed", function () {
    const bounds = this.getBounds();
    const ne = bounds.getNorthEast();
    const sw = bounds.getSouthWest();

    fetchStationsByBounds(sw.lat(), ne.lat(), sw.lng(), ne.lng());
  });

  //// MAP CENTER LOCATION  ////
  let latitudeCordinates = document.querySelector(".map-latitude");
  let longitudeCordinates = document.querySelector(".map-longitude");
  let mapAddressPara = document.querySelector(".map-address");

  google.maps.event.addListener(map, "idle", function () {
    const center = this.getCenter();
    const latitude = center.lat();
    const longitude = center.lng();

    latitudeCordinates.textContent = latitude;
    longitudeCordinates.textContent = longitude;

    geocoder.geocode({ location: center }, function (results, status) {
      if (status === "OK") {
        if (results[0]) {
          mapAddressPara.textContent = results[0].formatted_address;
        } else {
          mapAddressPara.textContent = "Address not found";
        }
      } else {
        mapAddressPara.textContent = "Geocoder failed due to: " + status;
      }
    });
  });
  ////////////////////////////

  const inputText = document.createElement("input");

  inputText.type = "text";
  inputText.placeholder = "Enter a location";

  const submitButton = document.createElement("input");

  submitButton.type = "button";
  submitButton.value = "Enter Address";
  submitButton.classList.add("button", "button-primary");

  const clearButton = document.createElement("input");

  clearButton.type = "button";
  clearButton.value = "Clear";
  clearButton.classList.add("button", "button-secondary");
  response = document.createElement("pre");
  response.id = "response";
  response.innerText = "";
  responseDiv = document.createElement("div");
  responseDiv.id = "response-container";
  responseDiv.appendChild(response);

  const instructionsElement = document.createElement("p");

  map.controls[google.maps.ControlPosition.TOP_LEFT].push(inputText);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(submitButton);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(clearButton);
  marker = new google.maps.Marker({
    map,
  });
  map.addListener("click", (e) => {
    geocode({ location: e.latLng });
  });
  submitButton.addEventListener("click", () =>
    geocode({ address: inputText.value })
  );
  clearButton.addEventListener("click", () => {
    clear();
  });
  clear();

  // let button = document.querySelector(".lookup-address");

  // // Add an event listener to the button
  // button.addEventListener("click", function () {
  //   // console.log("Button clicked");
  //   let center = map.getCenter();

  //   geocoder.geocode({ location: center }, function (results, status) {
  //     if (status === "OK") {
  //       if (results[0]) {
  //         alert("Address: " + results[0].formatted_address);
  //       } else {
  //         window.alert("No results found");
  //       }
  //     } else {
  //       window.alert("Geocoder failed due to: " + status);
  //     }
  //   });
  // });
}

function clear() {
  marker.setMap(null);
  responseDiv.style.display = "none";
}

function geocode(request) {
  clear();
  geocoder
    .geocode(request)
    .then((result) => {
      const { results } = result;

      map.setCenter(results[0].geometry.location);
      marker.setPosition(results[0].geometry.location);
      marker.setMap(map);
      responseDiv.style.display = "block";
      response.innerText = JSON.stringify(result, null, 2);
      return results;
    })
    .catch((e) => {
      alert("Geocode was not successful for the following reason: " + e);
    });
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
