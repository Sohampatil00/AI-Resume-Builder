'use client';

import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import Image from 'next/image';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { FileDown, Loader2 } from 'lucide-react';
import { templates } from '@/lib/templates';
import { generateResume } from '@/lib/resume-generator';
import { downloadFile } from '@/lib/download';
import type { ResumeData } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useToast } from '@/hooks/use-toast';
import { resumeSchema } from '../resume-builder';

export function FinalizeStep() {
  const { getValues } = useFormContext();
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0].id);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleDownload = async () => {
    setIsGenerating(true);
    const data = getValues();
    
    const validationResult = resumeSchema.safeParse(data);

    if (!validationResult.success) {
      toast({
        variant: 'destructive',
        title: 'Validation Error',
        description: 'Please go back and fill all required fields correctly.',
      });
      setIsGenerating(false);
      return;
    }

    const template = templates.find((t) => t.id === selectedTemplate);

    if (template) {
      const latexCode = generateResume(
        data as ResumeData,
        template.id as 'modern' | 'classic',
        template.template
      );
      downloadFile(latexCode, 'resume.tex', 'application/x-tex');
    }
    setIsGenerating(false);
  };
  
  const currentTemplateImage = PlaceHolderImages.find(img => img.id.includes(selectedTemplate));

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-headline font-semibold text-primary">
        Choose Your Template & Download
      </h2>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="template-select">Resume Template</Label>
            <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
              <SelectTrigger id="template-select" className="w-full">
                <SelectValue placeholder="Select a template" />
              </SelectTrigger>
              <SelectContent>
                {templates.map((template) => (
                  <SelectItem key={template.id} value={template.id}>
                    {template.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button onClick={handleDownload} disabled={isGenerating} className="w-full">
            {isGenerating ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <FileDown className="mr-2 h-4 w-4" />
            )}
            Download .tex File
          </Button>
        </div>
        <div className="flex items-center justify-center rounded-lg border bg-secondary/50 p-4">
            {currentTemplateImage && (
                <Image
                    src={currentTemplateImage.imageUrl}
                    alt={currentTemplateImage.description}
                    width={400}
                    height={566}
                    data-ai-hint={currentTemplateImage.imageHint}
                    className="rounded-md shadow-lg"
                />
            )}
        </div>
      </div>
    </div>
  );
}
