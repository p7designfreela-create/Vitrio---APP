
import React, { useState } from 'react';
import { Product, UserProfile } from '../types';
import { CATEGORIES, MOCK_PRODUCTS } from '../constants';
import { Plus, Tag, Search, Filter, Trash2, Wand2, Loader2, Save, X, CheckCircle, Image as ImageIcon, LayoutGrid } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { geminiService } from '../services/geminiService';

interface SupermarketDashboardProps {
  user: UserProfile;
}

const SupermarketDashboard: React.FC<SupermarketDashboardProps> = ({ user }) => {
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS.filter(p => p.storeId === user.storeId));
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [currentProduct, setCurrentProduct] = useState<Partial<Product>>({
    name: '',
    description: '',
    price: 0,
    originalPrice: 0,
    category: CATEGORIES[0],
    isPromotion: false,
    imageUrl: `https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=400`,
    storeId: user.storeId
  });
  const [isGenerating, setIsGenerating] = useState(false);

  const filteredProducts = activeCategory === 'Todos' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentProduct.id) {
      setProducts(prev => prev.map(p => p.id === currentProduct.id ? (currentProduct as Product) : p));
    } else {
      const newProduct = { ...currentProduct, id: Math.random().toString(36).substr(2, 9) } as Product;
      setProducts(prev => [newProduct, ...prev]);
    }
    setIsEditing(false);
    resetForm();
  };

  const resetForm = () => {
    setCurrentProduct({
      name: '',
      description: '',
      price: 0,
      originalPrice: 0,
      category: CATEGORIES[0],
      isPromotion: false,
      imageUrl: `https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=400`,
      storeId: user.storeId
    });
  };

  const togglePromo = (id: string) => {
    setProducts(prev => prev.map(p => {
      if (p.id === id) {
        return { ...p, isPromotion: !p.isPromotion };
      }
      return p;
    }));
  };

  const deleteProduct = (id: string) => {
    if (window.confirm("Deseja realmente excluir este produto?")) {
      setProducts(prev => prev.filter(p => p.id !== id));
    }
  };

  const generateAIdesc = async () => {
    if (!currentProduct.name) return;
    setIsGenerating(true);
    const desc = await geminiService.generateProductDescription(currentProduct.name, currentProduct.category || 'Geral');
    setCurrentProduct(prev => ({ ...prev, description: desc }));
    setIsGenerating(false);
  };

  return (
    <div className="space-y-0 -mt-4">
      {/* Brand Header Section */}
      <div className="relative mb-24">
        <div className="h-48 md:h-72 w-full overflow-hidden rounded-b-3xl shadow-lg border-b bg-gray-200">
          <img 
            src={user.bannerUrl || 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&q=80&w=1200'} 
            alt="Capa do Mercado" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute -bottom-16 left-8 flex items-end gap-6">
          <div className="relative group">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-3xl border-4 border-white shadow-xl overflow-hidden bg-white">
              <img 
                src={user.avatarUrl || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=200'} 
                className="w-full h-full object-cover" 
                alt="Logo" 
              />
            </div>
          </div>
          <div className="pb-4">
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-black text-gray-900 drop-shadow-sm">{user.name}</h1>
              <CheckCircle className="w-6 h-6 text-blue-500 fill-current bg-white rounded-full" />
            </div>
            <p className="text-gray-600 font-medium flex items-center gap-2">
              Painel do Lojista • Parceiro Verificado
            </p>
          </div>
        </div>
        <div className="absolute -bottom-8 right-8">
           <button 
            onClick={() => { resetForm(); setIsEditing(true); }}
            className="flex items-center gap-2 bg-emerald-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-xl hover:scale-105 active:scale-95"
          >
            <Plus className="w-5 h-5" />
            Adicionar Produto
          </button>
        </div>
      </div>

      {/* Categories Horizontal Filter */}
      <div className="sticky top-16 z-20 bg-gray-50/80 backdrop-blur-md py-6 border-b mb-8 overflow-hidden">
        <div className="flex items-center gap-3 overflow-x-auto pb-2 no-scrollbar px-1">
          <button
            onClick={() => setActiveCategory('Todos')}
            className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-bold transition-all ${activeCategory === 'Todos' ? 'bg-emerald-600 text-white shadow-md' : 'bg-white text-gray-600 border hover:bg-gray-100'}`}
          >
            Todos os Produtos
          </button>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-bold transition-all ${activeCategory === cat ? 'bg-emerald-600 text-white shadow-md' : 'bg-white text-gray-600 border hover:bg-gray-100'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Professional Grid: 4 per row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredProducts.map(p => (
          <div key={p.id} className="relative group animate-in zoom-in-95 duration-300">
            <ProductCard 
              product={p} 
              isOwner={true} 
              onEdit={(prod) => { setCurrentProduct(prod); setIsEditing(true); }} 
            />
            <div className="mt-4 flex gap-2">
              <button 
                onClick={() => togglePromo(p.id)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-black uppercase tracking-tight transition-all ${p.isPromotion ? 'bg-red-50 text-red-600 border border-red-200 shadow-inner' : 'bg-white text-gray-500 border hover:bg-gray-50 shadow-sm'}`}
              >
                <Tag className="w-4 h-4" />
                {p.isPromotion ? 'Em Oferta' : 'Promover'}
              </button>
              <button 
                onClick={() => deleteProduct(p.id)}
                className="p-3 bg-white border border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-200 rounded-xl transition-all shadow-sm"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
        {filteredProducts.length === 0 && (
          <div className="col-span-full py-20 text-center bg-white rounded-3xl border-2 border-dashed">
            <LayoutGrid className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-gray-400">Nenhum produto encontrado nesta categoria.</h3>
          </div>
        )}
      </div>

      {/* Modal / Editor */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-3xl rounded-[2.5rem] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col scale-100 transition-transform">
            <div className="px-10 py-8 border-b flex items-center justify-between bg-emerald-50/50">
              <div>
                <h3 className="text-2xl font-black text-emerald-950">
                  {currentProduct.id ? 'Editar Produto' : 'Novo Produto no Catálogo'}
                </h3>
                <p className="text-emerald-700 font-medium">Preencha os detalhes para destacar seu item.</p>
              </div>
              <button onClick={() => setIsEditing(false)} className="p-3 hover:bg-white rounded-2xl transition-all shadow-sm">
                <X className="w-6 h-6 text-emerald-900" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="p-10 space-y-8 overflow-y-auto no-scrollbar">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Nome Comercial</label>
                    <input 
                      type="text" 
                      required 
                      value={currentProduct.name}
                      onChange={e => setCurrentProduct({ ...currentProduct, name: e.target.value })}
                      className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl outline-none focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all" 
                      placeholder="Ex: Arroz Tio João 5kg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Categoria</label>
                    <select 
                      value={currentProduct.category}
                      onChange={e => setCurrentProduct({ ...currentProduct, category: e.target.value })}
                      className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl outline-none focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all appearance-none"
                    >
                      {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Preço (R$)</label>
                      <input 
                        type="number" 
                        step="0.01"
                        required 
                        value={currentProduct.price}
                        onChange={e => setCurrentProduct({ ...currentProduct, price: parseFloat(e.target.value) })}
                        className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl outline-none focus:ring-4 focus:ring-emerald-500/20"
                      />
                    </div>
                    {currentProduct.isPromotion && (
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Preço Antigo</label>
                        <input 
                          type="number" 
                          step="0.01"
                          value={currentProduct.originalPrice}
                          onChange={e => setCurrentProduct({ ...currentProduct, originalPrice: parseFloat(e.target.value) })}
                          className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl outline-none focus:ring-4 focus:ring-red-500/20"
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="relative aspect-square bg-gray-100 rounded-3xl border-4 border-dashed border-gray-200 overflow-hidden flex flex-col items-center justify-center group">
                    <img src={currentProduct.imageUrl} className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-110" alt="Preview" />
                    <div className="relative z-10 flex flex-col items-center bg-white/90 backdrop-blur px-6 py-4 rounded-2xl shadow-xl">
                      <ImageIcon className="w-6 h-6 text-emerald-600 mb-1" />
                      <button type="button" className="text-sm font-bold text-gray-800">Trocar Foto</button>
                    </div>
                  </div>

                  <div 
                    onClick={() => setCurrentProduct({ ...currentProduct, isPromotion: !currentProduct.isPromotion })}
                    className={`flex items-center justify-between p-5 rounded-2xl border-2 cursor-pointer transition-all ${currentProduct.isPromotion ? 'bg-emerald-50 border-emerald-500' : 'bg-white border-gray-100'}`}
                  >
                    <div>
                      <div className={`font-black text-sm ${currentProduct.isPromotion ? 'text-emerald-900' : 'text-gray-500'}`}>ATIVAR PROMOÇÃO</div>
                      <div className="text-xs text-gray-400">O produto aparecerá no topo para clientes</div>
                    </div>
                    <div className={`w-12 h-6 rounded-full relative transition-colors ${currentProduct.isPromotion ? 'bg-emerald-500' : 'bg-gray-200'}`}>
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${currentProduct.isPromotion ? 'left-7' : 'left-1'}`} />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-bold text-gray-700">Descrição Comercial</label>
                  <button 
                    type="button" 
                    onClick={generateAIdesc}
                    disabled={isGenerating || !currentProduct.name}
                    className="flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-xl text-xs font-black hover:bg-emerald-200 disabled:opacity-50 transition-all shadow-sm"
                  >
                    {isGenerating ? <Loader2 className="w-3 h-3 animate-spin" /> : <Wand2 className="w-3 h-3" />}
                    OTIMIZAR COM IA
                  </button>
                </div>
                <textarea 
                  rows={3} 
                  required
                  value={currentProduct.description}
                  onChange={e => setCurrentProduct({ ...currentProduct, description: e.target.value })}
                  className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl outline-none focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 resize-none transition-all"
                  placeholder="Ex: Aroma intenso e encorpado, perfeito para começar o dia..."
                ></textarea>
              </div>

              <div className="flex gap-4 pt-4">
                <button 
                  type="button" 
                  onClick={() => setIsEditing(false)}
                  className="flex-1 py-5 rounded-2xl font-black text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-all border-2 border-transparent"
                >
                  DESCARTAR
                </button>
                <button 
                  type="submit"
                  className="flex-[2] py-5 bg-emerald-600 text-white rounded-2xl font-black hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-100 flex items-center justify-center gap-3"
                >
                  <Save className="w-6 h-6" />
                  CONFIRMAR E SALVAR
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupermarketDashboard;
