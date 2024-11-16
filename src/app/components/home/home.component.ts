import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { JsonService } from '../../services/json.service';

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
  imports: [CommonModule, HttpClientModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [JsonService]
})
export class HomeComponent implements OnInit {
  products: Product[] = [];

  constructor(private renderer: Renderer2, private el: ElementRef, private router: Router, private jsonService: JsonService) {}

  ngOnInit() {
    console.log('HomeComponent initialized');
    this.loadProducts();
  }

  loadProducts() {
    this.jsonService.getJsonData().subscribe(
      (data: Product[]) => {
        this.products = data;
        this.initializeProductList();
      },
      error => {
        console.error('Error loading products:', error);
      }
    );
  }

  initializeProductList() {
    const productList = this.el.nativeElement.querySelector('#product-list');
    productList.innerHTML = '';

    if (productList) {
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

  login(): void {
    this.router.navigate(['/login']);
  }

  register(): void {
    this.router.navigate(['/register']);
  }
}
