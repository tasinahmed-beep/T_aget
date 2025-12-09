import { Header, Footer } from '../components/Layout';
import { Breadcrumbs } from '../components/Breadcrumbs';
// @ts-ignore
import CryptoJS from 'crypto-js';
import { ToolSidebarAd, InlineAd } from '../components/Ads';

export const HashGenerator = () => `
  ${Header()}
  <main class="fade-in">
    <div style="max-width: 1000px; margin: 0 auto;">
       ${Breadcrumbs('Hash Generator')}
       <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 2rem;">
        <h1>Hash Generator</h1>
      </div>

      <div style="display: flex; gap: 2rem; flex-wrap: wrap;">
        <div style="flex: 1; min-width: 300px;">
          <div class="card">
            <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Input Text</label>
            <textarea 
               id="hash-input" 
               placeholder="Enter text to hash..." 
               style="width: 100%; height: 100px; padding: 1rem; border: 1px solid var(--border); border-radius: 8px; font-family: monospace; box-sizing: border-box; margin-bottom: 2rem;"
            ></textarea>

            <div style="display: grid; gap: 1.5rem;">
               
               <div>
                   <label style="display: block; margin-bottom: 0.4rem; font-weight: 500;">MD5</label>
                   <div style="display: flex;">
                       <input type="text" id="md5-val" readonly style="flex: 1; padding: 0.6rem; border: 1px solid var(--border); border-radius: 6px 0 0 6px; font-family: monospace; background: #f8fafc;">
                       <button class="copy-btn" data-target="md5-val" style="border-radius: 0 6px 6px 0; padding: 0 0.8rem;">Copy</button>
                   </div>
               </div>

               <div>
                   <label style="display: block; margin-bottom: 0.4rem; font-weight: 500;">SHA-1</label>
                   <div style="display: flex;">
                       <input type="text" id="sha1-val" readonly style="flex: 1; padding: 0.6rem; border: 1px solid var(--border); border-radius: 6px 0 0 6px; font-family: monospace; background: #f8fafc;">
                       <button class="copy-btn" data-target="sha1-val" style="border-radius: 0 6px 6px 0; padding: 0 0.8rem;">Copy</button>
                   </div>
               </div>

               <div>
                   <label style="display: block; margin-bottom: 0.4rem; font-weight: 500;">SHA-256</label>
                   <div style="display: flex;">
                       <input type="text" id="sha256-val" readonly style="flex: 1; padding: 0.6rem; border: 1px solid var(--border); border-radius: 6px 0 0 6px; font-family: monospace; background: #f8fafc;">
                       <button class="copy-btn" data-target="sha256-val" style="border-radius: 0 6px 6px 0; padding: 0 0.8rem;">Copy</button>
                   </div>
               </div>

               <div>
                   <label style="display: block; margin-bottom: 0.4rem; font-weight: 500;">SHA-512</label>
                   <div style="display: flex;">
                       <input type="text" id="sha512-val" readonly style="flex: 1; padding: 0.6rem; border: 1px solid var(--border); border-radius: 6px 0 0 6px; font-family: monospace; background: #f8fafc;">
                       <button class="copy-btn" data-target="sha512-val" style="border-radius: 0 6px 6px 0; padding: 0 0.8rem;">Copy</button>
                   </div>
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

export function initHashGenerator() {
    const input = document.getElementById('hash-input') as HTMLTextAreaElement;
    const md5Val = document.getElementById('md5-val') as HTMLInputElement;
    const sha1Val = document.getElementById('sha1-val') as HTMLInputElement;
    const sha256Val = document.getElementById('sha256-val') as HTMLInputElement;
    const sha512Val = document.getElementById('sha512-val') as HTMLInputElement;

    if (input && md5Val) {
        input.addEventListener('input', () => {
            const val = input.value;
            if (val) {
                md5Val.value = CryptoJS.MD5(val).toString();
                sha1Val.value = CryptoJS.SHA1(val).toString();
                sha256Val.value = CryptoJS.SHA256(val).toString();
                sha512Val.value = CryptoJS.SHA512(val).toString();
            } else {
                md5Val.value = '';
                sha1Val.value = '';
                sha256Val.value = '';
                sha512Val.value = '';
            }
        });

        document.querySelectorAll('.copy-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const targetId = (e.target as HTMLElement).dataset.target;
                if (targetId) {
                    const el = document.getElementById(targetId) as HTMLInputElement;
                    el.select();
                    navigator.clipboard.writeText(el.value);
                    const original = btn.textContent;
                    btn.textContent = 'Copied!';
                    setTimeout(() => btn.textContent = original, 2000);
                }
            });
        });
    }
}
