import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private url:string='http://localhost:8080/';

  constructor(private http: HttpClient) { }

  ListarUnidadMedida(): Observable<any>{
    return this.http.get(this.url+'unidad-medida/listar').pipe(
      map((response:any)=>response),
      catchError((e)=>{
        console.log(e);
        return e;
      })
    )
  }
}
