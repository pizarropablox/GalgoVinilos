// Importaciones necesarias
import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

// Definición de la interfaz Product
interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

/**
 * Componente HomeComponent que muestra una lista de productos y maneja la funcionalidad de agregar al carrito.
 */
@Component({
  selector: 'app-home',
  standalone: true, // Esta opción no es válida en Angular, ¿estás seguro de su uso aquí?
  imports: [], // Importaciones de módulos, no se suelen definir en el componente directamente
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // Arreglo de productos
  products: Product[] = [
    // Información de los vinilos
    { id: 1, name: 'Bad Bunny - YALQMDLG', price: 250000, image: 'assets/image/Vinilo-1.png' },
    { id: 2, name: 'The Exploited - Punk Not Dead', price: 20000, image: 'assets/image/Vinilo-2.png' },
    { id: 3, name: 'Trainspotting - Soundtrack', price: 30000, image: 'assets/image/Vinilo-3.png' },
    { id: 4, name: 'Beastie Boys - Check Your Head', price: 40000, image: 'assets/image/Vinilo-4.png' },
    { id: 5, name: 'Tiro de gracia - Ser Humano', price: 50000, image: 'assets/image/Vinilo-5.png' },
    { id: 6, name: 'Kraftwerk - Tour de France', price: 60000, image: 'assets/image/Vinilo-6.png' }
  ];

  /**
   * Constructor del componente HomeComponent.
   * @param renderer Servicio para manipulación de elementos del DOM.
   * @param el Referencia al elemento nativo del DOM.
   * @param router Servicio de enrutamiento de Angular.
   */
  constructor(private renderer: Renderer2, private el: ElementRef, private router: Router) {}

  /**
   * Método que se ejecuta al inicializar el componente.
   * Inicializa la lista de productos en el DOM.
   */
  ngOnInit() {
    console.log('HomeComponent initialized');
    this.initializeProductList();
  }

  /**
   * Inicializa la lista de productos en el DOM.
   * Crea elementos HTML para cada producto y los añade al DOM.
   */
  initializeProductList() {
    const productList = this.el.nativeElement.querySelector('#product-list');

    // Limpia el contenedor de productos antes de agregar nuevos productos
    productList.innerHTML = '';

    if (productList) {
      // Itera sobre los productos y crea elementos HTML para cada uno
      this.products.forEach(product => {
        const productDiv = this.renderer.createElement('div');
        this.renderer.addClass(productDiv, 'col-md-4');
        this.renderer.addClass(productDiv, 'col-sm-6');
        this.renderer.addClass(productDiv, 'mb-4');

        const cardDiv = this.renderer.createElement('div');
        this.renderer.addClass(cardDiv, 'card');

        const img = this.renderer.createElement('img');
        this.renderer.setAttribute(img, 'src', product.image);
        this.renderer.setAttribute(img, 'class', 'card-img-top');
        this.renderer.setAttribute(img, 'alt', product.name);

        const cardBody = this.renderer.createElement('div');
        this.renderer.addClass(cardBody, 'card-body');

        const cardTitle = this.renderer.createElement('h5');
        this.renderer.addClass(cardTitle, 'card-title');
        const titleText = this.renderer.createText(product.name);
        this.renderer.appendChild(cardTitle, titleText);

        const cardText = this.renderer.createElement('p');
        this.renderer.addClass(cardText, 'card-text');
        const text = this.renderer.createText(`$${product.price}`);
        this.renderer.appendChild(cardText, text);

        const button = this.renderer.createElement('button');
        this.renderer.addClass(button, 'btn');
        this.renderer.addClass(button, 'btn-primary');
        this.renderer.addClass(button, 'add-to-cart');
        this.renderer.setAttribute(button, 'data-id', product.id.toString());
        const buttonText = this.renderer.createText('Agregar al carrito');
        this.renderer.appendChild(button, buttonText);

        this.renderer.listen(button, 'click', () => {
          this.addToCart(product.id);
        });

        this.renderer.appendChild(cardBody, cardTitle);
        this.renderer.appendChild(cardBody, cardText);
        this.renderer.appendChild(cardBody, button);

        this.renderer.appendChild(cardDiv, img);
        this.renderer.appendChild(cardDiv, cardBody);

        this.renderer.appendChild(productDiv, cardDiv);
        this.renderer.appendChild(productList, productDiv);
      });
    }
  }

  /**
   * Agrega un producto al carrito.
   * @param productId ID del producto que se va a agregar al carrito.
   */
  addToCart(productId: number) {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');

    const existingProduct = cart.find((item: any) => item.id === productId);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({ id: productId, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    this.updateCartTotal();
    alert('Producto agregado al carrito');
  }

  /**
   * Actualiza el total del carrito mostrado en la interfaz.
   */
  updateCartTotal() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    let total = 0;

    cart.forEach((cartItem: any) => {
      const product = this.products.find(p => p.id === cartItem.id);

      if (product) {
        total += product.price * cartItem.quantity;
      }
    });

    const cartTotalElement = this.el.nativeElement.querySelector('#cart-total');
    if (cartTotalElement) {
      cartTotalElement.innerText = total.toString();
    }
  }

  /**
   * Navega a la página de login.
   */
  login(): void {
    this.router.navigate(['/login']);
  }

  /**
   * Navega a la página de registro.
   */
  register(): void {
    this.router.navigate(['/register']);
  }
}
