package com.app.backend.repository;

import com.app.backend.model.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List; 

public interface ProductoRepository extends JpaRepository<Producto, Long> {

    List<Producto> findByCategoriaId(Long categoriaId);
    List<Producto> findByNombreContainingIgnoreCase(String nombre);
    List<Producto> findByCategoriaIdAndNombreContainingIgnoreCase(Long categoriaId, String nombre);

}