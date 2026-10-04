export default function CtaBanner() {
  return (
    <section className="cta">
      <div className="wrap">
        <div className="cta__box">
          <div>
            <h2>Ready to grow with KALRO?</h2>
            <p>Join over thousands of trainees.</p>
          </div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', position: 'relative' }}>
            <a href="/register" className="btn btn--primary btn--lg">Create free account</a>
            <a href="/courses" className="btn btn--ghost btn--lg">Explore courses</a>
          </div>
        </div>
      </div>
    </section>
  );
}