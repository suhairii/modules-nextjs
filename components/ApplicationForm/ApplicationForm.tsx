"use client";

import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ApplicationFormSchema, ApplicationFormData } from "@/lib/schema";
import { FIELD_LABELS, STEPS_METADATA as STEPS } from "@/lib/constants";

// Import Sections
import { PersonalDataSection } from "./sections/PersonalDataSection";
import { FamilyDataSection } from "./sections/FamilyDataSection";
import { EducationSection } from "./sections/EducationSection";
import { EmploymentSection } from "./sections/EmploymentSection";
import { ReferenceEmergencySection } from "./sections/ReferenceEmergencySection";
import { FinalSection } from "./sections/FinalSection";

export default function ApplicationForm() {
  const [currentStep, setCurrentStep] = useState(0);

  const methods = useForm<ApplicationFormData>({
    resolver: zodResolver(ApplicationFormSchema),
    mode: "onBlur",
    defaultValues: {
      personalData: { gender: "Laki-laki/Male", status: "Single" },
      familyData: { siblings: [], children: [] },
      courses: [],
      languages: [],
      employmentHistory: [{}, {}, {}],
      references: [{}],
      emergencyContacts: [{}, {}],
      finalSection: { declaration: false },
    },
  });

  const { handleSubmit, trigger, reset, formState: { isSubmitting, errors } } = methods;

  const fillDummyData = () => {
    const today = new Date().toISOString().split('T')[0];
    const dummy: ApplicationFormData = {
      personalData: {
        appliedPosition: "Expert Next.js Developer", vacancySource: "Direct", fullName: "Test Candidate",
        gender: "Laki-laki/Male", nickname: "Tester", bloodType: "B", placeOfBirth: "Jakarta",
        dateOfBirth: "1990-01-01", religion: "Islam", ktpNo: "1234567890123456",
        ktpValidUntil: "2030-01-01", email: "test@example.com", mobilePhone: "08123456789",
        currentAddress: "Jakarta", ktpAddress: "Jakarta", status: "Single",
      },
      familyData: {
        father: { name: "Father Name", placeDateOfBirth: "Jakarta, 1960", occupation: "Retired" },
        mother: { name: "Mother Name", placeDateOfBirth: "Jakarta, 1965", occupation: "Housewife" },
        siblings: [], children: []
      },
      education: {
        sd: { institution: "SD 01", major: "General", graduationYear: "2000", gpa: "3.0" },
        sltp: { institution: "SMP 01", major: "General", graduationYear: "2003", gpa: "3.0" },
        slta: { institution: "SMA 01", major: "IPA", graduationYear: "2006", gpa: "3.0" },
      },
      courses: [], languages: [],
      employmentHistory: Array(3).fill({ 
        companyName: "Company", jobTitle: "Dev", salary: "10M", officePhone: "021", 
        startWorking: "2010", resigned: "2020", reasonForResignation: "Resign",
        jobDesc: "Dev", businessType: "IT", supervisorName: "Boss", 
        supervisorTitle: "CEO", reportingCount: "0" 
      }),
      socialActivities: [],
      references: [
        { name: "Reference 1", relationship: "Manager", jobTitle: "Lead", companyName: "Co", mobilePhone: "0811" }
      ],
      emergencyContacts: [
        { name: "Emergency 1", relationship: "Brother", mobilePhone: "0811" },
        { name: "Emergency 2", relationship: "Sister", mobilePhone: "0822" }
      ],
      finalSection: { 
        expectedSalary: "15.000.000", 
        availability: "Immediately", 
        expectedJoinDate: today, 
        declaration: true 
      }
    };
    reset(dummy);
  };

  const next = async () => {
    const fields = STEPS[currentStep].fields as any;
    const isValid = await trigger(fields, { shouldFocus: true });
    
    if (!isValid) {
      const firstError = document.querySelector('[aria-invalid="true"]');
      if (firstError) firstError.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    
    if (currentStep < STEPS.length - 1) {
      setCurrentStep((s) => s + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const onSubmit = async (data: ApplicationFormData) => {
    try {
      const response = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (response.ok) {
        alert("SUCCESS: Application Submitted!");
        window.location.href = "/dashboard";
      } else {
        throw new Error(responseData.error || "Failed to submit application");
      }
    } catch (error: any) {
      alert(`SUBMISSION FAILED: ${error.message}`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8 bg-white min-h-screen">
      <div className="mb-12 sticky top-0 bg-white/80 backdrop-blur-md z-20 py-4 border-b border-slate-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900 tracking-tight uppercase italic">Application Form</h1>
            <p className="text-xs text-slate-500 mt-1 uppercase font-bold tracking-widest">
              Step {currentStep + 1} of {STEPS.length}: {STEPS[currentStep].title}
            </p>
          </div>
          <div className="flex items-center justify-center gap-4">
            <button type="button" onClick={fillDummyData} className="px-3 py-1.5 bg-slate-50 text-slate-500 border border-slate-200 rounded-md text-[10px] font-bold uppercase hover:bg-slate-100 transition-all shadow-sm">
              Fill Dummy
            </button>
            <div className="flex gap-1">
              {STEPS.map((_, index) => (
                <div key={index} className={`h-1.5 w-6 rounded-full transition-all duration-300 ${index <= currentStep ? "bg-blue-600" : "bg-slate-100"}`} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-16 pb-20">
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {currentStep === 0 && (
              <div className="space-y-20">
                <PersonalDataSection />
                <div className="border-t border-slate-100 pt-20">
                  <FamilyDataSection />
                </div>
              </div>
            )}
            {currentStep === 1 && <EducationSection />}
            {currentStep === 2 && <EmploymentSection />}
            {currentStep === 3 && <ReferenceEmergencySection />}
            {currentStep === 4 && <FinalSection />}
          </div>

          <div className="flex w-full justify-between items-center pt-10 border-t border-slate-100 mt-10">
            <button type="button" onClick={() => setCurrentStep(s => s - 1)} className={`px-6 py-2 text-slate-500 text-sm font-medium ${currentStep === 0 ? 'invisible' : 'visible'}`}>
              Back
            </button>
            <button 
              type="button" 
              onClick={currentStep < STEPS.length - 1 ? next : handleSubmit(onSubmit)}
              disabled={isSubmitting}
              className="px-8 py-2.5 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all text-sm font-medium disabled:opacity-50"
            >
              {isSubmitting ? "Submitting..." : currentStep < STEPS.length - 1 ? "Continue" : "Finalize & Submit"}
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
