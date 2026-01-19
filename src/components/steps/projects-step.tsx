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
import { PlusCircle, Trash2, Sparkles } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { AIDescriptionGenerator } from '../ai-description-generator';

export function ProjectsStep() {
  const { control, setValue, getValues } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'projects',
  });
  const [isGeneratorOpen, setIsGeneratorOpen] = useState(false);
  const [activeProjectIndex, setActiveProjectIndex] = useState<number | null>(null);

  const openGenerator = (index: number) => {
    setActiveProjectIndex(index);
    setIsGeneratorOpen(true);
  };

  const onDescriptionGenerated = (description: string) => {
    if (activeProjectIndex !== null) {
      setValue(`projects.${activeProjectIndex}.description`, description, {
        shouldValidate: true,
      });
    }
  };

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-headline font-semibold text-primary">
            Projects
          </h2>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() =>
                append({
                  id: crypto.randomUUID(),
                  name: '',
                  description: '',
                  technologies: '',
                })
              }
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Project
            </Button>
          </div>
        </div>

        <div className="space-y-8">
          {fields.map((field, index) => (
            <div key={field.id} className="space-y-4 rounded-md border p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Project #{index + 1}</h3>
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
              <div className="grid grid-cols-1 gap-6">
                <FormField
                  control={control}
                  name={`projects.${index}.name`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Resume Builder AI" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={`projects.${index}.technologies`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Technologies Used</FormLabel>
                      <FormControl>
                        <Input placeholder="Next.js, TypeScript, Tailwind CSS, Genkit" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div>
                  <FormField
                    control={control}
                    name={`projects.${index}.description`}
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
                            placeholder="Describe your project, its purpose, and your role."
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
      {activeProjectIndex !== null && (
        <AIDescriptionGenerator
          open={isGeneratorOpen}
          onOpenChange={setIsGeneratorOpen}
          onDescriptionGenerated={onDescriptionGenerated}
          type="project"
          context={{
            projectName: getValues(`projects.${activeProjectIndex}.name`),
            technologies: getValues(`projects.${activeProjectIndex}.technologies`),
          }}
        />
      )}
    </>
  );
}
