let mapname, styleurl, password;
const form = document.getElementsByTagName("form")[0];
const button = document.getElementsByTagName("button")[0];

// mutator functions used by form to update state
function handleUrl(e) { styleurl = e.target.value }
function handleName(e) { mapname = e.target.value }
function handlePassword(e) { password = e.target.value }

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // temporarily disable submissions
  button.innerHTML = "Processing";
  button.disabled = true;

  // todo: add api call to /api/addmap
  await new Promise(resolve => setTimeout(resolve, 3000));

  // re-enable submissions
  button.disabled = false;
  button.innerHTML = "Submit";
});