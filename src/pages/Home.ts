import { Header, Footer } from '../components/Layout';
import { HeaderBannerAd, NativeCardAd, InlineAd, FooterBannerAd, StickyBottomAd } from '../components/Ads';

export const HomePage = () => `
  ${Header()}
  <main class="fade-in">
    <div class="hero">
      <h1 class="logo-text" style="font-size: 3.5rem; margin-bottom: 0.5rem;">QuickTools</h1>
      <p style="color: var(--text-muted); font-size: 1.25rem; max-width: 600px; margin: 0 auto;">
        Premium developer tools that run entirely in your browser. 
        <span style="color: var(--primary); font-weight: 500;">Private, Fast, and Free forever.</span>
      </p>

      <div class="search-container">
        <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input type="text" id="tool-search" class="search-input" placeholder="Search for tools (e.g., 'QR', 'Color', 'JSON')..." autofocus>
      </div>
    </div>

    <!-- Header Banner Ad -->
    ${HeaderBannerAd()}

    <div class="tool-grid" id="tool-grid">
      <!-- Tool Cards -->
      <a href="/qr-generator" class="card" data-tags="qr code wifi vcard scanner generator">
        <h3 style="margin: 0; display: flex; align-items: center; gap: 0.5rem;">
          📱 QR Code Pro
        </h3>
        <p style="color: var(--text-muted); font-size: 0.9em;">Create customizable QR codes for WiFi, URLs, and VCards.</p>
      </a>

      <a href="/color-picker" class="card" data-tags="color picker palette cmyk rgb hex hsl generator">
        <h3 style="margin: 0; display: flex; align-items: center; gap: 0.5rem;">
          🎨 Color Studio
        </h3>
        <p style="color: var(--text-muted); font-size: 0.9em;">Advanced color picker with palette generation and CMYK.</p>
      </a>

      <a href="/password-generator" class="card" data-tags="password secure generator random strong hash">
        <h3 style="margin: 0; display: flex; align-items: center; gap: 0.5rem;">
          🔐 Smart Password
        </h3>
        <p style="color: var(--text-muted); font-size: 0.9em;">Generate memorable or ultra-secure strong passwords.</p>
      </a>

      <!-- Native Card Ad (blends with tools) -->
      ${NativeCardAd()}

      <a href="/json-formatter" class="card" data-tags="json csv xml formatter validator converter pretty">
        <h3 style="margin: 0; display: flex; align-items: center; gap: 0.5rem;">
          { } JSON & CSV Hub
        </h3>
        <p style="color: var(--text-muted); font-size: 0.9em;">Validate JSON and convert between JSON/CSV formats.</p>
      </a>

      <a href="/word-counter" class="card" data-tags="word count character reading time speak analytics">
        <h3 style="margin: 0; display: flex; align-items: center; gap: 0.5rem;">
          📝 Word Analytics
        </h3>
        <p style="color: var(--text-muted); font-size: 0.9em;">Deep text analysis with reading time and keywords.</p>
      </a>

       <a href="/image-converter" class="card" data-tags="image convert resize compress png jpg webp">
        <h3 style="margin: 0; display: flex; align-items: center; gap: 0.5rem;">
          🖼️ Image Converter
        </h3>
        <p style="color: var(--text-muted); font-size: 0.9em;">Convert, resize, and compress images locally.</p>
      </a>

      <a href="/case-converter" class="card" data-tags="text case upper lower title capital converter">
        <h3 style="margin: 0; display: flex; align-items: center; gap: 0.5rem;">
          🔠 Case Converter
        </h3>
        <p style="color: var(--text-muted); font-size: 0.9em;">Convert text between different letter cases.</p>
      </a>

      <a href="/lorem-ipsum" class="card" data-tags="lorem ipsum placeholder text generator">
        <h3 style="margin: 0; display: flex; align-items: center; gap: 0.5rem;">
          📄 Lorem Ipsum
        </h3>
        <p style="color: var(--text-muted); font-size: 0.9em;">Generate placeholder text for your designs.</p>
      </a>

      <a href="/base64-encoder" class="card" data-tags="base64 encode decode string">
        <h3 style="margin: 0; display: flex; align-items: center; gap: 0.5rem;">
          🔒 Base64 Encoder
        </h3>
        <p style="color: var(--text-muted); font-size: 0.9em;">Encode and decode Base64 strings.</p>
      </a>

       <a href="/url-encoder" class="card" data-tags="url encode decode web link">
        <h3 style="margin: 0; display: flex; align-items: center; gap: 0.5rem;">
          🔗 URL Encoder
        </h3>
        <p style="color: var(--text-muted); font-size: 0.9em;">Encode and decode URLs efficiently.</p>
      </a>

      <a href="/uuid-generator" class="card" data-tags="uuid guid generator random unique id">
        <h3 style="margin: 0; display: flex; align-items: center; gap: 0.5rem;">
          🆔 UUID Generator
        </h3>
        <p style="color: var(--text-muted); font-size: 0.9em;">Generate random Version 4 UUIDs.</p>
      </a>

      <a href="/markdown-preview" class="card" data-tags="markdown editor preview html convert">
        <h3 style="margin: 0; display: flex; align-items: center; gap: 0.5rem;">
          📝 Markdown Preview
        </h3>
        <p style="color: var(--text-muted); font-size: 0.9em;">Live markdown editor and HTML exporter.</p>
      </a>

       <a href="/unit-converter" class="card" data-tags="unit convert length weight temp data">
        <h3 style="margin: 0; display: flex; align-items: center; gap: 0.5rem;">
          ⚖️ Unit Converter
        </h3>
        <p style="color: var(--text-muted); font-size: 0.9em;">Convert length, weight, data, and more.</p>
      </a>

       <a href="/diff-checker" class="card" data-tags="diff compare text file checker">
        <h3 style="margin: 0; display: flex; align-items: center; gap: 0.5rem;">
          🔍 Diff Checker
        </h3>
        <p style="color: var(--text-muted); font-size: 0.9em;">Compare text files to find differences.</p>
      </a>

       <a href="/hash-generator" class="card" data-tags="hash md5 sha crypto generator security">
        <h3 style="margin: 0; display: flex; align-items: center; gap: 0.5rem;">
          #️⃣ Hash Generator
        </h3>
        <p style="color: var(--text-muted); font-size: 0.9em;">Generate MD5, SHA-1, SHA-256 hashes.</p>
      </a>
    </div>

    <!-- Inline Ad -->
    ${InlineAd()}

    <!-- No Results Message -->
    <div id="no-results" style="display: none; text-align: center; color: var(--text-muted); padding: 2rem;">
        <p>No tools found matching your search. Try "json", "color", or "qr".</p>
    </div>

    <!-- Footer Banner Ad -->
    ${FooterBannerAd()}

  </main>
  ${Footer()}
  
  <!-- Sticky Bottom Ad -->
  ${StickyBottomAd()}
`;


// Helper to init search logic (can be called by Router)
export function initHomePage() {
  const searchInput = document.getElementById('tool-search');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const target = e.target as HTMLInputElement;
      const query = target.value.toLowerCase().trim();
      const cards = document.querySelectorAll('.card');
      const noResults = document.getElementById('no-results');
      let visibleCount = 0;

      cards.forEach(card => {
        const el = card as HTMLElement;
        const text = el.innerText.toLowerCase();
        const tags = el.getAttribute('data-tags') || '';
        const match = text.includes(query) || tags.includes(query);

        el.style.display = match ? 'block' : 'none';
        if (match) visibleCount++;
      });

      if (noResults) {
        noResults.style.display = visibleCount === 0 ? 'block' : 'none';
      }
    });
  }
}

