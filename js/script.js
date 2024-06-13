const sliderTrack = document.querySelector('.slider-track');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const modal = document.getElementById('modal');
const closeButton = document.querySelector('.close');
const modalTitle = document.getElementById('modalTitle');
const modalImage = document.getElementById('modalImage');
const modalDescription = document.getElementById('modalDescription');
const modalPrice = document.getElementById('modalPrice');
const productIdInput = document.getElementById('productId');
const paymentForm = document.getElementById('paymentForm');

// Загружаем данные товаров из JSON
fetch('products.json')
    .then(response => response.json())
    .then(products => {
        createSliderCards(products);
    });

// Переменная для хранения текущего слайда
let currentSlide = 0;

// Функция для создания карточек товаров
function createSliderCards(products) {
    products.forEach(product => {
        const card = document.createElement('div');
        card.classList.add('slider-card');
        card.innerHTML = `
      <img src="${product.image}" alt="${product.title}">
      <h3>${product.title}</h3>
      <p>${product.description}</p>
      <p>Цена: ${product.price} руб.</p>
      <button class="buy-button" data-product-id="${product.id}">Купить</button>
    `;
        sliderTrack.appendChild(card);
    });

    // Добавление обработчиков событий для кнопок "Купить"
    const buyButtons = document.querySelectorAll('.buy-button');
    buyButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.dataset.productId;
            const product = products.find(p => p.id === parseInt(productId));

            // Заполняем модальное окно данными товара
            modalTitle.textContent = product.title;
            modalDescription.textContent = product.description;
            modalPrice.textContent = `Цена: ${product.price} руб.`;
            productIdInput.value = productId;

            modal.style.display = 'block';
        });
    });

    // Выполняем первоначальное обновление слайдера
    updateSlider();
}

// Функция для перехода к следующему слайду
function nextSlide() {
    currentSlide++;
    if (currentSlide >= sliderTrack.children.length) {
        currentSlide = 0;
    }
    updateSlider();
}

// Функция для перехода к предыдущему слайду
function prevSlide() {
    currentSlide--;
    if (currentSlide < 0) {
        currentSlide = sliderTrack.children.length - 1;
    }
    updateSlider();
}

// Функция для обновления слайдера
function updateSlider() {
    const sliderWidth = sliderTrack.offsetWidth;
    sliderTrack.style.transform = `translateX(-${currentSlide * sliderWidth}px)`;
}

// Обработчики событий для кнопок
prevButton.addEventListener('click', prevSlide);
nextButton.addEventListener('click', nextSlide);

// Обработчик событий для закрытия модального окна
closeButton.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Обработчик события для формы оплаты
paymentForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Предотвращаем стандартную отправку формы

    // Добавьте здесь логику обработки платежа, например:
    // 1. Проверка данных формы (номер карты, CVV)
    // 2. Отправка запроса на сервер для обработки платежа
    // 3. Отображение результата обработки платежа
    // 4. Закрытие модального окна

    // Для простоты, просто выведем сообщение в консоль
    console.log('Форма оплаты отправлена!');
    console.log(`ID товара: ${productIdInput.value}`);
    console.log(`Номер карты: ${document.getElementById('cardNumber').value}`);
    console.log(`CVV: ${document.getElementById('cvv').value}`);

    // Закрыть модальное окно после отправки
    modal.style.display = 'none';
});