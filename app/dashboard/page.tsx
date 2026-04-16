import React from "react";
import { getDb } from "@/lib/db";
import { Calendar, Mail, Phone, Briefcase, User } from "lucide-react";

export default async function DashboardPage() {
  // Ambil data langsung dari file JSON
  const db = await getDb();
  const applications = db.data.applications;

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8 bg-slate-50 min-h-screen font-sans">
      <div className="mb-10 flex flex-col sm:flex-row justify-between items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight italic uppercase">Applicant Dashboard</h1>
          <p className="text-sm text-slate-500 mt-1 uppercase tracking-widest font-semibold">LowDB JSON Storage Mode</p>
        </div>
        <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block leading-none mb-1">Total Applicants</span>
            <span className="text-2xl font-black text-slate-900 leading-none">{applications.length}</span>
          </div>
        </div>
      </div>

      {applications.length === 0 ? (
        <div className="bg-white p-20 text-center rounded-3xl border border-slate-100 shadow-sm">
          <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-slate-300" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900">No applications found in db.json</h3>
          <p className="text-slate-500 mt-1">Submit a form to see data here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {applications.map((app: any) => (
            <div 
              key={app.id} 
              className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="flex flex-col lg:flex-row justify-between gap-6">
                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-sm italic">
                      {app.personalData?.fullName?.charAt(0) || "A"}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 leading-tight uppercase tracking-tight">{app.personalData?.fullName}</h3>
                      <p className="text-sm text-blue-600 font-semibold flex items-center gap-1.5 mt-0.5 uppercase tracking-wider text-[11px]">
                        <Briefcase className="w-3 h-3" /> {app.personalData?.appliedPosition}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="flex items-center gap-2 text-slate-500 text-[13px] font-medium">
                      <Mail className="w-4 h-4 text-slate-300" />
                      {app.personalData?.email}
                    </div>
                    <div className="flex items-center gap-2 text-slate-500 text-[13px] font-medium">
                      <Phone className="w-4 h-4 text-slate-300" />
                      {app.personalData?.mobilePhone}
                    </div>
                    <div className="flex items-center gap-2 text-slate-500 text-[13px] font-medium">
                      <Calendar className="w-4 h-4 text-slate-300" />
                      Applied: {new Date(app.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6 lg:border-l lg:pl-6 border-slate-100">
                  <div className="text-right hidden sm:block">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Expected Join</p>
                    <p className="text-sm font-bold text-slate-700 italic">{app.finalSection?.expectedJoinDate}</p>
                  </div>
                  <button className="bg-slate-900 text-white px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-lg shadow-slate-100 active:scale-95">
                    VIEW DETAILS
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
