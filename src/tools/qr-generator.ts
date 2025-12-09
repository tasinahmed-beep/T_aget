import { Header, Footer } from '../components/Layout';
import { Breadcrumbs } from '../components/Breadcrumbs';
// @ts-ignore
import QRCode from 'qrcode';
import { ToolSidebarAd, InlineAd } from '../components/Ads';

export const QrGenerator = () => `
  ${Header()}
  <main class="fade-in">
    <div style="max-width: 1200px; margin: 0 auto;">
       ${Breadcrumbs('QR Code Generator')}
       <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 2rem;">
        <h1>QR Code Generator Pro</h1>
      </div>

       <div style="display: flex; gap: 2rem; flex-wrap: wrap;">
        <div style="flex: 1; min-width: 300px;">
          <div class="card" style="display: flex; gap: 2rem; flex-wrap: wrap;">
            
            <div style="flex: 1; min-width: 300px;">
                <!-- Tabs -->
                <div style="display: flex; gap: 0.5rem; margin-bottom: 1.5rem; border-bottom: 1px solid var(--border); padding-bottom: 0.5rem;">
                    <button class="tab-btn active" data-tab="text" style="padding: 0.5rem 1rem; border: none; background: none; font-weight: 600; cursor: pointer; color: var(--primary); border-bottom: 2px solid var(--primary);">Text/URL</button>
                    <button class="tab-btn" data-tab="wifi" style="padding: 0.5rem 1rem; border: none; background: none; cursor: pointer; color: var(--text-muted);">WiFi</button>
                    <button class="tab-btn" data-tab="vcard" style="padding: 0.5rem 1rem; border: none; background: none; cursor: pointer; color: var(--text-muted);">VCard</button>
                </div>

                <!-- Content Forms -->
                <div id="form-text" class="tab-content" style="display: block;">
                     <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Content</label>
                     <textarea id="qr-text" placeholder="https://example.com" style="width: 100%; height: 100px; padding: 0.8rem; border: 1px solid var(--border); border-radius: 8px;"></textarea>
                </div>

                <div id="form-wifi" class="tab-content" style="display: none;">
                     <div style="display: grid; gap: 1rem;">
                        <div>
                            <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Network Name (SSID)</label>
                            <input type="text" id="wifi-ssid" style="width: 100%; padding: 0.6rem; border: 1px solid var(--border); border-radius: 6px;">
                        </div>
                        <div>
                            <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Password</label>
                            <input type="text" id="wifi-pass" style="width: 100%; padding: 0.6rem; border: 1px solid var(--border); border-radius: 6px;">
                        </div>
                        <div>
                            <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Encryption</label>
                            <select id="wifi-type" style="width: 100%; padding: 0.6rem; border: 1px solid var(--border); border-radius: 6px;">
                                <option value="WPA">WPA/WPA2</option>
                                <option value="WEP">WEP</option>
                                <option value="nopass">No Encryption</option>
                            </select>
                        </div>
                     </div>
                </div>

                <div id="form-vcard" class="tab-content" style="display: none;">
                     <div style="display: grid; gap: 1rem;">
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                            <div>
                                 <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">First Name</label>
                                 <input type="text" id="vcard-first" style="width: 100%; padding: 0.6rem; border: 1px solid var(--border); border-radius: 6px;">
                            </div>
                            <div>
                                 <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Last Name</label>
                                 <input type="text" id="vcard-last" style="width: 100%; padding: 0.6rem; border: 1px solid var(--border); border-radius: 6px;">
                            </div>
                        </div>
                        <div>
                            <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Phone</label>
                            <input type="text" id="vcard-phone" style="width: 100%; padding: 0.6rem; border: 1px solid var(--border); border-radius: 6px;">
                        </div>
                         <div>
                            <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Email</label>
                            <input type="email" id="vcard-email" style="width: 100%; padding: 0.6rem; border: 1px solid var(--border); border-radius: 6px;">
                        </div>
                     </div>
                </div>

                <!-- Customization -->
                <div style="margin-top: 2rem;">
                    <h3 style="font-size: 1.1rem; margin-bottom: 1rem;">Style</h3>
                    <div style="display: flex; gap: 1rem;">
                        <div>
                            <label style="display: block; margin-bottom: 0.5rem; font-size: 0.9em;">Foreground</label>
                            <input type="color" id="qr-fg" value="#000000" style="width: 50px; height: 40px; border: none; cursor: pointer;">
                        </div>
                        <div>
                            <label style="display: block; margin-bottom: 0.5rem; font-size: 0.9em;">Background</label>
                            <input type="color" id="qr-bg" value="#ffffff" style="width: 50px; height: 40px; border: none; cursor: pointer;">
                        </div>
                    </div>
                </div>

            </div>

            <div style="flex: 1; min-width: 300px; display: flex; flex-direction: column; align-items: center; justify-content: center; background: #f8fafc; border-radius: 12px; padding: 2rem; border: 1px solid var(--border);">
              <canvas id="qr-canvas"></canvas>
              <button id="btn-download" class="secondary" style="margin-top: 1.5rem;">Download PNG</button>
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

export function initQrGenerator() {
  const canvas = document.getElementById('qr-canvas') as HTMLCanvasElement;
  const btnDownload = document.getElementById('btn-download');

  // Inputs
  const qrText = document.getElementById('qr-text') as HTMLTextAreaElement;
  const qrFg = document.getElementById('qr-fg') as HTMLInputElement;
  const qrBg = document.getElementById('qr-bg') as HTMLInputElement;

  // WiFi Inputs
  const wifiSsid = document.getElementById('wifi-ssid') as HTMLInputElement;
  const wifiPass = document.getElementById('wifi-pass') as HTMLInputElement;
  const wifiType = document.getElementById('wifi-type') as HTMLSelectElement;

  // VCard Inputs
  const vcardFirst = document.getElementById('vcard-first') as HTMLInputElement;
  const vcardLast = document.getElementById('vcard-last') as HTMLInputElement;
  const vcardPhone = document.getElementById('vcard-phone') as HTMLInputElement;
  const vcardEmail = document.getElementById('vcard-email') as HTMLInputElement;

  let currentTab = 'text';

  const getQrData = () => {
    if (currentTab === 'wifi') {
      const ssid = wifiSsid.value || '';
      const pass = wifiPass.value || '';
      const type = wifiType.value || 'WPA';
      // WIFI:S:<SSID>;T:<WPA|WEP|>;P:<password>;;
      return `WIFI:S:${ssid};T:${type};P:${pass};;`;
    } else if (currentTab === 'vcard') {
      const n = `${vcardLast.value};${vcardFirst.value}`;
      const fn = `${vcardFirst.value} ${vcardLast.value}`.trim();
      const tel = vcardPhone.value;
      const email = vcardEmail.value;
      return `BEGIN:VCARD\nVERSION:3.0\nN:${n}\nFN:${fn}\nTEL:${tel}\nEMAIL:${email}\nEND:VCARD`;
    } else {
      return qrText.value || 'https://example.com';
    }
  };

  const generate = () => {
    if (!canvas) return;
    const text = getQrData();
    QRCode.toCanvas(canvas, text, {
      width: 256,
      margin: 2,
      color: {
        dark: qrFg.value,
        light: qrBg.value
      }
    }, function (error: any) {
      if (error) console.error(error);
    });
  };

  // Event Listeners
  const inputs = [qrText, qrFg, qrBg, wifiSsid, wifiPass, wifiType, vcardFirst, vcardLast, vcardPhone, vcardEmail];
  inputs.forEach(el => {
    if (el) el.addEventListener('input', generate);
  });

  // Tab Logic
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      currentTab = target.dataset.tab!;

      // Update visual state
      document.querySelectorAll('.tab-btn').forEach(b => {
        (b as HTMLElement).style.color = 'var(--text-muted)';
        (b as HTMLElement).style.borderBottom = 'none';
      });
      target.style.color = 'var(--primary)';
      target.style.borderBottom = '2px solid var(--primary)';

      // Show specific form
      document.querySelectorAll('.tab-content').forEach(c => (c as HTMLElement).style.display = 'none');
      document.getElementById(`form-${currentTab}`)!.style.display = 'block';

      generate();
    });
  });

  generate(); // Initial

  if (btnDownload) {
    btnDownload.addEventListener('click', () => {
      const link = document.createElement('a');
      link.download = `qrcode-${currentTab}.png`;
      link.href = canvas.toDataURL();
      link.click();
    });
  }
}
