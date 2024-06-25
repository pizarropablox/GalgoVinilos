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
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    const { username, password } = this.loginForm.value;
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: any) => u.username === username && u.password === password);

    if (user) {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('username', username);
      alert('Login exitoso');
      this.router.navigate(['/home']);
    } else {
      alert('Credenciales incorrectas');
    }
  }
}
// export class LoginComponent {

//   constructor(private router: Router) {}

//   onSubmit(): void {
//     // Obtener los valores de los campos del formulario
//     const username = (document.getElementById('username') as HTMLInputElement).value;
//     const password = (document.getElementById('password') as HTMLInputElement).value;

//     // Obtener los datos del usuario registrado en localStorage
//     const storedUser = localStorage.getItem('currentUser');

//     if (storedUser) {
//       const user = JSON.parse(storedUser);

//       // Verificar las credenciales
//       if (username === user.username && password === user.password) {
//         localStorage.setItem('isLoggedIn', 'true');
//         alert('Login exitoso');
//         this.router.navigate(['/home']); // Redirigir a la página de inicio
//       } else {
//         alert('Credenciales incorrectas');
//       }
//     } else {
//       alert('No hay usuarios registrados. Regístrate primero.');
//     }
//   }
// }
