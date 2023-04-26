import { Component, OnDestroy, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ProductoService } from 'src/app/almacen/services/producto.service';
import { Paginador } from 'src/app/models/paginador.model';
import { ProductoModel } from 'src/app/models/producto.model';
import { ProductoFormComponent } from './producto-form/producto-form.component';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss'],
  providers: [DialogService],
})
export class ProductoComponent implements OnInit, OnDestroy {
  productoList: ProductoModel[];
  first = 0;
  rowsPerPage = 10;
  page = 0;
  paginador: Paginador = {};
  query: string = '';
  ref: DynamicDialogRef;

  constructor(private productoService: ProductoService, public dialogService: DialogService) {
    this.productoList = [];
    this.ref = new DynamicDialogRef()
  }

  ngOnInit(): void {
    this.ListarProductos();
  }

  isFirstPage(): boolean {
    return this.paginador.first ? true : false;
  }

  get totalRecords() {
    return this.paginador.totalElements ? this.paginador.totalElements : 0;
  }

  ListarProductos = (q: string = ''): void => {
    this.productoService.ListarProducto(this.page, this.rowsPerPage, q).subscribe(response => {
      this.paginador = { ...response.content };
      this.productoList = response.content.content;
    });
  }

  show(producto: ProductoModel) {
    this.ref = this.dialogService.open(ProductoFormComponent, {
      header: 'Formulario de Producto',
      width: '70%',
      contentStyle: { "max-height": "100%", "overflow": "auto" },
      baseZIndex: 10000,
      data: producto ? producto : undefined,
    });

    this.ref.onClose.subscribe(() => {
      if (true) {
        this.ListarProductos();
      }
    });
  }
  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }
  onSelectRowChange(event: any) {
    this.rowsPerPage = event;
    this.ListarProductos();
  }

  onFirtsChange(event: any) {
    this.page = (event / this.rowsPerPage);
    this.ListarProductos();
  }
  filtrarPorQuery(event: any) {
    this.ListarProductos(this.query);
  }
  clearFilter() {
    this.query = '';
    this.ListarProductos(this.query);
  }

  reset() {
    this.first = 0;
  }

  isLastPage(): boolean {
    return this.paginador.last ? true : false;
  }


}
