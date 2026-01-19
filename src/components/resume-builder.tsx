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
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { PersonalInfoStep } from './steps/personal-info-step';
import { EducationStep } from './steps/education-step';
import { ExperienceStep } from './steps/experience-step';
import { ProjectsStep } from './steps/projects-step';
import { SkillsStep } from './steps/skills-step';
import { FinalizeStep } from './steps/finalize-step';
import { PublicationsStep } from './steps/publications-step';
import { HonorsAwardsStep } from './steps/honors-awards-step';
import { VolunteerExperienceStep } from './steps/volunteer-experience-step';
import { Info } from 'lucide-react';

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

const publicationSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Title is required'),
  publisher: z.string().optional(),
  date: z.string().optional(),
  description: z.string().optional(),
});

const honorSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Title is required'),
  issuer: z.string().optional(),
  date: z.string().optional(),
});

const volunteerExperienceSchema = z.object({
  id: z.string(),
  organization: z.string().min(1, 'Organization is required'),
  role: z.string().min(1, 'Role is required'),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  description: z.string().optional(),
});

export const resumeSchema = z.object({
  personalInfo: personalInfoSchema,
  education: z.array(educationSchema),
  experience: z.array(experienceSchema),
  projects: z.array(projectSchema),
  skills: skillsSchema,
  publications: z.array(publicationSchema),
  honors: z.array(honorSchema),
  volunteerExperience: z.array(volunteerExperienceSchema),
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
      publications: [],
      honors: [],
      volunteerExperience: [],
    },
  });

  const fillAllWithDummyData = () => {
    methods.reset({
      personalInfo: {
        name: 'Ramesh Patel',
        email: 'ramesh.patel@example.com',
        phone: '+91 12345 67890',
        linkedin: 'https://linkedin.com/in/rameshpatel',
        github: 'https://github.com/rameshpatel',
        website: 'https://rameshpatel.com',
      },
      education: [
        {
          id: crypto.randomUUID(),
          school: 'Netaji Subhash Engineering College',
          degree: 'Bachelor of Technology',
          major: 'Information Technology',
          cgpa: '7.27/10',
          startMonth: 'Jul',
          startYear: '2016',
          endMonth: 'Jun',
          endYear: '2020',
        },
      ],
      experience: [
        {
          id: crypto.randomUUID(),
          company: 'Google Summer of Code - Submitty',
          title: 'Student Developer (Full-time)',
          startDate: 'May 2019',
          endDate: 'Sep 2019',
          description:
            '• Discussion Forum Upgrades: Refactor forum for performance to handle large databases.\n• REST API for Discussion Forum: Symphony & Twig based Forum parts converted to API-first interface.\n• Ratchet PHP WebSocket: Implemented a WebSocket for low-latency real time exchange of posts and thread updates.',
        },
        {
          id: crypto.randomUUID(),
          company: 'DataCamp Inc.',
          title: 'Instructor (Part-time, Contractual)',
          startDate: 'Dec 2018',
          endDate: 'Present',
          description:
            '• Project Course - Find Movie Similarity from Plot Summaries: Created project based course using Unsupervised learning and natural language processing.\n• Tutorial - Introduction to Reinforcement Learning: Created tutorial for Q-learning RL algorithm and concepts.\n• Impact: Course has been taken by 250+ students so far with 4.65 average rating.',
        },
      ],
      projects: [
        {
          id: crypto.randomUUID(),
          name: 'Vison - multimedia search engine',
          technologies:
            'NLP, Search Engine, Web Crawlers, Multimedia Processing',
          description:
            'Research oriented, open source, search engine for bringing reverse multimedia search to small & mid scale enterprises.',
        },
        {
          id: crypto.randomUUID(),
          name: 'Reinforcement Learning based Traffic Control System',
          technologies: 'Reinforcement Learning, Computer Vision',
          description:
            'AI model to resolve city traffic around 50% faster. Tech: Python, Alibaba Cloud, Raspberry Pi, Arduino, SUMO & OpenCV.',
        },
      ],
      skills: {
        languages: 'Python, PHP, C++, JavaScript, SQL, Bash, JAVA',
        frameworks:
          'Scikit, NLTK, SpaCy, TensorFlow, Keras, Django, Flask, NodeJS, LAMP',
        tools: 'Kubernetes, Docker, GIT, PostgreSQL, MySQL, SQLite',
      },
      publications: [
        {
          id: crypto.randomUUID(),
          title: 'Deep Learning on Web',
          publisher: 'Packt Publishing',
          date: 'Nov 2018',
          description:
            'Work in Progress book to be published by Packt Publishing in late 2019. Tech: Django, Python, AWS, GCP, Azure',
        },
        {
          id: crypto.randomUUID(),
          title: 'Deep Learning on Mobile Devices',
          publisher: 'Packt Publishing',
          date: 'Dec 2018',
          description:
            'Work in Progress book to be published by Packt Publishing in late 2019. Tech: Flutter, Android, Firebase, TensorFlow, Python, Dart',
        },
      ],
      honors: [
        {
          id: crypto.randomUUID(),
          title: 'Awarded title of Intel Software Innovator',
          issuer: 'Intel',
          date: 'May, 2019',
        },
        {
          id: crypto.randomUUID(),
          title:
            "Second Runner's Up at TCS EngiNx Engineering Project Innovation Content",
          issuer: 'TCS',
          date: 'September, 2018',
        },
        {
          id: crypto.randomUUID(),
          title: "Runner's Up at Facebook Developers Circle Hackathon",
          issuer: 'Facebook',
          date: 'August, 2017',
        },
      ],
      volunteerExperience: [
        {
          id: crypto.randomUUID(),
          organization: 'Developer Student Clubs NSEC',
          role: 'Community Lead',
          startDate: 'Jan 2019',
          endDate: 'Present',
          description:
            'Conducted online and offline technical & soft-skills training impacting over 3000 students.',
        },
        {
          id: crypto.randomUUID(),
          organization: 'Google Developers Group Kolkata',
          role: 'Event Organizer',
          startDate: 'Jan 2018',
          endDate: 'Present',
          description:
            'Organized events, conducted workshops and delivered workshops reaching over 7000 developers.',
        },
      ],
    });
  };


  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="space-y-1.5">
            <CardTitle className="font-headline text-3xl text-primary">
              AI Resume Builder
            </CardTitle>
            <CardDescription>
              A simple resume builder to generate a professional LaTeX resume with
              the help of AI.
            </CardDescription>
          </div>
          <Button
            type="button"
            variant="outline"
            onClick={fillAllWithDummyData}
          >
            <Info className="mr-2 h-4 w-4" />
            Fill with Dummy Data
          </Button>
        </div>
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
            <PublicationsStep />
            <Separator />
            <HonorsAwardsStep />
            <Separator />
            <VolunteerExperienceStep />
            <Separator />
            <FinalizeStep />
          </CardContent>
        </form>
      </FormProvider>
    </Card>
  );
}
