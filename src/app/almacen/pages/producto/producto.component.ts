import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/almacen/services/producto.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})
export class ProductoComponent implements OnInit {

  constructor(private productoService: ProductoService) { }

  ngOnInit(): void {
    this.ListarUnidadMedida();
  }

  ListarUnidadMedida = (): void => {
    this.productoService.ListarUnidadMedida().subscribe(response => {
      console.log(response);
    });
  }

}
