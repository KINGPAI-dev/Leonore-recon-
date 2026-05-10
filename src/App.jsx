
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
import React, { useState } from 'react';
import {
  Search,
  Mail,
  Phone,
  User,
  Globe,
  Shield,
  Terminal,
  Loader2,
  CheckCircle2,
  XCircle
} from 'lucide-react';

const Card = ({ children, className = "" }) => (
  <div
    className={`bg-gray-900 border border-gray-800 rounded-xl overflow-hidden ${className}`}
  >
    {children}
  </div>
);

const NavButton = ({ active, icon: Icon, label, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-all ${
      active
        ? "border-purple-500 text-purple-400 bg-purple-500/10"
        : "border-transparent text-gray-500 hover:text-gray-300"
    }`}
  >
    <Icon size={18} />
    <span className="text-sm font-medium">{label}</span>
  </button>
);

const ResultRow = ({ site, status }) => (
  <div className="flex items-center justify-between p-3 border-b border-gray-800">
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded bg-gray-800 flex items-center justify-center text-xs font-bold">
        {site[0]}
      </div>

      <span>{site}</span>
    </div>

    {status === "found" ? (
      <div className="flex items-center gap-1 text-green-400 text-xs">
        <CheckCircle2 size={14} />
        FOUND
      </div>
    ) : (
      <div className="flex items-center gap-1 text-gray-500 text-xs">
        <XCircle size={14} />
        NOT FOUND
      </div>
    )}
  </div>
);

export default function App() {
  const [activeTab, setActiveTab] = useState("email");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [terminalLog, setTerminalLog] = useState([]);

  const addLog = (msg) => {
    setTerminalLog((prev) => [
      ...prev,
      `[${new Date().toLocaleTimeString()}] ${msg}`
    ].slice(-5));
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!query) return;

    setLoading(true);
    setResults(null);
    setTerminalLog([]);

    addLog(`Memulai scan ${activeTab}: ${query}`);

    try {
      await new Promise((r) => setTimeout(r, 2000));

      const mockResults = [
        { site: "Instagram", status: "found" },
        { site: "Twitter", status: "not_found" },
        { site: "Facebook", status: "found" },
        { site: "LinkedIn", status: "found" }
      ];

      setResults(mockResults);

      addLog("Scan selesai.");
    } catch (err) {
      addLog("ERROR: gagal menjalankan engine.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* HEADER */}
      <header className="border-b border-gray-800 bg-gray-950">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-600 flex items-center justify-center">
              <Shield size={22} />
            </div>

            <div>
              <h1 className="text-xl font-bold">
                LEONORE<span className="text-purple-500">.ROCKS</span>
              </h1>

              <p className="text-xs text-gray-500">
                Elite OSINT Framework
              </p>
            </div>
          </div>

          <div className="text-xs text-purple-400">
            SYSTEM ONLINE
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="max-w-6xl mx-auto px-4 py-10">
        {/* NAV */}
        <div className="flex flex-wrap border border-gray-800 rounded-t-xl overflow-hidden">
          <NavButton
            active={activeTab === "username"}
            icon={User}
            label="Username"
            onClick={() => setActiveTab("username")}
          />

          <NavButton
            active={activeTab === "email"}
            icon={Mail}
            label="Email"
            onClick={() => setActiveTab("email")}
          />

          <NavButton
            active={activeTab === "phone"}
            icon={Phone}
            label="Phone"
            onClick={() => setActiveTab("phone")}
          />

          <NavButton
            active={activeTab === "domain"}
            icon={Globe}
            label="Domain"
            onClick={() => setActiveTab("domain")}
          />
        </div>

        {/* SEARCH */}
        <Card className="rounded-t-none border-t-0 p-8">
          <form
            onSubmit={handleSearch}
            className="max-w-2xl mx-auto space-y-6"
          >
            <div className="text-center">
              <h2 className="text-2xl font-bold">
                Pencarian {activeTab.toUpperCase()}
              </h2>

              <p className="text-gray-500 text-sm mt-2">
                Masukkan target untuk memulai audit.
              </p>
            </div>

            <div className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Masukkan target..."
                className="w-full bg-gray-950 border border-gray-700 rounded-xl px-5 py-4 outline-none"
              />

              <button
                type="submit"
                disabled={loading}
                className="absolute right-2 top-2 bottom-2 bg-purple-600 hover:bg-purple-500 px-5 rounded-lg flex items-center gap-2"
              >
                {loading ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <Search size={18} />
                )}

                <span>SCAN</span>
              </button>
            </div>
          </form>

          {/* TERMINAL */}
          {(loading || terminalLog.length > 0) && (
            <div className="max-w-2xl mx-auto mt-8 bg-black border border-gray-800 rounded-lg p-4 font-mono text-xs">
              <div className="flex items-center gap-2 text-gray-500 mb-3">
                <Terminal size={12} />
                <span>LEONORE CONSOLE</span>
              </div>

              {terminalLog.map((log, i) => (
                <div key={i} className="text-gray-300 mb-1">
                  $ {log}
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* RESULTS */}
        {results && (
          <div className="mt-10 grid md:grid-cols-2 gap-6">
            <Card>
              <div className="px-4 py-3 border-b border-gray-800 bg-gray-800/50">
                <h3 className="font-bold text-sm">
                  FOOTPRINT ANALYSIS
                </h3>
              </div>

              {results.map((res, i) => (
                <ResultRow
                  key={i}
                  site={res.site}
                  status={res.status}
                />
              ))}
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Shield size={18} className="text-purple-400" />
                Intelligence Summary
              </h3>

              <p className="text-sm text-gray-400 leading-relaxed">
                Target memiliki beberapa footprint digital aktif
                pada platform media sosial dan layanan publik.
              </p>

              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="bg-gray-950 border border-gray-800 rounded-lg p-4">
                  <div className="text-xs text-gray-500">
                    TOTAL CHECKED
                  </div>

                  <div className="text-xl font-bold mt-1">
                    120+
                  </div>
                </div>

                <div className="bg-gray-950 border border-gray-800 rounded-lg p-4">
                  <div className="text-xs text-gray-500">
                    MATCH RATE
                  </div>

                  <div className="text-xl font-bold text-purple-400 mt-1">
                    78%
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="border-t border-gray-900 py-6 text-center text-xs text-gray-600">
        © 2026 PAI LEONORE
      </footer>
    </div>
  );
}


