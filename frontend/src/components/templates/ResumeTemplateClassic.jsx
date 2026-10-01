const Section = ({ title, children, accentColor }) => (
  <div style={{ marginBottom: '18px' }}>
    <h2 style={{
      fontSize: '12.5px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase',
      borderBottom: `1.5px solid ${accentColor}`, paddingBottom: '4px', marginBottom: '9px', color: '#1a1a1a',
      fontFamily: "'Helvetica Neue', Arial, sans-serif",
    }}>
      {title}
    </h2>
    {children}
  </div>
);

const linkHref = (val = '') => {
  if (!val) return '';
  if (val.includes('@')) return `mailto:${val}`;
  if (/^\+?\d[\d\s-]{6,}$/.test(val)) return `tel:${val.replace(/\s/g, '')}`;
  if (/^https?:\/\//.test(val)) return val;
  return `https://${val}`;
};

const ContactLink = ({ value }) => {
  if (!value) return null;
  return (
    <a href={linkHref(value)} target="_blank" rel="noopener noreferrer" style={{ color: '#1a1a1a', textDecoration: 'none', borderBottom: '1px solid #999' }}>
      {value}
    </a>
  );
};

const ResumeTemplateClassic = ({ resume, accentColor = '#1a1a1a' }) => {
  const r = resume || {};
  const skills = r.skills || [];
  const education = r.education || [];
  const experience = r.experience || [];
  const projects = r.projects || [];

  const contactParts = [r.contactEmail, r.contactPhone, r.location, r.githubLink, r.linkedinLink, r.websiteLink].filter(Boolean);

  return (
    <div style={{
      fontFamily: "'Georgia', 'Times New Roman', serif",
      color: '#1a1a1a',
      background: '#fff',
      borderTop: `8px solid ${accentColor}`,
      padding: '34px 42px',
      width: '100%',
      maxWidth: '800px',
      margin: '0 auto',
      fontSize: '13px',
      lineHeight: 1.45,
    }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h1 style={{
          fontSize: '26px', fontWeight: 700, margin: 0, letterSpacing: '1px',
          fontFamily: "'Georgia', serif", textTransform: 'uppercase', color: accentColor,
        }}>
          {r.fullName || 'Your Name'}
        </h1>
        {contactParts.length > 0 && (
          <p style={{ fontSize: '11px', color: '#333', marginTop: '6px', fontFamily: "'Helvetica Neue', Arial, sans-serif" }}>
            {contactParts.map((val, i) => (
              <span key={i}>
                <ContactLink value={val} />
                {i < contactParts.length - 1 && <span style={{ margin: '0 8px', color: '#999' }}>|</span>}
              </span>
            ))}
          </p>
        )}
      </div>

      {r.bio && (
        <Section title="Summary" accentColor={accentColor}>
          <p style={{ margin: 0 }}>{r.bio}</p>
        </Section>
      )}

      {education.length > 0 && (
        <Section title="Education" accentColor={accentColor}>
          {education.map((e, i) => (
            <div key={i} style={{ marginBottom: '7px', display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <strong>{e.institution}</strong>
                {e.degree && <span> — {e.degree}</span>}
                {e.gpa && <span>, GPA: {e.gpa}</span>}
              </div>
              <div style={{ whiteSpace: 'nowrap', marginLeft: '10px', color: '#444', fontStyle: 'italic' }}>
                {e.startYear || ''}{e.startYear && e.endYear ? ' – ' : ''}{e.endYear || e.year || ''}
              </div>
            </div>
          ))}
        </Section>
      )}

      {experience.length > 0 && (
        <Section title="Experience" accentColor={accentColor}>
          {experience.map((x, i) => (
            <div key={i} style={{ marginBottom: '11px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <strong>{x.title}{x.company && `, ${x.company}`}</strong>
                <span style={{ whiteSpace: 'nowrap', marginLeft: '10px', color: '#444', fontStyle: 'italic' }}>
                  {x.startYear || ''}{x.startYear && x.endYear ? ' – ' : ''}{x.endYear || ''}
                </span>
              </div>
              {x.description && (
                <ul style={{ margin: '5px 0 0 0', padding: 0, listStyle: 'none' }}>
                  {x.description.split('\n').filter(Boolean).map((line, li) => (
                    <li key={li} style={{ marginBottom: '3px', paddingLeft: '14px', position: 'relative' }}>
                      <span style={{ position: 'absolute', left: 0 }}>▪</span>
                      {line.replace(/^[-•▪]\s*/, '')}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </Section>
      )}

      {projects.length > 0 && (
        <Section title="Projects" accentColor={accentColor}>
          {projects.map((p, i) => (
            <div key={i} style={{ marginBottom: '9px' }}>
              <div>
                <strong>{p.link ? <a href={linkHref(p.link)} target="_blank" rel="noopener noreferrer" style={{ color: '#1a1a1a' }}>{p.title}</a> : p.title}</strong>
                {p.techStack?.length > 0 && (
                  <span style={{ color: '#444' }}> — {p.techStack.join(', ')}</span>
                )}
              </div>
              {p.description && (
                <ul style={{ margin: '3px 0 0 0', padding: 0, listStyle: 'none' }}>
                  {p.description.split('\n').filter(Boolean).map((line, li) => (
                    <li key={li} style={{ marginBottom: '2px', paddingLeft: '14px', position: 'relative' }}>
                      <span style={{ position: 'absolute', left: 0 }}>▪</span>
                      {line.replace(/^[-•▪]\s*/, '')}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </Section>
      )}

      {skills.length > 0 && (
        <Section title="Skills" accentColor={accentColor}>
          <p style={{ margin: 0, fontFamily: "'Helvetica Neue', Arial, sans-serif" }}>
            {skills.map((s) => s.name).join('   •   ')}
          </p>
        </Section>
      )}
    </div>
  );
};

export default ResumeTemplateClassic;