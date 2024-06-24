
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    const { username, password } = this.loginForm.value;

    if (username === 'user' && password === 'password') {
      localStorage.setItem('isLoggedIn', 'true');
      alert('Login exitoso');
      this.router.navigate(['admin']);
    } else {
      alert('Credenciales incorrectas');
    }
  }
}
