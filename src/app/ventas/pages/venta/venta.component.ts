import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ClienteModel } from 'src/app/models/cliente.model';
import { ClienteService } from '../../services/cliente.service';
import { CapturarProductosComponent } from './capturar-productos/capturar-productos.component';
import { DetalleVentaModel } from 'src/app/models/detalle-venta.model';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.scss'],
  providers: [DialogService]
})
export class VentaComponent implements OnInit, OnDestroy {
  //dialog
  ref: DynamicDialogRef = new DynamicDialogRef();
  //
  valueIdentificacion = '';
  objCliente: ClienteModel = {};
  productos: [] = [];
  detalleFactura: DetalleVentaModel[] = [];
  constructor(private clienteService: ClienteService, public dialogService: DialogService, private dataService: DataService) {

  }

  ngOnInit(): void {
    this.actualizarListaDetalle();
  }

  show() { }
  buscarCliente(event: any): void {
    this.clienteService.buscarClienteIdentificacion(this.valueIdentificacion).subscribe({
      next: (response) => {
        this.objCliente = response.content;
        console.log(response.content);
      },
      error: (err) => {
        //imprimir el error
        console.log(err.error.error);
      },
    });
    console.log(this.valueIdentificacion);
  }

  showModoCaptura() {
    this.ref = this.dialogService.open(CapturarProductosComponent, {
      data: {},
      header: 'Seleccione el producto',
      width: '45%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: false,
    });
  }
  actualizarListaDetalle() {
    this.dataService.currentDetalleFactura.subscribe(detalle =>
      this.detalleFactura = detalle
    );
  }
  ngOnDestroy(): void {

  }

}
