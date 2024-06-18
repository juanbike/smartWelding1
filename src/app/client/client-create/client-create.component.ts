import { Component } from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {FormGroup, FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';

const today = new Date();
const month = today.getMonth();
const year = today.getFullYear();
@Component({
  selector: 'app-client-create',
  templateUrl: './client-create.component.html',
  styleUrl: './client-create.component.scss',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [ MatDatepickerModule, MatFormFieldModule, FormsModule, ReactiveFormsModule  ],
})
export class ClientCreateComponent {
  campaignOne = new FormGroup({
    start: new FormControl(new Date(year, month, 13)),
    end: new FormControl(new Date(year, month, 16)),
  });
  campaignTwo = new FormGroup({
    start: new FormControl(new Date(year, month, 15)),
    end: new FormControl(new Date(year, month, 19)),
  });
}
