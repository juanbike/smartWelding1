import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { login} from '../../brazing/model/loginInterface'

import {
  FormControl,
  FormGroup,
  Validators,
  FormGroupDirective,
  NgForm,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    Form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = Form && Form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
  standalone: true,
  imports: [
    AuthComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatDividerModule,
    MatButtonModule,
    MatCardModule
  ],
})
export class AuthComponent {
 // loginForm!: FormGroup; // Variable que contendra los datos del formulario de login}

  hide = true;
  constructor(private router: Router) {}

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  passwordFormControl = new FormControl('', [Validators.required]);

  matcher = new MyErrorStateMatcher();

  login() {
    this.router.navigateByUrl('/dashboard');
  }

  /*
********************************************************************
Validamos el formulario
Representamos y validamos el conjunto de datos para el formulario
********************************************************************
*/

loginForm = new FormGroup({
  email: new FormControl('', [
    Validators.required,
    Validators.minLength(9),
    Validators.maxLength(38),
   // Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'), // pattern para email
  ]),
  password: new FormControl('', [
    Validators.required,
    Validators.minLength(6),
    Validators.maxLength(10),
  ])
});




}
