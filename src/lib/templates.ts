export const templates = [
  {
    id: 'modern',
    name: 'Modern',
    template: `\\documentclass[letterpaper,11pt]{article}

\\usepackage{latexsym}
\\usepackage[empty]{fullpage}
\\usepackage{titlesec}
\\usepackage{marvosym}
\\usepackage[usenames,dvipsnames]{color}
\\usepackage{verbatim}
\\usepackage{enumitem}
\\usepackage[hidelinks]{hyperref}
\\usepackage{fancyhdr}
\\usepackage[english]{babel}
\\usepackage{tabularx}
\\usepackage{fontawesome5}
\\usepackage{multicol}
\\setlength{\\multicolsep}{-3.0pt}
\\setlength{\\columnsep}{-1pt}
\\input{glyphtounicode}

\\pagestyle{fancy}
\\fancyhf{}
\\fancyfoot{}
\\renewcommand{\\headrulewidth}{0pt}
\\renewcommand{\\footrulewidth}{0pt}

\\addtolength{\\oddsidemargin}{-0.6in}
\\addtolength{\\evensidemargin}{-0.5in}
\\addtolength{\\textwidth}{1.2in}
\\addtolength{\\topmargin}{-.8in}
\\addtolength{\\textheight}{1.6in}

\\urlstyle{same}

\\raggedbottom
\\raggedright
\\setlength{\\tabcolsep}{0in}

\\titleformat{\\section}{
  \\vspace{-4pt}\\scshape\\raggedright\\large\\bfseries
}{}{0em}{}[\\color{black}\\titlerule\\vspace{-7pt}]

\\pdfgentounicode=1

\\newcommand{\\resumeItem}[1]{
  \\item\\small{
    {#1 \\vspace{-2pt}}
  }
}

\\newcommand{\\resumeSubheading}[4]{
  \\vspace{-2pt}\\item
    \\begin{tabular*}{0.97\\textwidth}[t]{l@{\\extracolsep{\\fill}}r}
      \\textbf{#1} & #2 \\\\
      \\textit{\\small#3} & \\textit{\\small #4} \\\\
    \\end{tabular*}\\vspace{-7pt}
}

\\newcommand{\\resumeProjectHeading}[2]{
    \\vspace{-2pt}\\item
    \\begin{tabular*}{0.97\\textwidth}[t]{l@{\\extracolsep{\\fill}}r}
      \\textbf{#1} & #2 \\\\
    \\end{tabular*}\\vspace{-7pt}
}

\\newcommand{\\resumeSubItem}[1]{\\resumeItem{#1}\\vspace{-4pt}}

\\renewcommand\\labelitemii{\\textbullet}

\\newcommand{\\resumeSubHeadingListStart}{\\begin{itemize}[leftmargin=0.15in, label={}]}
\\newcommand{\\resumeSubHeadingListEnd}{\\end{itemize}}
\\newcommand{\\resumeItemListStart}{\\begin{itemize}}
\\newcommand{\\resumeItemListEnd}{\\end{itemize}\\vspace{-5pt}}

\\begin{document}

\\begin{center}
    {\\Huge \\scshape %%NAME%%} \\\\ \\vspace{1pt}
    \\small %%PHONE%% \\quad \\href{mailto:%%EMAIL%%}{\\underline{%%EMAIL%%}} \\quad 
    \\href{%%LINKEDIN%%}{\\underline{%%LINKEDIN%%}} \\quad
    \\href{%%GITHUB%%}{\\underline{%%GITHUB%%}}
    %%WEBSITE_SECTION%%
\\end{center}

%%EDUCATION_SECTION%%

%%EXPERIENCE_SECTION%%

%%PROJECTS_SECTION%%

%%SKILLS_SECTION%%

\\end{document}
`,
  },
  {
    id: 'classic',
    name: 'Classic',
    template: `\\documentclass[a4paper,10pt]{article}
\\usepackage[utf8]{inputenc}
\\usepackage{geometry}
\\geometry{a4paper, total={170mm,257mm}, left=20mm, top=20mm}
\\usepackage{enumitem}
\\usepackage{hyperref}
\\hypersetup{colorlinks=true, urlcolor=blue}

\\begin{document}

\\begin{center}
    {\\LARGE \\bf %%NAME%%} \\\\
    %%PHONE%% $|$ \\href{mailto:%%EMAIL%%}{%%EMAIL%%} $|$ \\href{%%LINKEDIN%%}{%%LINKEDIN%%} $|$ \\href{%%GITHUB%%}{%%GITHUB%%} %%WEBSITE_SECTION%%
\\end{center}

\\section*{Education}
\\hrule
\\begin{itemize}[leftmargin=*]
    %%EDUCATION_ITEMS%%
\\end{itemize}

\\section*{Experience}
\\hrule
\\begin{itemize}[leftmargin=*]
    %%EXPERIENCE_ITEMS%%
\\end{itemize}

\\section*{Projects}
\\hrule
\\begin{itemize}[leftmargin=*]
    %%PROJECT_ITEMS%%
\\end{itemize}

\\section*{Skills}
\\hrule
\\begin{itemize}
    %%SKILLS_ITEMS%%
\\end{itemize}

\\end{document}
`,
  },
];
