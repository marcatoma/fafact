import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { UnidadMedidaService } from 'src/app/almacen/services/unidad-medida.service';
import { UnidadMedidaModel } from 'src/app/models/unidad-medida.model';

@Component({
  selector: 'app-unidad-medida-form',
  templateUrl: './unidad-medida-form.component.html',
  styleUrls: ['./unidad-medida-form.component.scss'],
  providers: [MessageService]

})
export class UnidadMedidaFormComponent implements OnInit {
  errores: Map<String, String> = new Map();
  unidadMedidaForm: any = {};
  unidadMedida: UnidadMedidaModel;
  constructor(private unidadMedidaService: UnidadMedidaService, private formBuilder: FormBuilder, public config: DynamicDialogConfig,
    public ref: DynamicDialogRef, public messageService: MessageService) {
    this.unidadMedida = {};
    // iniciar la variable en activo
    this.unidadMedida.estado = true;
    //cargar los datos a editar    
    if (config.data.idUnidadMedida) {
      this.unidadMedida = { ...config.data }
      console.log(this.unidadMedida);
    }

  }

  ngOnInit(): void {
    this.loadForm();
  }

  loadForm() {
    this.unidadMedidaForm = this.formBuilder.group({
      abreviacion: new FormControl(this.unidadMedida.abreviacion, { validators: Validators.required }),
      descripcion: new FormControl(this.unidadMedida.descripcion, { validators: Validators.required }),
      estado: new FormControl(this.unidadMedida.estado),
    });
  }

  saveUnidadMedida(): void {
    this.unidadMedida.abreviacion = this.unidadMedidaForm.value['abreviacion'];
    this.unidadMedida.descripcion = this.unidadMedidaForm.value['descripcion'];
    this.unidadMedida.estado = this.unidadMedidaForm.value['estado'];
    console.log('values');

    console.log(this.unidadMedida);
    this.unidadMedidaService.RegistrarUnidadMedida(this.unidadMedida).subscribe({
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

        if (this.unidadMedida.idUnidadMedida) {
          // cerrar el dialog al terminar de guardar o editar
          this.dismissDialog();
        } else {
          this.unidadMedida = {};
          this.unidadMedida.estado = true;
          this.loadForm();
        }

      },     // nextHandler
    });

  }
  dismissDialog() {
    this.ref.close();
  }

}
