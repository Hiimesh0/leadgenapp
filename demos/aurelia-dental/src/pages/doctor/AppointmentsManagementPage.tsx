import React, { useEffect, useState } from 'react';
import { clinicApi } from '../../services/api';
import { Appointment, AppointmentHistory, AppointmentStatus } from '../../types';
import { CLINIC_CONFIG } from '../../config/clinicConfig';
import { SERVICES } from '../../data/clinicData';
import {
  Search,
  Filter,
  Calendar,
  Clock,
  Phone,
  Mail,
  CheckCircle2,
  XCircle,
  AlertCircle,
  CalendarClock,
  History,
  X,
  Plus,
  RefreshCw,
  FileText,
  MessageSquare,
  Send
} from 'lucide-react';

export const AppointmentsManagementPage: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedService, setSelectedService] = useState<string>('all');

  // Modal states
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [appointmentHistory, setAppointmentHistory] = useState<AppointmentHistory[]>([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);

  // Reschedule Modal state
  const [rescheduleModalOpen, setRescheduleModalOpen] = useState(false);
  const [rescheduleDate, setRescheduleDate] = useState('');
  const [rescheduleTime, setRescheduleTime] = useState('11:00 AM');
  const [rescheduleNote, setRescheduleNote] = useState('');

  // WhatsApp Retry State
  const [retryingId, setRetryingId] = useState<string | null>(null);
  const [notificationBanner, setNotificationBanner] = useState<{ id: string; text: string; ok: boolean } | null>(null);

  const handleRetryWhatsApp = async (aptId: string) => {
    setRetryingId(aptId);
    try {
      const res = await clinicApi.retryNotification(aptId);
      setNotificationBanner({ id: aptId, text: res.message, ok: res.success });
      await loadAppointments();
    } catch (err: any) {
      setNotificationBanner({ id: aptId, text: err?.message || 'Notification retry failed', ok: false });
    } finally {
      setRetryingId(null);
      setTimeout(() => setNotificationBanner(null), 4500);
    }
  };

  const getNotificationBadge = (status?: string) => {
    switch (status) {
      case 'Sent to WAHA':
      case 'Delivered':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Pending':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Failed':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      default:
        return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  };

  // New Appointment Modal state (for doctor to add walk-ins)
  const [newModalOpen, setNewModalOpen] = useState(false);
  const [newPatientName, setNewPatientName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newServiceId, setNewServiceId] = useState(SERVICES[0].id);
  const [newDate, setNewDate] = useState(new Date().toISOString().split('T')[0]);
  const [newTime, setNewTime] = useState('11:00 AM');
  const [newNotes, setNewNotes] = useState('');
  const [submittingNew, setSubmittingNew] = useState(false);

  const loadAppointments = async () => {
    setLoading(true);
    try {
      const data = await clinicApi.getAppointments({
        status: selectedStatus,
        search: searchTerm,
        service: selectedService
      });
      setAppointments(data);
    } catch (err) {
      console.error('Failed to load appointments:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAppointments();
  }, [selectedStatus, selectedService]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loadAppointments();
  };

  const handleStatusChange = async (id: string, newStatus: AppointmentStatus, note?: string) => {
    try {
      await clinicApi.updateStatus(id, newStatus, note);
      await loadAppointments();
      if (selectedAppointment && selectedAppointment.id === id) {
        const updated = await clinicApi.getAppointmentWithHistory(id);
        setSelectedAppointment(updated.appointment);
        setAppointmentHistory(updated.history);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const openHistoryModal = async (apt: Appointment) => {
    setSelectedAppointment(apt);
    setShowHistoryModal(true);
    setHistoryLoading(true);
    try {
      const data = await clinicApi.getAppointmentWithHistory(apt.id);
      setAppointmentHistory(data.history);
    } catch (err) {
      console.error(err);
    } finally {
      setHistoryLoading(false);
    }
  };

  const openRescheduleModal = (apt: Appointment) => {
    setSelectedAppointment(apt);
    setRescheduleDate(apt.preferredDate);
    setRescheduleTime(apt.preferredTime);
    setRescheduleNote('');
    setRescheduleModalOpen(true);
  };

  const handleRescheduleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAppointment) return;

    try {
      await clinicApi.reschedule(
        selectedAppointment.id,
        rescheduleDate,
        rescheduleTime,
        rescheduleNote || `Rescheduled to ${rescheduleDate} at ${rescheduleTime}`
      );
      setRescheduleModalOpen(false);
      await loadAppointments();
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateAppointment = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittingNew(true);
    try {
      const service = SERVICES.find((s) => s.id === newServiceId);
      await clinicApi.createPublicAppointment({
        patient_name: newPatientName,
        phone: newPhone,
        email: newEmail,
        service_id: newServiceId,
        service_name: service ? service.name : 'General Dental Consultation',
        doctor_name: CLINIC_CONFIG.doctorName,
        preferred_date: newDate,
        preferred_time: newTime,
        notes: newNotes
      });
      setNewModalOpen(false);
      setNewPatientName('');
      setNewPhone('');
      setNewEmail('');
      setNewNotes('');
      await loadAppointments();
    } catch (err) {
      console.error(err);
    } finally {
      setSubmittingNew(false);
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
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Appointment Management</h1>
          <p className="text-xs text-slate-500 mt-1">
            Review, confirm, reschedule, or cancel patient bookings in real-time.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={loadAppointments}
            className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition cursor-pointer"
            title="Refresh Table"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button
            type="button"
            onClick={() => setNewModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-semibold shadow-sm transition cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>New Appointment</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
        {/* Status Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 pb-2 border-b border-slate-100">
          {[
            { id: 'all', label: 'All Requests' },
            { id: 'Pending', label: 'Pending' },
            { id: 'Confirmed', label: 'Confirmed' },
            { id: 'Completed', label: 'Completed' },
            { id: 'Rescheduled', label: 'Rescheduled' },
            { id: 'Cancelled', label: 'Cancelled' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedStatus(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                selectedStatus === tab.id
                  ? 'bg-teal-700 text-white shadow-sm'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search & Service Filter */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <form onSubmit={handleSearchSubmit} className="sm:col-span-2 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by Patient name, phone, email, or APT-2026 reference..."
              className="w-full pl-9 pr-20 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:ring-2 focus:ring-teal-600 transition"
            />
            <button
              type="submit"
              className="absolute right-1.5 top-1.5 px-3 py-1 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-[11px] font-semibold transition cursor-pointer"
            >
              Search
            </button>
          </form>

          <div className="relative">
            <select
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 focus:bg-white focus:ring-2 focus:ring-teal-600"
            >
              <option value="all">All Dental Services</option>
              {SERVICES.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Notification toast */}
      {notificationBanner && (
        <div
          className={`p-3 rounded-xl border text-xs flex items-center justify-between ${
            notificationBanner.ok
              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
              : 'bg-rose-50 text-rose-800 border-rose-200'
          }`}
        >
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 shrink-0" />
            <span>{notificationBanner.text}</span>
          </div>
          <button
            onClick={() => setNotificationBanner(null)}
            className="text-slate-400 hover:text-slate-600 text-xs"
          >
            ×
          </button>
        </div>
      )}

      {/* Main Appointments Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-slate-400">
            <div className="w-8 h-8 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
            <p className="text-xs font-medium">Filtering appointments...</p>
          </div>
        ) : appointments.length === 0 ? (
          <div className="p-12 text-center text-slate-500 text-sm">
            No matching appointment records found. Try adjusting your search or filters.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="px-5 py-3">Reference</th>
                  <th className="px-5 py-3">Patient Details</th>
                  <th className="px-5 py-3">Service & Doctor</th>
                  <th className="px-5 py-3">Date & Time Slot</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3">WAHA WhatsApp</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {appointments.map((apt) => (
                  <tr key={apt.id} className="hover:bg-slate-50/80 transition">
                    {/* Ref */}
                    <td className="px-5 py-4 whitespace-nowrap">
                      <span className="font-mono text-xs font-bold text-slate-800 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">
                        {apt.appointmentRef}
                      </span>
                      <div className="text-[10px] text-slate-400 mt-1">
                        Booked: {new Date(apt.createdAt).toLocaleDateString()}
                      </div>
                    </td>

                    {/* Patient */}
                    <td className="px-5 py-4">
                      <div className="font-semibold text-slate-900 text-sm">{apt.patientName}</div>
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
                        <Phone className="w-3 h-3 text-slate-400" />
                        <span>{apt.phone}</span>
                      </div>
                      {apt.email && (
                        <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mt-0.5">
                          <Mail className="w-3 h-3 text-slate-400" />
                          <span>{apt.email}</span>
                        </div>
                      )}
                    </td>

                    {/* Service */}
                    <td className="px-5 py-4">
                      <div className="text-xs font-semibold text-slate-800 line-clamp-1">
                        {apt.serviceName}
                      </div>
                      <div className="text-[11px] text-teal-700 mt-0.5 font-medium">
                        {apt.doctorName || CLINIC_CONFIG.doctorName}
                      </div>
                      {apt.notes && (
                        <div className="text-[11px] text-slate-500 mt-1 italic line-clamp-1">
                          "{apt.notes}"
                        </div>
                      )}
                    </td>

                    {/* Schedule */}
                    <td className="px-5 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-800">
                        <Calendar className="w-3.5 h-3.5 text-teal-600" />
                        <span>{apt.preferredDate}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mt-0.5">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>{apt.preferredTime}</span>
                      </div>
                    </td>

                    {/* Status Badge */}
                    <td className="px-5 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${getStatusBadge(
                          apt.status
                        )}`}
                      >
                        {apt.status}
                      </span>
                    </td>

                    {/* WhatsApp Notification Column */}
                    <td className="px-5 py-4 whitespace-nowrap">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold border ${getNotificationBadge(
                              apt.notificationStatus
                            )}`}
                          >
                            {apt.notificationStatus || 'Not Configured'}
                          </span>
                          {(apt.notificationStatus === 'Failed' ||
                            apt.notificationStatus === 'Not Configured' ||
                            !apt.notificationStatus) && (
                            <button
                              type="button"
                              onClick={() => handleRetryWhatsApp(apt.id)}
                              disabled={retryingId === apt.id}
                              className="p-1 text-teal-700 bg-teal-50 hover:bg-teal-100 rounded border border-teal-200 transition cursor-pointer disabled:opacity-50"
                              title="Retry Sending WhatsApp Confirmation via WAHA"
                            >
                              <Send className={`w-3 h-3 ${retryingId === apt.id ? 'animate-pulse' : ''}`} />
                            </button>
                          )}
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono">
                          {apt.notificationMaskedPhone || apt.phone}
                        </div>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        {apt.status === 'Pending' && (
                          <button
                            type="button"
                            onClick={() => handleStatusChange(apt.id, 'Confirmed')}
                            className="p-1.5 text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg border border-emerald-200 transition cursor-pointer"
                            title="Confirm Appointment"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                          </button>
                        )}

                        {apt.status === 'Confirmed' && (
                          <button
                            type="button"
                            onClick={() => handleStatusChange(apt.id, 'Completed')}
                            className="p-1.5 text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 transition cursor-pointer"
                            title="Mark Completed"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() => openRescheduleModal(apt)}
                          className="p-1.5 text-purple-700 bg-purple-50 hover:bg-purple-100 rounded-lg border border-purple-200 transition cursor-pointer"
                          title="Reschedule Date / Time"
                        >
                          <CalendarClock className="w-4 h-4" />
                        </button>

                        {apt.status !== 'Cancelled' && (
                          <button
                            type="button"
                            onClick={() => handleStatusChange(apt.id, 'Cancelled', 'Cancelled by doctor request.')}
                            className="p-1.5 text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-lg border border-rose-200 transition cursor-pointer"
                            title="Cancel Appointment"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() => openHistoryModal(apt)}
                          className="p-1.5 text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition cursor-pointer"
                          title="View Audit Log & Notes"
                        >
                          <History className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Reschedule Modal */}
      {rescheduleModalOpen && selectedAppointment && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <CalendarClock className="w-5 h-5 text-purple-600" />
                <h3 className="text-base font-bold text-slate-900">Reschedule Appointment</h3>
              </div>
              <button
                onClick={() => setRescheduleModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-purple-50/50 p-3 rounded-xl text-xs text-purple-900 border border-purple-100">
              Patient: <strong>{selectedAppointment.patientName}</strong> ({selectedAppointment.appointmentRef})
            </div>

            <form onSubmit={handleRescheduleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  New Preferred Date
                </label>
                <input
                  type="date"
                  required
                  value={rescheduleDate}
                  onChange={(e) => setRescheduleDate(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  New Time Slot
                </label>
                <select
                  value={rescheduleTime}
                  onChange={(e) => setRescheduleTime(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm"
                >
                  <option value="09:30 AM">09:30 AM - Morning</option>
                  <option value="10:30 AM">10:30 AM - Morning</option>
                  <option value="11:30 AM">11:30 AM - Morning</option>
                  <option value="02:00 PM">02:00 PM - Afternoon</option>
                  <option value="03:30 PM">03:30 PM - Afternoon</option>
                  <option value="05:00 PM">05:00 PM - Evening</option>
                  <option value="06:30 PM">06:30 PM - Evening</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Reschedule Note / Reason
                </label>
                <textarea
                  rows={2}
                  value={rescheduleNote}
                  onChange={(e) => setRescheduleNote(e.target.value)}
                  placeholder="e.g. Moved slot as per patient telephonic request."
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setRescheduleModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-semibold shadow-sm"
                >
                  Confirm Reschedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Appointment History & Audit Modal */}
      {showHistoryModal && selectedAppointment && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-slate-200 space-y-4 max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <History className="w-5 h-5 text-teal-600" />
                <h3 className="text-base font-bold text-slate-900">
                  Appointment Audit Log & History
                </h3>
              </div>
              <button
                onClick={() => setShowHistoryModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-xl text-xs text-slate-700 space-y-1">
              <div>
                <strong>Reference:</strong> {selectedAppointment.appointmentRef}
              </div>
              <div>
                <strong>Patient:</strong> {selectedAppointment.patientName} ({selectedAppointment.notificationMaskedPhone || selectedAppointment.phone})
              </div>
              <div>
                <strong>Service:</strong> {selectedAppointment.serviceName}
              </div>
              <div className="pt-2 mt-2 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2">
                <div>
                  <span className="font-semibold text-slate-800">WhatsApp Notification: </span>
                  <span
                    className={`inline-block px-2 py-0.5 rounded text-[11px] font-semibold border ${getNotificationBadge(
                      selectedAppointment.notificationStatus
                    )}`}
                  >
                    {selectedAppointment.notificationStatus || 'Not Configured'}
                  </span>
                </div>
                {(selectedAppointment.notificationStatus === 'Failed' ||
                  selectedAppointment.notificationStatus === 'Not Configured') && (
                  <button
                    type="button"
                    onClick={() => handleRetryWhatsApp(selectedAppointment.id)}
                    disabled={retryingId === selectedAppointment.id}
                    className="inline-flex items-center gap-1 px-2.5 py-1 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-xs font-semibold cursor-pointer disabled:opacity-50"
                  >
                    <Send className="w-3 h-3" />
                    <span>Retry WhatsApp</span>
                  </button>
                )}
              </div>
              {selectedAppointment.notificationError && (
                <div className="p-2 bg-rose-50 text-rose-700 rounded-lg text-[11px] border border-rose-200 mt-1">
                  <strong>WAHA Error:</strong> {selectedAppointment.notificationError}
                </div>
              )}
            </div>

            <div className="flex-1 overflow-y-auto space-y-3 pr-1">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Audit Timeline
              </h4>

              {historyLoading ? (
                <div className="p-4 text-center text-xs text-slate-400">Loading history...</div>
              ) : appointmentHistory.length === 0 ? (
                <div className="p-4 text-center text-xs text-slate-500">
                  No previous transition records found.
                </div>
              ) : (
                <div className="relative pl-6 space-y-4 border-l-2 border-teal-200 ml-3">
                  {appointmentHistory.map((item) => (
                    <div key={item.id} className="relative">
                      <div className="absolute -left-[31px] top-0 w-3.5 h-3.5 rounded-full bg-teal-600 border-2 border-white ring-2 ring-teal-100" />
                      <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/70">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-slate-900">
                            {item.previousStatus ? `${item.previousStatus} → ` : ''}
                            <span className="text-teal-700">{item.newStatus}</span>
                          </span>
                          <span className="text-[10px] text-slate-400">
                            {new Date(item.changedAt).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-600 mt-1">
                          By: <strong className="text-slate-800">{item.changedBy}</strong>
                        </div>
                        {item.note && (
                          <div className="text-xs text-slate-500 mt-1 italic">
                            "{item.note}"
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-2 border-t border-slate-100 text-right">
              <button
                type="button"
                onClick={() => setShowHistoryModal(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold"
              >
                Close Log
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Appointment Modal (Doctor Manual Entry) */}
      {newModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Plus className="w-5 h-5 text-teal-600" />
                <h3 className="text-base font-bold text-slate-900">Add Clinic Appointment</h3>
              </div>
              <button
                onClick={() => setNewModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateAppointment} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Patient Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={newPatientName}
                    onChange={(e) => setNewPatientName(e.target.value)}
                    placeholder="e.g. Ramesh Patel"
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    placeholder="9876543210"
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Email (Optional)
                </label>
                <input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="patient@example.com"
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Dental Service *
                </label>
                <select
                  value={newServiceId}
                  onChange={(e) => setNewServiceId(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm"
                >
                  {SERVICES.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.duration})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Appointment Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Time Slot *
                  </label>
                  <select
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm"
                  >
                    <option value="09:30 AM">09:30 AM - Morning</option>
                    <option value="10:30 AM">10:30 AM - Morning</option>
                    <option value="11:30 AM">11:30 AM - Morning</option>
                    <option value="02:00 PM">02:00 PM - Afternoon</option>
                    <option value="03:30 PM">03:30 PM - Afternoon</option>
                    <option value="05:00 PM">05:00 PM - Evening</option>
                    <option value="06:30 PM">06:30 PM - Evening</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Clinical Notes / Concerns
                </label>
                <textarea
                  rows={2}
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  placeholder="e.g. Walk-in patient consultation"
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setNewModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submittingNew}
                  className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-semibold shadow-sm transition disabled:opacity-50"
                >
                  {submittingNew ? 'Saving...' : 'Create Appointment'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

