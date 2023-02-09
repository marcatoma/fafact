import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { UnidadMedidaModel } from 'src/app/models/unidad-medida.model';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private url: string = environment.ENDPOINT + 'http://localhost:8080/';

  constructor(private http: HttpClient) { }

  ListarUnidadMedida(): Observable<UnidadMedidaModel[]> {
    return this.http.get(this.url + 'unidad-medida/listar').pipe(
      map((response: any) => response.content as UnidadMedidaModel[]),
      catchError((e) => {
        console.log(e);
        return throwError(() => e);
      })
    )
  }
}
