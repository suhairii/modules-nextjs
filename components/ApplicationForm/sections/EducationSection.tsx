import React from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { Plus, Trash2, Languages } from "lucide-react";

export const EducationSection = () => {
  const { register, control } = useFormContext();
  const { fields: courses, append: appendCourse, remove: removeCourse } = useFieldArray({ control, name: "courses" });
  const { fields: languages, append: appendLang, remove: removeLang } = useFieldArray({ control, name: "languages" });

  const inputClass = "w-full px-3 py-1.5 border border-slate-200 rounded-md text-[13px] text-slate-900 focus:ring-1 focus:ring-blue-600 outline-none transition-all hover:bg-slate-50";
  const labelClass = "text-[11px] font-semibold text-slate-500 mb-1 block uppercase tracking-tight";

  const EduForm = ({ label, path, required = false }: { label: string; path: string; required?: boolean }) => (
    <div className="p-6 border border-slate-100 rounded-2xl bg-white shadow-sm space-y-4">
      <div className="flex items-center gap-2">
        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-tighter italic">{label}</h3>
        {required && <span className="text-[10px] bg-red-50 text-red-500 px-1.5 py-0.5 rounded font-bold tracking-widest">REQUIRED</span>}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div><label className={labelClass}>Institution</label><input {...register(`${path}.institution`)} className={inputClass} /></div>
        <div><label className={labelClass}>Major</label><input {...register(`${path}.major`)} className={inputClass} /></div>
        <div><label className={labelClass}>Year</label><input {...register(`${path}.graduationYear`)} className={inputClass} /></div>
        <div><label className={labelClass}>GPA</label><input {...register(`${path}.gpa`)} className={inputClass} /></div>
      </div>
    </div>
  );

  return (
    <div className="space-y-20">
      {/* C. EDUCATION */}
      <div className="space-y-10">
        <div className="border-l-4 border-blue-600 pl-4">
          <h2 className="text-xl font-semibold text-slate-900 italic uppercase tracking-tight">C. Pendidikan / Education</h2>
          <p className="text-sm text-slate-500 mt-1">Academic background (SD - SLTA Required).</p>
        </div>
        <div className="grid grid-cols-1 gap-6">
          <EduForm label="Primary / SD" path="education.sd" required />
          <EduForm label="Junior High / SLTP" path="education.sltp" required />
          <EduForm label="Senior High / SLTA" path="education.slta" required />
          <EduForm label="Diploma / D3" path="education.d3" />
          <EduForm label="Bachelor / S1" path="education.s1" />
          <EduForm label="Master / S2" path="education.s2" />
        </div>
      </div>

      {/* D. COURSES */}
      <div className="space-y-10 pt-10 border-t border-slate-100">
        <div className="flex items-center justify-between border-l-4 border-blue-600 pl-4">
          <div>
            <h2 className="text-xl font-semibold text-slate-900 italic uppercase tracking-tight">D. Kursus / Courses</h2>
            <p className="text-sm text-slate-500 mt-1">Certifications or training programs (Max 5).</p>
          </div>
          <button type="button" onClick={() => appendCourse({ topic: "", duration: "", year: "", organizer: "", location: "", financedBy: "" })} className="text-blue-600 flex items-center gap-1 text-[11px] font-black hover:underline uppercase">
            <Plus className="w-3.5 h-3.5" /> Add Course
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {courses.map((field, index) => (
            <div key={field.id} className="p-6 border border-slate-100 rounded-2xl relative bg-white shadow-sm hover:shadow-md transition-shadow">
              <button type="button" onClick={() => removeCourse(index)} className="absolute top-4 right-4 text-slate-300 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
              <div className="space-y-4">
                <div><label className={labelClass}>Topic</label><input {...register(`courses.${index}.topic`)} className={inputClass} /></div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className={labelClass}>Duration</label><input {...register(`courses.${index}.duration`)} className={inputClass} /></div>
                  <div><label className={labelClass}>Year</label><input {...register(`courses.${index}.year`)} className={inputClass} /></div>
                </div>
                <div><label className={labelClass}>Organizer</label><input {...register(`courses.${index}.organizer`)} className={inputClass} /></div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className={labelClass}>Location</label><input {...register(`courses.${index}.location`)} className={inputClass} /></div>
                  <div><label className={labelClass}>Financed By</label><input {...register(`courses.${index}.financedBy`)} className={inputClass} /></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* E. LANGUAGES */}
      <div className="space-y-10 pt-10 border-t border-slate-100">
        <div className="flex items-center justify-between border-l-4 border-blue-600 pl-4">
          <div>
            <h2 className="text-xl font-semibold text-slate-900 italic uppercase tracking-tight">E. Bahasa / Languages</h2>
            <p className="text-sm text-slate-500 mt-1">Foreign language proficiency (Max 4).</p>
          </div>
          <button type="button" onClick={() => appendLang({ language: "", read: "", speak: "", write: "" })} className="text-blue-600 flex items-center gap-1 text-[11px] font-black hover:underline uppercase">
            <Plus className="w-3.5 h-3.5" /> Add Language
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {languages.map((field, index) => (
            <div key={field.id} className="p-6 border border-slate-100 rounded-2xl relative bg-white shadow-sm">
              <button type="button" onClick={() => removeLang(index)} className="absolute top-4 right-4 text-slate-300 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
              <div className="space-y-4">
                <div><label className={labelClass}>Language</label><input {...register(`languages.${index}.language`)} className={inputClass} /></div>
                <div className="grid grid-cols-3 gap-2">
                  <div><label className={labelClass}>Read</label><input {...register(`languages.${index}.read`)} className={inputClass} /></div>
                  <div><label className={labelClass}>Speak</label><input {...register(`languages.${index}.speak`)} className={inputClass} /></div>
                  <div><label className={labelClass}>Write</label><input {...register(`languages.${index}.write`)} className={inputClass} /></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
