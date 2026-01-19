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
import { Button } from '@/components/ui/button';
import { Info } from 'lucide-react';

export function PersonalInfoStep() {
  const { control, setValue } = useFormContext();

  const fillDummyData = () => {
    setValue('personalInfo.name', 'Ramesh Patel');
    setValue('personalInfo.email', 'ramesh.patel@example.com');
    setValue('personalInfo.phone', '+91 12345 67890');
    setValue('personalInfo.linkedin', 'https://linkedin.com/in/rameshpatel');
    setValue('personalInfo.github', 'https://github.com/rameshpatel');
    setValue('personalInfo.website', 'https://rameshpatel.com');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-headline font-semibold text-primary">
          Personal Information
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
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <FormField
          control={control}
          name="personalInfo.name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Ramesh Patel" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="personalInfo.email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="ramesh.patel@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="personalInfo.phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="+91 12345 67890" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="personalInfo.linkedin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>LinkedIn Profile URL</FormLabel>
              <FormControl>
                <Input placeholder="https://linkedin.com/in/rameshpatel" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="personalInfo.github"
          render={({ field }) => (
            <FormItem>
              <FormLabel>GitHub Profile URL</FormLabel>
              <FormControl>
                <Input placeholder="https://github.com/rameshpatel" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="personalInfo.website"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Personal Website URL</FormLabel>
              <FormControl>
                <Input placeholder="https://rameshpatel.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
