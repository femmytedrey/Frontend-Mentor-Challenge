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