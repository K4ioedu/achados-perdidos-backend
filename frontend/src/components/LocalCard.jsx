export default function LocalCard({ local, onToggleFavorito }) {
  return (
    <div className={`bg-white p-5 rounded-2xl border transition-all flex justify-between items-center ${local.isFavorito ? 'border-orange-200 shadow-sm' : 'border-gray-100'}`}>
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-xl text-xl ${local.isFavorito ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-400'}`}>
          {local.tipo === 'bloco' ? '🏢' : '🍴'}
        </div>
        <div>
          <h4 className="font-bold text-gray-800 text-sm">{local.nome}</h4>
          <p className="text-[10px] text-gray-400 mb-2">{local.descricao}</p>
          <div className="text-[10px] text-gray-400 flex items-center gap-1 font-medium">
            📍 {local.itensRecentes} itens recentes
          </div>
        </div>
      </div>

      <div className="flex flex-col items-end gap-3">
        <button onClick={() => onToggleFavorito(local.id)} className="text-xl">
          {local.isFavorito ? '⭐' : '☆'}
        </button>
        {local.isFavorito && (
          <span className={`px-3 py-1 rounded-lg text-[9px] font-bold flex items-center gap-1 ${local.notificacao ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'}`}>
             {local.notificacao ? '🔔 Ativo' : '🔕 Inativo'}
          </span>
        )}
      </div>
    </div>
  );
}