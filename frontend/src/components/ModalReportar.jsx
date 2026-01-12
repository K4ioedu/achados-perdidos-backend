import { useState } from 'react';

export default function ModalReportar({ isOpen, onClose, tipo, onSalvar }) {
  if (!isOpen) return null;

  const isPerdi = tipo === 'perdi';
  
  // Estados para o formulário
  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
    categoria: "",
    local: "Bloco A",
    detalhesLocal: "",
    data: "",
    email: ""
  });
  const [fotos, setFotos] = useState([]);

  const handleFileChange = (e) => {
    if (e.target.files && fotos.length < 5) {
      const newFiles = Array.from(e.target.files).map(file => URL.createObjectURL(file));
      setFotos(prev => [...prev, ...newFiles].slice(0, 5)); // Limite de 5 fotos 
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validação de E-mail Institucional (RN01) 
    if (!formData.email.endsWith("@universidade.edu.br")) {
      alert("Apenas e-mails institucionais são aceitos para garantir segurança.");
      return;
    }

    const novoItem = {
      id: Date.now(),
      usuarioId: 1, 
      titulo: formData.nome,
      local: formData.local,
      categoria: formData.categoria,
      imageUrl: fotos[0] || "https://via.placeholder.com/150",
      fotos: fotos,
      status: isPerdi ? 'Perdido' : 'Achado',
      devolvido: false,
      descricao: formData.descricao,
      detalhesLocal: formData.detalhesLocal,
      dataISO: formData.data,
      email: formData.email,
      reivindicacoes: 0
    };

    onSalvar(novoItem); // Envia para o App.jsx
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-[60] p-4 animate-in fade-in">
      <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[95vh]">
        
        {/* Header Dinâmico */}
        <div className={`p-6 flex justify-between items-start ${isPerdi ? 'bg-red-50' : 'bg-green-50'}`}>
          <div>
            <h2 className={`text-xl font-bold ${isPerdi ? 'text-red-900' : 'text-green-900'}`}>
              {isPerdi ? 'Reportar Item Perdido' : 'Reportar Item Encontrado'}
            </h2>
            <p className="text-gray-500 text-xs mt-1">
              {isPerdi ? 'Preencha os detalhes do item que você perdeu' : 'Ajude alguém a recuperar seus pertences'}
            </p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 overflow-y-auto space-y-5">
          
          {/* RF06: Galeria de Fotos */}
          <div>
            <label className="text-xs font-bold text-gray-500 mb-2 block uppercase tracking-wider">
              Fotos do Item * <span className="font-normal">(até 5 fotos: frente, verso, detalhes)</span>
            </label>
            <label className="cursor-pointer border-2 border-dashed border-blue-100 rounded-2xl p-8 flex flex-col items-center justify-center bg-blue-50/30 hover:bg-blue-50 transition-colors group">
              <span className="text-3xl mb-2 group-hover:scale-110 transition-transform">🖼️</span>
              <p className="text-sm font-bold text-blue-600">Adicionar fotos ({fotos.length}/5)</p>
              <p className="text-[10px] text-gray-400 mt-1">PNG, JPG até 10MB cada</p>
              <input type="file" multiple accept="image/*" className="hidden" onChange={handleFileChange} />
            </label>
            <div className="flex gap-2 mt-3 overflow-x-auto pb-2">
              {fotos.map((f, i) => <img key={i} src={f} className="w-16 h-16 rounded-lg object-cover border border-blue-100" alt="Preview" />)}
            </div>
          </div>

          {/* Nome e Descrição */}
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-gray-600 mb-1 block">Nome do Item *</label>
              <input required type="text" className="w-full border border-gray-200 rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-blue-100" placeholder="Ex: Mochila Azul, iPhone 12, Carteira..." onChange={e => setFormData({...formData, nome: e.target.value})} />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-600 mb-1 block">Descrição *</label>
              <textarea required className="w-full border border-gray-200 rounded-xl p-3 text-sm h-24 outline-none focus:ring-2 focus:ring-blue-100" placeholder="Descreva características marcantes: cor, marca, conteúdo..." onChange={e => setFormData({...formData, descricao: e.target.value})} />
            </div>
          </div>

          {/* Categoria e Local (RF02, RF03) */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-gray-600 mb-1 block">Categoria *</label>
              <select className="w-full border border-gray-200 rounded-xl p-3 text-sm bg-white" onChange={e => setFormData({...formData, categoria: e.target.value})}>
                <option value="">Selecione...</option>
                <option value="Eletrônicos">Eletrônicos</option>
                <option value="Documentos">Documentos</option>
                <option value="Materiais de Estudo">Materiais de Estudo</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-gray-600 mb-1 block">Bloco/Local *</label>
              <select className="w-full border border-gray-200 rounded-xl p-3 text-sm bg-white" onChange={e => setFormData({...formData, local: e.target.value})}>
                {["Bloco A", "Bloco B", "Bloco C", "Cantina", "Biblioteca"].map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
          </div>

          {/* Detalhes e Data */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-gray-600 mb-1 block">Detalhes do Local</label>
              <input type="text" className="w-full border border-gray-200 rounded-xl p-3 text-sm" placeholder="Ex: Sala 204, perto da escada..." onChange={e => setFormData({...formData, detalhesLocal: e.target.value})} />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-600 mb-1 block">Data *</label>
              <input required type="date" className="w-full border border-gray-200 rounded-xl p-3 text-sm" onChange={e => setFormData({...formData, data: e.target.value})} />
            </div>
          </div>

          {/* Email Institucional (RN01) */}
          <div>
            <label className="text-xs font-bold text-gray-600 mb-1 block">Email Institucional * <span className="font-normal text-gray-400 text-[10px]">(segurança validada)</span></label>
            <input required type="email" className="w-full border border-gray-200 rounded-xl p-3 text-sm" placeholder="seu.nome@alu.ufc.br" onChange={e => setFormData({...formData, email: e.target.value})} />
            <p className="text-[10px] text-gray-400 mt-2">Apenas emails institucionais são aceitos para garantir segurança.</p>
          </div>

          {/* Ações Finais */}
          <div className="flex gap-4 pt-4">
            <button type="button" onClick={onClose} className="flex-1 py-3 border border-gray-200 rounded-xl font-bold text-gray-500 hover:bg-gray-50">Cancelar</button>
            <button type="submit" className={`flex-1 py-3 rounded-xl font-bold text-white shadow-lg transition-transform active:scale-95 ${isPerdi ? 'bg-red-600' : 'bg-green-600'}`}>
              Registrar Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}