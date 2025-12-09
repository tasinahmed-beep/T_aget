import { Header, Footer } from '../components/Layout';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ToolSidebarAd, InlineAd } from '../components/Ads';

const EncoderTemplate = (title: string, idPrefix: string) => `
  ${Header()}
  <main class="fade-in">
    <div style="max-width: 1000px; margin: 0 auto;">
       ${Breadcrumbs(title)}
       <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 2rem;">
        <h1>${title}</h1>
      </div>

      <div style="display: flex; gap: 2rem; flex-wrap: wrap;">
        <div style="flex: 1; min-width: 300px;">
          <div class="card">
            <div style="display: grid; gap: 1.5rem;">
              
              <div>
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Input (Decoded)</label>
                <textarea id="${idPrefix}-decoded" style="width: 100%; height: 150px; padding: 0.8rem; border: 1px solid var(--border); border-radius: 8px; font-family: monospace; box-sizing: border-box;"></textarea>
              </div>

              <div style="display: flex; gap: 1rem; justify-content: center;">
                <button id="${idPrefix}-encode-btn">↓ Encode</button>
                <button id="${idPrefix}-decode-btn" class="secondary">↑ Decode</button>
              </div>

              <div>
                 <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Output (Encoded)</label>
                <textarea id="${idPrefix}-encoded" style="width: 100%; height: 150px; padding: 0.8rem; border: 1px solid var(--border); border-radius: 8px; font-family: monospace; box-sizing: border-box; background: #f1f5f9;"></textarea>
              </div>

            </div>
          </div>

          <!-- Inline Ad -->
          ${InlineAd()}
        </div>

        <!-- Sidebar Ad -->
        <div style="width: 300px; flex-shrink: 0;">
          ${ToolSidebarAd()}
        </div>
      </div>
    </div>
  </main>
  ${Footer()}
`;

export const Base64Encoder = () => EncoderTemplate('Base64 Encoder/Decoder', 'base64');
export const UrlEncoder = () => EncoderTemplate('URL Encoder/Decoder', 'url');

export function initEncoders() {
  // Base64 Logic
  const b64Decoded = document.getElementById('base64-decoded') as HTMLTextAreaElement;
  const b64Encoded = document.getElementById('base64-encoded') as HTMLTextAreaElement;

  if (b64Decoded && b64Encoded) {
    document.getElementById('base64-encode-btn')?.addEventListener('click', () => {
      try {
        b64Encoded.value = btoa(b64Decoded.value);
      } catch (e) {
        b64Encoded.value = "Error: Invalid input for Base64 encoding. Ensure you don't have unicode characters without proper handling.";
      }
    });

    document.getElementById('base64-decode-btn')?.addEventListener('click', () => {
      try {
        b64Decoded.value = atob(b64Encoded.value);
      } catch (e) {
        b64Decoded.value = "Error: Invalid Base64 string.";
      }
    });
  }

  // URL Logic
  const urlDecoded = document.getElementById('url-decoded') as HTMLTextAreaElement;
  const urlEncoded = document.getElementById('url-encoded') as HTMLTextAreaElement;

  if (urlDecoded && urlEncoded) {
    document.getElementById('url-encode-btn')?.addEventListener('click', () => {
      urlEncoded.value = encodeURIComponent(urlDecoded.value);
    });

    document.getElementById('url-decode-btn')?.addEventListener('click', () => {
      try {
        urlDecoded.value = decodeURIComponent(urlEncoded.value);
      } catch (e) {
        urlDecoded.value = "Error: Malformed URL sequence.";
      }
    });
  }
}
