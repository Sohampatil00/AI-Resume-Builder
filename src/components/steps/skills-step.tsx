'use client';

import { useFormContext } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

export function SkillsStep() {
  const { control } = useFormContext();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-headline font-semibold text-primary">
        Skills
      </h2>
      <div className="space-y-4">
        <FormField
          control={control}
          name="skills.languages"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Programming Languages</FormLabel>
              <FormControl>
                <Input placeholder="JavaScript, Python, Java, C++" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="skills.frameworks"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Frameworks & Libraries</FormLabel>
              <FormControl>
                <Input placeholder="React, Node.js, Next.js, TensorFlow" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="skills.tools"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tools & Technologies</FormLabel>
              <FormControl>
                <Input placeholder="Git, Docker, AWS, Firebase, MongoDB" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
