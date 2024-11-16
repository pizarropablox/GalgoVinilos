  import { Component } from '@angular/core';
  
  @Component({
    selector: 'app-register',
    standalone: true,
    imports: [],
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
  })
  export class RegisterComponent {

    
  
    onSubmit(): void {
      // Obtener los valores de los campos del formulario
      const username = (document.getElementById('username') as HTMLInputElement).value;
      const password = (document.getElementById('password') as HTMLInputElement).value;
  
      // Validación mínima de longitud y otros requisitos según tus necesidades
      if (username.length < 4 || password.length < 6) {
        alert('El usuario debe tener al menos 4 caracteres y la contraseña al menos 6 caracteres.');
        return;
      }
  
      // Guardar en localStorage
      const user = { username, password };
      localStorage.setItem('currentUser', JSON.stringify(user));
  
      alert('Usuario registrado exitosamente');
    }
  }
  
  