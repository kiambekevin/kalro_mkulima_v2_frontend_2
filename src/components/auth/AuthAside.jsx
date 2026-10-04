// src/components/auth/AuthAside.jsx
export default function AuthAside({ mode = 'login' }) {
  const isLogin = mode === 'login';

  return (
    <aside className="auth-aside">
      <div className="auth-aside__inner">
        <span className="auth-aside__tag">
          <i className="fa-solid fa-seedling" aria-hidden="true" />
          KALRO Mkulima
        </span>

        <h2>
          {isLogin
            ? 'Learn. Grow. Prosper.'
            : 'Join trainees across Kenya.'}
        </h2>

        <p>
          {isLogin
            ? 'Pick up where you left off — your badges, courses and progress are saved.'
            : 'Free, practical training on crops, livestock, climate-smart farming and agribusiness. Online or offline.'}
        </p>

        <ul className="auth-aside__points">
          <li>
            <i className="fa-solid fa-circle-check" aria-hidden="true" />
            101+ modules written by KALRO researchers
          </li>
          <li>
            <i className="fa-solid fa-circle-check" aria-hidden="true" />
            Verified digital badges you can share
          </li>
          <li>
            <i className="fa-solid fa-circle-check" aria-hidden="true" />
            Works offline on any phone
          </li>
          <li>
            <i className="fa-solid fa-circle-check" aria-hidden="true" />
            Available in English and Kiswahili
          </li>
        </ul>

        <div className="auth-aside__stats">
          <div><b>250K+</b><span>Trainees</span></div>
          <div><b>47</b><span>Counties</span></div>
          <div><b>99%</b><span>Badge issued upon completion</span></div>
        </div>

        <blockquote className="auth-aside__quote">
          “The dairy course alone lifted my milk yield from 8 to 15 litres a day.”
          <footer>
            <b>Wanjiku Muthoni</b>
            <span>Dairy farmer, Nakuru</span>
          </footer>
        </blockquote>
      </div>
    </aside>
  );
}