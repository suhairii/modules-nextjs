import React from "react";
import { useFormContext } from "react-hook-form";

export const PersonalDataSection = () => {
  const { register, formState: { errors } } = useFormContext();

  const inputClass = "w-full p-3 border-2 border-slate-300 rounded-md focus:ring-2 focus:ring-black focus:border-black outline-none text-base text-black font-semibold bg-white transition-all placeholder:text-slate-400";
  const labelClass = "text-sm font-black text-black mb-1.5 block uppercase tracking-wider";
  const errorClass = "text-xs text-red-600 mt-1 font-bold";

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <h2 className="text-2xl font-black text-black border-b-4 border-black pb-2 uppercase tracking-tighter italic">
        A. DATA PRIBADI / Personal Data
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        <div>
          <label className={labelClass}>Posisi yang dilamar / Applied Position</label>
          <input {...register("personalData.appliedPosition")} className={inputClass} placeholder="e.g. Software Engineer" />
          {errors.personalData?.appliedPosition && <p className={errorClass}>{errors.personalData.appliedPosition.message as string}</p>}
        </div>

        <div>
          <label className={labelClass}>Sumber Lowongan / Vacancy Source</label>
          <input {...register("personalData.vacancySource")} className={inputClass} placeholder="e.g. LinkedIn" />
          {errors.personalData?.vacancySource && <p className={errorClass}>{errors.personalData.vacancySource.message as string}</p>}
        </div>

        <div>
          <label className={labelClass}>Nama Lengkap / Full Name</label>
          <input {...register("personalData.fullName")} className={inputClass} />
          {errors.personalData?.fullName && <p className={errorClass}>{errors.personalData.fullName.message as string}</p>}
        </div>

        <div>
          <label className={labelClass}>Jenis Kelamin / Gender</label>
          <select {...register("personalData.gender")} className={inputClass}>
            <option value="Laki-laki/Male">Laki-laki/Male</option>
            <option value="Perempuan/Female">Perempuan/Female</option>
          </select>
        </div>

        <div>
          <label className={labelClass}>Nama Panggilan / Nickname</label>
          <input {...register("personalData.nickname")} className={inputClass} />
        </div>

        <div>
          <label className={labelClass}>Golongan Darah / Blood Type</label>
          <input {...register("personalData.bloodType")} className={inputClass} />
        </div>

        <div>
          <label className={labelClass}>Tempat Lahir / Place of Birth</label>
          <input {...register("personalData.placeOfBirth")} className={inputClass} />
          {errors.personalData?.placeOfBirth && <p className={errorClass}>{errors.personalData.placeOfBirth.message as string}</p>}
        </div>

        <div>
          <label className={labelClass}>Tgl. Lahir / Date of Birth</label>
          <input type="date" {...register("personalData.dateOfBirth")} className={inputClass} />
          {errors.personalData?.dateOfBirth && <p className={errorClass}>{errors.personalData.dateOfBirth.message as string}</p>}
        </div>

        <div>
          <label className={labelClass}>Agama / Religion</label>
          <input {...register("personalData.religion")} className={inputClass} />
        </div>

        <div>
          <label className={labelClass}>No KTP / KTP No</label>
          <input {...register("personalData.ktpNo")} className={inputClass} />
        </div>

        <div>
          <label className={labelClass}>Berlaku Sampai / Valid Until (KTP)</label>
          <input {...register("personalData.ktpValidUntil")} className={inputClass} />
        </div>

        <div>
          <label className={labelClass}>Alamat Email / Email Address</label>
          <input type="email" {...register("personalData.email")} className={inputClass} />
          {errors.personalData?.email && <p className={errorClass}>{errors.personalData.email.message as string}</p>}
        </div>

        <div>
          <label className={labelClass}>No Passport / Passport No</label>
          <input {...register("personalData.passportNo")} className={inputClass} />
        </div>

        <div>
          <label className={labelClass}>Berlaku Sampai / Valid Until (Passport)</label>
          <input {...register("personalData.passportValidUntil")} className={inputClass} />
        </div>

        <div>
          <label className={labelClass}>Telepon Rumah / Home Phone Number</label>
          <input {...register("personalData.homePhone")} className={inputClass} />
        </div>

        <div>
          <label className={labelClass}>Nomor SIM / Driving License No</label>
          <input {...register("personalData.simNo")} className={inputClass} />
        </div>

        <div>
          <label className={labelClass}>Berlaku Sampai / Valid Until (SIM)</label>
          <input {...register("personalData.simValidUntil")} className={inputClass} />
        </div>

        <div>
          <label className={labelClass}>Nomor Handphone / Mobilephone Number</label>
          <input {...register("personalData.mobilePhone")} className={inputClass} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div>
          <label className={labelClass}>Alamat Sekarang / Current Address</label>
          <textarea {...register("personalData.currentAddress")} rows={3} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Alamat Sesuai KTP / Address in accordance with KTP</label>
          <textarea {...register("personalData.ktpAddress")} rows={3} className={inputClass} />
        </div>
      </div>

      <div>
        <label className={labelClass}>Status / Status</label>
        <div className="flex flex-wrap gap-6 mt-2">
          {["Single", "Married", "Widow", "Widower"].map((val) => (
            <label key={val} className="flex items-center gap-3 text-base font-bold text-black cursor-pointer">
              <input type="radio" value={val} {...register("personalData.status")} className="w-5 h-5 text-black border-2 border-black focus:ring-black" />
              {val}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};
