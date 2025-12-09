import { Header, Footer } from '../components/Layout';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ToolSidebarAd, InlineAd } from '../components/Ads';

const UNITS: Record<string, { [key: string]: number }> = {
    Length: {
        'Meter (m)': 1,
        'Kilometer (km)': 1000,
        'Centimeter (cm)': 0.01,
        'Millimeter (mm)': 0.001,
        'Mile (mi)': 1609.34,
        'Yard (yd)': 0.9144,
        'Foot (ft)': 0.3048,
        'Inch (in)': 0.0254
    },
    Weight: {
        'Kilogram (kg)': 1,
        'Gram (g)': 0.001,
        'Milligram (mg)': 0.000001,
        'Pound (lb)': 0.453592,
        'Ounce (oz)': 0.0283495,
        'Stone (st)': 6.35029
    },
    Data: {
        'Byte (B)': 1,
        'Kilobyte (KB)': 1024,
        'Megabyte (MB)': 1048576,
        'Gigabyte (GB)': 1073741824,
        'Terabyte (TB)': 1099511627776
    }
};

// Simplified Temp conversion logic handled separately
const TEMP_UNITS = ['Celsius', 'Fahrenheit', 'Kelvin'];

export const UnitConverter = () => `
  ${Header()}
  <main class="fade-in">
    <div style="max-width: 1000px; margin: 0 auto;">
       ${Breadcrumbs('Unit Converter')}
       <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 2rem;">
        <h1>Unit Converter</h1>
      </div>

      <div style="display: flex; gap: 2rem; flex-wrap: wrap;">
        <div style="flex: 1; min-width: 300px;">
          <div class="card">
             <div style="margin-bottom: 2rem;">
                 <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Category</label>
                 <div style="display: flex; gap: 0.5rem; overflow-x: auto; padding-bottom: 0.5rem;" id="category-tabs">
                     ${Object.keys(UNITS).concat(['Temperature']).map((cat, i) =>
    `<button class="cat-btn ${i === 0 ? '' : 'secondary'}" data-cat="${cat}">${cat}</button>`
).join('')}
                 </div>
             </div>

             <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
                 <div>
                     <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">From</label>
                     <select id="from-unit" style="width: 100%; padding: 0.6rem; border: 1px solid var(--border); border-radius: 6px; margin-bottom: 1rem;"></select>
                     <input type="number" id="from-val" value="1" style="width: 100%; padding: 0.8rem; border: 1px solid var(--border); border-radius: 6px; font-size: 1.1rem;">
                 </div>

                 <div style="display: flex; flex-direction: column; justify-content: flex-end;">
                     <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">To</label>
                     <select id="to-unit" style="width: 100%; padding: 0.6rem; border: 1px solid var(--border); border-radius: 6px; margin-bottom: 1rem;"></select>
                     <input type="number" id="to-val" readonly style="width: 100%; padding: 0.8rem; border: 1px solid var(--border); border-radius: 6px; background: #f8fafc; font-size: 1.1rem;">
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

export function initUnitConverter() {
    const fromUnit = document.getElementById('from-unit') as HTMLSelectElement;
    const toUnit = document.getElementById('to-unit') as HTMLSelectElement;
    const fromVal = document.getElementById('from-val') as HTMLInputElement;
    const toVal = document.getElementById('to-val') as HTMLInputElement;
    const catBtns = document.querySelectorAll('.cat-btn');

    let currentCat = 'Length';

    const populateUnits = () => {
        fromUnit.innerHTML = '';
        toUnit.innerHTML = '';

        let unitList = currentCat === 'Temperature' ? TEMP_UNITS : Object.keys(UNITS[currentCat]);

        unitList.forEach(u => {
            fromUnit.add(new Option(u, u));
            toUnit.add(new Option(u, u));
        });

        // Default selection different
        if (unitList.length > 1) toUnit.selectedIndex = 1;
    };

    const convert = () => {
        const val = parseFloat(fromVal.value);
        if (isNaN(val)) return;

        const from = fromUnit.value;
        const to = toUnit.value;
        let res = 0;

        if (currentCat === 'Temperature') {
            if (from === to) res = val;
            else if (from === 'Celsius') res = to === 'Fahrenheit' ? (val * 9 / 5) + 32 : val + 273.15;
            else if (from === 'Fahrenheit') res = to === 'Celsius' ? (val - 32) * 5 / 9 : (val - 32) * 5 / 9 + 273.15;
            else if (from === 'Kelvin') res = to === 'Celsius' ? val - 273.15 : (val - 273.15) * 9 / 5 + 32;
        } else {
            const base = val * UNITS[currentCat][from];
            res = base / UNITS[currentCat][to];
        }

        toVal.value = Number.isInteger(res) ? res.toString() : res.toFixed(6).replace(/\.?0+$/, '');
    };

    if (fromVal && fromUnit && toUnit) {
        populateUnits();
        convert();

        catBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                catBtns.forEach(b => {
                    b.classList.remove('primary'); // Assuming simple class toggle logic
                    b.classList.add('secondary');
                    // Re-apply primary style manually since class removal might mess up
                    (b as HTMLElement).style.backgroundColor = 'transparent';
                    (b as HTMLElement).style.color = 'var(--text-main)';
                    (b as HTMLElement).style.borderColor = 'var(--border)';
                });
                const el = e.target as HTMLElement;
                el.classList.remove('secondary');
                el.style.backgroundColor = 'var(--primary)';
                el.style.color = 'white';

                currentCat = el.dataset.cat!;
                populateUnits();
                convert();
            });
        });

        // Set initial active state style manually for first button
        const firstBtn = catBtns[0] as HTMLElement;
        if (firstBtn) {
            firstBtn.classList.remove('secondary');
            firstBtn.style.backgroundColor = 'var(--primary)';
            firstBtn.style.color = 'white';
        }

        fromVal.addEventListener('input', convert);
        fromUnit.addEventListener('change', convert);
        toUnit.addEventListener('change', convert);
    }
}
