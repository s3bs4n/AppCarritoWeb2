import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProductosService } from '../../services/productos.service'; // Servicio para obtener productos

interface Producto {
  id: number;
  nombre: string;
  categoria: string;
  precio: number;
  imagenPath: string; // Cambiado para mantener consistencia con AdminProductosComponent
}

interface CarritoProducto extends Producto {
  cantidad: number;
}

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css'],
})
export class CarritoComponent implements OnInit {
  productos: Producto[] = []; // Lista de productos obtenidos desde el backend
  articulosCarrito: CarritoProducto[] = []; // Productos agregados al carrito

  constructor(private router: Router, private productosService: ProductosService) {}

  ngOnInit(): void {
    this.obtenerProductos(); // Cargar productos desde el backend
    this.articulosCarrito = this.obtenerCarritoDeLocalStorage();
  }

  salir(): void {
    this.router.navigate(['/login']);
  }

  // Obtener productos desde el backend
  obtenerProductos(): void {
    this.productosService.getProductos().subscribe(
      (data: Producto[]) => {
        console.log('Productos cargados:', data);
        this.productos = data.map((producto) => ({
          ...producto,
          imagenPath: this.generarRutaImagen(producto.nombre), // Usar lógica consistente con AdminProductosComponent
        }));
      },
      (error) => {
        console.error('Error al obtener productos:', error);
      }
    );
  }

  // Generar la ruta de la imagen en función del nombre del producto
  generarRutaImagen(nombre: string): string {
    const nombreFormateado = nombre.toLowerCase().replace(/\s+/g, '-'); // Consistencia con AdminProductosComponent
    return `assets/img/${nombreFormateado}.jpg`;
  }

  // Agregar producto al carrito
  agregarProducto(producto: Producto): void {
    const productoEnCarrito = this.articulosCarrito.find((item) => item.id === producto.id);

    if (productoEnCarrito) {
      productoEnCarrito.cantidad++;
    } else {
      const nuevoProducto: CarritoProducto = { ...producto, cantidad: 1 };
      this.articulosCarrito.push(nuevoProducto);
    }

    this.guardarCarritoEnLocalStorage();
    console.log(`Producto agregado: ${producto.nombre}`);
  }

  // Eliminar un producto del carrito
  eliminarProducto(id: number): void {
    this.articulosCarrito = this.articulosCarrito.filter((producto) => producto.id !== id);
    this.guardarCarritoEnLocalStorage();
  }

  // Vaciar el carrito
  vaciarCarrito(): void {
    this.articulosCarrito = [];
    this.guardarCarritoEnLocalStorage();
  }

  // Redirigir al proceso de pago
  irAPagar(): void {
    this.guardarCarritoEnLocalStorage();
    this.router.navigate(['/lista-productos']); // Simular la redirección a un proceso de pago
  }

  // Formatear precios
  formatearPrecio(precio: number): string {
    return `$${precio.toLocaleString('es-CL')}`;
  }

  // Guardar carrito en LocalStorage
  guardarCarritoEnLocalStorage(): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem('articulosCarrito', JSON.stringify(this.articulosCarrito));
    }
  }

  // Obtener carrito desde LocalStorage
  obtenerCarritoDeLocalStorage(): CarritoProducto[] {
    if (this.isLocalStorageAvailable()) {
      const carrito = localStorage.getItem('articulosCarrito');
      return carrito ? JSON.parse(carrito) : [];
    }
    return [];
  }

  // Comprobar si LocalStorage está disponible
  private isLocalStorageAvailable(): boolean {
    try {
      const test = '__localStorageTest__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }
}
