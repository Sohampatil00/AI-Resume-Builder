'use client';

import { useState } from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { PlusCircle, Trash2, Sparkles, Info } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { AIDescriptionGenerator } from '../ai-description-generator';

export function ExperienceStep() {
  const { control, setValue, getValues } = useFormContext();
  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: 'experience',
  });
  const [isGeneratorOpen, setIsGeneratorOpen] = useState(false);
  const [activeExperienceIndex, setActiveExperienceIndex] = useState<number | null>(null);

  const openGenerator = (index: number) => {
    setActiveExperienceIndex(index);
    setIsGeneratorOpen(true);
  };

  const onDescriptionGenerated = (description: string) => {
    if (activeExperienceIndex !== null) {
      setValue(`experience.${activeExperienceIndex}.description`, description, {
        shouldValidate: true,
      });
    }
  };

  const fillDummyData = () => {
    replace([
      {
        id: crypto.randomUUID(),
        company: 'Google Summer of Code - Submitty',
        title: 'Student Developer (Full-time)',
        startDate: 'May 2019',
        endDate: 'Sep 2019',
        description: '• Discussion Forum Upgrades: Refactor forum for performance to handle large databases.\n• REST API for Discussion Forum: Symphony & Twig based Forum parts converted to API-first interface.\n• Ratchet PHP WebSocket: Implemented a WebSocket for low-latency real time exchange of posts and thread updates.',
      },
      {
        id: crypto.randomUUID(),
        company: 'DataCamp Inc.',
        title: 'Instructor (Part-time, Contractual)',
        startDate: 'Dec 2018',
        endDate: 'Present',
        description: '• Project Course - Find Movie Similarity from Plot Summaries: Created project based course using Unsupervised learning and natural language processing.\n• Tutorial - Introduction to Reinforcement Learning: Created tutorial for Q-learning RL algorithm and concepts.\n• Impact: Course has been taken by 250+ students so far with 4.65 average rating.',
      },
    ]);
  };

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-headline font-semibold text-primary">
            Work Experience
          </h2>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={fillDummyData}
            >
              <Info className="mr-2 h-4 w-4" />
              Fill with Dummy Data
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() =>
                append({
                  id: crypto.randomUUID(),
                  company: '',
                  title: '',
                  startDate: '',
                  endDate: '',
                  description: '',
                })
              }
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Experience
            </Button>
          </div>
        </div>

        <div className="space-y-8">
          {fields.map((field, index) => (
            <div key={field.id} className="space-y-4 rounded-md border p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Experience #{index + 1}</h3>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => remove(index)}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
              <Separator />
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <FormField
                  control={control}
                  name={`experience.${index}.company`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company</FormLabel>
                      <FormControl>
                        <Input placeholder="Acme Inc." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={`experience.${index}.title`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Software Engineer Intern" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={control}
                  name={`experience.${index}.startDate`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Date</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Jun 2023" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={`experience.${index}.endDate`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>End Date</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Aug 2023" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="md:col-span-2">
                  <FormField
                    control={control}
                    name={`experience.${index}.description`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center justify-between">
                          Description
                          <Button type="button" variant="outline" size="sm" onClick={() => openGenerator(index)}>
                            <Sparkles className="mr-2 h-4 w-4 text-accent" />
                            Generate with AI
                          </Button>
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe your responsibilities and achievements..."
                            {...field}
                            rows={5}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
       {activeExperienceIndex !== null && (
        <AIDescriptionGenerator
          open={isGeneratorOpen}
          onOpenChange={setIsGeneratorOpen}
          onDescriptionGenerated={onDescriptionGenerated}
          type="experience"
          context={{
            jobTitle: getValues(`experience.${activeExperienceIndex}.title`),
            companyName: getValues(`experience.${activeExperienceIndex}.company`),
          }}
        />
      )}
    </>
  );
}
