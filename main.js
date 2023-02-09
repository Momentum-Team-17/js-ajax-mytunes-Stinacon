const form = document.querySelector('#search-form');

const baseUrl = 'https://proxy-itunes-api.glitch.me/search?term=';
const resultsContainer = document.querySelector('#resultsContainer');
let player = document.querySelector('#autoplay');

form.addEventListener('submit', function (event) {
  // console.log(event.target);
  event.preventDefault();
  //prevent the page from reloading immediately so we can control when it reloads
let term = document.querySelector('#search-text').value;
// console.log(`Search term ${term}`);
search(term);
})

function search(searchTerm) {
  //put these actions in a function so i can control when they fire
let searchUrl = `${baseUrl}${searchTerm}&media=music`;
console.log(searchTerm);
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
  //adding event listener to clear the search results
while (resultsContainer.firstChild) {
  resultsContainer.removeChild(resultsContainer.firstChild);
}
  
  buildResultsHtml(data.results);


});
}

function buildResultsHtml(resultsArray) {
  for (let result of resultsArray) {
    let resultDiv = document.createElement("div");
    resultDiv.classList.add("result-box");
    resultsContainer.appendChild(resultDiv);

let albumArtDiv = document.createElement("img");
albumArtDiv.classList.add("album-art");
albumArtDiv.src = result.artworkUrl100;
resultDiv.appendChild(albumArtDiv);

let artistNameDiv = document.createElement("p");
artistNameDiv.classList.add("artist-name");
artistNameDiv.innerText = result.artistName;
resultDiv.appendChild(artistNameDiv);

let trackNameDiv = document.createElement("p");
trackNameDiv.classList.add("track-name");
trackNameDiv.innerText = result.trackName;
resultDiv.appendChild(trackNameDiv);

// let albumNameDiv = document.createElement("p");
// albumNameDiv.classList.add("album-name");
// albumNameDiv.innerText = result.collectionName;
// resultDiv.appendChild(albumNameDiv);

albumArtDiv.addEventListener('click', function (event) {
  let playSrc = `${result.previewUrl}`;
  player.src = playSrc;
})

}
} 
