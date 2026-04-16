"use client";

import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save, ChevronLeft, ChevronRight } from "lucide-react";
import { ApplicationFormSchema, ApplicationFormData } from "@/lib/schema";

// Import Sections
import { PersonalDataSection } from "./sections/PersonalDataSection";
import { FamilyDataSection } from "./sections/FamilyDataSection";
import { EducationSection } from "./sections/EducationSection";
import { CourseLanguageSection } from "./sections/CourseLanguageSection";
import { EmploymentSection } from "./sections/EmploymentSection";
import { ReferenceEmergencySection } from "./sections/ReferenceEmergencySection";
import { FinalSection } from "./sections/FinalSection";

const STEPS = [
  { id: "personal", title: "Data Pribadi / Personal Data", fields: ["personalData"] },
  { id: "family", title: "Data Keluarga / Family Data", fields: ["familyData"] },
  { id: "education", title: "Pendidikan / Education", fields: ["education"] },
  { id: "courses", title: "Kursus & Bahasa / Courses & Languages", fields: ["courses", "languages"] },
  { id: "work", title: "Riwayat Pekerjaan / Employment History", fields: ["employmentHistory"] },
  { id: "refs", title: "Referensi & Darurat / References & Emergency", fields: ["references", "emergencyContacts"] },
  { id: "final", title: "Pernyataan / Final Declaration", fields: ["finalSection"] },
];

export default function ApplicationForm() {
  const [currentStep, setCurrentStep] = useState(0);

  const methods = useForm<ApplicationFormData>({
    resolver: zodResolver(ApplicationFormSchema),
    mode: "onChange",
    defaultValues: {
      personalData: { gender: "Laki-laki/Male", status: "Single" },
      familyData: { siblings: [], children: [] },
      courses: [],
      languages: [],
      employmentHistory: [{}, {}, {}],
      references: [{}, {}, {}],
      emergencyContacts: [{}, {}, {}],
      finalSection: { declaration: false },
    },
  });

  const { handleSubmit, trigger, formState: { isSubmitting } } = methods;

  const next = async () => {
    const fields = STEPS[currentStep].fields as any;
    const isValid = await trigger(fields, { shouldFocus: true });
    if (isValid && currentStep < STEPS.length - 1) {
      setCurrentStep((s) => s + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const prev = () => {
    if (currentStep > 0) {
      setCurrentStep((s) => s - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const onSubmit = async (data: ApplicationFormData) => {
    console.log("Final Form Data:", data);
    alert("Form Submitted Successfully!");
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 sm:px-6 lg:px-8 bg-white shadow-2xl rounded-xl border-2 border-slate-200 my-4">
      {/* Progress Header */}
      <div className="mb-10 sticky top-0 bg-white z-20 py-4 border-b-2 border-slate-100">
        <div className="flex items-center justify-between mb-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-black text-black tracking-tighter leading-none uppercase">
              Application Form
            </h1>
            <p className="text-sm font-extrabold text-blue-700 uppercase tracking-widest">
              {STEPS[currentStep].title}
            </p>
          </div>
          <div className="text-right">
            <span className="text-xl font-black text-black">
              {currentStep + 1} / {STEPS.length}
            </span>
          </div>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden border border-slate-300">
          <div 
            className="bg-black h-full transition-all duration-700 ease-in-out" 
            style={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
          />
        </div>
      </div>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-12 min-h-[500px]">
          <div className="text-black">
            {currentStep === 0 && <PersonalDataSection />}
            {currentStep === 1 && <FamilyDataSection />}
            {currentStep === 2 && <EducationSection />}
            {currentStep === 3 && <CourseLanguageSection />}
            {currentStep === 4 && <EmploymentSection />}
            {currentStep === 5 && <ReferenceEmergencySection />}
            {currentStep === 6 && <FinalSection />}
          </div>

          {/* Navigation Bar */}
          <div className="flex w-full justify-between items-center mt-12 pt-8 border-t-4 border-slate-100 gap-6">
            <div className="flex-1">
              {currentStep > 0 && (
                <button
                  type="button"
                  onClick={prev}
                  className="flex items-center justify-center gap-2 px-8 py-4 bg-white text-black border-2 border-black rounded-lg shadow-md hover:bg-slate-50 transition-all active:scale-95 text-base font-black uppercase tracking-widest w-full sm:w-auto"
                >
                  <ChevronLeft className="w-6 h-6" />
                  PREVIOUS
                </button>
              )}
            </div>

            <div className="flex-1 flex justify-end">
              {currentStep < STEPS.length - 1 ? (
                <button
                  type="button"
                  onClick={next}
                  className="flex items-center justify-center gap-2 px-12 py-4 bg-black text-white rounded-lg shadow-xl hover:bg-slate-800 transition-all active:scale-95 text-base font-black uppercase tracking-widest w-full sm:w-auto"
                >
                  NEXT
                  <ChevronRight className="w-6 h-6" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center justify-center gap-2 px-12 py-4 bg-blue-700 text-white rounded-lg shadow-xl hover:bg-blue-800 transition-all active:scale-95 text-base font-black uppercase tracking-widest disabled:opacity-50 w-full sm:w-auto"
                >
                  <Save className="w-6 h-6" />
                  SUBMIT
                </button>
              )}
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
