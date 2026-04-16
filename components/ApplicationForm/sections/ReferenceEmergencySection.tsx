import React from "react";
import { useFormContext, useFieldArray } from "react-hook-form";

export const ReferenceEmergencySection = () => {
  const { register, control } = useFormContext();
  const { fields: refs } = useFieldArray({ control, name: "references" });
  const { fields: emergencies } = useFieldArray({ control, name: "emergencyContacts" });

  const inputClass = "w-full p-2.5 border-2 border-slate-300 rounded text-sm text-black font-bold focus:ring-2 focus:ring-black outline-none bg-white placeholder:text-slate-400";
  const headerClass = "text-[10px] font-black text-black bg-slate-100 p-3 border-2 border-slate-300 uppercase tracking-widest";
  const cellClass = "p-2 border-2 border-slate-200 bg-white";

  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      {/* REFERENCES */}
      <div className="space-y-6">
        <h2 className="text-2xl font-black text-black border-b-4 border-black pb-2 uppercase tracking-tighter italic">I. REFERENSI / References</h2>
        <div className="overflow-x-auto shadow-sm rounded-lg border-2 border-slate-200">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className={headerClass}>Nama / Name</th>
                <th className={headerClass}>Hubungan / Relationship</th>
                <th className={headerClass}>Jabatan/Perusahaan / Job Title / Company</th>
                <th className={headerClass}>No HP / Mobile Number</th>
              </tr>
            </thead>
            <tbody>
              {refs.map((field, index) => (
                <tr key={field.id}>
                  <td className={cellClass}><input {...register(`references.${index}.name`)} className={inputClass} /></td>
                  <td className={cellClass}><input {...register(`references.${index}.relationship`)} className={inputClass} /></td>
                  <td className={cellClass}><input {...register(`references.${index}.jobTitleCompany`)} className={inputClass} /></td>
                  <td className={cellClass}><input {...register(`references.${index}.mobilePhone`)} className={inputClass} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* EMERGENCY CONTACTS */}
      <div className="space-y-6">
        <h2 className="text-2xl font-black text-black border-b-4 border-black pb-2 uppercase tracking-tighter italic">J. KONTAK DARURAT / Emergency Contacts</h2>
        <div className="overflow-x-auto shadow-sm rounded-lg border-2 border-slate-200">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className={headerClass}>Nama / Name</th>
                <th className={headerClass}>Hubungan / Relationship</th>
                <th className={headerClass}>No HP / Mobile Number</th>
              </tr>
            </thead>
            <tbody>
              {emergencies.map((field, index) => (
                <tr key={field.id}>
                  <td className={cellClass}><input {...register(`emergencyContacts.${index}.name`)} className={inputClass} /></td>
                  <td className={cellClass}><input {...register(`emergencyContacts.${index}.relationship`)} className={inputClass} /></td>
                  <td className={cellClass}><input {...register(`emergencyContacts.${index}.mobilePhone`)} className={inputClass} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
