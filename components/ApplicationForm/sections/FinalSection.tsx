import React from "react";
import { useFormContext } from "react-hook-form";

export const FinalSection = () => {
  const { register, formState: { errors } } = useFormContext();

  const inputClass = "w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm text-slate-900 transition-all bg-slate-50/50 hover:bg-white";
  const labelClass = "text-[13px] font-medium text-slate-600 mb-1.5 block";
  const errorClass = "text-[11px] text-red-500 mt-1 font-medium";

  const AVAILABILITY_OPTIONS = [
    { value: "Immediately", label: "Immediately / Secepatnya" },
    { value: "2 Weeks Notice", label: "2 Weeks Notice / 2 Minggu" },
    { value: "1 Month Notice", label: "1 Month Notice / 1 Bulan" },
    { value: "2 Months Notice", label: "2 Months Notice / 2 Bulan" },
    { value: "Negotiable", label: "Negotiable / Bisa Dinegosiasikan" },
  ];

  return (
    <div className="space-y-12">
      <div className="border-l-4 border-blue-600 pl-4">
        <h2 className="text-xl font-semibold text-slate-900 uppercase tracking-tight italic">Final Section & Declaration</h2>
        <p className="text-sm text-slate-500 mt-1">Please provide your salary expectation and expected join date.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label className={labelClass}>Expected Salary-Gross (Rp) / Gaji yang Diharapkan</label>
          <input {...register("finalSection.expectedSalary")} className={inputClass} placeholder="e.g. 10.000.000" />
          {errors.finalSection?.expectedSalary && <p className={errorClass}>{errors.finalSection.expectedSalary.message as string}</p>}
        </div>

        <div>
          <label className={labelClass}>Expected Join Date / Tanggal Siap Bergabung</label>
          <input type="date" {...register("finalSection.expectedJoinDate")} className={inputClass} />
          {errors.finalSection?.expectedJoinDate && <p className={errorClass}>{errors.finalSection.expectedJoinDate.message as string}</p>}
        </div>

        <div className="md:col-span-2">
          <label className={labelClass}>Availability Notice / Keterangan Kebersediaan</label>
          <select {...register("finalSection.availability")} className={inputClass}>
            <option value="">Pilih Kebersediaan / Select Availability</option>
            {AVAILABILITY_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {errors.finalSection?.availability && <p className={errorClass}>{errors.finalSection.availability.message as string}</p>}
        </div>
      </div>

      <div className="p-8 bg-blue-50/50 border border-blue-100 rounded-3xl space-y-6 relative overflow-hidden shadow-sm">
        <div className="absolute top-0 left-0 w-2 h-full bg-blue-600/10"></div>
        <div className="flex items-start gap-4">
          <div className="flex items-center h-6">
            <input 
              type="checkbox" 
              {...register("finalSection.declaration")} 
              className="w-5 h-5 text-blue-600 border-slate-300 rounded focus:ring-blue-500 cursor-pointer" 
            />
          </div>
          <label className="text-sm text-slate-700 leading-relaxed font-medium cursor-pointer select-none">
            Dengan ini saya menyatakan bahwa informasi yang diberikan di atas adalah benar dan jika dalam keadaan apapun, ada keliru atau informasi palsu yang ditemukan, saya mengerti bahwa saya sepenuhnya akan bertanggung jawab. / 
            <span className="italic block mt-2 text-slate-500 font-normal">
              I hereby certify that the information given above is true and if under any circumstances, there are any misrepresentation or fake information is found, I understand that I shall fully be held responsible.
            </span>
          </label>
        </div>
        {errors.finalSection?.declaration && <p className="text-sm text-red-600 font-bold italic px-9">{errors.finalSection.declaration.message as string}</p>}
      </div>
    </div>
  );
};
