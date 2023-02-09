import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnidadMedidaFormComponent } from './unidad-medida-form.component';

describe('UnidadMedidaFormComponent', () => {
  let component: UnidadMedidaFormComponent;
  let fixture: ComponentFixture<UnidadMedidaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnidadMedidaFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnidadMedidaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
