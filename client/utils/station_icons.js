const stationOwnerIcons = {
  Caltex: "Caltex.png",
  "7-Eleven Pty Ltd": "7-Eleven_Pty_Ltd.png",
  United: "United.png",
  Shell: "Shell.png",
  Mobil: "Mobil.png",
  Liberty: "Liberty.png",
  BP: "BP.png",
};

function getIcon(owner) {
  return `/images/${
    stationOwnerIcons[owner] || "fuel_icon.png"
  }" alt="${owner}`;
}
