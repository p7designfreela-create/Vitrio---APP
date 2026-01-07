
import React, { useState } from 'react';
import { UserProfile, UserRole } from '../types';
// Fixed missing TrendingUp and Heart imports from lucide-react
import { User, Store, MapPin, Mail, Phone, Camera, Save, Bell, ShieldCheck, Image as ImageIcon, QrCode, Share2, Clock, Smartphone, Trash2, ChevronRight, BarChart3, TrendingUp, Heart } from 'lucide-react';

interface ProfileProps {
  user: UserProfile;
  onUpdateUser: (user: UserProfile) => void;
}

const Profile: React.FC<ProfileProps> = ({ user, onUpdateUser }) => {
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: '(11) 98877-6655',
    address: user.role === UserRole.SUPERMARKET ? 'Av. Paulista, 1000' : 'Rua Augusta, 123',
    notifications: true,
    avatarUrl: user.avatarUrl || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=200',
    bannerUrl: user.bannerUrl || 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&q=80&w=1200',
    openHour: user.businessHours?.open || '08:00',
    closeHour: user.businessHours?.close || '22:00'
  });
  const [success, setSuccess] = useState(false);
  const [showQR, setShowQR] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUser({
      ...user,
      name: formData.name,
      email: formData.email,
      avatarUrl: formData.avatarUrl,
      bannerUrl: formData.bannerUrl,
      businessHours: user.role === UserRole.SUPERMARKET ? { open: formData.openHour, close: formData.closeHour } : undefined
    });
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  const storeId = user.role === UserRole.SUPERMARKET ? (user.uniqueId || 'MC-778') : 'USER-992';

  return (
    <div className="max-w-5xl mx-auto space-y-12 py-8 animate-in slide-in-from-bottom-8 duration-700">
      
      {/* Brand Profile Card */}
      <div className="bg-white dark:bg-slate-900 rounded-[3rem] border dark:border-slate-800 shadow-2xl overflow-hidden transition-colors">
        <div className="relative h-72 md:h-96 bg-slate-200 dark:bg-slate-800">
          <img src={formData.bannerUrl} className="w-full h-full object-cover" alt="Banner" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/20" />
          
          <div className="absolute top-8 right-8 flex gap-3">
             <button onClick={() => setShowQR(true)} className="bg-white/20 backdrop-blur-xl text-white px-6 py-4 rounded-[1.5rem] hover:bg-white/40 transition-all flex items-center gap-3 font-black text-xs uppercase tracking-widest shadow-2xl border border-white/20">
               <QrCode className="w-5 h-5" />
               Compartilhar Perfil
             </button>
             <button className="bg-white/20 backdrop-blur-xl text-white p-4 rounded-[1.5rem] hover:bg-white/40 transition-all border border-white/20 shadow-2xl">
               <ImageIcon className="w-5 h-5" />
             </button>
          </div>
          
          <div className="absolute -bottom-24 left-12 flex items-end gap-8">
            <div className="relative group">
              <div className="w-44 h-44 md:w-56 md:h-56 rounded-[3rem] bg-white dark:bg-slate-900 border-[10px] border-white dark:border-slate-900 shadow-2xl overflow-hidden">
                <img src={formData.avatarUrl} className="w-full h-full object-cover" alt="Avatar" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all flex flex-col items-center justify-center cursor-pointer text-white">
                  <Camera className="w-10 h-10 mb-2" />
                  <span className="font-black text-xs uppercase">Trocar Foto</span>
                </div>
              </div>
            </div>
            <div className="pb-8">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-4xl font-black text-white drop-shadow-lg leading-none">{formData.name}</h2>
                <ShieldCheck className="w-8 h-8 text-blue-400 fill-current bg-white rounded-full shadow-lg" />
              </div>
              <div className="flex items-center gap-4">
                 <p className="text-emerald-50 font-black bg-emerald-600/60 backdrop-blur px-4 py-1.5 rounded-full text-[10px] uppercase tracking-[0.2em] shadow-lg">
                   {user.role === UserRole.SUPERMARKET ? 'Painel Profissional' : 'Cliente Gold'}
                 </p>
                 <span className="text-white/80 font-black text-xs uppercase tracking-widest">{storeId}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-32 pb-16 px-12">
          {user.role === UserRole.SUPERMARKET && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
               <div className="bg-slate-50 dark:bg-slate-800/50 p-8 rounded-[2rem] border dark:border-slate-800 transition-colors">
                  <BarChart3 className="w-8 h-8 text-emerald-600 mb-4" />
                  <div className="text-3xl font-black text-slate-900 dark:text-white">128</div>
                  <div className="text-sm text-slate-500 font-bold uppercase tracking-widest">Produtos Ativos</div>
               </div>
               <div className="bg-slate-50 dark:bg-slate-800/50 p-8 rounded-[2rem] border dark:border-slate-800 transition-colors">
                  <TrendingUp className="w-8 h-8 text-red-600 mb-4" />
                  <div className="text-3xl font-black text-slate-900 dark:text-white">14</div>
                  <div className="text-sm text-slate-500 font-bold uppercase tracking-widest">Em Promoção</div>
               </div>
               <div className="bg-slate-50 dark:bg-slate-800/50 p-8 rounded-[2rem] border dark:border-slate-800 transition-colors">
                  <Heart className="w-8 h-8 text-pink-600 mb-4" />
                  <div className="text-3xl font-black text-slate-900 dark:text-white">2.4k</div>
                  <div className="text-sm text-slate-500 font-bold uppercase tracking-widest">Seguidores</div>
               </div>
            </div>
          )}

          <div className="flex flex-col lg:flex-row gap-16">
            <div className="flex-1 space-y-10">
               <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight uppercase italic">Configurações Gerais</h3>
                  {success && (
                    <div className="bg-emerald-500 text-white px-6 py-3 rounded-2xl font-black text-xs shadow-xl animate-in zoom-in-95 tracking-widest">
                      SALVO!
                    </div>
                  )}
               </div>

               <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-[10px] font-black text-emerald-600 dark:text-emerald-400 mb-2 uppercase tracking-[0.2em] ml-1">Nome de Exibição</label>
                      <input 
                        type="text" 
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                        className="w-full px-6 py-5 bg-slate-50 dark:bg-slate-800/30 border-2 border-transparent dark:border-slate-800 rounded-2xl outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-bold text-slate-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-emerald-600 dark:text-emerald-400 mb-2 uppercase tracking-[0.2em] ml-1">E-mail Corporativo</label>
                      <input 
                        type="email" 
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                        className="w-full px-6 py-5 bg-slate-50 dark:bg-slate-800/30 border-2 border-transparent dark:border-slate-800 rounded-2xl outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-bold text-slate-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-emerald-600 dark:text-emerald-400 mb-2 uppercase tracking-[0.2em] ml-1">Telefone Principal</label>
                      <input 
                        type="text" 
                        value={formData.phone}
                        onChange={e => setFormData({...formData, phone: e.target.value})}
                        className="w-full px-6 py-5 bg-slate-50 dark:bg-slate-800/30 border-2 border-transparent dark:border-slate-800 rounded-2xl outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-bold text-slate-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-emerald-600 dark:text-emerald-400 mb-2 uppercase tracking-[0.2em] ml-1">Localização</label>
                      <input 
                        type="text" 
                        value={formData.address}
                        onChange={e => setFormData({...formData, address: e.target.value})}
                        className="w-full px-6 py-5 bg-slate-50 dark:bg-slate-800/30 border-2 border-transparent dark:border-slate-800 rounded-2xl outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-bold text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>

                  {user.role === UserRole.SUPERMARKET && (
                    <div className="p-8 rounded-[2rem] bg-slate-900 dark:bg-black text-white space-y-6">
                       <div className="flex items-center gap-3 mb-2">
                          <Clock className="w-6 h-6 text-emerald-400" />
                          <h4 className="font-black text-lg uppercase tracking-tight">Horário de Funcionamento</h4>
                       </div>
                       <div className="flex items-center gap-6">
                          <div className="flex-1">
                             <label className="block text-[10px] font-black text-slate-500 mb-2 uppercase">Abertura</label>
                             <input type="time" value={formData.openHour} onChange={e => setFormData({...formData, openHour: e.target.value})} className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-emerald-500 font-black text-white" />
                          </div>
                          <div className="flex-1">
                             <label className="block text-[10px] font-black text-slate-500 mb-2 uppercase">Fechamento</label>
                             <input type="time" value={formData.closeHour} onChange={e => setFormData({...formData, closeHour: e.target.value})} className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-emerald-500 font-black text-white" />
                          </div>
                       </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between p-8 rounded-[2rem] border-2 border-dashed dark:border-slate-800">
                     <div className="flex items-center gap-6">
                        <div className="bg-emerald-600 p-4 rounded-2xl shadow-xl shadow-emerald-500/30">
                           <Bell className="w-6 h-6 text-white" />
                        </div>
                        <div>
                           <div className="font-black text-slate-900 dark:text-white uppercase tracking-tight">Notificações Push</div>
                           <div className="text-sm text-slate-500 dark:text-slate-400 font-medium">Alertas de ofertas e novos seguidores</div>
                        </div>
                     </div>
                     <button 
                        type="button"
                        onClick={() => setFormData({...formData, notifications: !formData.notifications})}
                        className={`relative inline-flex h-10 w-16 items-center rounded-full transition-all shadow-xl ${formData.notifications ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-700'}`}
                     >
                        <span className={`inline-block h-8 w-8 transform rounded-full bg-white shadow-md transition-transform ${formData.notifications ? 'translate-x-7' : 'translate-x-1'}`} />
                     </button>
                  </div>

                  <button 
                    type="submit"
                    className="w-full flex items-center justify-center gap-3 bg-emerald-600 text-white py-6 rounded-[2rem] font-black hover:bg-emerald-700 transition-all shadow-2xl shadow-emerald-500/30 active:scale-95 text-lg uppercase tracking-widest"
                  >
                    <Save className="w-6 h-6" />
                    Salvar Alterações
                  </button>
               </form>
            </div>

            <div className="lg:w-80 space-y-6">
               <div className="p-8 bg-slate-50 dark:bg-slate-800/50 rounded-[2.5rem] border dark:border-slate-800 transition-colors">
                  <h4 className="font-black text-slate-900 dark:text-white uppercase tracking-tight mb-6">Acesso Rápido</h4>
                  <div className="space-y-3">
                     <button className="w-full flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-slate-900 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 transition-all border dark:border-slate-800 group">
                        <div className="flex items-center gap-3">
                           <Smartphone className="w-5 h-5 text-slate-400 group-hover:text-emerald-600" />
                           <span className="text-sm font-black text-slate-700 dark:text-slate-300">Dispositivos</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-300" />
                     </button>
                     <button className="w-full flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-slate-900 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 transition-all border dark:border-slate-800 group">
                        <div className="flex items-center gap-3">
                           <ShieldCheck className="w-5 h-5 text-slate-400 group-hover:text-emerald-600" />
                           <span className="text-sm font-black text-slate-700 dark:text-slate-300">Privacidade</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-300" />
                     </button>
                     <button className="w-full flex items-center justify-between p-4 rounded-2xl bg-red-50 dark:bg-red-500/5 hover:bg-red-100 dark:hover:bg-red-500/10 transition-all border border-red-100 dark:border-red-500/20 group">
                        <div className="flex items-center gap-3">
                           <Trash2 className="w-5 h-5 text-red-400" />
                           <span className="text-sm font-black text-red-600">Excluir Conta</span>
                        </div>
                     </button>
                  </div>
               </div>

               <div className="p-8 bg-emerald-600 rounded-[2.5rem] text-white shadow-2xl shadow-emerald-500/30 overflow-hidden relative">
                  <div className="relative z-10">
                     <h4 className="font-black uppercase italic tracking-tighter text-2xl mb-2">Seja Premium</h4>
                     <p className="text-emerald-100 text-sm font-medium mb-6">Aumente sua visibilidade em até 300% com anúncios destacados.</p>
                     <button className="w-full bg-white text-emerald-600 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-xl">SAIBA MAIS</button>
                  </div>
                  <BarChart3 className="absolute -bottom-6 -right-6 w-32 h-32 text-white/10" />
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* QR Code Modal Placeholder */}
      {showQR && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-300">
          <div className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-[3rem] p-12 text-center shadow-2xl scale-100 animate-in zoom-in-95 duration-300 border dark:border-slate-800 transition-colors">
             <div className="flex justify-between items-center mb-8">
                <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Seu ID: {storeId}</span>
                <button onClick={() => setShowQR(false)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors">
                   <X className="w-6 h-6 text-slate-900 dark:text-white" />
                </button>
             </div>
             <div className="bg-emerald-600 p-8 rounded-[3rem] mb-8 shadow-2xl shadow-emerald-500/30 inline-block">
                {/* Mock QR Code */}
                <div className="w-48 h-48 bg-white p-4 rounded-2xl">
                   <QrCode className="w-full h-full text-emerald-950" />
                </div>
             </div>
             <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">Escaneie para Seguir</h3>
             <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-8">Compartilhe este QR Code em suas redes sociais para atrair novos clientes.</p>
             <button className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-5 rounded-2xl font-black flex items-center justify-center gap-3 hover:scale-105 transition-all">
                <Share2 className="w-5 h-5" />
                COPIAR LINK
             </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper for closing the modal
const X = ({ className, ...props }: any) => (
  <svg {...props} className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
);

export default Profile;
