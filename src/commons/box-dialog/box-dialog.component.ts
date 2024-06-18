import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import {
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';




@Component({
  selector: 'app-box-dialog',
  standalone: true,
  imports: [
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  templateUrl: './box-dialog.component.html',
  styleUrl: './box-dialog.component.css',
})
export class BoxDialogComponent {
  message!: string;



  /*
  *******************************************************************************************************************************************
  Este código nó es una función constructora en TypeScript. Se utiliza para inicializar una instancia de la clase `BoxDialogComponent`.

El constructor toma dos parámetros:

1. `dialogRef`: esta es una instancia de la clase `MatDialogRef`, que es una referencia al cuadro de diálogo que se está abriendo.
 Se utiliza para controlar e interactuar con el diálogo.

2. `datos`: este es un objeto que se inyecta en el cuadro de diálogo utilizando el token de inyección `MAT_DIALOG_DATA`. Contiene una
 propiedad `id` de tipo `string`. Estos datos se pueden pasar desde el componente principal al abrir el cuadro de diálogo y se puede
  acceder a ellos dentro del componente del cuadro de diálogo.

La palabra clave `public` antes de los parámetros es una abreviatura de TypeScript para crear e inicializar automáticamente propiedades
de clase con los mismos nombres que los parámetros. Entonces, en este caso, se podrá acceder a `dialogRef` y `data` como propiedades de la clase.

En general, este constructor se utiliza para inicializar la instancia `BoxDialogComponent` con una referencia al cuadro de diálogo y cualquier
 dato adicional que pueda requerir el componente.
  *******************************************************************************************************************************************
  */

  constructor(
    public dialogRef: MatDialogRef< BoxDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: string }
  ) { }



  /*
  ********************************************************************************************************************************************
  El método "openConfirmDialog"  toma un parámetro booleano "confirmar". Parece estar cerrando un cuadro de diálogo y pasando un objeto con
  dos propiedades (`confirmado` e `id`) al método `dialogRef.close`.

El método `dialogRef.close` se usa normalmente para cerrar un cuadro de diálogo o una ventana modal en marcos como Angular o Angular Material.
 Es probable que `this.dialogRef` haga referencia a una referencia al cuadro de diálogo que debe cerrarse.

El objeto que se pasa a `dialogRef.close` contiene dos propiedades:
- `confirmado`: esta propiedad se establece en el valor del parámetro `confirmar` pasado al método `openConfirmDialog`.
- `id`: esta propiedad se establece en el valor de `this.data.id`, lo que sugiere que `this.data` es un objeto con una propiedad `id`.

Sin más contexto o el código circundante, es difícil proporcionar una explicación u orientación más detallada.
  ********************************************************************************************************************************************
  */

openConfirmDialog(confirm: boolean): void {
  this.dialogRef.close({ confirmed: confirm, id: this.data.id });

}


}
