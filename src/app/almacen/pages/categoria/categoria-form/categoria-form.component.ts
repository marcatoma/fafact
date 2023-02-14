import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CategoriaService } from 'src/app/almacen/services/categoria.service';
import { CategoriaModel } from 'src/app/models/categoria';

@Component({
  selector: 'app-categoria-form',
  templateUrl: './categoria-form.component.html',
  styleUrls: ['./categoria-form.component.scss'],
  providers: [MessageService]
})
export class CategoriaFormComponent implements OnInit {
  errores: Map<String, String> = new Map();
  categoriaForm: any = {};
  categoria: CategoriaModel;
  constructor(private categoriaService: CategoriaService, private formBuilder: FormBuilder, public config: DynamicDialogConfig,
    public ref: DynamicDialogRef, public messageService: MessageService) {
    this.categoria = {};
    // iniciar la variable en activo
    this.categoria.estado = true;
    if (config.data.idCategoria) {
      this.categoria = { ...config.data }
    }
  }
  ngOnInit(): void {
    this.loadForm();
  }

  saveCategoria(): void {
    this.categoria.descripcion = this.categoriaForm.value['descripcion'];
    this.categoria.estado = this.categoriaForm.value['estado'];
    console.log('values');
    console.log(this.categoria);
    this.categoriaService.RegistrarCategoria(this.categoria).subscribe({
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

        if (this.categoria.idCategoria) {
          // cerrar el dialog al terminar de guardar o editar
          this.dismissDialog();
        } else {
          this.categoria = {};
          this.categoria.estado = true;
          this.loadForm();
        }

      },     // nextHandler
    });
  }

  loadForm() {
    this.categoriaForm = this.formBuilder.group({
      descripcion: new FormControl(this.categoria.descripcion, { validators: Validators.required }),
      estado: new FormControl(this.categoria.estado),
    });
  }

  dismissDialog() {
    this.ref.close();
  }

}
