const form = document.querySelector('#search-form');

const baseUrl = 'https://proxy-itunes-api.glitch.me/search?term=';

form.addEventListener('submit', function (event) {
  console.log(event.target);
  event.preventDefault();
  //prevent the page from reloading immediately so we can control when it reloads
let term = document.querySelector('#search-text').value;
console.log(`Search term ${term}`);
search(term);
})

function search(searchTerm) {
  //put these actions in a function so i can control when they fire
let searchUrl = `${baseUrl}${searchTerm}`;
console.log(searchUrl);
  fetch(searchUrl, {
  method: "GET",
  headers: { "Content-Type": "application/json" },
  // authorization would also go here if we needed it
  // like API key or password
})
.then(function (response) {
  // response is whatever the previous action returns
  // js, when you have a response, then parse that response as json
  console.log("first .then (promise) executed");
  return response.json();
})
.then(function (data) {
  // data refers to whatever the previous action returned. In this case response.json()
  // when you have data from the above promise, console log it
  console.log("second .then executed");
  console.log("Here is what we got back from the API", data.results);
});
}
