import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { MarcaModel } from 'src/app/models/marca';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {
  private url: string = environment.ENDPOINT + 'marca/';

  constructor(private http: HttpClient) { }

  ListarMarca(page: number, filas: number, q: string): Observable<any> {
    let params = { 'q': q };
    return this.http.get(this.url + 'listar/page/' + page + '/filas/' + filas, { params }).pipe(
      map((response: any) => response),
      catchError((e) => {
        console.log(e);
        return throwError(() => e);
      })
    )
  }

  ListarTodasMarcas(): Observable<any> {
    return this.http.get(this.url + 'listar').pipe(
      map((response: any) => response),
      catchError((e) => {
        console.log(e);
        return throwError(() => e);
      })
    )
  }

  RegistrarMarca(marca: MarcaModel): Observable<MarcaModel> {
    return this.http.post(this.url + 'crear', marca).pipe(
      map((response: any) => response), catchError((e) => {
        console.log(e);
        return throwError(() => e);
      })
    );
  }
}
