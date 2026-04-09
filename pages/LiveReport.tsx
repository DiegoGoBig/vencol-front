import React, { useState, useEffect } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer,
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, PieChart, Pie, Cell,
} from 'recharts';
import { Download, CheckCircle, Search, Globe, TrendingUp, Shield, Activity, RefreshCw, Zap, Smartphone, Layout, ArrowRight, Link2, ArrowUpRight, ArrowDownRight, FileText, AlertCircle, Check } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import seoHistory from '../data/seo-history.json';
import socialHistory from '../data/social-media-history.json';
import paidHistory from '../data/paid-media-history.json';
import { fetchBlogPostsByMonth } from '../lib/wordpress';
import { BlogPost } from '../types';
import { Share2, Megaphone, DollarSign, Facebook, Instagram, Linkedin as LinkedinIcon, Twitter } from 'lucide-react';

// Static Data
const effortData = [
  { name: 'Ene', SEO: 5, Web: 4, Seguridad: 0 },
  { name: 'Feb', SEO: 4, Web: 3, Seguridad: 2 },
  { name: 'Mar', SEO: 6, Web: 2, Seguridad: 1 },
  { name: 'Abr', SEO: 5, Web: 2, Seguridad: 1 },
  { name: 'May', SEO: 6, Web: 2, Seguridad: 0 },
  { name: 'Jun', SEO: 6, Web: 2, Seguridad: 0 },
  { name: 'Jul', SEO: 8, Web: 3, Seguridad: 0 },
  { name: 'Ago', SEO: 5, Web: 1, Seguridad: 0 },
  { name: 'Sep', SEO: 6, Web: 1, Seguridad: 1 },
  { name: 'Oct', SEO: 5, Web: 1, Seguridad: 1 },
  { name: 'Nov', SEO: 4, Web: 1, Seguridad: 0 },
  { name: 'Dic', SEO: 8, Web: 12, Seguridad: 0 },
];

const focusData = [
  { name: 'Optimización SEO', value: 50 },
  { name: 'Mantenimiento Web', value: 25 },
  { name: 'Seguridad & Plugins', value: 15 },
  { name: 'Informes & Gestión', value: 10 },
];
const FOCUS_COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#6B7280'];

const keywords = [
  { kw: 'soluciones en frio industrial', pos: '#1', vol: '12.500', diff: 'Media', diffColor: 'text-yellow-500' },
  { kw: 'vencol', pos: '#1', vol: '22.200', diff: 'Baja', diffColor: 'text-green-500' },
  { pipe: 'cuartos frios colombia', pos: '#2', vol: '8.900', diff: 'Media', diffColor: 'text-yellow-500' },
  { pipe: 'refrigeración comercial', pos: '#3', vol: '18.800', diff: 'Alta', diffColor: 'text-red-500' },
  { pipe: 'mantenimiento cuartos frios', pos: '#4', vol: '5.500', diff: 'Alta', diffColor: 'text-red-500' },
];

const products = [
  { name: 'Equipos Frigoríficos', value: 90, label: 'Alta demanda' },
  { name: 'Paneles Aislantes', value: 75, label: 'Demanda media' },
  { name: 'Puertas Térmicas', value: 60, label: 'Estacional' },
  { name: 'Sistemas de Control', value: 45, label: 'Crecimiento' },
];

const tabs = ['Salud del Sitio', 'SEO y Contenidos', 'Social Media', 'Paid Media', 'Seguridad y Web', 'Looker Studio'];

const LighthouseGauge = ({ score, label }: { score: number, label: string }) => {
  const isRed = score < 50;
  const isOrange = score >= 50 && score < 90;
  const color = isRed ? '#ff4e42' : isOrange ? '#ffa400' : '#0cce6b';
  const bgColor = isRed ? '#ff4e4220' : isOrange ? '#ffa40020' : '#0cce6b20';
  
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative w-[100px] h-[100px]">
        <svg width="100" height="100" className="transform -rotate-90">
          <circle cx="50" cy="50" r={radius} fill="none" stroke={bgColor} strokeWidth="8" />
          <circle cx="50" cy="50" r={radius} fill="none" stroke={color} strokeWidth="8"
            strokeDasharray={circumference} strokeDashoffset={strokeDashoffset}
            strokeLinecap="round" />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-medium" style={{ color }}>{score || 0}</span>
        </div>
      </div>
      <span className="text-sm font-semibold text-slate-700 text-center">{label}</span>
    </div>
  );
};

const MetricItem = ({ label, value, type }: { label: string, value: string, type: 'red' | 'orange' | 'green' }) => {
  const isRed = type === 'red';
  const isGreen = type === 'green';
  const shapeClass = isRed ? "w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[10px] border-[#ff4e42]" : isGreen ? "w-3 h-3 rounded-full bg-[#0cce6b]" : "w-3 h-3 bg-[#ffa400] rounded-sm";
  const valColor = isRed ? "text-[#ff4e42]" : isGreen ? "text-[#0cce6b]" : "text-[#ffa400]";

  return (
    <div className="py-4 border-b border-slate-100 flex flex-col gap-1.5">
      <div className="flex items-center gap-3">
        <div className={`${shapeClass} inline-block`} />
        <span className="text-[15px] font-medium text-slate-800">{label}</span>
      </div>
      <span className={`text-2xl font-medium pl-6 ${valColor}`}>{value}</span>
    </div>
  );
};

const ProgressCard = ({ icon: Icon, title, subtitle, initialNum, actualNum, initialStr, actualStr, higherIsBetter = true }: any) => {
  let percentChange = 0;
  if (higherIsBetter) {
     percentChange = ((actualNum - initialNum) / initialNum) * 100;
  } else {
     percentChange = ((initialNum - actualNum) / initialNum) * 100;
  }
  
  if (initialNum === 0 && actualNum === 0) percentChange = 0;
  if (initialNum === 0 && actualNum > 0) percentChange = higherIsBetter ? 100 : -100;
  if (initialNum > 0 && actualNum === 0 && !higherIsBetter) percentChange = 100;

  const isPositive = percentChange >= 0;
  const pctText = `${isPositive ? '+' : ''}${Math.round(percentChange)}%`;
  
  const widthPct = higherIsBetter ? Math.min((actualNum / 100) * 100, 100) : (isPositive ? 100 : Math.max(0, 100 - (percentChange * -1)));

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col h-full hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center">
          <Icon size={20} />
        </div>
        <div className={`px-2 py-1 rounded-md text-[11px] font-bold ${isPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
          {pctText}
        </div>
      </div>
      <h4 className="font-bold text-slate-800 text-[15px]">{title}</h4>
      <p className="text-xs text-slate-500 mt-1 mb-6 flex-grow leading-relaxed">{subtitle}</p>
      
      <div className="flex justify-between items-end mb-2">
        <div className="w-1/3">
          <p className="text-[10px] text-slate-400 capitalize tracking-wide font-medium mb-1">Inicial</p>
          <span className="text-sm font-semibold text-slate-700">{initialStr}</span>
        </div>
        <div className="w-1/3 flex justify-center pb-1">
          <ArrowRight size={14} className="text-slate-200" />
        </div>
        <div className="w-1/3 text-right">
          <p className="text-[10px] text-slate-400 capitalize tracking-wide font-medium mb-1">Actual</p>
          <span className="text-lg font-bold text-slate-900">{actualStr}</span>
        </div>
      </div>
      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${isPositive ? 'bg-[#0cce6b]' : 'bg-[#ff4e42]'}`} style={{ width: `${widthPct}%` }} />
      </div>
    </div>
  )
}

export function LiveReport() {
  const [activeTab, setActiveTab] = useState('Salud del Sitio');

  // PageSpeed API State
  const [speedData, setSpeedData] = useState<{ mobile: any; desktop: any } | null>(null);
  const [loadingSpeed, setLoadingSpeed] = useState(false);
  const [targetUrl, setTargetUrl] = useState('https://vencol.com'); // default to a safe value or real domain

  // SEO History and Wordpress State
  const [selectedMonthId, setSelectedMonthId] = useState(seoHistory[0].id);
  const [selectedSocialMonthId, setSelectedSocialMonthId] = useState(socialHistory[0].id);
  const [selectedPaidMonthId, setSelectedPaidMonthId] = useState(paidHistory[0].id);
  
  const [monthPosts, setMonthPosts] = useState<BlogPost[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(false);

  const selectedSeoData = seoHistory.find((h) => h.id === selectedMonthId) || seoHistory[0];
  const selectedSocialData = socialHistory.find((h) => h.id === selectedSocialMonthId) || socialHistory[0];
  const selectedPaidData = paidHistory.find((h) => h.id === selectedPaidMonthId) || paidHistory[0];

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    fetchPageSpeed(); // Automatically fetch on load
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoadingPosts(true);
      try {
        const posts = await fetchBlogPostsByMonth(selectedSeoData.year, selectedSeoData.month, 5);
        setMonthPosts(posts);
      } catch (err) {
        console.error('Error fetching posts by month:', err);
        setMonthPosts([]);
      }
      setLoadingPosts(false);
    };
    fetchPosts();
  }, [selectedMonthId, selectedSeoData]);

  const [speedError, setSpeedError] = useState(false);

  const fetchPageSpeed = async () => {
    if (!targetUrl) return;
    setLoadingSpeed(true);
    setSpeedError(false);
    try {
      // Consultar directamente a Google inyectando la llave local de Vite
      const apiKey = import.meta.env.VITE_PAGESPEED_API_KEY;
      const keyParam = apiKey ? `&key=${apiKey}` : '';
      
      const mobileRes = await fetch(`https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(targetUrl)}&strategy=mobile${keyParam}`);
      if (mobileRes.status === 429) throw new Error('Limit');
      const mobileData = await mobileRes.json();
      
      const desktopRes = await fetch(`https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(targetUrl)}&strategy=desktop${keyParam}`);
      if (desktopRes.status === 429) throw new Error('Limit');
      const desktopData = await desktopRes.json();
      
      if (mobileData.lighthouseResult && desktopData.lighthouseResult) {
        setSpeedData({
          mobile: mobileData.lighthouseResult,
          desktop: desktopData.lighthouseResult
        });
      }
    } catch (error: any) {
      console.error('Error fetching PageSpeed:', error);
      if (error.message === 'Limit') {
        setSpeedError(true);
      }
    }
    setLoadingSpeed(false);
  };

  // Dynamic values mapped from Google Lighthouse API
  const getVal = (res: any, cat: string) => Math.round((res?.categories?.[cat]?.score || 0) * 100);
  const getMetricS = (res: any, auditId: string) => Number(((res?.audits?.[auditId]?.numericValue || 0) / 1000).toFixed(1));

  const radarData = speedData ? [
    { subject: 'Estructura Web', A: getVal(speedData.desktop, 'accessibility'), B: 70, fullMark: 100 },
    { subject: 'Desktop Performance', A: getVal(speedData.desktop, 'performance'), B: 60, fullMark: 100 },
    { subject: 'Mobile Score', A: getVal(speedData.mobile, 'performance'), B: 50, fullMark: 100 },
  ] : [
    { subject: 'Estructura Web', A: 100, B: 70, fullMark: 100 },
    { subject: 'Desktop Performance', A: 95, B: 60, fullMark: 100 },
    { subject: 'Mobile Score', A: 85, B: 50, fullMark: 100 },
  ];

  const loadTimesData = speedData ? [
    { name: 'LCP (Mobile)', Enero: 3.5, Actual: getMetricS(speedData.mobile, 'largest-contentful-paint') },
    { name: 'Carga (Desktop)', Enero: 4.2, Actual: getMetricS(speedData.desktop, 'interactive') },
    { name: 'FCP (Mobile)', Enero: 2.1, Actual: getMetricS(speedData.mobile, 'first-contentful-paint') },
  ] : [
    { name: 'LCP', Enero: 3.5, Actual: 1.2 },
    { name: 'Carga Completa', Enero: 4.2, Actual: 1.5 },
    { name: 'Enlaces Rotos', Enero: 12, Actual: 0 },
  ];

  const desktopScore = speedData ? getVal(speedData.desktop, 'performance') : 95;
  const mobileScore = speedData ? getVal(speedData.mobile, 'performance') : 85;
  const structureScore = speedData ? getVal(speedData.desktop, 'accessibility') : 98;

  return (
    <div className="fixed inset-0 z-[100] bg-[#f8fafc] text-slate-800 font-sans overflow-y-auto">
      <Helmet>
        <title>Reporte en Vivo | Vencol Analytics</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="max-w-[1400px] mx-auto p-6 md:p-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-4">
              {/* <div className="w-12 h-12 bg-brand-green rounded flex items-center justify-center font-bold text-white text-2xl tracking-tighter">
                V
              </div>
              <div>
                <h2 className="text-xl font-bold leading-none text-slate-900">VENCOL</h2>
                <p className="text-xs text-slate-500 tracking-wider">FRESCURA VISIBLE</p>
              </div> */}
            </div>
            <h1 className="text-4xl font-bold text-slate-900 mb-2">Estadisticas en vivo - 2026</h1>
            <p className="text-slate-500">Marca Activa: <span className="font-medium text-brand-green">Vencol</span> | Periodo: Enero - Diciembre</p>
          </div>
          
          <div className="flex gap-4">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors shadow-sm">
              <Download size={18} />
              <span className="font-medium text-sm">Descargar PDF</span>
            </button>
            <div className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg shadow-sm">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
              <span className="font-medium text-sm text-slate-700">Estado: Sitio Optimizado</span>
            </div>
          </div>
        </div>

        {/* API Control Bar */}
        {(activeTab === 'Salud del Sitio' || activeTab === 'Resumen General') && (
          <div className="mb-6 flex flex-col gap-2">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-brand-green/20 flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="flex items-center gap-3 w-full sm:w-auto flex-grow max-w-lg">
                <Activity className="text-brand-green" size={20} />
                <input 
                  type="text" 
                  value={targetUrl}
                  onChange={(e) => setTargetUrl(e.target.value)}
                  placeholder="https://tudominio.com"
                  className="flex-grow px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-green/50"
                  onKeyDown={(e) => e.key === 'Enter' && fetchPageSpeed()}
                />
              </div>
              <button 
                onClick={fetchPageSpeed}
                disabled={loadingSpeed}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2 bg-brand-green text-white font-medium rounded-lg hover:bg-brand-green/90 transition-all disabled:opacity-50"
              >
                {loadingSpeed ? <RefreshCw size={18} className="animate-spin" /> : <Search size={18} />}
                {loadingSpeed ? 'Auditando Web...' : 'Ejecutar PageSpeed'}
              </button>
            </div>
            {speedError && (
              <div className="text-sm font-medium text-red-500 bg-red-50 p-3 rounded-lg border border-red-100 flex items-center gap-2">
                <Shield size={16} /> Límite de la API Gratuita de Google excedido (Error 429). Por favor, intentar de nuevo en unos minutos.
              </div>
            )}
          </div>
        )}

        {/* Tabs */}
        <div className="flex bg-white rounded-xl shadow-sm border border-slate-100 p-1.5 mb-8 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === tab 
                  ? 'bg-slate-50 text-slate-900 shadow-sm ring-1 ring-slate-200/50' 
                  : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
              }`}
            >
              {tab === 'Resumen General' && <Activity size={16} />}
              {tab === 'Salud del Sitio' && <Globe size={16} />}
              {tab === 'SEO y Contenidos' && <TrendingUp size={16} />}
              {tab === 'Social Media' && <Share2 size={16} />}
              {tab === 'Paid Media' && <Megaphone size={16} />}
              {tab === 'Seguridad y Web' && <Shield size={16} />}
              {tab === 'Looker Studio' && <Activity size={16} className="text-blue-500" />}
              {tab}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-forwards">
          
          {/* TAB 1: Resumen General */}
          {activeTab === 'Resumen General' && (
            <div className="space-y-6">
              {/* KPI Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between">
                  <div className="flex justify-between items-start mb-4">
                    <p className="text-sm font-medium text-slate-500">Horas SEO</p>
                    <div className="p-2 bg-blue-50 rounded-lg"><Search size={18} className="text-blue-500" /></div>
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-slate-900 mb-1">120</h3>
                    <p className="text-xs text-blue-500 font-medium tracking-wide">Estrategia y Contenido</p>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between">
                  <div className="flex justify-between items-start mb-4">
                    <p className="text-sm font-medium text-slate-500">Horas Web</p>
                    <div className="p-2 bg-emerald-50 rounded-lg"><Globe size={18} className="text-emerald-500" /></div>
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-slate-900 mb-1">98</h3>
                    <p className="text-xs text-emerald-500 font-medium tracking-wide">Desarrollo y Soporte</p>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between">
                  <div className="flex justify-between items-start mb-4">
                    <p className="text-sm font-medium text-slate-500">Posicionamiento Top 10</p>
                    <div className="p-2 bg-brand-green/10 rounded-lg"><TrendingUp size={18} className="text-brand-green" /></div>
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-slate-900 mb-1">125</h3>
                    <p className="text-xs text-brand-green font-medium tracking-wide">Palabras clave principales</p>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between">
                  <div className="flex justify-between items-start mb-4">
                    <p className="text-sm font-medium text-slate-500">Salud del Web (API)</p>
                    <div className="p-2 bg-indigo-50 rounded-lg"><Activity size={18} className="text-indigo-500" /></div>
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-slate-900 mb-1">{structureScore}%</h3>
                    <p className="text-xs text-indigo-500 font-medium tracking-wide">
                      {speedData ? "Métrica de Google en Vivo" : "Auditoría Técnica Simulada"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Charts Row */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 lg:col-span-2">
                  <h3 className="text-lg font-semibold text-slate-800 mb-6">Distribución de Esfuerzo Mensual (Horas)</h3>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={effortData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                        <RechartsTooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                        <Legend wrapperStyle={{ paddingTop: '20px' }} iconType="circle" />
                        <Bar dataKey="SEO" stackId="a" fill="#3B82F6" radius={[0, 0, 4, 4]} />
                        <Bar dataKey="Web" stackId="a" fill="#10B981" />
                        <Bar dataKey="Seguridad" stackId="a" fill="#F59E0B" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                  <h3 className="text-lg font-semibold text-slate-800 mb-6">Enfoque de Gestión</h3>
                  <div className="h-[260px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={focusData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={90}
                          paddingAngle={5}
                          dataKey="value"
                          stroke="none"
                        >
                          {focusData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={FOCUS_COLORS[index % FOCUS_COLORS.length]} />
                          ))}
                        </Pie>
                        <RechartsTooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="grid grid-cols-2 gap-y-3 gap-x-2 mt-4 px-2">
                    {focusData.map((item, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: FOCUS_COLORS[i] }} />
                        <span className="text-xs text-slate-600 font-medium leading-tight">{item.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Salud del Sitio */}
          {activeTab === 'Salud del Sitio' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Evolución de Salud del Sitio (Google API)</h2>
                  <p className="text-sm text-slate-500">Comparativa Enero 2025 vs. Estado Extraído en Vivo</p>
                </div>
                <div className="flex items-center gap-4 text-sm font-medium">
                  {speedData && (
                    <>
                      <div className="flex items-center gap-1.5 text-slate-400"><div className="w-2.5 h-2.5 rounded-full bg-slate-300"></div> Enero</div>
                      <div className="flex items-center gap-1.5 text-blue-600"><div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div> Actual (API)</div>
                    </>
                  )}
                </div>
              </div>

              {!speedData ? (
                loadingSpeed ? (
                  <div className="bg-white p-12 rounded-2xl shadow-sm border border-slate-100 text-center flex flex-col items-center justify-center">
                    <RefreshCw size={48} className="text-brand-green animate-spin mb-4" />
                    <h3 className="text-xl font-bold text-slate-700 mb-2">Auditando Web...</h3>
                    <p className="text-slate-500 max-w-md">Ejecutando Lighthouse API en tiempo real. Esto puede tomar unos segundos.</p>
                  </div>
                ) : (
                  <div className="bg-white p-12 rounded-2xl shadow-sm border border-slate-100 text-center flex flex-col items-center justify-center">
                    <Shield size={48} className="text-slate-300 mb-4" />
                    <h3 className="text-xl font-bold text-slate-700 mb-2">No se pudieron obtener datos</h3>
                    <p className="text-slate-500 max-w-md">No hay información de rendimiento disponible de la API de Google Lighthouse. Por favor intenta correr la auditoría nuevamente o revisa tu clave.</p>
                  </div>
                )
              ) : (
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                  {/* Top Gauges */}
                  <div className="flex flex-wrap justify-center gap-8 md:gap-16 pb-12 border-b border-slate-100">
                    <LighthouseGauge score={getVal(speedData.mobile, 'performance')} label="Performance" />
                    <LighthouseGauge score={getVal(speedData.desktop, 'accessibility')} label="Accessibility" />
                    <LighthouseGauge score={Math.round((speedData?.mobile?.categories?.['best-practices']?.score || 0.5) * 100)} label="Best Practices" />
                    <LighthouseGauge score={getVal(speedData.desktop, 'seo')} label="SEO" />
                  </div>

                  {/* Details section */}
                  <div className="pt-8 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2">
                    <div className="flex flex-col">
                      <MetricItem 
                        label="First Contentful Paint" 
                        value={`${getMetricS(speedData.mobile, 'first-contentful-paint')} s`} 
                        type={getMetricS(speedData.mobile, 'first-contentful-paint') <= 1.8 ? 'green' : getMetricS(speedData.mobile, 'first-contentful-paint') <= 3.0 ? 'orange' : 'red'} 
                      />
                      <MetricItem 
                        label="Total Blocking Time" 
                        value={`${(speedData.mobile?.audits?.['total-blocking-time']?.numericValue || 0).toFixed(0)} ms`} 
                        type={(speedData.mobile?.audits?.['total-blocking-time']?.numericValue || 0) <= 200 ? 'green' : (speedData.mobile?.audits?.['total-blocking-time']?.numericValue || 0) <= 600 ? 'orange' : 'red'} 
                      />
                      <MetricItem 
                        label="Speed Index" 
                        value={`${getMetricS(speedData.mobile, 'speed-index')} s`} 
                        type={getMetricS(speedData.mobile, 'speed-index') <= 3.4 ? 'green' : getMetricS(speedData.mobile, 'speed-index') <= 5.8 ? 'orange' : 'red'} 
                      />
                    </div>
                    
                    <div className="flex flex-col">
                      <MetricItem 
                        label="Largest Contentful Paint" 
                        value={`${getMetricS(speedData.mobile, 'largest-contentful-paint')} s`} 
                        type={getMetricS(speedData.mobile, 'largest-contentful-paint') <= 2.5 ? 'green' : getMetricS(speedData.mobile, 'largest-contentful-paint') <= 4.0 ? 'orange' : 'red'} 
                      />
                      <MetricItem 
                        label="Cumulative Layout Shift" 
                        value={`${(speedData.mobile?.audits?.['cumulative-layout-shift']?.numericValue || 0).toFixed(3)}`} 
                        type={(speedData.mobile?.audits?.['cumulative-layout-shift']?.numericValue || 0) <= 0.1 ? 'green' : (speedData.mobile?.audits?.['cumulative-layout-shift']?.numericValue || 0) <= 0.25 ? 'orange' : 'red'} 
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-center items-center gap-8 mt-12 mb-8 border-b border-slate-100 pb-12">
                    <div className="flex items-center gap-2"><div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-b-[8px] border-[#ff4e42]" /> <span className="text-sm text-slate-500">0–49</span></div>
                    <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 bg-[#ffa400] rounded-sm" /> <span className="text-sm text-slate-500">50–89</span></div>
                    <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-[#0cce6b]" /> <span className="text-sm text-slate-500">90–100</span></div>
                  </div>

                  {/* Comparative Cards Section */}
                  <h3 className="text-xl font-bold text-slate-800 mb-6 px-2">Análisis Comparativo (Enero vs Live API)</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <ProgressCard 
                      icon={Zap} 
                      title="Desktop Performance (API)" 
                      subtitle="Eficiencia de carga y optimización de recursos"
                      initialNum={54} actualNum={getVal(speedData.desktop, 'performance')}
                      initialStr="54/100" actualStr={`${getVal(speedData.desktop, 'performance')}/100`}
                    />
                    <ProgressCard 
                      icon={Smartphone} 
                      title="Mobile Score (PageSpeed)" 
                      subtitle="Experiencia de usuario en dispositivos móviles"
                      initialNum={52} actualNum={getVal(speedData.mobile, 'performance')}
                      initialStr="52/100" actualStr={`${getVal(speedData.mobile, 'performance')}/100`}
                    />
                    <ProgressCard 
                      icon={Layout} 
                      title="Estructura Web" 
                      subtitle="Semántica, jerarquía y accesibilidad"
                      initialNum={82} actualNum={getVal(speedData.desktop, 'accessibility')}
                      initialStr="82/100" actualStr={`${getVal(speedData.desktop, 'accessibility')}/100`}
                    />
                    <ProgressCard 
                      icon={Activity} 
                      title="LCP (Contenido principal)" 
                      subtitle="Tiempo de carga del bloque principal visible"
                      initialNum={2.9} actualNum={getMetricS(speedData.mobile, 'largest-contentful-paint')}
                      initialStr="2.9s" actualStr={`${getMetricS(speedData.mobile, 'largest-contentful-paint')}s`}
                      higherIsBetter={false}
                    />
                    <ProgressCard 
                      icon={Globe} 
                      title="Tiempo Carga Interactivo" 
                      subtitle="TBT + Retardo de interactividad de red"
                      initialNum={4.7} actualNum={getMetricS(speedData.desktop, 'interactive')}
                      initialStr="4.7s" actualStr={`${getMetricS(speedData.desktop, 'interactive')}s`}
                      higherIsBetter={false}
                    />
                    <ProgressCard 
                      icon={Link2} 
                      title="Enlaces Rotos (SEO)" 
                      subtitle="Errores 404 internos y externos corregidos"
                      initialNum={89} actualNum={0}
                      initialStr="89" actualStr="0"
                    higherIsBetter={false}
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: SEO y Contenidos */}
          {activeTab === 'SEO y Contenidos' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-100 gap-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Análisis SEO y Contenidos ({selectedSeoData.monthLabel})</h2>
                  <p className="text-sm text-slate-500">Histórico de configuraciones, posicionamiento y artículos publicados.</p>
                </div>
                <div>
                  <select 
                    value={selectedMonthId}
                    onChange={(e) => setSelectedMonthId(e.target.value)}
                    className="px-4 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-green/50 w-full sm:w-auto"
                  >
                    {seoHistory.map((h) => (
                      <option key={h.id} value={h.id}>{h.monthLabel}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Top Keywords */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col">
                  <div className="flex items-center gap-2 mb-6">
                    <Search className="text-blue-500" size={20} />
                    <h3 className="text-lg font-semibold text-slate-800">Top Palabras Clave</h3>
                  </div>
                  
                  <div className="overflow-x-auto flex-grow">
                    <table className="w-full text-left text-sm text-slate-600 border-separate border-spacing-y-2">
                      <thead>
                        <tr>
                          <th className="pb-3 pt-2 font-medium bg-slate-50 rounded-l-lg px-4 text-slate-500">Keyword</th>
                          <th className="pb-3 pt-2 font-medium bg-slate-50 px-2 text-slate-500">Posición</th>
                          <th className="pb-3 pt-2 font-medium bg-slate-50 px-2 text-slate-500">Volumen</th>
                          <th className="pb-3 pt-2 font-medium bg-slate-50 rounded-r-lg px-4 text-slate-500">Dificultad</th>
                        </tr>
                      </thead>
                      <tbody className="mt-2">
                        {selectedSeoData.topKeywords.map((k: any, i: number) => {
                          const diffColor = k.difficulty === 'Medium' ? 'text-orange-500' : k.difficulty === 'Hard' ? 'text-red-500' : 'text-emerald-500';
                          return (
                            <tr key={i} className="hover:bg-slate-50 transition-colors group">
                              <td className="py-3 px-4 font-medium text-slate-800 rounded-l-lg group-hover:bg-slate-50">{k.keyword}</td>
                              <td className="py-3 px-2 text-emerald-500 font-bold group-hover:bg-slate-50">#{k.position}</td>
                              <td className="py-3 px-2 text-slate-500 group-hover:bg-slate-50">{k.volume}</td>
                              <td className={`py-3 px-4 ${diffColor} font-medium rounded-r-lg group-hover:bg-slate-50`}>{k.difficulty}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Productos Destacados */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col relative overflow-hidden">
                  <h3 className="text-lg font-semibold text-slate-800 mb-6">Productos Destacados (Interés)</h3>
                  
                  <div className="space-y-6 flex-grow">
                    {selectedSeoData.topProducts?.map((p: any, i: number) => (
                      <div key={i}>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="font-semibold text-slate-700">{p.name}</span>
                          <span className="text-slate-400 text-xs">{p.label}</span>
                        </div>
                        <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-blue-600 rounded-full" 
                            style={{ width: `${p.value}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                    <h4 className="font-bold text-blue-800 text-sm mb-1">Estrategia de Contenidos</h4>
                    <p className="text-xs text-blue-600/80 leading-relaxed">
                      La estrategia se ha enfocado en fortalecer las páginas de producto transaccionales y el blog informativo, mejorando la intención de búsqueda tanto para pacientes como para profesionales.
                    </p>
                  </div>
                </div>
              </div>

              {/* Tendencias */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                {/* Ascendente */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                  <div className="flex items-center gap-2 mb-6">
                    <ArrowUpRight className="text-emerald-500" size={20} />
                    <h3 className="text-lg font-semibold text-slate-800">Contenido en Tendencia (Ascendente)</h3>
                  </div>
                  <div className="space-y-5">
                    {selectedSeoData.trendingContent?.map((t: any, i: number) => (
                      <div key={i} className="flex justify-between items-center pb-2 border-b border-slate-50/50 last:border-0 last:pb-0">
                        <span className="text-sm font-medium text-slate-700 truncate mr-4">{t.title}</span>
                        <div className="text-right flex flex-col">
                          <span className="text-sm font-bold text-emerald-500">{t.pct}</span>
                          <span className="text-[10px] text-slate-400 font-medium">{t.clicks}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Descendente */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                  <div className="flex items-center gap-2 mb-6">
                    <ArrowDownRight className="text-red-500" size={20} />
                    <h3 className="text-lg font-semibold text-slate-800">Contenido a Optimizar (Descendente)</h3>
                  </div>
                  <div className="space-y-5">
                    {selectedSeoData.optimizingContent?.map((t: any, i: number) => (
                      <div key={i} className="flex justify-between items-center pb-2 border-b border-slate-50/50 last:border-0 last:pb-0">
                        <span className="text-sm font-medium text-slate-700 truncate mr-4">{t.title}</span>
                        <div className="text-right flex flex-col">
                          <span className="text-sm font-bold text-red-500">{t.pct}</span>
                          <span className="text-[10px] text-slate-400 font-medium">{t.clicks}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Plan de Contenidos - Tabla Completa */}
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 mt-6 relative overflow-hidden">
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <FileText className="text-purple-500" size={24} />
                    <h3 className="text-xl font-bold text-slate-800">Plan de Contenidos {selectedSeoData.year} (Integración Live CMS)</h3>
                  </div>
                  <span className="bg-purple-50 text-purple-600 px-3 py-1 rounded-full text-xs font-bold shadow-sm border border-purple-100">
                    {loadingPosts ? 'Sincronizando...' : `${monthPosts.length} Temas Prioritarios`}
                  </span>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
                  {/* Tabla WP */}
                  <div className="xl:col-span-3 overflow-x-auto">
                    {loadingPosts ? (
                      <div className="text-center py-16">
                        <RefreshCw className="animate-spin text-blue-500 mx-auto mb-4" size={32} />
                        <p className="text-slate-500 font-medium">Extrayendo publicaciones directamente de WordPress...</p>
                      </div>
                    ) : monthPosts.length > 0 ? (
                      <table className="w-full text-left text-sm text-slate-600 border-separate border-spacing-y-3">
                        <thead>
                          <tr>
                            <th className="pb-2 font-medium text-slate-400 uppercase tracking-widest text-[10px] px-4">Tema / Artículo</th>
                            <th className="pb-2 font-medium text-slate-400 uppercase tracking-widest text-[10px] px-2">Categoría</th>
                            <th className="pb-2 font-medium text-slate-400 uppercase tracking-widest text-[10px] px-2">Keywords Objetivo</th>
                            <th className="pb-2 font-medium text-slate-400 uppercase tracking-widest text-[10px] px-2 text-center">Estado</th>
                            <th className="pb-2 font-medium text-slate-400 uppercase tracking-widest text-[10px] px-2 text-center">Enlace</th>
                          </tr>
                        </thead>
                        <tbody>
                          {monthPosts.map((post, i) => (
                            <tr key={post.id} className="bg-slate-50/50 hover:bg-white hover:shadow-sm border border-slate-100 transition-all rounded-xl h-16">
                              <td className="py-3 px-4 font-bold text-slate-700 max-w-xs">{i + 1}. {post.title}</td>
                              <td className="py-3 px-2 text-purple-600 font-semibold">{post.category}</td>
                              <td className="py-3 px-2 text-slate-500 text-xs truncate max-w-[150px]">{post.keywords || 'general, article'}</td>
                              <td className="py-3 px-2 text-center">
                                <span className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-wider ${post.status === 'Publicado' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-amber-50 text-amber-600 border border-amber-100'}`}>
                                  {post.status?.toUpperCase()}
                                </span>
                              </td>
                              <td className="py-3 px-2 text-center">
                                <a href={`/blog/${post.slug}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 px-3 py-1 bg-white border border-blue-100 text-blue-600 hover:bg-blue-50 hover:border-blue-200 rounded-full text-[11px] font-bold transition-colors">
                                  <Check size={12} /> Ver Artículo
                                </a>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-16 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                        <FileText className="text-slate-300 mb-4" size={48} />
                        <h4 className="text-lg font-bold text-slate-700 mb-1">Sin Publicaciones en {selectedSeoData.monthLabel}</h4>
                        <p className="text-sm text-slate-500 max-w-sm text-center">El API vinculada a cms.gobigagency.co no devolvió artículos publicados durante este periodo de tiempo.</p>
                      </div>
                    )}
                  </div>

                  {/* Sidebar Right */}
                  <div className="space-y-6">
                    {/* Lineamientos Editoriales */}
                    <div className="bg-[#f8faff] p-5 rounded-2xl border border-blue-100 shadow-sm">
                      <div className="flex items-center gap-2 mb-4">
                        <CheckCircle className="text-blue-500" size={18} />
                        <h4 className="font-bold text-blue-900 text-sm">Lineamientos Editoriales</h4>
                      </div>
                      <ul className="space-y-3 text-xs text-blue-800/80">
                        <li className="flex items-start gap-2">
                          <span className="text-blue-500 mt-0.5">•</span>
                          Evitar uso excesivo de lenguaje promocional en párrafos introductorios.
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-500 mt-0.5">•</span>
                          Contenido fundamental redactado con validación y fuentes B2B.
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-500 mt-0.5">•</span>
                          Optimización SEO: Meta título &lt;60 caracteres, Descripción &lt;155 caracteres.
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-500 mt-0.5">•</span>
                          Enlaces internos obligatorios hacia páginas de integración/soluciones correspondientes.
                        </li>
                      </ul>
                    </div>

                    {/* Especificaciones Técnicas */}
                    <div className="bg-[#fffdf8] p-5 rounded-2xl border border-orange-100 shadow-sm">
                      <div className="flex items-center gap-2 mb-4">
                        <AlertCircle className="text-orange-500" size={18} />
                        <h4 className="font-bold text-orange-900 text-sm">Especificaciones Técnicas</h4>
                      </div>
                      <ul className="space-y-3 text-xs text-orange-800/80">
                        <li className="flex items-start gap-2">
                          <span className="text-orange-500 mt-0.5">•</span>
                          Longitud meta recomendada: 1200–1800 palabras por artículo técnico.
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-orange-500 mt-0.5">•</span>
                          Frecuencia de arrastre y publicación indexada sugerida 3/semanales.
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-orange-500 mt-0.5">•</span>
                          Inclusión de CTA programática correspondiente (consulta, demo, ficha técnica).
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: Social Media */}
          {activeTab === 'Social Media' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-100 gap-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Rendimiento Social Media ({selectedSocialData.monthLabel})</h2>
                  <p className="text-sm text-slate-500">Métricas de alcance orgánico y engagement en redes.</p>
                </div>
                <div>
                  <select 
                    value={selectedSocialMonthId}
                    onChange={(e) => setSelectedSocialMonthId(e.target.value)}
                    className="px-4 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-green/50 w-full sm:w-auto"
                  >
                    {socialHistory.map((h) => (
                      <option key={h.id} value={h.id}>{h.monthLabel}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* LinkedIn Organic Stats */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                        <LinkedinIcon size={20} />
                      </div>
                      <h3 className="text-lg font-semibold text-slate-800">LinkedIn Organic</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                        <p className="text-xs font-medium text-slate-500 mb-1 uppercase tracking-wider">Impresiones</p>
                        <h4 className="text-2xl font-bold text-slate-900">{selectedSocialData.linkedin.organic.impressions.toLocaleString()}</h4>
                      </div>
                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                        <p className="text-xs font-medium text-slate-500 mb-1 uppercase tracking-wider">Clics</p>
                        <h4 className="text-2xl font-bold text-slate-900">{selectedSocialData.linkedin.organic.clicks.toLocaleString()}</h4>
                      </div>
                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                        <p className="text-xs font-medium text-slate-500 mb-1 uppercase tracking-wider">Engagement</p>
                        <h4 className="text-2xl font-bold text-slate-900">{selectedSocialData.linkedin.organic.engagementRate}</h4>
                      </div>
                    </div>

                    <div className="h-[250px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={selectedSocialData.linkedin.organic.dailyData}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                          <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 10 }} dy={10} />
                          <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 10 }} />
                          <RechartsTooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                          <Bar dataKey="impressions" fill="#2563eb" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Top Posts */}
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <h3 className="text-lg font-semibold text-slate-800 mb-4">Posteos Destacados</h3>
                    <div className="space-y-4">
                      {selectedSocialData.linkedin.organic.topPosts.map((post: any, i: number) => (
                        <div key={i} className="p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-blue-200 transition-colors">
                          <p className="text-sm font-medium text-slate-800 mb-3 line-clamp-2 leading-relaxed">"{post.title}"</p>
                          <div className="flex gap-6">
                            <div className="flex flex-col">
                              <span className="text-[10px] text-slate-400 uppercase font-bold tracking-tighter">Impresiones</span>
                              <span className="text-sm font-bold text-slate-700">{post.impressions}</span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[10px] text-slate-400 uppercase font-bold tracking-tighter">Clics</span>
                              <span className="text-sm font-bold text-slate-700">{post.clicks}</span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[10px] text-slate-400 uppercase font-bold tracking-tighter">Engagement</span>
                              <span className="text-sm font-bold text-blue-600">{post.engagement}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* FB/IG Coming Soon */}
                <div className="space-y-6">
                  <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center h-[280px]">
                    <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mb-4">
                      <Facebook size={32} className="text-slate-200" />
                    </div>
                    <h4 className="text-lg font-bold text-slate-400 mb-2">Facebook</h4>
                    <span className="px-3 py-1 bg-slate-100 text-slate-500 text-[10px] font-bold rounded-full uppercase tracking-widest">Próximamente</span>
                  </div>

                  <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center h-[280px]">
                    <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mb-4">
                      <Instagram size={32} className="text-slate-200" />
                    </div>
                    <h4 className="text-lg font-bold text-slate-400 mb-2">Instagram</h4>
                    <span className="px-3 py-1 bg-slate-100 text-slate-500 text-[10px] font-bold rounded-full uppercase tracking-widest">Próximamente</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: Paid Media */}
          {activeTab === 'Paid Media' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-100 gap-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Estrategia Paid Media ({selectedPaidData.monthLabel})</h2>
                  <p className="text-sm text-slate-500">Estado de cuentas publicitarias y campañas activas.</p>
                </div>
                <div>
                  <select 
                    value={selectedPaidMonthId}
                    onChange={(e) => setSelectedPaidMonthId(e.target.value)}
                    className="px-4 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-green/50 w-full sm:w-auto"
                  >
                    {paidHistory.map((h) => (
                      <option key={h.id} value={h.id}>{h.monthLabel}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* LinkedIn Ads Card */}
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                    <LinkedinIcon size={120} />
                  </div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                      <LinkedinIcon size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">LinkedIn Ads</h3>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                        <span className="text-xs font-semibold text-amber-600 uppercase tracking-wider">{selectedPaidData.platforms.linkedinAds.status}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-slate-600 leading-relaxed mb-8 text-sm">
                    {selectedPaidData.platforms.linkedinAds.note}
                  </p>
                  <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-50">
                    <div className="text-center">
                      <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Alcance</p>
                      <span className="text-lg font-bold text-slate-300">0</span>
                    </div>
                    <div className="text-center border-x border-slate-50">
                      <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Clics</p>
                      <span className="text-lg font-bold text-slate-300">0</span>
                    </div>
                    <div className="text-center">
                      <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Inversión</p>
                      <span className="text-lg font-bold text-slate-300">$0</span>
                    </div>
                  </div>
                </div>

                {/* Google Ads Card */}
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Globe size={120} />
                  </div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                      <Globe size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">Google Ads</h3>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                        <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">{selectedPaidData.platforms.googleAds.status}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-slate-600 leading-relaxed mb-8 text-sm">
                    {selectedPaidData.platforms.googleAds.note}
                  </p>
                  <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-50">
                    <div className="text-center">
                      <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Alcance</p>
                      <span className="text-lg font-bold text-slate-300">0</span>
                    </div>
                    <div className="text-center border-x border-slate-50">
                      <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Clics</p>
                      <span className="text-lg font-bold text-slate-300">0</span>
                    </div>
                    <div className="text-center">
                      <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Inversión</p>
                      <span className="text-lg font-bold text-slate-300">$0</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* General Spending Alert */}
              <div className="bg-blue-50 border border-blue-100 p-6 rounded-2xl flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                  <Megaphone size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-blue-900 mb-1">Próximos Pasos - Q2 2026</h4>
                  <p className="text-sm text-blue-800/70 leading-relaxed">
                    Se proyecta el inicio de campañas de consideración para LinkedIn y búsqueda en Google una vez se complete la verificación de identidad. Estamos en fase de configuración de audiencias B2B segmentadas por industria cárnica y logística.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: Seguridad y Web */}
          {activeTab === 'Seguridad y Web' && (
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center py-20">
              <Shield size={64} className="mx-auto text-emerald-500 mb-6 opacity-30" />
              <h3 className="text-2xl font-bold text-slate-800 mb-2">Seguridad Optimizada</h3>
              <p className="text-slate-500 max-w-md mx-auto">El sitio no reporta vulnerabilidades críticas estructurales según nuestro último informe técnico. Los plugins y núcleo del sistema se mantienen actualizados periódicamente.</p>
            </div>
          )}

          {/* TAB 5: Looker Studio */}
          {activeTab === 'Looker Studio' && (
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 relative" style={{ minHeight: '600px' }}>
              <div className="flex flex-col h-full w-full">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-slate-800">Dashboard Interactivo</h3>
                  <p className="text-sm text-slate-500">Reporte dinámico proporcionado por Google Looker Studio.</p>
                </div>
                <div className="w-full flex-grow rounded-xl overflow-hidden border border-slate-200 bg-slate-50 flex items-center justify-center relative min-h-[500px]">
                  <iframe 
                    width="100%" 
                    height="100%" 
                    className="absolute inset-0 w-full h-full"
                    src="https://lookerstudio.google.com/embed/reporting/bebcfb87-7a7b-4829-a394-d065df58048a/page/p_8jvxmorodd" 
                    frameBorder="0" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
                  ></iframe>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
