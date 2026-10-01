import { z } from 'zod';

const str = z.string().trim().catch('');
const strList = z.array(str).catch([]);

export const parsedResumeSchema = z.object({
  fullName: str,
  email: str,
  phone: str,
  location: str,
  summary: str,
  links: z
    .object({ github: str, linkedin: str, website: str })
    .catch({ github: '', linkedin: '', website: '' }),
  education: z
    .array(
      z.object({
        institution: str,
        degree: str,
        startYear: str,
        endYear: str,
        gpa: str,
      })
    )
    .catch([]),
  experience: z
    .array(
      z.object({
        company: str,
        role: str,
        startYear: str,
        endYear: str,
        bullets: strList,
      })
    )
    .catch([]),
  projects: z
    .array(
      z.object({
        title: str,
        techStack: strList,
        description: str,
        link: str,
      })
    )
    .catch([]),
  skills: strList,
});