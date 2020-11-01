import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Empleado } from '../models/empleado';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  constructor(private db: AngularFirestore) { }

  getEmpleados(): Observable<Empleado[]> {
    return this.db.collection<Empleado>('empleados').valueChanges({idField: 'docId'});
  }

  agregarEmpleado(empleado: Empleado): void {
    this.db.collection<Empleado>('empleados').add(empleado);
  }
}
