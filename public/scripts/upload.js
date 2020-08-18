// form state & html elements
let mapname = styleurl = password = null;
const form = document.getElementsByTagName("form")[0];
const button = document.getElementsByTagName("button")[0];
const message = document.getElementsByTagName("p")[0];

// mutator functions used by form to update state
function handleUrl(e) { styleurl = e.target.value }
function handleName(e) { mapname = e.target.value }
function handlePassword(e) { password = e.target.value }

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // temporarily disable submissions
  button.innerHTML = "Processing";
  button.disabled = true;

  // sets mandatory wait time between requests (1s)
  await new Promise(resolve => setTimeout(resolve, 1000));

  // addmap post request
  fetch("/api/addmap", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ mapname, styleurl, password })
  })
    .then(async response => {
      // configures helper text beneath submit button
      message.innerHTML = await response.text();
      message.style.color = response.status === 200
        ? "#80cba0" : "#e77e7e";

      // resets form state on successful upload
      if (response.status === 200) {
        mapname = styleurl = password = null;
        form.reset();
      }
    });

  // re-enable submissions
  button.disabled = false;
  button.innerHTML = "Submit";
});
