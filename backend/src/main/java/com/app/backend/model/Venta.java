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

    @Column(name = "fecha", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime fecha;

    private Double total;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo_pago")
    private TipoPago tipoPago;

    @Column(name = "numero_comprobante")
    private String numeroComprobante;

    private Double igv;

    private Double descuento;

    @Enumerated(EnumType.STRING)
    private EstadoVenta estado;

    @Enumerated(EnumType.STRING)
    @Column(name = "forma_entrega")
    private FormaEntrega formaEntrega;

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
    
    public EstadoVenta getEstado() { return estado; }
    public void setEstado(EstadoVenta estado) { this.estado = estado; }

    public FormaEntrega getFormaEntrega() { return formaEntrega; }
    public void setFormaEntrega(FormaEntrega formaEntrega) { this.formaEntrega = formaEntrega; }

    public List<DetalleVenta> getDetalle() { return detalle; }
    public void setDetalle(List<DetalleVenta> detalle) { this.detalle = detalle; }
}
