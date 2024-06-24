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

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {
  //Boton del login en el Header
  login(): void {
    this.router.navigate(['/login']);
    
  }

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

  constructor(private renderer: Renderer2, private el: ElementRef,private router: Router) {}

  ngOnInit() {
    console.log('HomeComponent initialized');
    // Inicializa la lista de productos en el DOM
    this.initializeProductList();
  }

  initializeProductList() {
    // Obtiene el elemento con el id 'product-list' del DOM
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

        // Crea una tarjeta para mostrar la información del producto
        const cardDiv = this.renderer.createElement('div');
        this.renderer.addClass(cardDiv, 'card');

        // Agrega la imagen del producto
        const img = this.renderer.createElement('img');
        this.renderer.setAttribute(img, 'src', product.image);
        this.renderer.setAttribute(img, 'class', 'card-img-top');
        this.renderer.setAttribute(img, 'alt', product.name);

        // Crea el cuerpo de la tarjeta con título, precio y botón
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

        // Crea el botón "Agregar al carrito" y asigna su funcionalidad
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

        // Anida los elementos y los agrega al DOM
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

  addToCart(productId: number) {
    // Recupera el carrito almacenado en localStorage o crea uno vacío si no existe
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
  
    // Busca si el producto ya está en el carrito
    const existingProduct = cart.find((item: any) => item.id === productId);
  
    if (existingProduct) {
      // Si el producto ya existe, incrementa la cantidad en 1
      existingProduct.quantity += 1;
    } else {
      // Si no existe, agrega un nuevo objeto al carrito con el id del producto y cantidad 1
      cart.push({ id: productId, quantity: 1 });
    }
  
    // Actualiza el carrito en localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
  
    // Llama al método para actualizar el total del carrito
    this.updateCartTotal();
  
    // Muestra una alerta informando que el producto se ha agregado al carrito
    alert('Producto agregado al carrito');
  }
  
  updateCartTotal() {
    // Recupera el carrito del almacenamiento local
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  
    let total = 0;
  
    // Itera sobre los elementos del carrito
    cart.forEach((cartItem: any) => {
      // Busca el producto correspondiente en la lista de productos
      const product = this.products.find(p => p.id === cartItem.id);
  
      if (product) {
        // Suma al total el precio del producto multiplicado por la cantidad en el carrito
        total += product.price * cartItem.quantity;
      }
    });
  
    // Busca el elemento con el id 'cart-total' en el DOM y actualiza su contenido
    const cartTotalElement = this.el.nativeElement.querySelector('#cart-total');
    if (cartTotalElement) {
      cartTotalElement.innerText = total.toString();
    }
  }
}
