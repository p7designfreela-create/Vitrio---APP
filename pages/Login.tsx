
import React, { useState } from 'react';
import { UserRole, UserProfile } from '../types';
import { ShoppingBag, Store, User } from 'lucide-react';

interface LoginProps {
  onLogin: (user: UserProfile) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [role, setRole] = useState<UserRole>(UserRole.CUSTOMER);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login
    const user: UserProfile = {
      id: Math.random().toString(36).substr(2, 9),
      name: role === UserRole.CUSTOMER ? 'João Silva' : 'Supermercado Central',
      email: email || 'demo@exemplo.com',
      role: role,
      storeId: role === UserRole.SUPERMARKET ? 's1' : undefined,
      favorites: role === UserRole.CUSTOMER ? [] : undefined,
    };
    onLogin(user);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="p-8 text-center bg-emerald-600 text-white">
          <div className="inline-block p-3 bg-white/20 rounded-2xl mb-4">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold">Bem-vindo ao MarketCatalog</h1>
          <p className="opacity-90 text-sm mt-2">Escolha seu perfil e acesse o catálogo</p>
        </div>

        <div className="p-8">
          <div className="flex bg-gray-100 p-1 rounded-xl mb-8">
            <button
              onClick={() => setRole(UserRole.CUSTOMER)}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all ${role === UserRole.CUSTOMER ? 'bg-white shadow-sm text-emerald-600' : 'text-gray-500'}`}
            >
              <User className="w-4 h-4" />
              Sou Cliente
            </button>
            <button
              onClick={() => setRole(UserRole.SUPERMARKET)}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all ${role === UserRole.SUPERMARKET ? 'bg-white shadow-sm text-emerald-600' : 'text-gray-500'}`}
            >
              <Store className="w-4 h-4" />
              Sou Mercado
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                placeholder="seu@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                placeholder="••••••••"
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-emerald-600 text-white py-3 rounded-lg font-bold hover:bg-emerald-700 transition-colors mt-4"
            >
              Entrar Agora
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            Ainda não tem conta? <span className="text-emerald-600 font-semibold cursor-pointer">Cadastre-se</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
