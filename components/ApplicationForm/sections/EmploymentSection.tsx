import React from "react";
import { useFormContext, useFieldArray } from "react-hook-form";

export const EmploymentSection = () => {
  const { register, control } = useFormContext();
  const { fields } = useFieldArray({ control, name: "employmentHistory" });

  const inputClass = "w-full p-3 border-2 border-slate-300 rounded-md text-sm text-black font-bold focus:ring-2 focus:ring-black outline-none bg-white placeholder:text-slate-400";
  const labelClass = "text-xs font-black text-black mb-1.5 block uppercase tracking-wider";

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <h2 className="text-2xl font-black text-black border-b-4 border-black pb-2 uppercase tracking-tighter italic">
        F. RIWAYAT PEKERJAAN / Employment History
      </h2>

      {fields.map((field, index) => (
        <div key={field.id} className="p-6 border-2 border-black rounded-xl bg-white space-y-6 shadow-md relative overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-full bg-black"></div>
          <h3 className="text-lg font-black text-black flex items-center gap-2 uppercase italic underline decoration-2 underline-offset-4">
            Pekerjaan {index + 1} {index === 0 && "(Sekarang / Current)"}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className={labelClass}>Nama Perusahaan / Company Name</label>
              <input {...register(`employmentHistory.${index}.companyName`)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Jabatan / Job Title</label>
              <input {...register(`employmentHistory.${index}.jobTitle`)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Gaji / Salary</label>
              <input {...register(`employmentHistory.${index}.salary`)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>No.Telp Perusahaan / Office Phone</label>
              <input {...register(`employmentHistory.${index}.officePhone`)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Mulai Bekerja / Start Working</label>
              <input {...register(`employmentHistory.${index}.startWorking`)} className={inputClass} placeholder="DD/MM/YYYY" />
            </div>
            <div>
              <label className={labelClass}>Berhenti Kerja / Resigned</label>
              <input {...register(`employmentHistory.${index}.resigned`)} className={inputClass} placeholder="DD/MM/YYYY" />
            </div>
            <div>
              <label className={labelClass}>Jenis Usaha / Type of Business</label>
              <input {...register(`employmentHistory.${index}.businessType`)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Atasan / Line Supervisor Name</label>
              <input {...register(`employmentHistory.${index}.supervisorName`)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Jabatan Atasan / Supervisor Title</label>
              <input {...register(`employmentHistory.${index}.supervisorTitle`)} className={inputClass} />
            </div>
          </div>

          <div>
            <label className={labelClass}>Jumlah Staff/SPV/Manager Melapor ke Anda / Reporting Count</label>
            <input {...register(`employmentHistory.${index}.reportingCount`)} className={inputClass} />
          </div>

          <div>
            <label className={labelClass}>Deskripsi Tugas / Job Description</label>
            <textarea {...register(`employmentHistory.${index}.jobDesc`)} rows={4} className={inputClass} />
          </div>
        </div>
      ))}
    </div>
  );
};
