import React, { useState, useEffect } from 'react';
import { Game, ConsolePlatform } from '../types';
import { CheckCircle2, Zap, ShoppingBag, ImageOff, Calendar } from 'lucide-react';

interface GameCardProps {
  game: Game;
}

const GameCard: React.FC<GameCardProps> = ({ game }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [releaseYear, setReleaseYear] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Specific overrides for games where Wikipedia naming is tricky or ambiguous
  const manualSlugMap: Record<string, string> = {
      "Prince of Persia": "Prince_of_Persia_(2008_video_game)",
      "Doom": "Doom_(1993_video_game)",
      "SimCity": "SimCity_2000",
      // "Max Payne": "Max_Payne_(video_game)" // Handled dynamically below, but valid example
  };

  // Base slug calculation
  const cleanTitle = game.title.replace(/\s+/g, '_');
  const initialSlug = manualSlugMap[game.title] || encodeURIComponent(cleanTitle);
  const [finalWikiUrl, setFinalWikiUrl] = useState(`https://en.wikipedia.org/wiki/${initialSlug}`);

  const isFPSBoosted = game.fpsBoost !== null;
  const is360 = game.platform === ConsolePlatform.XBOX_360;
  const watermarkText = is360 ? "360" : "OG";
  
  // Search query for stores
  const searchQuery = `${game.title} ${is360 ? 'Xbox 360' : 'Xbox'}`;
  
  // CeX Search URL
  const cexUrl = `https://uk.webuy.com/search?stext=${encodeURIComponent(searchQuery)}`;
  
  // GameStop Search URL
  const gamestopUrl = `https://www.gamestop.com/search/?q=${encodeURIComponent(searchQuery)}`;

  useEffect(() => {
    let isMounted = true;
    setImageError(false);
    setIsLoading(true);

    const fetchWikiData = async () => {
        try {
            // Helper to fetch page summary
            const fetchPage = async (slug: string) => {
                 const res = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${slug}`);
                 if (!res.ok) return null;
                 return res.json();
            };

            // Helper to check for game context in the fetched data
            const hasGameContext = (data: any) => {
                 if (!data) return false;
                 if (data.type === 'disambiguation') return false;
                 
                 const txt = (data.description || "") + " " + (data.extract || "");
                 const lower = txt.toLowerCase();
                 return lower.includes('video game') || 
                        lower.includes('xbox') || 
                        lower.includes('playstation') || 
                        lower.includes('gameplay') || 
                        lower.includes('nintendo') ||
                        lower.includes('console') ||
                        lower.includes('arcade') || 
                        lower.includes('shooter') ||
                        lower.includes('platformer') ||
                        lower.includes('simulation') ||
                        lower.includes('racing') ||
                        lower.includes('developed by') ||
                        lower.includes('published by');
            };

            // Detect if the page is about a Series/Franchise (which often lacks box art or has a logo)
            const isSeriesOrFranchise = (data: any) => {
                 const description = data.description ? data.description.toLowerCase() : "";
                 const extract = data.extract ? data.extract.toLowerCase() : "";
                 return description.includes('video game series') || 
                        description.includes('media franchise') ||
                        extract.includes('is a video game series') ||
                        extract.includes('is a media franchise') ||
                        extract.includes('series of video games');
            };

            // 1. Try exact title match first
            let data = await fetchPage(initialSlug);
            let usedSlug = initialSlug;
            let isValid = hasGameContext(data);
            let isSeries = isValid && isSeriesOrFranchise(data);

            // 2. If valid game context is missing (e.g. "Black" returns color) 
            // OR if it's a series page (e.g. "Max Payne" returns franchise logo), try "(video_game)"
            if (!isValid || isSeries) {
                const altSlug = encodeURIComponent(`${cleanTitle}_(video_game)`);
                const altData = await fetchPage(altSlug);
                
                // If the alt page has better context, use it
                // We prefer a specific video game page over a series page
                if (hasGameContext(altData)) {
                    data = altData;
                    usedSlug = altSlug;
                    isValid = true;
                }
            }
            
            // 3. If still not valid, don't show misleading data (e.g. Color info for Black)
            // It is better to show no image/description than the wrong one.
            if (!isValid && data && !hasGameContext(data)) {
                 data = null; 
            }

            if (!data) throw new Error('Wiki not found');
            
            if (isMounted) {
                // Update the link if we resolved to a specific page
                if (usedSlug !== initialSlug) {
                    setFinalWikiUrl(`https://en.wikipedia.org/wiki/${usedSlug}`);
                }

                // 1. Handle Image (Prefer original, fallback to thumbnail)
                const imgSource = data.originalimage?.source || data.thumbnail?.source;
                if (imgSource) {
                    setImageUrl(imgSource);
                } else {
                    setImageError(true);
                }

                // 2. Handle Description
                if (data.extract) {
                    setDescription(data.extract);
                }

                // 3. Handle Year Extraction
                const yearRegex = /\b(19|20)\d{2}\b/;
                let foundYear = null;
                
                if (data.description) {
                    const match = data.description.match(yearRegex);
                    if (match) foundYear = match[0];
                }
                
                if (!foundYear && data.extract) {
                    // Check first 100 chars of extract
                    const match = data.extract.substring(0, 100).match(yearRegex);
                    if (match) foundYear = match[0];
                }
                
                if (foundYear) setReleaseYear(foundYear);
            }
        } catch (err) {
            if (isMounted) setImageError(true);
        } finally {
            if (isMounted) setIsLoading(false);
        }
    };

    fetchWikiData();

    return () => { isMounted = false; };
  }, [initialSlug, cleanTitle]);

  // Format Helper
  const getFormatBadgeColor = (fmt: string) => {
      const lower = fmt.toLowerCase();
      if (lower.includes('disc only')) return 'bg-gray-200 text-gray-700 border-gray-300';
      if (lower.includes('digital') || lower.includes('xbla')) return 'bg-blue-50 text-blue-700 border-blue-100';
      return 'bg-slate-100 text-slate-700 border-slate-200';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden group h-full flex flex-col border border-gray-100">
      
      {/* Box Art / Header Section - Using aspect ratio for full cover look */}
      <div className="relative w-full aspect-[2/3] bg-gray-100 overflow-hidden border-b border-gray-100">
        {!imageError && imageUrl ? (
           <img 
             src={imageUrl} 
             alt={game.title}
             className={`w-full h-full object-fill transition-all duration-700 group-hover:scale-105 ${isLoading ? 'scale-110 blur-sm' : 'blur-0'}`}
             onError={() => setImageError(true)}
           />
        ) : (
            /* Fallback Watermark Design */
            <div className="w-full h-full relative bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <div className="absolute inset-0 opacity-10 flex items-center justify-center select-none overflow-hidden">
                    <span className="text-[60px] md:text-[100px] font-black text-gray-900 leading-none tracking-tighter transform -rotate-12">
                        {watermarkText}
                    </span>
                </div>
                <div className="z-10 text-gray-300">
                    <ImageOff size={32} className="md:w-12 md:h-12" strokeWidth={1.5} />
                </div>
            </div>
        )}

        {/* Loading Skeleton overlay */}
        {isLoading && (
             <div className="absolute inset-0 bg-gray-200 animate-pulse z-20" />
        )}
        
        {/* Year Badge (Overlaid on Image) */}
        {!isLoading && releaseYear && (
             <div className="absolute top-2 right-2 md:top-3 md:right-3 bg-black/70 backdrop-blur-md text-white text-[10px] md:text-xs font-bold px-1.5 py-0.5 md:px-2 md:py-1 rounded-md flex items-center gap-1 shadow-lg border border-white/10">
                 <Calendar size={10} className="md:w-3 md:h-3" />
                 <span>{releaseYear}</span>
             </div>
        )}
      </div>

      {/* Content */}
      <div className="p-3 md:p-4 flex flex-col flex-1">
        
        {/* Header: Title & Meta */}
        <div className="mb-2 md:mb-3">
            <h3 className="text-sm md:text-lg font-black text-slate-900 leading-tight mb-1 line-clamp-2">
                <a 
                    href={finalWikiUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-xbox-green hover:underline decoration-2 underline-offset-2 transition-colors"
                >
                {game.title}
                </a>
            </h3>
            
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] md:text-xs text-gray-500 font-medium">
                <span className="truncate max-w-full">{game.publisher}</span>
                {game.format && (
                    <span className={`px-1.5 py-0.5 rounded border text-[8px] md:text-[10px] uppercase tracking-wide font-bold ${getFormatBadgeColor(game.format)}`}>
                        {game.format}
                    </span>
                )}
            </div>
        </div>

        {/* Description */}
        <div className="mb-3 md:mb-4 flex-grow hidden xs:block">
            {isLoading ? (
                <div className="space-y-2">
                    <div className="h-1.5 md:h-2 bg-gray-100 rounded w-full animate-pulse"></div>
                    <div className="h-1.5 md:h-2 bg-gray-100 rounded w-5/6 animate-pulse"></div>
                    <div className="h-1.5 md:h-2 bg-gray-100 rounded w-4/6 animate-pulse"></div>
                </div>
            ) : (
                <p className="text-xs md:text-sm text-gray-600 line-clamp-2 md:line-clamp-3 leading-relaxed">
                    {description || "No description available."}
                </p>
            )}
        </div>

        {/* Footer Info & Actions */}
        <div className="pt-2 md:pt-3 border-t border-gray-100 flex flex-col gap-2 md:gap-3 mt-auto">
            {/* Tech Badges */}
            <div className="flex items-center justify-between">
                <div className={`inline-flex items-center px-1.5 py-0.5 md:px-2 md:py-1 rounded text-[9px] md:text-[10px] font-bold uppercase tracking-wider ${is360 ? 'bg-gray-100 text-gray-600' : 'bg-slate-800 text-white'}`}>
                    {is360 ? '360' : 'Original'}
                </div>

                {isFPSBoosted ? (
                    <div className="flex items-center gap-1 text-[9px] md:text-[10px] font-bold text-xbox-green bg-green-50 px-1.5 py-0.5 md:px-2 md:py-1 rounded border border-green-100">
                        <Zap size={10} className="fill-current" />
                        <span>FPS Boost</span>
                    </div>
                ) : (
                    <div className="flex items-center gap-1 text-[9px] md:text-[10px] font-bold text-gray-400">
                        <CheckCircle2 size={10} className="md:w-3 md:h-3" />
                        <span>Compat</span>
                    </div>
                )}
            </div>

            {/* Store Buttons */}
            <div className="grid grid-cols-2 gap-2">
                <a 
                    href={cexUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1 py-1.5 md:py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all duration-200 font-bold text-[9px] md:text-[10px] uppercase tracking-wide group/cex border border-red-100 hover:border-red-600"
                >
                    <ShoppingBag size={10} className="transition-transform group-hover/cex:-translate-y-0.5 md:w-3 md:h-3" />
                    <div className="flex items-center gap-1">
                        <span>CeX</span>
                        <img 
                            src="https://flagcdn.com/w20/gb.png" 
                            alt="UK"
                            className="w-3 h-auto md:w-3.5 rounded-[1px] shadow-sm"
                        />
                    </div>
                </a>

                <a 
                    href={gamestopUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1 py-1.5 md:py-2 rounded-lg bg-slate-50 text-slate-700 hover:bg-slate-900 hover:text-white transition-all duration-200 font-bold text-[9px] md:text-[10px] uppercase tracking-wide group/gs border border-slate-200 hover:border-slate-900"
                >
                    <ShoppingBag size={10} className="transition-transform group-hover/gs:-translate-y-0.5 md:w-3 md:h-3" />
                    <div className="flex items-center gap-1">
                        <span className="hidden xs:inline">GameStop</span>
                        <span className="xs:hidden">GS</span>
                        <img 
                            src="https://flagcdn.com/w20/us.png" 
                            alt="USA"
                            className="w-3 h-auto md:w-3.5 rounded-[1px] shadow-sm"
                        />
                    </div>
                </a>
            </div>
        </div>
      </div>
    </div>
  );
};

export default GameCard;