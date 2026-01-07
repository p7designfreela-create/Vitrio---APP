
import React, { useEffect, useState } from 'react';
import { UserRole, UserProfile } from '../types';
import { LogOut, User, Store, ShoppingBag, Heart, Search, Sun, Moon } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  user: UserProfile | null;
  onLogout: () => void;
  onNavigate: (page: string) => void;
  currentPage: string;
}

const Layout: React.FC<LayoutProps> = ({ children, user, onLogout, onNavigate, currentPage }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('theme');
    return (saved as 'light' | 'dark') || 'light';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  if (!user) return <>{children}</>;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-slate-950 transition-colors duration-300">
      <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b dark:border-slate-800 sticky top-0 z-30 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('home')}>
            <div className="bg-emerald-600 p-2 rounded-xl shadow-lg shadow-emerald-500/20">
              <ShoppingBag className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-black text-slate-900 dark:text-white hidden sm:block tracking-tighter">MarketCatalog</h1>
          </div>

          <nav className="flex items-center gap-1 sm:gap-2">
            <button 
              onClick={toggleTheme}
              className="p-2.5 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all"
              title="Trocar Tema"
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>

            <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 mx-2" />

            {user.role === UserRole.CUSTOMER ? (
              <>
                <button 
                  onClick={() => onNavigate('home')}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold transition-all ${currentPage === 'home' ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                >
                  <Search className="w-4 h-4" />
                  <span className="hidden md:inline">Explorar</span>
                </button>
                <button 
                  onClick={() => onNavigate('favorites')}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold transition-all ${currentPage === 'favorites' ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                >
                  <Heart className="w-4 h-4" />
                  <span className="hidden md:inline">Favoritos</span>
                </button>
              </>
            ) : (
              <>
                <button 
                  onClick={() => onNavigate('home')}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold transition-all ${currentPage === 'home' ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                >
                  <Store className="w-4 h-4" />
                  <span className="hidden md:inline">Dashboard</span>
                </button>
              </>
            )}
            
            <button 
              onClick={() => onNavigate('profile')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold transition-all ${currentPage === 'profile' ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
            >
              <User className="w-4 h-4" />
              <span className="hidden md:inline">Perfil</span>
            </button>

            <button 
              onClick={onLogout}
              className="p-2.5 text-slate-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-all ml-1"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full p-4 sm:p-6 lg:p-8 animate-in fade-in duration-500">
        {children}
      </main>

      <footer className="bg-white dark:bg-slate-900 border-t dark:border-slate-800 py-10 mt-20 transition-colors">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <ShoppingBag className="w-6 h-6 text-emerald-600" />
            <span className="text-xl font-black text-slate-900 dark:text-white tracking-tighter">MarketCatalog</span>
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-sm max-w-md mx-auto">
            A plataforma líder que conecta você aos melhores produtos e ofertas locais com tecnologia e segurança.
          </p>
          <div className="mt-8 pt-8 border-t dark:border-slate-800 text-slate-400 text-xs">
            &copy; 2024 MarketCatalog Inc. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
