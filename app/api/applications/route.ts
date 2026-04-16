import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Simpan ke database dengan relasi yang sesuai
    const result = await prisma.application.create({
      data: {
        ...data.personalData,
        ...data.finalSection,
        
        // Relasi B: Family Background
        familyMembers: {
          create: [
            { relationship: "Father", ...data.familyData.father },
            { relationship: "Mother", ...data.familyData.mother },
            ...(data.familyData.spouse?.name ? [{ relationship: "Spouse", ...data.familyData.spouse }] : []),
            ...(data.familyData.siblings?.map((s: any) => ({ relationship: "Sibling", ...s })) || []),
            ...(data.familyData.children?.map((c: any) => ({ relationship: "Child", ...c })) || []),
          ],
        },

        // Relasi C: Education
        educations: {
          create: [
            { level: "SD", ...data.education.sd },
            { level: "SLTP", ...data.education.sltp },
            { level: "SLTA", ...data.education.slta },
            ...(data.education.d3?.institution ? [{ level: "D3", ...data.education.d3 }] : []),
            ...(data.education.s1?.institution ? [{ level: "S1", ...data.education.s1 }] : []),
            ...(data.education.s2?.institution ? [{ level: "S2", ...data.education.s2 }] : []),
          ],
        },

        // Relasi D: Courses
        courses: {
          create: data.courses.map((c: any) => ({ ...c })),
        },

        // Relasi E: Languages
        languages: {
          create: data.languages.map((l: any) => ({ ...l })),
        },

        // Relasi F: Employment
        employmentHistory: {
          create: data.employmentHistory.map((h: any) => ({ ...h })),
        },

        // Relasi G: Social Activity
        socialActivities: {
          create: data.socialActivities.map((s: any) => ({ ...s })),
        },

        // Relasi I: References
        references: {
          create: data.references.map((r: any) => ({ ...r })),
        },

        // Relasi J: Emergency Contacts
        emergencyContacts: {
          create: data.emergencyContacts.map((e: any) => ({ ...e })),
        },
      },
    });

    return NextResponse.json({ success: true, id: result.id });
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to save application" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const applications = await prisma.application.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        fullName: true,
        appliedPosition: true,
        email: true,
        mobilePhone: true,
        createdAt: true,
      },
    });
    return NextResponse.json(applications);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}
