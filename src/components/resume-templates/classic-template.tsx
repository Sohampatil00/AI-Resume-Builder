import type { ResumeData } from '@/lib/types';

export const ClassicTemplate = ({ data }: { data: ResumeData }) => {
  const { personalInfo, education, experience, projects, skills } = data;

  return (
    <div className="bg-white text-black p-8 font-serif" style={{ width: '210mm', minHeight: '297mm' }}>
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold">{personalInfo.name}</h1>
        <p className="text-sm">
          {personalInfo.phone} | <a href={`mailto:${personalInfo.email}`} className="underline">{personalInfo.email}</a> | <a href={personalInfo.linkedin} className="underline">LinkedIn</a> | <a href={personalInfo.github} className="underline">GitHub</a>
          {personalInfo.website && <> | <a href={personalInfo.website} className="underline">Website</a></>}
        </p>
      </div>

      {education.length > 0 && (
        <div className="mb-4">
          <h2 className="text-xl font-bold border-b border-black pb-1">Education</h2>
          <ul className="mt-2 text-sm">
            {education.map(edu => (
              <li key={edu.id} className="mb-2">
                <div className="flex justify-between">
                  <span className="font-bold">{edu.school}</span>
                  <span>{edu.startDate} - {edu.endDate}</span>
                </div>
                <div className="flex justify-between">
                  <span>{edu.degree} in {edu.major}</span>
                  <span>GPA: {edu.gpa}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {experience.length > 0 && (
        <div className="mb-4">
          <h2 className="text-xl font-bold border-b border-black pb-1">Experience</h2>
          <ul className="mt-2 text-sm">
            {experience.map(exp => (
              <li key={exp.id} className="mb-2">
                <div className="flex justify-between">
                  <div><span className="font-bold">{exp.title}</span>, <em>{exp.company}</em></div>
                  <span>{exp.startDate} - {exp.endDate}</span>
                </div>
                <ul className="list-disc list-inside mt-1">
                  {exp.description.split('\n').map((line, i) => line.trim() && <li key={i}>{line.trim().replace(/•/g, '')}</li>)}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {projects.length > 0 && (
        <div className="mb-4">
          <h2 className="text-xl font-bold border-b border-black pb-1">Projects</h2>
          <ul className="mt-2 text-sm">
            {projects.map(proj => (
              <li key={proj.id} className="mb-2">
                <p className="font-bold">{proj.name}</p>
                {proj.technologies && <p className="italic text-xs">Technologies: {proj.technologies}</p>}
                <ul className="list-disc list-inside mt-1">
                  {proj.description.split('\n').map((line, i) => line.trim() && <li key={i}>{line.trim().replace(/•/g, '')}</li>)}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      )}

      {(skills.languages || skills.frameworks || skills.tools) && (
        <div>
          <h2 className="text-xl font-bold border-b border-black pb-1">Skills</h2>
          <ul className="mt-2 text-sm list-disc list-inside">
            {skills.languages && <li><span className="font-bold">Languages:</span> {skills.languages}</li>}
            {skills.frameworks && <li><span className="font-bold">Frameworks:</span> {skills.frameworks}</li>}
            {skills.tools && <li><span className="font-bold">Tools:</span> {skills.tools}</li>}
          </ul>
        </div>
      )}
    </div>
  );
};
