import React from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";

export const FamilyDataSection = () => {
  const { register, control, watch } = useFormContext();
  
  // Mengawasi status pernikahan dari seksi Data Pribadi
  const martialStatus = watch("personalData.status");

  const { fields: siblings, append: appendSibling, remove: removeSibling } = useFieldArray({ control, name: "familyData.siblings" });
  const { fields: children, append: appendChild, remove: removeChild } = useFieldArray({ control, name: "familyData.children" });

  const inputClass = "w-full px-3 py-1.5 border border-slate-200 rounded-md text-[13px] text-slate-900 focus:ring-1 focus:ring-blue-600 outline-none transition-all hover:bg-slate-50";
  const labelClass = "text-[11px] font-semibold text-slate-500 mb-1 block uppercase tracking-tight";

  const FamilyMemberForm = ({ label, path }: { label: string; path: string }) => (
    <div className="p-5 bg-white border border-slate-100 rounded-xl shadow-sm space-y-4 animate-in fade-in duration-300">
      <h3 className="text-sm font-semibold text-slate-800">{label}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className={labelClass}>Name / Nama</label>
          <input {...register(`${path}.name`)} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>DOB / Tempat, Tgl Lahir</label>
          <input {...register(`${path}.placeDateOfBirth`)} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Occupation / Pekerjaan</label>
          <input {...register(`${path}.occupation`)} className={inputClass} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-10">
      <div className="border-l-4 border-blue-600 pl-4">
        <h2 className="text-xl font-semibold text-slate-900 leading-none">B. Data Keluarga / Family Background</h2>
        <p className="text-sm text-slate-500 mt-2">Provide details about your parents and spouse/children if applicable.</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <FamilyMemberForm label="Father / Ayah" path="familyData.father" />
        <FamilyMemberForm label="Mother / Ibu" path="familyData.mother" />
        
        {/* Hanya muncul jika status adalah 'Married' */}
        {martialStatus === "Married" && (
          <FamilyMemberForm label="Husband/Wife / Suami/Istri" path="familyData.spouse" />
        )}
      </div>

      {/* Siblings */}
      <div className="space-y-6 pt-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="text-base font-semibold text-slate-800">Siblings / Saudara Kandung</h3>
          <button type="button" onClick={() => appendSibling({ name: "", placeDateOfBirth: "", occupation: "" })} className="text-blue-600 flex items-center gap-1 text-[13px] font-medium hover:underline">
            <Plus className="w-3.5 h-3.5" /> Add Sibling
          </button>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {siblings.map((field, index) => (
            <div key={field.id} className="relative group">
              <FamilyMemberForm label={`Sibling ${index + 1}`} path={`familyData.siblings.${index}`} />
              <button type="button" onClick={() => removeSibling(index)} className="absolute top-4 right-4 text-slate-300 hover:text-red-500 transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Children - Biasanya juga hanya relevan jika tidak Single, tapi tetap ditampilkan sebagai opsional */}
      {(martialStatus === "Married" || martialStatus === "Widow" || martialStatus === "Widower") && (
        <div className="space-y-6 pt-4 animate-in fade-in duration-500">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-base font-semibold text-slate-800">Children / Anak</h3>
            <button type="button" onClick={() => appendChild({ name: "", placeDateOfBirth: "", occupation: "" })} className="text-blue-600 flex items-center gap-1 text-[13px] font-medium hover:underline">
              <Plus className="w-3.5 h-3.5" /> Add Child
            </button>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {children.map((field, index) => (
              <div key={field.id} className="relative group">
                <FamilyMemberForm label={`Child ${index + 1}`} path={`familyData.children.${index}`} />
                <button type="button" onClick={() => removeChild(index)} className="absolute top-4 right-4 text-slate-300 hover:text-red-500 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
