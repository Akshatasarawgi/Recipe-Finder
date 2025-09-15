const container = document.querySelector('.recipe-list');
const allPrepRadioButtons = document.querySelectorAll('input[name="prep-time"]');
const allCookRadioButtons = document.querySelectorAll('input[name="cook-time"]');
const recipeContainer = document.querySelector('.complete-recipe');
const prepTime = document.querySelector('.filter-prep-time');
const displayPrepTime = document.querySelector('.display-prep-time');
const cookTime = document.querySelector('.filter-cook-time');
const displayCookTime = document.querySelector('.display-cook-time');
const clearTime = document.querySelectorAll('.clear-prep-time');
const searchField = document.querySelector('.search');

let allData=[]; //stores JSON data globally

fetch('data.json')
.then(response => response.json())
.then(data => {
    allData= data;
    renderList(allData);
})
    
function renderList(list) {
    container.innerHTML = "";
          list.forEach(item => {
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
    container.appendChild(div);
   }) 
}

/* Max Prep Time Filter */
const displayPrep = () => displayPrepTime.style.display = "flex";
const removeDisplayPrep = () => displayPrepTime.style.display = "none";

prepTime.addEventListener('click' , displayPrep);
document.addEventListener('click', event => {
    if(!prepTime.contains(event.target)) {
        displayPrepTime.style.display = "none";
    }
});
allPrepRadioButtons.forEach(button => { 
    button.addEventListener('mouseleave', () => {
        removeDisplayPrep();
    })
})

/* Max Cook Time Filter */
const displayCook = () => displayCookTime.style.display = "flex";
const removeDisplayCook = () => displayCookTime.style.display = "none";
cookTime.addEventListener('click', displayCook);
document.addEventListener('click', event => {
    if(!cookTime.contains(event.target)) {
        displayCookTime.style.display = "none";
    }
})

allCookRadioButtons.forEach(button => { 
    button.addEventListener('mouseleave', () => {
        removeDisplayCook();
    })
})

/* Creating a function to filter the recipe list based on prep time */
function clearPrepTime() {
    container.innerHTML = "";
    renderList(allData);
}

clearTime.forEach(clearItem => {
    clearItem.addEventListener('click', clearPrepTime);
})

const filterRecipeListBasedOnPrepMinutes = (event) => {
    let radioValue = event.target.value; 
      let filteredData = allData.filter(item => {
       return (item.prepMinutes === Number(radioValue));
       })
      renderList(filteredData);  
}

allPrepRadioButtons.forEach(radio => {
    radio.addEventListener('click', (e) => {
        return filterRecipeListBasedOnPrepMinutes(e);
    });       
})

/* Creating a function to filter the recipe list based on prep time */
const filterRecipeListBasedOnCookMinutes = (e) => {
    container.innerHTML = "";
    let cookRadioValue = Number(e.target.value);
    let filteredData = allData.filter(item => {
        return item.cookMinutes === cookRadioValue;
    })
    renderList(filteredData);
}

allCookRadioButtons.forEach(radio => {
    radio.addEventListener('click', (e) => {
    return filterRecipeListBasedOnCookMinutes(e);
})
})

/* Creating the function to search for the recipe using input field */

const findObjectByWord = (arr,searchWord) => {
    let newArr = [];
    for (const obj of arr) {
    
    let values = String(Object.values(obj));    
    let found = values.includes(searchWord);   
    
    if(found) {
        newArr.push(obj);
     }
    }
    renderList(newArr);
}
const checkSearch = (e) => {
   const searchValue = String(e.target.value);
    findObjectByWord(allData,searchValue);
}

searchField.addEventListener('change', (e) => {
    checkSearch(e);
});