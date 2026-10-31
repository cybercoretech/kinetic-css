
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

    // Theme dropdown in navbar
    $('#theme-select').addEventListener('change', (e) => {
      const themeId = e.target.value;
      if (themeId) {
        const t = themes.find((x) => x.id === themeId);
        if (t) applyThemeToPage(t);
      } else {
        // Reset to default
        const root = document.documentElement;
        root.style.removeProperty('--bg');
        root.style.removeProperty('--panel');
        root.style.removeProperty('--panel-2');
        root.style.removeProperty('--line');
        root.style.removeProperty('--line-hi');
        root.style.removeProperty('--fg');
        root.style.removeProperty('--white');
        root.style.removeProperty('--muted');
        root.style.removeProperty('--dim');
        root.style.removeProperty('--cyan');
        root.style.removeProperty('--pink');
        root.style.removeProperty('--acid');
        root.style.removeProperty('--orange');
        root.style.removeProperty('--purple');
        root.style.removeProperty('--green');
      }
    });

    // Theme explorer
    const FAMILY_LABEL = { cyberpunk: 'cyberpunk', cyberdyne: 'cyberdyne', synthwave: 'synthwave', neosynth: 'neosynth', dystopian: 'dystopian', default: 'classics', 'omarchy-live': 'omarchy-live' };
    const FAMILY_ORDER = ['cyberpunk', 'cyberdyne', 'synthwave', 'neosynth', 'dystopian', 'omarchy-live', 'default'];
    let themes = [], selectedTheme = 'cyberpunk-chrome';
    const tree = $('#theme-tree'), preview = $('#theme-preview');

    async function loadThemes() {
      try {
        const res = await fetch(new URL('../themes.json', import.meta.url));
        themes = await res.json();
        $('#theme-total').textContent = themes.length;
        $('#family-total').textContent = FAMILY_ORDER.length;
        
        // Populate theme dropdown, organized by family.
      const select = $('#theme-select');
      select.innerHTML = '<option value="">DEFAULT THEME</option>';

      const themesByFamily = {};
      themes.forEach(theme => {
        const family = theme.family || 'uncategorized';
        if (!themesByFamily[family]) themesByFamily[family] = [];
        themesByFamily[family].push(theme);
      });

      const dropdownFamilies = [
        ...FAMILY_ORDER.filter(family => themesByFamily[family]?.length),
        ...Object.keys(themesByFamily)
          .filter(family => !FAMILY_ORDER.includes(family))
          .sort((a, b) => a.localeCompare(b))
      ];

      dropdownFamilies.forEach(family => {
        const familyThemes = themesByFamily[family].slice().sort(
          (a, b) => a.name.localeCompare(b.name)
        );

        const rawLabel = FAMILY_LABEL[family] || family;
        const label = String(rawLabel)
          .replace(/[-_]+/g, ' ')
          .replace(/^./, char => char.toUpperCase());

        const group = document.createElement('optgroup');
        group.label = `${label} (${familyThemes.length})`;

        familyThemes.forEach(theme => {
          const option = document.createElement('option');
          option.value = theme.id;
          option.textContent = theme.name;
          group.appendChild(option);
        });

        select.appendChild(group);
      });

      renderTree();
        selectTheme(selectedTheme);
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

    function selectTheme(id, focus = false) {
      selectedTheme = id;
      const t = themes.find((x) => x.id === id);
      if (!t) return;
      $$('.leaf', tree).forEach((l) => l.setAttribute('aria-selected', String(l.dataset.id === id)));
      const leaf = $(`.leaf[data-id="${CSS.escape(id)}"]`, tree);
      const list = leaf?.closest('ul');
      if (list?.hidden) toggleFolder(list.previousElementSibling, true);
      if (focus) leaf?.focus();
      renderPreview(t);
      
      // Apply theme to page
      applyThemeToPage(t);
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

    $$('.card[data-principle]').forEach(card => {
      card.addEventListener('click', () => {
        const detail = principleDetails[card.dataset.principle];
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
