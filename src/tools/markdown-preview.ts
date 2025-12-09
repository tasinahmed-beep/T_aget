import { Header, Footer } from '../components/Layout';
import { Breadcrumbs } from '../components/Breadcrumbs';
// @ts-ignore
import { marked } from 'marked';
import { ToolSidebarAd, InlineAd } from '../components/Ads';

export const MarkdownPreview = () => `
  ${Header()}
  <main class="fade-in">
    <div style="max-width: 1400px; margin: 0 auto;">
       ${Breadcrumbs('Markdown Previewer')}
       <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 2rem;">
        <h1>Markdown Previewer</h1>
      </div>

      <div style="display: flex; gap: 2rem; flex-wrap: wrap;">
        <div style="flex: 1; min-width: 300px;">
          <div class="card">
            <div style="display: flex; gap: 0.5rem; margin-bottom: 1rem;">
               <button id="btn-copy-html" class="secondary" style="margin-left: auto;">Copy HTML</button>
               <button id="btn-clear" class="secondary">Clear</button>
            </div>

            <div style="display: flex; gap: 2rem; height: 600px; flex-direction: column; md:flex-row;">
               <div style="flex: 1; display: flex; flex-direction: column;">
                  <label style="margin-bottom: 0.5rem; font-weight: 500;">Markdown Input</label>
                  <textarea 
                    id="md-input" 
                    placeholder="# Hello World" 
                    style="flex: 1; padding: 1rem; border: 1px solid var(--border); border-radius: 8px; font-family: monospace; font-size: 0.9rem; resize: none; box-sizing: border-box; background: #f8fafc;"
                  ></textarea>
               </div>
               
               <div style="flex: 1; display: flex; flex-direction: column;">
                  <label style="margin-bottom: 0.5rem; font-weight: 500;">Live Preview</label>
                  <div 
                    id="md-preview"
                    style="flex: 1; padding: 1rem; border: 1px solid var(--border); border-radius: 8px; overflow-y: auto; background: white; "
                    class="markdown-body"
                  ></div>
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

export function initMarkdownPreview() {
  const input = document.getElementById('md-input') as HTMLTextAreaElement;
  const preview = document.getElementById('md-preview');
  const btnCopyHtml = document.getElementById('btn-copy-html');
  const btnClear = document.getElementById('btn-clear');

  if (input && preview) {

    const render = () => {
      const html = marked.parse(input.value);
      // @ts-ignore
      preview.innerHTML = html;
    };

    input.addEventListener('input', render);

    // Initial default
    input.value = `# Welcome to the Markdown Previewer!

- Type some Markdown on the left
- See the result on the right
- **Bold**, *Italic*, and \`code\` supported!

\`\`\`javascript
console.log('Hello Code!');
\`\`\`
`;
    render();

    if (btnClear) {
      btnClear.addEventListener('click', () => {
        input.value = '';
        render();
        input.focus();
      });
    }

    if (btnCopyHtml) {
      btnCopyHtml.addEventListener('click', () => {
        navigator.clipboard.writeText(preview.innerHTML);
        const original = btnCopyHtml.textContent;
        btnCopyHtml.textContent = 'Copied!';
        setTimeout(() => btnCopyHtml.textContent = original, 2000);
      });
    }
  }
}
