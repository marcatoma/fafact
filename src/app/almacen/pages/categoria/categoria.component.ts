import { Component, OnDestroy, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CategoriaModel } from 'src/app/models/categoria';
import { Paginador } from 'src/app/models/paginador.model';
import { CategoriaService } from '../../services/categoria.service';
import { CategoriaFormComponent } from './categoria-form/categoria-form.component';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss'],
  providers: [DialogService]
})
export class CategoriaComponent implements OnInit, OnDestroy {
  categoriaList: CategoriaModel[];
  first = 0;
  rowsPerPage = 10;
  page = 0;
  paginador: Paginador = {};
  query: string = '';
  ref: DynamicDialogRef;

  constructor(private categoriaService: CategoriaService, public dialogService: DialogService) {
    this.categoriaList = [];
    this.ref = new DynamicDialogRef()
  }

  ngOnInit(): void {
    this.ListarCategoria();
  }

  filtrarPorQuery(event: any) {
    this.ListarCategoria(this.query);
  }
  clearFilter() {
    this.query = '';
    this.ListarCategoria(this.query);
  }

  reset() {
    this.first = 0;
  }

  isLastPage(): boolean {
    return this.paginador.last ? true : false;
  }

  isFirstPage(): boolean {
    return this.paginador.first ? true : false;
  }

  get totalRecords() {
    return this.paginador.totalElements ? this.paginador.totalElements : 0;
  }

  ListarCategoria = (q: string = ''): void => {
    this.categoriaService.ListarCategoria(this.page, this.rowsPerPage, q).subscribe(response => {
      this.paginador = { ...response.content };
      this.categoriaList = response.content.content;
    });
  }

  show(categoria: CategoriaModel) {
    this.ref = this.dialogService.open(CategoriaFormComponent, {
      header: 'Formulario de Categoria',
      width: '70%',
      contentStyle: { "max-height": "500px", "overflow": "auto" },
      baseZIndex: 10000,
      data: categoria ? categoria : undefined,
    });

    this.ref.onClose.subscribe(() => {
      if (true) {
        this.ListarCategoria();
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
    this.ListarCategoria();
  }

  onFirtsChange(event: any) {
    this.page = (event / this.rowsPerPage);
    this.ListarCategoria();
  }

}
