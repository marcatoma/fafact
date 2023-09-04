import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapturarProductosComponent } from './capturar-productos.component';

describe('CapturarProductosComponent', () => {
  let component: CapturarProductosComponent;
  let fixture: ComponentFixture<CapturarProductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CapturarProductosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CapturarProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
