import { Header, Footer } from '../components/Layout';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ToolSidebarAd, InlineAd } from '../components/Ads';

export const UuidGenerator = () => `
  ${Header()}
  <main class="fade-in">
    <div style="max-width: 1000px; margin: 0 auto;">
       ${Breadcrumbs('UUID Generator')}
       <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 2rem;">
        <h1>UUID Generator</h1>
      </div>

      <div style="display: flex; gap: 2rem; flex-wrap: wrap;">
        <div style="flex: 1; min-width: 300px;">
          <div class="card">
            <div style="display: flex; gap: 1rem; align-items: flex-end; margin-bottom: 1.5rem;">
              <div style="flex: 1;">
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">How many UUIDs?</label>
                <input type="number" id="uuid-count" min="1" max="50" value="1" 
                 style="width: 100%; padding: 0.6em; border: 1px solid var(--border); border-radius: 8px; font-size: 1rem;">
              </div>
              <button id="btn-generate" style="min-width: 120px;">Generate</button>
               <button id="btn-copy" class="secondary" style="min-width: 120px;">Copy All</button>
            </div>

            <textarea 
              id="uuid-output" 
              readonly
              style="width: 100%; height: 300px; padding: 1rem; border: 1px solid var(--border); border-radius: 8px; font-family: monospace; font-size: 1rem; resize: vertical; box-sizing: border-box; background: #f8fafc;"
            ></textarea>
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

export function initUuidGenerator() {
  const output = document.getElementById('uuid-output') as HTMLTextAreaElement;
  const countInput = document.getElementById('uuid-count') as HTMLInputElement;
  const btnGenerate = document.getElementById('btn-generate');
  const btnCopy = document.getElementById('btn-copy');

  const generateUuid = () => {
    // Basic V4 UUID implementation
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  };

  if (output && countInput && btnGenerate) {

    const generate = () => {
      const count = Math.max(1, Math.min(50, parseInt(countInput.value) || 1));
      let result = [];
      for (let i = 0; i < count; i++) {
        result.push(generateUuid());
      }
      output.value = result.join('\n');
    };

    btnGenerate.addEventListener('click', generate);
    generate(); // Initial run
  }

  if (btnCopy && output) {
    btnCopy.addEventListener('click', () => {
      output.select();
      navigator.clipboard.writeText(output.value);
      const original = btnCopy.textContent;
      btnCopy.textContent = 'Copied!';
      setTimeout(() => btnCopy.textContent = original, 2000);
    });
  }
}
