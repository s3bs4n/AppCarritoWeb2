import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface Producto {
    id: number;
    nombre: string;
    categoria: string;
    precio: number;
    imagen: string;
}

interface CarritoProducto extends Producto {
    cantidad: number;
}

@Component({
    selector: 'app-carrito',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './carrito.component.html',
    styleUrl: './carrito.component.css'
})

export class CarritoComponent implements OnInit {
    productos = [
        {
            id: 1,
            nombre: 'SNES CIB DK Set',
            categoria: 'Consolas',
            precio: 250000,
            imagen: 'assets/img/producto1.jpg'
        },
        {
            id: 2,
            nombre: 'Letrero Luminoso SNES',
            categoria: 'Decoración',
            precio: 15000,
            imagen: 'assets/img/producto2.jpg'
        },
        {
            id: 3,
            nombre: 'Kirby MousePad + Tazón',
            categoria: 'Decoración',
            precio: 15000,
            imagen: 'assets/img/producto3.jpg'
        },
        {
            id: 4,
            nombre: 'SNES control',
            categoria: 'Accesorios',
            precio: 30000,
            imagen: 'assets/img/producto4.jpg'
        },
        {
            id: 5,
            nombre: 'Cuadro 3D Super Mario World',
            categoria: 'Decoración',
            precio: 25000,
            imagen: 'assets/img/producto5.jpg'
        },
        {
            id: 6,
            nombre: 'Star Fox CIB',
            categoria: 'Juegos',
            precio: 150000,
            imagen: 'assets/img/producto6.jpg'
        },
        {
            id: 7,
            nombre: 'Póster Zelda',
            categoria: 'Decoración',
            precio: 7000,
            imagen: 'assets/img/producto7.jpg'
        },
        {
            id: 8,
            nombre: 'Killer Instinct CIB',
            categoria: 'Juegos',
            precio: 300000,
            imagen: 'assets/img/producto8.jpg'
        },
        {
            id: 9,
            nombre: 'Street Fighter 2',
            categoria: 'Juegos',
            precio: 60000,
            imagen: 'assets/img/producto9.jpg'
        },
        {
            id: 10,
            nombre: 'Polera Mortal Kombat 2',
            categoria: 'Accesorios',
            precio: 20000,
            imagen: 'assets/img/producto10.jpg'
        },
        {
            id: 11,
            nombre: 'Mini SNES',
            categoria: 'Consolas',
            precio: 150000,
            imagen: 'assets/img/producto11.jpg'
        },
        {
            id: 12,
            nombre: 'Super Mario World',
            categoria: 'Juegos',
            precio: 35000,
            imagen: 'assets/img/producto12.jpg'
        }
    ];


    agregarAlCarrito(producto: any): void {
        // Lógica para agregar el producto al carrito
        console.log(`Producto agregado: ${producto.nombre}`);
    }

    formatearPrecio(precio: number): string {
        return '$' + precio.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }

    irAPagar(): void {
      this.guardarCarritoEnLocalStorage();
      this.router.navigate(['/lista-productos']);
    }

    salir(): void {
      this.router.navigate(['/login']);
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  articulosCarrito: CarritoProducto[] = [];

  // constructor() {}
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.articulosCarrito = this.obtenerCarritoDeLocalStorage();
    this.carritoHTML();
  }

  agregarProducto(producto: Producto): void {
    const productoEnCarrito = this.articulosCarrito.find(item => item.id === producto.id);
    
    if (productoEnCarrito) {
      productoEnCarrito.cantidad++;
    } else {
      const nuevoProducto: CarritoProducto = { ...producto, cantidad: 1 };
      this.articulosCarrito.push(nuevoProducto);
    }

    this.carritoHTML();
  }

  eliminarProducto(id: number): void {
    this.articulosCarrito = this.articulosCarrito.filter(producto => producto.id !== id);
    this.carritoHTML();
  }

  carritoHTML(): void {
    this.vaciarCarritoHTML();
    this.guardarCarritoEnLocalStorage();
  }

  vaciarCarrito(): void {
    this.articulosCarrito = [];
    this.carritoHTML();
  }

  vaciarCarritoHTML(): void {
    // El tbody se maneja automáticamente con Angular
  }

  obtenerCarritoDeLocalStorage(): CarritoProducto[] {
    if (this.isLocalStorageAvailable()) {
      const carrito = localStorage.getItem('articulosCarrito');
      return carrito ? JSON.parse(carrito) : [];
    }
    return [];
  }

  guardarCarritoEnLocalStorage(): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem('articulosCarrito', JSON.stringify(this.articulosCarrito));
    }
  }

  pagarCarrito(): void {
    this.guardarCarritoEnLocalStorage();
    window.location.href = 'listado-productos.component.html';
  }

  formatCurrency(value: number): string {
    return '$' + value.toLocaleString('es-CL');
  }

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
