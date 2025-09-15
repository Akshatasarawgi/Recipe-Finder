const recipeContainer = document.querySelector('.complete-recipe');
const otherRecipesContainer = document.querySelector('.three-recipes');
const breadCrumb = document.querySelector('.bread-crumbs');
const currentPathName = window.location.pathname.includes('individualRecipe.html');
/* console.log(currentPathName); */
/* console.log(window.location.href); */
const params = new URLSearchParams(window.location.search);
let recipeId = params.get('id');
/* console.log(recipeId); */
let allData = [];

async function fetchData() {
    try {
        const response = await fetch('data.json');
        if(!response.ok) {
            throw new Error(`HTTP error! status : ${response.status}`)
        }
        const data = await response.json();
        return data;
    }
catch(error) {
    console.error('Error fetching data:', error);
    return null;
}
}

fetchData().then(data => {
allData = data;
   let found = (allData.find(item => item.id === Number(recipeId)));
    renderIndividualRecipe(found);
})


const renderIndividualRecipe = item => {
    let navCrumb = document.createElement('a');
    navCrumb.setAttribute('href', '#');
    navCrumb.innerHTML = `${item.title}`;
    breadCrumb.append(navCrumb); 

    recipeContainer.innerHTML = `
    <img src=${item.image.large} alt=${item.slug} />
            <div class="complete-detail">
                    <h2>${item.title}</h2>
                    <p>${item.overview}</p>
                    <div>
                    <p class="recipe-serving">Servings: ${item.servings}</p>
                    <p class="recipe-prepMins">Prep: ${item.prepMinutes}</p>
                    <p class="recipe-cookMins">Cook: ${item.cookMinutes}</p>
                    </div>
                <h3>Ingredients:</h3>
                <ul>
                    ${Array.isArray(item.ingredients) ? item.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('') : `<li>${item.ingredients}</li>`}
                </ul>    
                <h3>Instructions:</h3>  
                <ul>
                ${Array.isArray(item.instructions) 
                    ? item.instructions.map(instruction => `<li>${instruction}</li>`).join('')
                    : `<li>${item.instructions}</li>`}
                </ul>
            </div>`        
} 

/* Code to display any three recipes at the bottom of the recipe page */

fetchData().then(data => {
 let filter = data.filter(item => item.id!== Number(recipeId));
 const numbers = new Set();   /* Learnt this today to generate three random numbers but the number shouldnt repeat */
 while (numbers.size < 3) {
    const num = Math.floor(Math.random() * filter.length);
    numbers.add(num);
 } 
numbers.forEach(number => {
    anyThreeRecipes(filter[number])})
})

const anyThreeRecipes = (item) => {
            const div = document.createElement('div');
            div.setAttribute('id', `${item.id}`);
                div.setAttribute('class', 'recipe-card');
                    div.innerHTML = `<img class="recipe-image" src=${item.image.large} alt${item.slug}=>
                    <h3 class="recipe-title">${item.title}</h3>
                    <p class="recipe-overview">${item.overview}</p>
                    <div>
                        <p class="recipe-serving">Servings: ${item.servings}</p>
                        <p class="recipe-prepMins">Prep: ${item.prepMinutes} mins</p>
                        <p class="recipe-cookMins">Cook: ${item.cookMinutes} mins</p>
                    </div>
                    <a href="./individualRecipe.html?id=${item.id}" class="recipe-button">View Recipe</a>`;
    otherRecipesContainer.appendChild(div); 
}
