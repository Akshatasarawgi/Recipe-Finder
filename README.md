# Frontend Mentor - Recipe finder website solution

This is a solution to the [Recipe finder website challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/recipe-finder-website--Ui-TZTPxN). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview
This is a Recipe Finder website with a list of recipes to choose from. It has filters to view recipes based on Cooking time and preparation time. 

Users should be able to:

- View the home, about, recipes index, and recipe detail pages
- Search for recipes by name or ingredient
- Filter recipes by max prep or cook time
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page

### Screenshot
![alt text](Screenshot.png)

### Links

- Solution URL: [https://github.com/Akshatasarawgi/Recipe-Finder]
- Live Site URL: [https://recipefinderfem.netlify.app]

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow

### What I learned

### I learnt how to fetch data from json file and use it to render dynamic information on the individual recipe page.

```
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
```
```

```

### I learnt how to remove the dropdown modal from screen when user clicks out of the target element.
```
document.addEventListener('click', event => {
    if(!prepTime.contains(event.target)) {
        displayPrepTime.style.display = "none";
    }
});
```

### I learnt how to generate a filtered list when the user searches for an ingredient in the input field.

```
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
```

### I learnt the use of Number() and String() when getting the value of a target.
```
let cookRadioValue = Number(e.target.value);
```