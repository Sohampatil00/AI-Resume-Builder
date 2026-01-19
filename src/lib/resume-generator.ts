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
        const username = path.split('/').filter(Boolean).pop()
        return username ? username : url;
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
  const { personalInfo, education, experience, projects, skills, publications, honors, volunteerExperience } = data;


  generated = generated.replace('%%NAME%%', escapeLatex(personalInfo.name));
  generated = generated.replace('%%EMAIL%%', escapeLatex(personalInfo.email));
  generated = generated.replace('%%PHONE%%', escapeLatex(personalInfo.phone));
  generated = generated.replace(/%%LINKEDIN%%/g, escapeLatex(personalInfo.linkedin));
  generated = generated.replace(/%%GITHUB%%/g, escapeLatex(personalInfo.github));
  
  if (personalInfo.website) {
    generated = generated.replace('%%WEBSITE_SECTION%%', `\\quad \\href{${escapeLatex(personalInfo.website)}}{\\underline{${escapeLatex(personalInfo.website)}}}`);
  } else {
    generated = generated.replace('%%WEBSITE_SECTION%%', '');
  }

  // Education
  if (education.length > 0) {
    const educationItems = education
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
  if (experience.length > 0) {
    const experienceItems = experience
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
  if (projects.length > 0) {
    const projectItems = projects
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
  if (skills.languages || skills.frameworks || skills.tools) {
    let skillsContent = '\\section{Skills}\\resumeSubHeadingListStart\n';
    if(skills.languages) skillsContent += `\\resumeItem{\\textbf{Languages: }${escapeLatex(skills.languages)}}\n`;
    if(skills.frameworks) skillsContent += `\\resumeItem{\\textbf{Frameworks: }${escapeLatex(skills.frameworks)}}\n`;
    if(skills.tools) skillsContent += `\\resumeItem{\\textbf{Tools: }${escapeLatex(skills.tools)}}\n`;
    skillsContent += '\\resumeSubHeadingListEnd';
    generated = generated.replace('%%SKILLS_SECTION%%', skillsContent);
  } else {
    generated = generated.replace('%%SKILLS_SECTION%%', '');
  }

  // Publications
  if (publications.length > 0) {
    const pubItems = publications.map(p => `\\resumeProjectHeading{${escapeLatex(p.title)}}{${escapeLatex(p.publisher)}, ${escapeLatex(p.date)}}\n\\resumeItemListStart\n\\resumeItem{${escapeLatex(p.description)}}\n\\resumeItemListEnd`).join('\n');
    generated = generated.replace('%%PUBLICATIONS_SECTION%%', `\\section{Publications}\\resumeSubHeadingListStart\n${pubItems}\n\\resumeSubHeadingListEnd`);
  } else {
    generated = generated.replace('%%PUBLICATIONS_SECTION%%', '');
  }

  // Honors
  if (honors.length > 0) {
    const honorItems = honors.map(h => `\\resumeItem{${escapeLatex(h.title)} (${escapeLatex(h.issuer)}, ${escapeLatex(h.date)})}`).join('\n');
    generated = generated.replace('%%HONORS_AWARDS_SECTION%%', `\\section{Honors & Awards}\\resumeItemListStart\n${honorItems}\n\\resumeItemListEnd`);
  } else {
    generated = generated.replace('%%HONORS_AWARDS_SECTION%%', '');
  }

  // Volunteer
  if (volunteerExperience.length > 0) {
    const volItems = volunteerExperience.map(v => `\\resumeSubheading{${escapeLatex(v.role)}}{${escapeLatex(v.startDate)} - ${escapeLatex(v.endDate)}}{${escapeLatex(v.organization)}}{}\n\\resumeItemListStart\n\\resumeItem{${escapeLatex(v.description).replace(/\n/g, ' \\\\ ')}}\n\\resumeItemListEnd`).join('\n');
    generated = generated.replace('%%VOLUNTEER_EXPERIENCE_SECTION%%', `\\section{Volunteer Experience}\\resumeSubHeadingListStart\n${volItems}\n\\resumeSubHeadingListEnd`);
  } else {
    generated = generated.replace('%%VOLUNTEER_EXPERIENCE_SECTION%%', '');
  }

  return generated;
}

const generateElegantTemplate = (data: ResumeData, template: string): string => {
  let generated = template;
  const { personalInfo, education, experience, projects, skills, publications, honors, volunteerExperience } = data;

  generated = generated.replace('%%NAME%%', escapeLatex(personalInfo.name));
  generated = generated.replace('%%EMAIL%%', escapeLatex(personalInfo.email));
  generated = generated.replace('%%PHONE%%', escapeLatex(personalInfo.phone));
  generated = generated.replace(/%%LINKEDIN%%/g, escapeLatex(personalInfo.linkedin));
  generated = generated.replace(/%%GITHUB%%/g, escapeLatex(personalInfo.github));
  
  if (personalInfo.website) {
    const websiteUrl = escapeLatex(personalInfo.website);
    generated = generated.replace('%%WEBSITE_SECTION%%', `\\quad \\faGlobe \\ \\href{${websiteUrl}}{${websiteUrl.replace(/https?:\/\//, '')}}`);
  } else {
    generated = generated.replace('%%WEBSITE_SECTION%%', '');
  }

  // Education
  if (education.length > 0) {
    const educationItems = education
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
  if (experience.length > 0) {
    const experienceItems = experience
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
  if (projects.length > 0) {
    const projectItems = projects
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
  if (skills.languages || skills.frameworks || skills.tools) {
    let skillsContent = '\\section{Skills}\n\\resumeliststart\n';
    if(skills.languages) skillsContent += `\\resumeitem{\\textbf{Languages:} ${escapeLatex(skills.languages)}}\n`;
    if(skills.frameworks) skillsContent += `\\resumeitem{\\textbf{Frameworks \\& Libraries:} ${escapeLatex(skills.frameworks)}}\n`;
    if(skills.tools) skillsContent += `\\resumeitem{\\textbf{Tools \\& Technologies:} ${escapeLatex(skills.tools)}}\n`;
    skillsContent += '\\resumelistend';
    generated = generated.replace('%%SKILLS_SECTION%%', skillsContent);
  } else {
    generated = generated.replace('%%SKILLS_SECTION%%', '');
  }
  
  // Publications
  if (publications.length > 0) {
    const pubItems = publications.map(p => `\\resumeentry{${escapeLatex(p.title)}}{${escapeLatex(p.date)}}{${escapeLatex(p.publisher)}}{}\n\\resumeliststart\n\\resumeitem{${escapeLatex(p.description)}}\n\\resumelistend`).join('\n\\vspace{5pt}\n');
    generated = generated.replace('%%PUBLICATIONS_SECTION%%', `\\section{Publications}\n${pubItems}`);
  } else {
    generated = generated.replace('%%PUBLICATIONS_SECTION%%', '');
  }
  
  // Honors
  if (honors.length > 0) {
    const honorItems = honors.map(h => `\\resumeitem{${escapeLatex(h.title)} (${escapeLatex(h.issuer)}, ${escapeLatex(h.date)})}`).join('\n');
    generated = generated.replace('%%HONORS_AWARDS_SECTION%%', `\\section{Honors & Awards}\n\\resumeliststart\n${honorItems}\n\\resumelistend`);
  } else {
    generated = generated.replace('%%HONORS_AWARDS_SECTION%%', '');
  }

  // Volunteer
  if (volunteerExperience.length > 0) {
    const volItems = volunteerExperience.map(v => {
      const descriptionItems = v.description.split('\n').map(line => `\\resumeitem{${escapeLatex(line.trim().replace(/^•\s*/, ''))}}`).join('\n');
      return `\\resumeentry{${escapeLatex(v.role)}}{${escapeLatex(v.startDate)} - ${escapeLatex(v.endDate)}}{${escapeLatex(v.organization)}}{}\n\\resumeliststart\n${descriptionItems}\n\\resumelistend`
    }).join('\n\\vspace{5pt}\n');
    generated = generated.replace('%%VOLUNTEER_EXPERIENCE_SECTION%%', `\\section{Volunteer Experience}\n${volItems}`);
  } else {
    generated = generated.replace('%%VOLUNTEER_EXPERIENCE_SECTION%%', '');
  }

  return generated;
};

const generateClassicTemplate = (data: ResumeData, template: string): string => {
  let generated = template;
  const { personalInfo, education, experience, projects, skills, publications, honors, volunteerExperience } = data;

  generated = generated.replace('%%NAME%%', escapeLatex(personalInfo.name));
  generated = generated.replace(/%%EMAIL%%/g, escapeLatex(personalInfo.email));

  if (personalInfo.website) {
    generated = generated.replace('%%WEBSITE_SECTION%%', `\\href{${escapeLatex(personalInfo.website)}}{Website: ${escapeLatex(getDomain(personalInfo.website))}} & Mobile:~~~${escapeLatex(personalInfo.phone)} \\\\`);
  } else {
    generated = generated.replace('%%WEBSITE_SECTION%%', ` & Mobile:~~~${escapeLatex(personalInfo.phone)} \\\\`);
  }
  
  let githubLinkedinLine = '';
  if (personalInfo.github) {
    githubLinkedinLine += `\\href{${escapeLatex(personalInfo.github)}}{Github: ~~github.com/${escapeLatex(getUrlUsername(personalInfo.github))}}`;
  }
  githubLinkedinLine += ' & ';
  if (personalInfo.linkedin) {
    githubLinkedinLine += `\\href{${escapeLatex(personalInfo.linkedin)}}{LinkedIn: ~~${escapeLatex(personalInfo.linkedin.replace(/https?:\/\/(www.)?/, ''))}}`;
  }
  
  if(personalInfo.github || personalInfo.linkedin) {
      generated = generated.replace('%%GITHUB_LINKEDIN_SECTION%%', githubLinkedinLine + '\\\\');
  } else {
      generated = generated.replace('%%GITHUB_LINKEDIN_SECTION%%', '');
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
      const descriptionItems = exp.description.split('\n').map(line => `\\resumeItem{${escapeLatex(line.trim().replace(/^•\s*/, ''))}}`).join('\n');
      return `\\resumeSubheading{${escapeLatex(exp.company)}}{${escapeLatex(exp.startDate)} - ${escapeLatex(exp.endDate)}}{${escapeLatex(exp.title)}}{}\\resumeItemListStart\n${descriptionItems}\n\\resumeItemListEnd`
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

  // Publications
  if (publications.length > 0) {
    const publicationItems = publications.map(pub => {
      return `\\resumeSubItem{${escapeLatex(pub.title)}}{${escapeLatex(pub.description)} (${escapeLatex(pub.publisher)}, ${escapeLatex(pub.date)})}`;
    }).join('\n\\vspace{2pt}\n');
    generated = generated.replace('%%PUBLICATIONS_SECTION%%', `\\vspace{-5pt}\n\\section{Publications}\n\\resumeSubHeadingListStart\n${publicationItems}\n\\resumeSubHeadingListEnd`);
  } else {
    generated = generated.replace('%%PUBLICATIONS_SECTION%%', '');
  }

  // Honors & Awards
  if (honors.length > 0) {
    const honorItems = honors.map(honor => {
      return `\\resumeItem{${escapeLatex(honor.title)} (${escapeLatex(honor.issuer)}, ${escapeLatex(honor.date)})}`;
    }).join('\n');
    generated = generated.replace('%%HONORS_AWARDS_SECTION%%', `\\vspace{-5pt}\n\\section{Honors and Awards}\\resumeItemListStart\n${honorItems}\n\\resumeItemListEnd`);
  } else {
    generated = generated.replace('%%HONORS_AWARDS_SECTION%%', '');
  }

  // Volunteer Experience
  if (volunteerExperience.length > 0) {
      const volunteerItems = volunteerExperience.map(vol => {
        const descriptionItems = vol.description.split('\n').map(line => `\\resumeItem{${escapeLatex(line.trim().replace(/^•\s*/, ''))}}`).join('\n');
        return `\\resumeSubheading{${escapeLatex(vol.organization)}}{${escapeLatex(vol.startDate)} - ${escapeLatex(vol.endDate)}}{${escapeLatex(vol.role)}}{}\\resumeItemListStart\n${descriptionItems}\n\\resumeItemListEnd`
      }).join('\n\\vspace{-5pt}\n');
      generated = generated.replace('%%VOLUNTEER_EXPERIENCE_SECTION%%', `\\vspace{-5pt}\n\\section{Volunteer Experience}\n  \\resumeSubHeadingListStart\n${volunteerItems}\n\\resumeSubHeadingListEnd`);
  } else {
      generated = generated.replace('%%VOLUNTEER_EXPERIENCE_SECTION%%', '');
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
