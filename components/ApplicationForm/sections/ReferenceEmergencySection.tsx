import React from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";

export const ReferenceEmergencySection = () => {
  const { register, control } = useFormContext();
  
  // Dynamic References
  const { fields: refs, append: appendRef, remove: removeRef } = useFieldArray({ control, name: "references" });
  
  // Dynamic Emergency Contacts
  const { fields: emergencies, append: appendEmergency, remove: removeEmergency } = useFieldArray({ control, name: "emergencyContacts" });

  const inputClass = "w-full px-3 py-1.5 border border-slate-200 rounded-md text-[13px] text-slate-900 focus:ring-1 focus:ring-blue-600 outline-none transition-all hover:bg-slate-50 placeholder:text-slate-400";
  const labelClass = "text-[11px] font-semibold text-slate-500 mb-1 block uppercase tracking-tight";

  return (
    <div className="space-y-20">
      {/* I. REFERENCES */}
      <div className="space-y-10">
        <div className="flex items-center justify-between border-l-4 border-blue-600 pl-4">
          <div>
            <h2 className="text-xl font-semibold text-slate-900 italic uppercase tracking-tight">I. Referensi / References</h2>
            <p className="text-sm text-slate-500 mt-1">Professional references from former bosses or managers.</p>
          </div>
          <button 
            type="button" 
            onClick={() => appendRef({ name: "", relationship: "", jobTitle: "", companyName: "", mobilePhone: "" })} 
            className="text-blue-600 flex items-center gap-1 text-[11px] font-black hover:underline uppercase transition-all"
          >
            <Plus className="w-3.5 h-3.5" /> Add Reference
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {refs.map((field, index) => (
            <div key={field.id} className="p-6 border border-slate-100 rounded-2xl bg-white shadow-sm relative group hover:shadow-md transition-shadow">
              <button 
                type="button" 
                onClick={() => removeRef(index)} 
                className={`absolute top-4 right-4 text-slate-300 hover:text-red-500 transition-colors ${refs.length <= 1 ? 'hidden' : 'block'}`}
              >
                <Trash2 className="w-4 h-4" />
              </button>
              
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-400 text-[10px] flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Reference Entry</h3>
                </div>
                
                <div>
                  <label className={labelClass}>Full Name / Nama</label>
                  <input {...register(`references.${index}.name`)} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Relationship / Hubungan</label>
                  <input {...register(`references.${index}.relationship`)} className={inputClass} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Job Title / Jabatan</label>
                    <input {...register(`references.${index}.jobTitle`)} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Company / Perusahaan</label>
                    <input {...register(`references.${index}.companyName`)} className={inputClass} />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Mobile Phone / No. HP</label>
                  <input {...register(`references.${index}.mobilePhone`)} className={inputClass} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* J. EMERGENCY CONTACTS */}
      <div className="space-y-10 pt-10 border-t border-slate-100">
        <div className="flex items-center justify-between border-l-4 border-blue-600 pl-4">
          <div>
            <h2 className="text-xl font-semibold text-slate-900 italic uppercase tracking-tight">J. Kontak Darurat / Emergency Contacts</h2>
            <p className="text-sm text-slate-500 mt-1">Person that can be contacted in case of emergency.</p>
          </div>
          <button 
            type="button" 
            onClick={() => appendEmergency({ name: "", relationship: "", mobilePhone: "" })} 
            className="text-blue-600 flex items-center gap-1 text-[11px] font-black hover:underline uppercase transition-all"
          >
            <Plus className="w-3.5 h-3.5" /> Add Contact
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {emergencies.map((field, index) => (
            <div key={field.id} className="p-6 border border-slate-100 rounded-2xl bg-slate-50/30 space-y-4 relative group shadow-sm">
              <button 
                type="button" 
                onClick={() => removeEmergency(index)} 
                className={`absolute top-4 right-4 text-slate-300 hover:text-red-500 transition-colors ${emergencies.length <= 1 ? 'hidden' : 'block'}`}
              >
                <Trash2 className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-blue-600 text-white text-[10px] flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Emergency Contact</h3>
              </div>
              
              <div className="space-y-3">
                <div>
                  <label className={labelClass}>Name</label>
                  <input {...register(`emergencyContacts.${index}.name`)} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Relationship</label>
                  <input {...register(`emergencyContacts.${index}.relationship`)} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Mobile Phone</label>
                  <input {...register(`emergencyContacts.${index}.mobilePhone`)} className={inputClass} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
