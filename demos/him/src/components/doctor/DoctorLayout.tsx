import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { CLINIC_CONFIG } from '../../config/clinicConfig';
import {
  LayoutDashboard,
  CalendarDays,
  CalendarCheck2,
  Mail,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
  ShieldAlert,
  User
} from 'lucide-react';

export const DoctorLayout: React.FC = () => {
  const { doctor, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/doctor/login');
  };

  const navItems = [
    { label: 'Overview', to: '/doctor/dashboard', icon: LayoutDashboard },
    { label: 'Appointments', to: '/doctor/appointments', icon: CalendarCheck2 },
    { label: 'Calendar Schedule', to: '/doctor/calendar', icon: CalendarDays },
    { label: 'Patient Enquiries', to: '/doctor/enquiries', icon: Mail },
    { label: 'Clinic Settings', to: '/doctor/settings', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Top Demo Banner */}
      <div className="bg-amber-500/10 border-b border-amber-200/60 px-4 py-2 text-xs text-amber-900 flex items-center justify-between">
        <div className="flex items-center gap-2 max-w-4xl mx-auto text-center sm:text-left justify-center sm:justify-start w-full">
          <ShieldAlert className="w-4 h-4 text-amber-600 flex-shrink-0" />
          <span>
            <strong>DEMO DASHBOARD</strong> — {CLINIC_CONFIG.demoNotice}
          </span>
        </div>
      </div>

      {/* Main Admin Navigation Bar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Left: Brand & Mobile Trigger */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                aria-label="Toggle Navigation"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>

              <Link to="/doctor/dashboard" className="flex items-center gap-2.5 group">
                <div className="w-9 h-9 rounded-xl bg-teal-600 flex items-center justify-center text-white font-bold text-lg shadow-sm">
                  XYZ
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-sm tracking-tight leading-none group-hover:text-teal-700 transition">
                    {CLINIC_CONFIG.clinicName}
                  </div>
                  <span className="text-[11px] font-medium text-teal-700 uppercase tracking-wider">
                    Doctor Portal
                  </span>
                </div>
              </Link>
            </div>

            {/* Right: Public Website Link + Doctor Profile Badge + Logout */}
            <div className="flex items-center gap-3 sm:gap-4">
              <Link
                to="/"
                target="_blank"
                rel="noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition"
              >
                <span>View Public Site</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
              </Link>

              <div className="hidden md:flex items-center gap-2.5 pl-3 border-l border-slate-200">
                <div className="w-8 h-8 rounded-full bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700 font-semibold text-xs">
                  <User className="w-4 h-4 text-teal-700" />
                </div>
                <div className="text-left text-xs">
                  <div className="font-semibold text-slate-900 leading-tight">
                    {doctor?.name || CLINIC_CONFIG.doctorName}
                  </div>
                  <div className="text-[11px] text-slate-500 truncate max-w-[150px]">
                    {doctor?.email || CLINIC_CONFIG.contactEmail}
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg transition cursor-pointer"
                title="Log out of doctor session"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area with Sidebar */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex gap-6">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <nav className="bg-white rounded-2xl border border-slate-200 p-3 shadow-sm sticky top-24 space-y-1">
            <div className="px-3 py-2 text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
              Clinic Administration
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/doctor/dashboard'}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition ${
                      isActive
                        ? 'bg-teal-50 text-teal-800 shadow-sm border border-teal-200/50'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                    }`
                  }
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}

            <div className="pt-4 mt-4 border-t border-slate-100">
              <div className="px-3 py-2 bg-slate-50 rounded-xl text-xs text-slate-500">
                <p className="font-semibold text-slate-800">{CLINIC_CONFIG.doctorName}</p>
                <p className="text-[11px] mt-0.5 text-slate-500">{CLINIC_CONFIG.specialization}</p>
                <p className="text-[10px] text-teal-700 mt-1 font-medium">📍 {CLINIC_CONFIG.city}</p>
              </div>
            </div>
          </nav>
        </aside>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          >
            <div
              className="w-72 bg-white h-full p-4 shadow-xl flex flex-col justify-between"
              onClick={(e) => e.stopPropagation()}
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-teal-600 text-white font-bold flex items-center justify-center text-sm">
                      XYZ
                    </div>
                    <span className="font-bold text-sm text-slate-900">Dr. XYZ Portal</span>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1 rounded-lg hover:bg-slate-100 text-slate-500"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-1">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <NavLink
                        key={item.to}
                        to={item.to}
                        end={item.to === '/doctor/dashboard'}
                        onClick={() => setMobileMenuOpen(false)}
                        className={({ isActive }) =>
                          `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition ${
                            isActive
                              ? 'bg-teal-50 text-teal-800'
                              : 'text-slate-600 hover:bg-slate-100'
                          }`
                        }
                      >
                        <Icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </NavLink>
                    );
                  })}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200">
                <Link
                  to="/"
                  target="_blank"
                  className="flex items-center justify-center gap-2 w-full py-2.5 px-4 mb-2 bg-slate-100 text-slate-700 rounded-xl text-sm font-semibold hover:bg-slate-200"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Public Demo Website</span>
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-rose-50 text-rose-700 border border-rose-200 rounded-xl text-sm font-semibold hover:bg-rose-100"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Log Out</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Dynamic Nested Content */}
        <main className="flex-1 min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

