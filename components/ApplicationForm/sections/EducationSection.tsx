import React from "react";
import { useFormContext } from "react-hook-form";

export const EducationSection = () => {
  const { register } = useFormContext();

  const inputClass = "w-full p-2.5 border-2 border-slate-300 rounded text-sm text-black font-bold focus:ring-2 focus:ring-black outline-none bg-white placeholder:text-slate-400";
  const headerClass = "text-xs font-black text-black bg-slate-100 p-3 border-2 border-slate-300 text-left uppercase tracking-widest";
  const cellClass = "p-2 border-2 border-slate-200";

  const EduRow = ({ label, path }: { label: string; path: string }) => (
    <tr>
      <td className={cellClass + " font-black text-xs text-black bg-slate-50 w-24"}>{label}</td>
      <td className={cellClass}><input {...register(`${path}.institution`)} className={inputClass} placeholder="INSTITUSI / INSTITUTION" /></td>
      <td className={cellClass}><input {...register(`${path}.major`)} className={inputClass} placeholder="JURUSAN / MAJOR" /></td>
      <td className={cellClass}><input {...register(`${path}.graduationYear`)} className={inputClass} placeholder="TAHUN / YEAR" /></td>
      <td className={cellClass}><input {...register(`${path}.gpa`)} className={inputClass} placeholder="IPK / GPA" /></td>
    </tr>
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <h2 className="text-2xl font-black text-black border-b-4 border-black pb-2 uppercase tracking-tighter italic">
        C. PENDIDIKAN / Education
      </h2>

      <div className="overflow-x-auto shadow-sm rounded-lg border-2 border-slate-200">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className={headerClass}>Tingkat / Level</th>
              <th className={headerClass}>Nama Institusi / Institution Name</th>
              <th className={headerClass}>Jurusan / Major</th>
              <th className={headerClass}>Kelulusan / Graduation Year</th>
              <th className={headerClass}>IPK / GPA</th>
            </tr>
          </thead>
          <tbody>
            <EduRow label="SD" path="education.sd" />
            <EduRow label="SLTP" path="education.sltp" />
            <EduRow label="SLTA" path="education.slta" />
            <EduRow label="D3" path="education.d3" />
            <EduRow label="S1" path="education.s1" />
            <EduRow label="S2" path="education.s2" />
          </tbody>
        </table>
      </div>
    </div>
  );
};
