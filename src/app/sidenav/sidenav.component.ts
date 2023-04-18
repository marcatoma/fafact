import { Component, OnInit } from '@angular/core';
// PimeNG
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  items: MenuItem[] = [];
  constructor() { }

  ngOnInit(): void {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        routerLink: ['/almacen']
      },
      {
        label: 'Almacen',
        icon: 'pi pi-pw pi-box',
        items: [{
          label: 'New',
          icon: 'pi pi-fw pi-plus',
          items: [
            { label: 'User', icon: 'pi pi-fw pi-user-plus' },
            { label: 'Filter', icon: 'pi pi-fw pi-filter' }
          ]
        },
        { label: 'Categoria', icon: 'pi pi-fw pi-tags', routerLink: ['almacen/categoria'] },
        { label: 'Producto', icon: 'pi pi-fw pi-book', routerLink: ['almacen/producto'] },
        { separator: true },
        { label: 'Unidad de medida', icon: 'pi pi-fw pi-percentage', routerLink: ['almacen/unidad-medida'] },
        { label: 'Marca', icon: 'pi pi-fw pi-bookmark', routerLink: ['almacen/marca'] },

        { label: 'Quit', icon: 'pi pi-fw pi-times' },
        ]
      },
      {
        label: 'Ventas',
        icon: 'pi pi-fw pi-pencil',
        items: [
          { label: 'Clientes', icon: 'pi pi-users', routerLink:['ventas/cliente'] },
          { label: 'Realizar venta', icon: 'pi pi-shopping-bag' },
          { label: 'Refresh', icon: 'pi pi-fw pi-refresh' }
        ]
      },
      {
        label: 'Help',
        icon: 'pi pi-fw pi-question',
        items: [
          {
            label: 'Contents',
            icon: 'pi pi-pi pi-bars'
          },
          {
            label: 'Search',
            icon: 'pi pi-pi pi-search',
            items: [
              {
                label: 'Text',
                items: [
                  {
                    label: 'Workspace'
                  }
                ]
              },
              {
                label: 'User',
                icon: 'pi pi-fw pi-file',
              }
            ]
          }
        ]
      },
      {
        label: 'Actions',
        icon: 'pi pi-fw pi-cog',
        items: [
          {
            label: 'Edit',
            icon: 'pi pi-fw pi-pencil',
            items: [
              { label: 'Save', icon: 'pi pi-fw pi-save' },
              { label: 'Update', icon: 'pi pi-fw pi-save' },
            ]
          },
          {
            label: 'Other',
            icon: 'pi pi-fw pi-tags',
            items: [
              { label: 'Delete', icon: 'pi pi-fw pi-minus' }
            ]
          }
        ]
      }
    ];
  }

}
