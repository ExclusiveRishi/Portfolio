document.addEventListener('DOMContentLoaded', () => {
    fetch('profile-data.json')
        .then(response => response.json())
        .then(data => loadProfile(data))
        .catch(err => console.error('Failed to load profile data:', err));
});

function loadProfile(data) {
    document.getElementById('fullName').textContent = data.name;
    document.getElementById('title').textContent = data.title;
    document.getElementById('itchLink').href = data.itchLink;
    document.getElementById('email').textContent = data.email;

    const projectsList = document.getElementById('projectsList');
    projectsList.innerHTML = '';

    data.projects.forEach(project => {
        const projectEl = document.createElement('div');
        projectEl.className = 'project-item';
        projectEl.innerHTML = `
            <div class="project-dot"></div>
            <div class="project-info">
                <div class="project-name">${project.name}</div>
                <div class="project-description">${project.description}</div>
            </div>
        `;
        projectEl.addEventListener('click', () => {
            window.open(project.link, '_blank');
        });
        projectsList.appendChild(projectEl);
    });
}