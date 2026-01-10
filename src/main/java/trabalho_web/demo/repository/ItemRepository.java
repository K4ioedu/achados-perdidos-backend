package trabalho_web.demo.repository;

import trabalho_web.demo.model.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ItemRepository extends JpaRepository<Item, Long> {

    List<Item> findByTipo(Item.TipoItem tipo);
    List<Item> findByCategoria(String categoria);
    List<Item> findByLocal(String local);
    List<Item> findByTituloContainingIgnoreCase(String termo);
    List<Item> findAllByOrderByDataPostagemDesc();
    List<Item> findByUsuarioId(Long usuarioId);
}