import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../services/productos.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-admin-productos',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './admin-productos.component.html',
  styleUrls: ['./admin-productos.component.css'],
})
export class AdminProductosComponent implements OnInit {
  productos: any[] = []; // Lista de productos
  nombre = '';
  precio: number | null = null;
  idSeleccionado: number | null = null; // Para identificar si se edita un producto

  constructor(private productosService: ProductosService) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  // Cargar la lista de productos desde el backend
  cargarProductos(): void {
    this.productosService.getProductos().subscribe(
      (data) => {
        console.log('Productos cargados:', data);
        this.productos = data;
      },
      (error) => {
        console.error('Error al cargar productos:', error);
      }
    );
  }

  // Agregar o modificar un producto
  submitForm(): void {
    const producto = {
      nombre: this.nombre,
      precio: this.precio,
    };

    if (this.idSeleccionado) {
      // Si hay un ID seleccionado, actualizamos el producto
      this.productosService.updateProducto(this.idSeleccionado.toString(), producto).subscribe(
        () => {
          alert('Producto actualizado exitosamente');
          this.cargarProductos();
          this.limpiarFormulario();
        },
        (error) => {
          console.error('Error al actualizar producto:', error);
        }
      );
    } else {
      // Si no hay ID seleccionado, creamos un nuevo producto
      this.productosService.createProducto(producto).subscribe(
        () => {
          alert('Producto creado exitosamente');
          this.cargarProductos();
          this.limpiarFormulario();
        },
        (error) => {
          console.error('Error al crear producto:', error);
        }
      );
    }
  }

  // Cargar datos del producto seleccionado para editar
  editarProducto(producto: any): void {
    this.idSeleccionado = producto.id;
    this.nombre = producto.nombre;
    this.precio = producto.precio;
  }

  // Eliminar un producto
  eliminarProducto(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      this.productosService.deleteProducto(id.toString()).subscribe(
        () => {
          alert('Producto eliminado exitosamente');
          this.cargarProductos();
        },
        (error) => {
          console.error('Error al eliminar producto:', error);
        }
      );
    }
  }

  // Limpiar el formulario
  limpiarFormulario(): void {
    this.idSeleccionado = null;
    this.nombre = '';
    this.precio = null;
  }
}
