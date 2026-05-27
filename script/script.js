document.addEventListener('DOMContentLoaded', () => {
    const sections = Array.from(document.querySelectorAll('.page'));
    const links = Array.from(document.querySelectorAll('nav a'));

    function setActivePage(pageId) {
        const targetSection = sections.find(section => section.id === pageId) || sections[0];
        sections.forEach(section => section.classList.toggle('active', section === targetSection));

        links.forEach(link => {
            const linkTarget = link.getAttribute('href').slice(1);
            link.classList.toggle('active', linkTarget === targetSection.id);
        });

        if (window.location.hash.slice(1) !== targetSection.id) {
            history.replaceState(null, '', `#${targetSection.id}`);
        }
    }

    function handleHashChange() {
        const pageId = window.location.hash.slice(1) || 'inicio';
        setActivePage(pageId);
    }

    links.forEach(link => {
        link.addEventListener('click', event => {
            event.preventDefault();
            const pageId = link.getAttribute('href').slice(1);
            setActivePage(pageId);
        });
    });

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
});