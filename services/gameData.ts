import { Game, ConsolePlatform } from '../types';

// Raw CSV data for Xbox 360 games
const raw360Data = `Title,Publisher,Format,Date Added,FPS Boost
0 Day Attack on Earth,Square Enix,XBLA,"October 26, 2017",N
3D Ultra Minigolf Adventures,Activision,XBLA,"April 20, 2017",N
50 Cent: Blood on the Sand,THQ,Disc Only,"November 15, 2021",N
Ace Combat 6: Fires of Liberation,Bandai Namco Entertainment,Disc Only,"January 16, 2019",N
Aces of the Galaxy,Activision,XBLA,"November 15, 2021",N
Adventure Time: The Secret of the Nameless Kingdom,Little Orbit,,"November 15, 2021",N
Aegis Wing,Microsoft Studios,XBLA,"January 21, 2016",N
Age of Booty,Capcom,XBLA (Delisted),"January 21, 2016",N
AirMech Arena,Ubisoft,XBLA (Delisted),"March 21, 2019",N
Alan Wake,Microsoft Studios,,"March 17, 2016",60hz
Alan Wake's American Nightmare,Microsoft Studios,XBLA,"February 11, 2016",N
Alice: Madness Returns,Electronic Arts,,"January 24, 2017",N
Alien Hominid HD,Microsoft Studios,XBLA,"November 12, 2015",N
Aliens vs. Predator,Sega,,"November 29, 2018",N
Altered Beast,Sega,XBLA (Delisted),"April 26, 2016",N
Anomaly: Warzone Earth,Microsoft Studios,XBLA,"June 7, 2016",N
Aqua,Microsoft Studios,XBLA,"June 7, 2016",N
Are You Smarter Than A 5th Grader?,THQ,XBLA,"November 15, 2021",N
Arkanoid Live!,Taito Corporation,XBLA,"September 8, 2016",N
Army of Two,Electronic Arts,,"March 28, 2017",N
Assassin's Creed,Ubisoft,,"March 21, 2016",N
Assassin's Creed II,Ubisoft,,"November 12, 2015",N
Assassin's Creed III,Ubisoft,Disc Only,"May 23, 2017",N
Assassin's Creed Liberation HD,Ubisoft,XBLA (Delisted),"July 3, 2018",N
Assassin's Creed IV: Black Flag,Ubisoft,Disc Only,"April 3, 2018",N
Assassin's Creed: Brotherhood,Ubisoft,Disc Only,"June 27, 2017",N
Assassin's Creed Revelations,Ubisoft,,"March 23, 2017",N
Assassin's Creed Rogue,Ubisoft,,"February 23, 2017",N
Assault Heroes 2,Activision,XBLA,"April 25, 2017",N
Asteroids & Deluxe,Atari,XBLA,"November 12, 2015",N
AstroPop,Electronic Arts,XBLA,"November 29, 2016",N
Asura's Wrath,Capcom,,"June 10, 2019",N
Avatar: The Last Airbender – The Burning Earth,THQ,,"November 15, 2021",N
Axel & Pixel,2K Games,XBLA (Delisted),"March 13, 2018",N
Babel Rising,Ubisoft,XBLA (Delisted),"June 16, 2016",N
Band of Bugs,Microsoft Studios,XBLA,"May 4, 2017",N
Banjo-Kazooie,Microsoft Studios,XBLA,"November 12, 2015",N
Banjo-Kazooie: Nuts & Bolts,Microsoft Game Studios,,"November 12, 2015",N
Banjo-Tooie,Microsoft Studios,XBLA,"November 12, 2015",N
Bankshot Billiards 2,Microsoft Studios,XBLA,"November 15, 2021",N
Batman: Arkham Origins,Warner Bros. Interactive Entertainment,Disc Only,"August 8, 2017",N
BattleBlock Theater,Microsoft Studios,XBLA,"November 12, 2015",N
Battlefield 1943,Electronic Arts,XBLA (Delisted),"May 24, 2018",N
Battlefield 2: Modern Combat,Electronic Arts,Disc Only,"June 10, 2019",N
Battlefield 3,Electronic Arts,Disc Only,"January 10, 2017",N
Battlefield: Bad Company,Electronic Arts,Disc Only,"August 17, 2017",N
Battlefield: Bad Company 2,Electronic Arts,Disc Only,"January 10, 2017",N
Battlestations: Pacific,Eidos Interactive,,"January 10, 2019",N
Battlestations: Midway,Eidos Interactive,,"October 11, 2016",N
Bayonetta,Sega,,"September 8, 2016",N
Beat'n Groovy,Konami,XBLA,"January 12, 2017",N
Beautiful Katamari,Namco,,"November 15, 2021",N
Bejeweled 2,Microsoft Studios,XBLA,"November 12, 2015",N
Bejeweled 3,PopCap Games,XBLA,"September 6, 2016",N
Bellator: MMA Onslaught,345 Games,XBLA,"November 12, 2015",N
Beyond Good & Evil HD,Ubisoft,XBLA (Delisted),"November 12, 2015",N
Binary Domain,Sega,,"November 15, 2021",60hz
Bionic Commando Rearmed 2,Capcom,XBLA,"July 21, 2016",N
BioShock,2K Games,,"December 13, 2016",N
BioShock 2,2K Games,,"December 13, 2016",N
BioShock Infinite,2K Games,,"December 13, 2016",N
Black College Football: BCFX: The Xperience,Aspyr,,"November 15, 2021",N
Blazing Angels: Squadrons of WWII,Ubisoft,Disc Only,"June 27, 2017",N
Blood Knights,Kalypso Media,XBLA,"June 23, 2016",N
Blood of the Werewolf,Midnight City,XBLA,"November 12, 2015",N
Bloodforge,Microsoft Studios,XBLA,"June 30, 2016",N
BloodRayne: Betrayal,Majesco Entertainment,XBLA (Delisted),"November 12, 2015",N
Blue Dragon,Microsoft Studios,,"November 1, 2016",N
Bolt,Disney Interactive Studios,,"August 8, 2017",N
Bomberman Live: Battlefest,Hudson Soft,XBLA,"August 18, 2016",N
Boom Boom Rocket,Electronic Arts,XBLA,"July 26, 2016",N
Borderlands,2K Games,,"November 12, 2015",N
Borderlands 2,2K Games,,"February 23, 2017",N
Bound by Flame,Focus Home Interactive,,"September 15, 2016",N
Braid,Microsoft Studios,XBLA,"December 17, 2015",N
Brain Challenge,Microsoft Studios,XBLA,"June 16, 2016",N
Brave: The Video Game,Disney Interactive Studios,,"February 20, 2018",N
Brothers in Arms: Hell's Highway,Ubisoft,,"March 21, 2019",N
Brütal Legend,Double Fine Productions,,"September 18, 2018",N
Bullet Soul,5pb.,,"May 4, 2017",N
Bullet Soul -Infinite Burst-,5pb.,,"May 4, 2017",N
Bully: Scholarship Edition,Rockstar Games,,"December 15, 2016",N
The Bureau: XCOM Declassified,2K Games,,"December 4, 2018",N
Burnout Paradise,Electronic Arts,Disc Only,"November 22, 2016",N
Burnout Revenge,Electronic Arts,,"May 8, 2018",N
Cabela's Alaskan Adventures,Activision,Disc Only,"April 27, 2017",N
Cabela's Dangerous Hunts 2013,Activision,Disc Only,"April 27, 2017",N
Cabela's Hunting Expeditions,Activision,Disc Only,"April 27, 2017",N
Cabela's Survival: Shadows of Katmai,Activision,Disc Only,"April 27, 2017",N
Call of Duty 2,Activision,,"August 23, 2016",N
Call of Duty 3,Activision,,"September 22, 2016",N
Call of Duty 4: Modern Warfare,Activision,,"March 29, 2018",N
Call of Duty: Advanced Warfare,Activision,Disc Only,"September 28, 2017",N
Call of Duty: Black Ops,Activision,,"May 17, 2016",N
Call of Duty: Black Ops II,Activision,,"April 11, 2017",N
Call of Duty: Ghosts,Activision,Disc Only,"June 29, 2017",N
Call of Duty: Modern Warfare 2,Activision,,"August 28, 2018",N
Call of Duty: Modern Warfare 3,Activision,,"June 19, 2018",N
Call of Duty: World at War,Activision,,"September 27, 2016",N
Call of Juarez: Bound in Blood,Techland,,"September 25, 2018",N
Call of Juarez: The Cartel,Techland,,"September 25, 2018",N
Call of Juarez: Gunslinger,Techland,XBLA,"November 12, 2015",N
Capcom Arcade Cabinet,Capcom,XBLA,"July 21, 2016",N
Carcassonne,Microsoft Studios,XBLA,"February 26, 2016",N
Cars Mater-National Championship,Disney Interactive Studios,,"November 14, 2017",N
Cars 2: The Video Game,Disney Interactive Studios,,"March 2, 2017",N
Castle Crashers,Microsoft Studios,XBLA (Delisted),"November 12, 2015",N
Castle of Illusion Starring Mickey Mouse,Sega,XBLA,"August 30, 2016",N
CastleStorm,Microsoft Studios,XBLA,"November 12, 2015",N
Castlevania: Harmony of Despair,Konami,XBLA,"March 14, 2019",N
Castlevania: Lords of Shadow,Konami,,"October 30, 2018",N
Castlevania: Lords of Shadow 2,Konami,,"October 30, 2018",N
Castlevania: Lords of Shadow – Mirror of Fate HD,Konami,XBLA,"October 30, 2018",N
Castlevania: Symphony of the Night,Konami,XBLA,"March 17, 2016",N
Catherine,Atlus,,"December 15, 2016",N
The Cave,Sega,XBLA (Delisted),"April 26, 2016",N
Centipede & Millipede,Atari,XBLA,"November 12, 2015",N
Child of Eden,Ubisoft,Disc Only,"October 12, 2017",N
Clannad,Prototype,,"December 15, 2016",N
Cloning Clyde,Microsoft Studios,XBLA,"November 15, 2021",N
Comic Jumper: The Adventures of Captain Smiley,Microsoft Studios,XBLA,"June 23, 2016",N
Comix Zone,Sega,XBLA,"April 26, 2016",N
Command & Conquer 3: Kane's Wrath,Electronic Arts,,"January 24, 2019",N
Command & Conquer 3: Tiberium Wars,Electronic Arts,,"January 24, 2019",N
Command & Conquer: Red Alert 3,Electronic Arts,,"January 24, 2019",N
Command & Conquer: Red Alert 3 – Commander's Challenge,Electronic Arts,XBLA,"January 24, 2019",N
Commanders: Attack of the Genos,Activision,XBLA,"April 25, 2017",N
Conan,THQ,,"November 15, 2021",N
Condemned: Criminal Origins,Sega,Disc Only,"November 12, 2015",N
Contra,Konami,XBLA,"April 20, 2017",N
Costume Quest,THQ,XBLA,"May 7, 2019",N
Costume Quest 2,Midnight City,XBLA,"July 18, 2017",N
Counter-Strike: Global Offensive,Valve,XBLA (Delisted),"January 21, 2016",N
Crackdown,Microsoft Studios,,"February 27, 2018",N
Crackdown 2,Microsoft Game Studios,,"March 8, 2019",N
Crazy Taxi,Sega,XBLA (Delisted),"November 12, 2015",N
Crysis,Electronic Arts,XBLA,"October 16, 2018",N
Crysis 2,Electronic Arts,,"October 16, 2018",N
Crysis 3,Electronic Arts,Disc Only,"October 16, 2018",N
Crystal Defenders,Square Enix,XBLA,"July 21, 2016",N
Crystal Quest,Microsoft Studios,XBLA,"June 23, 2016",N
Cyber Troopers Virtual-On Oratorio Tangram,Sega,XBLA,"June 27, 2017",N
Dante's Inferno,Electronic Arts,Disc Only,"July 17, 2018",N
Dark Souls,Bandai Namco Entertainment,Disc Only,"March 23, 2016",N
Dark Void,Capcom,,"March 21, 2016",N
The Darkness,2K Games,,"December 4, 2018",N
The Darkness II,2K Games,,"January 30, 2018",N
Darksiders,THQ,,"March 23, 2017",60hz
Darksiders II,THQ,Disc Only,"March 23, 2017",N
Darwinia+,Microsoft Studios,XBLA,"November 15, 2021",N
Daytona USA,Sega,XBLA (Delisted),"March 21, 2017",N
de Blob 2,THQ,,"September 8, 2016",N
Dead or Alive 4,Tecmo,,"November 15, 2021",N
Dead Rising 2: Case West,Capcom,XBLA,"March 2, 2017",N
Dead Rising 2: Case Zero,Capcom,XBLA,"March 2, 2017",N
Dead Space,Electronic Arts,,"March 30, 2016",N
Dead Space 2,Electronic Arts,,"April 27, 2017",60hz
Dead Space 3,Electronic Arts,,"April 27, 2017",60hz
Dead Space Ignition,Electronic Arts,XBLA,"November 15, 2016",N
Deadfall Adventures,Nordic Games,,"October 26, 2017",N
Deadliest Warrior: Legends,345 Games Spike Games,XBLA,"November 12, 2015",N
Deadliest Warrior: The Game,Spike Games,XBLA,"August 8, 2017",N
Deadly Premonition,Marvelous Entertainment,,"November 2, 2017",N
Death by Cube,Square Enix,XBLA,"November 15, 2021",N
DeathSpank: Thongs of Virtue,Electronic Arts,XBLA,"September 6, 2016",N
Defense Grid: The Awakening,Microsoft Studios,XBLA (Delisted),"November 12, 2015",N
Deus Ex: Human Revolution,Eidos Interactive,,"December 17, 2015",N
Deus Ex: Human Revolution Director's Cut,Eidos Interactive,Disc Only,"May 10, 2016",N
Dig Dug,Bandai Namco Entertainment,XBLA,"May 5, 2016",N
Dirt 3,Codemasters,Disc Only,"November 12, 2015",N
Dirt: Showdown,Codemasters,Disc Only,"November 12, 2015",N
Discs of Tron,Disney Interactive Studios,XBLA,"November 12, 2015",N
Disney Universe,Disney Interactive Studios,,"November 15, 2021",N
Divinity II,Focus Home Interactive,,"April 3, 2018",N
Domino Master,Microsoft Studios,XBLA,"May 24, 2016",N
Doom,Bethesda Softworks,XBLA (Delisted),"November 12, 2015",N
Doom 3: BFG Edition,Bethesda Softworks,Disc Only,"April 14, 2016",N
Doom II: Hell on Earth,Bethesda Softworks,XBLA (Delisted),"November 12, 2015",N
Doritos Crash Course,Microsoft Studios,XBLA,"December 17, 2015",N
Double Dragon Neon,Majesco Entertainment,XBLA,"April 26, 2016",N
Dragon Age: Origins,Electronic Arts,,"January 10, 2017",60hz
Dragon Age II,Electronic Arts,,"May 3, 2018",60hz
Dragon's Lair,Microsoft Studios,XBLA,"October 11, 2016",N
Driver: San Francisco,Ubisoft,Disc Only,"January 16, 2018",N
DuckTales: Remastered,Capcom,,"May 24, 2016",N
Duke Nukem Forever,2K Games,,"December 4, 2018",N
Duke Nukem: Manhattan Project,Gearbox Software,XBLA,"April 12, 2016",N
Dungeon Siege III,Square Enix,,"November 16, 2015",N
Dungeons & Dragons: Chronicles of Mystara,Capcom,XBLA,"June 23, 2016",N
Earth Defense Force 2017,D3 Publisher,,"November 30, 2017",N
Earth Defense Force 2025,D3 Publisher,,"August 7, 2018",N
Earth Defense Force: Insect Armageddon,D3 Publisher,,"July 11, 2017",N
Earthworm Jim HD,Microsoft Studios,XBLA (Delisted),"November 12, 2015",N
Eat Lead: The Return of Matt Hazard,D3 Publisher,,"October 13, 2016",N
The Elder Scrolls IV: Oblivion,Bethesda,,"November 29, 2016",60hz
Elements of Destruction,THQ,XBLA,"November 15, 2021",N
Enchanted Arms,Ubisoft,Disc Only,"June 10, 2019",N
Encleverment Experiment,Microsoft Studios,XBLA,"September 27, 2016",N
Enslaved: Odyssey to the West,Bandai Namco Entertainment,,"June 10, 2019",N
Epic Mickey 2: The Power of Two,Disney Interactive Studios,,"August 3, 2017",N
Escape Dead Island,Deep Silver,,"November 15, 2016",N
Every Extend Extra Extreme,Q Entertainment,XBLA,"September 27, 2016",N
F.E.A.R.,Vivendi Universal Games,Disc Only,"November 15, 2021",60hz
F.E.A.R. 2: Project Origin,Warner Bros. Interactive Entertainment,,"November 15, 2021",N
F.E.A.R. 3,Warner Bros. Interactive Entertainment,,"November 15, 2021",60hz
F.E.A.R. Files,Vivendi Universal Games,Disc Only,"November 15, 2021",N
F1 2014,Codemasters,Disc Only,"July 11, 2017",N
Fable Anniversary,Xbox Game Studios,,"October 5, 2017",60hz
Fable Heroes,Microsoft Studios,XBLA,"June 26, 2018",N
Fable II,Xbox Game Studios,,"November 12, 2015",N
Fable II Pub Games,Microsoft Studios,XBLA,"October 5, 2017",N
Fable III,Xbox Game Studios,,"December 17, 2015",60hz
Faery: Legends of Avalon,Focus Home Interactive,XBLA,"May 10, 2016",N
Fallout 3,Bethesda Softworks,,"November 12, 2015",60hz
Fallout: New Vegas,Bethesda Softworks,,"June 23, 2016",60hz
Far Cry 2,Ubisoft,,"January 16, 2018",N
Far Cry 3,Ubisoft,,"March 30, 2017",60hz
Far Cry 3: Blood Dragon,Ubisoft,XBLA,"August 9, 2016",N
Far Cry Classic,Ubisoft,XBLA,"June 10, 2019",N
Far Cry Instincts: Predator,Ubisoft,,"June 10, 2019",N
Feeding Frenzy,Electronic Arts,XBLA,"November 12, 2015",N
Feeding Frenzy 2: Shipwreck Showdown,PopCap Games,XBLA,"November 12, 2015",N
Fight Night Champion,Electronic Arts,,"May 15, 2018",N
Fighting Vipers,Sega,XBLA,"August 8, 2017",N
Final Fantasy XIII,Square Enix,,"November 13, 2018",N
Final Fantasy XIII-2,Square Enix,,"November 13, 2018",60hz
Final Fight: Double Impact,Capcom,XBLA (Delisted),"May 10, 2016",N
The First Templar,Kalypso Media,,"November 15, 2021",N
Flashback,Ubisoft,XBLA,"June 16, 2016",N
Flock!,Capcom,XBLA,"July 19, 2016",N
Forza Horizon,Microsoft Studios,Disc Only,"August 30, 2016",N
Foul Play,Sold Out,XBLA,"June 9, 2016",N
Fret Nice,Tecmo,XBLA,"July 21, 2016",N
Frogger,Konami,XBLA,"April 28, 2016",N
Frogger 2,Konami,XBLA,"May 10, 2016",N
From Dust,Ubisoft,,"May 7, 2019",N
Frontlines: Fuel of War,THQ,,"July 18, 2017",N
Fuel,Codemasters,Disc Only,"January 10, 2019",N
FunTown Mahjong,Microsoft Studios,XBLA,"September 27, 2016",N
Galaga,Namco Bandai Games,XBLA,"February 15, 2016",N
Galaga Legions,Bandai Namco Entertainment,XBLA,"October 20, 2016",N
Galaga Legions DX,Bandai Namco Entertainment,XBLA,"April 28, 2016",N
Garou: Mark of the Wolves,SNK Playmore,XBLA,"April 12, 2016",N
Gatling Gears,Intergrow,XBLA,"September 6, 2016",N
Gears of War,Microsoft Studios,,"November 12, 2015",60hz
Gears of War 2,Microsoft Studios,,"November 12, 2015",60hz
Gears of War 3,Microsoft Studios,,"November 12, 2015",60hz
Gears of War: Judgment,Microsoft Studios,,"November 12, 2015",60hz
Geometry Wars 3: Dimensions,Sierra,XBLA,"May 2, 2017",N
Geometry Wars: Retro Evolved,Microsoft Studios,XBLA,"February 25, 2016",N
Geometry Wars: Retro Evolved 2,Activision,XBLA,"May 2, 2017",N
Ghostbusters: Sanctum of Slime,Atari,XBLA,"April 26, 2016",N
Ghostbusters: The Video Game,Atari,,"January 10, 2017",N
Gin Rummy,Activision,XBLA,"April 20, 2017",N
Girl Fight,Majesco Entertainment,XBLA,"October 26, 2017",N
Go! Go! Break Steady,Microsoft Studios,XBLA,"June 30, 2016",N
Goat Simulator,Double Eleven Limited,XBLA,"October 12, 2017",N
Golden Axe,Sega,XBLA,"November 12, 2015",N
Golf: Tee It Up!,Activision,XBLA,"April 20, 2017",N
Grand Theft Auto IV,Rockstar Games,,"February 9, 2017",N
Grand Theft Auto: San Andreas,Rockstar Games,Disc Only,"June 7, 2018",N
Greg Hastings Paintball 2,Majesco Entertainment,Disc Only,"September 18, 2018",N
Grid 2,Codemasters,Disc Only,"March 21, 2016",N
Grid Autosport,Codemasters,Disc Only,"June 26, 2018",N
GripShift,Microsoft Studios,XBLA,"June 30, 2016",N
Guardian Heroes,Sega,XBLA,"November 8, 2016",N
Gunstar Heroes,Sega,XBLA,"April 6, 2016",N
Guwange,CAVE,XBLA,"September 29, 2016",N
Gyromancer,Square Enix,XBLA,"February 23, 2017",N
Gyruss,Konami,XBLA,"July 25, 2017",N
Half-Minute Hero: Super Mega Neo Climax,Microsoft Studios,XBLA,"July 19, 2016",N
Halo 3,Microsoft Studios,Disc Only,"September 21, 2017",N
Halo 3: ODST Campaign Edition,Microsoft Studios,Disc Only,"September 21, 2017",N
Halo 4,Microsoft Studios,Disc Only,"September 21, 2017",N
Halo: Combat Evolved Anniversary,Microsoft Studios,Disc Only,"September 21, 2017",N
Halo: Reach,Microsoft Studios,Disc Only,"December 17, 2015",N
Halo: Spartan Assault,Microsoft Studios,XBLA (Delisted),"November 12, 2015",120hz
Halo Wars,Microsoft Studios,Disc Only,"March 28, 2016",N
Hard Corps: Uprising,Konami,XBLA,"May 4, 2017",N
Hardwood Backgammon,Microsoft Studios,XBLA,"November 12, 2015",N
Hardwood Hearts,Microsoft Studios,XBLA,"November 12, 2015",N
Hardwood Spades,Microsoft Studios,XBLA,"November 12, 2015",N
Harms Way,Microsoft Studios,XBLA,"May 4, 2017",N
Haunted House,Atari,XBLA,"December 1, 2016",N
Heavy Weapon,Electronic Arts,XBLA,"November 12, 2015",N
Hexic 2,Microsoft Studios,XBLA,"May 24, 2016",N
Hexic HD,Microsoft Studios,XBLA,"November 12, 2015",N
Hitman: Absolution,Square Enix,,"February 14, 2017",N
Hitman: Blood Money,IO Interactive,,"March 6, 2018",N
Hitman HD Pack,IO Interactive,,"May 9, 2019",N
Hydro Thunder Hurricane,Microsoft Studios,XBLA,"December 17, 2015",N
Hydrophobia,Microsoft Studios,XBLA,"February 26, 2019",N
I Am Alive,Ubisoft,XBLA (Delisted),"June 23, 2016",N
Ikaruga,Microsoft Studios,XBLA,"November 12, 2015",N
ilomilo,Microsoft Studios,XBLA,"May 23, 2017",N
Infinite Undiscovery,Square Enix,,"June 10, 2019",N
Injustice: Gods Among Us,Warner Bros. Interactive Entertainment,,"December 1, 2016",N
Insanely Twisted Shadow Planet,Microsoft Studios,XBLA,"April 4, 2017",N
Interpol: The Trail of Dr. Chaos,Microsoft Studios,XBLA,"July 14, 2016",N
Iron Brigade,Microsoft Studios,XBLA (Delisted),"December 17, 2015",N
Islands of Wakfu,Microsoft Studios,XBLA,"November 15, 2021",N
Jeremy McGrath's Offroad,D3 Publisher,XBLA,"January 21, 2016",N
Jet Set Radio HD,Sega,XBLA (Delisted),"May 3, 2016",N
Jetpac Refuelled,Microsoft Studios,XBLA,"November 12, 2015",N
Jewel Quest,Microsoft Studios,XBLA,"November 14, 2017",N
Joe Danger 2: The Movie,Microsoft Studios,XBLA,"October 20, 2016",N
Joe Danger: Special Edition,Microsoft Studios,XBLA,"June 23, 2016",N
Joust,Warner Bros. Interactive Entertainment,XBLA,"August 25, 2016",N
Joy Ride Turbo,Microsoft Studios,XBLA,"November 12, 2015",N
Juju,Nordic Games,XBLA,"January 31, 2017",N
Jurassic Park: The Game,Telltale Games,Disc Only,"October 11, 2016",N
Just Cause,Eidos Interactive,,"October 30, 2018",N
Just Cause 2,Square Enix,,"November 12, 2015",N
Kameo: Elements of Power,Microsoft Studios,,"November 12, 2015",60hz
Kane & Lynch 2: Dog Days,Square Enix,,"December 17, 2015",N
Killer Is Dead,XSEED Games,,"October 27, 2016",N
A Kingdom for Keflings,Microsoft Studios,XBLA,"November 12, 2015",N
Kingdoms of Amalur: Reckoning,Electronic Arts,Disc Only,"November 29, 2018",N
The King of Fighters '98 Ultimate Match,SNK Playmore,XBLA,"March 28, 2016",N
The King of Fighters 2002 Unlimited Match,SNK Playmore,XBLA,"February 23, 2017",N
King of Fighters: Sky Stage,SNK Playmore,XBLA,"October 12, 2017",N
The King of Fighters XIII,SNK,,"February 12, 2019",N
Lara Croft and the Guardian of Light,Crystal Dynamics,XBLA,"February 20, 2018",N
Lazy Raiders,Microsoft Studios,XBLA,"June 7, 2016",N
Left 4 Dead,Valve,Disc Only,"June 16, 2016",N
Left 4 Dead 2,Valve,Disc Only,"March 29, 2016",N
Lego Batman 2: DC Super Heroes,Warner Bros. Interactive Entertainment,,"January 31, 2019",N
Lego Batman: The Videogame,Warner Bros. Interactive Entertainment,,"February 11, 2016",N
Lego Indiana Jones 2: The Adventure Continues,Disney Interactive Studios,,"January 25, 2018",N
Lego Indiana Jones: The Original Adventures,Disney Interactive Studios,,"February 7, 2017",N
Lego The Lord of the Rings,Warner Bros. Interactive Entertainment,Disc Only,"November 15, 2021",60hz
Lego Pirates of the Caribbean: The Video Game,Disney Interactive Studios,,"November 12, 2015",N
Lego Star Wars: The Complete Saga,Disney Interactive Studios,,"November 12, 2015",N
Lego Star Wars II: The Original Trilogy,Disney Interactive Studios,,"October 23, 2018",N
Lego Star Wars III: The Clone Wars,Disney Interactive Studios,,"March 6, 2018",N
Lightning Returns: Final Fantasy XIII,Square Enix,,"November 13, 2018",60hz
Limbo,Microsoft Studios,XBLA (Delisted),"November 3, 2016",N
Lode Runner,Microsoft Studios,XBLA,"November 12, 2015",N
Lost Odyssey,Microsoft Studios,,"September 29, 2016",N
Lost Planet 2,Capcom,,"February 21, 2019",N
Lost Planet 3,Capcom,,"February 21, 2019",N
Lost Planet: Colonies,Capcom,,"February 21, 2019",N
Lost Planet: Extreme Condition,Capcom,Disc Only,"February 21, 2019",N
Lumines Live!,Microsoft Studios,XBLA,"November 12, 2015",N
Luxor 2,Microsoft Studios,XBLA,"March 16, 2017",N
Madballs in Babo: Invasion,Microsoft Studios,XBLA,"March 16, 2017",N
Mad Tracks,Microsoft Studios,XBLA (Delisted),"January 31, 2017",N
Mafia II,2K Games,,"February 13, 2018",N
Magic: The Gathering - Duels of the Planeswalkers,Microsoft Studios,XBLA (Delisted),"January 18, 2018",N
Magic: The Gathering - Duels of the Planeswalkers 2012,Microsoft Studios,XBLA (Delisted),"May 24, 2016",N
Magic: The Gathering - Duels of the Planeswalkers 2013,Microsoft Studios,XBLA (Delisted),"January 18, 2018",N
Magic: The Gathering – Duels of the Planeswalkers 2014,Microsoft Studios,XBLA (Delisted),"January 18, 2018",N
Marathon 2: Durandal,Microsoft Studios,XBLA,"February 26, 2019",N
Marlow Briggs and the Mask of Death,505 Games,XBLA,"November 28, 2017",N
Mars: War Logs,Focus Home Interactive,XBLA,"June 30, 2016",N
Mass Effect,Microsoft Studios,,"November 12, 2015",N
Mass Effect 2,Electronic Arts,,"November 7, 2016",N
Mass Effect 3,Electronic Arts,,"November 7, 2016",N
Matt Hazard: Blood Bath and Beyond,D3 Publisher,XBLA,"May 23, 2017",N
The Maw,Microsoft Studios,XBLA,"September 15, 2016",N
Max Payne 3,Rockstar Games,,"November 15, 2021",N
Medal of Honor: Airborne,Electronic Arts,,"November 29, 2016",60hz
Meet the Robinsons,Disney Interactive Studios,,"March 2, 2017",N
Mega Man 9,Capcom,XBLA,"January 12, 2017",N
Mega Man 10,Capcom,XBLA,"January 12, 2017",N
Metal Gear Rising: Revengeance,Konami,,"August 15, 2017",N
Metal Gear Solid HD Collection,Konami,Disc Only,"October 9, 2018",N
Metal Gear Solid: Peace Walker - HD Edition,Konami,,"March 13, 2018",N
Metal Slug 3,SNK Playmore,XBLA,"November 12, 2015",N
Metal Slug XX,SNK Playmore,XBLA,"November 12, 2015",N
Midnight Club: Los Angeles,Rockstar Games,,"June 7, 2018",N
Midway Arcade Origins,Warner Bros. Interactive Entertainment,,"January 19, 2017",N
Might & Magic: Clash of Heroes,Ubisoft,XBLA,"November 12, 2015",N
Military Madness: Nectaris,Hudson Soft,XBLA,"November 17, 2016",N
Mini Ninjas,Square Enix,,"November 15, 2021",N
Mirror's Edge,Electronic Arts,,"November 12, 2015",N
The Misadventures of P.B. Winterbottom,2K Play,XBLA,"January 30, 2018",N
Missile Command,Atari,XBLA,"November 12, 2015",N
Monaco: What's Yours Is Mine,Majesco Entertainment,XBLA,"April 14, 2016",N
Monday Night Combat,Microsoft Studios,XBLA,"November 12, 2015",N
Monkey Island 2 Special Edition: LeChuck's Revenge,Disney Interactive Studios,XBLA,"November 12, 2015",N
Monopoly Deal,Ubisoft,XBLA (Delisted),"September 14, 2017",N
Monopoly Plus,Ubisoft,XBLA (Delisted),"June 9, 2016",N
Moon Diver,Square Enix,XBLA,"February 23, 2017",N
Mortal Kombat,Warner Bros. Interactive Entertainment,Disc Only,"November 15, 2021",N
Mortal Kombat vs. DC Universe,Midway Games,Disc Only,"November 15, 2021",N
Motocross Madness,Microsoft Studios,XBLA (Delisted),"December 17, 2015",N
Mr. Driller Online,Namco,XBLA (Delisted),"August 2, 2016",N
Ms. Pac-Man,Bandai Namco Entertainment,XBLA (Delisted),"December 17, 2015",N
Ms. Splosion Man,Microsoft Studios,XBLA,"November 12, 2015",N
Mutant Storm Empire,Microsoft Studios,XBLA,"January 19, 2017",N
Mutant Storm Reloaded,Microsoft Studios,XBLA,"October 26, 2017",N
MX vs. ATV Alive,THQ,,"November 15, 2021",N
MX vs. ATV Reflex,THQ,,"May 3, 2016",N
MX vs. ATV Untamed,THQ,,"November 15, 2021",N
N+,Microsoft Studios,XBLA (Delisted),"November 12, 2015",N
NBA Jam: On Fire Edition,Electronic Arts,XBLA (Delisted),"November 12, 2015",N
NeoGeo Battle Coliseum,SNK Playmore,XBLA,"July 21, 2016",N
New Rally-X,Bandai Namco Entertainment,XBLA (Delisted),"August 2, 2016",N
Nier,Square Enix,,"November 15, 2021",N
Nights into Dreams,Sega,XBLA (Delisted),"November 12, 2015",N
Nin2-Jump,CAVE,XBLA,"August 2, 2016",N
Ninja Gaiden 3: Razor's Edge,Koei Tecmo,,"May 2, 2019",N
Ninja Gaiden II,Tecmo,,"April 16, 2019",N
Novadrome,Microsoft Studios,XBLA,"November 15, 2021",N
Of Orcs and Men,Focus Home Interactive,,"September 8, 2016",N
Omega Five,Hudson Soft,XBLA,"November 17, 2016",N
Onechanbara: Bikini Samurai Squad,D3 Publisher,,"November 15, 2021",N
Operation Flashpoint: Dragon Rising,Codemasters,Disc Only,"November 12, 2015",N
Operation Flashpoint: Red River,Codemasters,Disc Only,"November 8, 2016",N
The Orange Box,Valve,Disc Only,"October 20, 2016",N
Orcs Must Die!,Microsoft Studios,XBLA,"February 12, 2019",N
The Outfit,THQ,,"November 15, 2021",N
Outland,Ubisoft,XBLA,"April 6, 2016",N
Outpost Kaloki X,Microsoft Studios,,"November 15, 2021",N
Overlord,Codemasters,Disc Only,"July 10, 2018",N
Overlord II,Codemasters,Disc Only,"July 10, 2018",N
Pac-Man,Bandai Namco Entertainment,XBLA,"March 17, 2016",N
Pac-Man Championship Edition,Bandai Namco Entertainment,XBLA,"November 12, 2015",N
Pac-Man Championship Edition DX,Bandai Namco Entertainment,XBLA,"November 12, 2015",N
Pac-Man Museum,Bandai Namco Entertainment,XBLA (Delisted),"July 21, 2016",N
Peggle,PopCap Games,XBLA,"December 17, 2015",N
Peggle 2,Electronic Arts,XBLA (Delisted),"November 28, 2017",N
Perfect Dark,Microsoft Studios,XBLA,"November 12, 2015",N
Perfect Dark Zero,Microsoft Studios,,"November 12, 2015",N
Persona 4 Arena,Atlus,Disc Only,"November 14, 2017",N
Peter Jackson's King Kong,Ubisoft,Disc Only,"June 10, 2019",N
Phantasy Star II,Sega,XBLA,"May 5, 2016",N
Phantom Breaker: Battle Grounds,Mages,XBLA,"November 12, 2015",N
Pinball FX,Microsoft Studios,XBLA (Delisted),"November 12, 2015",N
Planets Under Attack,Topware Interactive,XBLA,"December 15, 2016",N
Plants vs. Zombies,PopCap Games,XBLA,"November 12, 2015",N
Port Royale 3: Pirates & Merchants,Kalypso Media,,"January 31, 2019",N
Portal 2,Valve,,"June 16, 2016",N
Portal: Still Alive,Valve,XBLA,"December 17, 2015",N
Prey,2K Games,,,60hz
Prince of Persia,Ubisoft,,"August 7, 2018",N
Prince of Persia: The Forgotten Sands,Ubisoft,,"June 10, 2019",N
Prince of Persia Classic,Ubisoft,XBLA,"November 12, 2015",N
Pure,Disney Interactive Studios,Disc Only,"November 22, 2016",N
Putty Squad,System 3 Software Limited,XBLA,"November 12, 2015",N
Puzzle Quest 2,D3 Publisher,XBLA,"October 4, 2016",N
Puzzle Quest: Challenge of the Warlords,D3 Publisher,XBLA,"October 13, 2016",N
Puzzle Quest: Galactrix,D3 Publisher,XBLA,"October 4, 2016",N
Puzzlegeddon,Tecmo,XBLA,"May 10, 2016",N
Qix++,Taito Corporation,XBLA,"September 8, 2016",N
Quake Arena Arcade,Bethesda Softworks,XBLA,"November 15, 2021",N
Quantum Conundrum,Square Enix,XBLA,"July 18, 2017",N
R-Type Dimensions,Microsoft Studios,XBLA,"November 12, 2015",N
Radiant Silvergun,Microsoft Studios,XBLA,"June 27, 2017",N
Rage,Bethesda Softworks,,"October 27, 2016",N
Raiden IV,Moss,Disc Only,"July 25, 2017",N
Raskulls,Microsoft Studios,XBLA,"December 15, 2016",N
RAW: Realms of Ancient War,Focus Home Interactive,XBLA,"November 15, 2021",N
Rayman 3 HD,Ubisoft,XBLA,"November 12, 2015",N
Rayman Legends,Ubisoft,,"November 22, 2016",N
Rayman Origins,Ubisoft,,"April 21, 2016",N
Rayman Raving Rabbids,Ubisoft,,"January 10, 2019",N
Red Dead Redemption,Rockstar Games,,"July 8, 2016",N
Red Faction: Armageddon,THQ,,"July 25, 2017",N
Red Faction: Battlegrounds,THQ,XBLA,"June 23, 2016",N
Resident Evil Code: Veronica X,Capcom,XBLA,"February 21, 2019",N
Resident Evil: Operation Raccoon City,Capcom,,"November 15, 2021",60hz
Ridge Racer 6,Namco,,"November 15, 2021",N
Rio,THQ,Disc Only,"November 15, 2021",N
Risen,Deep Silver,,"November 15, 2021",N
Risen 2: Dark Waters,Deep Silver,,"November 15, 2021",N
RoboBlitz,Microsoft Studios,XBLA,"April 20, 2017",N
Rock of Ages,Atlus,XBLA,"November 15, 2021",60hz
Rocket Knight,Konami,XBLA,"January 26, 2017",N
Rockstar Games Presents Table Tennis,Rockstar Games,,"June 7, 2018",N
R.U.S.E.,Ubisoft,Disc Only,"July 17, 2018",N
Rumble Roses XX,Konami,,"September 11, 2018",N
Runner2,Aksys Games,XBLA,"May 5, 2016",N
Sacred 2: Fallen Angel,Deep Silver,,"November 15, 2021",N
Sacred 3,Deep Silver,,"December 16, 2015",N
Sacred Citadel,Deep Silver,XBLA,"November 12, 2015",N
Saints Row,Koch Media,,"May 29, 2018",N
Saints Row 2,Koch Media,,"May 1, 2018",N
Saints Row: Gat out of Hell,Deep Silver,,"May 29, 2018",N
Saints Row: The Third,Koch Media,,"September 14, 2017",N
Saints Row IV,Deep Silver,,"March 31, 2016",N
Sam & Max Beyond Time and Space,Microsoft Studios,XBLA,"February 11, 2016",N
Sam & Max Save the World,Microsoft Studios,XBLA,"January 21, 2016",N
Samurai Shodown II,SNK Playmore,XBLA,"May 5, 2016",N
Scarygirl,Square Enix,XBLA,"November 10, 2016",N
Scramble,Konami,XBLA,"November 15, 2021",N
Scrap Metal,Microsoft Studios,XBLA,"January 10, 2017",N
Screamride,Microsoft Studios,,"August 15, 2017",N
Screwjumper!,THQ,XBLA (Delisted),"November 15, 2021",N
The Secret of Monkey Island: Special Edition,Disney Interactive Studios,XBLA,"November 12, 2015",N
Sega Bass Fishing,Sega,XBLA,"June 9, 2016",N
"Sega Vintage Collection: Alex Kidd & Co. (Alex Kidd in Miracle World, Super Hang-On, The Revenge of Shinobi)",Sega,XBLA (Delisted),"November 12, 2015",N
"Sega Vintage Collection: Golden Axe (Golden Axe, II, III)",Sega,XBLA (Delisted),"November 12, 2015",N
"Sega Vintage Collection: Monster World (Wonder Boy in Monster Land, Wonder Boy in Monster World, Monster World IV)",Sega,XBLA (Delisted),"November 12, 2015",N
"Sega Vintage Collection: Streets of Rage (Streets of Rage, 2, 3)",Sega,XBLA (Delisted),"November 12, 2015",N
Sega Vintage Collection: ToeJam & Earl (ToeJam & Earl and ToeJam & Earl in Panic on Funkotron),Sega,XBLA (Delisted),"August 3, 2017",N
Sensible World of Soccer,Codemasters,XBLA,"June 26, 2018",N
Shadow Assault: Tenchu,From Software,XBLA,"May 23, 2017",N
Shadow Complex,Microsoft Studios,XBLA,"November 12, 2015",N
Shadowrun,Microsoft Studios,,"December 8, 2016",N
Shadows of the Damned,Electronic Arts,Disc Only,"January 26, 2017",N
Shank 2,Electronic Arts,XBLA,"August 11, 2016",N
Shinobi,Sega,XBLA,"May 23, 2017",N
Shotest Shogi,Microsoft Studios,XBLA,"December 8, 2016",N
Shred Nebula,Microsoft Studios,XBLA,"October 27, 2016",N
Sid Meier's Civilization Revolution,2K Games,,"April 4, 2017",N
Silent Hill: Downpour,Konami,Disc Only,"October 13, 2016",N
Silent Hill: Homecoming,Konami,,"July 24, 2018",N
Silent Hill HD Collection,Konami,,"July 24, 2018",N
Sine Mora,Nordic Games,XBLA,"August 7, 2018",N
Skate,Electronic Arts,,"June 10, 2019",N
Skate 2,Electronic Arts,Disc Only,"November 15, 2021",N
Skate 3,Electronic Arts,,"November 10, 2016",N
Skullgirls: Encore,MarvelousAQL,XBLA,"January 21, 2016",N
Skydive: Proximity Flight,TopWare Interactive,XBLA,"December 15, 2016",N
Slender: The Arrival,Midnight City,XBLA,"September 14, 2017",N
Small Arms,Microsoft Studios,XBLA,"January 21, 2016",N
Sniper Elite V2,505 Games,,"January 16, 2018",N
Soltrio Solitaire,Xbox Game Studios,XBLA,"March 28, 2017",N
Sonic & All-Stars Racing Transformed,Sega,,"October 4, 2016",60hz
Sonic & Knuckles,Sega,XBLA (Delisted),"May 5, 2016",N
Sonic Adventure,Sega,XBLA,"September 28, 2017",N
Sonic Adventure 2,Sega,XBLA,"November 30, 2017",N
Sonic CD,Sega,XBLA (Delisted),"November 12, 2015",N
Sonic Generations,Sega,,"April 10, 2018",60hz
Sonic the Fighters,Sega,XBLA,"April 12, 2016",N
Sonic the Hedgehog,Sega,XBLA (Delisted),"November 12, 2015",N
Sonic the Hedgehog 2,Sega,XBLA (Delisted),"November 12, 2015",N
Sonic the Hedgehog 3,Sega,XBLA (Delisted),"November 12, 2015",N
Sonic the Hedgehog 4: Episode I,Sega,XBLA,"July 21, 2016",N
Sonic the Hedgehog 4: Episode II,Sega,XBLA,"July 21, 2016",N
Sonic Unleashed,Sega,,"November 29, 2018",60hz
Soulcalibur,Namco,XBLA (Delisted),"January 21, 2016",N
SoulCalibur II HD Online,Namco Bandai Games,XBLA (Delisted),"March 28, 2016",N
South Park: The Stick of Truth,Ubisoft,Disc Only,"November 12, 2015",N
Space Ark,Microsoft Studios,XBLA,"December 8, 2016",N
Space Giraffe,Microsoft Studios,XBLA,"January 21, 2016",N
Space Invaders Infinity Gene,Square Enix,XBLA,"February 23, 2017",N
Spec Ops: The Line,2K Games,Disc Only,"January 30, 2018",N
Spelunky,Microsoft Studios,XBLA (Delisted),"December 17, 2015",N
The Splatters,Microsoft Studios,XBLA,"January 10, 2017",N
Split/Second,Disney Interactive Studios,,"January 25, 2018",N
'Splosion Man,Microsoft Studios,XBLA,"December 17, 2015",N
SpongeBob's Truth or Square,THQ,,"November 15, 2021",N
SpongeBob SquarePants: Underpants Slam,THQ,XBLA,"November 15, 2021",N
SSX,EA Sports,,"May 26, 2016",N
Stacking,THQ,XBLA,"March 21, 2017",N
Star Ocean: The Last Hope,Square Enix,,"June 10, 2019",N
Star Wars: The Force Unleashed,Disney Interactive Studios,,"May 4, 2016",N
Star Wars: The Force Unleashed II,Disney Interactive Studios,,"May 4, 2016",N
Steins;Gate,Mages,,"May 18, 2017",N
Steins;Gate: Hiyoku Renri no Darling,Mages,,"May 18, 2017",N
Steins;Gate: Senkei Kōsoku no Phenogram,Mages,,"May 18, 2017",N
Strania,G.rev,XBLA,"January 10, 2017",N
Street Fighter IV,Capcom,,"March 16, 2017",N
Stuntman: Ignition,THQ,,"January 31, 2017",N
Super Contra,Konami,XBLA,"September 14, 2017",N
Super Meat Boy,Microsoft Studios,XBLA,"November 12, 2015",N
Super Puzzle Fighter II Turbo HD Remix,Capcom,XBLA,"June 10, 2019",N
Super Street Fighter IV,Capcom,Disc Only,"July 13, 2017",N
Super Street Fighter IV: Arcade Edition,Capcom,,"July 13, 2017",N
Supreme Commander 2,Square Enix,,"November 12, 2015",N
Switchball,Activision,XBLA,"November 15, 2021",N
Syberia,Bandai Namco Games,XBLA (Delisted),"July 26, 2016",N
Syndicate,Electronic Arts,Disc Only,"June 10, 2019",N
Tales from Space: Mutant Blobs Attack,Midnight City,XBLA (Delisted),"November 12, 2015",N
Tecmo Bowl Throwback,Tecmo Koei,XBLA,"November 14, 2017",N
Tekken 6,Namco Bandai Games,,"January 19, 2017",N
Tekken Tag Tournament 2,Bandai Namco Entertainment,,"March 23, 2016",N
Texas Hold 'Em,Microsoft Studios,XBLA,"May 3, 2016",N
Thrillville: Off the Rails,Disney Interactive Studios,,"November 15, 2021",N
Ticket to Ride,Microsoft Studios,XBLA,"December 17, 2015",N
Time Pilot,Konami,XBLA,"November 15, 2021",N
TimeShift,Vivendi Universal Games,,"April 25, 2017",N
Tom Clancy's EndWar,Ubisoft,,"November 6, 2018",N
Tom Clancy's Ghost Recon Advanced Warfighter,Ubisoft,,"July 3, 2018",N
Tom Clancy's Ghost Recon Advanced Warfighter 2,Ubisoft,,"March 26, 2019",N
Tom Clancy's Ghost Recon: Future Soldier,Ubisoft,,"March 13, 2018",N
Tom Clancy's H.A.W.X,Ubisoft,Disc Only,"November 6, 2018",N
Tom Clancy's Rainbow Six: Vegas,Ubisoft,,"November 12, 2015",N
Tom Clancy's Rainbow Six: Vegas 2,Ubisoft,,"November 12, 2015",N
Tom Clancy's Splinter Cell: Blacklist,Ubisoft,,"July 31, 2018",N
Tom Clancy's Splinter Cell: Conviction,Ubisoft,,"February 8, 2018",N
Tom Clancy's Splinter Cell: Double Agent,Ubisoft,,"July 31, 2018",N
Tomb Raider: Anniversary,Crystal Dynamics,,"August 14, 2018",N
Tomb Raider: Legend,Crystal Dynamics,,"August 14, 2018",N
Tomb Raider: Underworld,Crystal Dynamics,,"July 27, 2017",N
Too Human,Microsoft Studios,,"June 10, 2019",N
Torchlight,Microsoft Studios,XBLA,"November 12, 2015",N
Tour de France 2009: The Official Game,Focus Home Interactive,XBLA (Delisted),"July 19, 2016",N
Tour de France 2011,Focus Home Interactive,XBLA (Delisted),"October 11, 2016",N
Tower Bloxx Deluxe,Microsoft Studios,XBLA,"March 21, 2017",N
Toy Soldiers,Microsoft Studios,XBLA (Delisted),"November 12, 2015",N
Toy Soldiers: Cold War,Microsoft Studios,XBLA (Delisted),"November 12, 2015",N
Toy Story 3,Disney Interactive Studios,,"September 29, 2016",N
Toy Story Mania!,Disney Interactive Studios,,"November 15, 2021",N
Toybox Turbos,Codemasters,Disc Only,"May 29, 2018",N
Trials Evolution,Microsoft Studios,XBLA (Delisted),"May 2, 2019",N
Trials HD,Microsoft Studios,XBLA,"February 11, 2016",N
Triggerheart Exelica,Microsoft Studios,XBLA,"July 28, 2016",N
Trine 2,Atlus,XBLA (Delisted),"November 29, 2016",N
Tron: Evolution,Disney Interactive Studios,,"November 12, 2015",N
Tropico 4,Kalypso Media,,"October 23, 2018",N
Ugly Americans: Apocalypsegeddon,345 Games Comedy Central,XBLA,"November 12, 2015",N
Ultra Street Fighter IV,Capcom,Disc Only,"July 13, 2017",N
Unbound Saga,Microsoft Studios,XBLA,"May 24, 2016",N
Undertow,Microsoft Studios,XBLA,"September 14, 2017",N
Unreal Tournament 3,Midway Games,,"June 10, 2019",N
Vandal Hearts: Flames of Judgment,Konami,XBLA,"November 15, 2021",60hz
Vanquish,Sega,,"February 20, 2018",N
Virtua Fighter 2,Sega,XBLA (Delisted),,N
Virtua Fighter 5: Final Showdown,Sega,XBLA,"September 15, 2016",N
Cyber Troopers Virtual-On,Sega,XBLA,"September 14, 2017",N
Viva Piñata,Microsoft Studios,,"November 12, 2015",N
Viva Piñata: Party Animals,Microsoft Studios,,"November 15, 2021",N
Viva Piñata: Trouble in Paradise,Microsoft Studios,,"November 12, 2015",N
The Walking Dead,Telltale Games,,"August 29, 2017",N
The Walking Dead: Michonne,Telltale Games,XBLA,"August 29, 2017",N
The Walking Dead: Season Two,Telltale Games,,"August 29, 2017",N
Warlords,Atari,XBLA,"November 15, 2021",N
The Witcher 2: Assassins of Kings,CD Projekt Red,,"January 21, 2016",N
Wolf of the Battlefield: Commando 3,Capcom,XBLA,"June 27, 2017",N
Wolfenstein 3D,Bethesda Softworks,XBLA,"November 12, 2015",N
Word Puzzle,Microsoft Studios,XBLA,"September 20, 2016",N
A World of Keflings,Microsoft Studios,XBLA,"November 12, 2015",N
XCOM: Enemy Unknown,2K Games,,"May 24, 2016",N
XCOM: Enemy Within,2K Games,,"June 9, 2016",N
Yosumin! Live,Square Enix,XBLA,"October 26, 2017",N
Zone of the Enders HD Collection,Konami,,"September 11, 2018",N
Zuma,Electronic Arts,XBLA,"November 12, 2015",N
Zuma's Revenge!,PopCap Games,XBLA,"December 17, 2015",N`;

// Raw CSV data for Original Xbox games
const rawOriginalData = `Title,Publisher,Date Added,,
Advent Rising,Ziggurat Interactive,"November 15, 2021",,
Armed and Dangerous,LucasArts,"June 10, 2019",,
Battlefield 2: Modern Combat,Electronic Arts,"June 10, 2019",,
Black,Electronic Arts,"October 24, 2017",,
Blinx: The Time Sweeper,Microsoft Studios,"April 17, 2018",,
BloodRayne 2,Majesco Entertainment,"October 24, 2017",,
Breakdown,Bandai Namco Entertainment,"April 17, 2018",,
Chicken Little,Disney Interactive Studios,"November 15, 2021",,
Conker: Live & Reloaded,Microsoft Studios,"April 17, 2018",,
Crimson Skies: High Road to Revenge,Microsoft Studios,"October 24, 2017",,
Dead or Alive 3,Tecmo,"November 15, 2021",,
Dead or Alive Ultimate,Tecmo,"November 15, 2021",,
Dead to Rights,Bandai Namco Entertainment,"October 24, 2017",,
Destroy All Humans!,THQ Nordic,"April 26, 2018",,
The Elder Scrolls III: Morrowind,Bethesda Softworks,"April 17, 2018",,
Full Spectrum Warrior,THQ Nordic,"April 26, 2018",,
Fuzion Frenzy,Microsoft Studios,"October 24, 2017",,
Gladius,LucasArts,"November 15, 2021",,
Grabbed by the Ghoulies,Microsoft Studios,"October 24, 2017",,
Grand Theft Auto: San Andreas,Rockstar Games,"June 7, 2018",,
Gunvalkyrie,Sega,"November 15, 2021",,
Hunter: The Reckoning,Interplay Entertainment,"April 17, 2018",,
Indiana Jones and the Emperor's Tomb,LucasArts,"June 10, 2019",,
Jade Empire,Microsoft Studios,"April 17, 2018",,
The King of Fighters Neowave,SNK,"October 24, 2017",,
Manhunt,Rockstar Games,"November 15, 2021",,
Max Payne,Rockstar Games,"November 15, 2021",,
Max Payne 2: The Fall of Max Payne,Rockstar Games,"November 15, 2021",,
Mercenaries: Playground of Destruction,LucasArts,"April 26, 2018",,
MX Unleashed,THQ Nordic,"April 26, 2018",,
Ninja Gaiden Black,Tecmo,"October 24, 2017",,
Oddworld: Munch's Oddysee,Xbox Game Studios,"November 15, 2021",,
Otogi: Myth of Demons,Sega,"November 15, 2021",,
Otogi 2: Immortal Warriors,Sega,"November 15, 2021",,
Panzer Dragoon Orta,Sega,"April 17, 2018",,
Panzer Elite Action: Fields of Glory,JoWooD Productions,"April 26, 2018",,
Prince of Persia: The Sands of Time,Ubisoft,"October 24, 2017",,
Psychonauts,Double Fine Productions,"October 24, 2017",,
Red Dead Revolver,Rockstar Games,"November 15, 2021",,
Red Faction II,THQ Nordic,"October 24, 2017",,
Secret Weapons Over Normandy,LucasArts,"November 15, 2021",,
Sid Meier's Pirates!,2K Games,"October 24, 2017",,
Sphinx and the Cursed Mummy,THQ Nordic,"June 10, 2019",,
SSX 3,Electronic Arts,"April 17, 2018",,
Star Wars: Battlefront,LucasArts,"April 26, 2018",,
Star Wars: Battlefront II,LucasArts,"April 26, 2018",,
Star Wars: The Clone Wars,LucasArts,"November 15, 2021",,
Star Wars: Episode III – Revenge of the Sith,LucasArts,"November 15, 2021",,
Star Wars Jedi Knight II: Jedi Outcast,LucasArts,"November 15, 2021",,
Star Wars Jedi Knight: Jedi Academy,LucasArts,"April 26, 2018",,
Star Wars: Jedi Starfighter,LucasArts,"April 26, 2018",,
Star Wars: Knights of the Old Republic,LucasArts,"October 24, 2017",,
Star Wars Knights of the Old Republic II: The Sith Lords,LucasArts,"April 26, 2018",,
Star Wars: Republic Commando,LucasArts,"April 26, 2018",,
Star Wars: Starfighter Special Edition,LucasArts,"November 15, 2021",,
Thrillville,LucasArts,"November 15, 2021",,
TimeSplitters 2,Deep Silver,"November 15, 2021",,
TimeSplitters: Future Perfect,Deep Silver,"November 15, 2021",,
Tom Clancy's Splinter Cell,Ubisoft,"June 10, 2019",,
Tom Clancy's Splinter Cell: Chaos Theory,Ubisoft,"June 10, 2019",,
Tom Clancy's Splinter Cell: Double Agent,Ubisoft,"June 10, 2019",,
Tom Clancy's Splinter Cell: Pandora Tomorrow,Ubisoft,"June 10, 2019",,
Unreal Championship 2: The Liandri Conflict,Epic Games,"June 10, 2019",,`;

// Robust CSV Parsing
// Handles quoted values containing commas and basic CSV structure
const parseCSV = (text: string): string[][] => {
  return text.split('\n').slice(1).filter(l => l.trim().length > 0).map(line => {
      const result = [];
      let current = '';
      let inQuotes = false;
      for(let i=0; i<line.length; i++) {
          const char = line[i];
          if(char === '"') {
              inQuotes = !inQuotes;
          } else if (char === ',' && !inQuotes) {
              result.push(current.trim());
              current = '';
          } else {
              current += char;
          }
      }
      result.push(current.trim());
      return result;
  });
};

export const getGames = (): Game[] => {
  const games: Game[] = [];
  let idCounter = 0;

  // Process 360 Data
  // Headers: Title, Publisher, Format, Date Added, FPS Boost
  const parsed360 = parseCSV(raw360Data);
  parsed360.forEach(row => {
      if(row.length < 2) return;
      const fpsVal = row[4];
      const isFpsBoosted = fpsVal && fpsVal !== 'N' && fpsVal !== '';
      
      games.push({
          id: `360-${idCounter++}`,
          title: row[0],
          publisher: row[1],
          format: row[2],
          dateAdded: row[3],
          fpsBoost: isFpsBoosted ? fpsVal : null,
          platform: ConsolePlatform.XBOX_360
      });
  });

  // Process Original Xbox Data
  // Headers: Title, Publisher, Date Added,,
  const parsedOriginal = parseCSV(rawOriginalData);
  parsedOriginal.forEach(row => {
      if(row.length < 2) return;
      games.push({
          id: `og-${idCounter++}`,
          title: row[0],
          publisher: row[1],
          format: 'Disc/Digital',
          dateAdded: row[2],
          fpsBoost: null, 
          platform: ConsolePlatform.XBOX_ORIGINAL
      });
  });

  return games.sort((a, b) => a.title.localeCompare(b.title));
};