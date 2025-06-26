package com.app.backend.service;

import com.app.backend.model.DetalleVenta;
import com.app.backend.model.Producto;
import com.app.backend.model.Venta;
import com.app.backend.repository.DetalleVentaRepository;
import com.app.backend.repository.ProductoRepository;
import com.app.backend.repository.VentaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class VentaService {

    @Autowired
    private VentaRepository ventaRepository;

    @Autowired
    private DetalleVentaRepository detalleVentaRepository;

    @Autowired
    private ProductoRepository productoRepository;

    @Transactional
    public Venta guardarVentaConDetalle(Venta venta) {
        if (venta.getDetalle() == null || venta.getDetalle().isEmpty()) {
            throw new RuntimeException("La venta no contiene productos");
        }

        // Asignar fecha actual si no se proporcionó
        if (venta.getFecha() == null) {
            venta.setFecha(LocalDateTime.now());
        }

        // Calcular IGV como 18% del total
        if (venta.getTotal() != null) {
            venta.setIgv(venta.getTotal() * 0.18);
        } else {
            throw new RuntimeException("El total no puede ser nulo");
        }

        // Generar número de comprobante tipo BOL001
        long count = ventaRepository.count() + 1;
        String numeroComprobante = String.format("BOL%03d", count);
        venta.setNumeroComprobante(numeroComprobante);

        // Descuento por defecto si es null
        if (venta.getDescuento() == null) {
            venta.setDescuento(0.0);
        }

        // Asignar esta venta como padre a todos los detalles antes de guardar
        for (DetalleVenta detalle : venta.getDetalle()) {
            if (detalle.getProducto() == null || detalle.getProducto().getId() == null) {
                throw new RuntimeException("El detalle de venta no tiene producto válido");
            }

            Producto producto = productoRepository.findById(detalle.getProducto().getId())
                    .orElseThrow(() -> new RuntimeException("Producto no encontrado: ID=" + detalle.getProducto().getId()));

            if (producto.getStock() < detalle.getCantidad()) {
                throw new RuntimeException("Stock insuficiente para el producto: " + producto.getNombre());
            }

            detalle.setVenta(venta);
        }

        Venta ventaGuardada = ventaRepository.save(venta);

        // Actualizar stock
        for (DetalleVenta detalle : venta.getDetalle()) {
            Producto producto = productoRepository.findById(detalle.getProducto().getId()).get();
            producto.setStock(producto.getStock() - detalle.getCantidad());
            productoRepository.save(producto);
        }

        return ventaGuardada;
    }

    public List<Venta> obtenerVentasPorUsuario(Long usuarioId) {
        return ventaRepository.findByUsuarioId(usuarioId);
    }
}
