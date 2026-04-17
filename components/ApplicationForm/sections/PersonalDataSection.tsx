import React from "react";
import { useFormContext } from "react-hook-form";

export const PersonalDataSection = () => {
  const { register, formState: { errors } } = useFormContext();

  const inputClass = "w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none text-sm text-slate-900 transition-all bg-slate-50/50 hover:bg-white placeholder:text-slate-400";
  const labelClass = "text-[12px] font-semibold text-slate-500 mb-1.5 block uppercase tracking-tight";
  const errorClass = "text-[11px] text-red-500 mt-1 font-medium";

  return (
    <div className="space-y-10">
      <div className="border-l-4 border-blue-600 pl-4">
        <h2 className="text-xl font-semibold text-slate-900 leading-none">A. Data Pribadi / Personal Data</h2>
        <p className="text-sm text-slate-500 mt-2">Provide your basic and legal information.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        <div>
          <label className={labelClass}>Applied Position / Posisi yang dilamar</label>
          <input {...register("personalData.appliedPosition")} className={inputClass} placeholder="e.g. Software Engineer" />
          {errors.personalData?.appliedPosition && <p className={errorClass}>{errors.personalData.appliedPosition.message as string}</p>}
        </div>

        <div>
          <label className={labelClass}>Vacancy Source / Sumber Lowongan</label>
          <input {...register("personalData.vacancySource")} className={inputClass} placeholder="e.g. LinkedIn" />
          {errors.personalData?.vacancySource && <p className={errorClass}>{errors.personalData.vacancySource.message as string}</p>}
        </div>

        <div className="md:col-span-2">
          <label className={labelClass}>Full Name / Nama Lengkap</label>
          <input {...register("personalData.fullName")} className={inputClass} />
          {errors.personalData?.fullName && <p className={errorClass}>{errors.personalData.fullName.message as string}</p>}
        </div>

        <div>
          <label className={labelClass}>Gender / Jenis Kelamin</label>
          <select {...register("personalData.gender")} className={inputClass}>
            <option value="Laki-laki/Male">Laki-laki/Male</option>
            <option value="Perempuan/Female">Perempuan/Female</option>
          </select>
        </div>

        <div>
          <label className={labelClass}>Nickname / Nama Panggilan</label>
          <input {...register("personalData.nickname")} className={inputClass} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Blood Type</label>
            <select {...register("personalData.bloodType")} className={inputClass}>
              <option value="">Select</option>
              {["A", "B", "AB", "O"].map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className={labelClass}>Religion</label>
            <input {...register("personalData.religion")} className={inputClass} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Place of Birth</label>
            <input {...register("personalData.placeOfBirth")} className={inputClass} />
            {errors.personalData?.placeOfBirth && <p className={errorClass}>{errors.personalData.placeOfBirth.message as string}</p>}
          </div>
          <div>
            <label className={labelClass}>Date of Birth</label>
            <input type="date" {...register("personalData.dateOfBirth")} className={inputClass} />
            {errors.personalData?.dateOfBirth && <p className={errorClass}>{errors.personalData.dateOfBirth.message as string}</p>}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>KTP No</label>
            <input {...register("personalData.ktpNo")} className={inputClass} />
            {errors.personalData?.ktpNo && <p className={errorClass}>{errors.personalData.ktpNo.message as string}</p>}
          </div>
          <div>
            <label className={labelClass}>KTP Valid Until</label>
            <input {...register("personalData.ktpValidUntil")} className={inputClass} placeholder="Lifetime" />
            {errors.personalData?.ktpValidUntil && <p className={errorClass}>{errors.personalData.ktpValidUntil.message as string}</p>}
          </div>
        </div>

        <div>
          <label className={labelClass}>Email Address</label>
          <input type="email" {...register("personalData.email")} className={inputClass} />
          {errors.personalData?.email && <p className={errorClass}>{errors.personalData.email.message as string}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Passport No</label>
            <input {...register("personalData.passportNo")} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Passport Valid Until</label>
            <input {...register("personalData.passportValidUntil")} className={inputClass} />
          </div>
        </div>

        <div>
          <label className={labelClass}>Home Phone Number</label>
          <input {...register("personalData.homePhone")} className={inputClass} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Driving License No (SIM)</label>
            <input {...register("personalData.simNo")} className={inputClass} placeholder="SIM A / B / C" />
          </div>
          <div>
            <label className={labelClass}>SIM Valid Until</label>
            <input {...register("personalData.simValidUntil")} className={inputClass} />
          </div>
        </div>

        <div>
          <label className={labelClass}>Mobilephone Number</label>
          <input {...register("personalData.mobilePhone")} className={inputClass} />
          {errors.personalData?.mobilePhone && <p className={errorClass}>{errors.personalData.mobilePhone.message as string}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div>
          <label className={labelClass}>Current Address / Alamat Sekarang</label>
          <textarea {...register("personalData.currentAddress")} rows={3} className={inputClass} />
          {errors.personalData?.currentAddress && <p className={errorClass}>{errors.personalData.currentAddress.message as string}</p>}
        </div>

        <div>
          <label className={labelClass}>Address in accordance with KTP / Alamat Sesuai KTP</label>
          <textarea {...register("personalData.ktpAddress")} rows={3} className={inputClass} />
          {errors.personalData?.ktpAddress && <p className={errorClass}>{errors.personalData.ktpAddress.message as string}</p>}
        </div>
      </div>

      <div>
        <label className={labelClass}>Status / Status Pernikahan</label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-2">
          {["Single", "Married", "Widow", "Widower"].map((val) => (
            <label key={val} className="flex items-center gap-3 p-3 border border-slate-100 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors">
              <input type="radio" value={val} {...register("personalData.status")} className="w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-600" />
              <span className="text-xs font-semibold text-slate-700">{val}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};
