import { Header, Footer } from '../components/Layout';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ToolSidebarAd, InlineAd } from '../components/Ads';

export const JsonFormatter = () => `
  ${Header()}
  <main class="fade-in">
    <div style="max-width: 1200px; margin: 0 auto;">
      ${Breadcrumbs('JSON Formatter')}
      <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 2rem;">
        <h1>JSON Formatter & Validator</h1>
      </div>

      <div style="display: flex; gap: 2rem; flex-wrap: wrap;">
        <div style="flex: 1; min-width: 300px;">
          <div class="card">
            <div style="display: flex; gap: 0.5rem; margin-bottom: 1rem; flex-wrap: wrap;">
               <button id="btn-format" style="flex: 1;">Format (Prettify)</button>
               <button id="btn-minify" class="secondary" style="flex: 1;">Minify</button>
               <button id="btn-json-csv" class="secondary" style="flex: 1;">JSON to CSV</button>
               <button id="btn-csv-json" class="secondary" style="flex: 1;">CSV to JSON</button>
               <button id="btn-copy" class="secondary">Copy</button>
               <button id="btn-clear" class="secondary">Clear</button>
            </div>

            <div style="display: grid; grid-template-columns: 1fr; gap: 1rem;">
               <div style="position: relative;">
                  <div id="error-msg" style="display: none; background: #fee2e2; color: #991b1b; padding: 0.5rem; border-radius: 4px; margin-bottom: 0.5rem; font-size: 0.9em;"></div>
                  <textarea 
                    id="json-input" 
                    placeholder="Paste your JSON (or CSV) here..." 
                    style="width: 100%; height: 500px; padding: 1rem; border: 1px solid var(--border); border-radius: 8px; font-family: monospace; font-size: 0.9rem; resize: vertical; box-sizing: border-box; background: #f8fafc; white-space: pre;"
                  ></textarea>
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

export function initJsonFormatter() {
  const input = document.getElementById('json-input') as HTMLTextAreaElement;
  const errorMsg = document.getElementById('error-msg') as HTMLDivElement;
  const btnFormat = document.getElementById('btn-format');
  const btnMinify = document.getElementById('btn-minify');
  const btnClear = document.getElementById('btn-clear');
  const btnCopy = document.getElementById('btn-copy');
  const btnJsonCsv = document.getElementById('btn-json-csv');
  const btnCsvJson = document.getElementById('btn-csv-json');

  if (input && errorMsg) {

    const showError = (msg: string) => {
      errorMsg.textContent = `Error: ${msg}`;
      errorMsg.style.display = 'block';
      input.style.borderColor = '#ef4444';
    };

    const clearError = () => {
      errorMsg.style.display = 'none';
      input.style.borderColor = 'var(--border)';
    };

    const getInput = () => input.value;
    const setOutput = (val: string) => {
      input.value = val;
      clearError();
    };

    const jsonToCsv = (jsonStr: string) => {
      try {
        const data = JSON.parse(jsonStr);
        const array = Array.isArray(data) ? data : [data];
        if (array.length === 0) return '';
        const headers = Object.keys(array[0]);
        const csv = [
          headers.join(','),
          ...array.map(row => headers.map(fieldName => JSON.stringify(row[fieldName], (_, value) => value === null ? '' : value)).join(','))
        ].join('\r\n');
        return csv;
      } catch (e) {
        throw new Error('Invalid JSON for CSV conversion. Must be an array of objects.');
      }
    };

    const csvToJson = (csvStr: string) => {
      const lines = csvStr.split('\n');
      if (lines.length < 2) return '[]';
      const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
      const result = lines.slice(1).filter(l => l.trim()).map(line => {
        const values = line.split(',').map(v => v.trim().replace(/^"|"$/g, ''));
        const obj: any = {};
        headers.forEach((h, i) => obj[h] = values[i]);
        return obj;
      });
      return JSON.stringify(result, null, 2);
    };

    btnFormat?.addEventListener('click', () => {
      try {
        const raw = getInput();
        if (!raw.trim()) return;
        const obj = JSON.parse(raw);
        setOutput(JSON.stringify(obj, null, 2));
      } catch (e) {
        showError((e as Error).message);
      }
    });

    btnMinify?.addEventListener('click', () => {
      try {
        const raw = getInput();
        if (!raw.trim()) return;
        const obj = JSON.parse(raw);
        setOutput(JSON.stringify(obj));
      } catch (e) {
        showError((e as Error).message);
      }
    });

    btnJsonCsv?.addEventListener('click', () => {
      try {
        setOutput(jsonToCsv(getInput()));
      } catch (e) {
        showError((e as Error).message);
      }
    });

    btnCsvJson?.addEventListener('click', () => {
      try {
        setOutput(csvToJson(getInput()));
      } catch (e) {
        showError((e as Error).message);
      }
    });

    btnClear?.addEventListener('click', () => {
      input.value = '';
      clearError();
      input.focus();
    });

    btnCopy?.addEventListener('click', () => {
      input.select();
      navigator.clipboard.writeText(input.value);
      const original = btnCopy.textContent;
      btnCopy.textContent = 'Copied!';
      setTimeout(() => btnCopy.textContent = original, 2000);
    });
  }
}
