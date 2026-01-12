import { useEffect, useState } from 'react';
import api from '../services/api';
import ItemCard from './ItemCard';

export default function Dashboard({ usuarioId }) {
  const [meusItens, setMeusItens] = useState([]);

  useEffect(() => {
    api.get(`/api/itens/meus-itens/${usuarioId}`)
      .then(response => setMeusItens(response.data))
      .catch(err => console.error("Erro ao carregar teus itens:", err));
  }, [usuarioId]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Meus Anúncios</h2>
      
      {meusItens.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {meusItens.map(item => (
            <ItemCard key={item.id} item={item} isOwner={true} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">Ainda não publicaste nenhum item.</p>
      )}
    </div>
  );
}