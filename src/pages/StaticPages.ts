import { Header, Footer } from '../components/Layout';
import { InlineAd, FooterBannerAd } from '../components/Ads';

export const AboutPage = () => `
  ${Header()}
  <main class="fade-in">
    <h1>About QuickTools</h1>
    <div class="card">
      <p>QuickTools is a collection of privacy-focused, client-side utilities designed for developers and content creators.</p>
      <p><strong>Private by Design:</strong> specialized tools run entirely in your browser. No data is ever sent to a server.</p>
      <p><strong>Open Source:</strong> Built with transparency and community in mind.</p>
    </div>
    ${InlineAd()}
    ${FooterBannerAd()}
  </main>
  ${Footer()}
`;

export const ContactPage = () => `
  ${Header()}
  <main class="fade-in">
    <h1>Contact Us</h1>
    <div class="card">
      <p>Have a suggestion or found a bug? We'd love to hear from you!</p>
      <form style="display: flex; flex-direction: column; gap: 1rem; max-width: 400px; margin-top: 1rem;">
        <div>
          <label style="display: block; margin-bottom: 0.5rem;">Name</label>
          <input type="text" style="width: 100%; padding: 0.5rem; border: 1px solid var(--border); border-radius: 4px;">
        </div>
        <div>
          <label style="display: block; margin-bottom: 0.5rem;">Email</label>
          <input type="email" style="width: 100%; padding: 0.5rem; border: 1px solid var(--border); border-radius: 4px;">
        </div>
        <div>
          <label style="display: block; margin-bottom: 0.5rem;">Message</label>
          <textarea rows="4" style="width: 100%; padding: 0.5rem; border: 1px solid var(--border); border-radius: 4px;"></textarea>
        </div>
        <button type="button" onclick="alert('Message sent! (Mock)')">Send Message</button>
      </form>
    </div>
    ${InlineAd()}
    ${FooterBannerAd()}
  </main>
  ${Footer()}
`;

export const PrivacyPage = () => `
  ${Header()}
  <main class="fade-in">
    <h1>Privacy Policy</h1>
    <div class="card">
      <h2>1. Introduction</h2>
      <p>Welcome to QuickTools. We respect your privacy and are committed to protecting your personal data.</p>
      
      <h2>2. Data Collection</h2>
      <p>We do not collect any personal data. All tools operate client-side within your browser. Input data is not transmitted to our servers.</p>
      
      <h2>3. Cookies</h2>
      <p>We use local storage to save your preferences (like theme settings) but do not use tracking cookies.</p>
      
      <h2>4. Third-Party Services</h2>
      <p>We use Google Firebase for authentication and hosting. Please refer to Google's Privacy Policy for more information.</p>
    </div>
    ${InlineAd()}
    ${FooterBannerAd()}
  </main>
  ${Footer()}
`;
