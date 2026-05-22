import '../styles/ContactPage.css';

const ContactPage = () => {
  return (
    <section className="contact-page" id="contact">
      <div className="contact-page__grid">
        {/* Left Column */}
        <div className="contact-page__left">

          <div className="contact-page__heading-container">
            <h1 className="contact-page__heading">
              Want to<br />
              start<br />
              <em>a new.</em><br />
              project?
            </h1>
            <p className="contact-page__subheading">Or just say hello.</p>
            <div className="contact-page__deco-circle-small" />
          </div>
        </div>

        {/* Right Column */}
        <div className="contact-page__right">
          <div className="contact-page__email-container">
            <a href="mailto:info@chiaraluzzana.com" className="contact-page__email">
              sharvarimohite17@gmail.com
            </a>
          </div>

          <div className="contact-page__socials">
            <a href="#" className="contact-social-link">
              <svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M22.396 7.164c-.093 2.026-1.507 4.8-4.245 8.32C15.323 19.161 12.93 21 11.002 21c-1.256 0-2.24-1.124-2.952-3.371L6.096 7.544C5.54 5.565 4.793 4.57 3.856 4.57c-.168 0-1.026.541-2.57 1.62L0 4.734c1.867-1.572 3.526-3.084 4.97-4.536C6.721-.137 8.01-.161 8.841 1.09c1.07 1.621 1.488 4.093 1.255 7.416.711-2.022 1.776-3.38 3.197-4.076 1.157-.565 2.274-.636 3.35-.213 1.161.455 1.705 1.651 1.633 3.585l.12.363z" /></svg>
              Vimeo
            </a>
            <a href="#" className="contact-social-link">
              <svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" /></svg>
              Facebook
            </a>
            <a href="#" className="contact-social-link">
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              Instagram
            </a>
            <a href="#" className="contact-social-link">
              <svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.587 14.424c-.18.295-.563.387-.857.207-2.35-1.434-5.305-1.76-8.786-.963-.335.077-.67-.133-.746-.469-.077-.336.132-.67.469-.746 3.82-.873 7.058-.496 9.712 1.115.293.18.388.563.208.856zm1.226-2.733c-.225.367-.714.48-1.081.254-2.684-1.648-6.786-2.148-9.965-1.176-.406.124-.832-.105-.955-.512-.124-.406.106-.832.512-.955 3.65-1.116 8.18-.557 11.233 1.317.368.226.48.714.256 1.072zm.116-2.855c-3.21-1.905-8.5-2.078-11.55-1.152-.486.148-1.002-.127-1.15-.613-.147-.486.126-1.002.612-1.15 3.51-1.066 9.35-.87 13.045 1.32.436.26.577.838.318 1.275-.26.436-.837.578-1.275.32z" /></svg>
              Spotify
            </a>
          </div>

          <div className="contact-page__newsletter">
            <h3>Newsletter</h3>
            <div className="contact-page__input-group">
              <input type="email" placeholder="Email Address" />
              <button type="submit" aria-label="Subscribe">
                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="1" fill="none">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative large elements from image corners */}
      <div className="contact-page__deco-top-right"></div>
      <div className="contact-page__deco-bottom-right"></div>
    </section>
  );
};

export default ContactPage;
