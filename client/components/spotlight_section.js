const spotlightSection = document.querySelector(".spotlight-section");
let currentBgIndex = 0;

const bgImages = [
  "blurr-bg-green.png",
  "blurr-bg-orange.png",
  "blurr-bg-blue.png",
  "blurr-bg-red.png",
];

spotlightSection.innerHTML = `
  <div class="spotlight-header col-2-full">
    <h2>Spotlight</h2>
    <a href=""><img class="refresh-icon" src="./images/refresh.png" />
    </a>
  </div>
  <div class="spotlight-body col-2-full">
  </div>
`;

const refreshBtn = document.querySelector(".spotlight-header a");
refreshBtn.addEventListener("click", handleRefresh);

function handleRefresh(e) {
  e.preventDefault();
  loadRandomStation();
  switchBackgroundImage();
}

function switchBackgroundImage() {
  currentBgIndex = (currentBgIndex + 1) % bgImages.length;
  spotlightSection.style.backgroundImage = `url('./images/${bgImages[currentBgIndex]}')`;
}

function renderSpotight(title, address, image) {
  return `
    <div>
      <h3 class="spotlight-title">${title}</h3>
      <p class="spotlight-address">${address}</p>
    </div>
    <img src="${image}" alt="${title}, ${address}">
  `;
}

function loadRandomStation() {
  findRandom().then((station) => {
    const spotlightBodyDiv = document.querySelector(".spotlight-body");
    spotlightBodyDiv.innerHTML = "";

    spotlightBodyDiv.innerHTML = renderSpotight(
      station[0].name,
      station[0].address,
      getIcon(station[0].owner)
    );
  });
}

// load random station on page load
loadRandomStation();
