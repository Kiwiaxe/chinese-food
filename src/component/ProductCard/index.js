import createElement from "../../assets/lib/create-element.js";

const plusIcon = require('../../assets/images/icons/plus-icon.svg');

const productImages = {
  '500ml_non_dairy_chunky_monkey.png': require('../../assets/images/products/500ml_non_dairy_chunky_monkey.png'),
  '500ml_strawberry_cheesecake.png': require('../../assets/images/products/500ml_strawberry_cheesecake.png'),
  '500ml_topped_salted_caramel_brownie.png': require('../../assets/images/products/500ml_topped_salted_caramel_brownie.png'),
  'beef_massaman.png': require('../../assets/images/products/beef_massaman.png'),
  'chicken_loempias.png': require('../../assets/images/products/chicken_loempias.png'),
  'chicken_cashew.png': require('../../assets/images/products/chicken_cashew.png'),
  'fried_noodles.png': require('../../assets/images/products/fried_noodles.png'),
  'koong_hom_pha.png': require('../../assets/images/products/koong_hom_pha.png'),
  'mini_vega_springrolls.png': require('../../assets/images/products/mini_vega_springrolls.png'),
  'tom_kha.png': require('../../assets/images/products/tom_kha.png'),
  'tofu_cashew.png': require('../../assets/images/products/tofu_cashew.png'),
  'satesaus.png': require('../../assets/images/products/satesaus.png'),
  'sate.png': require('../../assets/images/products/sate.png'),
  'witte_rijst.png': require('../../assets/images/products/witte_rijst.png'),
  'prik_nam_pla.png': require('../../assets/images/products/prik_nam_pla.png'),
  'red_curry_vega.png': require('../../assets/images/products/red_curry_vega.png'),
  'chu_chee.png': require('../../assets/images/products/chu_chee.png'),
  'kroepoek.png': require('../../assets/images/products/kroepoek.png'),
  'fried_rice.png': require('../../assets/images/products/fried_rice.png'),
  'green_curry.png': require('../../assets/images/products/green_curry.png'),
  'kai_see_ew.png': require('../../assets/images/products/kai_see_ew.png'),
  'king_salad.png': require('../../assets/images/products/king_salad.png'),
  'krapau_vega.png': require('../../assets/images/products/krapau_vega.png'),
  'laab_kai_chicken_salad.png': require('../../assets/images/products/laab_kai_chicken_salad.png'),
  'red_curry.png': require('../../assets/images/products/red_curry.png'),
  'som_tam_papaya_salad.png': require('../../assets/images/products/som_tam_papaya_salad.png'),
  'stir_fried_vegetables.png': require('../../assets/images/products/stir_fried_vegetables.png'),
  'sweet_n_sour.png': require('../../assets/images/products/sweet_n_sour.png'),
  'tom_yam.png': require('../../assets/images/products/tom_yam.png'),
  '500ml_chocolate_fudge_brownie.png': require('../../assets/images/products/500ml_chocolate_fudge_brownie.png'),
  '500ml_cookie_dough.png': require('../../assets/images/products/500ml_cookie_dough.png'),
  'fish_cakes.png': require('../../assets/images/products/fish_cakes.png')
};

export default class ProductCard {
  constructor(product) {
	this.product = product;
	this.elem = this.render();
  }
  
  render() {
		const imagePath = productImages[this.product.image];
	let element = createElement(`<div class="card">
    	<div class="card__top">
        <img src="${imagePath}" class="card__image" alt="product">
        <span class="card__price">€${this.product.price.toFixed(2)}</span>
    	</div>
    	<div class="card__body">
        <div class="card__title">${this.product.name}</div>
        <button type="button" class="card__button">
            <img src=${plusIcon} alt="icon">
        </button>
    	</div>
		</div>`);

		element.addEventListener('click', this.onClick);
		return element;
  }

  onClick = (event) => {
	let btn = event.target.closest('.card__button');

	if (btn) {

		let productAddEvent = new CustomEvent("product-add", {
  			detail: this.product.id,
   		bubbles: true,
   	});

   	this.elem.dispatchEvent(productAddEvent);

		}
	}
}
