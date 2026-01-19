import { ResumeBuilder } from '@/components/resume-builder';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-4 sm:p-8 md:p-12">
      <ResumeBuilder />
    </main>
  );
}
