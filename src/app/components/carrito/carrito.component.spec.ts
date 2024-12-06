import { TestBed } from '@angular/core/testing';
import { CarritoComponent } from './carrito.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CarritoComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarritoComponent, HttpClientTestingModule], // IMPORTA CarritoComponent y HttpClientTestingModule
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(CarritoComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
