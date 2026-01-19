import type { ResumeData } from '@/lib/types';

const escapeLatex = (str: string | undefined): string => {
  if (!str) return '';
  return str
    .replace(/\\/g, '\\textbackslash{}')
    .replace(/&/g, '\\&')
    .replace(/%/g, '\\%')
    .replace(/\$/g, '\\$')
    .replace(/#/g, '\\#')
    .replace(/_/g, '\\_')
    .replace(/{/g, '\\{')
    .replace(/}/g, '\\}')
    .replace(/~/g, '\\textasciitilde{}')
    .replace(/\^/g, '\\textasciicircum{}');
};

const getUrlUsername = (url: string | undefined) => {
    if (!url) return '';
    try {
        const path = new URL(url).pathname;
        return path.substring(1).split('/')[0];
    } catch {
        return url;
    }
}

const getDomain = (url: string | undefined): string => {
  if (!url) return '';
  try {
    const fullUrl = url.startsWith('http') ? url : `https://${url}`;
    return new URL(fullUrl).hostname.replace('www.', '');
  } catch {
    return url;
  }
};


const generateModernTemplate = (data: ResumeData, template: string): string => {
  let generated = template;

  generated = generated.replace('%%NAME%%', escapeLatex(data.personalInfo.name));
  generated = generated.replace('%%EMAIL%%', escapeLatex(data.personalInfo.email));
  generated = generated.replace('%%PHONE%%', escapeLatex(data.personalInfo.phone));
  generated = generated.replace(/%%LINKEDIN%%/g, escapeLatex(data.personalInfo.linkedin));
  generated = generated.replace(/%%GITHUB%%/g, escapeLatex(data.personalInfo.github));
  
  if (data.personalInfo.website) {
    generated = generated.replace('%%WEBSITE_SECTION%%', `\\quad \\href{${escapeLatex(data.personalInfo.website)}}{\\underline{${escapeLatex(data.personalInfo.website)}}}`);
  } else {
    generated = generated.replace('%%WEBSITE_SECTION%%', '');
  }

  // Education
  if (data.education.length > 0) {
    const educationItems = data.education
      .map(
        (edu) => {
          const endDate = edu.endMonth === 'Present' ? 'Present' : `${escapeLatex(edu.endMonth)} ${escapeLatex(edu.endYear)}`;
          const startDate = `${escapeLatex(edu.startMonth)} ${escapeLatex(edu.startYear)}`;
          return `\\resumeSubheading{${escapeLatex(edu.school)}}{${startDate} - ${endDate}}{${escapeLatex(edu.degree)}, ${escapeLatex(edu.major)}}{CGPA: ${escapeLatex(edu.cgpa)}}`
        })
      .join('\n');
    generated = generated.replace('%%EDUCATION_SECTION%%', `\\section{Education}\\resumeSubHeadingListStart\n${educationItems}\n\\resumeSubHeadingListEnd`);
  } else {
    generated = generated.replace('%%EDUCATION_SECTION%%', '');
  }

  // Experience
  if (data.experience.length > 0) {
    const experienceItems = data.experience
      .map(
        (exp) =>
          `\\resumeSubheading{${escapeLatex(exp.title)}}{${escapeLatex(exp.startDate)} - ${escapeLatex(exp.endDate)}}{${escapeLatex(exp.company)}}{}\n\\resumeItemListStart\n\\resumeItem{${escapeLatex(exp.description).replace(/\n/g, ' \\\\ ')}}\n\\resumeItemListEnd`
      )
      .join('\n');
    generated = generated.replace('%%EXPERIENCE_SECTION%%', `\\section{Experience}\\resumeSubHeadingListStart\n${experienceItems}\n\\resumeSubHeadingListEnd`);
  } else {
    generated = generated.replace('%%EXPERIENCE_SECTION%%', '');
  }

  // Projects
  if (data.projects.length > 0) {
    const projectItems = data.projects
      .map(
        (proj) =>
          `\\resumeProjectHeading{${escapeLatex(proj.name)}}{${escapeLatex(proj.technologies)}}\n\\resumeItemListStart\n\\resumeItem{${escapeLatex(proj.description).replace(/\n/g, ' \\\\ ')}}\n\\resumeItemListEnd`
      )
      .join('\n');
    generated = generated.replace('%%PROJECTS_SECTION%%', `\\section{Projects}\\resumeSubHeadingListStart\n${projectItems}\n\\resumeSubHeadingListEnd`);
  } else {
    generated = generated.replace('%%PROJECTS_SECTION%%', '');
  }

  // Skills
  if (data.skills.languages || data.skills.frameworks || data.skills.tools) {
    let skillsContent = '\\section{Skills}\\resumeSubHeadingListStart\n';
    if(data.skills.languages) skillsContent += `\\resumeItem{\\textbf{Languages: }${escapeLatex(data.skills.languages)}}\n`;
    if(data.skills.frameworks) skillsContent += `\\resumeItem{\\textbf{Frameworks: }${escapeLatex(data.skills.frameworks)}}\n`;
    if(data.skills.tools) skillsContent += `\\resumeItem{\\textbf{Tools: }${escapeLatex(data.skills.tools)}}\n`;
    skillsContent += '\\resumeSubHeadingListEnd';
    generated = generated.replace('%%SKILLS_SECTION%%', skillsContent);
  } else {
    generated = generated.replace('%%SKILLS_SECTION%%', '');
  }

  return generated;
}

const generateElegantTemplate = (data: ResumeData, template: string): string => {
  let generated = template;

  generated = generated.replace('%%NAME%%', escapeLatex(data.personalInfo.name));
  generated = generated.replace('%%EMAIL%%', escapeLatex(data.personalInfo.email));
  generated = generated.replace('%%PHONE%%', escapeLatex(data.personalInfo.phone));
  generated = generated.replace(/%%LINKEDIN%%/g, escapeLatex(data.personalInfo.linkedin));
  generated = generated.replace(/%%GITHUB%%/g, escapeLatex(data.personalInfo.github));
  
  if (data.personalInfo.website) {
    const websiteUrl = escapeLatex(data.personalInfo.website);
    generated = generated.replace('%%WEBSITE_SECTION%%', `\\quad \\faGlobe \\ \\href{${websiteUrl}}{${websiteUrl.replace(/https?:\/\//, '')}}`);
  } else {
    generated = generated.replace('%%WEBSITE_SECTION%%', '');
  }

  // Education
  if (data.education.length > 0) {
    const educationItems = data.education
      .map(
        (edu) => {
          const endDate = edu.endMonth === 'Present' ? 'Present' : `${escapeLatex(edu.endMonth)} ${escapeLatex(edu.endYear)}`;
          const startDate = `${escapeLatex(edu.startMonth)} ${escapeLatex(edu.startYear)}`;
          return `\\resumeentry{${escapeLatex(edu.school)}}{${startDate} - ${endDate}}{${escapeLatex(edu.degree)} in ${escapeLatex(edu.major)}}{CGPA: ${escapeLatex(edu.cgpa)}}`
        })
      .join('\n');
    generated = generated.replace('%%EDUCATION_SECTION%%', `\\section{Education}\n${educationItems}`);
  } else {
    generated = generated.replace('%%EDUCATION_SECTION%%', '');
  }

  // Experience
  if (data.experience.length > 0) {
    const experienceItems = data.experience
      .map(
        (exp) => {
          const descriptionItems = exp.description.split('\n').map(line => `\\resumeitem{${escapeLatex(line.trim().replace(/^•\s*/, ''))}}`).join('\n');
          return `\\resumeentry{${escapeLatex(exp.title)}}{${escapeLatex(exp.startDate)} - ${escapeLatex(exp.endDate)}}{${escapeLatex(exp.company)}}{}\n\\resumeliststart\n${descriptionItems}\n\\resumelistend`
        })
      .join('\n\\vspace{5pt}\n');
    generated = generated.replace('%%EXPERIENCE_SECTION%%', `\\section{Experience}\n${experienceItems}`);
  } else {
    generated = generated.replace('%%EXPERIENCE_SECTION%%', '');
  }

  // Projects
  if (data.projects.length > 0) {
    const projectItems = data.projects
      .map(
        (proj) => {
          const technologies = proj.technologies ? `Technologies: ${escapeLatex(proj.technologies)}` : '';
          const descriptionItems = proj.description.split('\n').map(line => `\\resumeitem{${escapeLatex(line.trim().replace(/^•\s*/, ''))}}`).join('\n');
          return `\\resumeentry{${escapeLatex(proj.name)}}{}{${technologies}}{}\n\\resumeliststart\n${descriptionItems}\n\\resumelistend`
        })
      .join('\n\\vspace{5pt}\n');
    generated = generated.replace('%%PROJECTS_SECTION%%', `\\section{Projects}\n${projectItems}`);
  } else {
    generated = generated.replace('%%PROJECTS_SECTION%%', '');
  }

  // Skills
  if (data.skills.languages || data.skills.frameworks || data.skills.tools) {
    let skillsContent = '\\section{Skills}\n\\resumeliststart\n';
    if(data.skills.languages) skillsContent += `\\resumeitem{\\textbf{Languages:} ${escapeLatex(data.skills.languages)}}\n`;
    if(data.skills.frameworks) skillsContent += `\\resumeitem{\\textbf{Frameworks \\& Libraries:} ${escapeLatex(data.skills.frameworks)}}\n`;
    if(data.skills.tools) skillsContent += `\\resumeitem{\\textbf{Tools \\& Technologies:} ${escapeLatex(data.skills.tools)}}\n`;
    skillsContent += '\\resumelistend';
    generated = generated.replace('%%SKILLS_SECTION%%', skillsContent);
  } else {
    generated = generated.replace('%%SKILLS_SECTION%%', '');
  }

  return generated;
};

const generateClassicTemplate = (data: ResumeData, template: string): string => {
  let generated = template;
  const { personalInfo, education, experience, projects, skills } = data;

  generated = generated.replace('%%NAME%%', escapeLatex(personalInfo.name));
  generated = generated.replace(/%%EMAIL%%/g, escapeLatex(personalInfo.email));
  generated = generated.replace('%%PHONE%%', escapeLatex(personalInfo.phone));

  if (personalInfo.website) {
    generated = generated.replace('%%WEBSITE_SECTION%%', `\\href{${escapeLatex(personalInfo.website)}}{Website: ${escapeLatex(getDomain(personalInfo.website))}} & Mobile:~~~${escapeLatex(personalInfo.phone)} \\\\`);
  } else {
    generated = generated.replace('%%WEBSITE_SECTION%%', ` & Mobile:~~~${escapeLatex(personalInfo.phone)} \\\\`);
  }
  
  if (personalInfo.github) {
    generated = generated.replace('%%GITHUB_SECTION%%', `\\href{${escapeLatex(personalInfo.github)}}{Github: ~~github.com/${escapeLatex(getUrlUsername(personalInfo.github))}} \\\\`);
  } else {
    generated = generated.replace('%%GITHUB_SECTION%%', '');
  }

  if (personalInfo.linkedin) {
    generated = generated.replace('%%LINKEDIN_SECTION%%', `\\href{${escapeLatex(personalInfo.linkedin)}}{LinkedIn: ~~${escapeLatex(getUrlUsername(personalInfo.linkedin))}} \\\\`);
  } else {
    generated = generated.replace('%%LINKEDIN_SECTION%%', '');
  }
  
  // Education
  if (education.length > 0) {
    const educationItems = education.map(edu => {
      const endDate = edu.endMonth === 'Present' ? 'Present' : `${escapeLatex(edu.endMonth)} ${escapeLatex(edu.endYear)}`;
      const startDate = `${escapeLatex(edu.startMonth)} ${escapeLatex(edu.startYear)}`;
      return `\\resumeSubheading{${escapeLatex(edu.school)}}{${startDate} - ${endDate}}{${escapeLatex(edu.degree)} in ${escapeLatex(edu.major)}}{CGPA: ${escapeLatex(edu.cgpa)}}`;
    }).join('\n');
    generated = generated.replace('%%EDUCATION_SECTION%%', `\\section{~~Education}\n  \\resumeSubHeadingListStart\n${educationItems}\n  \\resumeSubHeadingListEnd`);
  } else {
    generated = generated.replace('%%EDUCATION_SECTION%%', '');
  }
  
  // Skills
  if (skills.languages || skills.frameworks || skills.tools) {
    let skillsContent = '\\vspace{-5pt}\n\\section{Skills Summary}\n\t\\resumeSubHeadingListStart\n';
    if(skills.languages) skillsContent += `\t\\resumeSubItem{Languages}{${escapeLatex(skills.languages)}}\n`;
    if(skills.frameworks) skillsContent += `\t\\resumeSubItem{Frameworks}{${escapeLatex(skills.frameworks)}}\n`;
    if(skills.tools) skillsContent += `\t\\resumeSubItem{Tools}{${escapeLatex(skills.tools)}}\n`;
    skillsContent += '\\resumeSubHeadingListEnd';
    generated = generated.replace('%%SKILLS_SECTION%%', skillsContent);
  } else {
    generated = generated.replace('%%SKILLS_SECTION%%', '');
  }

  // Experience
  if (experience.length > 0) {
    const experienceItems = experience.map(exp => {
      const descriptionItems = exp.description.split('\n').map(line => `\\item ${escapeLatex(line.trim().replace(/^•\s*/, ''))}`).join('\n');
      return `\\resumeSubheading{${escapeLatex(exp.company)}}{${escapeLatex(exp.startDate)} - ${escapeLatex(exp.endDate)}}{${escapeLatex(exp.title)}}{}\n\\resumeItemListStart\n${descriptionItems}\n\\resumeItemListEnd`
    }).join('\n\\vspace{-5pt}\n');
    generated = generated.replace('%%EXPERIENCE_SECTION%%', `\\vspace{-5pt}\n\\section{Experience}\n  \\resumeSubHeadingListStart\n${experienceItems}\n\\resumeSubHeadingListEnd`);
  } else {
    generated = generated.replace('%%EXPERIENCE_SECTION%%', '');
  }
  
  // Projects
  if (projects.length > 0) {
    const projectItems = projects.map(proj => {
      const title = proj.technologies ? `${escapeLatex(proj.name)} (${escapeLatex(proj.technologies)})` : escapeLatex(proj.name);
      return `\\resumeSubItem{${title}}{${escapeLatex(proj.description).replace(/\n/g, ' ')}`;
    }).join('\n\\vspace{2pt}\n');
    generated = generated.replace('%%PROJECTS_SECTION%%', `\\vspace{-5pt}\n\\section{Projects}\n\\resumeSubHeadingListStart\n${projectItems}\n\\resumeSubHeadingListEnd`);
  } else {
    generated = generated.replace('%%PROJECTS_SECTION%%', '');
  }

  return generated;
};

export const generateResume = (
  data: ResumeData,
  templateId: 'modern' | 'elegant' | 'classic',
  template: string
) => {
  if (templateId === 'modern') {
    return generateModernTemplate(data, template);
  }
  if (templateId === 'elegant') {
    return generateElegantTemplate(data, template);
  }
  if (templateId === 'classic') {
    return generateClassicTemplate(data, template);
  }
  return 'Template not found';
};
