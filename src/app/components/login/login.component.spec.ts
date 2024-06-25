import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let routerSpy = { navigate: jasmine.createSpy('navigate') };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent, ReactiveFormsModule],
      providers: [
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form should be invalid when empty', () => {
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('username field validity', () => {
    const username = component.loginForm.controls['username'];
    expect(username.valid).toBeFalsy();
    let errors = username.errors || {};
    expect(errors['required']).toBeTruthy();
    username.setValue("test");
    errors = username.errors || {};
    expect(errors['required']).toBeFalsy();
  });

  it('password field validity', () => {
    const password = component.loginForm.controls['password'];
    expect(password.valid).toBeFalsy();
    let errors = password.errors || {};
    expect(errors['required']).toBeTruthy();
    password.setValue("test");
    errors = password.errors || {};
    expect(errors['required']).toBeFalsy();
  });

  it('should store user credentials in local storage and navigate to home on successful login', () => {
    localStorage.setItem('users', JSON.stringify([{ username: 'user', password: 'password' }]));

    component.loginForm.controls['username'].setValue('user');
    component.loginForm.controls['password'].setValue('password');

    component.onSubmit();

    expect(localStorage.getItem('isLoggedIn')).toBe('true');
    expect(localStorage.getItem('username')).toBe('user');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('should show alert on invalid login credentials', () => {
    spyOn(window, 'alert');

    component.loginForm.controls['username'].setValue('wrong');
    component.loginForm.controls['password'].setValue('credentials');

    component.onSubmit();

    expect(window.alert).toHaveBeenCalledWith('Credenciales incorrectas');
  });
});
