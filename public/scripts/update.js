const generateTable = (table, data) => {
  // props -> ["name", "url", ···, "active"]
  const mapObj = Object.entries(data)[0][1];
  const props = ["name", ...Object.keys(mapObj)];

  let thead = table.createTHead();
  let row = thead.insertRow();

  // creates header for each map property
  props.forEach(prop => {
    let th = document.createElement("th");
    th.innerHTML = prop.toUpperCase();
    row.appendChild(th);
  });
};

const populateTable = (table, data) => {
  for ([map, info] of Object.entries(data)) {
    // manually add mapname
    let row = table.insertRow();
    row.insertCell().innerHTML = map;

    // iteratively add remaining props
    for (prop in info)
      row.insertCell().innerHTML = info[prop];
  }
};

// retrieves data for all maps
fetch("/api/getmaps", {
  method: "POST",
  headers: { "Content-Type": "application/json" }
})
  .then(async res => {
    const table = document.querySelector("table");
    const data = await res.json();

    // adds map data to table element
    generateTable(table, data);
    populateTable(table, data);
  });
