import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { CLINIC_CONFIG } from '../../config/clinicConfig';
import { Lock, Mail, Eye, EyeOff, ShieldAlert, ArrowRight, ArrowLeft, KeyRound } from 'lucide-react';

export const DoctorLoginPage: React.FC = () => {
  const [email, setEmail] = useState('kanthariyahimesh@gmail.com');
  const [password, setPassword] = useState('DoctorXYZ@2026');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await login(email, password);
      navigate('/doctor/dashboard');
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const fillDemoCreds = (userEmail: string) => {
    setEmail(userEmail);
    setPassword('DoctorXYZ@2026');
    setError(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
      {/* Top Demo Notice */}
      <div className="max-w-md w-full mx-auto px-4 mb-6">
        <div className="p-3.5 bg-amber-500/10 border border-amber-300/70 rounded-xl text-xs text-amber-900 flex items-start gap-2.5">
          <ShieldAlert className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">DEMO NOTICE: </span>
            {CLINIC_CONFIG.demoNotice}
          </div>
        </div>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-teal-600 text-white font-bold text-2xl shadow-lg shadow-teal-700/20 mb-3">
            XYZ
          </div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            {CLINIC_CONFIG.clinicName}
          </h2>
          <p className="text-sm font-medium text-teal-700 mt-1">
            Doctor Administration & Appointment Portal
          </p>
        </div>

        <div className="mt-8 bg-white py-8 px-6 shadow-xl shadow-slate-200/50 rounded-2xl border border-slate-200 sm:px-10">
          {error && (
            <div className="mb-6 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm flex items-center gap-2">
              <span className="font-semibold">Error:</span> {error}
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Doctor Email Address
              </label>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm focus:bg-white focus:ring-2 focus:ring-teal-600 focus:border-teal-600 transition"
                  placeholder="kanthariyahimesh@gmail.com"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Password
                </label>
              </div>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm focus:bg-white focus:ring-2 focus:ring-teal-600 focus:border-teal-600 transition"
                  placeholder="DoctorXYZ@2026"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-md text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50 transition cursor-pointer"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Logging in...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick-Fill Demo Credentials Helper */}
          <div className="mt-6 pt-5 border-t border-slate-100">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 mb-2">
              <KeyRound className="w-3.5 h-3.5 text-teal-600" />
              <span>Demo Login Credentials:</span>
            </div>
            <div className="grid grid-cols-1 gap-2">
              <button
                type="button"
                onClick={() => fillDemoCreds('kanthariyahimesh@gmail.com')}
                className="w-full text-left p-2.5 bg-slate-50 hover:bg-teal-50/60 border border-slate-200 rounded-xl text-xs text-slate-700 transition flex items-center justify-between"
              >
                <div>
                  <span className="font-semibold text-slate-900">Dr. XYZ Account:</span>
                  <div className="text-[11px] text-slate-500">kanthariyahimesh@gmail.com</div>
                </div>
                <span className="text-[10px] font-bold text-teal-700 bg-white px-2 py-1 rounded-md border border-slate-200">
                  Quick Fill
                </span>
              </button>
            </div>
            <div className="mt-2 text-[11px] text-slate-500 text-center">
              Password: <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono text-slate-800">DoctorXYZ@2026</code>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-teal-700 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Public Clinic Website</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

