'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Sparkles } from 'lucide-react';
import {
  generateExperienceDescriptionAction,
  generateProjectDescriptionAction,
} from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from './ui/skeleton';

type GeneratorProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDescriptionGenerated: (description: string) => void;
  type: 'experience' | 'project';
  context?: {
    jobTitle?: string;
    companyName?: string;
    projectName?: string;
    technologies?: string;
  };
};

export function AIDescriptionGenerator({
  open,
  onOpenChange,
  onDescriptionGenerated,
  type,
  context = {},
}: GeneratorProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [generatedDesc, setGeneratedDesc] = useState('');
  const [responsibilities, setResponsibilities] = useState('');
  const [skills, setSkills] = useState('');
  const [prompt, setPrompt] = useState('');
  const { toast } = useToast();

  const handleGenerate = async () => {
    setIsLoading(true);
    setGeneratedDesc('');
    let result;
    if (type === 'experience') {
      result = await generateExperienceDescriptionAction({
        jobTitle: context.jobTitle || '',
        companyName: context.companyName || '',
        responsibilities,
        requiredSkills: skills,
      });
    } else {
      const projectPrompt = prompt || `A project named ${context.projectName} using technologies like ${context.technologies}.`;
      result = await generateProjectDescriptionAction({ prompt: projectPrompt });
    }

    if (result.success && result.description) {
      setGeneratedDesc(result.description);
    } else {
      toast({
        variant: 'destructive',
        title: 'Generation Failed',
        description: result.error,
      });
    }
    setIsLoading(false);
  };

  const handleUseDescription = () => {
    onDescriptionGenerated(generatedDesc);
    onOpenChange(false);
    setGeneratedDesc('');
    setResponsibilities('');
    setSkills('');
    setPrompt('');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-headline">
            <Sparkles className="text-accent" />
            Generate Description with AI
          </DialogTitle>
          <DialogDescription>
            {type === 'experience'
              ? 'Provide some details about the role and let AI write a compelling description.'
              : 'Provide a prompt for your project and let AI do the rest.'}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {type === 'experience' ? (
            <>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="job-title" className="text-right">
                  Job Title
                </Label>
                <Input id="job-title" value={context.jobTitle} disabled className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="company" className="text-right">
                  Company
                </Label>
                <Input id="company" value={context.companyName} disabled className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="responsibilities" className="text-right pt-2">
                  Responsibilities
                </Label>
                <Textarea
                  id="responsibilities"
                  placeholder="e.g., Developed new features, managed a team of 5, optimized database queries"
                  value={responsibilities}
                  onChange={(e) => setResponsibilities(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="skills" className="text-right pt-2">
                  Skills Used
                </Label>
                <Textarea
                  id="skills"
                  placeholder="e.g., React, Node.js, Python, SQL"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  className="col-span-3"
                />
              </div>
            </>
          ) : (
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="prompt" className="text-right pt-2">
                Prompt
              </Label>
              <Textarea
                id="prompt"
                placeholder={`e.g., Describe a full-stack web application for task management built with the MERN stack.`}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="col-span-3"
              />
            </div>
          )}
        </div>
        <div className="space-y-2">
            <Button onClick={handleGenerate} disabled={isLoading} className="w-full">
              <Sparkles className="mr-2 h-4 w-4" />
              {isLoading ? 'Generating...' : 'Generate'}
            </Button>
        </div>
        {(isLoading || generatedDesc) && (
            <div className="space-y-4 rounded-md border bg-secondary/50 p-4">
                 <h4 className="font-semibold">Generated Description:</h4>
                {isLoading ? (
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                    </div>
                ) : (
                    <p className="text-sm text-muted-foreground">{generatedDesc}</p>
                )}
            </div>
        )}
        <DialogFooter>
          <Button
            onClick={handleUseDescription}
            disabled={!generatedDesc || isLoading}
          >
            Use This Description
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
