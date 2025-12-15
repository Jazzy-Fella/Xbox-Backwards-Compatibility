import React, { useState, useEffect } from 'react';
import { Game, ConsolePlatform } from '../types';
import { ExternalLink, CheckCircle2, Zap, ShoppingBag, ImageOff } from 'lucide-react';

interface GameCardProps {
  game: Game;
}

const GameCard: React.FC<GameCardProps> = ({ game }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);
  const [isLoadingImage, setIsLoadingImage] = useState(true);

  const isFPSBoosted = game.fpsBoost !== null;
  const is360 = game.platform === ConsolePlatform.XBOX_360;
  const watermarkText = is360 ? "360" : "OG";
  
  // Prepare slug for Wikipedia
  const wikiSlug = encodeURIComponent(game.title.replace(/\s+/g, '_'));
  const wikiUrl = `https://en.wikipedia.org/wiki/${wikiSlug}`;
  
  // Search query for stores
  const searchQuery = `${game.title} ${is360 ? 'Xbox 360' : 'Xbox'}`;
  
  // CeX Search URL
  const cexUrl = `https://uk.webuy.com/search?stext=${encodeURIComponent(searchQuery)}`;
  
  // GameStop Search URL
  // Note: Direct product links require specific IDs we don't have, so we use the search functionality.
  const gamestopUrl = `https://www.gamestop.com/search/?q=${encodeURIComponent(searchQuery)}`;

  useEffect(() => {
    let isMounted = true;
    setImageError(false);
    setIsLoadingImage(true);

    const fetchImage = async () => {
        try {
            // Use Wikipedia Summary API to get the thumbnail
            const response = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${wikiSlug}`);
            if (!response.ok) throw new Error('Wiki not found');
            
            const data = await response.json();
            
            if (isMounted) {
                if (data.thumbnail && data.thumbnail.source) {
                    setImageUrl(data.thumbnail.source);
                } else {
                    setImageError(true);
                }
            }
        } catch (err) {
            if (isMounted) setImageError(true);
        } finally {
            if (isMounted) setIsLoadingImage(false);
        }
    };

    fetchImage();

    return () => { isMounted = false; };
  }, [wikiSlug]);

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden group h-full flex flex-col border border-gray-100">
      
      {/* Box Art / Header Section */}
      <div className="relative h-48 w-full bg-gray-100 overflow-hidden border-b border-gray-100">
        {!imageError && imageUrl ? (
           <img 
             src={imageUrl} 
             alt={game.title}
             className={`w-full h-full object-cover transition-opacity duration-500 ${isLoadingImage ? 'opacity-0' : 'opacity-100'}`}
             onError={() => setImageError(true)}
           />
        ) : (
            /* Fallback Watermark Design */
            <div className="w-full h-full relative bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <div className="absolute inset-0 opacity-10 flex items-center justify-center select-none overflow-hidden">
                    <span className="text-[120px] font-black text-gray-900 leading-none tracking-tighter transform -rotate-12">
                        {watermarkText}
                    </span>
                </div>
                <div className="z-10 text-gray-300">
                    <ImageOff size={48} strokeWidth={1.5} />
                </div>
            </div>
        )}

        {/* Loading Skeleton overlay */}
        {isLoadingImage && (
             <div className="absolute inset-0 bg-gray-200 animate-pulse z-20" />
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        {/* Title & Publisher */}
        <div className="mb-auto">
          <h3 className="text-lg font-black text-slate-800 leading-tight mb-2">
            <a 
                href={wikiUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-xbox-green hover:underline decoration-2 underline-offset-2 transition-colors inline-flex gap-2 items-start"
            >
              {game.title}
            </a>
          </h3>
          <p className="text-sm text-gray-500 font-medium">{game.publisher}</p>
        </div>

        {/* Footer Info */}
        <div className="mt-6 pt-4 border-t border-gray-100 flex flex-col gap-3">
            <div className="flex items-center justify-between">
                {/* Platform Badge */}
                <div className={`inline-flex items-center px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${is360 ? 'bg-gray-100 text-gray-600' : 'bg-slate-800 text-white'}`}>
                    {is360 ? 'Xbox 360' : 'Original Xbox'}
                </div>

                {/* FPS Boost Badge */}
                {isFPSBoosted && (
                    <div className="flex items-center gap-1 text-[10px] font-bold text-xbox-green bg-green-50 px-2 py-1 rounded border border-green-100">
                        <Zap size={10} className="fill-current" />
                        <span>FPS Boost</span>
                    </div>
                )}
            </div>

            <div className="flex items-center justify-between gap-2 mt-1">
                 <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
                    <CheckCircle2 size={14} className="text-xbox-green" />
                    <span>Compatible</span>
                </div>
                
                {/* External Link Icon */}
                <a 
                    href={wikiUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-xbox-green transition-colors p-1"
                    title="View on Wikipedia"
                >
                    <ExternalLink size={14} />
                </a>
            </div>

            {/* Store Buttons */}
            <div className="flex flex-col gap-2 mt-1">
                {/* CeX Price Check */}
                <a 
                    href={cexUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all duration-300 font-bold text-xs uppercase tracking-wide group/cex"
                >
                    <ShoppingBag size={14} className="transition-transform group-hover/cex:-translate-y-0.5" />
                    <span>Check Price (CeX)</span>
                </a>

                {/* GameStop Price Check */}
                <a 
                    href={gamestopUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-900 hover:text-white transition-all duration-300 font-bold text-xs uppercase tracking-wide group/gs"
                >
                    <ShoppingBag size={14} className="transition-transform group-hover/gs:-translate-y-0.5" />
                    <span>Check Price (GameStop)</span>
                </a>
            </div>
        </div>
      </div>
    </div>
  );
};

export default GameCard;