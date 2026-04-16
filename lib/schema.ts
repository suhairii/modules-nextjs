import { z } from "zod";

const FamilyMemberSchema = z.object({
  name: z.string().min(1, "Wajib diisi / Required"),
  placeDateOfBirth: z.string().min(1, "Wajib diisi / Required"),
  occupation: z.string().min(1, "Wajib diisi / Required"),
});

const EducationLevelSchema = z.object({
  institution: z.string().min(1, "Wajib diisi / Required"),
  major: z.string().min(1, "Wajib diisi / Required"),
  graduationYear: z.string().min(1, "Wajib diisi / Required"),
  gpa: z.string().min(1, "Wajib diisi / Required"),
});

export const ApplicationFormSchema = z.object({
  // A. DATA PRIBADI / Personal Data
  personalData: z.object({
    appliedPosition: z.string().min(1, "Wajib diisi / Required"),
    vacancySource: z.string().min(1, "Wajib diisi / Required"),
    fullName: z.string().min(1, "Wajib diisi / Required"),
    gender: z.enum(["Laki-laki/Male", "Perempuan/Female"]),
    nickname: z.string().optional(),
    bloodType: z.string().min(1, "Wajib diisi / Required"),
    placeOfBirth: z.string().min(1, "Wajib diisi / Required"),
    dateOfBirth: z.string().min(1, "Wajib diisi / Required"),
    religion: z.string().min(1, "Wajib diisi / Required"),
    ktpNo: z.string().min(1, "Wajib diisi / Required"),
    ktpValidUntil: z.string().min(1, "Wajib diisi / Required"),
    email: z.string().email("Email tidak valid / Invalid email"),
    passportNo: z.string().optional(),
    passportValidUntil: z.string().optional(),
    homePhone: z.string().optional(),
    simNo: z.string().optional(),
    simValidUntil: z.string().optional(),
    mobilePhone: z.string().min(1, "Wajib diisi / Required"),
    currentAddress: z.string().min(1, "Wajib diisi / Required"),
    ktpAddress: z.string().min(1, "Wajib diisi / Required"),
    status: z.enum(["Single", "Married", "Widow", "Widower"]),
  }),

  // B. DATA KELUARGA / Family Background Data
  familyData: z.object({
    father: FamilyMemberSchema,
    mother: FamilyMemberSchema,
    siblings: z.array(FamilyMemberSchema).max(6),
    spouse: FamilyMemberSchema.partial().optional(),
    children: z.array(FamilyMemberSchema).max(4),
  }),

  // C. PENDIDIKAN / Education
  education: z.object({
    sd: EducationLevelSchema,
    sltp: EducationLevelSchema,
    slta: EducationLevelSchema,
    d3: EducationLevelSchema.partial().optional(),
    s1: EducationLevelSchema.partial().optional(),
    s2: EducationLevelSchema.partial().optional(),
  }),

  // D. KURSUS-KURSUS / Courses
  courses: z.array(z.object({
    topic: z.string().min(1, "Wajib diisi / Required"),
    duration: z.string().min(1, "Wajib diisi / Required"),
    year: z.string().min(1, "Wajib diisi / Required"),
    organizer: z.string().min(1, "Wajib diisi / Required"),
    location: z.string().min(1, "Wajib diisi / Required"),
    financedBy: z.string().min(1, "Wajib diisi / Required"),
  })).max(5),

  // E. KEMAMPUAN BAHASA ASING / Language Ability
  languages: z.array(z.object({
    language: z.string().min(1, "Wajib diisi / Required"),
    read: z.string().min(1, "Wajib diisi / Required"),
    speak: z.string().min(1, "Wajib diisi / Required"),
    write: z.string().min(1, "Wajib diisi / Required"),
  })).max(4),

  // F. RIWAYAT PEKERJAAN / Employment History
  employmentHistory: z.array(z.object({
    companyName: z.string().min(1, "Wajib diisi / Required"),
    jobTitle: z.string().min(1, "Wajib diisi / Required"),
    salary: z.string().min(1, "Wajib diisi / Required"),
    officePhone: z.string().min(1, "Wajib diisi / Required"),
    startWorking: z.string().min(1, "Wajib diisi / Required"),
    resigned: z.string().min(1, "Wajib diisi / Required"),
    jobDesc: z.string().min(1, "Wajib diisi / Required"),
    businessType: z.string().min(1, "Wajib diisi / Required"),
    supervisorName: z.string().min(1, "Wajib diisi / Required"),
    supervisorTitle: z.string().min(1, "Wajib diisi / Required"),
    reportingCount: z.string().min(1, "Wajib diisi / Required"),
  })).length(3),

  // G. AKTIVITAS SOSIAL / Social Activity
  socialActivities: z.array(z.object({
    orgName: z.string().min(1, "Wajib diisi / Required"),
    activity: z.string().min(1, "Wajib diisi / Required"),
    function: z.string().min(1, "Wajib diisi / Required"),
    year: z.string().min(1, "Wajib diisi / Required"),
  })).max(3),

  // I. REFERENSI / References
  references: z.array(z.object({
    name: z.string().min(1, "Wajib diisi / Required"),
    relationship: z.string().min(1, "Wajib diisi / Required"),
    jobTitleCompany: z.string().min(1, "Wajib diisi / Required"),
    mobilePhone: z.string().min(1, "Wajib diisi / Required"),
  })).length(3),

  // J. KONTAK DARURAT / Emergency Contacts
  emergencyContacts: z.array(z.object({
    name: z.string().min(1, "Wajib diisi / Required"),
    relationship: z.string().min(1, "Wajib diisi / Required"),
    mobilePhone: z.string().min(1, "Wajib diisi / Required"),
  })).length(3),

  // FINAL SECTION
  finalSection: z.object({
    expectedSalary: z.string().min(1, "Wajib diisi / Required"),
    availability: z.string().min(1, "Wajib diisi / Required"),
    declaration: z.boolean().refine(val => val === true, {
      message: "Anda harus menyetujui pernyataan ini / You must agree to this declaration"
    }),
  }),
});

export type ApplicationFormData = z.infer<typeof ApplicationFormSchema>;
