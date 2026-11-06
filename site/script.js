
    const $ = (sel, root = document) => root.querySelector(sel);
    const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
    const h = (tag, attrs = {}, ...kids) => {
      const n = document.createElement(tag);
      for (const [k, v] of Object.entries(attrs)) {
        if (k === 'class') n.className = v;
        else if (k === 'html') n.innerHTML = v;
        else if (k.startsWith('on')) n.addEventListener(k.slice(2), v);
        else if (v !== false && v != null) n.setAttribute(k, v === true ? '' : v);
      }
      n.append(...kids.flat().filter((k) => k != null));
      return n;
    };

    const NAV = [
      { label: 'this page', items: [
        { ico: '#', text: 'top', href: '#top' },
        { ico: '01', text: 'principles', href: '#features' },
        { ico: '02', text: 'themes', href: '#themes' },
        { ico: '03', text: 'install', href: '#install' },
      ] },
      { label: 'project', items: [
        { ico: '↗', text: 'github repository', href: 'https://github.com/cybercoretech/kinetic-css', ext: true, note: 'new tab' },
        { ico: '↗', text: 'issues', href: 'https://github.com/cybercoretech/kinetic-css/issues', ext: true, note: 'new tab' },
        { ico: '↗', text: 'cybercore tech', href: 'https://cybercoretech.net/', ext: true, note: 'new tab' },
      ] },
    ];

    const drawer = $('#drawer'), scrim = $('.scrim'), burger = $('.burger');
    $('#drawer-body').append(...NAV.map((g) => h('div', { class: 'drawer-group' }, h('p', {}, `// ${g.label}`),
      ...g.items.map((it) => h('a', { href: it.href, ...(it.ext ? { target: '_blank', rel: 'noopener' } : {}) },
        h('span', { class: 'ico', 'aria-hidden': 'true' }, it.ico), it.text, it.note ? h('small', {}, it.note) : null)))));

    function setDrawer(open) {
      if (open) { drawer.hidden = false; scrim.hidden = false; requestAnimationFrame(() => drawer.classList.add('open')); }
      else { drawer.classList.remove('open'); scrim.hidden = true; setTimeout(() => { if (!drawer.classList.contains('open')) drawer.hidden = true; }, 300); }
      burger.setAttribute('aria-expanded', String(open));
      burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      if (open) $('a', drawer)?.focus(); else burger.focus({ preventScroll: true });
    }
    burger.addEventListener('click', () => setDrawer(burger.getAttribute('aria-expanded') !== 'true'));
    $('.drawer-close').addEventListener('click', () => setDrawer(false));
    scrim.addEventListener('click', () => setDrawer(false));
    drawer.addEventListener('click', (e) => { if (e.target.closest('a[href^="#"]')) setDrawer(false); });
    addEventListener('keydown', (e) => { if (e.key === 'Escape' && drawer.classList.contains('open')) setDrawer(false); });

    // Theme explorer
    const FAMILY_LABEL = { cyberpunk: 'cyberpunk', cyberdyne: 'cyberdyne', synthwave: 'synthwave', neosynth: 'neosynth', dystopian: 'dystopian', default: 'classics', 'omarchy-live': 'omarchy-live' };
    const FAMILY_ORDER = ['cyberpunk', 'cyberdyne', 'synthwave', 'neosynth', 'dystopian', 'omarchy-live', 'default'];
    let themes = [], selectedTheme = 'cyberpunk-chrome';
    const tree = $('#theme-tree'), preview = $('#theme-preview');

    async function loadThemes() {
      const paths = [
        './themes.json',
        '/kinetic-css/themes.json',
        '../themes.json',
        '/themes.json',
        'themes.json',
        new URL('../themes.json', import.meta.url).href
      ];
      let res;
      for (const p of paths) {
        try {
          const r = await fetch(p);
          if (r.ok) {
            res = r;
            break;
          }
        } catch {}
      }
      if (!res) throw new Error('Could not fetch themes.json');
      try {
        themes = await res.json();
        $('#theme-total').textContent = themes.length;
        $('#family-total').textContent = FAMILY_ORDER.length;
        
      renderTree();
        selectTheme(selectedTheme, false, false);
      } catch (e) {
        console.error('Failed to load themes:', e);
      }
    }

function renderTree() {
      const byFamily = {};

      themes.forEach(t => {
        const family = t.family || 'uncategorized';
        if (!byFamily[family]) byFamily[family] = [];
        byFamily[family].push(t);
      });

      tree.innerHTML = '';

      // Keep established category order, then include any new families.
      const families = [
        ...FAMILY_ORDER.filter(family => byFamily[family]?.length),
        ...Object.keys(byFamily)
          .filter(family => !FAMILY_ORDER.includes(family))
          .sort((a, b) => a.localeCompare(b))
      ];

      families.forEach(family => {
        const list = byFamily[family].slice().sort(
          (a, b) => a.name.localeCompare(b.name)
        );

        const rawLabel = FAMILY_LABEL[family] || family;
        const label = String(rawLabel)
          .replace(/[-_]+/g, ' ')
          .replace(/^./, char => char.toUpperCase());

        const folder = h('div', { class: 'folder' },
          h('button', {
            type: 'button',
            'aria-expanded': 'true',
            'aria-label': `${label}, ${list.length} themes`,
            onclick: e => toggleFolder(e.currentTarget)
          },
            h('span', { class: 'chev' }, '▶'),
            h('span', { class: 'fico' }, '◆'),
            h('span', {}, label),
            h('small', {}, String(list.length))
          ),
          h('ul', {},
            list.map(t => h('li', {},
              h('button', {
                class: 'leaf',
                type: 'button',
                'data-id': t.id,
                onclick: () => selectTheme(t.id, true)
              },
                h('span', {
                  class: 'sw',
                  style: `background: linear-gradient(135deg, ${t.accents.primary}, ${t.accents.secondary})`
                }),
                h('span', {}, t.name),
                h('span', { class: 'ext' }, '.json')
              )
            ))
          )
        );

        tree.appendChild(folder);
      });
    }

    function toggleFolder(btn, open) {
      const list = btn.nextElementSibling;
      const isExpanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(open !== undefined ? open : !isExpanded));
      list.hidden = btn.getAttribute('aria-expanded') !== 'true';
    }

    function selectTheme(id, focus = false, applyToPage = true) {
      selectedTheme = id;
      const t = themes.find((x) => x.id === id);
      if (!t) return;
      $$('.leaf', tree).forEach((l) => l.setAttribute('aria-selected', String(l.dataset.id === id)));
      const leaf = $(`.leaf[data-id="${CSS.escape(id)}"]`, tree);
      const list = leaf?.closest('ul');
      if (list?.hidden) toggleFolder(list.previousElementSibling, true);
      if (focus) leaf?.focus();
      renderPreview(t);
      
      // Apply to the page through the universal Cybercore chooser, so the
      // header menu and every Cybercore site stay in step.
      if (!applyToPage) return;
      if (window.CybercoreThemes?.known(t.id)) window.CybercoreThemes.apply(t.id);
      else applyThemeToPage(t);
    }
    
    function applyThemeToPage(theme) {
      if (!theme) return;
      const root = document.documentElement;
      root.style.setProperty('--bg', theme.surfaces.window);
      root.style.setProperty('--panel', theme.surfaces.shell);
      root.style.setProperty('--panel-2', theme.surfaces.raised);
      root.style.setProperty('--line', theme.surfaces.border);
      root.style.setProperty('--line-hi', theme.surfaces.border);
      root.style.setProperty('--fg', theme.text.primary);
      root.style.setProperty('--white', theme.text.primary);
      root.style.setProperty('--muted', theme.text.muted);
      root.style.setProperty('--dim', theme.text.muted);
      root.style.setProperty('--cyan', theme.accents.primary);
      root.style.setProperty('--pink', theme.accents.secondary);
      root.style.setProperty('--acid', theme.accents.success);
      root.style.setProperty('--orange', theme.accents.warning);
      root.style.setProperty('--purple', theme.accents.secondary);
      root.style.setProperty('--green', theme.accents.success);
    }

    function renderPreview(t) {
      const s = t.surfaces, tx = t.text, sx = t.syntax;
      const color = (role) => role === 'punct' ? tx.primary : (sx[role] || tx.primary);
      preview.style.background = s.editor;
      preview.replaceChildren(
        h('div', { class: 'pv-title', style: `background:${s.shell};color:${tx.muted};border-color:${s.border}` },
          h('span', {}, h('b', { style: `color:${tx.primary}` }, t.name), `  ·  ${FAMILY_LABEL[t.family] || t.family} · ${t.appearance}`), h('span', {}, `${t.id}.json`)),
        h('div', { class: 'pv-tabs', style: `background:${s.shell};border-color:${s.border}` },
          h('span', { class: 'pv-tab', style: `background:${s.editor};color:${tx.primary};border-color:${s.border};box-shadow:inset 0 2px 0 ${t.accents.primary}` }, 'kinetic.css'),
          h('span', { class: 'pv-tab', style: `color:${tx.muted};border-color:transparent` }, 'kinetic-theme.css')),
        h('pre', { class: 'pv-code', style: `color:${tx.primary}` }, [
          h('div', { class: 'row' }, h('span', { class: 'num' }, '1'), h('span', {}, '<span style="color:', sx.keyword, '">.k-stack</span> { ')),
          h('div', { class: 'row' }, h('span', { class: 'num' }, '2'), h('span', {}, '  display: ')),
          h('div', { class: 'row' }, h('span', { class: 'num' }, '3'), h('span', {}, '    grid-template-rows: ')),
          h('div', { class: 'row cur' }, h('span', { class: 'num' }, '4'), h('span', {}, '      ')),
          h('div', { class: 'row' }, h('span', { class: 'num' }, '5'), h('span', {}, '}')),
        ]),
        h('div', { class: 'pv-meta' },
          [['primary', t.accents.primary], ['secondary', t.accents.secondary], ['success', t.accents.success]]
            .map(([l, c]) => h('span', { class: 'chip', title: c }, h('i', { style: `background:${c}` }), `${l} ${c.toLowerCase()}`)))
      );
    }

    // KINETIC PRINCIPLES POPUPS
    const principleDialog = $('#kinetic-principle-dialog');
    const principleTitle = $('#principle-dialog-title');
    const principleNumber = $('#principle-dialog-number');
    const principleContent = $('#principle-dialog-content');

    const principleDetails = {
      fluid: {
        number: '01',
        title: 'Fluid Scale',
        content: `
          <p>Fluid scaling allows typography, spacing, and layout values to adapt continuously as the available viewport space changes.</p>
          <h3>Why it matters</h3>
          <p>Traditional responsive designs often rely on several fixed breakpoints. Fluid values reduce abrupt jumps and create smoother transitions between screen sizes.</p>
          <h3>How it works</h3>
          <p>CSS <code>clamp()</code> defines a minimum, preferred, and maximum value. The browser calculates a value within those limits as the viewport changes.</p>
          <pre>font-size: clamp(1rem, 2vw + .5rem, 2rem);</pre>
          <p>The result is typography that scales naturally while remaining within predictable boundaries.</p>
        `
      },
      container: {
        number: '02',
        title: 'Container Queries',
        content: `
          <p>Container queries let a component respond to the dimensions of its own container rather than relying only on the overall viewport width.</p>
          <h3>Why it matters</h3>
          <p>A component may appear in a narrow sidebar, a multi-column grid, or a full-width page. Its available space can be very different even when the browser window has not changed.</p>
          <h3>How it works</h3>
          <p>Declare a query container, then style its descendants according to the container's available width.</p>
          <pre>.card-container {
  container-type: inline-size;
}

@container (min-width: 32rem) {
  .card-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}</pre>
          <p>The component can adapt to where it is placed instead of guessing from the screen size.</p>
        `
      },
      density: {
        number: '03',
        title: 'Density Modes',
        content: `
          <p>Density modes let an interface adjust its spacing and visual rhythm without rebuilding its components.</p>
          <h3>Why it matters</h3>
          <p>Different contexts need different amounts of breathing room. A compact dashboard may need to fit more information, while a spacious layout can make content easier to scan.</p>
          <h3>Three useful modes</h3>
          <p><strong>Compact</strong> reduces spacing for information-dense interfaces.</p>
          <p><strong>Comfortable</strong> provides a balanced everyday layout.</p>
          <p><strong>Spacious</strong> increases breathing room for a more relaxed presentation.</p>
          <h3>How it works</h3>
          <p>A density attribute or variable set can change shared spacing values across components, keeping the same underlying structure and styles.</p>
          <pre>[data-density="compact"] {
  --density-space: .75rem;
}

[data-density="comfortable"] {
  --density-space: 1rem;
}

[data-density="spacious"] {
  --density-space: 1.5rem;
}</pre>
          <p>One setting can adjust the overall interface density consistently.</p>
        `
      }
    };

    $$('.card-details-btn[data-principle]').forEach(btn => {
      btn.addEventListener('click', () => {
        const detail = principleDetails[btn.dataset.principle];
        if (!detail) return;

        principleNumber.textContent = `// ${detail.number} · principle`;
        principleTitle.textContent = detail.title;
        principleContent.innerHTML = detail.content;
        principleDialog.showModal();
      });
    });

    $('.principle-dialog-close').addEventListener('click', () => {
      principleDialog.close();
    });

    $('.principle-dialog-done').addEventListener('click', () => {
      principleDialog.close();
    });

    principleDialog.addEventListener('click', event => {
      if (event.target === principleDialog) principleDialog.close();
    });

    loadThemes();

// KINETIC ECOSYSTEM INTERACTIONS
(() => {
  const findDialog = (id) => document.getElementById(`${id}-dialog`);

  function matchDialogToPage(dialog) {
    const reference = document.querySelector("#ecosystem .eco-card");
    if (!reference) return;
    const style = window.getComputedStyle(reference);
    dialog.style.background = style.background;
    dialog.style.backgroundColor = style.backgroundColor;
    dialog.style.color = style.color;
    dialog.style.borderColor = style.borderColor;
    dialog.style.fontFamily = style.fontFamily;
  }

  document.addEventListener("click", (event) => {
    const opener = event.target.closest("[data-eco-open]");
    if (opener) {
      const dialog = findDialog(opener.dataset.ecoOpen);
      if (dialog && typeof dialog.showModal === "function") {
        matchDialogToPage(dialog);
        if (!dialog.open) dialog.showModal();
      }
      return;
    }

    const closer = event.target.closest("[data-eco-close]");
    if (closer) {
      closer.closest("dialog")?.close();
      return;
    }

    if (event.target instanceof HTMLDialogElement &&
        event.target.classList.contains("eco-dialog")) {
      const rect = event.target.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right ||
          event.clientY < rect.top || event.clientY > rect.bottom) {
        event.target.close();
      }
    }
  });
})();
// END KINETIC ECOSYSTEM INTERACTIONS

// KINETIC SHOWCASE CIRCULAR SLIDER
(() => {
  const showcasePackages = [
    { name: '@kinetic/themes', version: 'v0.2.0', glyph: '🎨', desc: 'Theme presets, custom design tokens, dark/light/auto modes, brand customization, and runtime theme switching for Kinetic CSS.', license: 'MIT', file: 'packages/themes/package.json' },
    { name: '@kinetic/fonts', version: 'v0.3.0', glyph: '🔤', desc: 'Google Fonts integration and font switching utility for Kinetic CSS.', license: 'MIT', file: 'packages/fonts/package.json' },
    { name: '@kinetic/layout', version: 'v0.2.0', glyph: '▦', desc: 'Advanced grids, masonry layouts, and split panes for Kinetic CSS.', license: 'MIT', file: 'packages/layout/package.json' },
    { name: '@kinetic/core', version: 'v0.3.0', glyph: '⚙️', desc: 'Kinetic API Standard (KAS) Reference Core.', license: 'MIT', file: 'packages/core/package.json' },
    { name: '@kinetic/navigation', version: 'v0.2.0', glyph: '🧭', desc: 'Advanced navigation components including menus, mega menus, and breadcrumbs for Kinetic CSS.', license: 'MIT', file: 'packages/navigation/package.json' },
    { name: '@kinetic/ts', version: 'v0.4.0', glyph: '🔷', desc: 'TypeScript declarations for Kinetic CSS runtime controllers.', license: 'MIT', file: 'packages/ts/package.json' },
    { name: '@kinetic/js', version: 'v0.4.0', glyph: '🟣', desc: 'Kinetic JS runtime add-on.', license: 'MIT', file: 'packages/js/package.json' }
  ];

  const dialContainer = document.getElementById('showcase-dial');
  const showcaseDisplay = document.getElementById('showcase-display');
  let activeShowcaseIndex = 0;

  function renderShowcase() {
    if (!dialContainer || !showcaseDisplay) return;
    dialContainer.innerHTML = '';
    const radius = 95;
    const center = 140;

    showcasePackages.forEach((pkg, idx) => {
      const angle = (idx / showcasePackages.length) * 2 * Math.PI - Math.PI / 2;
      const x = center + radius * Math.cos(angle) - 22;
      const y = center + radius * Math.sin(angle) - 22;

      const node = document.createElement('button');
      node.className = `dial-node ${idx === activeShowcaseIndex ? 'active' : ''}`;
      node.type = 'button';
      node.style.left = `${x}px`;
      node.style.top = `${y}px`;
      node.title = pkg.name;
      node.textContent = pkg.glyph;
      node.addEventListener('click', () => {
        activeShowcaseIndex = idx;
        renderShowcase();
      });
      dialContainer.appendChild(node);
    });

    const active = showcasePackages[activeShowcaseIndex];
    showcaseDisplay.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: space-between;">
        <h3 style="margin: 0; display: flex; align-items: center; gap: 10px; color: #a5b4fc;"><span style="font-size: 20px;">${active.glyph}</span> ${active.name}</h3>
        <span class="status">${active.version}</span>
      </div>
      <p style="color: #94a3b8; font-size: 13.5px; margin: 0;">${active.desc}</p>
      <pre>{\n  "name": "${active.name}",\n  "version": "${active.version}",\n  "description": "${active.desc}",\n  "main": "src/index.js",\n  "license": "${active.license}",\n  "manifest": "${active.file}"\n}</pre>
      
      <!-- Interactive Opacity / Animation Slider Example inspired by reference -->
      <div style="background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(129, 149, 248, 0.2); border-radius: 12px; padding: 14px; display: grid; gap: 8px;">
        <div style="display: flex; justify-content: space-between; font-size: 11.5px; color: #94a3b8; font-family: var(--mono);">
          <span>Animations & Opacity Preview</span>
          <span id="slider-val-label" style="color: #a5b4fc;">50%</span>
        </div>
        <input type="range" id="showcase-slider" min="0" max="100" value="50" style="accent-color: #818cf8; width: 100%; cursor: pointer;">
        <div style="display: flex; justify-content: space-between; font-size: 10.5px; color: #64748b;">
          <span>0%<br>opacity: 0</span>
          <span style="text-align: center;">50%<br>opacity: 1</span>
          <span style="text-align: right;">100%<br>opacity: 0</span>
        </div>
      </div>
    `;

    setTimeout(() => {
      const slider = document.getElementById('showcase-slider');
      const label = document.getElementById('slider-val-label');
      if (slider && label) {
        slider.addEventListener('input', (e) => {
          const val = e.target.value;
          label.textContent = val + '%';
          const opacity = val == 50 ? 1 : (val / 100);
          showcaseDisplay.style.opacity = Math.max(0.3, opacity);
        });
      }
    }, 50);
  }
  renderShowcase();
})();

window.copyAndToast = function(text, label = 'Copied to clipboard') {
  navigator.clipboard.writeText(text);
  let container = document.querySelector('.cyber-toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'cyber-toast-container';
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  toast.className = 'cyber-toast';
  toast.innerHTML = `<span class="cyber-toast-dot"></span><span>${label}: <code>${text}</code></span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.classList.add('hiding');
    setTimeout(() => toast.remove(), 200);
  }, 2500);
};

// GLOBAL SEARCH MODAL
(() => {
  const searchModal = document.getElementById('search-modal');
  const searchInput = document.getElementById('global-search-input');
  const searchResults = document.getElementById('global-search-results');
  const searchBtn = document.querySelector('.bar-search-btn');

  if (!searchModal || !searchInput || !searchResults) return;

  const searchableItems = [
    { title: 'Fluid Scale', desc: 'Typography and spacing move smoothly between viewport sizes using clamp().', type: 'Principle', link: '#features' },
    { title: 'Container Queries', desc: 'Cards and navigation react to their own available width.', type: 'Principle', link: '#features' },
    { title: 'Density Modes', desc: 'Switch between compact, comfortable, and spacious with one attribute.', type: 'Principle', link: '#features' },
    { title: '@kinetic/a11y', desc: 'Accessibility utilities, focus management, and screen reader announcements.', type: 'Package', link: '#ecosystem' },
    { title: '@kinetic/adaptive', desc: 'Adaptive Intelligence engine for Kinetic CSS.', type: 'Package', link: '#ecosystem' },
    { title: '@kinetic/breakpoint', desc: 'Adaptive Breakpoint Engine using container queries.', type: 'Package', link: '#ecosystem' },
    { title: '@kinetic/core', desc: 'Kinetic API Standard (KAS) Reference Core.', type: 'Package', link: '#ecosystem' },
    { title: '@kinetic/data', desc: 'Responsive tables, data cards, progress indicators, chart adapters.', type: 'Package', link: '#ecosystem' },
    { title: '@kinetic/density', desc: 'Universal Density Engine for Kinetic CSS.', type: 'Package', link: '#ecosystem' },
    { title: '@kinetic/feedback', desc: 'Feedback components including toasts, alerts, and loading states.', type: 'Package', link: '#ecosystem' },
    { title: '@kinetic/fonts', desc: 'Google Fonts integration and font switching utility.', type: 'Package', link: '#ecosystem' },
    { title: '@kinetic/forms', desc: 'Form layouts, validation states, input groups, and accessible messaging.', type: 'Package', link: '#ecosystem' },
    { title: '@cybercoretech/js', desc: 'Kinetic JS runtime add-on.', type: 'Package', link: '#ecosystem' },
    { title: '@kinetic/layout', desc: 'Advanced grids, masonry layouts, and split panes.', type: 'Package', link: '#ecosystem' },
    { title: '@kinetic/micro', desc: 'Micro-interactions and physics-based fluid transitions.', type: 'Package', link: '#ecosystem' },
    { title: '@kinetic/motion', desc: 'CSS transitions, animations, scroll reveals, and spring physics.', type: 'Package', link: '#ecosystem' },
    { title: '@kinetic/navigation', desc: 'Advanced navigation components including menus, mega menus.', type: 'Package', link: '#ecosystem' },
    { title: '@kinetic/overlay', desc: 'Overlays including dialogs, popovers, drawers, and tooltips.', type: 'Package', link: '#ecosystem' },
    { title: '@kinetic/states', desc: 'Standardized component state system.', type: 'Package', link: '#ecosystem' },
    { title: '@kinetic/themes', desc: 'Theme presets, custom design tokens, dark/light/auto modes.', type: 'Package', link: '#ecosystem' },
    { title: '@kinetic/tokens-generator', desc: 'Design Token Generator for Kinetic CSS.', type: 'Package', link: '#ecosystem' },
    { title: '@cybercoretech/ts', desc: 'TypeScript declarations for Kinetic CSS runtime controllers.', type: 'Package', link: '#ecosystem' },
    { title: '@kinetic/cli', desc: 'Command line interface for scaffolding and inspecting projects.', type: 'Tool', link: '#ecosystem' },
    { title: '@kinetic/studio', desc: 'Visual theme builder and component studio.', type: 'Tool', link: '#ecosystem' },
    { title: 'Interactive Showcase', desc: 'Interactive ecosystem preview with circular dial slider.', type: 'Showcase', link: '#showcase' }
  ];

  function openSearch() {
    if (typeof searchModal.showModal === 'function') {
      searchModal.showModal();
      searchInput.focus();
      renderResults('');
    }
  }

  if (searchBtn) {
    searchBtn.addEventListener('click', openSearch);
  }

  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      openSearch();
    }
  });

  function renderResults(query) {
    const q = query.toLowerCase().trim();
    const matches = searchableItems.filter(item => 
      !q || item.title.toLowerCase().includes(q) || item.desc.toLowerCase().includes(q) || item.type.toLowerCase().includes(q)
    );

    searchResults.innerHTML = '';
    if (matches.length === 0) {
      searchResults.innerHTML = `<p style="color: var(--dim); padding: 12px; text-align: center;">No matching ecosystem components found.</p>`;
      return;
    }

    matches.forEach(item => {
      const el = document.createElement('a');
      el.href = item.link;
      el.style.cssText = 'display: grid; gap: 4px; padding: 10px 12px; background: var(--panel-2); border: 1px solid var(--line-hi); border-radius: 6px; text-decoration: none; color: inherit; transition: border-color .2s;';
      el.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: space-between;">
          <strong style="color: var(--white); font-size: 13.5px;">${item.title}</strong>
          <span style="font-size: 10.5px; padding: 2px 6px; background: rgba(46,230,246,.1); color: var(--cyan); border-radius: 4px; border: 1px solid rgba(46,230,246,.3);">${item.type}</span>
        </div>
        <p style="margin: 0; color: var(--muted); font-size: 12px; line-height: 1.4;">${item.desc}</p>
      `;
      el.addEventListener('click', () => {
        searchModal.close();
      });
      searchResults.appendChild(el);
    });
  }

  searchInput.addEventListener('input', (e) => {
    renderResults(e.target.value);
  });
})();
