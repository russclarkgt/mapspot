// associates api requests w/ mapbox account
mapboxgl.accessToken = "pk.eyJ1IjoiYXRsYW50YS"
  + "1tYXByb29tIiwiYSI6ImNrYmU2NXNyNjBpb2MyeG"
  + "81eWx0cWs4dm8ifQ.y8Pw9ScBzl9eI9IyKCem7A";

// creates and renders map in index.html
const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/dark-v8",
  center: [-84.3924, 33.7488],
  zoom: 12
});
