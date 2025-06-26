package com.app.backend.model;

import com.app.backend.enums.TipoPago;
import com.app.backend.enums.EstadoVenta;
import com.app.backend.enums.FormaEntrega;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "ventas")
public class Venta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    @Column(name = "fecha", nullable = false, updatable = false)
    private LocalDateTime fecha = LocalDateTime.now();

    @Column(nullable = false)
    private Double total;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo_pago", nullable = false)
    private TipoPago tipoPago;

    @Column(name = "numero_comprobante", nullable = false, unique = true)
    private String numeroComprobante;

    @Column(nullable = false)
    private Double igv;

    private Double descuento = 0.0;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private EstadoVenta estado;

    @Enumerated(EnumType.STRING)
    @Column(name = "forma_entrega", nullable = false)
    private FormaEntrega formaEntrega;

    @Column(columnDefinition = "TEXT")
    private String observaciones;

    @OneToMany(mappedBy = "venta", cascade = CascadeType.ALL)
    private List<DetalleVenta> detalle;

    // Getters y Setters

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Usuario getUsuario() { return usuario; }
    public void setUsuario(Usuario usuario) { this.usuario = usuario; }

    public LocalDateTime getFecha() { return fecha; }
    public void setFecha(LocalDateTime fecha) { this.fecha = fecha; }

    public Double getTotal() { return total; }
    public void setTotal(Double total) { this.total = total; }

    public TipoPago getTipoPago() { return tipoPago; }
    public void setTipoPago(TipoPago tipoPago) { this.tipoPago = tipoPago; }

    public String getNumeroComprobante() { return numeroComprobante; }
    public void setNumeroComprobante(String numeroComprobante) { this.numeroComprobante = numeroComprobante; }

    public Double getIgv() { return igv; }
    public void setIgv(Double igv) { this.igv = igv; }

    public Double getDescuento() { return descuento; }
    public void setDescuento(Double descuento) { this.descuento = descuento; }

    public EstadoVenta getEstado() { return estado; }
    public void setEstado(EstadoVenta estado) { this.estado = estado; }

    public FormaEntrega getFormaEntrega() { return formaEntrega; }
    public void setFormaEntrega(FormaEntrega formaEntrega) { this.formaEntrega = formaEntrega; }

    public String getObservaciones() { return observaciones; }
    public void setObservaciones(String observaciones) { this.observaciones = observaciones; }

    public List<DetalleVenta> getDetalle() { return detalle; }
    public void setDetalle(List<DetalleVenta> detalle) { this.detalle = detalle; }
}
