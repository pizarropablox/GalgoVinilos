import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize product list on ngOnInit', () => {
    expect(component.products).toBeDefined();
    expect(component.products.length).toBeGreaterThan(0);
  });

  it('should add product to cart on addToCart', () => {
    const productId = 1; // Example product ID
    component.addToCart(productId);
    const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
    const addedItem = cartItems.find((item: any) => item.id === productId);
    expect(addedItem).toBeTruthy();
  });

  it('should update cart total on updateCartTotal', () => {
    localStorage.setItem('cart', JSON.stringify([{ id: 1, quantity: 2 }, { id: 2, quantity: 1 }]));
    component.updateCartTotal();
    const cartTotalElement = document.getElementById('cart-total');
    expect(cartTotalElement).toBeTruthy();
    expect(cartTotalElement!.innerText).toContain('700000'); // Adjust expected total based on test data
  });
});
