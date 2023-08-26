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

inputElement.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();

        const taskText = inputElement.value.trim();
        if(taskText === ''){
            alert('Input cannot be empty!')
        } else {
            const li = document.createElement('li');
            li.textContent = taskText;
            listContainer.appendChild(li);

            inputElement.value = '';
        };   
    }
});


