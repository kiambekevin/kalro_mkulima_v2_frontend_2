export default function HowItWorks() {
  return (
    <section className="section" id="how">
      <div className="wrap">
        <div className="section-head">
          <div>
            <h2>How it works</h2>
            <p>From sign-up to your first badge in four steps.</p>
          </div>
        </div>

        <ol className="steps" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
          <li className="step">
            <div className="step__num">1</div>
            <h3>Register free</h3>
            <p>Sign up with your phone number. Email is optional.</p>
          </li>
          <li className="step">
            <div className="step__num">2</div>
            <h3>Pick a course or pathway</h3>
            <p>Take a single course or follow a full pathway.</p>
          </li>
          <li className="step">
            <div className="step__num">3</div>
            <h3>Learn and practise</h3>
            <p>Study online or offline, join field days and pass the assessment.</p>
          </li>
          <li className="step">
            <div className="step__num">
              <i className="fa-solid fa-award" />
              <span className="sr-only">4</span>
            </div>
            <h3>Earn your badge</h3>
            <p>Get a KALRO digital badge with a QR code you can share.</p>
          </li>
        </ol>

        <div className="offline" id="offline">
          <div>
            <h3>No internet? Keep learning.</h3>
            <p>Download a course when you have network, then learn anywhere. Progress syncs when you reconnect.</p>
          </div>
          <ul>
            <li><i className="fa-solid fa-check" /> Lessons, videos and notes in one tap</li>
            <li><i className="fa-solid fa-check" /> Take quizzes offline</li>
            <li><i className="fa-solid fa-check" /> About 15 MB per course</li>
          </ul>
          <div className="stores">
            <a href="#" className="store">
              <i className="fa-brands fa-google-play" />
              <span><small>Get it on</small><b>Google Play</b></span>
            </a>
            <a href="#" className="store">
              <i className="fa-brands fa-apple" />
              <span><small>Download on the</small><b>App Store</b></span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}