package com.app.backend.controller;

import com.app.backend.model.Venta;
import com.app.backend.service.VentaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ventas")
@CrossOrigin(origins = "*")
public class VentaController {

    @Autowired
    private VentaService ventaService;

    @PostMapping
    public ResponseEntity<?> registrarVenta(@RequestBody Venta venta) {
        try {
            System.out.println("📥 Venta JSON:");
            System.out.println("Usuario: " + (venta.getUsuario() != null ? venta.getUsuario().getId() : "null"));
            System.out.println("Total: " + venta.getTotal());
            System.out.println("Observaciones: " + venta.getObservaciones());
            System.out.println("Detalle:");
            if (venta.getDetalle() != null) {
                venta.getDetalle().forEach(d -> {
                    System.out.println("Producto ID: " + (d.getProducto() != null ? d.getProducto().getId() : "null"));
                    System.out.println("Cantidad: " + d.getCantidad());
                    System.out.println("Precio: " + d.getPrecioUnitario());
                });
            } else {
                System.out.println("❌ Detalle es null");
            }

            Venta ventaGuardada = ventaService.guardarVentaConDetalle(venta);
            return ResponseEntity.ok(ventaGuardada);

        } catch (Exception e) {
            System.err.println("❌ ERROR al guardar venta:");
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error interno: " + e.getMessage());
        }
    }

    @GetMapping("/usuario/{id}")
    public ResponseEntity<List<Venta>> obtenerVentasPorUsuario(@PathVariable Long id) {
        List<Venta> ventas = ventaService.obtenerVentasPorUsuario(id);
        return ResponseEntity.ok(ventas);
    }
}
