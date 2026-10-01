const linkHref = (val = '') => {
  if (!val) return '';
  if (val.includes('@')) return `mailto:${val}`;
  if (/^\+?\d[\d\s-]{6,}$/.test(val)) return `tel:${val.replace(/\s/g, '')}`;
  return /^https?:\/\//.test(val) ? val : `https://${val}`;
};

const Section = ({ title, children, accentColor }) => (
  <div style={{ marginBottom: '16px' }}>
    <h2 style={{ fontSize: '12px', fontWeight: 800, letterSpacing: '1.5px', textTransform: 'uppercase', color: accentColor, marginBottom: '7px' }}>{title}</h2>
    {children}
  </div>
);

const ResumeTemplateCreative = ({ resume, accentColor = '#a855f7' }) => {
  const r = resume || {};
  const contactParts = [r.contactEmail, r.contactPhone, r.location, r.githubLink, r.linkedinLink, r.websiteLink].filter(Boolean);

  return (
    <div style={{
      fontFamily: "'Helvetica Neue', Arial, sans-serif", color: '#1a1a1a', background: '#fff',
      borderTop: `8px solid ${accentColor}`,
      padding: '36px 44px', width: '100%', maxWidth: '800px', margin: '0 auto', fontSize: '12.5px', lineHeight: 1.5,
    }}>
      <div style={{ borderLeft: `5px solid ${accentColor}`, paddingLeft: '16px', marginBottom: '22px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 800, margin: 0, color: '#1a1a1a' }}>{r.fullName || 'Your Name'}</h1>
        {contactParts.length > 0 && (
          <p style={{ fontSize: '11px', color: '#555', marginTop: '6px' }}>
            {contactParts.map((v, i) => (
              <span key={i}>
                <a href={linkHref(v)} target="_blank" rel="noopener noreferrer" style={{ color: '#555', textDecoration: 'none' }}>{v}</a>
                {i < contactParts.length - 1 && <span style={{ margin: '0 8px', color: accentColor }}>●</span>}
              </span>
            ))}
          </p>
        )}
      </div>

      {r.bio && <Section title="About" accentColor={accentColor}><p style={{ margin: 0 }}>{r.bio}</p></Section>}

      {r.projects?.length > 0 && (
        <Section title="Selected Work" accentColor={accentColor}>
          {r.projects.map((p, i) => (
            <div key={i} style={{ marginBottom: '10px', paddingLeft: '10px', borderLeft: '2px solid #eee' }}>
              <strong>{p.title}</strong>
              {p.techStack?.length > 0 && <span style={{ color: accentColor }}> · {p.techStack.join(', ')}</span>}
              {p.description && <p style={{ margin: '2px 0 0 0' }}>{p.description}</p>}
            </div>
          ))}
        </Section>
      )}

      {r.experience?.length > 0 && (
        <Section title="Experience" accentColor={accentColor}>
          {r.experience.map((x, i) => (
            <div key={i} style={{ marginBottom: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <strong>{x.title} — {x.company}</strong>
                <span style={{ color: '#888' }}>{x.startYear} – {x.endYear}</span>
              </div>
              {x.description && (
                <ul style={{ margin: '4px 0 0 16px', padding: 0 }}>
                  {x.description.split('\n').filter(Boolean).map((l, li) => <li key={li} style={{ marginBottom: '2px' }}>{l.replace(/^[-•▪]\s*/, '')}</li>)}
                </ul>
              )}
            </div>
          ))}
        </Section>
      )}

      {r.education?.length > 0 && (
        <Section title="Education" accentColor={accentColor}>
          {r.education.map((e, i) => (
            <div key={i} style={{ marginBottom: '5px' }}>
              <strong>{e.institution}</strong> — {e.degree} <span style={{ color: '#888' }}>({e.startYear}–{e.endYear || e.year})</span>
            </div>
          ))}
        </Section>
      )}

      {r.skills?.length > 0 && (
        <Section title="Skills" accentColor={accentColor}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {r.skills.map((s, i) => (
              <span key={i} style={{ background: '#f3e8ff', color: accentColor, padding: '3px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 600 }}>{s.name}</span>
            ))}
          </div>
        </Section>
      )}
    </div>
  );
};

export default ResumeTemplateCreative;