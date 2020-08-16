/**
 * Converts string or array of strings into usable options
 * for a dropdown selection menu.
 * 
 * @param {string|string[]} items Options to be added.
 * @param {string} id HTML id of the dropdown menu.
 */
export const addOptions = (id, items) => {
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
 * Updates application to reflect a new Mapbox theme.
 * 
 * @param {object} map Mapbox object being referenced.
 * @param {object} state Application's state variable.
 * @param {string} newStyle URL of the desired style.
 */
export const setStyle = (map, state, newStyle) => {
  state.prevStyle = state.style;
  state.style = newStyle;
  map.setStyle(newStyle);
};
