import { Component, OnDestroy, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ClienteModel } from 'src/app/models/cliente.model';
import { Paginador } from 'src/app/models/paginador.model';
import { ClienteService } from '../../services/cliente.service';
import { ClienteFormComponent } from './cliente-form/cliente-form.component';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss'],
  providers: [DialogService],
})
export class ClienteComponent implements OnInit, OnDestroy {
  clienteList: ClienteModel[] = [];
  first = 0;
  rowsPerPage = 10;
  page = 0;
  paginador: Paginador = {};
  query: string = '';
  ref: DynamicDialogRef;


  constructor(private clienteService: ClienteService, public dialogService: DialogService) {
    this.ref = new DynamicDialogRef();
  }
  ngOnInit(): void {
    this.listarClientes();
  }

  listarClientes(query: string = ''): void {
    this.clienteService.ListarCliente(this.page, this.rowsPerPage, query).subscribe(response => {
      this.paginador = { ...response.content };
      this.clienteList = response.content.content;
    });
  }

  isFirstPage(): boolean {
    return this.paginador.first ? true : false;
  }

  get totalRecords() {
    return this.paginador.totalElements ? this.paginador.totalElements : 0;
  }
  onSelectRowChange(event: any) {
    this.rowsPerPage = event;
    this.listarClientes();
  }
  onFirtsChange(event: any) {
    this.page = (event / this.rowsPerPage);
    this.listarClientes();
  }
  filtrarPorQuery(event: any) {
    this.listarClientes(this.query);
  }
  clearFilter() {
    this.query = '';
    this.listarClientes(this.query);
  }

  reset() {
    this.first = 0;
  }

  isLastPage(): boolean {
    return this.paginador.last ? true : false;
  }

  show(cliente: ClienteModel) {
    this.ref = this.dialogService.open(ClienteFormComponent, {
      header: 'Formulario de Cliente',
      width: '70%',
      contentStyle: { "max-height": "100%", "overflow": "auto" },
      baseZIndex: 10000,
      data: cliente ? cliente : undefined,
    });
    this.ref.onClose.subscribe(() => {
      if (true) {
        this.listarClientes();
      }
    });
  }
  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }
}
