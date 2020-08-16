import props from "./utils/props.js";

// application state
const state = {
  style: props.styles.dark,
  city: props.cities["Atlanta"]
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

window.handleMovement = (x, y) => {
  // incrementally moves map
  map.panBy([x, y]);
};
