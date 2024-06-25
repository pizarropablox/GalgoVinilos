import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private router: Router) {}

  onSubmit(): void {
    // Obtener los valores de los campos del formulario
    const username = (document.getElementById('username') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;

    // Obtener los datos del usuario registrado en localStorage
    const storedUser = localStorage.getItem('currentUser');

    if (storedUser) {
      const user = JSON.parse(storedUser);

      // Verificar las credenciales
      if (username === user.username && password === user.password) {
        localStorage.setItem('isLoggedIn', 'true');
        alert('Login exitoso');
        this.router.navigate(['/home']); // Redirigir a la página de inicio
      } else {
        alert('Credenciales incorrectas');
      }
    } else {
      alert('No hay usuarios registrados. Regístrate primero.');
    }
  }
}
