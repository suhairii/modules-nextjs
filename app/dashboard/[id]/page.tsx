import React from "react";
import { getApplicationById } from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import { 
  ArrowLeft, User, Users, GraduationCap, Languages, 
  Briefcase, Heart, BookOpen, ShieldAlert, DollarSign, 
  CheckCircle2, Mail, Phone, MapPin, Calendar, Clock, Info 
} from "lucide-react";

export default async function ApplicationDetailPage({ params }: { params: { id: string } }) {
  const app = await getApplicationById(params.id);

  if (!app) {
    notFound();
  }

  // Label Maps for bilingual display
  const EDU_LABELS: Record<string, string> = {
    sd: "Primary School / SD",
    sltp: "Junior High School / SLTP",
    slta: "Senior High School / SLTA",
    d3: "Diploma Degree / D3",
    s1: "Bachelor Degree / S1",
    s2: "Master Degree / S2",
  };

  // Helper Components
  const SectionWrapper = ({ title, icon: Icon, children }: { title: string, icon: any, children: React.ReactNode }) => (
    <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden mb-10">
      <div className="bg-slate-50/50 px-8 py-6 border-b border-slate-100 flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-blue-600 flex items-center justify-center shadow-sm">
          <Icon className="w-5 h-5" />
        </div>
        <h2 className="text-lg font-black text-slate-900 uppercase tracking-tight italic">{title}</h2>
      </div>
      <div className="p-8 md:p-10">{children}</div>
    </div>
  );

  const DataField = ({ label, value, fullWidth = false }: { label: string, value: any, fullWidth?: boolean }) => (
    <div className={`${fullWidth ? 'col-span-full' : ''} space-y-1.5`}>
      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block leading-none whitespace-pre-wrap">{label}</span>
      <p className="text-[13px] font-bold text-slate-700 break-words">{value || "-"}</p>
    </div>
  );

  const SubHeader = ({ title }: { title: string }) => (
    <h3 className="text-xs font-black text-blue-600 uppercase tracking-[0.2em] mb-6 flex items-center gap-2 italic">
      <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
      {title}
    </h3>
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 sm:px-6 lg:px-8 bg-slate-50 min-h-screen font-sans pb-32 text-slate-900">
      {/* Top Nav */}
      <div className="mb-10 flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-all text-xs font-black uppercase tracking-widest group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Pool / Kembali ke Daftar
        </Link>
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">App ID: {app.id}</span>
        </div>
      </div>

      {/* Profile Hero */}
      <div className="bg-slate-900 rounded-[3rem] p-10 text-white shadow-2xl mb-12 relative overflow-hidden flex flex-col md:flex-row items-center gap-10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 blur-[100px] rounded-full -mr-32 -mt-32"></div>
        <div className="w-32 h-32 rounded-[2.5rem] bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center font-black text-5xl italic shrink-0 shadow-inner text-blue-400">
          {app.personalData?.fullName?.charAt(0)}
        </div>
        <div className="flex-1 text-center md:text-left">
          <div className="space-y-2">
            <h1 className="text-4xl font-black tracking-tighter uppercase italic leading-none">{app.personalData?.fullName}</h1>
            <p className="text-blue-400 font-bold uppercase tracking-[0.3em] text-sm italic">{app.personalData?.appliedPosition}</p>
          </div>
          <div className="flex flex-wrap justify-center md:justify-start gap-6 mt-8 text-white">
            <div className="flex items-center gap-2 text-white/60 text-[10px] font-black uppercase tracking-widest italic">
              <Mail className="w-4 h-4 text-blue-400" /> {app.personalData?.email}
            </div>
            <div className="flex items-center gap-2 text-white/60 text-[10px] font-black uppercase tracking-widest italic">
              <Phone className="w-4 h-4 text-blue-400" /> {app.personalData?.mobilePhone}
            </div>
            <div className="flex items-center gap-2 text-white/60 text-[10px] font-black uppercase tracking-widest italic">
              <Calendar className="w-4 h-4 text-blue-400" /> Applied / Melamar: {new Date(app.createdAt).toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>

      {/* SECTIONS */}
      
      {/* A. PERSONAL DATA */}
      <SectionWrapper title="A. Personal Data / Data Pribadi" icon={User}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-10">
          <DataField label="Applied Position / Posisi yang dilamar" value={app.personalData?.appliedPosition} />
          <DataField label="Vacancy Source / Sumber Lowongan" value={app.personalData?.vacancySource} />
          <DataField label="Full Name / Nama Lengkap" value={app.personalData?.fullName} />
          <DataField label="Nickname / Nama Panggilan" value={app.personalData?.nickname} />
          <DataField label="Gender / Jenis Kelamin" value={app.personalData?.gender} />
          <DataField label="Blood Type / Golongan Darah" value={app.personalData?.bloodType} />
          <DataField label="Place of Birth / Tempat Lahir" value={app.personalData?.placeOfBirth} />
          <DataField label="Date of Birth / Tgl. Lahir" value={app.personalData?.dateOfBirth} />
          <DataField label="Religion / Agama" value={app.personalData?.religion} />
          <DataField label="KTP No / Nomor KTP" value={app.personalData?.ktpNo} />
          <DataField label="Valid Until / Berlaku Sampai (KTP)" value={app.personalData?.ktpValidUntil} />
          <DataField label="Email Address / Alamat Email" value={app.personalData?.email} />
          <DataField label="Passport No / Nomor Paspor" value={app.personalData?.passportNo} />
          <DataField label="Valid Until / Berlaku Sampai (Paspor)" value={app.personalData?.passportValidUntil} />
          <DataField label="Home Phone Number / Telepon Rumah" value={app.personalData?.homePhone} />
          <DataField label="Driving License No / Nomor SIM" value={app.personalData?.simNo} />
          <DataField label="Valid Until / Berlaku Sampai (SIM)" value={app.personalData?.simValidUntil} />
          <DataField label="Mobilephone Number / Nomor Handphone" value={app.personalData?.mobilePhone} />
          <DataField label="Status / Status" value={app.personalData?.status} />
          <div className="col-span-full h-px bg-slate-100 my-4"></div>
          <DataField label="Current Address / Alamat Sekarang" value={app.personalData?.currentAddress} fullWidth />
          <DataField label="Address in accordance with KTP / Alamat Sesuai KTP" value={app.personalData?.ktpAddress} fullWidth />
        </div>
      </SectionWrapper>

      {/* B. FAMILY DATA */}
      <SectionWrapper title="B. Family Background / Data Keluarga" icon={Users}>
        <div className="space-y-12">
          <div>
            <SubHeader title="Parents & Spouse / Orang Tua & Pasangan" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-slate-900">
              <div className="p-6 bg-slate-50 rounded-3xl space-y-4 shadow-inner border border-slate-100/50">
                <span className="text-[9px] font-black text-blue-600 uppercase tracking-widest italic">Father / Ayah</span>
                <DataItem label="Name / Nama" value={app.familyData?.father?.name} />
                <DataItem label="Place, DOB / Tempat, Tgl Lahir" value={app.familyData?.father?.placeDateOfBirth} />
                <DataItem label="Occupation / Pekerjaan" value={app.familyData?.father?.occupation} />
              </div>
              <div className="p-6 bg-slate-50 rounded-3xl space-y-4 shadow-inner border border-slate-100/50">
                <span className="text-[9px] font-black text-blue-600 uppercase tracking-widest italic">Mother / Ibu</span>
                <DataItem label="Name / Nama" value={app.familyData?.mother?.name} />
                <DataItem label="Place, DOB / Tempat, Tgl Lahir" value={app.familyData?.mother?.placeDateOfBirth} />
                <DataItem label="Occupation / Pekerjaan" value={app.familyData?.mother?.occupation} />
              </div>
              {app.familyData?.spouse?.name && (
                <div className="p-6 bg-blue-50/50 border border-blue-100 rounded-3xl space-y-4 shadow-inner">
                  <span className="text-[9px] font-black text-blue-600 uppercase tracking-widest italic">Spouse / Suami-Istri</span>
                  <DataItem label="Name / Nama" value={app.familyData?.spouse?.name} />
                  <DataItem label="Place, DOB / Tempat, Tgl Lahir" value={app.familyData?.spouse?.placeDateOfBirth} />
                  <DataItem label="Occupation / Pekerjaan" value={app.familyData?.spouse?.occupation} />
                </div>
              )}
            </div>
          </div>

          {app.familyData?.siblings?.length > 0 && (
            <div>
              <SubHeader title="Siblings / Saudara Kandung" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {app.familyData.siblings.map((s: any, i: number) => (
                  <div key={i} className="p-5 border border-slate-100 rounded-2xl space-y-3 bg-white hover:border-blue-100 transition-colors">
                    <DataItem label={`Sibling / Saudara ${i+1}: Name / Nama`} value={s.name} />
                    <DataItem label="Place, DOB / Occupation (Tempat, Tgl / Pekerjaan)" value={`${s.placeDateOfBirth} / ${s.occupation}`} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {app.familyData?.children?.length > 0 && (
            <div>
              <SubHeader title="Children / Anak" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {app.familyData.children.map((c: any, i: number) => (
                  <div key={i} className="p-5 border border-slate-100 rounded-2xl space-y-3 bg-white hover:border-blue-100 transition-colors">
                    <DataItem label={`Child / Anak ${i+1}: Name / Nama`} value={c.name} />
                    <DataItem label="Place, DOB / Occupation (Tempat, Tgl / Pekerjaan)" value={`${c.placeDateOfBirth} / ${c.occupation}`} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </SectionWrapper>

      {/* C & D. EDUCATION & COURSES */}
      <SectionWrapper title="C & D. Education & Courses / Pendidikan & Kursus" icon={GraduationCap}>
        <div className="space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-slate-900">
            {Object.entries(app.education || {}).map(([level, data]: any) => (
              data.institution && (
                <div key={level} className="p-6 border border-slate-100 rounded-3xl space-y-4 hover:bg-slate-50/50 transition-colors shadow-inner">
                  <span className="text-[10px] font-black bg-slate-900 text-white px-3 py-1 rounded-full uppercase tracking-widest italic">
                    {EDU_LABELS[level] || level}
                  </span>
                  <div className="grid grid-cols-2 gap-4">
                    <DataItem label="Institution Name / Nama Institusi" value={data.institution} />
                    <DataItem label="Major / Jurusan" value={data.major} />
                    <DataItem label="Graduation Year / Tahun Kelulusan" value={data.graduationYear} />
                    <DataItem label="GPA / IPK" value={data.gpa} />
                  </div>
                </div>
              )
            ))}
          </div>

          {app.courses?.length > 0 && (
            <div className="pt-10 border-t border-slate-100">
              <SubHeader title="Certifications / Kursus-Kursus" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-slate-900">
                {app.courses.map((c: any, i: number) => (
                  <div key={i} className="p-6 bg-slate-50/50 rounded-2xl border border-slate-100 space-y-4">
                    <DataItem label="Topic / Topik" value={c.topic} />
                    <div className="grid grid-cols-2 gap-4 text-slate-900">
                      <DataItem label="Duration / Lama Kursus" value={c.duration} />
                      <DataItem label="Year / Tahun" value={c.year} />
                      <DataItem label="Organized By / Penyelenggara" value={c.organizer} />
                      <DataItem label="Location / Lokasi" value={c.location} />
                    </div>
                    <DataItem label="Financed By / Dibiayai Oleh" value={c.financedBy} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </SectionWrapper>

      {/* E. LANGUAGES */}
      <SectionWrapper title="E. Language Ability / Kemampuan Bahasa Asing" icon={Languages}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-slate-900">
          {app.languages?.map((l: any, i: number) => (
            <div key={i} className="p-6 border border-slate-100 rounded-3xl space-y-4 bg-white shadow-sm hover:shadow-md transition-shadow">
              <h4 className="text-sm font-black text-slate-900 uppercase italic underline underline-offset-4 decoration-blue-600">{l.language}</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400 font-bold uppercase tracking-widest">Read / Membaca</span>
                  <span className="font-black text-blue-600 italic">{l.read}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400 font-bold uppercase tracking-widest">Speak / Bicara</span>
                  <span className="font-black text-blue-600 italic">{l.speak}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400 font-bold uppercase tracking-widest">Write / Menulis</span>
                  <span className="font-black text-blue-600 italic">{l.write}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* F. EMPLOYMENT */}
      <SectionWrapper title="F. Employment History / Riwayat Pekerjaan" icon={Briefcase}>
        <div className="space-y-12">
          {app.employmentHistory?.map((h: any, i: number) => (
            h.companyName && (
              <div key={i} className="relative pl-8 border-l-2 border-slate-100 pb-2">
                <div className="absolute top-0 -left-[9px] w-4 h-4 rounded-full bg-blue-600 border-4 border-white shadow-sm"></div>
                <div className="bg-white border border-slate-100 p-8 rounded-[2rem] shadow-sm space-y-8 hover:border-blue-200 transition-colors text-slate-900">
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                    <div>
                      <h4 className="text-xl font-black text-slate-900 uppercase tracking-tight italic leading-none">{h.companyName}</h4>
                      <p className="text-blue-600 font-bold text-xs uppercase tracking-[0.2em] mt-2 italic">{h.jobTitle}</p>
                    </div>
                    <div className="bg-slate-900 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase italic tracking-widest">
                      {h.startWorking} — {h.resigned}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    <DataItem label="Salary / Gaji" value={h.salary} />
                    <DataItem label="Type of Business / Jenis Usaha" value={h.businessType} />
                    <DataItem label="Office Phone / No.Telp" value={h.officePhone} />
                    <DataItem label="Reporting Staff Count / Jumlah Bawahan" value={h.reportingCount} />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                    <DataItem label="Line Supervisor Name / Nama Atasan" value={h.supervisorName} />
                    <DataItem label="Supervisor Job Title / Jabatan Atasan" value={h.supervisorTitle} />
                  </div>

                  <div className="space-y-6">
                    <DataItem label="Reason for Resignation / Alasan Berhenti" value={h.reasonForResignation} />
                    <DataItem label="Job Description / Deskripsi Tugas" value={h.jobDesc} />
                  </div>
                </div>
              </div>
            )
          ))}
        </div>
      </SectionWrapper>

      {/* G. SOCIAL ACTIVITIES */}
      {app.socialActivities?.length > 0 && (
        <SectionWrapper title="G. Social Activity / Aktivitas Sosial" icon={Users}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-slate-900">
            {app.socialActivities.map((s: any, i: number) => (
              <div key={i} className="p-6 border border-slate-100 rounded-3xl bg-white shadow-sm space-y-4 italic">
                <DataItem label="Organization Name / Nama Organisasi" value={s.orgName} />
                <DataItem label="Activity / Aktivitas" value={s.activity} />
                <div className="grid grid-cols-2 gap-4">
                  <DataItem label="Function / Jabatan" value={s.function} />
                  <DataItem label="Year / Tahun" value={s.year} />
                </div>
              </div>
            ))}
          </div>
        </SectionWrapper>
      )}

      {/* I & J. REFERENCES & EMERGENCY */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-10">
        <SectionWrapper title="I. References / Referensi" icon={BookOpen}>
          <div className="space-y-6">
            {app.references?.map((r: any, i: number) => (
              <div key={i} className="p-6 bg-slate-50/50 rounded-2xl border border-slate-100 space-y-4 shadow-inner text-slate-900">
                <DataItem label={`Ref ${i+1}: Name / Nama`} value={r.name} />
                <div className="grid grid-cols-2 gap-4">
                  <DataItem label="Relationship / Hubungan" value={r.relationship} />
                  <DataItem label="Mobile Phone / Nomor Handphone" value={r.mobilePhone} />
                  <DataItem label="Job Title / Jabatan" value={r.jobTitle} />
                  <DataItem label="Company / Perusahaan" value={r.companyName} />
                </div>
              </div>
            ))}
          </div>
        </SectionWrapper>

        <SectionWrapper title="J. Emergency / Kontak Darurat" icon={ShieldAlert}>
          <div className="space-y-6">
            {app.emergencyContacts?.map((e: any, i: number) => (
              <div key={i} className="p-6 bg-red-50/30 rounded-2xl border border-red-100 space-y-4 shadow-inner text-slate-900">
                <DataItem label={`Contact ${i+1}: Name / Nama`} value={e.name} />
                <div className="grid grid-cols-2 gap-4">
                  <DataItem label="Relationship / Hubungan" value={e.relationship} />
                  <DataItem label="Mobilephone Number / Nomor Handphone" value={e.mobilePhone} />
                </div>
              </div>
            ))}
          </div>
        </SectionWrapper>
      </div>

      {/* FINAL SECTION */}
      <div className="bg-blue-600 rounded-[3rem] p-12 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 blur-[100px] rounded-full -mr-48 -mt-48"></div>
        <div className="relative z-10 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-[10px] font-black text-white/50 uppercase tracking-[0.3em] block italic">Expected Salary / Gaji Yang Diharapkan</span>
              <p className="text-4xl font-black italic tracking-tighter leading-none">Rp {app.finalSection?.expectedSalary}</p>
            </div>
            <div className="space-y-2 text-center md:text-left">
              <span className="text-[10px] font-black text-white/50 uppercase tracking-[0.3em] block italic">Ready to Join / Siap Bergabung</span>
              <p className="text-4xl font-black italic tracking-tighter leading-none">{app.finalSection?.expectedJoinDate}</p>
            </div>
            <div className="space-y-2 text-center md:text-left">
              <span className="text-[10px] font-black text-white/50 uppercase tracking-[0.3em] block italic">Availability / Kebersediaan</span>
              <p className="text-2xl font-black italic tracking-tighter leading-none uppercase">{app.finalSection?.availability}</p>
            </div>
          </div>

          <div className="pt-12 border-t border-white/10 space-y-6">
            <div className="flex items-start gap-4">
              <CheckCircle2 className="w-6 h-6 text-white shrink-0 mt-1" />
              <div className="space-y-4">
                <p className="text-sm font-black uppercase tracking-tight italic leading-relaxed">
                  "I hereby certify that the information given above is true and if under any circumstances, there are any misrepresentation or fake information is found, I understand that I shall fully be held responsible."
                </p>
                <p className="text-[11px] text-white/60 font-medium leading-relaxed italic">
                  Dengan ini saya menyatakan bahwa informasi yang diberikan di atas adalah benar dan jika dalam keadaan apapun, ada keliru atau informasi palsu yang ditemukan, saya mengerti bahwa saya sepenuhnya akan bertanggung jawab.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

// Internal DataItem for nested use
const DataItem = ({ label, value }: { label: string, value: any }) => (
  <div className="space-y-1">
    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block leading-none whitespace-pre-wrap">{label}</span>
    <p className="text-[13px] font-bold text-slate-700 leading-tight">{value || "-"}</p>
  </div>
);
