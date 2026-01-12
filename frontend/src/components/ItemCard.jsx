export default function ItemCard({ item, onVerDetalhes }) {
  const isEncontrado = item.status === 'Achado' || item.tipo === 'ENCONTRADO';

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all flex flex-col h-full group">
      {/* Imagem com Badge */}
      <div className="relative h-48 bg-gray-200 overflow-hidden">
        <img src={item.imageUrl} alt={item.titulo} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        <span className={`absolute top-3 right-3 px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 shadow-md ${
          isEncontrado ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
        }`}>
          {isEncontrado ? '✅ Encontrado' : '🛑 Perdido'}
        </span>
      </div>

      {/* Conteúdo do Card */}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="font-bold text-gray-800 text-lg mb-1">{item.titulo}</h3>
        <p className="text-gray-500 text-[12px] mb-4 line-clamp-2">
          {item.descricao || "Mochila azul com zíper quebrado, contém cadernos universitários."}
        </p>
        
        <div className="mt-auto space-y-2">
          <div className="text-gray-400 text-[11px] flex items-center gap-2">
            <span className="text-sm">📍</span> {item.local || "Biblioteca Central"}
          </div>
          <div className="text-gray-400 text-[11px] flex items-center gap-2">
            <span className="text-sm">🗓️</span> {item.data || "04 de janeiro de 2026"}
          </div>
          
          <button 
            onClick={() => onVerDetalhes(item)}
            className="w-full mt-4 py-2 bg-blue-50 text-blue-600 font-bold rounded-xl text-xs hover:bg-blue-100 transition-colors"
          >
            Clique para ver detalhes
          </button>
        </div>
      </div>
    </div>
  );
}