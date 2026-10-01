const linkHref = (val = '') => {
  if (!val) return '';
  if (val.includes('@')) return `mailto:${val}`;
  if (/^\+?\d[\d\s-]{6,}$/.test(val)) return `tel:${val.replace(/\s/g, '')}`;
  return /^https?:\/\//.test(val) ? val : `https://${val}`;
};

const Section = ({ title, children, accentColor }) => (
  <div style={{ marginBottom: '16px' }}>
    <h2 style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: accentColor, marginBottom: '8px' }}>{title}</h2>
    <div style={{ borderTop: `1px solid ${accentColor}`, paddingTop: '8px' }}>{children}</div>
  </div>
);

const ResumeTemplateBusiness = ({ resume, accentColor = '#333333' }) => {
  const r = resume || {};
  const contactParts = [r.contactEmail, r.contactPhone, r.location, r.linkedinLink, r.websiteLink].filter(Boolean);

  return (
    <div style={{
      fontFamily: "'Helvetica Neue', Arial, sans-serif", color: '#111', background: '#fff',
      borderTop: `8px solid ${accentColor}`,
      padding: '36px 44px', width: '100%', maxWidth: '800px', margin: '0 auto', fontSize: '12.5px', lineHeight: 1.5,
    }}>
      <div style={{ marginBottom: '22px' }}>
        <h1 style={{ fontSize: '27px', fontWeight: 700, margin: 0, letterSpacing: '0.5px' }}>{r.fullName || 'Your Name'}</h1>
        {contactParts.length > 0 && (
          <p style={{ fontSize: '11px', color: '#555', marginTop: '6px' }}>
            {contactParts.map((v, i) => (
              <span key={i}>
                <a href={linkHref(v)} target="_blank" rel="noopener noreferrer" style={{ color: '#555', textDecoration: 'none' }}>{v}</a>
                {i < contactParts.length - 1 && <span style={{ margin: '0 8px' }}>|</span>}
              </span>
            ))}
          </p>
        )}
      </div>

      {r.bio && <Section title="Executive Summary" accentColor={accentColor}><p style={{ margin: 0 }}>{r.bio}</p></Section>}

      {r.experience?.length > 0 && (
        <Section title="Professional Experience" accentColor={accentColor}>
          {r.experience.map((x, i) => (
            <div key={i} style={{ marginBottom: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700 }}>
                <span>{x.title} · {x.company}</span>
                <span style={{ fontWeight: 400, color: '#666' }}>{x.startYear} – {x.endYear}</span>
              </div>
              {x.description && (
                <ul style={{ margin: '5px 0 0 16px', padding: 0 }}>
                  {x.description.split('\n').filter(Boolean).map((l, li) => <li key={li} style={{ marginBottom: '2px' }}>{l.replace(/^[-•▪]\s*/, '')}</li>)}
                </ul>
              )}
            </div>
          ))}
        </Section>
      )}

      {r.projects?.length > 0 && (
        <Section title="Key Initiatives" accentColor={accentColor}>
          {r.projects.map((p, i) => (
            <div key={i} style={{ marginBottom: '8px' }}>
              <strong>{p.title}</strong>
              {p.description && <p style={{ margin: '2px 0 0 0' }}>{p.description}</p>}
            </div>
          ))}
        </Section>
      )}

      {r.education?.length > 0 && (
        <Section title="Education" accentColor={accentColor}>
          {r.education.map((e, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
              <span><strong>{e.institution}</strong> — {e.degree}</span>
              <span style={{ color: '#666' }}>{e.startYear} – {e.endYear || e.year}</span>
            </div>
          ))}
        </Section>
      )}

      {r.skills?.length > 0 && (
        <Section title="Core Competencies" accentColor={accentColor}>
          <p style={{ margin: 0 }}>{r.skills.map((s) => s.name).join('   ·   ')}</p>
        </Section>
      )}
    </div>
  );
};

export default ResumeTemplateBusiness;