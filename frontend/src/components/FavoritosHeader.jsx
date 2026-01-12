export default function FavoritosHeader({ aoVoltar, stats }) {
  return (
    <div className="animate-in fade-in duration-500">
      {/* Cabeçalho Laranja */}
      <div className="bg-gradient-to-r from-orange-400 to-red-600 -mx-6 -mt-6 p-12 text-white mb-8 shadow-inner">
        <div className="container mx-auto max-w-7xl">
          <button onClick={aoVoltar} className="text-sm font-bold opacity-80 hover:opacity-100 flex items-center gap-2 mb-4">
            ← Voltar
          </button>
          <h2 className="text-4xl font-black mb-2 flex items-center gap-3">
            ⭐ Locais Favoritos
          </h2>
          <p className="opacity-80">Receba notificações prioritárias de itens encontrados nos seus locais favoritos.</p>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-6">
        {/* Box Informativo */}
        <div className="bg-blue-50 border border-blue-100 p-6 rounded-2xl mb-8 flex items-start gap-4">
          <span className="text-blue-500 text-2xl">🔔</span>
          <div>
            <h4 className="font-bold text-blue-900 text-sm mb-1">Como funciona?</h4>
            <p className="text-blue-700 text-xs leading-relaxed">
              Marque como favorito os locais que você mais frequenta no campus. Quando um item for encontrado nesses locais, você receberá uma notificação imediata.
            </p>
          </div>
        </div>

        {/* Estatísticas de Favoritos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <StatCard title="Locais Favoritos" value={stats.favoritos} icon="⭐" color="orange" />
          <StatCard title="Notificações Ativas" value={stats.notificacoes} icon="🔔" color="blue" />
          <StatCard title="Itens Recentes" value={stats.itens} icon="📍" color="green" />
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, color }) {
  const colors = {
    orange: "border-orange-500 bg-orange-50 text-orange-400",
    blue: "border-blue-500 bg-blue-50 text-blue-400",
    green: "border-green-500 bg-green-50 text-green-400"
  };
  return (
    <div className={`bg-white p-6 rounded-3xl shadow-sm border-l-4 flex justify-between items-center ${colors[color].split(' ')[0]}`}>
      <div>
        <p className="text-[10px] font-bold text-gray-400 uppercase">{title}</p>
        <p className="text-3xl font-black text-gray-800">{value}</p>
      </div>
      <div className={`p-3 rounded-full text-xl ${colors[color].split(' ').slice(1).join(' ')}`}>{icon}</div>
    </div>
  );
}