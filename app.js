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

    [...data.projects].reverse().forEach(project => {
        const projectEl = document.createElement('div');
        projectEl.className = 'project-item';
        
        const screenshotHtml = project.screenshot 
            ? `<img class="project-screenshot" src="${project.screenshot}" alt="${project.name} screenshot">`
            : '';
        
        const technicalDetailsButton = project.technicalDetails 
            ? `<button class="technical-details-btn">Technical Details</button>`
            : '';
        
        const technicalDetailsContent = project.technicalDetails 
            ? `<div class="technical-details-content" style="display: none;">
                   <ul class="technical-details-list">
                       ${project.technicalDetails.map(detail => `<li>${detail}</li>`).join('')}
                   </ul>
               </div>`
            : '';
        
        projectEl.innerHTML = `
            <div class="project-dot"></div>
            <div class="project-info">
                <div class="project-header">
                    <div class="project-text">
                        <div class="project-name">${project.name}</div>
                        <div class="project-description">${project.description}</div>
                    </div>
                    ${technicalDetailsButton}
                </div>
                ${screenshotHtml}
                ${technicalDetailsContent}
            </div>
        `;
        projectEl.addEventListener('click', () => {
            window.open(project.link, '_blank');
        });
        
        if (project.technicalDetails) {
            const btn = projectEl.querySelector('.technical-details-btn');
            const content = projectEl.querySelector('.technical-details-content');
            
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const isVisible = content.style.display === 'block';
                content.style.display = isVisible ? 'none' : 'block';
                btn.textContent = isVisible ? 'Technical Details' : 'Hide Details';
            });
        }
        
        projectsList.appendChild(projectEl);
    });
}