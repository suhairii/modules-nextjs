import React from "react";
import { getDb } from "@/lib/db";
import { Calendar, Mail, Phone, Briefcase, User, Search, ChevronRight, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function DashboardPage() {
  const db = await getDb();
  const applications = db.data.applications;

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8 bg-slate-50 min-h-screen font-sans">
      {/* Top Navigation */}
      <div className="mb-12 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-all text-sm font-semibold uppercase tracking-widest group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Form
        </Link>
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Database Online</span>
        </div>
      </div>

      <div className="mb-12 space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic leading-none">
              Applicants <span className="text-blue-600">Pool</span>
            </h1>
            <p className="text-sm text-slate-500 mt-3 font-medium uppercase tracking-widest">
              Reviewing {applications.length} submitted applications
            </p>
          </div>
          
          {/* Stats Card */}
          <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-6 px-8">
            <div className="text-center border-r border-slate-100 pr-6">
              <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Total</span>
              <span className="text-2xl font-black text-slate-900">{applications.length}</span>
            </div>
            <div className="text-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">New Today</span>
              <span className="text-2xl font-black text-blue-600">
                {applications.filter(a => new Date(a.createdAt).toDateString() === new Date().toDateString()).length}
              </span>
            </div>
          </div>
        </div>

        {/* Search Bar Placeholder */}
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-blue-500 transition-colors" />
          <input 
            type="text" 
            placeholder="Search by name, position, or email..." 
            className="w-full pl-12 pr-6 py-4 bg-white border border-slate-100 rounded-2xl shadow-sm focus:ring-4 focus:ring-blue-50 outline-none text-sm font-medium transition-all"
          />
        </div>
      </div>

      {applications.length === 0 ? (
        <div className="bg-white p-24 text-center rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/50">
          <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <User className="w-10 h-10 text-slate-200" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 uppercase">No Candidates Yet</h3>
          <p className="text-slate-400 mt-2 max-w-xs mx-auto text-sm">Once people start applying, their profiles will appear here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {applications.map((app: any) => (
            <div 
              key={app.id} 
              className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-blue-900/5 transition-all group relative overflow-hidden flex flex-col lg:flex-row items-center gap-8"
            >
              <div className="absolute top-0 left-0 w-2 h-full bg-blue-600 translate-x-[-100%] group-hover:translate-x-0 transition-transform"></div>
              
              {/* Profile Info */}
              <div className="flex flex-1 items-center gap-6 w-full">
                <div className="w-16 h-16 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-black text-xl italic shadow-lg shadow-slate-200 shrink-0">
                  {app.personalData?.fullName?.charAt(0) || "A"}
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-slate-900 leading-none group-hover:text-blue-600 transition-colors uppercase tracking-tight">
                    {app.personalData?.fullName}
                  </h3>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2">
                    <span className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full bg-blue-50 text-blue-700 text-[11px] font-black uppercase tracking-wider">
                      <Briefcase className="w-3 h-3" /> {app.personalData?.appliedPosition}
                    </span>
                    <span className="text-slate-400 text-xs font-medium flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5" /> {app.personalData?.email}
                    </span>
                  </div>
                </div>
              </div>

              {/* Details Row */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 w-full lg:w-auto border-t lg:border-t-0 lg:border-l border-slate-100 pt-6 lg:pt-0 lg:pl-8">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest block">Phone</span>
                  <span className="text-sm font-bold text-slate-600 whitespace-nowrap">{app.personalData?.mobilePhone}</span>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest block">Join Date</span>
                  <span className="text-sm font-bold text-slate-600 whitespace-nowrap italic">{app.finalSection?.expectedJoinDate}</span>
                </div>
                <div className="space-y-1 col-span-2 sm:col-span-1">
                  <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest block">Applied On</span>
                  <span className="text-sm font-bold text-slate-600 whitespace-nowrap">{new Date(app.createdAt).toLocaleDateString('en-GB')}</span>
                </div>
              </div>

              {/* Action */}
              <div className="shrink-0 w-full lg:w-auto">
                <Link 
                  href={`/dashboard/${app.id}`}
                  className="w-full lg:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 bg-slate-900 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-lg active:scale-95 group/btn"
                >
                  View Details
                  <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
