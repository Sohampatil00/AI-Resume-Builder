import type { ResumeData } from '@/lib/types';

export const ClassicTemplate = ({ data }: { data: ResumeData }) => {
  const { personalInfo, education, experience, projects, skills, publications, honors, volunteerExperience } = data;

  const getUsername = (url: string | undefined) => {
    if (!url) return '';
    try {
        const pathname = new URL(url).pathname;
        return pathname.split('/').filter(Boolean).pop() || '';
    } catch {
        return url.split('/').pop() || '';
    }
  }

  return (
    <div data-html2canvas-target className="bg-white text-black p-8 font-serif text-sm leading-relaxed" style={{ width: '210mm', minHeight: '297mm' }}>
      {/* Header */}
      <div className="grid grid-cols-2 text-sm mb-2">
        <div className='font-bold text-2xl col-span-1'>{personalInfo.name}</div>
        <div className='text-right col-span-1'>Email: <a href={`mailto:${personalInfo.email}`} className="underline">{personalInfo.email}</a></div>
        <div className='col-span-1'>{personalInfo.website && <><a href={personalInfo.website} className="underline">Website: {personalInfo.website.replace(/https?:\/\//, '')}</a></>}</div>
        <div className='text-right col-span-1'>{personalInfo.phone && <>Mobile: {personalInfo.phone}</>}</div>
        <div className='col-span-1'>{personalInfo.github && <><a href={personalInfo.github} className="underline">Github: github.com/{getUsername(personalInfo.github)}</a></>}</div>
        <div className='text-right col-span-1'>{personalInfo.linkedin && <><a href={personalInfo.linkedin} className="underline">LinkedIn: {personalInfo.linkedin.replace(/https?:\/\/(www.)?/, '')}</a></>}</div>
      </div>

      {/* Education */}
      {education.length > 0 && (
        <div className="mb-2 mt-4">
          <h2 className="text-lg font-normal tracking-wide uppercase border-b border-black pb-1 mb-2">Education</h2>
          <ul className='list-none pl-4'>
            {education.map(edu => (
              <li key={edu.id} className="mb-2 text-sm">
                <div className="grid grid-cols-2">
                    <div className='font-bold'>{edu.school}</div>
                    <div className='text-right'>{edu.startMonth} {edu.startYear} - {edu.endMonth === 'Present' ? 'Present' : `${edu.endMonth} ${edu.endYear}`}</div>
                </div>
                 <div className="grid grid-cols-2">
                    <div className='italic'>{edu.degree} in {edu.major}</div>
                    <div className='italic text-right'>CGPA: {edu.cgpa}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {/* Skills */}
      {(skills.languages || skills.frameworks || skills.tools) && (
        <div className="mb-2">
          <h2 className="text-lg font-normal tracking-wide uppercase border-b border-black pb-1 mb-2">Skills Summary</h2>
          <ul className="list-disc pl-8 text-sm">
            {skills.languages && <li><span className="font-bold">Languages:</span> {skills.languages}</li>}
            {skills.frameworks && <li><span className="font-bold">Frameworks:</span> {skills.frameworks}</li>}
            {skills.tools && <li><span className="font-bold">Tools:</span> {skills.tools}</li>}
          </ul>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div className="mb-2">
          <h2 className="text-lg font-normal tracking-wide uppercase border-b border-black pb-1 mb-2">Experience</h2>
          <ul className='list-none pl-4'>
            {experience.map(exp => (
              <li key={exp.id} className="mb-2 text-sm">
                 <div className="grid grid-cols-2">
                    <div className='font-bold'>{exp.company}</div>
                    <div className='text-right'>{exp.startDate} - {exp.endDate}</div>
                </div>
                 <div className="grid grid-cols-2">
                    <div className='italic'>{exp.title}</div>
                </div>
                <ul className="list-disc list-inside mt-1">
                  {exp.description.split('\n').map((line, i) => line.trim() && <li key={i}>{line.trim().replace(/•/g, '')}</li>)}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {/* Projects */}
      {projects.length > 0 && (
        <div className="mb-2">
          <h2 className="text-lg font-normal tracking-wide uppercase border-b border-black pb-1 mb-2">Projects</h2>
          <ul className='list-disc pl-8 text-sm'>
            {projects.map(proj => (
              <li key={proj.id} className="mb-1">
                <span className="font-bold">{proj.name}{proj.technologies && ` (${proj.technologies})`}:</span> {proj.description}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Publications */}
      {publications.length > 0 && (
        <div className="mb-2">
          <h2 className="text-lg font-normal tracking-wide uppercase border-b border-black pb-1 mb-2">Publications</h2>
          <ul className='list-disc pl-8 text-sm'>
            {publications.map(pub => (
              <li key={pub.id} className="mb-1">
                <span className="font-bold">{pub.title}</span> ({pub.publisher}, {pub.date}): {pub.description}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Honors & Awards */}
      {honors.length > 0 && (
        <div className="mb-2">
          <h2 className="text-lg font-normal tracking-wide uppercase border-b border-black pb-1 mb-2">Honors & Awards</h2>
          <ul className='list-disc pl-8 text-sm'>
            {honors.map(honor => (
              <li key={honor.id} className="mb-1">
                {honor.title} ({honor.issuer}, {honor.date})
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Volunteer Experience */}
      {volunteerExperience.length > 0 && (
        <div className="mb-2">
          <h2 className="text-lg font-normal tracking-wide uppercase border-b border-black pb-1 mb-2">Volunteer Experience</h2>
          <ul className='list-none pl-4'>
            {volunteerExperience.map(vol => (
              <li key={vol.id} className="mb-2 text-sm">
                <div className="grid grid-cols-2">
                    <div className='font-bold'>{vol.organization}</div>
                    <div className='text-right'>{vol.startDate} - {vol.endDate}</div>
                </div>
                <div className="grid grid-cols-2">
                    <div className='italic'>{vol.role}</div>
                </div>
                <ul className="list-disc list-inside mt-1">
                  {vol.description.split('\n').map((line, i) => line.trim() && <li key={i}>{line.trim().replace(/•/g, '')}</li>)}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
