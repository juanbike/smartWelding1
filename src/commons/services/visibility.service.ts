import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VisibilityService {
  private selectedOptionSource = new BehaviorSubject<string | null>(null);
  selectedOption$ = this.selectedOptionSource.asObservable();

  selectOption(option: string) {
    this.selectedOptionSource.next(option);
  }

  clearOption() {
    this.selectedOptionSource.next(null);
  }

}

/*
BehaviorSubject**: Utilizamos `BehaviorSubject` para mantener el estado actual de la opción seleccionada. Esto permite que los componentes se suscriban a los cambios en la opción
seleccionada.
- **selectOption**: Método para actualizar la opción seleccionada.
- **clearOption**: Método para limpiar la opción seleccionada.

*/
