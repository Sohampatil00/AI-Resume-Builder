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
    .replace(/\^/g, '\\textasciicircum{}')
    .replace(/\n/g, '\\\\ ');
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
        (edu) =>
          `\\resumeSubheading{${escapeLatex(edu.school)}}{${escapeLatex(edu.startDate)} - ${escapeLatex(edu.endDate)}}{${escapeLatex(edu.degree)}, ${escapeLatex(edu.major)}}{GPA: ${escapeLatex(edu.gpa)}}`
      )
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
          `\\resumeSubheading{${escapeLatex(exp.title)}}{${escapeLatex(exp.startDate)} - ${escapeLatex(exp.endDate)}}{${escapeLatex(exp.company)}}{}\n\\resumeItemListStart\n\\resumeItem{${escapeLatex(exp.description)}}\n\\resumeItemListEnd`
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
          `\\resumeProjectHeading{${escapeLatex(proj.name)}}{${escapeLatex(proj.technologies)}}\n\\resumeItemListStart\n\\resumeItem{${escapeLatex(proj.description)}}\n\\resumeItemListEnd`
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

const generateClassicTemplate = (data: ResumeData, template: string): string => {
    let generated = template;

    generated = generated.replace('%%NAME%%', escapeLatex(data.personalInfo.name));
    generated = generated.replace('%%EMAIL%%', escapeLatex(data.personalInfo.email));
    generated = generated.replace('%%PHONE%%', escapeLatex(data.personalInfo.phone));
    generated = generated.replace(/%%LINKEDIN%%/g, escapeLatex(data.personalInfo.linkedin));
    generated = generated.replace(/%%GITHUB%%/g, escapeLatex(data.personalInfo.github));

    if (data.personalInfo.website) {
        generated = generated.replace('%%WEBSITE_SECTION%%', `$|$ \\href{${escapeLatex(data.personalInfo.website)}}{${escapeLatex(data.personalInfo.website)}}`);
    } else {
        generated = generated.replace('%%WEBSITE_SECTION%%', '');
    }

    const educationItems = data.education.map(edu => 
        `\\item \\textbf{${escapeLatex(edu.school)}} \\hfill ${escapeLatex(edu.startDate)} - ${escapeLatex(edu.endDate)} \\\\ ${escapeLatex(edu.degree)} in ${escapeLatex(edu.major)} \\hfill GPA: ${escapeLatex(edu.gpa)}`
    ).join('\n');
    generated = generated.replace('%%EDUCATION_ITEMS%%', educationItems);

    const experienceItems = data.experience.map(exp => 
        `\\item \\textbf{${escapeLatex(exp.title)}}, \\textit{${escapeLatex(exp.company)}} \\hfill ${escapeLatex(exp.startDate)} - ${escapeLatex(exp.endDate)}
        \\begin{itemize}[label=\\textbullet, leftmargin=*]
        \\item ${escapeLatex(exp.description)}
        \\end{itemize}`
    ).join('\n');
    generated = generated.replace('%%EXPERIENCE_ITEMS%%', experienceItems);

    const projectItems = data.projects.map(proj =>
        `\\item \\textbf{${escapeLatex(proj.name)}} \\\\ \\textit{Technologies: ${escapeLatex(proj.technologies)}}
        \\begin{itemize}[label=\\textbullet, leftmargin=*]
        \item ${escapeLatex(proj.description)}
        \\end{itemize}`
    ).join('\n');
    generated = generated.replace('%%PROJECT_ITEMS%%', projectItems);

    let skillsItems = '';
    if(data.skills.languages) skillsItems += `\\item \\textbf{Languages:} ${escapeLatex(data.skills.languages)}\n`;
    if(data.skills.frameworks) skillsItems += `\\item \\textbf{Frameworks:} ${escapeLatex(data.skills.frameworks)}\n`;
    if(data.skills.tools) skillsItems += `\\item \\textbf{Tools:} ${escapeLatex(data.skills.tools)}\n`;
    generated = generated.replace('%%SKILLS_ITEMS%%', skillsItems);

    return generated;
};


export const generateResume = (
  data: ResumeData,
  templateId: 'modern' | 'classic',
  template: string
) => {
  if (templateId === 'modern') {
    return generateModernTemplate(data, template);
  }
  if (templateId === 'classic') {
    return generateClassicTemplate(data, template);
  }
  return 'Template not found';
};
