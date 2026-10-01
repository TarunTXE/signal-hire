const Section = ({ title, children, accentColor }) => (
  <div style={{ marginBottom: '16px' }}>
    <h2 style={{
      fontSize: '12px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase',
      color: accentColor, marginBottom: '6px', fontFamily: "'Georgia', serif",
      borderBottom: `2px solid ${accentColor}`, paddingBottom: '4px',
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
  return /^https?:\/\//.test(val) ? val : `https://${val}`;
};

const ResumeTemplateMedical = ({ resume, accentColor = '#1e3a5f' }) => {
  const r = resume || {};
  const contactParts = [r.contactEmail, r.contactPhone, r.location].filter(Boolean);
  const linkParts = [r.githubLink, r.linkedinLink, r.websiteLink].filter(Boolean);

  return (
    <div style={{
      fontFamily: "'Georgia', 'Times New Roman', serif", color: '#1a1a1a', background: '#fff',
      borderTop: `8px solid ${accentColor}`,
      padding: '36px 44px', width: '100%', maxWidth: '800px', margin: '0 auto', fontSize: '13px', lineHeight: 1.5,
    }}>
      <div style={{ borderBottom: `3px solid ${accentColor}`, paddingBottom: '14px', marginBottom: '20px' }}>
        <h1 style={{ fontSize: '25px', fontWeight: 700, margin: 0, color: accentColor }}>{r.fullName || 'Your Name'}</h1>
        {contactParts.length > 0 && (
          <p style={{ fontSize: '11.5px', color: '#333', marginTop: '5px' }}>
            {contactParts.map((v, i) => (
              <span key={i}>
                <a href={linkHref(v)} style={{ color: '#333', textDecoration: 'none' }}>{v}</a>
                {i < contactParts.length - 1 && <span style={{ margin: '0 8px' }}>•</span>}
              </span>
            ))}
          </p>
        )}
        {linkParts.length > 0 && (
          <p style={{ fontSize: '11.5px', color: accentColor, marginTop: '3px' }}>
            {linkParts.map((v, i) => (
              <span key={i}>
                <a href={linkHref(v)} target="_blank" rel="noopener noreferrer" style={{ color: accentColor }}>{v}</a>
                {i < linkParts.length - 1 && <span style={{ margin: '0 8px', color: '#999' }}>|</span>}
              </span>
            ))}
          </p>
        )}
      </div>

      {r.bio && <Section title="Professional Profile" accentColor={accentColor}><p style={{ margin: 0 }}>{r.bio}</p></Section>}

      {r.education?.length > 0 && (
        <Section title="Education & Credentials" accentColor={accentColor}>
          {r.education.map((e, i) => (
            <div key={i} style={{ marginBottom: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <strong>{e.degree}</strong>
                <span style={{ color: '#555', fontStyle: 'italic' }}>{e.startYear} – {e.endYear || e.year}</span>
              </div>
              <div style={{ color: '#444' }}>{e.institution}{e.gpa && `  •  GPA: ${e.gpa}`}</div>
            </div>
          ))}
        </Section>
      )}

      {r.experience?.length > 0 && (
        <Section title="Clinical & Professional Experience" accentColor={accentColor}>
          {r.experience.map((x, i) => (
            <div key={i} style={{ marginBottom: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <strong>{x.title}</strong>
                <span style={{ color: '#555', fontStyle: 'italic' }}>{x.startYear} – {x.endYear}</span>
              </div>
              <div style={{ color: accentColor, fontWeight: 600 }}>{x.company}</div>
              {x.description && (
                <ul style={{ margin: '4px 0 0 16px', padding: 0 }}>
                  {x.description.split('\n').filter(Boolean).map((l, li) => <li key={li} style={{ marginBottom: '2px' }}>{l.replace(/^[-•▪]\s*/, '')}</li>)}
                </ul>
              )}
            </div>
          ))}
        </Section>
      )}

      {r.projects?.length > 0 && (
        <Section title="Research & Case Work" accentColor={accentColor}>
          {r.projects.map((p, i) => (
            <div key={i} style={{ marginBottom: '8px' }}>
              <strong>{p.title}</strong>
              {p.description && <p style={{ margin: '2px 0 0 0' }}>{p.description}</p>}
            </div>
          ))}
        </Section>
      )}

      {r.skills?.length > 0 && (
        <Section title="Certifications & Skills" accentColor={accentColor}>
          <p style={{ margin: 0 }}>{r.skills.map((s) => s.name).join('   •   ')}</p>
        </Section>
      )}
    </div>
  );
};

export default ResumeTemplateMedical;