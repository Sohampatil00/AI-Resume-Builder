export type PersonalInfo = {
  name: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  website: string;
};

export type Education = {
  id: string;
  school: string;
  degree: string;
  major: string;
  cgpa: string;
  startMonth: string;
  startYear: string;
  endMonth: string;
  endYear: string;
};

export type Experience = {
  id: string;
  company: string;
  title: string;
  startDate: string;
  endDate: string;
  description: string;
};

export type Project = {
  id: string;
  name: string;
  description: string;
  technologies: string;
};

export type Skills = {
  languages: string;
  frameworks: string;
  tools: string;
};

export type Publication = {
  id: string;
  title: string;
  publisher: string;
  date: string;
  description: string;
};

export type Honor = {
  id: string;
  title: string;
  issuer: string;
  date: string;
};

export type VolunteerExperience = {
  id: string;
  organization: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
};


export type ResumeData = {
  personalInfo: PersonalInfo;
  education: Education[];
  experience: Experience[];
  projects: Project[];
  skills: Skills;
  publications: Publication[];
  honors: Honor[];
  volunteerExperience: VolunteerExperience[];
};
