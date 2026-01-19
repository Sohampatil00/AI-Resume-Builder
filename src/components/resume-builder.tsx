'use client';

import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  User,
  GraduationCap,
  Briefcase,
  Lightbulb,
  Wrench,
  FileText,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

import { PersonalInfoStep } from './steps/personal-info-step';
import { EducationStep } from './steps/education-step';
import { ExperienceStep } from './steps/experience-step';
import { ProjectsStep } from './steps/projects-step';
import { SkillsStep } from './steps/skills-step';
import { FinalizeStep } from './steps/finalize-step';

const personalInfoSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone number is required'),
  linkedin: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  github: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  website: z.string().url('Must be a valid URL').optional().or(z.literal('')),
});

const educationSchema = z.object({
  id: z.string(),
  school: z.string().min(1, 'School name is required'),
  degree: z.string().min(1, 'Degree is required'),
  major: z.string().optional(),
  gpa: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});

const experienceSchema = z.object({
  id: z.string(),
  company: z.string().min(1, 'Company name is required'),
  title: z.string().min(1, 'Job title is required'),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  description: z.string().min(1, 'Description is required'),
});

const projectSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Project name is required'),
  description: z.string().min(1, 'Description is required'),
  technologies: z.string().optional(),
});

const skillsSchema = z.object({
  languages: z.string().optional(),
  frameworks: z.string().optional(),
  tools: z.string().optional(),
});

export const resumeSchema = z.object({
  personalInfo: personalInfoSchema,
  education: z.array(educationSchema),
  experience: z.array(experienceSchema),
  projects: z.array(projectSchema),
  skills: skillsSchema,
});

const steps = [
  { id: 1, name: 'Personal Info', icon: User, fields: ['personalInfo'] },
  { id: 2, name: 'Education', icon: GraduationCap, fields: ['education'] },
  { id: 3, name: 'Experience', icon: Briefcase, fields: ['experience'] },
  { id: 4, name: 'Projects', icon: Lightbulb, fields: ['projects'] },
  { id: 5, name: 'Skills', icon: Wrench, fields: ['skills'] },
  { id: 6, name: 'Finalize', icon: FileText, fields: [] },
];

export function ResumeBuilder() {
  const [currentStep, setCurrentStep] = useState(1);

  const methods = useForm<z.infer<typeof resumeSchema>>({
    resolver: zodResolver(resumeSchema),
    defaultValues: {
      personalInfo: {
        name: '',
        email: '',
        phone: '',
        linkedin: '',
        github: '',
        website: '',
      },
      education: [],
      experience: [],
      projects: [],
      skills: {
        languages: '',
        frameworks: '',
        tools: '',
      },
    },
  });

  const nextStep = async () => {
    const fieldsToValidate = steps[currentStep - 1].fields;
    const isValid = await methods.trigger(fieldsToValidate as any);

    if (isValid && currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const progress = (currentStep / steps.length) * 100;
  const CurrentStepComponent = [
    PersonalInfoStep,
    EducationStep,
    ExperienceStep,
    ProjectsStep,
    SkillsStep,
    FinalizeStep,
  ][currentStep - 1];

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle className="font-headline text-3xl text-primary">
          College Resume AI
        </CardTitle>
        <CardDescription>
          Create a professional resume with the power of AI.
        </CardDescription>
        <div className="pt-4">
          <Progress value={progress} className="w-full" />
          <div className="mt-2 flex justify-between text-xs text-muted-foreground">
            {steps.map((step) => (
              <div
                key={step.id}
                className={`flex flex-col items-center ${
                  currentStep >= step.id ? 'text-primary' : ''
                }`}
              >
                <step.icon
                  className={`h-5 w-5 ${
                    currentStep === step.id ? 'font-bold' : ''
                  }`}
                />
                <span>{step.name}</span>
              </div>
            ))}
          </div>
        </div>
      </CardHeader>
      <FormProvider {...methods}>
        <form onSubmit={(e) => e.preventDefault()}>
          <CardContent className="min-h-[300px]">
            <CurrentStepComponent />
          </CardContent>
          <CardFooter className="justify-between">
            <Button variant="outline" onClick={prevStep} disabled={currentStep === 1}>
              Back
            </Button>
            {currentStep < steps.length && (
              <Button onClick={nextStep}>Next</Button>
            )}
          </CardFooter>
        </form>
      </FormProvider>
    </Card>
  );
}
