import React from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";

export const CourseLanguageSection = () => {
  const { register, control } = useFormContext();
  const { fields: courses, append: appendCourse, remove: removeCourse } = useFieldArray({ control, name: "courses" });
  const { fields: languages, append: appendLang, remove: removeLang } = useFieldArray({ control, name: "languages" });

  const inputClass = "w-full p-2.5 border-2 border-slate-300 rounded text-sm text-black font-bold focus:ring-2 focus:ring-black outline-none bg-white placeholder:text-slate-400";
  const headerClass = "text-[10px] font-black text-black bg-slate-100 p-2.5 border-2 border-slate-300 uppercase tracking-widest";
  const cellClass = "p-2 border-2 border-slate-200 bg-white";

  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      {/* COURSES */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b-4 border-black pb-2">
          <h2 className="text-2xl font-black text-black uppercase tracking-tighter italic">D. KURSUS / Courses</h2>
          {courses.length < 5 && (
            <button type="button" onClick={() => appendCourse({ topic: "", duration: "", year: "", organizer: "", location: "", financedBy: "" })} className="bg-black text-white px-4 py-2 rounded-md flex items-center gap-2 text-xs font-black hover:bg-slate-800 transition-all shadow-md">
              <Plus className="w-4 h-4" /> TAMBAH / ADD
            </button>
          )}
        </div>
        <div className="overflow-x-auto rounded-lg border-2 border-slate-200 shadow-sm">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className={headerClass}>Topik / Topic</th>
                <th className={headerClass}>Lama / Duration</th>
                <th className={headerClass}>Tahun / Year</th>
                <th className={headerClass}>Penyelenggara / Organizer</th>
                <th className={headerClass}>Lokasi / Location</th>
                <th className={headerClass}>Dibiayai / Financed By</th>
                <th className={headerClass + " w-10"}></th>
              </tr>
            </thead>
            <tbody>
              {courses.map((field, index) => (
                <tr key={field.id}>
                  <td className={cellClass}><input {...register(`courses.${index}.topic`)} className={inputClass} /></td>
                  <td className={cellClass}><input {...register(`courses.${index}.duration`)} className={inputClass} /></td>
                  <td className={cellClass}><input {...register(`courses.${index}.year`)} className={inputClass} /></td>
                  <td className={cellClass}><input {...register(`courses.${index}.organizer`)} className={inputClass} /></td>
                  <td className={cellClass}><input {...register(`courses.${index}.location`)} className={inputClass} /></td>
                  <td className={cellClass}><input {...register(`courses.${index}.financedBy`)} className={inputClass} /></td>
                  <td className={cellClass + " text-center"}>
                    <button type="button" onClick={() => removeCourse(index)} className="text-red-600 p-2 hover:bg-red-50 rounded-full transition-colors"><Trash2 className="w-5 h-5" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* LANGUAGES */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b-4 border-black pb-2">
          <h2 className="text-2xl font-black text-black uppercase tracking-tighter italic">E. BAHASA ASING / Foreign Languages</h2>
          {languages.length < 4 && (
            <button type="button" onClick={() => appendLang({ language: "", read: "", speak: "", write: "" })} className="bg-black text-white px-4 py-2 rounded-md flex items-center gap-2 text-xs font-black hover:bg-slate-800 transition-all shadow-md">
              <Plus className="w-4 h-4" /> TAMBAH / ADD
            </button>
          )}
        </div>
        <div className="overflow-x-auto rounded-lg border-2 border-slate-200 shadow-sm">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className={headerClass}>Bahasa / Language</th>
                <th className={headerClass}>Membaca / Read</th>
                <th className={headerClass}>Bicara / Speak</th>
                <th className={headerClass}>Menulis / Write</th>
                <th className={headerClass + " w-10"}></th>
              </tr>
            </thead>
            <tbody>
              {languages.map((field, index) => (
                <tr key={field.id}>
                  <td className={cellClass}><input {...register(`languages.${index}.language`)} className={inputClass} /></td>
                  <td className={cellClass}><input {...register(`languages.${index}.read`)} className={inputClass} /></td>
                  <td className={cellClass}><input {...register(`languages.${index}.speak`)} className={inputClass} /></td>
                  <td className={cellClass}><input {...register(`languages.${index}.write`)} className={inputClass} /></td>
                  <td className={cellClass + " text-center"}>
                    <button type="button" onClick={() => removeLang(index)} className="text-red-600 p-2 hover:bg-red-50 rounded-full transition-colors"><Trash2 className="w-5 h-5" /></button>
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
