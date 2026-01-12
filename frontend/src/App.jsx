import { useState } from 'react';
import ItemCard from './components/ItemCard'; 
import Hero from './components/Hero';
import FilterBar from './components/Filterbar';
import ModalReportar from './components/ModalReportar';
import ModalDetalhes from './components/ModalDetalhes';
import ItemCardDashboard from './components/ItemCardDashBoard'; 
import DashboardStats from './components/DashBoardStats';
import FavoritosHeader from './components/FavoritosHeader';
import LocalCard from './components/LocalCard';

// Simulação de dados
const MOCK_ITENS = [
  { id: 1, usuarioId: 1, titulo: "Mochila Azul", local: "Biblioteca Central", categoria: "Materiais de Estudo", imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500", fotos: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500"], status: "Perdido", devolvido: false, descricao: "Mochila azul com zíper quebrado.", reivindicacoes: 3, dataISO: "2026-01-04" },
  { id: 2, usuarioId: 1, titulo: "iPhone 12", local: "Bloco A - Sala 04", categoria: "Eletrônicos", imageUrl: "https://images.unsplash.com/photo-1611791485932-50e8999a544d?w=500", fotos: ["https://images.unsplash.com/photo-1611791485932-50e8999a544d?w=500"], status: "Achado", devolvido: false, descricao: "iPhone 12 preto com capa.", reivindicacoes: 1, dataISO: "2026-01-05" },
  { id: 3, usuarioId: 2, titulo: "Carteira Marrom", local: "Cantina", categoria: "Documentos", imageUrl: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=500", fotos: ["https://images.unsplash.com/photo-1627123424574-724758594e93?w=500"], status: "Achado", devolvido: false, dataISO: "2026-01-06" }
];

const MOCK_LOCAIS = [
  { id: 1, nome: "Bloco A", descricao: "Salas de aula 101-120", itensRecentes: 5, isFavorito: true, notificacao: true, tipo: 'bloco' },
  { id: 2, nome: "Biblioteca", descricao: "Biblioteca Central - 3 andares", itensRecentes: 8, isFavorito: true, notificacao: true, tipo: 'bloco' },
  { id: 3, nome: "Cantina", descricao: "Praça de Alimentação", itensRecentes: 12, isFavorito: true, notificacao: false, tipo: 'comida' },
  { id: 4, nome: "Bloco B", descricao: "Laboratórios de Informática", itensRecentes: 3, isFavorito: false, tipo: 'bloco' }
];

function App() {
  const [abaAtiva, setAbaAtiva] = useState('home'); 
  const [itens, setItens] = useState(MOCK_ITENS);
  const [locais, setLocais] = useState(MOCK_LOCAIS);
  
  const [tipoFiltro, setTipoFiltro] = useState('todos');
  const [filtroDashboard, setFiltroDashboard] = useState('ativos');
  const [localAtivo, setLocalAtivo] = useState("Todos os Locais");
  const [catAtiva, setCatAtiva] = useState("Todos");
  const [periodoAtivo, setPeriodoAtivo] = useState("Todos");
  const [busca, setBusca] = useState("");

  const [modalAberto, setModalAberto] = useState(false);
  const [tipoModal, setTipoModal] = useState('perdi');
  const [itemSelecionado, setItemSelecionado] = useState(null);

  const USUARIO_ID_TESTE = 1;

  const itensFiltrados = itens.filter(item => {
    const matchLocal = localAtivo === "Todos os Locais" || item.local.includes(localAtivo);
    const matchCat = catAtiva === "Todos" || item.categoria === catAtiva;
    const matchBusca = item.titulo.toLowerCase().includes(busca.toLowerCase());
    const matchTipo = tipoFiltro === 'todos' || 
                      (tipoFiltro === 'perdido' && item.status === 'Perdido') || 
                      (tipoFiltro === 'achado' && (item.status === 'Achado' || item.tipo === 'ENCONTRADO'));

    let matchPeriodo = true;
    if (periodoAtivo !== "Todos") {
      const dataItem = new Date(item.dataISO);
      const agora = new Date();
      const diferencaDias = (agora - dataItem) / (1000 * 60 * 60 * 24);
      if (periodoAtivo === "Últimas 24h") matchPeriodo = diferencaDias <= 1;
      else if (periodoAtivo === "Esta Semana") matchPeriodo = diferencaDias <= 7;
      else if (periodoAtivo === "Este Mês") matchPeriodo = diferencaDias <= 30;
    }

    return matchLocal && matchCat && matchBusca && matchTipo && matchPeriodo && !item.devolvido;
  });

  const handleMarcarDevolvido = (id) => {
    if(window.confirm("Confirmar devolução?")) {
      setItens(prev => prev.map(item => item.id === id ? { ...item, devolvido: true } : item));
    }
  };

  const handleExcluirItem = (id) => {
    if (window.confirm("Remover anúncio?")) {
      setItens(prev => prev.filter(item => item.id !== id));
    }
  };

  const toggleFavorito = (id) => {
    setLocais(prev => prev.map(l => l.id === id ? { ...l, isFavorito: !l.isFavorito } : l));
  };

  const handleNovoItem = (novoItem) => {
  setItens(prev => [novoItem, ...prev]);
  alert(`${novoItem.status === 'Perdido' ? 'Alerta de perda' : 'Item encontrado'} publicado com sucesso!`);
  setAbaAtiva('dashboard'); 
};

  return (
    <div className="min-h-screen bg-gray-50 pb-20 font-sans">
      <header className="bg-white border-b p-4 sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center max-w-7xl">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setAbaAtiva('home')}>
            <div className="bg-purple-600 p-2 rounded-lg text-white font-bold shadow-sm">F</div>
            <span className="font-bold text-gray-800 tracking-tight">FindIt</span>
          </div>
          <div className="flex-1 max-w-md mx-8">
            <input type="text" placeholder="Buscar..." className="w-full bg-gray-100 p-2.5 rounded-xl outline-none text-sm" onChange={(e) => setBusca(e.target.value)} />
          </div>
          <div className="flex gap-6 items-center text-gray-400">
            <span className="cursor-pointer hover:text-orange-500" onClick={() => setAbaAtiva('favoritos')}>⭐</span>
            <span className="relative cursor-pointer">
              🔔 <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[8px] rounded-full px-1 font-bold">2</span>
            </span>
            <span className="text-xl cursor-default opacity-50">👤</span>
          </div>
        </div>
      </header>

      {/* Home */}
      {abaAtiva === 'home' && (
        <div className="animate-in fade-in duration-500">
          <Hero aoClicar={(tipo) => { setTipoModal(tipo); setModalAberto(true); }} />
          
          <main className="container mx-auto p-6 max-w-7xl">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
              <div className="flex bg-white p-1.5 rounded-2xl border border-gray-100 shadow-sm">
                {['todos', 'perdido', 'achado'].map((t) => (
                  <button key={t} onClick={() => setTipoFiltro(t)} className={`px-6 py-2 rounded-xl font-bold text-[11px] uppercase tracking-wider ${tipoFiltro === t ? 'bg-blue-600 text-white' : 'text-gray-400'}`}>
                    {t === 'todos' ? 'Todos' : t}
                  </button>
                ))}
              </div>
              <button 
              onClick={() => setAbaAtiva('dashboard')}
              className="flex items-center gap-2 bg-white border-2 border-blue-600 text-blue-600 px-6 py-2.5 rounded-2xl font-black text-xs uppercase tracking-tighter shadow-[4px_4px_0px_0px_rgba(37,99,235,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
            >
              <span className="text-lg">📋</span>
              Meus anúncios
            </button>
            </div>

            <FilterBar 
              tipoFiltro={tipoFiltro} 
              setTipoFiltro={setTipoFiltro}
              localAtivo={localAtivo} 
              setLocalAtivo={setLocalAtivo} 
              catAtiva={catAtiva} 
              setCatAtiva={setCatAtiva}
              periodoAtivo={periodoAtivo}  
              setPeriodoAtivo={setPeriodoAtivo}
            />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
              {itensFiltrados.map(item => (
                <ItemCard key={item.id} item={item} onVerDetalhes={setItemSelecionado} />
              ))}
            </div>
          </main>
        </div>
      )}

      {/* Tela Dashboard */}
      {abaAtiva === 'dashboard' && (
        <div className="animate-in slide-in-from-bottom-6 fade-in duration-700">
          <div className="bg-gradient-to-r from-blue-600 to-purple-700 p-16 text-white mb-10 shadow-lg">
            <div className="container mx-auto max-w-7xl">
              <button onClick={() => setAbaAtiva('home')} className="text-xs font-bold mb-6 opacity-70 hover:opacity-100 flex items-center gap-2">← VOLTAR</button>
              <h2 className="text-5xl font-black mb-2">Meus Anúncios</h2>
              <p className="text-blue-100 font-medium">Gerencie seus itens cadastrados.</p>
            </div>
          </div>

          <main className="container mx-auto max-w-7xl px-6">
            <DashboardStats 
              ativos={itens.filter(i => i.usuarioId === USUARIO_ID_TESTE && !i.devolvido).length} 
              devolvidos={itens.filter(i => i.usuarioId === USUARIO_ID_TESTE && i.devolvido).length} 
              reivindicacoes={4} 
            />

            <div className="flex gap-4 mb-10">
              <button onClick={() => setFiltroDashboard('ativos')} className={`px-8 py-2.5 rounded-2xl font-bold text-xs ${filtroDashboard === 'ativos' ? 'bg-blue-600 text-white shadow-lg ring-4 ring-blue-100' : 'bg-white text-gray-400 border border-gray-100'}`}>
                Ativos ({itens.filter(i => i.usuarioId === USUARIO_ID_TESTE && !i.devolvido).length})
              </button>
              <button onClick={() => setFiltroDashboard('devolvidos')} className={`px-8 py-2.5 rounded-2xl font-bold text-xs ${filtroDashboard === 'devolvidos' ? 'bg-blue-600 text-white shadow-lg ring-4 ring-blue-100' : 'bg-white text-gray-400 border border-gray-100'}`}>
                Devolvidos ({itens.filter(i => i.usuarioId === USUARIO_ID_TESTE && i.devolvido).length})
              </button>
            </div>

            <div className="space-y-6">
              {itens
                .filter(i => i.usuarioId === USUARIO_ID_TESTE)
                .filter(i => filtroDashboard === 'ativos' ? !i.devolvido : i.devolvido)
                .map(item => (
                  <ItemCardDashboard 
                    key={item.id} 
                    item={item} 
                    onMarcarDevolvido={handleMarcarDevolvido} 
                    onExcluir={handleExcluirItem} 
                    onVerDetalhes={setItemSelecionado}
                    onEditar={() => {}}
                  />
                ))}
            </div>
          </main>
        </div>
      )}

      {/* Tela favoritos */}
      {abaAtiva === 'favoritos' && (
        <div className="animate-in fade-in duration-500">
          <FavoritosHeader aoVoltar={() => setAbaAtiva('home')} stats={{ favoritos: locais.filter(l => l.isFavorito).length, notificacoes: 2, itens: 25 }} />
          <main className="container mx-auto max-w-7xl px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {locais.map(local => <LocalCard key={local.id} local={local} onToggleFavorito={toggleFavorito} />)}
            </div>
          </main>
        </div>
      )}

      {/* Modais */}
      <ModalReportar isOpen={modalAberto} onClose={() => setModalAberto(false)} tipo={tipoModal} onSalvar={handleNovoItem} />
      <ModalDetalhes item={itemSelecionado} isOpen={!!itemSelecionado} onClose={() => setItemSelecionado(null)} />
    </div>
  );
}

export default App;