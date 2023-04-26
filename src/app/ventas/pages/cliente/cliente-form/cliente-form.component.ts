import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Message, MessageService } from 'primeng/api';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ClienteModel } from 'src/app/models/cliente.model';
import { TipoIdentifiacionModel } from 'src/app/models/tipo-identifiacion.model';
import { ClienteService } from 'src/app/ventas/services/cliente.service';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.scss'],
  providers: [MessageService]

})
export class ClienteFormComponent implements OnInit {

  cliente: ClienteModel = {};
  tipoIdentidadList: TipoIdentifiacionModel[] = [];
  msg: Message[] = [];
  clienteForm: any = {};
  errores: Map<String, String> = new Map();


  constructor(public config: DynamicDialogConfig, public messageService: MessageService, private formBuilder: FormBuilder,
    private clienteService: ClienteService) {
    if (config.data.idPersona) {
      this.cliente = { ...config.data }
      console.log(this.cliente);

    }
  }
  ngOnInit(): void {
    this.msg.push({ severity: 'info', summary: 'Info Message', detail: 'Los campos con * son obligatorios' });
    // listar tipos de identificacion
    this.listarTipoIdentificacion();
    this.loadForm();

  }

  asignarValoresToSave(): void {
    this.cliente.nombreRazonSocial = this.clienteForm.value['nombreRazonSocial'];
    this.cliente.tipoIdentificacion = this.clienteForm.value['tipoIdentificacion'];
    this.cliente.identificacion = this.clienteForm.value['identificacion'];
    this.cliente.direccion = this.clienteForm.value['direccion'];
    this.cliente.celular = this.clienteForm.value['celular'];
    this.cliente.email = this.clienteForm.value['email'];
    this.cliente.observacion = this.clienteForm.value['observacion'];
    this.cliente.estado = this.clienteForm.value['estado'];
  }

  loadForm(): void {

    this.clienteForm = this.formBuilder.group({
      nombreRazonSocial: new FormControl(this.cliente.nombreRazonSocial, { validators: Validators.required }),
      tipoIdentificacion: new FormControl(this.cliente.tipoIdentificacion, { validators: Validators.required }),
      identificacion: new FormControl(this.cliente.identificacion, { validators: Validators.required }),
      ciudad: new FormControl(this.cliente.ciudad, { validators: Validators.required }),
      direccion: new FormControl(this.cliente.direccion, { validators: Validators.required }),
      celular: new FormControl(this.cliente.celular, { validators: Validators.required }),
      email: new FormControl(this.cliente.email, { validators: Validators.required }),
      observacion: new FormControl(this.cliente.observacion),
      estado: new FormControl(this.cliente.estado),
      /*
      categoria: new FormControl(this.producto.subCategoria?.categoria, { validators: Validators.required }),
      inventariable: new FormControl(this.producto.inventariable, { validators: Validators.required }),
      descripcion: new FormControl(this.producto.descripcion),
      stock: new FormControl(this.producto.stock),
      */
    });

  }
  listarTipoIdentificacion() {
    this.clienteService.ListarTipoIdentificacion().subscribe({
      next: (response) => {
        this.tipoIdentidadList = response.content;
      },
      error: (err) => {
        //imprimir el error
        console.log(err.error.error);
      },
    });
  }

  searchCity(event: any) {
    console.log('busqueda');

  }

}
