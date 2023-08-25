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

inputElement.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        
        // Your submission logic here
        console.log('Input submitted with value:', inputElement.value);
        inputElement.value = ''
    }
});
