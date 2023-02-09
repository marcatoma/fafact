import { Component, OnDestroy, OnInit } from '@angular/core';
import { UnidadMedidaModel } from 'src/app/models/unidad-medida.model';
import { UnidadMedidaService } from '../../services/unidad-medida.service';
import { DialogService } from 'primeng/dynamicdialog';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';

import { UnidadMedidaFormComponent } from '../unidad-medida/unidad-medida-form/unidad-medida-form.component'

@Component({
  selector: 'app-unidad-medida',
  templateUrl: './unidad-medida.component.html',
  styleUrls: ['./unidad-medida.component.scss'],
  providers: [DialogService]
})
export class UnidadMedidaComponent implements OnInit, OnDestroy {
  unidadMedidaList: UnidadMedidaModel[];
  first = 0;
  rows = 10;
  constructor(private unidadMedidaService: UnidadMedidaService, public dialogService: DialogService) {
    this.unidadMedidaList = [];
  }
  ref: DynamicDialogRef = new DynamicDialogRef();

  ngOnInit(): void {
    this.ListarUnidadMedida();
  }

  ListarUnidadMedida = (): void => {
    this.unidadMedidaService.ListarUnidadMedida().subscribe(response => {
      console.log(response);
      this.unidadMedidaList = response;
    });
  }

  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }

  reset() {
    this.first = 0;
  }

  isLastPage(): boolean {
    return this.unidadMedidaList ? this.first === (this.unidadMedidaList.length - this.rows) : true;
  }

  isFirstPage(): boolean {
    return this.unidadMedidaList ? this.first === 0 : true;
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
}
