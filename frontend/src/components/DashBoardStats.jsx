export default function DashboardStats({ ativos, devolvidos, reivindicacoes }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* Card Anúncios Ativos */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-blue-500 flex justify-between items-center">
        <div>
          <p className="text-[10px] font-bold text-gray-400 uppercase">Anúncios Ativos</p>
          <p className="text-3xl font-black text-gray-800">{ativos}</p>
        </div>
        <div className="bg-blue-50 p-3 rounded-full text-blue-400 text-xl">🕒</div>
      </div>

      {/* Card Devolvidos */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-emerald-500 flex justify-between items-center">
        <div>
          <p className="text-[10px] font-bold text-gray-400 uppercase">Devolvidos</p>
          <p className="text-3xl font-black text-gray-800">{devolvidos}</p>
        </div>
        <div className="bg-emerald-50 p-3 rounded-full text-emerald-400 text-xl">✅</div>
      </div>

      {/* Card Reivindicações */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-orange-500 flex justify-between items-center">
        <div>
          <p className="text-[10px] font-bold text-gray-400 uppercase">Reivindicações</p>
          <p className="text-3xl font-black text-gray-800">{reivindicacoes}</p>
        </div>
        <div className="bg-orange-50 p-3 rounded-full text-orange-400 text-xl">💬</div>
      </div>
    </div>
  );
}