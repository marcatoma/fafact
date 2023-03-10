import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubCategoriaService {
  private url: string = environment.ENDPOINT + 'sub-categoria/';

  constructor(private http: HttpClient) { }

  ListarSubCategoria(idCate: number): Observable<any> {
    return this.http.get(this.url + 'listar/id-categoria/' + idCate).pipe(
      map((response: any) => response),
      catchError((e) => {
        console.log(e);
        return throwError(() => e);
      })
    )
  }

}
