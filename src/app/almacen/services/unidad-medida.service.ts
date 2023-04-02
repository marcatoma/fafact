import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { UnidadMedidaModel } from 'src/app/models/unidad-medida.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UnidadMedidaService {
  private url: string = environment.ENDPOINT + 'unidad-medida/';

  constructor(private http: HttpClient) { }

  ListarUnidadMedida(page: number, filas: number, q: string): Observable<any> {
    let params = { 'q': q };
    return this.http.get(this.url + 'listar/page/' + page + '/filas/' + filas, { params }).pipe(
      map((response: any) => response),
      catchError((e) => {
        console.log(e);
        return throwError(() => e);
      })
    )
  }

  ListarTodasUnidadMedida(): Observable<any> {
    return this.http.get(this.url + 'listar').pipe(
      map((response: any) => response),
      catchError((e) => {
        console.log(e);
        return throwError(() => e);
      })
    )
  }

  RegistrarUnidadMedida(unidadMedida: UnidadMedidaModel): Observable<UnidadMedidaModel> {

    return this.http.post(this.url + 'crear', unidadMedida).pipe(
      map((response: any) => response), catchError((e) => {
        console.log(e);
        return throwError(() => e);
      })
    );
  }
}
