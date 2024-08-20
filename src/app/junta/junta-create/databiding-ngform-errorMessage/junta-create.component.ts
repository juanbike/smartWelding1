import { Component, NgModule, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';



@Component({
  selector: 'app-junta-create',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,

  ],
  templateUrl: './junta-create.component.html',
  styleUrl: './junta-create.component.scss',
})
export class JuntaCreateComponent  {

  //Dos vias - Data biding
  fname: string = '';
  lname: string = '';
  email: string = '';

    @ViewChild('registrationForm') form: NgForm | undefined;
    OnFormSubmited(){
        console.log(this.form);
        console.log(this.form?.value.fname);
        console.log(this.form?.value.lname);
        console.log(this.form?.value.email);
        console.log(this.form?.value.pnumber);
        console.log(this.form?.value.dateBirth);
        console.log(this.form?.value.username);
        console.log(this.form?.value.gender);
        console.log(this.form?.value.address.street1);
        console.log(this.form?.value.address.street2);
        console.log(this.form?.value.address.country);
        console.log(this.form?.value.address.city);
        console.log(this.form?.value.address.region);
        console.log(this.form?.value.address.postalcode);
    }



}
