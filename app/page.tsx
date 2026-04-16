"use client";

import ApplicationForm from "@/components/ApplicationForm/ApplicationForm";
import { ChevronRight } from "lucide-react";

export default function Home() {
  const handleSubmit = (data: any) => {
    console.log("Form Submitted:", data);
    alert("Check console for submitted data!");
  };

  return (
    <main className="min-h-screen p-8 md:p-24 bg-zinc-100">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl text-slate-900">
            Job Application
          </h1>
          <p className="text-slate-500 text-lg">Please fill out the form below to apply for a position.</p>
        </div>
        
        <ApplicationForm onSubmit={handleSubmit} />
        
        <div className="text-center mt-8">
          <a href="/candidates" className="text-slate-600 font-medium hover:text-slate-900 transition-colors flex items-center justify-center gap-2">
            View Candidate Dashboard <ChevronRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </main>
  );
}
