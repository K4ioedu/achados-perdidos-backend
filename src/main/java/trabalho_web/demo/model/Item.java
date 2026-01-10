package trabalho_web.demo.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.Base64;

@Entity
@Data
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titulo; // Ex: "Calculadora HP" (RF05)

    @Column(columnDefinition = "TEXT") // Permite textos longos
    private String descricao;

    // RF01: Distinção entre PERDIDO e ACHADO
    @Enumerated(EnumType.STRING)
    private TipoItem tipo;

    // RF03: Categoria (Eletrônicos, Documentos, etc)
    private String categoria;

    // RF02: Localização (Bloco A, Cantina...)
    private String local;

    private LocalDateTime dataPostagem = LocalDateTime.now();

    // RF07: Status de devolução
    private boolean devolvido = false;

    // RF06: Armazenando imagem como array de bytes (BLOB)
    @Lob
    @JsonIgnore
    private byte[] imagem;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

    // Enum para definir se o item foi perdido ou achado
    public enum TipoItem {
        PERDI_ALGO, ACHEI_ALGO
    }

    // Método utilitário para o Front-end conseguir exibir a imagem facilmente
    public String getImagemBase64() {
        if (imagem != null && imagem.length > 0) {
            return Base64.getEncoder().encodeToString(imagem);
        }
        return null;
    }
}