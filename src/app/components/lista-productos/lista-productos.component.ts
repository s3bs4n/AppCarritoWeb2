import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

declare var bootstrap: any;

interface ProductoCarrito {
  imagen: string;
  nombre: string;
  precio: number;
  cantidad: number;
}

@Component({
  selector: 'app-lista-productos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.css']
})
export class ListaProductosComponent implements OnInit, AfterViewInit {
  productosCarrito: ProductoCarrito[] = [];
  precioTotal: number = 0;
  modalInstance: any;

  constructor(private router: Router) {}

  ngOnInit() {
    const productosCarrito = localStorage.getItem('articulosCarrito');
    if (productosCarrito) {
      this.productosCarrito = JSON.parse(productosCarrito);
      this.calcularPrecioTotal();
    }
  }

  ngAfterViewInit() {
    const modalElement = document.getElementById('modalChoice');
    if (modalElement) {
      this.modalInstance = new bootstrap.Modal(modalElement);
    }
  }

  calcularPrecioTotal() {
    this.precioTotal = this.productosCarrito.reduce((total, producto) => {
      return total + producto.precio * producto.cantidad;
    }, 0);
  }

  volverAlInicio() {
    localStorage.removeItem('articulosCarrito');

    if (this.modalInstance) {
      this.modalInstance.hide();
      // Espera un momento antes de redirigir para asegurar que el modal se oculta completamente
      setTimeout(() => {
        this.router.navigate(['/carrito']);
      }, 300); // 300ms debería ser suficiente para el efecto de ocultar
    } else {
      this.router.navigate(['/carrito']);
    }
  }
}
