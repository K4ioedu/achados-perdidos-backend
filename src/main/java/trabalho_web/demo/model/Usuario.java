package trabalho_web.demo.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import lombok.Data;

@Entity
@Data
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

    @Column(unique = true)
    @Email
    // A validação se é @alu.ufc.br ou @ufc.br é feita no UsuarioService (RN01)
    private String email;

    @JsonIgnore
    private String senha;

    private String telefone;
}