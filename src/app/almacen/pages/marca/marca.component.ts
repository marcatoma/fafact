import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { MarcaModel } from 'src/app/models/marca';
import { Paginador } from 'src/app/models/paginador.model';
import { MarcaService } from '../../services/marca.service';

@Component({
  selector: 'app-marca',
  templateUrl: './marca.component.html',
  styleUrls: ['./marca.component.scss'],
  providers: [MessageService]
})
export class MarcaComponent implements OnInit {
  page: number = 0;
  rowsPerPage: number = 10;
  paginador: Paginador = {};
  query: string = '';
  marcaList: MarcaModel[];
  errores: Map<String, String> = new Map();
  marcaForm: any = {};
  marca: MarcaModel = {};
  constructor(private marcaService: MarcaService, private formBuilder: FormBuilder, public messageService: MessageService) {
    this.marcaList = [];
    this.marca.estado = true;
  }

  ngOnInit(): void {
    this.ListarMarca();
    this.loadForm();
  }

  display: boolean = false;

  showDialog(marcaContent: MarcaModel) {
    if (marcaContent.idMarca) {
      this.marca = { ...marcaContent };
      this.loadForm();
    }
    this.display = true;
    console.log(this.marcaForm.value);
  }

  saveMarca(): void {
    this.marca.descripcion = this.marcaForm.value['descripcion'];
    this.marca.estado = this.marcaForm.value['estado'];
    console.log('values');
    console.log(this.marca);
    this.marcaService.RegistrarMarca(this.marca).subscribe({
      error: (err) => {
        if (err.status == 406) {
          const m = err.error.error;
          for (var value in m) {
            this.errores.set(value, m[value]);
          }
        }
        else {
          //limpiar los mensajes anteriores
          this.messageService.clear();
          this.messageService.add({ severity: 'error', summary: err.error.mensaje, detail: err.error.error });
        }
      },    // errorHandler 
      next: (res) => {
        console.log(res);
        //limpiar los mensajes anteriores
        this.messageService.clear();
        this.errores = new Map();

        if (this.marca.idMarca) {
          // cerrar el dialog al terminar de guardar o editar
          this.dismissDialog();
        } else {
          this.marca = {};
          this.marca.estado = true;
          this.loadForm();
        }
      },     // nextHandler
    });
  }

  filtrarPorQuery(event: any) {
    this.ListarMarca(this.query);
  }

  ListarMarca = (q: string = ''): void => {
    this.marcaService.ListarMarca(this.page, this.rowsPerPage, q).subscribe(response => {
      this.paginador = { ...response.content };
      this.marcaList = response.content.content;
      console.log(this.marcaList);

    });
  }
  clearFilter(): void {
    this.query = '';
    this.ListarMarca(this.query);
  }

  onSelectRowChange(event: any): void {
    this.rowsPerPage = event;
    this.ListarMarca();
  }

  onFirtsChange(event: any): void {
    this.page = (event / this.rowsPerPage);
    this.ListarMarca();
  }

  get totalRecords() {
    return this.paginador.totalElements ? this.paginador.totalElements : 0;
  }

  dismissDialog(): void {
    this.display=false;
    this.ListarMarca();
    this.marca={};
    this.marca.estado=true;
  }

  loadForm(): void {
    this.marcaForm = this.formBuilder.group({
      descripcion: new FormControl(this.marca.descripcion, { validators: Validators.required }),
      estado: new FormControl(this.marca.estado),
    });
  }
}
