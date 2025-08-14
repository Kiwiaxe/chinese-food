import createElement from '../../assets/lib/create-element';
const angelIcon = require('../../assets/images/icons/angle-icon.svg');
const angelLeftIcon = require('../../assets/images/icons/angle-left-icon.svg');
const plusIcon = require('../../assets/images/icons/plus-icon.svg');

const carouselImages = {
	'penang_shrimp1.png': require('../../assets/images/carousel/penang_shrimp1.png'),
	'chicken_cashew1.png': require('../../assets/images/carousel/chicken_cashew1.png'),
	'red_curry_vega1.png': require('../../assets/images/carousel/red_curry_vega1.png'),
	'chicken_loempias1.png': require('../../assets/images/carousel/chicken_loempias1.png'),
};

export default class Carousel {
	constructor(slides) {
		this.slides = slides;
		this.elem = this.render();
		this.currentPosition = 0;
		this.currentSlide = 1;
	}

	render() {
		let element = createElement(`
	<div class="carousel">
    	<!--Кнопки переключения-->
    	<div class="carousel__arrow carousel__arrow_right">
     	 <img src="${angelIcon}" alt="icon">
   	 </div>
    	<div class="carousel__arrow carousel__arrow_left">
     	 <img src="${angelLeftIcon}" alt="icon">
    	</div>

	 	<div class="carousel__inner"></div>
		`);

		this.slides.map(({ name, price, image, id }) => {
			const imagePath = carouselImages[image];
			element.querySelector('.carousel__inner').insertAdjacentHTML(
				'beforeend',
				`<div class="carousel__slide" data-id="${id}">
        <img src="${imagePath}" class="carousel__img" alt="slide">
        <div class="carousel__caption">
          <span class="carousel__price">€${price.toFixed(2)}</span>
          <div class="carousel__title">${name}</div>
          <button type="button" class="carousel__button">
            <img src="${plusIcon}" alt="icon">
          </button>
        </div>
      </div>`
			);
		});

		element.querySelector('.carousel__arrow_left').style.display = 'none';

		element.addEventListener('click', this.onClick);

		return element;
	}

	onClick = event => {
		let btnAdd = event.target.closest('.carousel__button');

		if (btnAdd) {
			let id = btnAdd.closest('.carousel__slide').dataset.id;
			let productAddEvent = new CustomEvent('product-add', {
				detail: id,
				bubbles: true,
			});

			this.elem.dispatchEvent(productAddEvent);
		}

		let carouselInner = this.elem.querySelector('.carousel__inner');
		let widthElementOfCarousel = carouselInner.firstElementChild.offsetWidth;
		let carouselLength = carouselInner.children.length;
		let carousel = this.elem.querySelector('.carousel');

		let btnLeft = this.elem.querySelector('.carousel__arrow_left');
		let btnRight = this.elem.querySelector('.carousel__arrow_right');

		let updateButtons = () => {
			btnLeft.style.display = this.currentSlide === 1 ? 'none' : '';
			btnRight.style.display =
				this.currentSlide === carouselLength ? 'none' : '';
		};

		let btn = event.target.closest('.carousel__arrow');

		if (!btn) return;

		if (
			btn.classList.contains('carousel__arrow_right') &&
			this.currentSlide < carouselLength
		) {
			this.currentPosition -= widthElementOfCarousel;
			this.currentSlide++;
		} else if (
			btn.classList.contains('carousel__arrow_left') &&
			this.currentSlide > 1
		) {
			this.currentPosition += widthElementOfCarousel;
			this.currentSlide--;
		}

		carouselInner.style.transform = `translateX(${this.currentPosition}px)`;
		updateButtons();
	};
}
