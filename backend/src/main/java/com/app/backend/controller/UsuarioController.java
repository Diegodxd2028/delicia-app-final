package com.app.backend.controller;

import com.app.backend.model.Usuario;
import com.app.backend.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @PostMapping("/registro")
    public Usuario registrar(@RequestBody Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    @PostMapping("/login")
    public String login(@RequestBody Usuario usuario) {
        Optional<Usuario> u = usuarioRepository.findByEmailAndPassword(
                usuario.getEmail(), usuario.getPassword()
        );

        if (u.isPresent()) {
            return "Login exitoso. ¡Bienvenido, " + u.get().getNombre() + "!";
        } else {
            return "Credenciales incorrectas";
        }
    }

    // NUEVO: Listar todos los usuarios
    @GetMapping
    public List<Usuario> obtenerUsuarios() {
        return usuarioRepository.findAll();
    }
}
