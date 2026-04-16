import React from "react";
import { useFormContext } from "react-hook-form";

export const FinalSection = () => {
  const { register, formState: { errors } } = useFormContext();

  const inputClass = "w-full p-4 border-2 border-slate-300 rounded-md focus:ring-2 focus:ring-black focus:border-black outline-none text-base text-black font-black bg-white transition-all placeholder:text-slate-400";
  const labelClass = "text-sm font-black text-black mb-1.5 block uppercase tracking-wider";

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <h2 className="text-2xl font-black text-black border-b-4 border-black pb-2 uppercase tracking-tighter italic">
        BAGIAN AKHIR / Final Section
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label className={labelClass}>Gaji yang Diharapkan-Gross (Rp) / Expected Salary-Gross (Rp)</label>
          <input {...register("finalSection.expectedSalary")} className={inputClass} placeholder="e.g. 10.000.000" />
          {errors.finalSection?.expectedSalary && <p className="text-sm text-red-600 mt-2 font-black">{errors.finalSection.expectedSalary.message as string}</p>}
        </div>

        <div>
          <label className={labelClass}>Kebersediaan Bergabung / Availability to Join</label>
          <input {...register("finalSection.availability")} className={inputClass} placeholder="e.g. 1 Month Notice" />
          {errors.finalSection?.availability && <p className="text-sm text-red-600 mt-2 font-black">{errors.finalSection.availability.message as string}</p>}
        </div>
      </div>

      <div className="p-6 bg-slate-50 border-4 border-black rounded-xl space-y-6 shadow-lg">
        <div className="flex items-start gap-4 cursor-pointer">
          <input type="checkbox" {...register("finalSection.declaration")} className="mt-1 w-6 h-6 text-black border-2 border-black rounded focus:ring-black" />
          <label className="text-sm sm:text-base text-black leading-relaxed font-black uppercase tracking-tight">
            Dengan ini saya menyatakan bahwa informasi yang diberikan di atas adalah benar dan jika dalam keadaan apapun, ada keliru atau informasi palsu yang ditemukan, saya mengerti bahwa saya sepenuhnya akan bertanggung jawab. / 
            <span className="italic block mt-1 text-blue-800">
              I hereby certify that the information given above is true and if under any circumstances, there are any misrepresentation or fake information is found, I understand that I shall fully be held responsible.
            </span>
          </label>
        </div>
        {errors.finalSection?.declaration && <p className="text-base text-red-600 font-black animate-pulse uppercase italic">{errors.finalSection.declaration.message as string}</p>}
      </div>
    </div>
  );
};
