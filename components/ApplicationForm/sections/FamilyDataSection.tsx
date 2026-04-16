import React from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";

export const FamilyDataSection = () => {
  const { register, control } = useFormContext();
  const { fields: siblings, append: appendSibling, remove: removeSibling } = useFieldArray({ control, name: "familyData.siblings" });
  const { fields: children, append: appendChild, remove: removeChild } = useFieldArray({ control, name: "familyData.children" });

  const inputClass = "w-full p-2.5 border-2 border-slate-300 rounded text-sm text-black font-bold focus:ring-2 focus:ring-black outline-none bg-white";
  const headerClass = "text-xs font-black text-black bg-slate-100 p-3 border-2 border-slate-300 uppercase tracking-widest";
  const cellClass = "p-2 border-2 border-slate-200 bg-white";

  const FamilyRow = ({ label, path }: { label: string; path: string }) => (
    <tr>
      <td className={cellClass + " font-black text-xs text-black bg-slate-50 w-32"}>{label}</td>
      <td className={cellClass}><input {...register(`${path}.name`)} className={inputClass} placeholder="NAMA / NAME" /></td>
      <td className={cellClass}><input {...register(`${path}.placeDateOfBirth`)} className={inputClass} placeholder="TEMPAT, TGL / PLACE, DOB" /></td>
      <td className={cellClass}><input {...register(`${path}.occupation`)} className={inputClass} placeholder="PEKERJAAN / OCCUPATION" /></td>
    </tr>
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <h2 className="text-2xl font-black text-black border-b-4 border-black pb-2 uppercase tracking-tighter italic">
        B. DATA KELUARGA / Family Background
      </h2>

      <div className="overflow-x-auto shadow-sm rounded-lg border-2 border-slate-200">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className={headerClass}>Hubungan / Relationship</th>
              <th className={headerClass}>Nama / Name</th>
              <th className={headerClass}>Tempat/Tgl Lahir / Place/Date of Birth</th>
              <th className={headerClass}>Pekerjaan / Occupation</th>
            </tr>
          </thead>
          <tbody>
            <FamilyRow label="Ayah / Father" path="familyData.father" />
            <FamilyRow label="Ibu / Mother" path="familyData.mother" />
            <FamilyRow label="Suami/Istri / Husband/Wife" path="familyData.spouse" />
          </tbody>
        </table>
      </div>

      {/* Siblings Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-l-4 border-black pl-3">
          <h3 className="text-lg font-black text-black uppercase">Saudara Kandung / Siblings (Max 6)</h3>
          {siblings.length < 6 && (
            <button type="button" onClick={() => appendSibling({ name: "", placeDateOfBirth: "", occupation: "" })} className="bg-black text-white px-4 py-1.5 rounded-md flex items-center gap-2 text-xs font-black hover:bg-slate-800 transition-all">
              <Plus className="w-4 h-4" /> TAMBAH / ADD
            </button>
          )}
        </div>
        <div className="overflow-x-auto rounded-lg border-2 border-slate-200">
          <table className="w-full border-collapse">
            <tbody>
              {siblings.map((field, index) => (
                <tr key={field.id}>
                  <td className={cellClass + " w-32 text-xs font-black text-black bg-slate-50"}>Saudara {index + 1}</td>
                  <td className={cellClass}><input {...register(`familyData.siblings.${index}.name`)} className={inputClass} /></td>
                  <td className={cellClass}><input {...register(`familyData.siblings.${index}.placeDateOfBirth`)} className={inputClass} /></td>
                  <td className={cellClass}><input {...register(`familyData.siblings.${index}.occupation`)} className={inputClass} /></td>
                  <td className={cellClass + " w-12 text-center"}>
                    <button type="button" onClick={() => removeSibling(index)} className="text-red-600 hover:bg-red-50 p-2 rounded-full transition-colors">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Children Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-l-4 border-black pl-3">
          <h3 className="text-lg font-black text-black uppercase">Anak / Children (Max 4)</h3>
          {children.length < 4 && (
            <button type="button" onClick={() => appendChild({ name: "", placeDateOfBirth: "", occupation: "" })} className="bg-black text-white px-4 py-1.5 rounded-md flex items-center gap-2 text-xs font-black hover:bg-slate-800 transition-all">
              <Plus className="w-4 h-4" /> TAMBAH / ADD
            </button>
          )}
        </div>
        <div className="overflow-x-auto rounded-lg border-2 border-slate-200">
          <table className="w-full border-collapse">
            <tbody>
              {children.map((field, index) => (
                <tr key={field.id}>
                  <td className={cellClass + " w-32 text-xs font-black text-black bg-slate-50"}>Anak {index + 1}</td>
                  <td className={cellClass}><input {...register(`familyData.children.${index}.name`)} className={inputClass} /></td>
                  <td className={cellClass}><input {...register(`familyData.children.${index}.placeDateOfBirth`)} className={inputClass} /></td>
                  <td className={cellClass}><input {...register(`familyData.children.${index}.occupation`)} className={inputClass} /></td>
                  <td className={cellClass + " w-12 text-center"}>
                    <button type="button" onClick={() => removeChild(index)} className="text-red-600 hover:bg-red-50 p-2 rounded-full transition-colors">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
