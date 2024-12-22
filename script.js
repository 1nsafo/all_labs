// Функция для скрытия и отображения дополнительной информации
document.getElementById('toggleInfo').addEventListener('click', function() {
    const extraInfo = document.getElementById('extraInfo');
    if (extraInfo.style.display === 'none') {
        extraInfo.style.display = 'block';
    } else {
        extraInfo.style.display = 'none';
    }
});

const colors = ['black', 'blue']; 
let currentIndex = 0; // Индекс текущего цвета

// Сохранение изначальных цветов в localStorage
const initialColors = {
    body: 'rgb(247, 247, 247)',
    header: '#000000',
    footer: '#000000'
};

// Проверяем, есть ли сохраненные цвета в localStorage, если нет - сохраняем изначальные
if (!localStorage.getItem('colors')) {
    localStorage.setItem('colors', JSON.stringify(initialColors));
}

// Устанавливаем цвета при загрузке страницы
const savedColors = JSON.parse(localStorage.getItem('colors'));
document.body.style.backgroundColor = savedColors.body;
document.querySelector('header').style.backgroundColor = savedColors.header;
document.querySelector('footer').style.backgroundColor = savedColors.footer;

document.getElementById('interestingButton').addEventListener('click', function() {
    currentIndex = (currentIndex + 1) % colors.length; // Увеличиваем индекс и сбрасываем его при достижении конца массива
    const newColor = colors[currentIndex]; // Получаем новый цвет из массива

    // Устанавливаем новый цвет
    document.body.style.backgroundColor = newColor; 
    document.querySelector('header').style.backgroundColor = newColor; 
    document.querySelector('footer').style.backgroundColor = newColor; 

    // Сохраняем текущие цвета в localStorage
    localStorage.setItem('colors', JSON.stringify({
        body: newColor,
        header: newColor,
        footer: newColor
    }));
});

// Функция для возврата к изначальным цветам
function revertToInitialColors() {
    document.body.style.backgroundColor = initialColors.body; // Возвращаем цвет body
    document.querySelector('header').style.backgroundColor = initialColors.header; // Возвращаем цвет header
    document.querySelector('footer').style.backgroundColor = initialColors.footer; // Возвращаем цвет footer
    localStorage.setItem('colors', JSON.stringify({
        body: initialColors.body,
        header: initialColors.header,
        footer: initialColors.body
    }));
}


// Обработчик для кнопки возврата к изначальным цветам
document.getElementById('revertButton').addEventListener('click', revertToInitialColors);
currentIndex = 0;

const slides = document.querySelector('.slides');
const totalSlides = document.querySelectorAll('.slide').length;

document.getElementById('next').addEventListener('click', function() {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateSlider();
});

document.getElementById('prev').addEventListener('click', function() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateSlider();
});

function updateSlider() {
    const offset = -currentIndex * 100;
    slides.style.transform = `translateX(${offset}%)`;
}

const reposContainer = document.getElementById('repos');
const username = '1nsafo'; 

fetch(`https://api.github.com/users/${username}/repos`)
    .then(response => response.json())
    .then(data => {
        data.forEach(repo => {
            const repoDiv = document.createElement('div');
            repoDiv.className = 'repo';
            repoDiv.innerHTML = `
                <h2>${repo.name}</h2>
                <p>${repo.description || 'Нет описания'}</p>
                <a href="${repo.html_url}" target="_blank">Перейти к репозиторию</a>
            `;
            reposContainer.appendChild(repoDiv);
        });
    })
    .catch(error => {
        console.error('Ошибка при получении репозиториев:', error);
    });











   