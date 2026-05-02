import './About.css';

const About = () => {
  return (
    <section id="about" className="about">
      <div className="container">
        <div className="about-content">
          <div className="about-text">
            <h2>Bearboom × BMFireworks</h2>
            <p className="lead">
              100% Legal • Premium Quality • Event-Ready Support
            </p>
            <p>
              Malaysia's licensed fireworks distributor operating four government-approved facilities across Johor and Perak states. We provide premium quality fireworks for celebrations, weddings, and corporate events with professional permit advisory and PDRM application guidance.
            </p>
            <div className="features">
              <div className="feature">
                <div className="feature-icon">✓</div>
                <div>
                  <h4>100% Legal & Licensed</h4>
                  <p>Government-approved facilities with all required permits</p>
                </div>
              </div>
              <div className="feature">
                <div className="feature-icon">✓</div>
                <div>
                  <h4>4 Distribution Centers</h4>
                  <p>Strategic locations in Seelong, Muar, Simpang Renggam & Ipoh</p>
                </div>
              </div>
              <div className="feature">
                <div className="feature-icon">✓</div>
                <div>
                  <h4>Event-Ready Support</h4>
                  <p>Permit advisory, custom branding & on-site coordination</p>
                </div>
              </div>
            </div>
          </div>
          <div className="about-image">
            <img src="/images/factory.jpg" alt="BMFireworks Factory Malaysia Government Licensed PDRM Approved Fireworks Facilities" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
