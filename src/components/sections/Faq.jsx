const faqs = [
  { q: 'Is KALRO Mkulima really free?', a: 'Yes. All courses, assessments and badges are free. The platform is funded by KALRO and its partners as a public service to farmers.', open: true },
  { q: 'Do I need internet to learn?', a: 'No. Download courses in the Android or iOS app and learn completely offline. Your progress syncs when you are back online.' },
  { q: 'How do I earn a badge?', a: 'Finish all lessons and pass the final assessment in a course or pathway. Blended courses also count your field-day attendance. Your badge appears in your profile straight away, ready to download or share.' },
  { q: 'Which languages are available?', a: 'English and Kiswahili, selectable at the top of every page. More local languages are being added, and many videos have Kiswahili subtitles.' },
  { q: 'Can my group or cooperative enrol together?', a: 'Yes. Farmer Producer Organizations, cooperatives and Common Interest Groups can register as a group and enrol members in bulk. Group admins get a shared dashboard to track progress.' },
];

export default function Faq() {
  return (
    <section className="section" id="faq">
      <div className="wrap faq-grid">
        <div className="faq-aside">
          <h2 style={{ fontSize: 'clamp(1.6rem,2.6vw,2.1rem)' }}>Questions and answers</h2>
          <p>Can’t find what you need? Call us free on 0800 721 741 or email info@kalro.org.</p>
          <a href="#" className="btn btn--ghost">Visit the help centre</a>
        </div>
        <div className="faq">
          {faqs.map((f) => (
            <details key={f.q} open={f.open}>
              <summary>
                {f.q} <i className="fa-solid fa-plus" />
              </summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}