package trabalho_web.demo.controller;

import trabalho_web.demo.model.Item;
import trabalho_web.demo.model.Usuario;
import trabalho_web.demo.repository.ItemRepository;
import trabalho_web.demo.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/itens")
@CrossOrigin(origins = "*") // Permite que o Front-end acesse sem bloqueios
public class ItemController {

    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;


    @GetMapping
    public List<Item> listarTodos() {
        return itemRepository.findAllByOrderByDataPostagemDesc();
    }


    @PostMapping(consumes = {"multipart/form-data"})
    public ResponseEntity<?> criarItem(
            @RequestParam("titulo") String titulo,
            @RequestParam("tipo") Item.TipoItem tipo,
            @RequestParam("categoria") String categoria,
            @RequestParam("local") String local,
            @RequestParam("descricao") String descricao,
            @RequestParam("usuarioId") Long usuarioId,
            @RequestParam(value = "imagem", required = false) MultipartFile imagem
    ) {
        try {
            Usuario usuario = usuarioRepository.findById(usuarioId)
                    .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

            Item item = new Item();
            item.setTitulo(titulo);
            item.setTipo(tipo);
            item.setCategoria(categoria);
            item.setLocal(local);
            item.setDescricao(descricao);
            item.setUsuario(usuario);


            if (imagem != null && !imagem.isEmpty()) {
                item.setImagem(imagem.getBytes());
            }

            return ResponseEntity.ok(itemRepository.save(item));
        } catch (IOException e) {
            return ResponseEntity.internalServerError().body("Erro ao processar imagem");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Erro ao criar item: " + e.getMessage());
        }
    }

    @PutMapping("/{id}/devolver")
    public ResponseEntity<Void> marcarComoDevolvido(@PathVariable Long id) {
        Item item = itemRepository.findById(id).orElseThrow();
        item.setDevolvido(true);
        itemRepository.save(item);
        return ResponseEntity.noContent().build();
    }


    @GetMapping("/busca")
    public List<Item> buscar(@RequestParam(required = false) String termo) {
        if (termo == null || termo.isEmpty()) {
            return itemRepository.findAllByOrderByDataPostagemDesc();
        }
        return itemRepository.findByTituloContainingIgnoreCase(termo);
    }


    @GetMapping("/tipo/{tipo}")
    public List<Item> filtrarPorTipo(@PathVariable Item.TipoItem tipo) {
        return itemRepository.findByTipo(tipo);
    }

    @GetMapping("/meus-itens/{usuarioId}")
    public List<Item> listarMeusItens(@PathVariable Long usuarioId) {
        return itemRepository.findByUsuarioId(usuarioId);
    }

    @GetMapping("/filtro-categoria")
    public List<Item> filtrarPorCategoria(@RequestParam String categoria) {
        return itemRepository.findByCategoria(categoria);
    }

    @GetMapping("/filtro-local")
    public List<Item> filtrarPorLocal(@RequestParam String local) {
        return itemRepository.findByLocal(local);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarItem(@PathVariable Long id) {
        if (!itemRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        itemRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}