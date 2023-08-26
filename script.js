const moon = document.querySelector(".icon");
const sun = document.querySelector(".iconsun");

moon.addEventListener('click', () => {
    moon.style.display = 'none';
    sun.style.display = 'block';
    saveData();
});

sun.addEventListener('click', () => {
    moon.style.display = 'block';
    sun.style.display = 'none';
    saveData();
});

const inputElement = document.getElementById('input-box');
const listContainer = document.getElementById('list-container');
const itemsLeftElement = document.querySelector('.leftitem'); // Select the element with the correct class

// Instead of populating items array from DOMContentLoaded event
let items = [];

window.addEventListener('DOMContentLoaded', () => {
    const savedData = localStorage.getItem('data');
    if (savedData) {
        listContainer.innerHTML = savedData;
    }

    // Update items array after loading saved data
    items = Array.from(listContainer.querySelectorAll('ul li'));

    updateItemsLeftCount();


    items.forEach(item => {
        item.setAttribute('draggable', true); // Add draggable attribute
        item.addEventListener('dragstart', handleDragStart);
        item.addEventListener('dragover', handleDragOver);
        item.addEventListener('drop', handleDrop);
    });

    updateItemsLeftCount();
});


inputElement.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();

        const taskText = inputElement.value.trim();
        if(taskText === ''){
            alert('Input cannot be empty!!');
        }
        if (taskText !== '') {
            const li = document.createElement('li');
            li.textContent = taskText;

            const span = document.createElement('span');
            span.className = 'delete-icon'; // Add the class name for the delete icon

            li.appendChild(span);
            listContainer.appendChild(li);

            items.push(li); // Add the new item to the items array
            inputElement.value = '';
            updateItemsLeftCount();
        }
        saveData();
    }
});

listContainer.addEventListener('click', (e) => {
    if (e.target.tagName === 'LI') {
        e.target.classList.toggle('checked');
        updateItemsLeftCount();
    } else if (e.target.classList.contains('delete-icon')) {
        const listItem = e.target.parentElement;
        const index = items.indexOf(listItem);

        if (index !== -1) {
            items.splice(index, 1);
        }

        listItem.remove();
        updateItemsLeftCount();

        // Update the views after deletion
        const activeFilter = getActiveFilter();
        displayItems(activeFilter);
        setActiveFilter(activeFilter);
    }
}, false);

const allNav = document.querySelector('.all');
const activeNav = document.querySelector('.actives');
const completedNav = document.querySelector('.completed');

allNav.addEventListener('click', () => {
    displayItems('all');
    setActiveFilter('all');
});

activeNav.addEventListener('click', () => {
    displayItems('active');
    setActiveFilter('active');
});

completedNav.addEventListener('click', () => {
    displayItems('completed');
    setActiveFilter('completed');
});

function getActiveFilter() {
    if (allNav.classList.contains('active')) {
        return 'all';
    } else if (activeNav.classList.contains('active')) {
        return 'active';
    } else if (completedNav.classList.contains('active')) {
        return 'completed';
    }
}

function displayItems(filter) {
    listContainer.innerHTML = '';

    if (filter === 'all') {
        items.forEach(item => listContainer.appendChild(item));
    } else if (filter === 'active') {
        items.forEach(item => {
            if (!item.classList.contains('checked')) {
                listContainer.appendChild(item);
            }
        });
    } else if (filter === 'completed') {
        items.forEach(item => {
            if (item.classList.contains('checked')) {
                listContainer.appendChild(item);
            }
        });
    }

    

    updateItemsLeftCount();
}

function setActiveFilter(filter) {
    allNav.classList.remove('active');
    activeNav.classList.remove('active');
    completedNav.classList.remove('active');

    if (filter === 'all') {
        allNav.classList.add('active');
    } else if (filter === 'active') {
        activeNav.classList.add('active');
    } else if (filter === 'completed') {
        completedNav.classList.add('active');
    }
}

function updateItemsLeftCount() {
    const uncheckedItems = document.querySelectorAll('ul li:not(.checked)').length;
    itemsLeftElement.textContent = `${uncheckedItems} item${uncheckedItems !== 1 ? 's' : ''} left`;
}
const clearCompleted = document.querySelector('.clear');

clearCompleted.addEventListener('click', () => {
    // Remove completed items from the items array and the DOM
    items = items.filter(item => !item.classList.contains('checked'));
    listContainer.innerHTML = '';
    items.forEach(item => listContainer.appendChild(item));
    
    updateItemsLeftCount();
});

let draggedItem = null; 
function handleDragStart(e) {
    draggedItem = e.target;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', draggedItem);
}

function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault(); // Allows us to drop
    }
    e.dataTransfer.dropEffect = 'move';
    return false;
}

function handleDrop(e) {
    if (e.stopPropagation) {
        e.stopPropagation(); // Stops some browsers from redirecting
    }

    if (draggedItem !== this) {
        draggedItem.parentNode.removeChild(draggedItem);
        const dropZone = this.closest('li');
        dropZone.insertAdjacentElement('beforebegin', draggedItem);
    }

    return false;
}



const saveData = () => {
    try {
        localStorage.setItem("data", listContainer.innerHTML);
        console.log("Data saved successfully!");
    } catch (error) {
        console.error("Error while saving data:", error);
    }
};
