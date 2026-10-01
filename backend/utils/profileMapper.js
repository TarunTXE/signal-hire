export const toPortfolioDraft = (p) => ({
  fullName: p.fullName,
  title: p.fullName ? `${p.fullName} - Portfolio` : '',
  bio: p.summary,
  contactEmail: p.email,
  contactPhone: p.phone,
  location: p.location,
  githubLink: p.links.github,
  linkedinLink: p.links.linkedin,
  websiteLink: p.links.website,
  skills: p.skills.filter(Boolean).map((name) => ({ name })),
  education: p.education
    .filter((e) => e.institution || e.degree)
    .map((e) => ({
      degree: e.degree,
      institution: e.institution,
      year: e.endYear || e.startYear || 'Present',
      startYear: e.startYear,
      endYear: e.endYear,
      gpa: e.gpa,
    })),
  experience: p.experience
    .filter((x) => x.company || x.role)
    .map((x) => ({
      title: x.role,
      company: x.company,
      description: x.bullets.filter(Boolean).join('\n'),
      startYear: x.startYear,
      endYear: x.endYear,
    })),
  projects: p.projects
    .filter((pr) => pr.title)
    .map((pr) => ({
      title: pr.title,
      description: pr.description,
      techStack: pr.techStack,
      liveLink: pr.link,
    })),
});