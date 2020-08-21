import * as func from "./utils/helpers.js";

// application state
const state = {
  maps: null,
  locked: false
};

// ==========================
//      CREATING THE MAP
// ==========================

// associates api requests w/ mapbox account
mapboxgl.accessToken = "pk.eyJ1IjoiYXRsYW50YS"
  + "1tYXByb29tIiwiYSI6ImNrYmU2NXNyNjBpb2MyeG"
  + "81eWx0cWs4dm8ifQ.y8Pw9ScBzl9eI9IyKCem7A";

// creates and renders map in index.html
const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/satellite-v9",
  center: [-84.3924, 33.7488],
  zoom: 12
});

map.on("load", () => {
  map.getCanvas().focus();

  // getmaps post request
  fetch("/api/getmaps", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ active: true })
  })
    .then(async res => {
      // set state & add mapnames to dropdown
      state.maps = await res.json();
      const mapnames = Object.keys(state.maps);
      func.addDropdownOptions("maps", mapnames);
    });

  // geographic scale and zoom functionalities
  const scale = new mapboxgl.ScaleControl({ unit: "imperial" });
  const zoom = new mapboxgl.NavigationControl();
  map.addControl(scale, "bottom-left");
  map.addControl(zoom, "bottom-left");
});

map.on("style.load", () => {
  func.addFilters(map, "filters");
});

// ===================================
//      INTERACTION WITH ELEMENTS
// ===================================

// the "window" object is necessary because main.js is imported
// as a module in index.html (reference: https://bit.ly/2YnNpLc).

const lock = document.getElementById("lock");

window.handleMovement = (x, y) => {
  // incrementally moves map
  map.panBy([x, y]);
};

window.handleMap = (e) => {
  // update displayed style
  const style = state.maps[e.target.value];
  map.setStyle(style.url);
}

window.handleFilter = (e) => {
  const filters = func.getCurrentFilters(map);
  func.setFilterVisibility(map, filters, false);
  func.setFilterVisibility(map, e.target.value, true);
};

window.handleLock = () => {
  // map interaction features
  let features = [
    map.boxZoom, map.scrollZoom,
    map.touchZoomRotate, map.dragPan,
    map.doubleClickZoom, map.dragRotate,
  ];

  if (state.locked) {
    // enable map interaction
    features.forEach(feat => feat.enable());
    state.locked = !state.locked;
    lock.innerHTML = "🔓 Unlocked";
  } else {
    // disable map interaction
    features.forEach(feat => feat.disable());
    state.locked = !state.locked;
    lock.innerHTML = "🔐 Locked";
  }
};
