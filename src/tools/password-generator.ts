import { Header, Footer } from '../components/Layout';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ToolSidebarAd, InlineAd } from '../components/Ads';

export const PasswordGenerator = () => `
  ${Header()}
  <main class="fade-in">
    <div style="max-width: 1000px; margin: 0 auto;">
       ${Breadcrumbs('Password Generator')}
       <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 2rem;">
        <h1>Password Generator</h1>
      </div>

      <div style="display: flex; gap: 2rem; flex-wrap: wrap;">
        <div style="flex: 1; min-width: 300px;">
          <div class="card">
            <div style="display: flex; gap: 1rem; margin-bottom: 2rem;">
               <input 
                type="text" 
                id="password-output" 
                readonly 
                style="flex: 1; padding: 1rem; font-family: monospace; font-size: 1.2rem; border: 1px solid var(--border); border-radius: 8px; background: #f8fafc; color: var(--primary); font-weight: 600;"
              >
              <button id="btn-copy" class="secondary" style="font-size: 1.2rem; padding: 0 1.5rem;">📋</button>
              <button id="btn-generate" style="font-size: 1.2rem; padding: 0 1.5rem;">↻</button>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 2rem;">
              
              <div>
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Password Length: <span id="length-val">16</span></label>
                <input type="range" id="length-range" min="6" max="64" value="16" style="width: 100%;">
              </div>

              <div style="display: grid; gap: 0.8rem;">
                <label style="display: flex; items-center; gap: 0.5rem; cursor: pointer;">
                  <input type="checkbox" id="chk-upper" checked> Uppercase (A-Z)
                </label>
                <label style="display: flex; items-center; gap: 0.5rem; cursor: pointer;">
                  <input type="checkbox" id="chk-lower" checked> Lowercase (a-z)
                </label>
                <label style="display: flex; items-center; gap: 0.5rem; cursor: pointer;">
                  <input type="checkbox" id="chk-numbers" checked> Numbers (0-9)
                </label>
                <label style="display: flex; items-center; gap: 0.5rem; cursor: pointer;">
                  <input type="checkbox" id="chk-symbols" checked> Symbols (!@#$)
                </label>
                <div style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid var(--border);">
                   <label style="display: flex; items-center; gap: 0.5rem; cursor: pointer; font-weight: 500;">
                      <input type="checkbox" id="mode-memorable"> Memorable Mode (Words)
                   </label>
                   <p style="font-size: 0.8em; color: var(--text-muted); margin-top: 5px;">Example: Correct-Horse-Battery-Staple</p>
                </div>
              </div>
              
              <div style="grid-column: 1 / -1;">
                 <div style="height: 6px; background: #e2e8f0; border-radius: 3px; overflow: hidden; margin-top: 1rem;">
                    <div id="strength-bar" style="width: 0%; height: 100%; background: #ef4444; transition: all 0.3s;"></div>
                 </div>
                 <p id="strength-text" style="font-size: 0.8em; text-align: right; margin-top: 0.3rem; color: var(--text-muted);">Strength: Weak</p>
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

export function initPasswordGenerator() {
  const output = document.getElementById('password-output') as HTMLInputElement;
  const lengthRange = document.getElementById('length-range') as HTMLInputElement;
  const lengthVal = document.getElementById('length-val');
  const btnGenerate = document.getElementById('btn-generate');
  const btnCopy = document.getElementById('btn-copy');

  const chkUpper = document.getElementById('chk-upper') as HTMLInputElement;
  const chkLower = document.getElementById('chk-lower') as HTMLInputElement;
  const chkNumbers = document.getElementById('chk-numbers') as HTMLInputElement;
  const chkSymbols = document.getElementById('chk-symbols') as HTMLInputElement;
  const chkMemorable = document.getElementById('mode-memorable') as HTMLInputElement;

  const strengthBar = document.getElementById('strength-bar');
  const strengthText = document.getElementById('strength-text');

  // Mini dictionary for memorable mode
  const WORDS = ["apple", "brave", "crane", "drift", "eagle", "forest", "ghost", "house", "island", "jungle", "kite", "lemon", "moon", "nurse", "ocean", "piano", "quest", "river", "stone", "train", "unity", "video", "whale", "xray", "yoga", "zebra", "amber", "blue", "coral", "dawn", "echo", "flame", "gold", "harp", "iris", "jade", "kiwi", "luna", "mint", "nova", "olive", "pearl", "ruby", "star", "teal", "urban", "vivid", "wolf"];

  if (output && lengthRange && btnGenerate && chkMemorable) {

    const calculateStrength = (pwd: string) => {
      let score = 0;
      if (pwd.length > 8) score += 20;
      if (pwd.length > 12) score += 20;
      if (/[A-Z]/.test(pwd)) score += 15;
      if (/[a-z]/.test(pwd)) score += 15;
      if (/[0-9]/.test(pwd)) score += 15;
      if (/[^A-Za-z0-9]/.test(pwd)) score += 15;
      return Math.min(100, score);
    };

    const updateStrength = (pwd: string) => {
      const score = calculateStrength(pwd);
      if (strengthBar) {
        strengthBar.style.width = `${score}%`;
        if (score < 40) strengthBar.style.backgroundColor = '#ef4444'; // Red
        else if (score < 70) strengthBar.style.backgroundColor = '#f59e0b'; // Orange
        else strengthBar.style.backgroundColor = '#22c55e'; // Green
      }
      if (strengthText) strengthText.textContent = `Strength: ${score < 40 ? 'Weak' : score < 70 ? 'Moderate' : 'Strong'} (${score}%)`;
    };

    const generate = () => {
      const len = parseInt(lengthRange.value);
      if (lengthVal) lengthVal.textContent = len.toString();

      let password = '';

      if (chkMemorable.checked) {
        // Memorable logic: 3-5 words
        const wordCount = Math.max(3, Math.min(6, Math.floor(len / 4)));
        let words = [];
        for (let i = 0; i < wordCount; i++) {
          let w = WORDS[Math.floor(Math.random() * WORDS.length)];
          // Capitalize randomized
          if (Math.random() > 0.5) w = w.charAt(0).toUpperCase() + w.slice(1);
          words.push(w);
        }
        // Add random number
        words.push(Math.floor(Math.random() * 99).toString());
        password = words.join('-');
      } else {
        const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const lower = 'abcdefghijklmnopqrstuvwxyz';
        const numbers = '0123456789';
        const symbols = '!@#$%^&*()_+~`|}{[]:;?><,./-=';

        let chars = '';
        if (chkUpper.checked) chars += upper;
        if (chkLower.checked) chars += lower;
        if (chkNumbers.checked) chars += numbers;
        if (chkSymbols.checked) chars += symbols;

        if (chars === '') {
          output.value = 'Select at least one option';
          return;
        }

        for (let i = 0; i < len; i++) {
          password += chars.charAt(Math.floor(Math.random() * chars.length));
        }
      }

      output.value = password;
      updateStrength(password);
    };

    btnGenerate.addEventListener('click', generate);
    lengthRange.addEventListener('input', generate);
    [chkUpper, chkLower, chkNumbers, chkSymbols, chkMemorable].forEach(el => el.addEventListener('change', generate));

    // Copy
    if (btnCopy) {
      btnCopy.addEventListener('click', () => {
        output.select();
        navigator.clipboard.writeText(output.value);
        const original = btnCopy.textContent;
        btnCopy.textContent = 'Copied!';
        setTimeout(() => btnCopy.textContent = original, 2000);
      });
    }

    generate();
  }
}
