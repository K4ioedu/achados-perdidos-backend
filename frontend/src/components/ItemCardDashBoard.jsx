// Adicionamos 'onVerDetalhes' na lista de propriedades recebidas
export default function ItemCardDashboard({ item, onMarcarDevolvido, onExcluir, onEditar, onVerDetalhes }) {
  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-4 hover:shadow-md transition-shadow animate-in fade-in duration-300">
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-2">
          <h3 className="text-xl font-bold text-gray-800">{item.titulo}</h3>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
            item.status === 'Achado' || item.tipo === 'ENCONTRADO' ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'
          }`}>
            {item.status || (item.tipo === 'ENCONTRADO' ? 'Achado' : 'Perdido')}
          </span>
        </div>
        <p className="text-gray-500 text-sm mb-4 line-clamp-1">
          {item.descricao || "Nenhuma descrição adicional fornecida."}
        </p>
        
        <div className="flex flex-wrap gap-4 text-[11px] text-gray-400 font-medium">
          <span>📍 {item.local}</span>
          <span>🗓️ {item.data || '04 de jan. de 2026'}</span>
          <span className="text-orange-500">💬 {item.reivindicacoes || 0} reivindicações</span>
        </div>
      </div>

      <div className="flex gap-2">
        <button 
          onClick={() => onEditar(item)} 
          className="p-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-colors"
          title="Editar Anúncio"
        >
          ✏️
        </button>

        <button 
          onClick={() => onMarcarDevolvido(item.id)} 
          className="p-3 bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-100 transition-colors"
          title="Concluir Devolução"
        >
          ✅
        </button>

        <button 
          onClick={() => onVerDetalhes(item)} 
          className="p-3 bg-gray-50 text-gray-600 rounded-xl hover:bg-gray-100 transition-colors"
          title="Visualizar Detalhes"
        >
          👁️
        </button>

        <button 
          onClick={() => onExcluir(item.id)} 
          className="p-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors"
          title="Excluir Anúncio"
        >
          🗑️
        </button>
      </div>
    </div>
  );
}