import React from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { Plus, Trash2, Briefcase, Users } from "lucide-react";

export const EmploymentSection = () => {
  const { register, control } = useFormContext();
  
  // Field Array untuk Riwayat Pekerjaan (Exactly 3)
  const { fields: jobs } = useFieldArray({ control, name: "employmentHistory" });
  
  // Field Array untuk Aktivitas Sosial (Max 3)
  const { fields: social, append: appendSocial, remove: removeSocial } = useFieldArray({ control, name: "socialActivities" });

  const inputClass = "w-full px-3 py-1.5 border border-slate-200 rounded-md text-[13px] text-slate-900 focus:ring-1 focus:ring-blue-600 outline-none transition-all hover:bg-slate-50";
  const labelClass = "text-[11px] font-semibold text-slate-500 mb-1 block uppercase tracking-tight";

  return (
    <div className="space-y-20">
      {/* SECTION F: EMPLOYMENT HISTORY */}
      <div className="space-y-10">
        <div className="border-l-4 border-blue-600 pl-4">
          <h2 className="text-xl font-semibold text-slate-900 italic uppercase tracking-tight">F. Riwayat Pekerjaan / Employment History</h2>
          <p className="text-sm text-slate-500 mt-1">Provide your last 3 job positions starting from the most recent.</p>
        </div>

        <div className="space-y-12">
          {jobs.map((field, index) => (
            <div key={field.id} className="p-8 border border-slate-100 rounded-3xl bg-white shadow-sm space-y-8 relative overflow-hidden group hover:shadow-md transition-shadow">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-slate-100 group-hover:bg-blue-600 transition-colors"></div>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-black italic">
                  0{index + 1}
                </div>
                <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest italic underline decoration-blue-600 underline-offset-4">
                  {index === 0 ? "Current or Last Position" : `Previous Position ${index + 1}`}
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6">
                <div className="md:col-span-2">
                  <label className={labelClass}>Company Name / Nama Perusahaan</label>
                  <input {...register(`employmentHistory.${index}.companyName`)} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Business Type / Jenis Usaha</label>
                  <input {...register(`employmentHistory.${index}.businessType`)} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Job Title / Jabatan</label>
                  <input {...register(`employmentHistory.${index}.jobTitle`)} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Monthly Salary / Gaji</label>
                  <input {...register(`employmentHistory.${index}.salary`)} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Office Phone / No. Telp</label>
                  <input {...register(`employmentHistory.${index}.officePhone`)} className={inputClass} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Start / Mulai</label>
                    <input {...register(`employmentHistory.${index}.startWorking`)} className={inputClass} placeholder="MM/YYYY" />
                  </div>
                  <div>
                    <label className={labelClass}>End / Berhenti</label>
                    <input {...register(`employmentHistory.${index}.resigned`)} className={inputClass} placeholder="MM/YYYY" />
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className={labelClass}>Reason for Resignation / Alasan Berhenti</label>
                  <input {...register(`employmentHistory.${index}.reasonForResignation`)} className={inputClass} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 p-6 bg-slate-50/50 rounded-2xl border border-slate-100">
                <div>
                  <label className={labelClass}>Line Supervisor Name / Nama Atasan</label>
                  <input {...register(`employmentHistory.${index}.supervisorName`)} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Supervisor Job Title / Jabatan Atasan</label>
                  <input {...register(`employmentHistory.${index}.supervisorTitle`)} className={inputClass} />
                </div>
                <div className="md:col-span-2">
                  <label className={labelClass}>Reporting Staff/SPV/Manager Count / Jumlah Bawahan</label>
                  <input {...register(`employmentHistory.${index}.reportingCount`)} className={inputClass} placeholder="e.g. 5" />
                </div>
              </div>

              <div>
                <label className={labelClass}>Job Description / Deskripsi Tugas</label>
                <textarea {...register(`employmentHistory.${index}.jobDesc`)} rows={4} className={inputClass} placeholder="Explain your key responsibilities..." />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION G: SOCIAL ACTIVITY */}
      <div className="space-y-10 pt-10 border-t border-slate-100">
        <div className="flex items-center justify-between border-l-4 border-blue-600 pl-4">
          <div>
            <h2 className="text-xl font-semibold text-slate-900 italic uppercase tracking-tight">G. Aktivitas Sosial / Social Activity</h2>
            <p className="text-sm text-slate-500 mt-1">Organizational experiences or social activities (Max 3).</p>
          </div>
          <button 
            type="button" 
            onClick={() => appendSocial({ orgName: "", activity: "", function: "", year: "" })} 
            className="text-blue-600 flex items-center gap-1 text-[11px] font-black hover:underline uppercase"
          >
            <Plus className="w-3.5 h-3.5" /> Add Activity
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {social.map((field, index) => (
            <div key={field.id} className="p-6 bg-white border border-slate-100 rounded-2xl relative shadow-sm hover:shadow-md transition-all">
              <button 
                type="button" 
                onClick={() => removeSocial(index)} 
                className="absolute top-4 right-4 text-slate-300 hover:text-red-500 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-2">
                <div className="lg:col-span-2">
                  <label className={labelClass}>Organization Name / Nama Organisasi</label>
                  <input {...register(`socialActivities.${index}.orgName`)} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Activity / Aktivitas</label>
                  <input {...register(`socialActivities.${index}.activity`)} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Function / Jabatan</label>
                  <input {...register(`socialActivities.${index}.function`)} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Year / Tahun</label>
                  <input {...register(`socialActivities.${index}.year`)} className={inputClass} />
                </div>
              </div>
            </div>
          ))}
          {social.length === 0 && (
            <div className="py-10 text-center border-2 border-dashed border-slate-100 rounded-2xl text-slate-400 text-sm">
              No social activities added. Click "ADD ACTIVITY" if you have organizational experience.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
