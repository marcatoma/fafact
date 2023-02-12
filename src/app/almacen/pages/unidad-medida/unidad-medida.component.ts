import { Component, OnDestroy, OnInit } from '@angular/core';
import { UnidadMedidaModel } from 'src/app/models/unidad-medida.model';
import { UnidadMedidaService } from '../../services/unidad-medida.service';
import { DialogService } from 'primeng/dynamicdialog';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

import { UnidadMedidaFormComponent } from '../unidad-medida/unidad-medida-form/unidad-medida-form.component'
import { Paginador } from 'src/app/models/paginador.model';

@Component({
  selector: 'app-unidad-medida',
  templateUrl: './unidad-medida.component.html',
  styleUrls: ['./unidad-medida.component.scss'],
  providers: [DialogService]
})
export class UnidadMedidaComponent implements OnInit, OnDestroy {
  unidadMedidaList: UnidadMedidaModel[];
  first = 0;
  rowsPerPage = 10;
  page = 0;
  paginador: Paginador = {};
  query: string = '';
  constructor(private unidadMedidaService: UnidadMedidaService, public dialogService: DialogService) {
    this.unidadMedidaList = [];
  }
  ref: DynamicDialogRef = new DynamicDialogRef();

  ngOnInit(): void {
    this.ListarUnidadMedida();
  }

  filtrarPorQuery(event: any) {
    this.ListarUnidadMedida(this.query);
  }

  ListarUnidadMedida = (q: string = ''): void => {
    this.unidadMedidaService.ListarUnidadMedida(this.page, this.rowsPerPage, q).subscribe(response => {
      this.paginador = { ...response.content };
      this.unidadMedidaList = response.content.content;
    });
  }

  clearFilter() {
    this.query = '';
    this.ListarUnidadMedida(this.query);
  }

  reset() {
    this.first = 0;
  }

  isLastPage(): boolean {
    console.log(this.paginador.last ? true : false);
    return this.paginador.last ? true : false;
  }

  isFirstPage(): boolean {
    console.log(this.paginador.first ? true : false);
    return this.paginador.first ? true : false;
  }

  get totalRecords() {
    return this.paginador.totalElements ? this.paginador.totalElements : 0;
  }

  show(unidad: UnidadMedidaModel) {
    this.ref = this.dialogService.open(UnidadMedidaFormComponent, {
      header: 'Formulario de Unidad de Medida',
      width: '70%',
      contentStyle: { "max-height": "500px", "overflow": "auto" },
      baseZIndex: 10000,
      data: unidad ? unidad : undefined,
    });

    this.ref.onClose.subscribe(() => {
      if (true) {
        this.ListarUnidadMedida();
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
    this.ListarUnidadMedida();
  }

  onFirtsChange(event: any) {
    this.page = (event / this.rowsPerPage);
    this.ListarUnidadMedida();
  }
}
