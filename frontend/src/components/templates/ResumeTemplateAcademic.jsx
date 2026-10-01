const linkHref = (val = '') => {
  if (!val) return '';
  if (val.includes('@')) return `mailto:${val}`;
  return /^https?:\/\//.test(val) ? val : `https://${val}`;
};

const Section = ({ title, children, accentColor }) => (
  <div style={{ marginBottom: '15px' }}>
    <h2 style={{ fontSize: '13px', fontWeight: 700, fontStyle: 'italic', color: accentColor, marginBottom: '7px', borderBottom: `1px solid ${accentColor}`, paddingBottom: '3px' }}>{title}</h2>
    {children}
  </div>
);

const ResumeTemplateAcademic = ({ resume, accentColor = '#7f1d1d' }) => {
  const r = resume || {};
  const contactParts = [r.contactEmail, r.contactPhone, r.location, r.websiteLink].filter(Boolean);

  return (
    <div style={{
      fontFamily: "'Times New Roman', Georgia, serif", color: '#1a1a1a', background: '#fff',
      borderTop: `8px solid ${accentColor}`,
      padding: '34px 44px', width: '100%', maxWidth: '800px', margin: '0 auto', fontSize: '13px', lineHeight: 1.5,
    }}>
      <div style={{ textAlign: 'center', marginBottom: '18px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: 700, margin: 0, color: accentColor }}>{r.fullName || 'Your Name'}</h1>
        {contactParts.length > 0 && (
          <p style={{ fontSize: '11.5px', color: '#333', marginTop: '5px' }}>
            {contactParts.map((v, i) => (
              <span key={i}>
                <a href={linkHref(v)} target="_blank" rel="noopener noreferrer" style={{ color: '#333' }}>{v}</a>
                {i < contactParts.length - 1 && <span style={{ margin: '0 6px' }}>·</span>}
              </span>
            ))}
          </p>
        )}
      </div>

      {r.education?.length > 0 && (
        <Section title="Education" accentColor={accentColor}>
          {r.education.map((e, i) => (
            <div key={i} style={{ marginBottom: '6px', display: 'flex', justifyContent: 'space-between' }}>
              <div><strong>{e.institution}</strong>, {e.degree}</div>
              <div style={{ color: '#444' }}>{e.startYear} – {e.endYear || e.year}</div>
            </div>
          ))}
        </Section>
      )}

      {r.bio && <Section title="Research Interests" accentColor={accentColor}><p style={{ margin: 0 }}>{r.bio}</p></Section>}

      {r.projects?.length > 0 && (
        <Section title="Publications & Research Projects" accentColor={accentColor}>
          {r.projects.map((p, i) => (
            <div key={i} style={{ marginBottom: '7px' }}>
              <em>{p.title}</em>{p.techStack?.length > 0 && ` — ${p.techStack.join(', ')}`}
              {p.description && <div style={{ marginTop: '2px' }}>{p.description}</div>}
            </div>
          ))}
        </Section>
      )}

      {r.experience?.length > 0 && (
        <Section title="Academic & Research Experience" accentColor={accentColor}>
          {r.experience.map((x, i) => (
            <div key={i} style={{ marginBottom: '9px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <strong>{x.title}, {x.company}</strong>
                <span style={{ color: '#444' }}>{x.startYear} – {x.endYear}</span>
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

      {r.skills?.length > 0 && (
        <Section title="Technical & Research Skills" accentColor={accentColor}>
          <p style={{ margin: 0 }}>{r.skills.map((s) => s.name).join(', ')}</p>
        </Section>
      )}
    </div>
  );
};

export default ResumeTemplateAcademic;