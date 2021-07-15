// target elements-
const searchForm = document.querySelector('form');
const searchResultDiv = document.querySelector('.search-result');
const container = document.querySelector('.container');
let searchQuery = '';
const appId = 'b81ea5b7';
const appKey = 'fdc68d9352b11e133558fde117b05323';

// Button event -
searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  searchQuery = e.target.querySelector('input').value;
  fetchAPI();
})

// Fetching JSON data by (https://api.edamam.com -> api)
async function fetchAPI() {
  const baseURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${appId}&app_key=${appKey}&to=18`
  const response = await fetch(baseURL);
  const data = await response.json();
  generateHTML(data.hits);
  console.log(data);
}
function generateHTML(results) {
  container.classList.remove('initial');
  let generatedHTML = '';
  results.map(result => {
    generatedHTML +=
      `
            <div class="item">
              <img src="${result.recipe.image}" alt="">
              <div class="flex-container">
                <h1 class="title">${result.recipe.label}</h1>
                <a class="view-btn" href="${result.recipe.url}" target = '_blank'>View Recipe</a>
              </div>
              <p class="item-data">Calories: ${result.recipe.calories.toFixed(2)}</p>
              <p class="item-data">Diet Label: ${result.recipe.dietLabels.length > 0 ? result.recipe.dietLabels : 'Not available'}</p>
              <p class="item-data">Health Label: ${result.recipe.healthLabels.slice(0, 3).join(", ")}</p>
            </div>
            `
  })
  searchResultDiv.innerHTML = generatedHTML;
}