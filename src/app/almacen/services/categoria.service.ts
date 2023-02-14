import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { CategoriaModel } from 'src/app/models/categoria';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private url: string = environment.ENDPOINT + 'categoria/';

  constructor(private http: HttpClient) { }

  ListarCategoria(page: number, filas: number, q: string): Observable<any> {
    let params = { 'q': q };
    return this.http.get(this.url + 'listar/page/' + page + '/filas/' + filas, { params }).pipe(
      map((response: any) => response),
      catchError((e) => {
        console.log(e);
        return throwError(() => e);
      })
    )
  }

  RegistrarCategoria(categoria: CategoriaModel): Observable<CategoriaModel> {
    return this.http.post(this.url + 'crear', categoria).pipe(
      map((response: any) => response), catchError((e) => {
        console.log(e);
        return throwError(() => e);
      })
    );
  }
}
