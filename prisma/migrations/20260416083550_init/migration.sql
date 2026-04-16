-- CreateTable
CREATE TABLE "Application" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "appliedPosition" TEXT NOT NULL,
    "vacancySource" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "nickname" TEXT,
    "bloodType" TEXT,
    "placeOfBirth" TEXT NOT NULL,
    "dateOfBirth" TEXT NOT NULL,
    "religion" TEXT,
    "ktpNo" TEXT NOT NULL,
    "ktpValidUntil" TEXT,
    "email" TEXT NOT NULL,
    "passportNo" TEXT,
    "passportValidUntil" TEXT,
    "homePhone" TEXT,
    "simNo" TEXT,
    "simValidUntil" TEXT,
    "mobilePhone" TEXT NOT NULL,
    "currentAddress" TEXT NOT NULL,
    "ktpAddress" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "expectedSalary" TEXT NOT NULL,
    "availability" TEXT NOT NULL,
    "expectedJoinDate" TEXT NOT NULL,
    "declaration" BOOLEAN NOT NULL
);

-- CreateTable
CREATE TABLE "FamilyMember" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "relationship" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "placeDateOfBirth" TEXT NOT NULL,
    "occupation" TEXT NOT NULL,
    "applicationId" TEXT NOT NULL,
    CONSTRAINT "FamilyMember_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Education" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "level" TEXT NOT NULL,
    "institution" TEXT NOT NULL,
    "major" TEXT NOT NULL,
    "graduationYear" TEXT NOT NULL,
    "gpa" TEXT,
    "applicationId" TEXT NOT NULL,
    CONSTRAINT "Education_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Course" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "topic" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "organizer" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "financedBy" TEXT NOT NULL,
    "applicationId" TEXT NOT NULL,
    CONSTRAINT "Course_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Language" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "language" TEXT NOT NULL,
    "read" TEXT NOT NULL,
    "speak" TEXT NOT NULL,
    "write" TEXT NOT NULL,
    "applicationId" TEXT NOT NULL,
    CONSTRAINT "Language_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Employment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "companyName" TEXT NOT NULL,
    "jobTitle" TEXT NOT NULL,
    "salary" TEXT NOT NULL,
    "officePhone" TEXT,
    "startWorking" TEXT NOT NULL,
    "resigned" TEXT NOT NULL,
    "reasonForResignation" TEXT,
    "jobDesc" TEXT NOT NULL,
    "businessType" TEXT NOT NULL,
    "supervisorName" TEXT NOT NULL,
    "supervisorTitle" TEXT NOT NULL,
    "reportingCount" TEXT NOT NULL,
    "applicationId" TEXT NOT NULL,
    CONSTRAINT "Employment_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SocialActivity" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "orgName" TEXT NOT NULL,
    "activity" TEXT NOT NULL,
    "function" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "applicationId" TEXT NOT NULL,
    CONSTRAINT "SocialActivity_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Reference" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "relationship" TEXT NOT NULL,
    "jobTitle" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "mobilePhone" TEXT NOT NULL,
    "applicationId" TEXT NOT NULL,
    CONSTRAINT "Reference_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "EmergencyContact" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "relationship" TEXT NOT NULL,
    "mobilePhone" TEXT NOT NULL,
    "applicationId" TEXT NOT NULL,
    CONSTRAINT "EmergencyContact_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
