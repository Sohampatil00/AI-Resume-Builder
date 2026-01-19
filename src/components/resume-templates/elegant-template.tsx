import type { ResumeData } from '@/lib/types';
import { Mail, Phone, Linkedin, Github, Globe } from 'lucide-react';

export const ElegantTemplate = ({ data }: { data: ResumeData }) => {
  const { personalInfo, education, experience, projects, skills, publications, honors, volunteerExperience } = data;

  const getUrlDomain = (url: string) => {
    try {
      const fullUrl = url.startsWith('http') ? url : `https://${url}`;
      let domain = new URL(fullUrl).hostname.replace('www.', '');
      if (domain.includes('linkedin.com')) {
          return personalInfo.linkedin.split('/').filter(Boolean).pop();
      }
      if (domain.includes('github.com')) {
        return personalInfo.github.split('/').filter(Boolean).pop();
      }
      return domain;
    } catch (e) {
      return url;
    }
  }


  return (
    <div data-html2canvas-target className="bg-white text-gray-800 p-8 font-serif text-sm" style={{ width: '210mm', minHeight: '297mm' }}>
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold uppercase text-slate-800 tracking-wider">{personalInfo.name}</h1>
        <div className="flex justify-center items-center flex-wrap space-x-3 text-xs mt-2 text-slate-600">
          {personalInfo.phone && <span className='flex items-center gap-1'><Phone size={12} /> {personalInfo.phone}</span>}
          {personalInfo.email && <a href={`mailto:${personalInfo.email}`} className="underline flex items-center gap-1"><Mail size={12} /> {personalInfo.email}</a>}
          {personalInfo.linkedin && <a href={personalInfo.linkedin} className="underline flex items-center gap-1"><Linkedin size={12} /> {getUrlDomain(personalInfo.linkedin)}</a>}
          {personalInfo.github && <a href={personalInfo.github} className="underline flex items-center gap-1"><Github size={12} /> {getUrlDomain(personalInfo.github)}</a>}
          {personalInfo.website && <a href={personalInfo.website} className="underline flex items-center gap-1"><Globe size={12} /> {getUrlDomain(personalInfo.website)}</a>}
        </div>
      </div>

      {education.length > 0 && (
        <div className="mb-4">
          <h2 className="text-lg font-semibold uppercase border-b border-slate-400 pb-1 mb-2 text-slate-800">Education</h2>
          {education.map((edu) => (
            <div key={edu.id} className="mb-2 text-sm">
              <div className="flex justify-between">
                <span className="font-bold">{edu.school}</span>
                <span className="font-light">{edu.startMonth} {edu.startYear} - {edu.endMonth === 'Present' ? 'Present' : `${edu.endMonth} ${edu.endYear}`}</span>
              </div>
              <div className="flex justify-between font-light">
                <span>{edu.degree}, {edu.major}</span>
                <span>CGPA: {edu.cgpa}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {experience.length > 0 && (
        <div className="mb-4">
          <h2 className="text-lg font-semibold uppercase border-b border-slate-400 pb-1 mb-2 text-slate-800">Experience</h2>
          {experience.map((exp) => (
            <div key={exp.id} className="mb-3 text-sm">
                <div className="flex justify-between">
                    <span className="font-bold">{exp.title}</span>
                    <span className="font-light">{exp.startDate} - {exp.endDate}</span>
                </div>
                <div className="flex justify-between mb-1">
                    <span className='italic'>{exp.company}</span>
                </div>
                <ul className="list-disc list-inside font-light space-y-1 pl-2">
                    {exp.description.split('\n').map((line, i) => line.trim() && <li key={i}>{line.trim().replace(/^•\s*/, '')}</li>)}
                </ul>
            </div>
          ))}
        </div>
      )}

      {projects.length > 0 && (
        <div className="mb-4">
          <h2 className="text-lg font-semibold uppercase border-b border-slate-400 pb-1 mb-2 text-slate-800">Projects</h2>
          {projects.map((proj) => (
            <div key={proj.id} className="mb-3 text-sm">
              <p className="font-bold">{proj.name}</p>
              {proj.technologies && <p className="italic text-xs mb-1">Technologies: {proj.technologies}</p>}
              <ul className="list-disc list-inside font-light space-y-1 pl-2">
                 {proj.description.split('\n').map((line, i) => line.trim() && <li key={i}>{line.trim().replace(/^•\s*/, '')}</li>)}
              </ul>
            </div>
          ))}
        </div>
      )}

      { (skills.languages || skills.frameworks || skills.tools) && (
        <div className="mb-4">
          <h2 className="text-lg font-semibold uppercase border-b border-slate-400 pb-1 mb-2 text-slate-800">Skills</h2>
          <div className="text-sm font-light space-y-1">
            {skills.languages && <p><span className="font-semibold">Languages: </span>{skills.languages}</p>}
            {skills.frameworks && <p><span className="font-semibold">Frameworks & Libraries: </span>{skills.frameworks}</p>}
            {skills.tools && <p><span className="font-semibold">Tools & Technologies: </span>{skills.tools}</p>}
          </div>
        </div>
      )}

      {publications.length > 0 && (
        <div className="mb-4">
          <h2 className="text-lg font-semibold uppercase border-b border-slate-400 pb-1 mb-2 text-slate-800">Publications</h2>
          {publications.map((pub) => (
            <div key={pub.id} className="mb-3 text-sm">
              <p className="font-bold">{pub.title}</p>
              <p className="italic text-xs mb-1">{pub.publisher} - {pub.date}</p>
              <p className="font-light">{pub.description}</p>
            </div>
          ))}
        </div>
      )}

      {honors.length > 0 && (
        <div className="mb-4">
          <h2 className="text-lg font-semibold uppercase border-b border-slate-400 pb-1 mb-2 text-slate-800">Honors & Awards</h2>
          <ul className="list-disc list-inside font-light space-y-1 pl-2">
            {honors.map((honor) => (
              <li key={honor.id}>
                {honor.title} ({honor.issuer}, {honor.date})
              </li>
            ))}
          </ul>
        </div>
      )}

      {volunteerExperience.length > 0 && (
        <div className="mb-4">
          <h2 className="text-lg font-semibold uppercase border-b border-slate-400 pb-1 mb-2 text-slate-800">Volunteer Experience</h2>
          {volunteerExperience.map((vol) => (
            <div key={vol.id} className="mb-3 text-sm">
                <div className="flex justify-between">
                    <span className="font-bold">{vol.role}</span>
                    <span className="font-light">{vol.startDate} - {vol.endDate}</span>
                </div>
                <div className="flex justify-between mb-1">
                    <span className='italic'>{vol.organization}</span>
                </div>
                <ul className="list-disc list-inside font-light space-y-1 pl-2">
                    {vol.description.split('\n').map((line, i) => line.trim() && <li key={i}>{line.trim().replace(/^•\s*/, '')}</li>)}
                </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
