const dropDownList = document.querySelector('.drop-down-list');
const menuButton = document.querySelector('.menu-tab');

const displayDropDown = () => {
    dropDownList.classList.toggle('show');
}

menuButton.addEventListener('click' , displayDropDown);

