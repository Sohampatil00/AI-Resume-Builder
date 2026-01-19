import type { ResumeData } from '@/lib/types';

export const ModernTemplate = ({ data }: { data: ResumeData }) => {
  const { personalInfo, education, experience, projects, skills } = data;

  return (
    <div className="bg-white text-black p-8 font-sans text-sm" style={{ width: '210mm', minHeight: '297mm' }}>
      <div className="text-center mb-4">
        <h1 className="text-4xl font-bold tracking-wider uppercase">{personalInfo.name}</h1>
        <div className="flex justify-center items-center space-x-2 text-xs mt-2">
          <span>{personalInfo.phone}</span>
          <span className="text-gray-400">|</span>
          <a href={`mailto:${personalInfo.email}`} className="underline">{personalInfo.email}</a>
          {personalInfo.linkedin && (
            <>
              <span className="text-gray-400">|</span>
              <a href={personalInfo.linkedin} className="underline">{personalInfo.linkedin}</a>
            </>
          )}
          {personalInfo.github && (
            <>
              <span className="text-gray-400">|</span>
              <a href={personalInfo.github} className="underline">{personalInfo.github}</a>
            </>
          )}
          {personalInfo.website && (
            <>
              <span className="text-gray-400">|</span>
              <a href={personalInfo.website} className="underline">{personalInfo.website}</a>
            </>
          )}
        </div>
      </div>

      {education.length > 0 && (
        <div className="mb-4">
          <h2 className="text-lg font-bold uppercase border-b-2 border-black pb-1 mb-2">Education</h2>
          {education.map((edu) => (
            <div key={edu.id} className="mb-2">
              <div className="flex justify-between">
                <span className="font-bold">{edu.school}</span>
                <span className="text-xs">{edu.startMonth} {edu.startYear} - {edu.endMonth === 'Present' ? 'Present' : `${edu.endMonth} ${edu.endYear}`}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>{edu.degree}, {edu.major}</span>
                <span>CGPA: {edu.cgpa}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {experience.length > 0 && (
        <div className="mb-4">
          <h2 className="text-lg font-bold uppercase border-b-2 border-black pb-1 mb-2">Experience</h2>
          {experience.map((exp) => (
            <div key={exp.id} className="mb-2">
                <div className="flex justify-between">
                    <span className="font-bold">{exp.title}</span>
                    <span className="text-xs">{exp.startDate} - {exp.endDate}</span>
                </div>
                <div className="flex justify-between text-xs mb-1">
                    <span>{exp.company}</span>
                </div>
                <ul className="list-disc list-inside text-xs">
                    {exp.description.split('\n').map((line, i) => line.trim() && <li key={i}>{line.trim().replace(/•/g, '')}</li>)}
                </ul>
            </div>
          ))}
        </div>
      )}

      {projects.length > 0 && (
        <div className="mb-4">
          <h2 className="text-lg font-bold uppercase border-b-2 border-black pb-1 mb-2">Projects</h2>
          {projects.map((proj) => (
            <div key={proj.id} className="mb-2">
              <div className="flex justify-between">
                <p className="font-bold">{proj.name}</p>
                {proj.technologies && <p className="text-xs">{proj.technologies}</p>}
              </div>
              <ul className="list-disc list-inside text-xs">
                 {proj.description.split('\n').map((line, i) => line.trim() && <li key={i}>{line.trim().replace(/•/g, '')}</li>)}
              </ul>
            </div>
          ))}
        </div>
      )}

      { (skills.languages || skills.frameworks || skills.tools) && (
        <div>
          <h2 className="text-lg font-bold uppercase border-b-2 border-black pb-1 mb-2">Skills</h2>
          <div className="text-xs">
            {skills.languages && <p><span className="font-bold">Languages: </span>{skills.languages}</p>}
            {skills.frameworks && <p><span className="font-bold">Frameworks: </span>{skills.frameworks}</p>}
            {skills.tools && <p><span className="font-bold">Tools: </span>{skills.tools}</p>}
          </div>
        </div>
      )}
    </div>
  );
};
