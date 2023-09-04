import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Message, MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CantonModel } from 'src/app/models/canton.model';
import { ClienteModel } from 'src/app/models/cliente.model';
import { TipoIdentifiacionModel } from 'src/app/models/tipo-identifiacion.model';
import { CantonService } from 'src/app/ventas/services/canton.service';
import { ClienteService } from 'src/app/ventas/services/cliente.service';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.scss', '../../../../shared/estilos/toggle.scss'],
  providers: [MessageService]

})
export class ClienteFormComponent implements OnInit {

  cliente: ClienteModel = {};
  tipoIdentidadList: TipoIdentifiacionModel[] = [];
  msg: Message[] = [];
  clienteForm: any = {};
  errores: Map<String, String> = new Map();
  cantones: CantonModel[] = [];
  queryCanton: string = '';

  constructor(public config: DynamicDialogConfig, public messageService: MessageService, private formBuilder: FormBuilder,
    private clienteService: ClienteService, private cantonService: CantonService, public ref: DynamicDialogRef) {
    this.parametrosIniciales();
    if (config.data.idPersona) {
      this.cliente = { ...config.data }
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
    this.cliente.canton = this.clienteForm.value['canton'];
    this.cliente.direccion = this.clienteForm.value['direccion'];
    this.cliente.celular = this.clienteForm.value['celular'];
    this.cliente.email = this.clienteForm.value['email'];
    this.cliente.observacion = this.clienteForm.value['observacion'];
    this.cliente.estado = this.clienteForm.value['estado'];
  }

  saveCliente(): void {
    this.asignarValoresToSave();
    this.clienteService.RegistrarCliente(this.cliente).subscribe({
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
        //limpiar los mensajes anteriores
        console.log(res);

        this.messageService.clear();
        this.errores = new Map();

        if (this.cliente.idPersona) {
          // cerrar el dialog al terminar de guardar o editar
          this.dismissDialog();
        } else {
          this.cliente = {};
          this.parametrosIniciales();
          this.loadForm();
        }

      },     // nextHandler
    })
  }

  loadForm(): void {
    this.clienteForm = this.formBuilder.group({
      nombreRazonSocial: new FormControl(this.cliente.nombreRazonSocial, { validators: Validators.required }),
      tipoIdentificacion: new FormControl(this.cliente.tipoIdentificacion, { validators: Validators.required }),
      identificacion: new FormControl(this.cliente.identificacion, { validators: Validators.required }),
      canton: new FormControl(this.cliente.canton, { validators: Validators.required }),
      direccion: new FormControl(this.cliente.direccion, { validators: Validators.required }),
      celular: new FormControl(this.cliente.celular, { validators: Validators.required }),
      email: new FormControl(this.cliente.email, { validators: Validators.required }),
      observacion: new FormControl(this.cliente.observacion),
      estado: new FormControl(this.cliente.estado),
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

  searchCanton(event: any) {
    const q = event.query;
    this.cantonService.filtrarCantones(q).subscribe({
      next: (response) => {
        this.cantones = response.content;
      },
      error: (err) => {
        //imprimir el error
        console.log(err.error.error);
      },
    });
  }

  dismissDialog() {
    this.ref.close();
  }

  parametrosIniciales() {
    this.cliente.estado = true;
  }
}
