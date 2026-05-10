
import React, { useState, useEffect } from 'react';
import { Search, Mail, Phone, User, Globe, Shield, Terminal, Loader2, CheckCircle2, XCircle } from 'lucide-react';

// --- UI COMPONENTS ---

const Card = ({ children, className = "" }) => (
  <div className={`bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden ${className}`}>
    {children}
  </div>
);

const NavButton = ({ active, icon: Icon, label, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-6 py-3 transition-all duration-200 border-b-2 ${
      active 
        ? "border-purple-500 text-purple-400 bg-purple-500/10" 
        : "border-transparent text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50"
    }`}
  >
    <Icon size={18} />
    <span className="font-medium text-sm uppercase tracking-wider">{label}</span>
  </button>
);

const ResultRow = ({ site, status }) => (
  <div className="flex items-center justify-between p-3 border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-colors">
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded bg-zinc-800 flex items-center justify-center text-xs font-bold text-zinc-400">
        {site[0]}
      </div>
      <span className="text-zinc-300 font-medium">{site}</span>
    </div>
    {status === 'found' ? (
      <div className="flex items-center gap-1 text-green-500 text-xs font-bold uppercase italic">
        <CheckCircle2 size={14} /> Found
      </div>
    ) : (
      <div className="flex items-center gap-1 text-zinc-600 text-xs font-bold uppercase italic">
        <XCircle size={14} /> Not Found
      </div>
    )}
  </div>
);

// --- MAIN APP ---

export default function App() {
  const [activeTab, setActiveTab] = useState('email');
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [terminalLog, setTerminalLog] = useState([]);

  // Simulasi log terminal ala hacker
  const addLog = (msg) => {
    setTerminalLog(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`].slice(-5));
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) return;

    setLoading(true);
    setResults(null);
    setTerminalLog([]);
    addLog(`Memulai pencarian ${activeTab} untuk: ${query}`);
    addLog(`Menghubungkan ke server backend Leonore...`);

    try {
      // Catatan: Ganti URL ini dengan URL API Backend kamu nantinya (misal di Railway/Termux)
      // const response = await fetch(`http://localhost:5000/api/${activeTab}/${query}`);
      // const data = await response.json();
      
      // SIMULASI UNTUK DEMO UI
      await new Promise(r => setTimeout(r, 2000));
      addLog(`Tool ${activeTab === 'email' ? 'Holehe' : 'Ignorant'} berhasil dijalankan.`);
      
      const mockResults = [
        { site: 'Instagram', status: 'found' },
        { site: 'Twitter', status: 'not_found' },
        { site: 'Snapchat', status: 'found' },
        { site: 'Facebook', status: 'not_found' },
        { site: 'LinkedIn', status: 'found' },
      ];
      
      setResults(mockResults);
      addLog(`Pencarian selesai. ${mockResults.filter(r => r.status === 'found').length} akun ditemukan.`);
    } catch (err) {
      addLog(`ERROR: Gagal terhubung ke engine.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-zinc-100 selection:bg-purple-500/30">
      {/* Header */}
      <header className="border-b border-zinc-800 bg-zinc-950/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(147,51,234,0.5)]">
              <Shield className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tighter italic">LEONORE<span className="text-purple-500">.ROCKS</span></h1>
              <p className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase">Elite OSINT Framework</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-6 text-xs font-medium text-zinc-400 uppercase tracking-widest">
            <span className="hover:text-purple-400 cursor-pointer transition-colors">Database</span>
            <span className="hover:text-purple-400 cursor-pointer transition-colors">API Docs</span>
            <span className="text-purple-500 border border-purple-500/30 px-2 py-1 rounded bg-purple-500/5">System: Online</span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center bg-zinc-950 border border-zinc-800 rounded-t-2xl overflow-hidden mb-0">
          <NavButton 
            active={activeTab === 'username'} 
            icon={User} 
            label="Username" 
            onClick={() => setActiveTab('username')} 
          />
          <NavButton 
            active={activeTab === 'email'} 
            icon={Mail} 
            label="Email Address" 
            onClick={() => setActiveTab('email')} 
          />
          <NavButton 
            active={activeTab === 'phone'} 
            icon={Phone} 
            label="Telephone" 
            onClick={() => setActiveTab('phone')} 
          />
          <NavButton 
            active={activeTab === 'domain'} 
            icon={Globe} 
            label="Domain / IP" 
            onClick={() => setActiveTab('domain')} 
          />
        </div>

        {/* Search Engine Area */}
        <Card className="rounded-t-none border-t-0 p-8 md:p-12 shadow-2xl relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50"></div>
          
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-zinc-200">
                Pencarian <span className="text-purple-500 italic">{activeTab.toUpperCase()}</span>
              </h2>
              <p className="text-zinc-500 text-sm">Masukkan target untuk memulai audit keamanan secara mendalam.</p>
            </div>

            <div className="relative group">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={activeTab === 'email' ? "example@email.com" : "Target identifier..."}
                className="w-full bg-zinc-950 border-2 border-zinc-800 rounded-xl px-6 py-4 text-lg focus:outline-none focus:border-purple-600 transition-all placeholder:text-zinc-700"
              />
              <button 
                type="submit"
                disabled={loading}
                className="absolute right-2 top-2 bottom-2 bg-purple-600 hover:bg-purple-500 text-white px-6 rounded-lg flex items-center gap-2 transition-all disabled:opacity-50"
              >
                {loading ? <Loader2 className="animate-spin" size={20} /> : <Search size={20} />}
                <span className="font-bold">SCAN</span>
              </button>
            </div>
          </form>

          {/* Terminal Console (Realtime Feedback) */}
          {(loading || terminalLog.length > 0) && (
            <div className="max-w-2xl mx-auto mt-8 bg-black/50 rounded-lg p-4 font-mono text-[11px] border border-zinc-800">
              <div className="flex items-center gap-2 mb-2 text-zinc-500">
                <Terminal size={12} />
                <span>LEONORE ENGINE CONSOLE</span>
              </div>
              {terminalLog.map((log, i) => (
                <div key={i} className="text-zinc-400 leading-relaxed">
                  <span className="text-purple-500 opacity-50">$</span> {log}
                </div>
              ))}
              {loading && <div className="text-purple-400 animate-pulse mt-1 italic">Menganalisis footprint digital target...</div>}
            </div>
          )}
        </Card>

        {/* Results Area */}
        {results && (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Card>
              <div className="bg-zinc-800/50 px-4 py-3 border-b border-zinc-800 flex items-center justify-between">
                <h3 className="font-bold text-sm uppercase tracking-tighter">Footprint Analysis</h3>
                <span className="text-[10px] bg-green-500/20 text-green-400 px-2 py-0.5 rounded font-bold uppercase tracking-widest">Active</span>
              </div>
              <div className="divide-y divide-zinc-800">
                {results.map((res, i) => (
                  <ResultRow key={i} site={res.site} status={res.status} />
                ))}
              </div>
            </Card>

            <div className="space-y-6">
              <Card className="p-6 bg-gradient-to-br from-purple-900/10 to-zinc-900">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Shield className="text-purple-400" size={20} /> Intelligence Summary
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                  Hasil pencarian menunjukkan target memiliki profil aktif di beberapa platform media sosial. 
                  Audit ini dilakukan menggunakan engine <span className="text-zinc-200">Holehe v2.x</span> dan 
                  <span className="text-zinc-200"> Ignorant v1.2</span>.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-zinc-950 rounded-lg border border-zinc-800">
                    <div className="text-[10px] text-zinc-500 uppercase">Total Checked</div>
                    <div className="text-xl font-bold">120+ Sites</div>
                  </div>
                  <div className="p-3 bg-zinc-950 rounded-lg border border-zinc-800">
                    <div className="text-[10px] text-zinc-500 uppercase">Identity Match</div>
                    <div className="text-xl font-bold text-purple-400">78%</div>
                  </div>
                </div>
              </Card>
              
              <button className="w-full py-4 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-xl font-bold text-sm transition-all border border-zinc-700 shadow-lg uppercase tracking-widest flex items-center justify-center gap-2">
                Download PDF Report
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-900 py-8 text-center">
        <p className="text-[10px] text-zinc-600 uppercase tracking-[0.3em]">
          &copy; 2026 PAI LEONORE - ALL RIGHTS RESERVED
        </p>
      </footer>
    </div>
  );
}


