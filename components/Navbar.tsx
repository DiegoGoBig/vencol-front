import React, { useState, useEffect } from 'react';
import { NavLink as RouterNavLink, useLocation, Link } from 'react-router-dom';
import { Menu, X, Leaf, ArrowRight, ChevronDown } from 'lucide-react';
import { NavLink } from '../types';
import { siteContent } from '../data/data';

// "Soluciones" is handled separately due to the dropdown requirement
const links = siteContent.navigation;

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false);
  const location = useLocation();
  
  const solutionsData = siteContent.solutions.items;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
    setMobileSolutionsOpen(false);
  }, [location]);

  return (
    <nav 
      className={`
        fixed top-0 left-0 w-full z-50 transition-all duration-300
        ${scrolled ? 'glass-panel border-b border-white/5 py-2' : 'bg-transparent py-6'}
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center justify-between h-14">
          
          {/* Left: Logo */}
          <RouterNavLink to="/" className="flex items-center gap-2 group z-10 flex-shrink-0">           
            <img src={siteContent.header.logo} alt="" width={100} height={100}/>
          </RouterNavLink>

          {/* Center: Desktop Menu */}
          <div className="hidden md:flex absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 items-center justify-center space-x-1 bg-black/20 backdrop-blur-md px-2 py-1 rounded-full border border-white/5">
            {links.map((link) => {
              // Inject Soluciones Dropdown after "Nosotros" (index 1)
              const isNosotros = link.label === 'Nosotros';
              
              return (
                <React.Fragment key={link.path}>
                  <RouterNavLink
                    to={link.path}
                    className={({ isActive }) => `
                      px-4 py-1.5 rounded-full text-md font-medium transition-all duration-300
                      ${isActive 
                        ? 'text-brand-green bg-white/10 shadow-[0_0_10px_rgba(74,222,128,0.1)]' 
                        : 'text-gray-300 hover:text-white hover:bg-white/5'}
                    `}
                  >
                    {link.label}
                  </RouterNavLink>

                  {/* Dropdown Logic */}
                  {isNosotros && (
                    <div className="relative group">
                      <button className="flex items-center px-4 py-1.5 rounded-full text-md font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-300 group-hover:text-brand-green">
                        Soluciones
                        <ChevronDown className="w-4 h-4 ml-1 group-hover:rotate-180 transition-transform duration-300" />
                      </button>
                      
                      {/* Dropdown Content */}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-96 bg-black backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 shadow-2xl z-50">
                        <div className="py-2">
                          {solutionsData.map((solution) => (
                            <Link 
                              key={solution.id}
                              to={`/soluciones/${solution.slug}`}
                              className="block px-4 py-3 text-md text-gray-300 hover:text-white hover:bg-white/10 transition-colors border-l-2 border-transparent hover:border-brand-green"
                            >
                              <div className="font-semibold">{solution.title}</div>
                              <div className="text-xs text-glass-muted mt-0.5 truncate">{solution.description}</div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* Right: CTA & Mobile Button */}
          <div className="flex items-center gap-4 z-10">
            {/* Desktop CTA Button */}
            <Link 
              to={siteContent.header.cta.path} 
              className="hidden md:flex items-center gap-2 glass-button px-5 py-2 rounded-full text-md font-semibold text-white hover:bg-white/20 hover:scale-105 transition-all group"
            >
              {siteContent.header.cta.label}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-brand-green"/>
            </Link>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-white/10 focus:outline-none transition-colors"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`
          md:hidden glass-panel border-t border-white/5 overflow-hidden transition-all duration-300 ease-in-out
          ${isOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}
        `}
      >
        <div className="px-4 pt-4 pb-6 space-y-2 overflow-y-auto max-h-[80vh]">
          {links.map((link) => {
             const isNosotros = link.label === 'Nosotros';
             return (
              <React.Fragment key={link.path}>
                <RouterNavLink
                  to={link.path}
                  className={({ isActive }) => `
                    block px-3 py-3 rounded-xl text-base font-medium
                    ${isActive ? 'text-brand-green bg-white/10' : 'text-gray-300 hover:text-white hover:bg-white/5'}
                  `}
                >
                  {link.label}
                </RouterNavLink>

                {isNosotros && (
                  <div className="space-y-1">
                    <button 
                      onClick={() => setMobileSolutionsOpen(!mobileSolutionsOpen)}
                      className={`
                        w-full flex items-center justify-between px-3 py-3 rounded-xl text-base font-medium transition-colors
                        ${mobileSolutionsOpen ? 'text-white' : 'text-gray-300 hover:text-white hover:bg-white/5'}
                      `}
                    >
                      Soluciones
                      <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${mobileSolutionsOpen ? 'rotate-180' : ''}`} />
                    </button>
                    
                    <div className={`space-y-1 pl-4 border-l border-white/10 ml-3 transition-all duration-300 overflow-hidden ${mobileSolutionsOpen ? 'max-h-[500px] opacity-100 py-2' : 'max-h-0 opacity-0'}`}>
                      {solutionsData.map((solution) => (
                        <Link
                          key={solution.id}
                          to={`/soluciones/${solution.slug}`}
                          className="block px-3 py-2 text-md text-gray-400 hover:text-brand-green hover:bg-white/5 rounded-lg transition-colors"
                        >
                          {solution.menuTitle}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </React.Fragment>
             )
          })}
          
          {/* Mobile Contact Link */}
          <RouterNavLink
            to={siteContent.header.cta.path}
            className={({ isActive }) => `
              block px-3 py-3 rounded-xl text-base font-medium
              ${isActive ? 'text-brand-green bg-white/10' : 'text-gray-300 hover:text-white hover:bg-white/5'}
            `}
          >
            {siteContent.header.cta.label}
          </RouterNavLink>
        </div>
      </div>
    </nav>
  );
};