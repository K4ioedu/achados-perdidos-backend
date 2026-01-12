export default function FilterBar({ 
  tipoFiltro, setTipoFiltro, 
  localAtivo, setLocalAtivo, 
  catAtiva, setCatAtiva,
  periodoAtivo, setPeriodoAtivo 
}) {
  return (
    <div className="flex flex-col gap-8 w-full">
      
      {/* 1. Abas Superiores (Tipo de Item) */}
      <div className="flex justify-center gap-3">
        <button 
          onClick={() => setTipoFiltro('todos')}
          className={`px-6 py-2 rounded-xl font-bold text-sm transition-all ${tipoFiltro === 'todos' ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-gray-500 border border-gray-100 hover:bg-gray-50'}`}
        >
          Todos os Itens
        </button>
        <button 
          onClick={() => setTipoFiltro('perdido')}
          className={`px-6 py-2 rounded-xl font-bold text-sm transition-all ${tipoFiltro === 'perdido' ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-gray-500 border border-gray-100 hover:bg-gray-50'}`}
        >
          Itens Perdidos
        </button>
        <button 
          onClick={() => setTipoFiltro('achado')}
          className={`px-6 py-2 rounded-xl font-bold text-sm transition-all ${tipoFiltro === 'achado' ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-gray-500 border border-gray-100 hover:bg-gray-50'}`}
        >
          Itens Encontrados
        </button>
      </div>

      {/* 2. Filtrar por Local */}
      <section>
        <h4 className="text-gray-700 font-bold text-sm mb-4 flex items-center gap-2 uppercase tracking-wide">
          <span className="text-lg">📍</span> Filtrar por Local
        </h4>
        <div className="flex flex-wrap gap-2">
          {["Todos os Locais", "Bloco A", "Bloco B", "Bloco C", "Bloco D", "Bloco E", "Cantina", "Biblioteca", "Estacionamento", "Quadra", "Auditório"].map(local => (
            <button 
              key={local}
              onClick={() => setLocalAtivo(local)}
              className={`px-4 py-2 rounded-full text-[11px] font-bold border transition-all flex items-center gap-2 ${
                localAtivo === local ? 'bg-purple-600 text-white border-purple-600 shadow-sm' : 'bg-white text-gray-500 border-gray-200 hover:border-purple-300'
              }`}
            >
              <span className="opacity-70">{local === "Todos os Locais" ? "🏢" : "🏛️"}</span> {local}
            </button>
          ))}
        </div>
      </section>

      {/* 3. Filtrar por Categoria */}
      <section>
        <h4 className="text-gray-700 font-bold text-sm mb-4 flex items-center gap-2 uppercase tracking-wide">
          <span className="text-lg">📦</span> Filtrar por Categoria
        </h4>
        <div className="flex flex-wrap gap-2">
          {["Todos", "Eletrônicos", "Vestuário", "Documentos", "Materiais de Estudo", "Acessórios", "Carteiras"].map(cat => (
            <button 
              key={cat}
              onClick={() => setCatAtiva(cat)}
              className={`px-4 py-2 rounded-full text-[11px] font-bold border transition-all flex items-center gap-2 ${
                catAtiva === cat ? 'bg-blue-600 text-white border-blue-600 shadow-sm' : 'bg-white text-gray-500 border-gray-200 hover:border-blue-300'
              }`}
            >
              <span className="opacity-70">{cat === "Todos" ? "📁" : "🏷️"}</span> {cat}
            </button>
          ))}
        </div>
      </section>

      {/* 4. Filtrar por Período */}
      <section>
        <h4 className="text-gray-700 font-bold text-sm mb-4 flex items-center gap-2">
          <span>🕒</span> Filtrar por Período
        </h4>
        <div className="flex flex-wrap gap-2">
          {["Todos", "Últimas 24h", "Esta Semana", "Este Mês"].map(periodo => (
            <button 
              key={periodo}
              onClick={() => setPeriodoAtivo(periodo)} // Ação de clique!
              className={`px-4 py-2 rounded-full text-[11px] font-bold border transition-all ${
                periodoAtivo === periodo 
                ? 'bg-orange-600 text-white border-orange-600' 
                : 'bg-white text-gray-500 border-gray-200'
              }`}
            >
              {periodo}
            </button>
          ))}
        </div>
        
      </section>
    </div>
  );
}