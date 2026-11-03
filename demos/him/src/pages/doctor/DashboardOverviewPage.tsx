import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { clinicApi } from '../../services/api';
import { Appointment, DashboardStats } from '../../types';
import { CLINIC_CONFIG } from '../../config/clinicConfig';
import {
  CalendarCheck2,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Calendar,
  ArrowRight,
  RefreshCw,
  Phone,
  CalendarDays,
  FileText
} from 'lucide-react';

export const DashboardOverviewPage: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentAppointments, setRecentAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const [s, apts] = await Promise.all([
        clinicApi.getStats(),
        clinicApi.getAppointments()
      ]);
      setStats(s);
      setRecentAppointments(apts.slice(0, 5));
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleQuickConfirm = async (id: string) => {
    setActionLoading(id);
    try {
      await clinicApi.updateStatus(id, 'Confirmed', 'Quick-confirmed from Doctor Dashboard Overview.');
      await loadData();
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(null);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Confirmed':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Pending':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Completed':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Cancelled':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'Rescheduled':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-teal-700 to-teal-900 rounded-2xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-teal-100 text-xs font-semibold mb-3">
            <span>Clinical Management Dashboard</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Welcome back, {CLINIC_CONFIG.doctorName}
          </h1>
          <p className="mt-1 text-sm text-teal-100 max-w-xl">
            {CLINIC_CONFIG.clinicName} — All patient requests and appointment workflows are updated live.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              to="/doctor/appointments"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white text-teal-900 font-semibold text-xs rounded-xl hover:bg-teal-50 transition shadow-sm"
            >
              <span>Manage Appointments</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <button
              onClick={loadData}
              className="inline-flex items-center gap-2 px-3 py-2 bg-teal-800/80 hover:bg-teal-800 text-white font-semibold text-xs rounded-xl transition border border-teal-600/40 cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh Live Data</span>
            </button>
          </div>
        </div>
      </div>

      {/* 6 Key Performance Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {/* Total */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Total</span>
            <FileText className="w-4 h-4 text-slate-400" />
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-900">{stats?.total ?? 0}</div>
            <div className="text-[11px] text-slate-500 mt-0.5">All Bookings</div>
          </div>
        </div>

        {/* Today */}
        <div className="bg-white p-4 rounded-2xl border border-teal-200/80 bg-teal-50/20 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-teal-800 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Today</span>
            <Calendar className="w-4 h-4 text-teal-600" />
          </div>
          <div>
            <div className="text-2xl font-bold text-teal-900">{stats?.today ?? 0}</div>
            <div className="text-[11px] text-teal-700 mt-0.5">Scheduled for today</div>
          </div>
        </div>

        {/* Pending */}
        <div className="bg-white p-4 rounded-2xl border border-amber-200/80 bg-amber-50/20 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-amber-800 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Pending</span>
            <AlertCircle className="w-4 h-4 text-amber-600" />
          </div>
          <div>
            <div className="text-2xl font-bold text-amber-800">{stats?.pending ?? 0}</div>
            <div className="text-[11px] text-amber-700 mt-0.5">Requires Doctor Review</div>
          </div>
        </div>

        {/* Confirmed */}
        <div className="bg-white p-4 rounded-2xl border border-emerald-200/80 bg-emerald-50/20 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-emerald-800 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Confirmed</span>
            <CalendarCheck2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div>
            <div className="text-2xl font-bold text-emerald-900">{stats?.confirmed ?? 0}</div>
            <div className="text-[11px] text-emerald-700 mt-0.5">Approved Appointments</div>
          </div>
        </div>

        {/* Completed */}
        <div className="bg-white p-4 rounded-2xl border border-blue-200/80 bg-blue-50/20 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-blue-800 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Completed</span>
            <CheckCircle2 className="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-900">{stats?.completed ?? 0}</div>
            <div className="text-[11px] text-blue-700 mt-0.5">Finished Consultations</div>
          </div>
        </div>

        {/* Cancelled / Rescheduled */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Changes</span>
            <XCircle className="w-4 h-4 text-rose-500" />
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-900">
              {(stats?.cancelled ?? 0) + (stats?.rescheduled ?? 0)}
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">
              {stats?.cancelled ?? 0} Can. / {stats?.rescheduled ?? 0} Resch.
            </div>
          </div>
        </div>
      </div>

      {/* Recent Appointment Requests Table with Quick Actions */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">Recent Appointment Requests</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Live submissions from the online website booking form
            </p>
          </div>
          <Link
            to="/doctor/appointments"
            className="text-xs font-semibold text-teal-700 hover:text-teal-800 flex items-center gap-1"
          >
            <span>View All ({stats?.total ?? 0})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {loading ? (
          <div className="p-8 text-center text-slate-400">
            <div className="w-8 h-8 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
            <p className="text-xs font-medium">Loading requests...</p>
          </div>
        ) : recentAppointments.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-sm">
            No appointment records found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3">Ref ID</th>
                  <th className="px-6 py-3">Patient Info</th>
                  <th className="px-6 py-3">Requested Service</th>
                  <th className="px-6 py-3">Date & Time</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3 text-right">Quick Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentAppointments.map((apt) => (
                  <tr key={apt.id} className="hover:bg-slate-50/70 transition">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-mono text-xs font-bold text-slate-800 bg-slate-100 px-2 py-1 rounded">
                        {apt.appointmentRef}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-slate-900 text-sm">{apt.patientName}</div>
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
                        <Phone className="w-3 h-3 text-slate-400" />
                        <span>{apt.phone}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs font-medium text-slate-700 line-clamp-1">
                        {apt.serviceName}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-800">
                        <CalendarDays className="w-3.5 h-3.5 text-teal-600" />
                        <span>{apt.preferredDate}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mt-0.5">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>{apt.preferredTime}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${getStatusBadge(
                          apt.status
                        )}`}
                      >
                        {apt.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right whitespace-nowrap">
                      {apt.status === 'Pending' ? (
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => handleQuickConfirm(apt.id)}
                            disabled={actionLoading === apt.id}
                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow-sm transition disabled:opacity-50 cursor-pointer"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Confirm</span>
                          </button>
                          <Link
                            to="/doctor/appointments"
                            className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition"
                          >
                            Manage
                          </Link>
                        </div>
                      ) : (
                        <Link
                          to="/doctor/appointments"
                          className="inline-flex items-center gap-1 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition"
                        >
                          <span>Review</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

