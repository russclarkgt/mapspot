/**
 * Converts string or array of strings into usable options
 * for a dropdown selection menu.
 * 
 * @param {string|string[]} items Options to be added.
 * @param {string} id HTML id of the dropdown menu.
 */
export const addDropdownOptions = (id, items) => {
  // converts string to array when adding only one item
  if (typeof items === "string")
    items = [items];

  for (let i = 0; i < items.length; i++) {
    let option = document.createElement("option");
    option.textContent = items[i];
    document.getElementById(id).appendChild(option);
  }
};

/**
 * Filters through and extracts map's custom data layers.
 * Returns only layers with no metadata (i.e. not mapbox
 * defaults) that are not in the blacklist.
 * 
 * @param {object} map Application's current map.
 * @returns {object[]} Custom-made data layers.
 */
export const getCurrentFilters = (map) => {
  const blacklist = ["background", "satellite"];
  return map.getStyle().layers.filter(layer =>
    !layer["metadata"] && !blacklist.includes(layer.id));
};

/**
 * Toggles visibility of passed-in data layers. Function
 * accepts either a layer object, an array of layer objects,
 * a layer name, or an array of layer names.
 * 
 * @param {object} map Application's current map.
 * @param {object[]} filters List of affected data layers.
 * @param {boolean} bool Visibility-related boolean.
 */
export const setFilterVisibility = (map, filters, bool) => {
  // converts string to array when adding only one item
  if (typeof filters === "string")
    filters = [filters];

  filters.forEach(filter =>
    map.setLayoutProperty(filter.id ? filter.id : filter,
      "visibility", bool ? "visible" : "none"));
};

/**
 * Performs necessary steps upon switching map styles:
 *  - Clears dropdown menu & defaults to placeholder.
 *  - Adds new layers and disables their visibility.
 *  - Hides dropdown for styles w/o custom layers. 
 * 
 * @param {object} map Application's current map.
 * @param {string} id HTML id of the dropdown menu.
 */
export const addFilters = (map, id) => {
  // remove existing dropdown filters
  const dropdown = document.getElementById(id);
  dropdown.options.length = 1;
  dropdown.selectedIndex = 0;

  // add filters and disable visibility
  const filters = getCurrentFilters(map);
  addDropdownOptions(id, filters.map(obj => obj.id));
  setFilterVisibility(map, filters, false);

  // display dropdown if custom layers are present
  if (dropdown.options.length === 1)
    dropdown.style.display = "none";
  else if (dropdown.options.length > 1)
    dropdown.style.display = "block";
}
