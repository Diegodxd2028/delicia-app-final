package com.app.backend.controller;

import com.app.backend.model.Producto;
import com.app.backend.repository.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/productos")
public class ProductoController {

    @Autowired
    private ProductoRepository productoRepository;

    @PostMapping
    public Producto agregarProducto(@RequestBody Producto producto) {
        return productoRepository.save(producto);
    }

    @GetMapping("/{id}")
    public Producto obtenerProducto(@PathVariable Long id) {
        return productoRepository.findById(id).orElse(null);
    }

    @GetMapping
    public List<Producto> obtenerProductos(
        @RequestParam(required = false) Long categoriaId,
        @RequestParam(required = false) String nombre
    ) {
        if (categoriaId != null && nombre != null) {
            return productoRepository.findByCategoriaIdAndNombreContainingIgnoreCase(categoriaId, nombre);
        } else if (categoriaId != null) {
            return productoRepository.findByCategoriaId(categoriaId);
        } else if (nombre != null) {
            return productoRepository.findByNombreContainingIgnoreCase(nombre);
        } else {
            return productoRepository.findAll();
        }
    }

}