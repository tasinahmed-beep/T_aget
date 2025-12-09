import './style.css';
import { Router } from './router';
import { HomePage } from './pages/Home';
import { AboutPage, ContactPage, PrivacyPage } from './pages/StaticPages';
import { initAuthListeners } from './components/Layout';
import { WordCounter, initWordCounter } from './tools/word-counter';
import { CaseConverter, initCaseConverter } from './tools/case-converter';
import { LoremIpsum, initLoremIpsum } from './tools/lorem-ipsum';
import { JsonFormatter, initJsonFormatter } from './tools/json-formatter';
import { Base64Encoder, UrlEncoder, initEncoders } from './tools/encoders';

import { ColorPicker, initColorPicker } from './tools/color-picker';
import { PasswordGenerator, initPasswordGenerator } from './tools/password-generator';
import { UuidGenerator, initUuidGenerator } from './tools/uuid-generator';
import { QrGenerator, initQrGenerator } from './tools/qr-generator';

import { ImageConverter, initImageConverter } from './tools/image-tools';
import { MarkdownPreview, initMarkdownPreview } from './tools/markdown-preview';
import { UnitConverter, initUnitConverter } from './tools/unit-converter';
import { DiffChecker, initDiffChecker } from './tools/diff-checker';
import { HashGenerator, initHashGenerator } from './tools/hash-generator';
import { initSocialBar } from './components/Ads';

const app = document.querySelector<HTMLDivElement>('#app')!;
const router = new Router(app);

// Helper to attach listeners after render
const withListeners = (component: () => string, initFn?: () => void) => {
  return async () => {
    const html = component();
    setTimeout(() => {
      initAuthListeners();
      initSocialBar(); // Initialize Adsterra Social Bar on every page
      if (initFn) initFn();
    }, 0);
    return html;
  };
};

// Define Routes
router.addRoute('/', withListeners(HomePage), 'Home', 'Free online tools for everyone. Generate QR codes, convert images, pick colors, format JSON, and more.');
router.addRoute('/about', withListeners(AboutPage), 'About Us', 'Learn more about QuickTools and our mission.');
router.addRoute('/contact', withListeners(ContactPage), 'Contact', 'Get in touch with the QuickTools team.');
router.addRoute('/privacy', withListeners(PrivacyPage), 'Privacy Policy', 'Our commitment to your privacy and data security.');
router.addRoute('/word-counter', withListeners(WordCounter, initWordCounter), 'Word Counter', 'Count words, characters, and sentences with reading time analysis.');
router.addRoute('/case-converter', withListeners(CaseConverter, initCaseConverter), 'Case Converter', 'Convert text casing: uppercase, lowercase, title case, and more.');
router.addRoute('/lorem-ipsum', withListeners(LoremIpsum, initLoremIpsum), 'Lorem Ipsum Generator', 'Generate placeholder text for your designs.');
router.addRoute('/json-formatter', withListeners(JsonFormatter, initJsonFormatter), 'JSON Formatter & Validator', 'Prettify, minify, and validate JSON. Convert to/from CSV.');
router.addRoute('/base64-encoder', withListeners(Base64Encoder, initEncoders), 'Base64 Encoder/Decoder', 'Encode and decode Base64 strings.');
router.addRoute('/url-encoder', withListeners(UrlEncoder, initEncoders), 'URL Encoder/Decoder', 'Encode and decode URLs safely.');
router.addRoute('/color-picker', withListeners(ColorPicker, initColorPicker), 'Color Picker', 'Pick colors, generate palettes, and convert HEX/RGB/HSL/CMYK.');
router.addRoute('/password-generator', withListeners(PasswordGenerator, initPasswordGenerator), 'Password Generator', 'Generate strong, secure passwords with customizable options.');
router.addRoute('/uuid-generator', withListeners(UuidGenerator, initUuidGenerator), 'UUID Generator', 'Generate unique version 4 UUIDs.');
router.addRoute('/qr-generator', withListeners(QrGenerator, initQrGenerator), 'QR Code Generator', 'Create QR codes for text, URLs, WiFi, and VCards.');
router.addRoute('/image-converter', withListeners(ImageConverter, initImageConverter), 'Image Converter', 'Convert, resize, and compress images entirely in your browser.');
router.addRoute('/markdown-preview', withListeners(MarkdownPreview, initMarkdownPreview), 'Markdown Preview', 'Real-time Markdown editor and HTML exporter.');
router.addRoute('/unit-converter', withListeners(UnitConverter, initUnitConverter), 'Unit Converter', 'Convert common units of length, weight, data, and temperature.');
router.addRoute('/diff-checker', withListeners(DiffChecker, initDiffChecker), 'Difference Checker', 'Compare text files and highlight changes.');
router.addRoute('/hash-generator', withListeners(HashGenerator, initHashGenerator), 'Hash Generator', 'Calculate MD5, SHA-1, SHA-256 hashes securely.');


// Initialize
router.init();
