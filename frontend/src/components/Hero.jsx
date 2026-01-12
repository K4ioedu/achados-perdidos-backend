export default function Hero({ aoClicar }) {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-pink-600 py-16 px-4 text-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-extrabold mb-4">Perdeu algo? Encontrou algo?</h2>
        <p className="mb-10 text-blue-100">Plataforma universitária segura e organizada. Sem bagunça de grupos!</p>

        <div className="flex flex-col sm:flex-row justify-center gap-6 mb-12">
          {/* Botão Perdi Algo */}
          <button onClick={() => aoClicar('perdi')} className="bg-white text-gray-800 p-8 rounded-2xl shadow-xl hover:scale-105 transition-transform flex flex-col items-center w-full sm:w-64">
            <div className="bg-red-100 p-4 rounded-full mb-4 text-red-500 text-3xl">⚠️</div>
            <span className="font-bold text-xl">PERDI ALGO</span>
            <span className="text-xs text-gray-400 mt-2">Registre e receba notificações</span>
          </button>

          {/* Botão Achei Algo */}
          <button onClick={() => aoClicar('achei')} className="bg-white text-gray-800 p-8 rounded-2xl shadow-xl hover:scale-105 transition-transform flex flex-col items-center w-full sm:w-64">
            <div className="bg-green-100 p-4 rounded-full mb-4 text-green-500 text-3xl">✅</div>
            <span className="font-bold text-xl">ACHEI ALGO</span>
            <span className="text-xs text-gray-400 mt-2">Ajude alguém a recuperar itens</span>
          </button>
        </div>

        {/* Métricas do Protótipo */}
        <div className="flex justify-center gap-4 sm:gap-8 opacity-90">
          <div className="bg-white/20 backdrop-blur-md p-4 rounded-xl min-w-[100px]">
            <div className="text-2xl font-bold">127</div>
            <div className="text-[10px] uppercase">Itens Encontrados</div>
          </div>
          <div className="bg-white/20 backdrop-blur-md p-4 rounded-xl min-w-[100px]">
            <div className="text-2xl font-bold">89</div>
            <div className="text-[10px] uppercase">Reuniões</div>
          </div>
          <div className="bg-white/20 backdrop-blur-md p-4 rounded-xl min-w-[100px]">
            <div className="text-2xl font-bold">98%</div>
            <div className="text-[10px] uppercase">Satisfação</div>
          </div>
        </div>
      </div>
    </div>
  );
}