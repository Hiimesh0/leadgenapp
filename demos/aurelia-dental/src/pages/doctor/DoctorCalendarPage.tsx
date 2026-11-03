import React, { useEffect, useState } from 'react';
import { clinicApi } from '../../services/api';
import { Appointment } from '../../types';
import { CLINIC_CONFIG } from '../../config/clinicConfig';
import { Calendar, Clock, Phone, ChevronLeft, ChevronRight, CheckCircle2, AlertCircle } from 'lucide-react';

export const DoctorCalendarPage: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );

  useEffect(() => {
    const fetchApts = async () => {
      setLoading(true);
      try {
        const data = await clinicApi.getAppointments();
        setAppointments(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchApts();
  }, []);

  const changeDay = (offset: number) => {
    const current = new Date(selectedDate);
    current.setDate(current.getDate() + offset);
    setSelectedDate(current.toISOString().split('T')[0]);
  };

  const dayAppointments = appointments.filter(
    (a) => a.preferredDate === selectedDate && a.status !== 'Cancelled'
  );

  const timeSlots = [
    '09:00 AM',
    '10:30 AM',
    '11:00 AM',
    '11:30 AM',
    '02:00 PM',
    '03:00 PM',
    '03:30 PM',
    '04:30 PM',
    '05:00 PM',
    '06:30 PM'
  ];

  return (
    <div className="space-y-6">
      {/* Calendar Header with Day Navigation */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Clinical Calendar Schedule</h1>
          <p className="text-xs text-slate-500 mt-1">
            Organized appointment timetable for {CLINIC_CONFIG.doctorName}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => changeDay(-1)}
            className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-3 py-1.5 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 bg-slate-50"
          />
          <button
            type="button"
            onClick={() => changeDay(1)}
            className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setSelectedDate(new Date().toISOString().split('T')[0])}
            className="px-3 py-1.5 bg-teal-50 text-teal-700 hover:bg-teal-100 border border-teal-200 rounded-xl text-xs font-semibold cursor-pointer"
          >
            Today
          </button>
        </div>
      </div>

      {/* Date Banner */}
      <div className="bg-slate-100/70 p-4 rounded-xl border border-slate-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-teal-700" />
          <span className="text-sm font-bold text-slate-900">
            {new Date(selectedDate).toLocaleDateString('en-IN', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </span>
        </div>
        <span className="text-xs font-semibold text-teal-800 bg-teal-100 px-2.5 py-1 rounded-full">
          {dayAppointments.length} Bookings Scheduled
        </span>
      </div>

      {/* Timetable Slot Visualizer */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
        {loading ? (
          <div className="p-8 text-center text-slate-400">Loading schedule...</div>
        ) : (
          <div className="space-y-3">
            {timeSlots.map((slot) => {
              const matchedApt = dayAppointments.find((a) => a.preferredTime.includes(slot.split(' ')[0]));
              return (
                <div
                  key={slot}
                  className={`flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl border transition ${
                    matchedApt
                      ? 'bg-teal-50/40 border-teal-200'
                      : 'bg-slate-50/40 border-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-24 flex items-center gap-1.5 text-xs font-bold text-slate-700">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{slot}</span>
                    </div>

                    {matchedApt ? (
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-slate-900">
                            {matchedApt.patientName}
                          </span>
                          <span className="text-[10px] font-mono bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-600">
                            {matchedApt.appointmentRef}
                          </span>
                        </div>
                        <div className="text-xs text-teal-800 mt-0.5 font-medium">
                          {matchedApt.serviceName}
                        </div>
                      </div>
                    ) : (
                      <span className="text-xs text-slate-400 italic">Available Slot</span>
                    )}
                  </div>

                  {matchedApt && (
                    <div className="mt-2 sm:mt-0 flex items-center gap-2">
                      <div className="flex items-center gap-1 text-xs text-slate-500">
                        <Phone className="w-3 h-3 text-slate-400" />
                        <span>{matchedApt.phone}</span>
                      </div>
                      <span
                        className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                          matchedApt.status === 'Confirmed'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {matchedApt.status}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
