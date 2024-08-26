import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-junta-create',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './junta-create.component.html',
  styleUrls: ['./junta-create.component.scss'],
})
export class JuntaCreateComponent {
  fb = inject(FormBuilder); //Inyectamos el FormBuilder no necesitamos usar el constructor

  /*
  * Modelo de datos deFormulario para usarlo en el template y enlazarlo con la directiva  ngModel
  formData = {
    name: '',
    email: '',
    password: '',
  };
*/

  /*
  formData = this.fb.group({
    name: '',
    email: '',
    password: '',
    additionalEmails: this.fb.array([]), // Creamos un FormArray vacio para los emails adicionales
  });
  
  
    get additionalEmails() {  // Creamos un getter para acceder al FormArray de emails adicionales
      return this.formData.get('additionalEmails') as FormArray;
    }
  
    removeEmail(index: number) { // Creamos un metodo para eliminar un email adicional
      this.additionalEmails.removeAt(index);
    }
  
    addEmail() { // Creamos un metodo para agregar un email adicional
      this.additionalEmails.push(this.fb.control(''));
    }
  
    onSubmitted(){
      console.log(this.formData.value)
    }
  
    */

  /*
    FORMULARIO ANIDADO
  userProfileForm = this.fb.group({
    personalInfo: this.fb.group({
      name:'',
      email: '',
    }),
    address: this.fb.group({
      street: '',
      city: '',
      zipcode: '',
    }),
  });
*/

  // FORMULARIO DINAMICO
  userProfileForm = this.fb.group({
    personalInfo: this.fb.group({
      name: '',
      email: '',
    }),
    addresses: this.fb.array([
      this.fb.group({
        street: '',
        city: '',
        zipcode: '',
      }),
    ]),
  });

  get addressGroups(){
    return this.userProfileForm.get('addresses') as FormArray;
  }

  addAddress(){
    this.addressGroups.push(
      this.fb.group({
        street: '',
        city: '',
        zipcode: '',
      })
    )
  }

  removeAddress(index: number){
    this.addressGroups.removeAt(index)
  }
}

