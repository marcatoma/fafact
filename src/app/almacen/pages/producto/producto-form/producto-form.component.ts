import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Message, MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CategoriaService } from 'src/app/almacen/services/categoria.service';
import { MarcaService } from 'src/app/almacen/services/marca.service';
import { ProductoService } from 'src/app/almacen/services/producto.service';
import { SubCategoriaService } from 'src/app/almacen/services/sub-categoria.service';
import { UnidadMedidaService } from 'src/app/almacen/services/unidad-medida.service';
import { CategoriaModel } from 'src/app/models/categoria';
import { MarcaModel } from 'src/app/models/marca';
import { ProductoModel } from 'src/app/models/producto.model';
import { SubCategoriaModel } from 'src/app/models/sub-categoria.model';
import { UnidadMedidaModel } from 'src/app/models/unidad-medida.model';

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
  marcas: MarcaModel[] = [];
  unidadMedidas: UnidadMedidaModel[] = [];
  // temporalCategorie: CategoriaModel = {};
  dissabledInput: boolean = true;
  msg: Message[] = [];
  errores: Map<String, String> = new Map();
  productoForm: any = {};
  producto: ProductoModel;
  constructor(private productoService: ProductoService, private categoriaService: CategoriaService,
    private subCategoriaService: SubCategoriaService, public ref: DynamicDialogRef, public messageService: MessageService,
    private formBuilder: FormBuilder, public config: DynamicDialogConfig, private marcaService: MarcaService, private unidadMedidaService: UnidadMedidaService) {
    this.producto = {};
    // iniciar la variable en activo
    this.parametrosIniciales();
    if (config.data.idProducto) {
      this.producto = { ...config.data }
    }
  }

  ngOnInit(): void {
    this.listarCategorias();
    this.listarMarcas();
    this.listarUnidadesMedida();
    this.msg.push({ severity: 'info', summary: 'Info Message', detail: 'Los campos con * son obligatorios' });
    this.loadForm();
  }

  asignarValoresToSave() {
    this.producto.codigo = this.productoForm.value['codigo'];
    this.producto.codigo_aux = this.productoForm.value['codigo_aux'];
    this.producto.descripcion = this.productoForm.value['descripcion'];
    this.producto.estado = this.productoForm.value['estado'];
    this.producto.inventariable = this.productoForm.value['inventariable'];
    this.producto.iva = this.productoForm.value['iva'];
    this.producto.marca = this.productoForm.value['marca'];
    this.producto.nombreProducto = this.productoForm.value['nombreProducto'];
    this.producto.precio = this.productoForm.value['precio'];
    this.producto.stock = this.productoForm.value['stock'];
    this.producto.subCategoria = this.productoForm.value['subCategoria'];
    this.producto.unidadMedida = this.productoForm.value['unidadMedida'];
  }

  saveProducto(): void {
    this.asignarValoresToSave();
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
      const idCat = this.producto.subCategoria?.categoria?.idCategoria;
      this.listarSubCategorias(idCat);
    }
    this.productoForm = this.formBuilder.group({
      codigo: new FormControl(this.producto.codigo, { validators: Validators.required }),
      nombreProducto: new FormControl(this.producto.nombreProducto, { validators: Validators.required }),
      unidadMedida: new FormControl(this.producto.unidadMedida, { validators: Validators.required }),
      marca: new FormControl(this.producto.marca, { validators: Validators.required }),
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

  listarMarcas() {
    this.marcaService.ListarTodasMarcas().subscribe({
      next: (response) => {
        this.marcas = response.content;
      },
      error: (err) => {
        //imprimir el error
        console.log(err.error.error);
      },
    });
  }

  listarUnidadesMedida() {
    this.unidadMedidaService.ListarTodasUnidadMedida().subscribe({
      next: (response) => {
        this.unidadMedidas = response.content;
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
