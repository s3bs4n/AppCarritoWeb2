import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminProductosComponent } from './admin-productos.component';
import { ProductosService } from '../../services/productos.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('AdminProductosComponent', () => {
  let component: AdminProductosComponent;
  let fixture: ComponentFixture<AdminProductosComponent>;
  let productoServiceSpy: jasmine.SpyObj<ProductosService>;

  beforeEach(async () => {
    productoServiceSpy.getProductos.and.returnValue(of([]));
    productoServiceSpy = jasmine.createSpyObj('ProductosService', ['getProductos', 'createProducto', 'updateProducto', 'deleteProducto']);

    await TestBed.configureTestingModule({
      imports: [AdminProductosComponent, HttpClientTestingModule],
      providers: [{ provide: ProductosService, useValue: productoServiceSpy }]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load products from API on init', () => {
    const mockProductos = [{ id: 1, nombre: 'Producto 1', precio: 100 }];
    productoServiceSpy.getProductos.and.returnValue(of(mockProductos));

    component.ngOnInit();

    expect(productoServiceSpy.getProductos).toHaveBeenCalled();
    expect(component.productos.length).toBe(1);
    expect(component.productos[0].nombre).toBe('Producto 1');
  });

  it('should call ProductosService.createProducto on submitForm for new product', () => {
    const newProduct = { nombre: 'Producto 2', precio: 200 };
    productoServiceSpy.createProducto.and.returnValue(of(newProduct));

    component.nombre = 'Producto 2';
    component.precio = 200;
    component.submitForm();

    expect(productoServiceSpy.createProducto).toHaveBeenCalledWith(newProduct);
    expect(productoServiceSpy.getProductos).toHaveBeenCalled(); // Should refresh product list
  });

  it('should call ProductosService.updateProducto on submitForm for existing product', () => {
    const updatedProduct = { nombre: 'Producto Actualizado', precio: 300 };
    productoServiceSpy.updateProducto.and.returnValue(of(updatedProduct));

    component.idSeleccionado = 1;
    component.nombre = 'Producto Actualizado';
    component.precio = 300;
    component.submitForm();

    expect(productoServiceSpy.updateProducto).toHaveBeenCalledWith('1', updatedProduct);
    expect(productoServiceSpy.getProductos).toHaveBeenCalled(); // Should refresh product list
  });

  it('should call ProductosService.deleteProducto on eliminarProducto', () => {
    productoServiceSpy.deleteProducto.and.returnValue(of(true));

    component.productos = [{ id: 1, nombre: 'Producto 1', precio: 100 }];
    component.eliminarProducto(1);

    expect(productoServiceSpy.deleteProducto).toHaveBeenCalledWith('1');
    expect(productoServiceSpy.getProductos).toHaveBeenCalled(); // Should refresh product list
  });
});
