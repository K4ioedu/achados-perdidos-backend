export default function ModalDetalhes({ item, isOpen, onClose }) {
  if (!isOpen || !item) return null;

  const imagemSrc = item.imageUrl || 'https://via.placeholder.com/300';

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-[60] p-4" onClick={onClose}>
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in duration-200" onClick={(e) => e.stopPropagation()}>
        <div className="relative h-64 sm:h-80 bg-gray-200">
          <img src={imagemSrc} alt={item.titulo} className="w-full h-full object-cover" />
          
          {item.fotos && item.fotos.length > 1 && (
             <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-xs font-bold">
               +{item.fotos.length - 1} fotos
             </div>
          )}

          <button onClick={onClose} className="absolute top-4 right-4 bg-black/50 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-black/70 transition-colors">
            &times;
          </button>
        </div>

        <div className="p-8">
          <div className="flex justify-between items-start mb-4">
            <div>
              <span className="text-purple-600 font-bold text-xs uppercase tracking-widest">{item.categoria}</span>
              <h2 className="text-3xl font-extrabold text-gray-900 mt-1">{item.titulo}</h2>
            </div>
            <span className={`px-4 py-1 rounded-full text-sm font-bold ${item.devolvido ? 'bg-gray-100 text-gray-500' : 'bg-green-100 text-green-700'}`}>
              {item.devolvido ? 'CONCLUÍDO' : (item.status === 'Achado' ? 'ENCONTRADO' : 'PROCURANDO')}
            </span>
          </div>

          <p className="text-gray-500 mb-6 flex items-center gap-2">
            <span className="text-xl">📍</span> {item.local}
            <span className="ml-4 text-xl">📅</span> {item.data || "Data não informada"}
          </p>

          <div className="bg-gray-50 p-6 rounded-2xl mb-8">
            <h4 className="font-bold text-gray-700 mb-2">Descrição Detalhada</h4>
            <p className="text-gray-600 leading-relaxed">
              {item.descricao || "Nenhuma descrição adicional fornecida."}
            </p>
          </div>

          {!item.devolvido && (
            <div className="flex gap-4">
              {item.status === 'Achado' ? (
                <button 
                  onClick={() => alert("Solicitação de reivindicação enviada ao dono!")}
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 rounded-xl shadow-lg transition-all transform hover:-translate-y-1"
                >
                  🙋 EU PERDI ISSO! (Reivindicar)
                </button>
              ) : (
                <button 
                  onClick={() => alert("Mensagem enviada!")}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl shadow-lg transition-all"
                >
                  💬 EU ACHEI (Entrar em contato)
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}