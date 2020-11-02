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
mapboxgl.accessToken = "pk.eyJ1IjoiYXRsbWFwcm9"
  + "vbSIsImEiOiJjamtiZzJ6dGIybTBkM3dwYXQ2c3lr"
  + "MWs3In0.tJzsvakNHTk7G4iu73aP7g";

// creates and renders map in index.html
const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/atlmaproom/ckdi6o91m0alt1iqt7vkh1pao",
  center: [-81.020, 31.975],
  zoom: 10
});

map.on("load", () => {
  map.getCanvas().focus();

  // retrieves data for active maps
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

  // location search functionality
  map.addControl(new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl,
    marker: false
  }));
});

map.on("style.load", () => {
  func.addFilters(map, "filters");

  func.getCurrentFilters(map).forEach(filter => {
    map.on("click", filter.id, e => {
      // extract dataset properties from mapbox
      const properties = e.features[0].properties;
      let addedHtml = "";

      // add relevant information to popup text
      for (let [key, val] of Object.entries(properties)) {
        key = key.toLowerCase().replace(/[\W_]+/g, " ");
        val = (typeof val === "string") ? val.toLowerCase() : func.isDate(val);
        addedHtml += `<tr><td class="key">${key}` + `</td><td class="val">${val}</td></tr>`;
      }

      // create new popup
      new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML(`<table>${addedHtml}</table>`)
        .addTo(map);
    });

    // style cursor upon entering and exiting layer
    map.on("mouseenter", filter.id, () => map.getCanvas().style.cursor = "pointer");
    map.on("mouseleave", filter.id, () => map.getCanvas().style.cursor = "");
  });
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
  mapboxgl.accessToken = style.token
  map.setStyle(style.url);
}

window.handleFilter = (e) => {
  const filters = func.getCurrentFilters(map);

  // retrieves list of selected dropdown options
  const options = document.getElementById("filters").options;
  const active = Array.prototype.filter.call(options,
    option => option.selected).map(layer => layer.text);

  // display only selected options
  func.setFilterVisibility(map, filters, false);
  func.setFilterVisibility(map, active, true);
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
