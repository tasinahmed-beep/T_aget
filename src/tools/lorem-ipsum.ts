import { Header, Footer } from '../components/Layout';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ToolSidebarAd, InlineAd } from '../components/Ads';

export const LoremIpsum = () => `
  ${Header()}
  <main class="fade-in">
    <div style="max-width: 1000px; margin: 0 auto;">
       ${Breadcrumbs('Lorem Ipsum Generator')}
       <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 2rem;">
        <h1>Lorem Ipsum Generator</h1>
      </div>

      <div style="display: flex; gap: 2rem; flex-wrap: wrap;">
        <div style="flex: 1; min-width: 300px;">
          <div class="card">
            <div style="display: flex; gap: 1rem; align-items: flex-end; margin-bottom: 2rem; flex-wrap: wrap;">
              <div style="flex: 1; min-width: 200px;">
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Number of Paragraphs</label>
                <input type="number" id="lorem-count" min="1" max="20" value="3" 
                  style="width: 100%; padding: 0.6em; border: 1px solid var(--border); border-radius: 8px; font-size: 1rem;">
              </div>
              <button id="btn-generate" style="min-width: 120px;">Generate</button>
               <button id="btn-copy" class="secondary" style="min-width: 120px;">Copy Text</button>
            </div>

            <textarea 
              id="lorem-output" 
              readonly
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

const LOREM_TEXT = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit. Etiam tempor. Ut ullamcorper, ligula eu tempor congue, eros est euismod turpis, id tincidunt sapien risus a quam. Maecenas fermentum consequat mi. Donec fermentum. Pellentesque malesuada nulla a mi. Duis sapien sem, aliquet nec, commodo eget, consequat quis, neque.

Aliquam faucibus, elit ut dictum aliquet, felis nisl adipiscing sapien, sed malesuada diam lacus eget erat. Cras mollis scelerisque nunc. Nullam arcu. Aliquam consequat. Curabitur augue lorem, dapibus quis, laoreet et, pretium ac, nisi. Aenean magna nisl, mollis quis, molestie eu, feugiat in, orci. In hac habitasse platea dictumst. Fusce convallis metus id felis luctus adipiscing.`;

export function initLoremIpsum() {
  const output = document.getElementById('lorem-output') as HTMLTextAreaElement;
  const countInput = document.getElementById('lorem-count') as HTMLInputElement;
  const btnGenerate = document.getElementById('btn-generate');
  const btnCopy = document.getElementById('btn-copy');

  if (output && countInput && btnGenerate) {
    const paragraphs = LOREM_TEXT.split('\n\n');

    const generate = () => {
      const count = Math.max(1, Math.min(20, parseInt(countInput.value) || 1));
      let result = [];
      for (let i = 0; i < count; i++) {
        result.push(paragraphs[i % paragraphs.length]);
      }
      output.value = result.join('\n\n');
    };

    btnGenerate.addEventListener('click', generate);

    // Initial generation
    generate();
  }

  if (btnCopy && output) {
    btnCopy.addEventListener('click', () => {
      output.select();
      navigator.clipboard.writeText(output.value);
      const originalText = btnCopy.textContent;
      btnCopy.textContent = 'Copied!';
      setTimeout(() => btnCopy.textContent = originalText, 2000);
    });
  }
}
