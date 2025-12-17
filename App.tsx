import React, { useState, useEffect, useMemo } from 'react';
import { Search, X, CheckCircle2, ChevronDown, LayoutGrid, List, Zap, ExternalLink } from 'lucide-react';
import { getGames } from './services/gameData';
import { Game, ConsolePlatform } from './types';
import GameCard from './components/GameCard';

type FilterType = 'ALL' | '360' | 'OG' | 'FPS';
type ViewMode = 'GRID' | 'LIST';

const App: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<FilterType>('ALL');
  const [viewMode, setViewMode] = useState<ViewMode>('GRID');
  
  // Pagination State
  const [visibleCount, setVisibleCount] = useState(12);

  useEffect(() => {
    // Simulate a brief load
    const loadData = () => {
      const allGames = getGames();
      setGames(allGames);
      setIsLoading(false);
    };
    
    setTimeout(loadData, 100);
  }, []);

  const filteredGames = useMemo(() => {
    let result = games;

    // Apply Tab Filter
    if (activeFilter === '360') {
      result = result.filter(g => g.platform === ConsolePlatform.XBOX_360);
    } else if (activeFilter === 'OG') {
      result = result.filter(g => g.platform === ConsolePlatform.XBOX_ORIGINAL);
    } else if (activeFilter === 'FPS') {
      result = result.filter(g => g.fpsBoost !== null);
    }

    // Apply Search Filter
    if (searchTerm) {
      const lowerTerm = searchTerm.toLowerCase();
      result = result.filter(game => 
        game.title.toLowerCase().includes(lowerTerm)
      );
    }

    return result;
  }, [games, searchTerm, activeFilter]);

  // Reset pagination when search or view mode changes
  useEffect(() => {
    if (searchTerm) {
      setVisibleCount(9999); 
    } else {
      // Show more items by default in list view to make it feel like a "full list"
      setVisibleCount(viewMode === 'LIST' ? 50 : 12);
    }
  }, [searchTerm, viewMode]);

  const visibleGames = useMemo(() => {
    return filteredGames.slice(0, visibleCount);
  }, [filteredGames, visibleCount]);

  const handleClear = () => setSearchTerm('');

  const handleFilterClick = (type: FilterType) => {
    setActiveFilter(type);
    setVisibleCount(viewMode === 'LIST' ? 50 : 12);
  };

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + (viewMode === 'LIST' ? 50 : 12));
  };

  const hasMoreGames = visibleGames.length < filteredGames.length;

  const FilterButton = ({ label, type }: { label: string, type: FilterType }) => (
    <button
      onClick={() => handleFilterClick(type)}
      className={`px-3 md:px-6 py-2 rounded-lg font-medium text-xs md:text-sm transition-all duration-200 whitespace-nowrap ${
        activeFilter === type
          ? 'bg-xbox-green text-white shadow-md shadow-green-900/10'
          : 'bg-transparent text-gray-500 hover:bg-gray-200'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-20 flex flex-col">
      
      {/* Hero Section */}
      <header className="px-4 pt-10 md:pt-16 pb-8 md:pb-12 transition-all duration-500 relative overflow-hidden">
        {/* Ambient Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200%] md:w-full h-96 bg-gradient-to-b from-green-500/5 via-green-400/5 to-transparent blur-[80px] -z-10 rounded-b-[50%] pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center space-y-6 md:space-y-8 w-full relative z-10">
          <h1 className="flex flex-col items-center justify-center font-black tracking-tighter uppercase leading-[0.85] select-none transform transition-transform hover:scale-[1.01] duration-500 cursor-default">
            <span className="text-3xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-b from-slate-900 to-slate-600 drop-shadow-sm">
              Xbox Backwards
            </span>
            <span className="text-4xl md:text-7xl mt-1 md:mt-2 bg-clip-text text-transparent bg-gradient-to-r from-xbox-green via-green-500 to-[#0e600e] drop-shadow-md filter">
              Compatibility
            </span>
          </h1>
          
          <p className="text-gray-500 text-sm md:text-lg max-w-2xl mx-auto hidden md:block font-medium tracking-wide opacity-80">
            Search the entire library of backwards compatible games for Xbox X/S
          </p>

          <div className="pt-2 md:pt-4 max-w-2xl mx-auto relative z-20 w-full">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 md:pl-5 flex items-center pointer-events-none">
                <Search className="h-5 w-5 md:h-6 md:w-6 text-gray-400 group-focus-within:text-xbox-green transition-colors" />
              </div>
              <input
                type="text"
                className="block w-full pl-11 md:pl-14 pr-10 md:pr-12 py-3 md:py-5 bg-white/80 backdrop-blur-xl border border-white/50 rounded-2xl text-base md:text-xl text-slate-800 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-green-500/10 shadow-xl shadow-green-900/5 transition-all"
                placeholder="Search library..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                autoFocus
              />
              {searchTerm && (
                <button 
                    onClick={handleClear}
                    className="absolute inset-y-0 right-0 pr-4 md:pr-5 flex items-center text-gray-300 hover:text-gray-600 transition-colors"
                >
                    <X size={20} className="md:w-6 md:h-6" />
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Filter Section */}
      <section className="px-4 mb-4 md:mb-8 animate-fade-in-up">
        <div className="max-w-4xl mx-auto">
            <div className="flex flex-col items-center gap-4">
                <div className="flex flex-wrap justify-center gap-1 md:gap-4 bg-white/50 backdrop-blur-sm border border-white/60 p-1 md:p-2 rounded-xl overflow-x-auto max-w-full shadow-sm">
                    <FilterButton label="All Games" type="ALL" />
                    <FilterButton label="Xbox 360" type="360" />
                    <FilterButton label="Original Xbox" type="OG" />
                    <FilterButton label="FPS Boost" type="FPS" />
                </div>
                
                {/* View Toggle - "Full List Link" */}
                <button 
                    onClick={() => setViewMode(prev => prev === 'GRID' ? 'LIST' : 'GRID')}
                    className="flex items-center gap-2 text-xs md:text-sm font-bold text-gray-500 hover:text-xbox-green transition-colors py-2 px-4 rounded-full hover:bg-white/50"
                >
                    {viewMode === 'GRID' ? (
                        <>
                            <List size={16} />
                            <span>View Full Text List</span>
                        </>
                    ) : (
                        <>
                            <LayoutGrid size={16} />
                            <span>Switch to Grid View</span>
                        </>
                    )}
                </button>
            </div>
        </div>
      </section>

      {/* Results Grid / List */}
      <main className="max-w-7xl mx-auto px-3 md:px-4 flex-1">
        {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 opacity-50">
                <div className="animate-spin rounded-full h-10 w-10 md:h-12 md:w-12 border-t-2 border-b-2 border-xbox-green mb-4"></div>
                <p className="text-gray-500 text-sm font-medium tracking-wide">Loading Library...</p>
            </div>
        ) : (
            <>
                {filteredGames.length > 0 ? (
                    <div className="space-y-8 md:space-y-12">
                        
                        {viewMode === 'GRID' ? (
                            /* Modified Grid Layout: 2 cols mobile, 3 tablet, 4 desktop */
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6 animate-fade-in-up">
                                {visibleGames.map(game => (
                                    <GameCard key={game.id} game={game} />
                                ))}
                            </div>
                        ) : (
                            /* List View */
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden animate-fade-in-up">
                                {visibleGames.map((game, index) => (
                                    <div 
                                        key={game.id} 
                                        className={`p-4 hover:bg-gray-50 transition-colors flex items-center justify-between group ${
                                            index !== visibleGames.length - 1 ? 'border-b border-gray-100' : ''
                                        }`}
                                    >
                                       <div className="flex-1 pr-4">
                                          <div className="flex items-center gap-2 mb-1">
                                             <a 
                                                href={`https://en.wikipedia.org/wiki/${encodeURIComponent(game.title)}`} 
                                                target="_blank" 
                                                rel="noopener noreferrer" 
                                                className="font-bold text-slate-800 text-sm md:text-base hover:text-xbox-green hover:underline decoration-2 underline-offset-2 flex items-center gap-1.5"
                                             >
                                                {game.title}
                                                <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400" />
                                             </a>
                                          </div>
                                          <div className="text-xs text-gray-500 flex flex-wrap gap-2">
                                             <span>{game.publisher}</span>
                                             <span className="hidden xs:inline text-gray-300">•</span>
                                             <span className="hidden xs:inline">{game.dateAdded}</span>
                                          </div>
                                       </div>
                                       
                                       <div className="flex flex-col items-end gap-1.5 shrink-0">
                                          {/* Platform Badge */}
                                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                                              game.platform === ConsolePlatform.XBOX_360 
                                                ? 'bg-gray-100 text-gray-600' 
                                                : 'bg-slate-800 text-white'
                                          }`}>
                                             {game.platform === ConsolePlatform.XBOX_360 ? '360' : 'OG'}
                                          </span>
                                          
                                          {/* FPS Badge */}
                                          {game.fpsBoost && (
                                             <span className="bg-green-50 text-xbox-green border border-green-100 px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1">
                                                <Zap size={10} fill="currentColor" />
                                                <span className="hidden sm:inline">FPS Boost</span>
                                                <span className="sm:hidden">FPS</span>
                                             </span>
                                          )}
                                       </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Pagination / Status Pill */}
                        <div className="flex justify-center pb-8">
                            <button 
                                onClick={handleLoadMore}
                                disabled={!hasMoreGames}
                                className={`group flex items-center gap-2 px-6 py-3 rounded-full font-medium text-xs md:text-sm shadow-sm backdrop-blur-sm transition-all duration-300 ${
                                    hasMoreGames 
                                        ? 'bg-white hover:bg-gray-50 text-slate-700 cursor-pointer hover:shadow-md hover:scale-105 active:scale-95 border border-gray-100' 
                                        : 'bg-gray-50 text-gray-400 cursor-default border border-transparent'
                                }`}
                            >
                                <span>Showing {visibleGames.length} of {filteredGames.length} games</span>
                                {hasMoreGames && (
                                    <ChevronDown size={16} className="text-gray-500 group-hover:text-gray-800 transition-colors" />
                                )}
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full bg-gray-100 mb-4 shadow-inner">
                            <Search className="text-gray-400" size={24} />
                        </div>
                        <h3 className="text-lg md:text-xl font-bold text-gray-700 mb-2">No games found</h3>
                        <p className="text-sm md:text-base text-gray-500">
                            No results found for "{searchTerm}" in {activeFilter !== 'ALL' ? 'this category' : 'the library'}.
                        </p>
                    </div>
                )}
            </>
        )}
      </main>

      <footer className="max-w-4xl mx-auto py-8 text-center text-gray-400 text-xs md:text-sm border-t border-gray-200 mt-8">
        <p>© {new Date().getFullYear()} Xbox Backwards Compat Tool. Not affiliated with Microsoft.</p>
      </footer>
    </div>
  );
};

export default App;