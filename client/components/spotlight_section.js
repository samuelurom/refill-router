const spotlightSection = document.querySelector(".spotlight-section");

spotlightSection.innerHTML = `
  <div class="spotlight-header col-2-full">
    <h2>Spotlight</h2>
    <a href="">refresh</a>
  </div>
  <div class="spotlight-body col-2-full">
  </div>
`;

const refreshBtn = document.querySelector(".spotlight-header a");
refreshBtn.addEventListener("click", handleRefresh);

function handleRefresh(e) {
  e.preventDefault();
  loadRandomStation();
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
