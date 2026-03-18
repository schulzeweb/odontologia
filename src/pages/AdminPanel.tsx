import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  Settings, 
  LogOut, 
  TrendingUp, 
  Search,
  Bell,
  ArrowUpRight,
  Trash2,
  X
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface Lead {
  id: number;
  name: string;
  phone: string;
  interest: string;
  price: string;
  urgency: string;
  status: string;
  created_at: string;
  details: string;
}

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const fetchLeads = async () => {
    try {
      const response = await fetch('/api/leads');
      const data = await response.json();
      setLeads(data);
    } catch (error) {
      console.error("Error fetching leads:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
    const interval = setInterval(fetchLeads, 10000);
    return () => clearInterval(interval);
  }, []);

  const getTimeAgo = (dateString: string) => {
    const now = new Date();
    const past = new Date(dateString);
    const diffInMinutes = Math.floor((now.getTime() - past.getTime()) / 60000);
    
    if (diffInMinutes < 1) return "Agora mesmo";
    if (diffInMinutes < 60) return `${diffInMinutes} min atrás`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} hora${diffInHours > 1 ? 's' : ''} atrás`;
    return past.toLocaleDateString('pt-BR');
  };

  const updateLeadStatus = async (id: number, status: string) => {
    try {
      await fetch(`/api/leads/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      fetchLeads();
    } catch (error) {
      console.error("Error updating lead:", error);
    }
  };

  const deleteLead = async (id: number) => {
    if (!confirm("Tem certeza que deseja excluir este lead?")) return;
    try {
      await fetch(`/api/leads/${id}`, { method: 'DELETE' });
      fetchLeads();
    } catch (error) {
      console.error("Error deleting lead:", error);
    }
  };

  const stats = {
    leadsToday: leads.filter(l => {
      const today = new Date();
      const leadDate = new Date(l.created_at);
      return leadDate.toDateString() === today.toDateString();
    }).length,
    potentialRevenue: leads.reduce((acc, l) => {
      let priceStr = l.price?.toLowerCase() || '0';
      let multiplier = 1;
      if (priceStr.includes('k')) {
        multiplier = 1000;
        priceStr = priceStr.replace('k', '');
      }
      const price = parseInt(priceStr.replace(/[^0-9]/g, '') || '0');
      return acc + (price * multiplier);
    }, 0),
    pendingLeads: leads.filter(l => l.status === 'PENDENTE').length
  };

  return (
    <div className="min-h-screen bg-surface text-ink font-sans flex selection:bg-brand-100 selection:text-brand-900">
      {/* Sidebar */}
      <aside className="w-64 bg-paper border-r border-thin-light flex flex-col fixed h-full z-20">
        <div className="h-24 flex items-center px-8 border-b border-thin-light">
          <Link to="/" className="flex items-center gap-3 hover:opacity-70 transition-opacity">
            <span className="font-serif text-2xl font-light tracking-wider uppercase text-brand-900">Lumina</span>
          </Link>
        </div>

        <nav className="flex-1 py-8 px-4 space-y-1">
          <span className="text-[10px] uppercase tracking-[0.2em] text-ink-light/70 font-semibold px-4 mb-4 block">Menu Principal</span>
          
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-sm ${activeTab === 'dashboard' ? 'bg-brand-50 text-brand-700 font-medium' : 'hover:bg-surface text-ink-light'}`}
          >
            <LayoutDashboard className="w-4 h-4" />
            Visão Geral
          </button>
          <button 
            onClick={() => setActiveTab('leads')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-sm ${activeTab === 'leads' ? 'bg-brand-50 text-brand-700 font-medium' : 'hover:bg-surface text-ink-light'}`}
          >
            <Users className="w-4 h-4" />
            Triagem IA
            <span className={`ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full ${activeTab === 'leads' ? 'bg-brand-700 text-white' : 'bg-ink-light/20 text-ink-light'}`}>
              {stats.pendingLeads}
            </span>
          </button>
          <button 
            onClick={() => setActiveTab('calendar')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-sm ${activeTab === 'calendar' ? 'bg-brand-50 text-brand-700 font-medium' : 'hover:bg-surface text-ink-light'}`}
          >
            <Calendar className="w-4 h-4" />
            Agenda
          </button>
        </nav>

        <div className="p-4 border-t border-thin-light">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-surface transition-all text-sm text-ink-light">
            <Settings className="w-4 h-4" />
            Configurações
          </button>
          <Link to="/" className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-surface transition-all text-sm text-ink-light mt-1">
            <LogOut className="w-4 h-4" />
            Sair
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 flex flex-col min-h-screen">
        {/* Topbar */}
        <header className="h-24 bg-paper/80 backdrop-blur-md border-b border-thin-light flex items-center justify-between px-10 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-light tracking-tight text-ink">Dashboard</h1>
            <div className="h-4 w-px bg-ink/10"></div>
            <p className="text-xs text-ink-light uppercase tracking-wider font-medium">{new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
          </div>

          <div className="flex items-center gap-8">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-ink-light/50" />
              <input 
                type="text" 
                placeholder="Buscar paciente..." 
                className="pl-10 pr-4 py-2 bg-surface border border-thin-light rounded-full text-sm focus:border-brand-300 outline-none w-64 transition-all placeholder:text-ink-light/50"
              />
            </div>
            <button className="relative text-ink-light hover:text-brand-700 transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-brand-500 rounded-full"></span>
            </button>
            <div className="flex items-center gap-3 pl-8 border-l border-thin-light cursor-pointer group">
              <div className="text-right">
                <p className="text-sm font-medium group-hover:text-brand-700 transition-colors text-ink">Dra. Camila</p>
                <p className="text-[10px] uppercase tracking-wider text-ink-light">Diretora Clínica</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-surface overflow-hidden border border-thin-light">
                <img src="https://images.unsplash.com/photo-1594824436951-7f1267da4c1e?q=80&w=100&auto=format&fit=crop" alt="Avatar" className="w-full h-full object-cover opacity-90" referrerPolicy="no-referrer" />
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-10 flex-1">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-7xl mx-auto space-y-10"
          >
            {/* Revenue Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-paper p-8 rounded-2xl border border-thin-light shadow-sm">
                <p className="text-[10px] uppercase tracking-[0.2em] text-ink-light font-semibold mb-6">Leads Estéticos Hoje</p>
                <div className="flex items-end justify-between">
                  <h3 className="text-5xl font-light tracking-tighter text-ink">{stats.leadsToday}</h3>
                  <span className="flex items-center text-xs font-medium text-brand-600 mb-2 bg-brand-50 px-2 py-1 rounded-md">
                    <TrendingUp className="w-3 h-3 mr-1" /> +24%
                  </span>
                </div>
              </div>

              <div className="bg-paper p-8 rounded-2xl border border-thin-light shadow-sm">
                <p className="text-[10px] uppercase tracking-[0.2em] text-ink-light font-semibold mb-6">Agendamentos</p>
                <div className="flex items-end justify-between">
                  <h3 className="text-5xl font-light tracking-tighter text-ink">08</h3>
                  <span className="flex items-center text-xs font-medium text-brand-600 mb-2 bg-brand-50 px-2 py-1 rounded-md">
                    <TrendingUp className="w-3 h-3 mr-1" /> +12%
                  </span>
                </div>
              </div>

              <div className="bg-brand-900 text-white p-8 rounded-2xl shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <TrendingUp className="w-24 h-24" />
                </div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-brand-100 font-semibold mb-6 relative z-10">Receita Potencial</p>
                <div className="flex items-end justify-between relative z-10">
                  <h3 className="text-4xl font-serif font-light tracking-tight text-white">R$ {(stats.potentialRevenue / 1000).toFixed(0)}k</h3>
                  <span className="text-xs text-brand-100 mb-2">Em negociação</span>
                </div>
              </div>
            </div>

            {/* Triage Table */}
            <div className="bg-paper rounded-2xl border border-thin-light shadow-sm overflow-hidden">
              <div className="p-8 border-b border-thin-light flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-medium text-ink">Triagem Inteligente</h2>
                  <p className="text-xs text-ink-light mt-1">Leads qualificados pelo Concierge Digital nas últimas 24h.</p>
                </div>
                <button className="text-xs uppercase tracking-wider font-semibold text-brand-700 hover:text-brand-800 transition-colors flex items-center gap-1 bg-brand-50 px-4 py-2 rounded-lg">
                  Ver Todos <ArrowUpRight className="w-3 h-3" />
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-surface text-ink-light text-[10px] uppercase tracking-[0.15em] font-semibold">
                      <th className="px-8 py-4">Paciente</th>
                      <th className="px-8 py-4">Contato</th>
                      <th className="px-8 py-4">Interesse</th>
                      <th className="px-8 py-4">Urgência</th>
                      <th className="px-8 py-4">Status</th>
                      <th className="px-8 py-4 text-right">Ação</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-thin-light">
                    {leads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-surface transition-colors group">
                        <td className="px-8 py-5">
                          <div className="flex items-center gap-4">
                            <div className="w-8 h-8 rounded-full bg-brand-50 flex items-center justify-center text-brand-700 font-serif text-sm">
                              {lead.name.charAt(0)}
                            </div>
                            <div>
                              <p className="font-medium text-sm text-ink">{lead.name}</p>
                              <p className="text-[10px] text-ink-light mt-0.5">{getTimeAgo(lead.created_at)}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-5">
                          <span className="text-xs text-ink-light font-mono">{lead.phone}</span>
                        </td>
                        <td className="px-8 py-5">
                          <div className="flex flex-col">
                            <span className="text-sm font-medium text-ink">{lead.interest}</span>
                            <span className="text-[10px] text-brand-700 font-semibold mt-0.5 uppercase tracking-wider">{lead.price}</span>
                          </div>
                        </td>
                        <td className="px-8 py-5">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider font-bold ${
                            lead.urgency === 'ALTA' ? 'bg-red-50 text-red-700' :
                            lead.urgency === 'MÉDIA' ? 'bg-amber-50 text-amber-700' :
                            'bg-surface text-ink-light border border-thin-light'
                          }`}>
                            {lead.urgency}
                          </span>
                        </td>
                        <td className="px-8 py-5">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider font-bold ${
                            lead.status === 'QUALIFICADO' ? 'bg-brand-50 text-brand-700' :
                            lead.status === 'EM ATENDIMENTO' ? 'bg-amber-50 text-amber-700' :
                            'bg-blue-50 text-blue-700'
                          }`}>
                            {lead.status}
                          </span>
                        </td>
                        <td className="px-8 py-5 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button 
                              onClick={() => setSelectedLead(lead)}
                              className="p-2 text-ink-light hover:text-brand-700 transition-colors"
                              title="Ver Detalhes"
                            >
                              <Search className="w-4 h-4" />
                            </button>
                            {lead.status === 'PENDENTE' && (
                              <button 
                                onClick={() => updateLeadStatus(lead.id, 'EM ATENDIMENTO')}
                                className="text-xs font-medium text-brand-700 hover:text-white bg-white hover:bg-brand-700 border border-brand-200 hover:border-brand-700 px-4 py-2 rounded-lg transition-all shadow-sm"
                              >
                                Atender
                              </button>
                            )}
                            <button 
                              onClick={() => deleteLead(lead.id)}
                              className="p-2 text-ink-light hover:text-red-600 transition-colors"
                              title="Excluir Lead"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {leads.length === 0 && (
                      <tr>
                        <td colSpan={6} className="px-8 py-10 text-center text-ink-light italic">Nenhum lead captado ainda.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Lead Details Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-ink/60 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-paper w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden border border-thin-light"
          >
            <div className="p-8 border-b border-thin-light flex items-center justify-between bg-surface/50">
              <h3 className="font-serif text-2xl text-ink">Detalhes do Paciente</h3>
              <button onClick={() => setSelectedLead(null)} className="p-2 hover:bg-surface rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-8 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-ink-light font-bold mb-1">Nome</p>
                  <p className="text-sm font-medium text-ink">{selectedLead.name}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-ink-light font-bold mb-1">Telefone</p>
                  <p className="text-sm font-mono text-ink">{selectedLead.phone}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-ink-light font-bold mb-1">Interesse</p>
                  <p className="text-sm font-medium text-ink">{selectedLead.interest}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-ink-light font-bold mb-1">Investimento</p>
                  <p className="text-sm font-medium text-brand-700">{selectedLead.price}</p>
                </div>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-ink-light font-bold mb-1">Resumo da Conversa</p>
                <div className="bg-surface p-4 rounded-xl border border-thin-light text-sm text-ink-light leading-relaxed italic">
                  "{selectedLead.details || 'Nenhum detalhe adicional fornecido.'}"
                </div>
              </div>
              <div className="flex items-center gap-4 pt-4">
                <button 
                  onClick={() => {
                    window.open(`https://wa.me/${selectedLead.phone.replace(/[^0-9]/g, '')}`, '_blank');
                  }}
                  className="flex-1 bg-brand-700 text-white py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-brand-900 transition-all shadow-lg shadow-brand-700/20"
                >
                  Abrir WhatsApp
                </button>
                <button 
                  onClick={() => {
                    updateLeadStatus(selectedLead.id, 'QUALIFICADO');
                    setSelectedLead(null);
                  }}
                  className="flex-1 border border-brand-200 text-brand-700 py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-brand-50 transition-all"
                >
                  Qualificar
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
