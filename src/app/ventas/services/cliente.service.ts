import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { ClienteModel } from 'src/app/models/cliente.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private url: string = environment.ENDPOINT + 'cliente/';
  private urlTipoIdentificacion: string = environment.ENDPOINT + 'tipo-identificacion/';


  constructor(private http: HttpClient) { }

  ListarCliente(page: number, filas: number, q: string): Observable<any> {
    let params = { 'q': q };
    return this.http.get(this.url + 'listar/page/' + page + '/filas/' + filas, { params }).pipe(
      map((response: any) => response),
      catchError((e) => {
        console.log(e);
        return throwError(() => e);
      })
    )
  }

  ListarTipoIdentificacion(): Observable<any> {
    return this.http.get(this.urlTipoIdentificacion + 'listar').pipe(
      map((response: any) => response),
      catchError((e) => {
        console.log(e);
        return throwError(() => e);
      })
    )
  }

  RegistrarCliente(cliente: ClienteModel): Observable<ClienteModel> {
    return this.http.post(this.url + 'crear', cliente).pipe(
      map((response: any) => response), catchError((e) => {
        console.log(e);
        return throwError(() => e);
      })
    );
  }
}
