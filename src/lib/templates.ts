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
    id: 'elegant',
    name: 'Elegant',
    template: `\\documentclass[letterpaper,10pt]{article}
\\usepackage[left=0.75in,right=0.75in,top=0.5in,bottom=0.5in]{geometry}
\\usepackage{fontawesome5}
\\usepackage{titlesec}
\\usepackage[hidelinks]{hyperref}
\\usepackage{xcolor}
\\usepackage{enumitem}

\\definecolor{primary}{HTML}{2F3D4F}
\\definecolor{text}{HTML}{262626}

\\hypersetup{
    colorlinks=true,
    urlcolor=primary,
    linkcolor=primary
}

\\pagestyle{empty}
\\setlength{\\parindent}{0pt}
\\color{text}
\\fontfamily{phv}\\selectfont

\\titleformat{\\section}{\\Large\\scshape\\color{primary}}{}{0em}{}[\\titlerule]
\\titlespacing*{\\section}{0pt}{8pt}{4pt}

\\newcommand{\\resumeentry}[4]{
    \\vspace{3pt}
    \\textbf{#1} \\hfill #2 \\\\
    \\textit{#3} \\hfill \\textit{#4}
}

\\newcommand{\\resumeliststart}{\\begin{itemize}[leftmargin=0.2in, label=\\textbullet, itemsep=0pt, parsep=0pt]}
\\newcommand{\\resumelistend}{\\end{itemize}}
\\newcommand{\\resumeitem}[1]{\\item #1}

\\begin{document}

\\begin{center}
    {\\Huge \\scshape %%NAME%%}
    \\vspace{5pt}
    
    \\small
    \\faPhone* \\ %%PHONE%% \\quad
    \\faEnvelope \\ \\href{mailto:%%EMAIL%%}{%%EMAIL%%} \\quad
    \\faLinkedin \\ \\href{%%LINKEDIN%%}{%%LINKEDIN%%} \\quad
    \\faGithub \\ \\href{%%GITHUB%%}{%%GITHUB%%}
    %%WEBSITE_SECTION%%
\\end{center}

%%EDUCATION_SECTION%%

%%EXPERIENCE_SECTION%%

%%PROJECTS_SECTION%%

%%SKILLS_SECTION%%

\\end{document}
`,
  },
];
