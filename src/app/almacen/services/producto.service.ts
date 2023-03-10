import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { UnidadMedidaModel } from 'src/app/models/unidad-medida.model';
import { environment } from 'src/environments/environment';
import { ProductoModel } from 'src/app/models/producto.model';
@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private url: string = environment.ENDPOINT + 'producto/';

  constructor(private http: HttpClient) { }

  ListarProducto(page: number, filas: number, q: string): Observable<any> {
    let params = { 'q': q };
    return this.http.get(this.url + 'listar/page/' + page + '/filas/' + filas, { params }).pipe(
      map((response: any) => response),
      catchError((e) => {
        console.log(e);
        return throwError(() => e);
      })
    )
  }

  RegistrarProducto(producto: ProductoModel): Observable<ProductoModel> {
    return this.http.post(this.url + 'crear', producto).pipe(
      map((response: any) => response), catchError((e) => {
        console.log(e);
        return throwError(() => e);
      })
    );
  }

}
