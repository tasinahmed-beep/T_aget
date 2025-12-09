import { Header, Footer } from '../components/Layout';
import { Breadcrumbs } from '../components/Breadcrumbs';
// @ts-ignore
import * as Diff from 'diff';
import { ToolSidebarAd, InlineAd } from '../components/Ads';

export const DiffChecker = () => `
  ${Header()}
  <main class="fade-in">
    <div style="max-width: 1200px; margin: 0 auto;">
       ${Breadcrumbs('Text Diff Checker')}
       <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 2rem;">
        <h1>Text Diff Checker</h1>
      </div>

      <div style="display: flex; gap: 2rem; flex-wrap: wrap;">
        <div style="flex: 1; min-width: 300px;">
          <div class="card">
            <button id="btn-compare" style="margin-bottom: 1rem; width: 100%;">Compare Text</button>

            <div style="display: flex; gap: 2rem; margin-bottom: 2rem;">
               <div style="flex: 1;">
                  <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Original Text</label>
                  <textarea 
                    id="original-text" 
                    placeholder="Paste original text..." 
                    style="width: 100%; height: 300px; padding: 1rem; border: 1px solid var(--border); border-radius: 8px; font-family: monospace; resize: vertical; box-sizing: border-box; background: #fff0f0;"
                  ></textarea>
               </div>
               
               <div style="flex: 1;">
                  <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Changed Text</label>
                  <textarea 
                    id="changed-text" 
                    placeholder="Paste changed text..." 
                    style="width: 100%; height: 300px; padding: 1rem; border: 1px solid var(--border); border-radius: 8px; font-family: monospace; resize: vertical; box-sizing: border-box; background: #f0fff4;"
                  ></textarea>
               </div>
            </div>

            <h3 style="margin-bottom: 1rem;">Differences</h3>
            <div id="diff-result" style="padding: 1rem; border: 1px solid var(--border); border-radius: 8px; font-family: monospace; white-space: pre-wrap; background: #fff;">
                Click "Compare Text" to see results.
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

export function initDiffChecker() {
  const original = document.getElementById('original-text') as HTMLTextAreaElement;
  const changed = document.getElementById('changed-text') as HTMLTextAreaElement;
  const btnCompare = document.getElementById('btn-compare');
  const result = document.getElementById('diff-result');

  if (btnCompare && result) {
    btnCompare.addEventListener('click', () => {
      const diff = Diff.diffLines(original.value, changed.value);
      result.innerHTML = '';

      diff.forEach((part: any) => {
        const color = part.added ? '#dcfce7' : part.removed ? '#fee2e2' : 'transparent';
        const span = document.createElement('span');
        span.style.backgroundColor = color;
        span.style.display = 'block'; // Line by line
        span.appendChild(document.createTextNode(part.value));
        result.appendChild(span);
      });
    });
  }
}
