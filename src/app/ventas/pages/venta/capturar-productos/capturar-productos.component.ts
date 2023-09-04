import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ProductoService } from 'src/app/almacen/services/producto.service';
import { DetalleVentaModel } from 'src/app/models/detalle-venta.model';
import { ModoCapturaModel } from 'src/app/models/modoCaptura.model';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-capturar-productos',
  templateUrl: './capturar-productos.component.html',
  styleUrls: ['./capturar-productos.component.scss']
})
export class CapturarProductosComponent implements OnInit {

  modoCaptura: ModoCapturaModel = {};
  listaDetalleFactura: DetalleVentaModel[] = [];
  // formulario
  modoCapturaForm: any = {};
  constructor(private formBuilder: FormBuilder, private productoService: ProductoService, private dataService: DataService) {

  }

  ngOnInit(): void {
    this.loadForm();
    console.log(this.modoCaptura);
  }

  obtenerProductoByCodigo(event: any) {
    const q = this.modoCapturaForm.value['queryCodigo'];
    this.productoService.ListarProductoByCodigo(q).subscribe({
      next: (response) => {
        this.modoCaptura.producto = { ...response.content };
        //volver a llamar para cargar los datos obtenidos
        if (this.modoCaptura.producto?.idProducto != undefined) {
          const detalle: DetalleVentaModel = {};
          detalle.cantidad = 1;
          detalle.descuento = 0;
          detalle.producto_item = { ...this.modoCaptura.producto };
          this.listaDetalleFactura.push(detalle);
          this.emitListaDetalleFactura();
        }
        //para llenar los campos con el producto
        this.loadForm();
      },
      error: (err) => {
        //imprimir el error
        console.log(err.error.error);
      },
    });
  }

  // asignarValores(): void {
  //   this.modoCaptura.producto = this.clienteForm.value['nombreRazonSocial'];
  // }

  loadForm(): void {
    this.modoCapturaForm = this.formBuilder.group({
      queryCodigo: new FormControl(this.modoCaptura.queryCodigo, { validators: Validators.required }),
      queryNombre: new FormControl(this.modoCaptura.queryNombre),
      subTotal: new FormControl(this.modoCaptura.subTotal),
      nombreProducto: new FormControl({ value: this.modoCaptura.producto?.nombreProducto, disabled: true }),
      precioUnitario: new FormControl({ value: this.modoCaptura.producto?.precio, disabled: true })
    });
  }

  emitListaDetalleFactura(): void {
    this.dataService.chageListDetalleFactura(this.listaDetalleFactura);
  }
}
