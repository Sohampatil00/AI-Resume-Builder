'use server';

import {
  generateJobDescription,
  GenerateJobDescriptionInput,
} from '@/ai/flows/generate-job-description';
import {
  generateProjectDescription,
  GenerateProjectDescriptionInput,
} from '@/ai/flows/generate-project-description';
import { z } from 'zod';

const JobDescriptionSchema = z.object({
  jobTitle: z.string(),
  companyName: z.string(),
  responsibilities: z.string(),
  requiredSkills: z.string(),
});

export async function generateExperienceDescriptionAction(
  input: GenerateJobDescriptionInput
) {
  try {
    const validatedInput = JobDescriptionSchema.parse(input);
    const result = await generateJobDescription(validatedInput);
    return { success: true, description: result.jobDescription };
  } catch (error) {
    console.error(error);
    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred.';
    return { success: false, error: 'Failed to generate description.', details: errorMessage };
  }
}

const ProjectDescriptionSchema = z.object({
  prompt: z.string(),
});

export async function generateProjectDescriptionAction(
  input: GenerateProjectDescriptionInput
) {
  try {
    const validatedInput = ProjectDescriptionSchema.parse(input);
    const result = await generateProjectDescription(validatedInput);
    return { success: true, description: result.description };
  } catch (error) {
    console.error(error);
    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred.';
    return { success: false, error: 'Failed to generate description.', details: errorMessage };
  }
}
