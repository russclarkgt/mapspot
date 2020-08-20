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
