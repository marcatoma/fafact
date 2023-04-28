import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CantonService {
  private url: string = environment.ENDPOINT + 'canton/';

  constructor(private http: HttpClient) { }

  filtrarCantones(q: string): Observable<any> {
    let params = { 'q': q };
    return this.http.get(this.url + 'listar', { params }).pipe(
      map((response: any) => response),
      catchError((e) => {
        console.log(e);
        return throwError(() => e);
      })
    )
  }
}
