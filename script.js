const moon = document.querySelector(".icon");
const sun = document.querySelector(".iconsun");

moon.addEventListener('click', () => {
    moon.style.display = 'none';
    sun.style.display = 'block';
});

sun.addEventListener('click', () => {
    moon.style.display = 'block';
    sun.style.display = 'none';
});


const inputElement = document.getElementById('input-box');
const listContainer = document.getElementById('list-container');
const itemsLeftElement = document.querySelector('.leftitem'); // Select the element with the correct class

window.addEventListener('DOMContentLoaded', () => {
    const savedData = localStorage.getItem('data');
    if (savedData) {
        listContainer.innerHTML = savedData;
    }

    updateItemsLeftCount();
});

inputElement.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();

        const taskText = inputElement.value.trim();
        if (taskText !== '') {
            const li = document.createElement('li');
            li.textContent = taskText;

            const span = document.createElement('span');
            span.className = 'delete-icon'; // Add the class name for the delete icon

            li.appendChild(span);
            listContainer.appendChild(li);

            inputElement.value = '';
            updateItemsLeftCount();
        }
    }
});

listContainer.addEventListener('click', (e) => {
    if (e.target.tagName === 'LI') {
        e.target.classList.toggle('checked');
        updateItemsLeftCount();
    } else if (e.target.classList.contains('delete-icon')) { // Check for the delete icon class
        e.target.parentElement.remove();
        updateItemsLeftCount();
    }
}, false);




function updateItemsLeftCount() {
    const uncheckedItems = document.querySelectorAll('ul li:not(.checked)').length;
    itemsLeftElement.textContent = `${uncheckedItems} item${uncheckedItems !== 1 ? 's' : ''} left`;
}


// Assuming you have a listContainer variable declared
// const listContainer = document.getElementById("list-container");
const allNav = document.querySelector('.all');
const activeNav = document.querySelector('.actives');
const completedNav = document.querySelector('.completed');

let items = []; // Array to store all items

allNav.addEventListener('click', () => {
    allNav.classList.add('active');
    activeNav.classList.remove('active');
    completedNav.classList.remove('active');

    displayAllItems();
});

activeNav.addEventListener('click', () => {
    activeNav.classList.add('active');
    allNav.classList.remove('active');
    completedNav.classList.remove('active');

    displayActiveItems();
});

completedNav.addEventListener('click', () => {
    completedNav.classList.add('active');
    allNav.classList.remove('active');
    activeNav.classList.remove('active');

    displayCompletedItems();
});

// Function to display all items
function displayAllItems() {
    listContainer.innerHTML = ''; // Clear the list

    items.forEach(item => {
        listContainer.appendChild(item);
    });

    updateItemsLeftCount();
}

// Function to display active items
// Function to display active items
function displayActiveItems() {
    listContainer.innerHTML = ''; // Clear the list

    const uncheckedItems = items.filter(item => !item.classList.contains('checked'));

    uncheckedItems.forEach(item => {
        listContainer.appendChild(item);
    });

    updateItemsLeftCount();
}


// Function to display completed items
function displayCompletedItems() {
    listContainer.innerHTML = ''; // Clear the list

    const completedItems = items.filter(item => item.classList.contains('checked'));

    completedItems.forEach(item => {
        listContainer.appendChild(item);
    });

    updateItemsLeftCount();
}

// Rest of your code...

listContainer.addEventListener('click', (e) => {
    // Your existing code for marking items as checked and deleting items
});

// Initialize items array
window.addEventListener('DOMContentLoaded', () => {
    const savedData = localStorage.getItem('data');
    if (savedData) {
        listContainer.innerHTML = savedData;
    }

    items = Array.from(document.querySelectorAll('ul li')); // Populate the items array

    updateItemsLeftCount();
});
