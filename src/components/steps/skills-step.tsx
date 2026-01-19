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
import { Button } from '../ui/button';
import { Info } from 'lucide-react';

export function SkillsStep() {
  const { control, setValue } = useFormContext();

  const fillDummyData = () => {
    setValue('skills.languages', 'Python, PHP, C++, JavaScript, SQL, Bash, JAVA');
    setValue('skills.frameworks', 'Scikit, NLTK, SpaCy, TensorFlow, Keras, Django, Flask, NodeJS, LAMP');
    setValue('skills.tools', 'Kubernetes, Docker, GIT, PostgreSQL, MySQL, SQLite');
  }

  return (
    <div className="space-y-6">
       <div className="flex items-center justify-between">
         <h2 className="text-2xl font-headline font-semibold text-primary">
          Skills
        </h2>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={fillDummyData}
        >
          <Info className="mr-2 h-4 w-4" />
          Fill with Dummy Data
        </Button>
      </div>
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
