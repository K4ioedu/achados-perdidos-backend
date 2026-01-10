package trabalho_web.demo.controller;

import trabalho_web.demo.model.Usuario;
import trabalho_web.demo.service.UsuarioService; // Importante: certifique-se de que o Service está neste pacote
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "*") // Libera acesso para qualquer front-end (RNF de acessibilidade web)
public class UsuarioController {

    @Autowired
    private UsuarioService service;

    @PostMapping("/cadastro")
    public ResponseEntity<?> cadastrar(@RequestBody Usuario usuario) {
        try {

            Usuario novoUsuario = service.cadastrar(usuario);
            return ResponseEntity.ok(novoUsuario);
        } catch (IllegalArgumentException e) {

            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Erro ao cadastrar: " + e.getMessage());
        }
    }


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Usuario loginData) {
        try {
            Usuario usuarioLogado = service.login(loginData.getEmail(), loginData.getSenha());
            return ResponseEntity.ok(usuarioLogado);
        } catch (RuntimeException e) {

            return ResponseEntity.status(401).body(e.getMessage());
        }
    }
}