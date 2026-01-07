
import React from 'react';
import { Product } from '../types';
import { Tag, Edit2 } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onEdit?: (product: Product) => void;
  isOwner?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onEdit, isOwner }) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border dark:border-slate-800 overflow-hidden group hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className="relative aspect-square overflow-hidden bg-slate-100 dark:bg-slate-800">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {product.isPromotion && (
          <div className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-black px-2.5 py-1 rounded-full flex items-center gap-1 shadow-lg tracking-widest uppercase">
            <Tag className="w-3 h-3" />
            OFERTA
          </div>
        )}
        {isOwner && (
          <button 
            onClick={() => onEdit?.(product)}
            className="absolute top-3 right-3 p-2.5 bg-white/90 dark:bg-slate-900/90 backdrop-blur rounded-2xl shadow-xl hover:bg-emerald-600 hover:text-white transition-all text-slate-900 dark:text-white"
          >
            <Edit2 className="w-4 h-4" />
          </button>
        )}
      </div>
      
      <div className="p-5">
        <div className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 mb-1 uppercase tracking-widest">{product.category}</div>
        <h3 className="font-bold text-slate-900 dark:text-white truncate mb-1 text-lg">{product.name}</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-4 h-10 leading-relaxed">{product.description}</p>
        
        <div className="flex items-center gap-3">
          <span className="text-xl font-black text-slate-900 dark:text-white">
            R$ {product.price.toFixed(2).replace('.', ',')}
          </span>
          {product.isPromotion && product.originalPrice && (
            <span className="text-xs text-slate-400 dark:text-slate-500 line-through font-medium">
              R$ {product.originalPrice.toFixed(2).replace('.', ',')}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
