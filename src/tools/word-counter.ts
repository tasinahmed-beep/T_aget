import { Header, Footer } from '../components/Layout';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ToolSidebarAd, InlineAd } from '../components/Ads';

export const WordCounter = () => `
  ${Header()}
  <main class="fade-in">
    <div style="max-width: 900px; margin: 0 auto;">
      ${Breadcrumbs('Word Counter')}
      <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 2rem;">
        <h1>Word & Character Counter</h1>
      </div>

      <div style="display: flex; gap: 2rem; flex-wrap: wrap;">
        <div style="flex: 1; min-width: 300px;">
          <div class="card">
            <textarea id="text-input" placeholder="Start typing or paste your text here..." style="width: 100%; height: 200px; padding: 1rem; border: 1px solid var(--border); border-radius: 8px; font-size: 1.1rem; resize: vertical; margin-bottom: 2rem;"></textarea>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1.5rem; text-align: center;">
              <div style="background: #f8fafc; padding: 1rem; border-radius: 8px;">
                <div id="word-count" style="font-size: 2.5rem; font-weight: 700; color: var(--primary);">0</div>
                <div style="color: var(--text-muted);">Words</div>
              </div>
              <div style="background: #f8fafc; padding: 1rem; border-radius: 8px;">
                <div id="char-count" style="font-size: 2.5rem; font-weight: 700; color: var(--primary);">0</div>
                <div style="color: var(--text-muted);">Characters</div>
              </div>
              <div style="background: #f8fafc; padding: 1rem; border-radius: 8px;">
                <div id="sentence-count" style="font-size: 2.5rem; font-weight: 700; color: var(--primary);">0</div>
                <div style="color: var(--text-muted);">Sentences</div>
              </div>
            </div>

            <div style="margin-top: 2rem; border-top: 1px solid var(--border); padding-top: 2rem;">
                <div style="display: flex; gap: 2rem; flex-wrap: wrap;">
                     <div style="flex: 1;">
                         <h3 style="margin-top: 0; font-size: 1.1rem;">Stats</h3>
                         <p>Reading Time: <span id="reading-time" style="font-weight: 600;">0 min</span></p>
                         <p>Speaking Time: <span id="speaking-time" style="font-weight: 600;">0 min</span></p>
                     </div>
                     <div style="flex: 1;">
                          <h3 style="margin-top: 0; font-size: 1.1rem;">Top Keywords</h3>
                          <div id="keywords-list" style="display: flex; gap: 0.5rem; flex-wrap: wrap;"></div>
                     </div>
                </div>
            </div>
          </div>

          <!-- Inline Ad below tool -->
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

export function initWordCounter() {
  const textarea = document.getElementById('text-input') as HTMLTextAreaElement;
  const wordCount = document.getElementById('word-count');
  const charCount = document.getElementById('char-count');
  const sentenceCount = document.getElementById('sentence-count');
  const readingTime = document.getElementById('reading-time');
  const speakingTime = document.getElementById('speaking-time');
  const keywordsList = document.getElementById('keywords-list');

  if (textarea && wordCount && charCount && sentenceCount) {
    const updateCounts = () => {
      const text = textarea.value;

      const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
      const chars = text.length;
      const sentences = text.trim() === '' ? 0 : text.split(/[.!?]+/).filter(x => x.trim().length > 0).length;

      wordCount.textContent = words.toLocaleString();
      charCount.textContent = chars.toLocaleString();
      sentenceCount.textContent = sentences.toLocaleString();

      if (readingTime) readingTime.textContent = `${Math.ceil(words / 200)} min`;
      if (speakingTime) speakingTime.textContent = `${Math.ceil(words / 130)} min`;

      if (keywordsList) {
        const wordArr = text.toLowerCase().match(/\b\w+\b/g) || [];
        const freq: Record<string, number> = {};
        const stopWords = new Set(['the', 'and', 'a', 'to', 'of', 'in', 'is', 'it', 'or', 'that', 'this', 'for', 'on', 'are', 'with', 'as', 'by', 'i', 'my', 'me', 'we', 'our', 'us', 'you', 'your', 'he', 'she', 'it', 'they']);

        wordArr.forEach(w => {
          if (!stopWords.has(w) && w.length > 2) freq[w] = (freq[w] || 0) + 1;
        });

        const sorted = Object.entries(freq).sort((a, b) => b[1] - a[1]).slice(0, 5);
        keywordsList.innerHTML = sorted.map(([w, c]) =>
          `<span style="background:#e2e8f0; padding:2px 8px; border-radius:12px; font-size:0.9em;">${w} (${c})</span>`
        ).join('');
      }
    };

    textarea.addEventListener('input', updateCounts);
  }
}
