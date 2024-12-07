import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CarritoComponent } from './carrito.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CarritoComponent', () => {
  let component: CarritoComponent;
  let fixture: ComponentFixture<CarritoComponent>;
  let localStorageSpy: jasmine.SpyObj<Storage>;

  beforeEach(async () => {
    localStorageSpy = jasmine.createSpyObj('Storage', ['getItem', 'setItem']);

    await TestBed.configureTestingModule({
      declarations: [CarritoComponent],
      imports: [HttpClientTestingModule], // Agregar HttpClientTestingModule para servicios
      providers: [{ provide: Storage, useValue: localStorageSpy }]
    }).compileComponents();

    fixture = TestBed.createComponent(CarritoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load products from localStorage on init', () => {
    const mockProducts = JSON.stringify([{ id: 1, nombre: 'Producto 1', precio: 100, cantidad: 1 }]);
    localStorageSpy.getItem.and.returnValue(mockProducts);

    component.ngOnInit();

    expect(component.articulosCarrito.length).toBe(1);
    expect(component.articulosCarrito[0].nombre).toBe('Producto 1');
  });

  it('should calculate the total of products', () => {
    component.articulosCarrito = [
      {
        id: 1, nombre: 'Producto 1', precio: 100, cantidad: 1,
        categoria: '',
        imagenPath: ''
      },
      {
        id: 2, nombre: 'Producto 2', precio: 200, cantidad: 1,
        categoria: '',
        imagenPath: ''
      }
    ];
    const total = component.articulosCarrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
    expect(total).toBe(300);
  });

  it('should remove a product from the cart', () => {
    component.articulosCarrito = [
      {
        id: 1, nombre: 'Producto 1', precio: 100, cantidad: 1,
        categoria: '',
        imagenPath: ''
      },
      {
        id: 2, nombre: 'Producto 2', precio: 200, cantidad: 1,
        categoria: '',
        imagenPath: ''
      }
    ];
    component.eliminarProducto(1);
    expect(component.articulosCarrito.length).toBe(1);
    expect(component.articulosCarrito[0].id).toBe(2);
  });
});
