(() => {
  const buttons = [...document.querySelectorAll('[data-filter]')];
  const projects = [...document.querySelectorAll('.project')];
  const counter = document.querySelector('.project-count');
  function updateCount() {
    const count = projects.filter(project => !project.hidden).length;
    counter.replaceChildren();
    const zh = document.createElement('span'); zh.className = 'lang-zh'; zh.textContent = `${count} 个项目`;
    const en = document.createElement('span'); en.className = 'lang-en'; en.textContent = `${count} ${count === 1 ? 'project' : 'projects'}`;
    counter.append(zh, en);
  }
  function filter(category) {
    buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === category)));
    projects.forEach(project => { project.hidden = category !== 'all' && !project.dataset.category.split(' ').includes(category); });
    updateCount();
  }
  buttons.forEach(button => button.addEventListener('click', () => filter(button.dataset.filter)));
  document.querySelectorAll('[data-service-filter]').forEach(link => link.addEventListener('click', () => filter(link.dataset.serviceFilter)));
  updateCount();
})();
