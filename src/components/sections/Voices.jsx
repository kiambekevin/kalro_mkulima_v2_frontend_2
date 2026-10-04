const voices = [
  { quote: 'Digital tools have changed everything from how we reach farmers to how farmers access markets and finance.', name: 'Kipkeu C', role: 'Agripreneur, Elgeyo-Marakwet', initials: 'KC', color: '#23804A' },
  { quote: 'When farmers feed each animal based on its needs, productivity rises, and costs go down it’s simple, but transformative', name: 'M Wambui', role: 'Extension, Laikipia', initials: 'MW', color: '#B7801A' },
  { quote: 'This model is not just transforming farms it is transforming lives', name: 'John S', role: 'Poultry, Laikipia', initials: 'AK', color: '#7A4A2A' },
];

export default function Voices() {
  return (
    <section className="section section--paper">
      <div className="wrap">
        <div className="section-head"><h2>What learners say</h2></div>
        <div className="voices">
          {voices.map((v) => (
            <figure className="voice" style={{ margin: 0 }} key={v.name}>
              <blockquote>{v.quote}</blockquote>
              <figcaption className="who">
                <span className="avatar" style={{ background: v.color }}>{v.initials}</span>
                <span><b>{v.name}</b><span>{v.role}</span></span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}