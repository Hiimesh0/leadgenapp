import React, { useEffect, useState } from 'react';
import { clinicApi } from '../../services/api';
import { PatientEnquiry } from '../../types';
import { Mail, Phone, Calendar, CheckCircle2, MessageSquare, RefreshCw } from 'lucide-react';

export const DoctorEnquiriesPage: React.FC = () => {
  const [enquiries, setEnquiries] = useState<PatientEnquiry[]>([]);
  const [loading, setLoading] = useState(true);

  const loadEnquiries = async () => {
    setLoading(true);
    try {
      const data = await clinicApi.getEnquiries();
      setEnquiries(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEnquiries();
  }, []);

  const handleStatusToggle = async (id: string, current: string) => {
    const nextStatus = current === 'Unread' ? 'Reviewed' : current === 'Reviewed' ? 'Replied' : 'Unread';
    try {
      await clinicApi.updateEnquiryStatus(id, nextStatus as any);
      await loadEnquiries();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Patient Enquiries & Messages</h1>
          <p className="text-xs text-slate-500 mt-1">
            Incoming inquiries submitted through the public website contact form
          </p>
        </div>
        <button
          onClick={loadEnquiries}
          className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 cursor-pointer"
          title="Refresh"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      <div className="space-y-3">
        {loading ? (
          <div className="p-8 text-center text-slate-400">Loading inquiries...</div>
        ) : enquiries.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 text-slate-500 text-sm">
            No patient messages yet.
          </div>
        ) : (
          enquiries.map((enq) => (
            <div
              key={enq.id}
              className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700 font-bold text-sm">
                    {enq.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">{enq.name}</h3>
                    <div className="flex items-center gap-3 text-xs text-slate-500 mt-0.5">
                      <span className="flex items-center gap-1">
                        <Phone className="w-3 h-3 text-slate-400" />
                        {enq.phone}
                      </span>
                      {enq.email && (
                        <span className="flex items-center gap-1">
                          <Mail className="w-3 h-3 text-slate-400" />
                          {enq.email}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                      enq.status === 'Unread'
                        ? 'bg-amber-50 text-amber-700 border-amber-200'
                        : enq.status === 'Reviewed'
                        ? 'bg-blue-50 text-blue-700 border-blue-200'
                        : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    }`}
                  >
                    {enq.status}
                  </span>
                  <button
                    onClick={() => handleStatusToggle(enq.id, enq.status)}
                    className="px-2.5 py-1 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg cursor-pointer"
                  >
                    Mark Next Status
                  </button>
                </div>
              </div>

              <div>
                <div className="text-xs font-bold text-slate-700">Subject: {enq.subject}</div>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                  "{enq.message}"
                </p>
                <div className="text-[10px] text-slate-400 mt-2 text-right">
                  Received: {new Date(enq.createdAt).toLocaleString()}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
