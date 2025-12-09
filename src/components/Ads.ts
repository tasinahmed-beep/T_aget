// Adsterra Smartlink Ad Component
// Smartlink URL: https://www.effectivegatecpm.com/cfh64ywrr?key=f961ce68b20f1f106806865b24096e89

const ADSTERRA_SMARTLINK = 'https://www.effectivegatecpm.com/cfh64ywrr?key=f961ce68b20f1f106806865b24096e89';

// Header Banner Ad (728x90 style)
export const HeaderBannerAd = () => `
  <div class="ad-container ad-header-banner">
    <a href="${ADSTERRA_SMARTLINK}" target="_blank" rel="noopener sponsored" class="ad-link ad-banner-728">
      <div class="ad-content">
        <span class="ad-icon">🚀</span>
        <div class="ad-text">
          <span class="ad-title">Boost Your Productivity</span>
          <span class="ad-subtitle">Discover premium tools & resources →</span>
        </div>
      </div>
    </a>
    <span class="ad-label">Ad</span>
  </div>
`;

// Sidebar Ad (300x250 style)
export const SidebarAd = () => `
  <div class="ad-container ad-sidebar">
    <a href="${ADSTERRA_SMARTLINK}" target="_blank" rel="noopener sponsored" class="ad-link ad-box-300">
      <div class="ad-content-vertical">
        <span class="ad-icon-large">💎</span>
        <span class="ad-title">Premium Offers</span>
        <span class="ad-subtitle">Exclusive deals await</span>
        <span class="ad-cta">Learn More</span>
      </div>
    </a>
    <span class="ad-label">Ad</span>
  </div>
`;

// Inline Ad (between content)
export const InlineAd = () => `
  <div class="ad-container ad-inline">
    <a href="${ADSTERRA_SMARTLINK}" target="_blank" rel="noopener sponsored" class="ad-link ad-inline-content">
      <div class="ad-content">
        <span class="ad-icon">⭐</span>
        <div class="ad-text">
          <span class="ad-title">Special Offer</span>
          <span class="ad-subtitle">Click here for amazing deals!</span>
        </div>
        <span class="ad-arrow">→</span>
      </div>
    </a>
    <span class="ad-label">Sponsored</span>
  </div>
`;

// Footer Banner Ad
export const FooterBannerAd = () => `
  <div class="ad-container ad-footer-banner">
    <a href="${ADSTERRA_SMARTLINK}" target="_blank" rel="noopener sponsored" class="ad-link ad-banner-footer">
      <div class="ad-content">
        <span class="ad-icon">🎯</span>
        <div class="ad-text">
          <span class="ad-title">Don't Miss Out!</span>
          <span class="ad-subtitle">Check out these exclusive offers today</span>
        </div>
        <span class="ad-cta-btn">Visit Now</span>
      </div>
    </a>
    <span class="ad-label">Advertisement</span>
  </div>
`;

// Sticky Bottom Ad (Mobile friendly)
export const StickyBottomAd = () => `
  <div class="ad-sticky-bottom" id="sticky-ad">
    <a href="${ADSTERRA_SMARTLINK}" target="_blank" rel="noopener sponsored" class="ad-link">
      <span class="ad-icon">🔥</span>
      <span class="ad-title">Hot Deals Available Now!</span>
      <span class="ad-cta-small">Check it out →</span>
    </a>
    <button class="ad-close" onclick="document.getElementById('sticky-ad').style.display='none'">×</button>
  </div>
`;

// Native Card Ad (blends with tool cards)
export const NativeCardAd = () => `
  <a href="${ADSTERRA_SMARTLINK}" target="_blank" rel="noopener sponsored" class="card ad-native-card" data-tags="ad sponsored">
    <div class="ad-native-badge">Sponsored</div>
    <h3 style="margin: 0; display: flex; align-items: center; gap: 0.5rem;">
      🎁 Exclusive Offers
    </h3>
    <p style="color: var(--text-muted); font-size: 0.9em;">Discover premium tools and amazing deals curated for you.</p>
  </a>
`;

// Tool Page Sidebar Ad
export const ToolSidebarAd = () => `
  <div class="ad-tool-sidebar">
    <div class="ad-container ad-sidebar-compact">
      <a href="${ADSTERRA_SMARTLINK}" target="_blank" rel="noopener sponsored" class="ad-link">
        <div class="ad-content-vertical">
          <span class="ad-badge">Recommended</span>
          <span class="ad-icon-medium">✨</span>
          <span class="ad-title-sm">Premium Resources</span>
          <span class="ad-subtitle-sm">Tools & offers for developers</span>
          <span class="ad-cta-sm">Explore →</span>
        </div>
      </a>
      <span class="ad-label">Ad</span>
    </div>
  </div>
`;

// Adsterra Social Bar Script - Auto-loads on page
export const SocialBarScript = () => `
  <div id="adsterra-social-bar"></div>
`;

// Function to initialize Adsterra Scripts (Social Bar + Popunder)
export function initSocialBar() {
  // Load Social Bar script
  if (!document.getElementById('adsterra-social-bar-script')) {
    const socialScript = document.createElement('script');
    socialScript.id = 'adsterra-social-bar-script';
    socialScript.type = 'text/javascript';
    socialScript.src = '//pl28222597.effectivegatecpm.com/3b/d2/06/3bd2068b413e4783447676e1069c4378.js';
    socialScript.async = true;
    document.body.appendChild(socialScript);
  }

  // Load Popunder script
  if (!document.getElementById('adsterra-popunder-script')) {
    const popunderScript = document.createElement('script');
    popunderScript.id = 'adsterra-popunder-script';
    popunderScript.type = 'text/javascript';
    popunderScript.src = '//pl28222646.effectivegatecpm.com/ae/45/df/ae45df930f60b7ad5459f9a8cfd052e9.js';
    popunderScript.async = true;
    document.body.appendChild(popunderScript);
  }
}
