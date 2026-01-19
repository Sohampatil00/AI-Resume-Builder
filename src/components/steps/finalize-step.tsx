'use client';

import { useState, useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

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
import { useToast } from '@/hooks/use-toast';
import { resumeSchema } from '../resume-builder';
import { ModernTemplate } from '../resume-templates/modern-template';
import { ElegantTemplate } from '../resume-templates/elegant-template';
import { ClassicTemplate } from '../resume-templates/classic-template';

export function FinalizeStep() {
  const { getValues } = useFormContext();
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0].id);
  const [isGeneratingTex, setIsGeneratingTex] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const { toast } = useToast();
  const resumePreviewRef = useRef<HTMLDivElement>(null);


  const validateData = () => {
    const data = getValues();
    const validationResult = resumeSchema.safeParse(data);

    if (!validationResult.success) {
      toast({
        variant: 'destructive',
        title: 'Validation Error',
        description: 'Please go back and fill all required fields correctly.',
      });
      return null;
    }
    return validationResult.data as ResumeData;
  }

  const handleTexDownload = async () => {
    setIsGeneratingTex(true);
    const data = validateData();
    if (!data) {
        setIsGeneratingTex(false);
        return;
    }

    const template = templates.find((t) => t.id === selectedTemplate);

    if (template) {
      const latexCode = generateResume(
        data,
        template.id as 'modern' | 'elegant' | 'classic',
        template.template
      );
      downloadFile(latexCode, 'resume.tex', 'application/x-tex');
    }
    setIsGeneratingTex(false);
  };
  
  const handlePdfDownload = async () => {
    const data = validateData();
    if (!data || !resumePreviewRef.current) {
        return;
    }

    setIsGeneratingPdf(true);
    try {
        const previewElement = resumePreviewRef.current.querySelector(
            '[data-html2canvas-target]'
        ) as HTMLElement;

        if (!previewElement) {
            throw new Error("Could not find preview element to render.");
        }

        const canvas = await html2canvas(previewElement, {
            scale: 3,
            useCORS: true,
            letterRendering: true,
        });
        
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4',
        });
        
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('resume.pdf');

    } catch (error) {
        console.error("PDF generation error:", error);
        toast({
            variant: 'destructive',
            title: 'PDF Generation Failed',
            description: 'An error occurred while generating the PDF.',
        });
    } finally {
        setIsGeneratingPdf(false);
    }
  };

  const resumeData = getValues();
  
  const templatesMap = {
    classic: ClassicTemplate,
    modern: ModernTemplate,
    elegant: ElegantTemplate,
  };

  const SelectedTemplateComponent = templatesMap[selectedTemplate as keyof typeof templatesMap] || ClassicTemplate;


  return (
    <>
      <div className="space-y-6">
        <h2 className="text-2xl font-headline font-semibold text-primary">
          Choose Your Template & Download
        </h2>
        <div className="grid grid-cols-1 gap-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="w-full space-y-2 sm:w-auto">
              <Label htmlFor="template-select">Resume Template</Label>
              <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                <SelectTrigger id="template-select" className="w-full sm:w-[200px]">
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
            <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
              <Button onClick={handlePdfDownload} disabled={isGeneratingPdf} className="w-full">
                {isGeneratingPdf ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <FileDown className="mr-2 h-4 w-4" />
                )}
                Download .pdf File
              </Button>
              <Button onClick={handleTexDownload} disabled={isGeneratingTex} className="w-full">
                {isGeneratingTex ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <FileDown className="mr-2 h-4 w-4" />
                )}
                Download .tex File
              </Button>
            </div>
          </div>
          <div className="rounded-lg border bg-secondary/50 p-4 sm:p-8 overflow-x-auto">
            <div className="flex justify-center">
              <div
                ref={resumePreviewRef}
                className="transform origin-top scale-[0.8] bg-white shadow-lg"
              >
                <SelectedTemplateComponent data={resumeData as ResumeData} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
