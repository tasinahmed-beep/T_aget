import { Header, Footer } from '../components/Layout';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ToolSidebarAd, InlineAd } from '../components/Ads';

export const ImageConverter = () => `
  ${Header()}
  <main class="fade-in">
    <div style="max-width: 1000px; margin: 0 auto;">
       ${Breadcrumbs('Image Converter')}
       <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 2rem;">
        <h1>Image Converter & Compressor</h1>
      </div>

      <div style="display: flex; gap: 2rem; flex-wrap: wrap;">
        <div style="flex: 1; min-width: 300px;">
          <div class="card">
            <div style="text-align: center; border: 2px dashed var(--border); border-radius: 12px; padding: 3rem; background: #f8fafc; transition: all 0.2s;" id="drop-zone">
                <p style="color: var(--text-muted); margin-bottom: 1rem;">Drag & drop an image here, or click to select</p>
                <input type="file" id="image-input" accept="image/*" style="display: none;">
                <button id="btn-select" class="secondary">Select Image</button>
            </div>

            <div id="editor-area" style="display: none; margin-top: 2rem;">
                <div style="display: flex; gap: 2rem; flex-wrap: wrap; margin-bottom: 2rem;">
                    <div style="flex: 1; min-width: 250px;">
                        <h3 style="margin-top: 0;">Original</h3>
                        <img id="img-preview" style="max-width: 100%; border-radius: 8px; box-shadow: var(--shadow-sm);">
                        <p id="original-info" style="color: var(--text-muted); font-size: 0.9em; margin-top: 0.5rem;"></p>
                    </div>
                    
                    <div style="flex: 1; min-width: 250px; display: flex; flex-direction: column; gap: 1.5rem;">
                       <h3 style="margin-top: 0;">Settings</h3>
                       
                       <div>
                           <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Format</label>
                           <select id="format-select" style="width: 100%; padding: 0.6rem; border: 1px solid var(--border); border-radius: 6px;">
                               <option value="image/png">PNG</option>
                               <option value="image/jpeg">JPEG</option>
                               <option value="image/webp">WEBP</option>
                           </select>
                       </div>

                       <div>
                           <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Quality (0.1 - 1.0)</label>
                           <input type="range" id="quality-range" min="0.1" max="1.0" step="0.1" value="0.9" style="width: 100%;">
                           <span id="quality-val" style="font-size: 0.9em; color: var(--text-muted);">0.9</span>
                       </div>

                        <div>
                           <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Resize (Width)</label>
                           <input type="number" id="width-input" placeholder="Original" style="width: 100%; padding: 0.6rem; border: 1px solid var(--border); border-radius: 6px;">
                       </div>

                       <button id="btn-process">Process & Download</button>
                       <div id="process-result" style="display: none; margin-top: 1rem; color: var(--primary);">Processing complete! Downloading...</div>
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

export function initImageConverter() {
    const input = document.getElementById('image-input') as HTMLInputElement;
    const btnSelect = document.getElementById('btn-select');
    const dropZone = document.getElementById('drop-zone');
    const editorArea = document.getElementById('editor-area');
    const imgPreview = document.getElementById('img-preview') as HTMLImageElement;
    const originalInfo = document.getElementById('original-info');

    const formatSelect = document.getElementById('format-select') as HTMLSelectElement;
    const qualityRange = document.getElementById('quality-range') as HTMLInputElement;
    const qualityVal = document.getElementById('quality-val');
    const widthInput = document.getElementById('width-input') as HTMLInputElement;
    const btnProcess = document.getElementById('btn-process');
    const processResult = document.getElementById('process-result');

    let currentFile: File | null = null;

    const handleFile = (file: File) => {
        if (!file.type.startsWith('image/')) {
            alert('Please upload an image file');
            return;
        }
        currentFile = file;
        const reader = new FileReader();
        reader.onload = (e) => {
            if (e.target && typeof e.target.result === 'string') {
                imgPreview.src = e.target.result;
                if (editorArea) editorArea.style.display = 'block';
                // Reset settings
                widthInput.value = '';

                // Get dimensions
                const img = new Image();
                img.onload = () => {
                    if (originalInfo) originalInfo.textContent = `${file.name} (${(file.size / 1024).toFixed(1)} KB) - ${img.width}x${img.height}`;
                    widthInput.placeholder = img.width.toString();
                };
                img.src = e.target.result;
            }
        };
        reader.readAsDataURL(file);
    };

    if (btnSelect && input) {
        btnSelect.addEventListener('click', () => input.click());
        input.addEventListener('change', (e) => {
            const files = (e.target as HTMLInputElement).files;
            if (files && files.length > 0) handleFile(files[0]);
        });
    }

    if (dropZone) {
        dropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropZone.style.borderColor = 'var(--primary)';
        });
        dropZone.addEventListener('dragleave', (e) => {
            e.preventDefault();
            dropZone.style.borderColor = 'var(--border)';
        });
        dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropZone.style.borderColor = 'var(--border)';
            if (e.dataTransfer && e.dataTransfer.files.length > 0) {
                handleFile(e.dataTransfer.files[0]);
            }
        });
    }

    if (qualityRange && qualityVal) {
        qualityRange.addEventListener('input', () => {
            qualityVal.textContent = qualityRange.value;
        });
    }

    if (btnProcess) {
        btnProcess.addEventListener('click', () => {
            if (!currentFile || !imgPreview.src) return;

            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const img = new Image();

            img.onload = () => {
                let width = parseInt(widthInput.value) || img.width;
                // Preserve aspect ratio
                let height = (width / img.width) * img.height;

                canvas.width = width;
                canvas.height = height;

                if (ctx) {
                    ctx.fillStyle = '#ffffff'; // Prevent transparency turning black for jpg
                    ctx.fillRect(0, 0, width, height);
                    ctx.drawImage(img, 0, 0, width, height);

                    const format = formatSelect.value;
                    const quality = parseFloat(qualityRange.value);

                    const dataUrl = canvas.toDataURL(format, quality);

                    const link = document.createElement('a');
                    link.download = `converted.${format.split('/')[1]}`;
                    link.href = dataUrl;
                    link.click();

                    if (processResult) {
                        processResult.style.display = 'block';
                        setTimeout(() => processResult.style.display = 'none', 3000);
                    }
                }
            };
            img.src = imgPreview.src;
        });
    }
}
