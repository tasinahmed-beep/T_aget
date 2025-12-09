import { Header, Footer } from '../components/Layout';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ToolSidebarAd, InlineAd } from '../components/Ads';

export const CaseConverter = () => `
  ${Header()}
  <main class="fade-in">
    <div style="max-width: 1000px; margin: 0 auto;">
       ${Breadcrumbs('Case Converter')}
       <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 2rem;">
        <h1>Case Converter</h1>
      </div>

      <div style="display: flex; gap: 2rem; flex-wrap: wrap;">
        <div style="flex: 1; min-width: 300px;">
          <div class="card">
            <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1rem;">
              <button id="btn-upper">UPPER CASE</button>
              <button id="btn-lower">lower case</button>
              <button id="btn-title">Title Case</button>
              <button id="btn-sentence">Sentence case</button>
              <button id="btn-alternating">aLtErNaTiNg cAsE</button>
              <button id="btn-inverse">iNVERSE cASE</button>
              <button id="btn-copy" class="secondary" style="margin-left: auto;">Copy Text</button>
              <button id="btn-clear" class="secondary">Clear</button>
            </div>

            <textarea 
              id="case-input" 
              placeholder="Type or paste your text here to convert..." 
              style="width: 100%; height: 300px; padding: 1rem; border: 1px solid var(--border); border-radius: 8px; font-family: inherit; font-size: 1rem; resize: vertical; box-sizing: border-box; background: #f8fafc;"
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

export function initCaseConverter() {
    const input = document.getElementById('case-input') as HTMLTextAreaElement;
    if (!input) return;

    const setContent = (text: string) => {
        input.value = text;
    };

    document.getElementById('btn-upper')?.addEventListener('click', () => {
        setContent(input.value.toUpperCase());
    });

    document.getElementById('btn-lower')?.addEventListener('click', () => {
        setContent(input.value.toLowerCase());
    });

    document.getElementById('btn-title')?.addEventListener('click', () => {
        setContent(input.value.replace(
            /\w\S*/g,
            (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
        ));
    });

    document.getElementById('btn-sentence')?.addEventListener('click', () => {
        setContent(input.value.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, c => c.toUpperCase()));
    });

    document.getElementById('btn-alternating')?.addEventListener('click', () => {
        let result = '';
        for (let i = 0; i < input.value.length; i++) {
            result += i % 2 === 0 ? input.value[i].toLowerCase() : input.value[i].toUpperCase();
        }
        setContent(result);
    });

    document.getElementById('btn-inverse')?.addEventListener('click', () => {
        let result = '';
        for (let i = 0; i < input.value.length; i++) {
            const char = input.value[i];
            result += char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase();
        }
        setContent(result);
    });

    document.getElementById('btn-clear')?.addEventListener('click', () => {
        setContent('');
        input.focus();
    });

    document.getElementById('btn-copy')?.addEventListener('click', () => {
        input.select();
        navigator.clipboard.writeText(input.value);
        const btn = document.getElementById('btn-copy');
        if (btn) {
            const originalText = btn.textContent;
            btn.textContent = 'Copied!';
            setTimeout(() => btn.textContent = originalText, 2000);
        }
    });
}
