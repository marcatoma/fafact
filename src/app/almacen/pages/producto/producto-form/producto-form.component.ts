import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Message, MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CategoriaService } from 'src/app/almacen/services/categoria.service';
import { ProductoService } from 'src/app/almacen/services/producto.service';
import { SubCategoriaService } from 'src/app/almacen/services/sub-categoria.service';
import { CategoriaModel } from 'src/app/models/categoria';
import { ProductoModel } from 'src/app/models/producto.model';
import { SubCategoriaModel } from 'src/app/models/sub-categoria.model';

@Component({
  selector: 'app-producto-form',
  templateUrl: './producto-form.component.html',
  styleUrls: ['./producto-form.component.scss', '../../../../shared/estilos/toggle.scss'],
  providers: [MessageService]
})
export class ProductoFormComponent implements OnInit {
  //declarar variables vacias
  categories: CategoriaModel[] = [];
  subCategorie: SubCategoriaModel[] = [];
  // temporalCategorie: CategoriaModel = {};
  dissabledInput: boolean = true;
  msg: Message[] = [];
  errores: Map<String, String> = new Map();
  productoForm: any = {};
  producto: ProductoModel;
  constructor(private productoService: ProductoService, private categoriaService: CategoriaService,
    private subCategoriaService: SubCategoriaService, public ref: DynamicDialogRef, public messageService: MessageService,
    private formBuilder: FormBuilder, public config: DynamicDialogConfig) {
    this.producto = {};
    // iniciar la variable en activo
    this.parametrosIniciales();
    if (config.data.idProducto) {
      this.producto = { ...config.data }
    }
  }

  ngOnInit(): void {
    this.listarCategorias();
    this.msg.push({ severity: 'info', summary: 'Info Message', detail: 'Los campos con * son obligatorios' });
    this.loadForm();
  }
  saveCategoria(): void {
    this.producto.descripcion = this.productoForm.value['descripcion'];
    this.producto.estado = this.productoForm.value['estado'];
    console.log('values');
    console.log(this.producto);
    this.productoService.RegistrarProducto(this.producto).subscribe({
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

        if (this.producto.idProducto) {
          // cerrar el dialog al terminar de guardar o editar
          this.dismissDialog();
        } else {
          this.producto = {};
          this.parametrosIniciales();
          this.loadForm();
        }

      },     // nextHandler
    });
  }
  loadForm() {
    if (this.producto.subCategoria?.categoria?.idCategoria) {
      const idCat=this.producto.subCategoria?.categoria?.idCategoria;
      this.listarSubCategorias(idCat);
    }    
    this.productoForm = this.formBuilder.group({
      codigo: new FormControl(this.producto.codigo, { validators: Validators.required }),
      nombreProducto: new FormControl(this.producto.nombreProducto, { validators: Validators.required }),
      unidadMedida: new FormControl(this.producto.unidadMedida, { validators: Validators.required }),
      precio: new FormControl(this.producto.precio, { validators: Validators.required }),
      subCategoria: new FormControl(this.producto.subCategoria, { validators: Validators.required }),
      categoria: new FormControl(this.producto.subCategoria?.categoria, { validators: Validators.required }),
      iva: new FormControl(this.producto.iva, { validators: Validators.required }),
      inventariable: new FormControl(this.producto.inventariable, { validators: Validators.required }),
      codigo_aux: new FormControl(this.producto.codigo_aux),
      descripcion: new FormControl(this.producto.descripcion),
      stock: new FormControl(this.producto.stock),
      estado: new FormControl(this.producto.estado),
    });
    console.log(this.productoForm);
  }

  dismissDialog() {
    this.ref.close();
  }

  parametrosIniciales() {
    this.producto.estado = true;
    this.producto.iva = true;
    this.producto.inventariable = true;
    // this.producto.precio = 0;
  }

  listarCategorias() {
    this.categoriaService.ListarTodasCategoria().subscribe({
      next: (response) => {
        this.categories = response.content;
      },
      error: (err) => {
        //imprimir el error
        console.log(err.error.error);
      },
    });
  }

  listarSubCategorias(idCate: number) {
    this.productoForm
    if (idCate) {
      this.subCategoriaService.ListarSubCategoria(idCate).subscribe({
        next: (response) => {
          this.subCategorie = response.content;
          console.log(this.subCategorie);
        },
        error: (err) => {
          //imprimir el error
          console.log(err.error.error);
        },
      });
    }
  }

}
