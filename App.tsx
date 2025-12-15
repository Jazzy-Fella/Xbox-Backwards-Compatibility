import React, { useState, useEffect, useMemo } from 'react';
import { Search, X, CheckCircle2, ChevronDown } from 'lucide-react';
import { getGames } from './services/gameData';
import { Game, ConsolePlatform } from './types';
import GameCard from './components/GameCard';

type FilterType = 'ALL' | '360' | 'OG' | 'FPS';

const App: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<FilterType>('ALL');
  
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

  // Reset pagination when search changes
  useEffect(() => {
    if (searchTerm) {
      // When searching, show all matches immediately for better UX
      setVisibleCount(9999); 
    } else {
      // When clearing search, revert to initial page size
      setVisibleCount(12);
    }
  }, [searchTerm]);

  const visibleGames = useMemo(() => {
    return filteredGames.slice(0, visibleCount);
  }, [filteredGames, visibleCount]);

  const handleClear = () => setSearchTerm('');

  const handleFilterClick = (type: FilterType) => {
    setActiveFilter(type);
    setVisibleCount(12); // Reset to first page on filter change
  };

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 12);
  };

  const hasMoreGames = visibleGames.length < filteredGames.length;

  const FilterButton = ({ label, type }: { label: string, type: FilterType }) => (
    <button
      onClick={() => handleFilterClick(type)}
      className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
        activeFilter === type
          ? 'bg-xbox-green text-white shadow-md shadow-green-900/10'
          : 'bg-transparent text-gray-500 hover:bg-gray-200'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-100 font-sans pb-20 flex flex-col">
      
      {/* Hero Section */}
      <header className="px-4 pt-12 pb-8 transition-all duration-500">
        <div className="max-w-4xl mx-auto text-center space-y-6 w-full">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-800 uppercase">
            Xbox Backwards <br />
            <span className="text-xbox-green">Compatibility</span>
          </h1>
          
          <p className="text-gray-500 text-xl max-w-2xl mx-auto">
            Search the entire library of backwards compatible games for Xbox X/S
          </p>

          <div className="pt-4 max-w-2xl mx-auto relative z-20 w-full">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                <Search className="h-6 w-6 text-gray-400 group-focus-within:text-xbox-green transition-colors" />
              </div>
              <input
                type="text"
                className="block w-full pl-14 pr-12 py-5 bg-white border-none rounded-2xl text-xl text-slate-800 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-green-500/10 shadow-xl transition-all"
                placeholder="Search for a game..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                autoFocus
              />
              {searchTerm && (
                <button 
                    onClick={handleClear}
                    className="absolute inset-y-0 right-0 pr-5 flex items-center text-gray-300 hover:text-gray-600 transition-colors"
                >
                    <X size={24} />
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Filter Section */}
      <section className="px-4 mb-10 animate-fade-in-up">
        <div className="max-w-4xl mx-auto">
            <div className="flex flex-col items-center gap-4">
                <div className="flex flex-wrap justify-center gap-2 md:gap-4 bg-gray-200/50 p-2 rounded-xl">
                    <FilterButton label="All Games" type="ALL" />
                    <FilterButton label="Xbox 360" type="360" />
                    <FilterButton label="Original Xbox" type="OG" />
                    <FilterButton label="FPS Boosted" type="FPS" />
                </div>
            </div>
        </div>
      </section>

      {/* Results Grid */}
      <main className="max-w-6xl mx-auto px-4 flex-1">
        {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 opacity-50">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-xbox-green mb-4"></div>
                <p className="text-gray-500">Loading Library...</p>
            </div>
        ) : (
            <>
                {filteredGames.length > 0 ? (
                    <div className="space-y-12">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up">
                            {visibleGames.map(game => (
                                <GameCard key={game.id} game={game} />
                            ))}
                        </div>

                        {/* Pagination / Status Pill */}
                        <div className="flex justify-center pb-8">
                            <button 
                                onClick={handleLoadMore}
                                disabled={!hasMoreGames}
                                className={`group flex items-center gap-2 px-6 py-3 rounded-full font-medium text-sm shadow-sm backdrop-blur-sm transition-all duration-300 ${
                                    hasMoreGames 
                                        ? 'bg-gray-200 hover:bg-gray-300 text-slate-700 cursor-pointer hover:shadow-md hover:scale-105 active:scale-95' 
                                        : 'bg-gray-100 text-gray-400 cursor-default'
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
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-200 mb-4">
                            <Search className="text-gray-400" size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-700 mb-2">No games found</h3>
                        <p className="text-gray-500">
                            No results found for "{searchTerm}" in {activeFilter !== 'ALL' ? 'this category' : 'the library'}.
                        </p>
                    </div>
                )}
            </>
        )}
      </main>

      <footer className="max-w-4xl mx-auto py-8 text-center text-gray-400 text-sm border-t border-gray-200 mt-8">
        <p>© {new Date().getFullYear()} Xbox Backwards Compat Tool. Not affiliated with Microsoft.</p>
      </footer>
    </div>
  );
};

export default App;