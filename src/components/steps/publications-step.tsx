'use client';

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
import { PlusCircle, Trash2, Info } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export function PublicationsStep() {
  const { control } = useFormContext();
  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: 'publications',
  });

  const fillDummyData = () => {
    replace([
      {
        id: crypto.randomUUID(),
        title: 'Deep Learning on Web',
        publisher: 'Packt Publishing',
        date: 'Nov 2018',
        description: 'Work in Progress book to be published by Packt Publishing in late 2019. Tech: Django, Python, AWS, GCP, Azure'
      },
      {
        id: crypto.randomUUID(),
        title: 'Deep Learning on Mobile Devices',
        publisher: 'Packt Publishing',
        date: 'Dec 2018',
        description: 'Work in Progress book to be published by Packt Publishing in late 2019. Tech: Flutter, Android, Firebase, TensorFlow, Python, Dart'
      }
    ]);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-headline font-semibold text-primary">
          Publications
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
                title: '',
                publisher: '',
                date: '',
                description: '',
              })
            }
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Publication
          </Button>
        </div>
      </div>

      <div className="space-y-8">
        {fields.map((field, index) => (
          <div key={field.id} className="space-y-4 rounded-md border p-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Publication #{index + 1}</h3>
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
                name={`publications.${index}.title`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., The Future of AI" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={control}
                name={`publications.${index}.publisher`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Publisher / Journal</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Nature" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={control}
                name={`publications.${index}.date`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Jan 2024" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="md:col-span-2">
                <FormField
                  control={control}
                  name={`publications.${index}.description`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description / Abstract</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="A brief summary of the publication."
                          {...field}
                          rows={3}
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
  );
}
