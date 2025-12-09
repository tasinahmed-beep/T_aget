import { Header, Footer } from '../components/Layout';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ToolSidebarAd, InlineAd } from '../components/Ads';

export const ColorPicker = () => `
  ${Header()}
  <main class="fade-in">
    <div style="max-width: 1000px; margin: 0 auto;">
      ${Breadcrumbs('Color Picker')}
      <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 2rem;">
        <h1>Color Studio</h1>
      </div>

      <div style="display: flex; gap: 2rem; flex-wrap: wrap;">
        <div style="flex: 1; min-width: 300px;">
          <div class="card">
            <div style="background: #f8fafc; padding: 1.5rem; border-radius: 12px; border: 1px solid var(--border); text-align: center; margin-bottom: 2rem;">
              <input type="color" id="color-input" value="#6366f1" style="width: 100px; height: 100px; border: none; cursor: pointer; background: none;">
              <p style="color: var(--text-muted); margin-top: 0.5rem; font-size: 0.9em;">Click to pick</p>
              <div id="color-preview" style="width: 100px; height: 100px; border-radius: 8px; background: #6366f1; margin: 1rem auto 0; box-shadow: var(--shadow-sm);"></div>
            </div>

            <div style="display: grid; gap: 1rem;">
              
              <div>
                <label style="display: block; margin-bottom: 0.4rem; font-weight: 500; font-size: 0.9rem;">HEX</label>
                <div style="display: flex;">
                  <input type="text" id="hex-value" value="#6366f1" style="flex: 1; padding: 0.6rem; border: 1px solid var(--border); border-radius: 6px 0 0 6px; font-family: monospace;">
                  <button class="copy-btn" data-target="hex-value" style="border-radius: 0 6px 6px 0; padding: 0 0.8rem;">Copy</button>
                </div>
              </div>

              <div>
                <label style="display: block; margin-bottom: 0.4rem; font-weight: 500; font-size: 0.9rem;">RGB</label>
                <div style="display: flex;">
                  <input type="text" id="rgb-value" value="rgb(99, 102, 241)" style="flex: 1; padding: 0.6rem; border: 1px solid var(--border); border-radius: 6px 0 0 6px; font-family: monospace;">
                  <button class="copy-btn" data-target="rgb-value" style="border-radius: 0 6px 6px 0; padding: 0 0.8rem;">Copy</button>
                </div>
              </div>

              <div>
                <label style="display: block; margin-bottom: 0.4rem; font-weight: 500; font-size: 0.9rem;">HSL</label>
                <div style="display: flex;">
                  <input type="text" id="hsl-value" value="hsl(239, 84%, 67%)" style="flex: 1; padding: 0.6rem; border: 1px solid var(--border); border-radius: 6px 0 0 6px; font-family: monospace;">
                  <button class="copy-btn" data-target="hsl-value" style="border-radius: 0 6px 6px 0; padding: 0 0.8rem;">Copy</button>
                </div>
              </div>

              <div>
                <label style="display: block; margin-bottom: 0.4rem; font-weight: 500; font-size: 0.9rem;">CMYK</label>
                <div style="display: flex;">
                  <input type="text" id="cmyk-value" value="cmyk(59%, 58%, 0%, 5%)" style="flex: 1; padding: 0.6rem; border: 1px solid var(--border); border-radius: 6px 0 0 6px; font-family: monospace;">
                  <button class="copy-btn" data-target="cmyk-value" style="border-radius: 0 6px 6px 0; padding: 0 0.8rem;">Copy</button>
                </div>
              </div>

            </div>

            <div style="margin-top: 3rem;">
              <h3 style="margin-bottom: 1rem;">Palette Generator</h3>
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(100px, 1fr)); gap: 1rem;" id="palette-container">
                <!-- Generated colors -->
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

export function initColorPicker() {
  const colorInput = document.getElementById('color-input') as HTMLInputElement;
  const colorPreview = document.getElementById('color-preview');
  const hexInput = document.getElementById('hex-value') as HTMLInputElement;
  const rgbInput = document.getElementById('rgb-value') as HTMLInputElement;
  const hslInput = document.getElementById('hsl-value') as HTMLInputElement;
  const cmykInput = document.getElementById('cmyk-value') as HTMLInputElement;
  const paletteContainer = document.getElementById('palette-container');

  if (colorInput && hexInput && rgbInput && hslInput && colorPreview && cmykInput && paletteContainer) {

    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : null;
    };

    const rgbToHsl = (r: number, g: number, b: number) => {
      r /= 255; g /= 255; b /= 255;
      const max = Math.max(r, g, b), min = Math.min(r, g, b);
      let h = 0, s, l = (max + min) / 2;

      if (max === min) {
        h = s = 0;
      } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
          case r: h = (g - b) / d + (g < b ? 6 : 0); break;
          case g: h = (b - r) / d + 2; break;
          case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
      }
      return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
    };

    const rgbToCmyk = (r: number, g: number, b: number) => {
      if (r === 0 && g === 0 && b === 0) return { c: 0, m: 0, y: 0, k: 100 };
      let c = 1 - (r / 255);
      let m = 1 - (g / 255);
      let y = 1 - (b / 255);
      const k = Math.min(c, Math.min(m, y));

      c = (c - k) / (1 - k);
      m = (m - k) / (1 - k);
      y = (y - k) / (1 - k);

      return {
        c: Math.round(c * 100),
        m: Math.round(m * 100),
        y: Math.round(y * 100),
        k: Math.round(k * 100)
      };
    };

    const hslToHex = (h: number, s: number, l: number) => {
      l /= 100;
      const a = s * Math.min(l, 1 - l) / 100;
      const f = (n: number) => {
        const k = (n + h / 30) % 12;
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color).toString(16).padStart(2, '0');
      };
      return `#${f(0)}${f(8)}${f(4)}`;
    };

    const generatePalette = (h: number, s: number, l: number) => {
      // Generate Triadic + Analogous
      const shifts = [0, 30, -30, 180, 120, 240];
      paletteContainer.innerHTML = '';

      shifts.forEach(shift => {
        let newH = (h + shift) % 360;
        if (newH < 0) newH += 360;
        const hex = hslToHex(newH, s, l);

        const div = document.createElement('div');
        div.style.minHeight = '80px';
        div.style.backgroundColor = hex;
        div.style.borderRadius = '8px';
        div.style.cursor = 'pointer';
        div.title = `Copy ${hex}`;
        div.style.position = 'relative';
        div.innerHTML = `<span style="font-size:0.8em; background:rgba(255,255,255,0.8); padding:2px 4px; border-radius:4px; position:absolute; bottom:5px; left:5px;">${hex}</span>`;

        div.addEventListener('click', () => {
          navigator.clipboard.writeText(hex);
          // Simple feedback
          div.style.transform = 'scale(0.95)';
          div.style.transition = 'transform 0.15s';
          setTimeout(() => div.style.transform = 'scale(1)', 150);
        });

        paletteContainer.appendChild(div);
      });
    };

    const updateValues = (hex: string) => {
      colorPreview.style.backgroundColor = hex;
      hexInput.value = hex;

      const rgb = hexToRgb(hex);
      if (rgb) {
        rgbInput.value = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
        const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
        hslInput.value = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
        const cmyk = rgbToCmyk(rgb.r, rgb.g, rgb.b);
        cmykInput.value = `cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`;

        generatePalette(hsl.h, hsl.s, hsl.l);
      }
    };

    colorInput.addEventListener('input', (e) => {
      updateValues((e.target as HTMLInputElement).value);
    });

    hexInput.addEventListener('change', (e) => {
      const val = (e.target as HTMLInputElement).value;
      if (/^#[0-9A-F]{6}$/i.test(val)) {
        colorInput.value = val;
        updateValues(val);
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

    // Initial generation
    updateValues(colorInput.value);
  }
}
