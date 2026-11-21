(() => {
  const buttons = [...document.querySelectorAll('[data-filter]')];
  const projects = [...document.querySelectorAll('.project')];
  const counter = document.querySelector('.project-count');
  const categories = new Set(buttons.map(button => button.dataset.filter));
  function filter(category, updateUrl = false) {
    if (!categories.has(category)) category = 'all';
    buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === category)));
    projects.forEach(project => { project.hidden = category !== 'all' && !project.dataset.category.split(' ').includes(category); });
    const count = projects.filter(project => !project.hidden).length;
    counter.replaceChildren();
    for (const [lang, text] of [['zh', `${count} 个项目`], ['en', `${count} ${count === 1 ? 'project' : 'projects'}`]]) {
      const span = document.createElement('span'); span.className = `lang-${lang}`; span.textContent = text; counter.append(span);
    }
    if (updateUrl) {
      const url = new URL(location.href);
      if (category === 'all') url.searchParams.delete('category'); else url.searchParams.set('category', category);
      url.hash = 'work';
      history.pushState(null, '', url);
    }
  }
  const restore = () => filter(new URL(location.href).searchParams.get('category') || 'all');
  buttons.forEach(button => button.addEventListener('click', () => filter(button.dataset.filter, true)));
  document.querySelectorAll('[data-service-filter]').forEach(link => {
    const category = link.dataset.serviceFilter;
    link.href = `?category=${encodeURIComponent(category)}#work`;
    link.addEventListener('click', event => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault(); filter(category, true);
      document.querySelector('#work').scrollIntoView({behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'});
    });
  });
  addEventListener('popstate', restore);
  restore();
})();
