"use client";

import React, { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save, ChevronLeft, ChevronRight, Wand2, AlertCircle } from "lucide-react";
import { ApplicationFormSchema, ApplicationFormData } from "@/lib/schema";

// Import Sections
import { PersonalDataSection } from "./sections/PersonalDataSection";
import { FamilyDataSection } from "./sections/FamilyDataSection";
import { EducationSection } from "./sections/EducationSection";
import { EmploymentSection } from "./sections/EmploymentSection";
import { ReferenceEmergencySection } from "./sections/ReferenceEmergencySection";
import { FinalSection } from "./sections/FinalSection";

const FIELD_LABELS: Record<string, string> = {
  "personalData.appliedPosition": "Applied Position",
  "personalData.fullName": "Full Name",
  "personalData.mobilePhone": "Mobile Phone Number",
  "familyData.father.name": "Father's Name",
  "education.sd.institution": "SD School Name",
  "finalSection.expectedSalary": "Expected Salary",
  "finalSection.expectedJoinDate": "Expected Join Date",
  "finalSection.declaration": "Declaration Agreement"
};

const STEPS = [
  { id: "personal_family", title: "Personal & Family Info", fields: ["personalData", "familyData"] },
  { id: "edu_course_lang", title: "Education, Courses & Languages", fields: ["education", "courses", "languages"] },
  { id: "work_social", title: "Work Experience & Social Activity", fields: ["employmentHistory", "socialActivities"] },
  { id: "refs", title: "References & Emergency", fields: ["references", "emergencyContacts"] },
  { id: "final", title: "Final Declaration", fields: ["finalSection"] },
];

export default function ApplicationForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [showErrorSummary, setShowErrorSummary] = useState(false);

  const methods = useForm<ApplicationFormData>({
    resolver: zodResolver(ApplicationFormSchema),
    mode: "onBlur", // Berpindah ke onBlur agar lebih performan
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

  const getStepErrors = () => {
    const stepErrors: string[] = [];
    const flattenErrors = (obj: any, prefix = "") => {
      for (const key in obj) {
        const path = prefix ? `${prefix}.${key}` : key;
        const error = obj[key];
        if (error?.message) {
          const label = FIELD_LABELS[path] || path;
          stepErrors.push(`${label}: ${error.message}`);
        } else if (typeof error === "object" && error !== null) {
          flattenErrors(error, path);
        }
      }
    };
    STEPS[currentStep].fields.forEach(field => {
      if ((errors as any)[field]) flattenErrors({ [field]: (errors as any)[field] });
    });
    return stepErrors;
  };

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
    console.log("DEBUG: Dummy data loaded:", dummy);
  };

  const next = async () => {
    const fields = STEPS[currentStep].fields as any;
    console.log(`DEBUG: Validating Step ${currentStep} fields:`, fields);
    const isValid = await trigger(fields, { shouldFocus: true });
    
    if (!isValid) {
      console.warn("DEBUG: Validation failed for step", currentStep, errors);
      setShowErrorSummary(true);
      const firstError = document.querySelector('[aria-invalid="true"]');
      if (firstError) firstError.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    
    console.log("DEBUG: Step valid, moving to next.");
    setShowErrorSummary(false);
    if (currentStep < STEPS.length - 1) {
      setCurrentStep((s) => s + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const onSubmit = async (data: ApplicationFormData) => {
    console.log("DEBUG: Submitting final payload:", data);
    try {
      const response = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      console.log("DEBUG: Server response status:", response.status);
      const responseData = await response.json();
      console.log("DEBUG: Server response body:", responseData);

      if (response.ok) {
        alert("SUCCESS: Application Submitted!");
        window.location.href = "/dashboard";
      } else {
        throw new Error(responseData.error || "Failed to submit application");
      }
    } catch (error: any) {
      console.error("DEBUG: Submission error:", error);
      alert(`SUBMISSION FAILED: ${error.message}`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8 bg-white min-h-screen">
      {/* Header UI tetap sama... */}
      <div className="mb-12 sticky top-0 bg-white/80 backdrop-blur-md z-20 py-4 border-b border-slate-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900 tracking-tight uppercase italic">Application Form</h1>
            <p className="text-xs text-slate-500 mt-1 uppercase font-bold tracking-widest uppercase">
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

          {showErrorSummary && (
            <div className="p-6 bg-red-50 border border-red-100 rounded-2xl animate-in zoom-in duration-300 shadow-sm">
              <h4 className="text-sm font-bold text-red-800 uppercase tracking-tight mb-3 italic">Validation Errors (Check Console):</h4>
              <ul className="text-xs text-red-700 space-y-1 list-disc list-inside">
                {getStepErrors().map((msg, i) => <li key={i}>{msg}</li>)}
              </ul>
            </div>
          )}

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
