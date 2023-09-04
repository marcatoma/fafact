import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DetalleVentaModel } from 'src/app/models/detalle-venta.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private detalleFactura = new BehaviorSubject<DetalleVentaModel[]>([]); // Fuente de datos observable
  currentDetalleFactura = this.detalleFactura.asObservable(); // Observable para suscribirse y recibir datos

  constructor() { }

  chageListDetalleFactura(detalleFact: DetalleVentaModel[]) {
    this.detalleFactura.next(detalleFact); // Cambia el valor de la fuente de datos
  }
}
