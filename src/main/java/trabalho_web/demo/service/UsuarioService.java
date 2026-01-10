package trabalho_web.demo.service;

import trabalho_web.demo.model.Usuario;
import trabalho_web.demo.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository repository;

    public Usuario cadastrar(Usuario usuario) {

        if (!usuario.getEmail().endsWith("@alu.ufc.br") && !usuario.getEmail().endsWith("@ufc.br")) {
            throw new IllegalArgumentException("Apenas e-mails institucionais (@alu.ufc.br ou @ufc.br) são permitidos.");
        }


        if (repository.findByEmail(usuario.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Este e-mail já está cadastrado.");
        }

        return repository.save(usuario);
    }

    public Usuario login(String email, String senha) {
        Usuario usuario = repository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado."));


        if (!usuario.getSenha().equals(senha)) {
            throw new RuntimeException("Senha incorreta.");
        }
        return usuario;
    }
}