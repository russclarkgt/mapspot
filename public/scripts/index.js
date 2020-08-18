import * as func from "./utils/helpers.js";
import props from "./utils/props.js";

// application state
const state = {
  style: props.styles.dark,
  city: props.cities["Atlanta"],
  prevStyle: null, 
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
  style: state.style,
  center: state.city,
  zoom: 12
});

map.on("load", () => {
  map.getCanvas().focus();

  // adds city names to dropdown menu
  const cities = Object.keys(props.cities);
  func.addOptions("cities", cities);

  // geographic scale and zoom functionalities
  const scale = new mapboxgl.ScaleControl({ unit: "imperial" });
  const zoom = new mapboxgl.NavigationControl();
  map.addControl(scale, "bottom-left");
  map.addControl(zoom, "bottom-left");
});

// ===================================
//      INTERACTION WITH ELEMENTS
// ===================================

// the "window" object is necessary because main.js is imported
// as a module in index.html (reference: https://bit.ly/2YnNpLc).

const lock = document.getElementById("lock");
const satellite = document.getElementById("satellite");

window.handleMovement = (x, y) => {
  // incrementally moves map
  map.panBy([x, y]);
};

window.handleCity = (e) => {
  // updates state & moves to new location
  state.city = props.cities[e.target.value];
  map.flyTo({ center: state.city });
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

window.handleSatellite = () => {
  if (state.style != props.styles.satellite) {
    // switches style to satellite view
    func.setStyle(map, state, props.styles.satellite);
    satellite.innerHTML = "📡 Satellite View";
  } else {
    // restores previous style
    func.setStyle(map, state, state.prevStyle);
    satellite.innerHTML = "🚦 Map View";
  }
};
