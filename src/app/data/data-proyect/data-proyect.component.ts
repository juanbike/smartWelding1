import { Component, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
  FormControl,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button'; //botones
import { MatIconModule } from '@angular/material/icon'; //iconos
import { TextFieldModule } from '@angular/cdk/text-field'; //textfield
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { DataProyectService } from '../service/data-proyect.service'
import { Router } from '@angular/router';


@Component({
  selector: 'app-data-proyect',
  standalone: true,
  imports: [
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    TextFieldModule,
  ],
  templateUrl: './data-proyect.component.html',
  styleUrl: './data-proyect.component.scss'
})
export class DataProyectComponent implements OnDestroy {
  selectedFile: File | null = null;
  message: string = '';
  isError: boolean = false;
  subscription : any; //Variable para controlar la subscripcion a los datos

  constructor(private dataProyectService: DataProyectService,
    private snackBar: MatSnackBar, //inicializamos el snackbar para mostrar notificaciones al usuario
    private router: Router
   ){}


   onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }



  uploadFile():void{
    if (!this.selectedFile) {
      this.message = 'Please select a file first';
      this.isError = true;
      return;
    }
   
   this.subscription = this.dataProyectService.uploadFile(this.selectedFile).subscribe(
      response =>{
        this.message= response.message;
        this.isError = false;
        this.openSnackBar('Operacion exitosa:' + this.message, 'Cerrar');
        this.router.navigate(['/dashboard']) //salimos al dashboard si la operaciónm es exitosa

      },
      error =>{
        this.message = error.error.massage || 'Un error ocurrio';
        this.isError = true;
        this.openSnackBar('Operacion fallida:' + this.message, 'Cerrar');
      }
    );
  }



   /*
********************************************************************
Muestra una notificación al usuario.
********************************************************************
*/

openSnackBar(message: string, action: string) {
  const config = new MatSnackBarConfig();
  config.panelClass = ['blue-snackbar'];
  config.horizontalPosition = 'end'; // Posición horizontal: 'start' | 'center' | 'end' | 'left' | 'right'
  config.verticalPosition = 'top'; // Posición vertical: 'top' | 'bottom'
  config.duration = 3000; // Duración en milisegundos (opcional)
  this.snackBar.open(message, action, config);
}


navigateToDashboard() {
  this.router.navigate(['/dashboard']);
}


ngOnDestroy() {
  if (this.subscription) {
    this.subscription.unsubscribe();
     }
}


}
