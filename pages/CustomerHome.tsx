
import React, { useState } from 'react';
import { Supermarket, Product, UserProfile } from '../types';
import { MOCK_STORES, MOCK_PRODUCTS, REGIONS } from '../constants';
import { Search, MapPin, Star, Heart, ArrowRight, TrendingUp, QrCode, Filter, Map, CheckCircle2 } from 'lucide-react';
import ProductCard from '../components/ProductCard';

interface CustomerHomeProps {
  user: UserProfile;
  onUpdateUser: (user: UserProfile) => void;
}

const CustomerHome: React.FC<CustomerHomeProps> = ({ user, onUpdateUser }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('Todas');
  const [selectedStore, setSelectedStore] = useState<Supermarket | null>(null);

  const filteredStores = MOCK_STORES.filter(store => {
    const matchesSearch = 
      store.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      store.uniqueId.toLowerCase() === searchTerm.toLowerCase();
    const matchesRegion = selectedRegion === 'Todas' || store.region === selectedRegion;
    return matchesSearch && matchesRegion;
  });

  const toggleFavorite = (storeId: string) => {
    const favorites = user.favorites || [];
    const newFavorites = favorites.includes(storeId)
      ? favorites.filter(id => id !== storeId)
      : [...favorites, storeId];
    onUpdateUser({ ...user, favorites: newFavorites });
  };

  const isFavorite = (storeId: string) => user.favorites?.includes(storeId);
  const promos = MOCK_PRODUCTS.filter(p => p.isPromotion && (!selectedStore || p.storeId === selectedStore.id));
  const storeProducts = selectedStore ? MOCK_PRODUCTS.filter(p => p.storeId === selectedStore.id) : [];

  if (selectedStore) {
    return (
      <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
        {/* Store Detail Header */}
        <div className="relative rounded-[2.5rem] overflow-hidden bg-white dark:bg-slate-900 border dark:border-slate-800 shadow-xl">
           <div className="h-48 md:h-64 overflow-hidden relative">
              <img src={selectedStore.bannerUrl} className="w-full h-full object-cover opacity-80" alt="Banner" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
           </div>
           
           <div className="px-8 pb-8 -mt-16 relative z-10">
              <div className="flex flex-col md:flex-row items-end justify-between gap-6">
                 <div className="flex items-end gap-6">
                    <div className="w-32 h-32 rounded-[2rem] border-4 border-white dark:border-slate-900 bg-white overflow-hidden shadow-2xl">
                       <img src={selectedStore.logoUrl} alt={selectedStore.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="pb-2">
                       <div className="flex items-center gap-2 mb-1">
                          <h2 className="text-3xl font-black text-white drop-shadow-md">{selectedStore.name}</h2>
                          {selectedStore.isVerified && <CheckCircle2 className="w-6 h-6 text-blue-400 fill-current bg-white rounded-full" />}
                       </div>
                       <p className="text-white/90 flex items-center gap-1.5 text-sm font-medium drop-shadow-sm">
                          <MapPin className="w-3.5 h-3.5" /> {selectedStore.address} • {selectedStore.region}
                       </p>
                    </div>
                 </div>
                 <div className="flex gap-3 pb-2">
                    <button 
                       onClick={() => toggleFavorite(selectedStore.id)}
                       className={`px-8 py-3.5 rounded-2xl font-black text-sm transition-all shadow-xl flex items-center gap-2 ${isFavorite(selectedStore.id) ? 'bg-pink-500 text-white' : 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white hover:scale-105 active:scale-95'}`}
                    >
                       <Heart className={`w-5 h-5 ${isFavorite(selectedStore.id) ? 'fill-current' : ''}`} />
                       {isFavorite(selectedStore.id) ? 'SEGUINDO' : 'SEGUIR MERCADO'}
                    </button>
                    <button onClick={() => setSelectedStore(null)} className="p-3.5 bg-white/20 backdrop-blur-md rounded-2xl text-white hover:bg-white/30 transition-all border border-white/30">
                       <ArrowRight className="w-6 h-6 rotate-180" />
                    </button>
                 </div>
              </div>
           </div>
        </div>

        {promos.length > 0 && (
          <section className="bg-red-50 dark:bg-red-500/5 p-8 rounded-[2.5rem] border border-red-100 dark:border-red-500/10">
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-red-600 p-2 rounded-xl text-white">
                 <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight italic uppercase">Ofertas Imbatíveis</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {promos.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}

        <section>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-8 tracking-tight">Catálogo Completo</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {storeProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* Hero Search Section */}
      <div className="relative py-12 px-8 rounded-[3rem] bg-emerald-600 overflow-hidden shadow-2xl shadow-emerald-500/20">
         <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
         <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-64 h-64 bg-emerald-400/20 rounded-full blur-2xl" />
         
         <div className="relative z-10 max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tighter leading-none">Onde você quer economizar hoje?</h1>
            <p className="text-emerald-50 text-lg mb-8 font-medium opacity-90">Busque por nome, região ou use o ID do Mercado.</p>
            
            <div className="flex flex-col md:flex-row gap-3">
               <div className="relative flex-1 group">
                  <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none transition-colors group-focus-within:text-emerald-600">
                    <Search className="w-5 h-5 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Ex: Mercadão, MC-778, São Paulo..."
                    className="w-full pl-14 pr-6 py-5 bg-white rounded-2xl shadow-xl outline-none focus:ring-4 focus:ring-white/20 transition-all text-lg font-bold text-slate-900"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <div className="absolute inset-y-0 right-5 flex items-center">
                     <button className="p-2 text-slate-300 hover:text-emerald-600 transition-colors">
                        <QrCode className="w-6 h-6" />
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </div>

      {/* Region Filter Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl border dark:border-slate-800 shadow-sm flex items-center gap-4 overflow-x-auto no-scrollbar transition-colors">
         <div className="flex items-center gap-2 text-slate-400 font-black text-xs uppercase tracking-widest px-4 border-r dark:border-slate-800 whitespace-nowrap">
            <Map className="w-4 h-4" /> Regiões
         </div>
         {['Todas', ...REGIONS].map(region => (
            <button
               key={region}
               onClick={() => setSelectedRegion(region)}
               className={`whitespace-nowrap px-6 py-3 rounded-2xl text-sm font-black transition-all ${selectedRegion === region ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/20 scale-105' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
            >
               {region}
            </button>
         ))}
      </div>

      {/* Stores List */}
      <section>
        <div className="flex items-center justify-between mb-8 px-2">
          <div className="flex items-center gap-2">
             <Filter className="w-5 h-5 text-emerald-600" />
             <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Supermercados</h2>
          </div>
          <span className="text-emerald-600 dark:text-emerald-400 text-sm font-black cursor-pointer hover:underline uppercase tracking-widest">Localizar no Mapa</span>
        </div>
        
        {filteredStores.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredStores.map(store => (
              <div 
                key={store.id}
                onClick={() => setSelectedStore(store)}
                className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border dark:border-slate-800 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all cursor-pointer group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 dark:bg-emerald-500/5 -translate-y-12 translate-x-12 rounded-full transition-transform group-hover:scale-150" />
                
                <div className="flex gap-6 relative z-10">
                  <div className="relative">
                    <img src={store.logoUrl} alt={store.name} className="w-24 h-24 rounded-3xl object-cover shadow-lg border-2 border-white dark:border-slate-800" />
                    <div className="absolute -bottom-2 -right-2 bg-white dark:bg-slate-900 p-1.5 rounded-full shadow-md">
                       <div className="bg-amber-100 text-amber-600 text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-1">
                          <Star className="w-3 h-3 fill-current" /> {store.rating}
                       </div>
                    </div>
                  </div>
                  <div className="flex-1 py-1">
                    <div className="flex items-start justify-between">
                      <h3 className="text-xl font-black text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors tracking-tight leading-tight">{store.name}</h3>
                      <span className="text-[10px] font-black text-slate-300 dark:text-slate-600 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-lg uppercase">{store.uniqueId}</span>
                    </div>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-2 font-medium flex items-center gap-1">
                       <MapPin className="w-3 h-3" /> {store.address}
                    </p>
                    <div className="flex items-center gap-3 mt-5">
                      <span className="text-[10px] font-black bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-3 py-1.5 rounded-xl uppercase tracking-widest">
                        {store.distance} km de você
                      </span>
                      {isFavorite(store.id) && (
                        <Heart className="w-5 h-5 text-pink-500 fill-current animate-pulse" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center bg-white dark:bg-slate-900 rounded-[3rem] border-2 border-dashed dark:border-slate-800">
             <Search className="w-16 h-16 text-slate-200 dark:text-slate-800 mx-auto mb-4" />
             <h3 className="text-xl font-black text-slate-400 dark:text-slate-600 uppercase">Nenhum mercado encontrado</h3>
             <p className="text-slate-400 dark:text-slate-500 font-medium">Tente buscar por outro termo ou região.</p>
          </div>
        )}
      </section>

      {/* Promotions Strip */}
      <section className="bg-slate-900 dark:bg-black rounded-[3rem] p-12 overflow-hidden relative">
         <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/20 blur-3xl rounded-full" />
         <div className="relative z-10 flex items-center justify-between mb-10">
            <div>
               <h2 className="text-3xl font-black text-white tracking-tighter uppercase italic">Ofertas do Dia</h2>
               <p className="text-slate-400 font-medium">O que há de melhor em sua vizinhança agora.</p>
            </div>
            <button className="bg-white text-slate-900 px-8 py-4 rounded-2xl font-black text-sm hover:scale-105 transition-all">VER TUDO</button>
         </div>
         <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {MOCK_PRODUCTS.filter(p => p.isPromotion).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
         </div>
      </section>
    </div>
  );
};

export default CustomerHome;
