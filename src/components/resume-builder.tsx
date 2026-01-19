'use client';

import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
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
  cgpa: z.string().optional(),
  startMonth: z.string().optional(),
  startYear: z.string().optional(),
  endMonth: z.string().optional(),
  endYear: z.string().optional(),
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

export function ResumeBuilder() {
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

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle className="font-headline text-3xl text-primary">
          College Resume AI
        </CardTitle>
        <CardDescription>
          A simple resume builder to generate a professional LaTeX resume with
          the help of AI.
        </CardDescription>
      </CardHeader>
      <FormProvider {...methods}>
        <form onSubmit={(e) => e.preventDefault()}>
          <CardContent className="space-y-8">
            <PersonalInfoStep />
            <Separator />
            <EducationStep />
            <Separator />
            <ExperienceStep />
            <Separator />
            <ProjectsStep />
            <Separator />
            <SkillsStep />
            <Separator />
            <FinalizeStep />
          </CardContent>
        </form>
      </FormProvider>
    </Card>
  );
}
