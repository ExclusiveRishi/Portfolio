// Load profile data from JSON
async function loadProfileData() {
    try {
        const response = await fetch('profile-data.json');
        const data = await response.json();
        updateProfile(data);
    } catch (error) {
        console.error('Error loading profile data:', error);
    }
}

function updateProfile(data) {
    // Update profile information
    document.querySelector('.profile-info h1').textContent = data.name;
    document.querySelector('.profile-info p:nth-child(3)').textContent = 
        `Level ${data.level} ${data.title}`;
    document.querySelector('.profile-status').textContent = data.status;
    document.querySelector('.profile-info p:nth-child(4)').textContent = 
        `Currently working on: ${data.currentProject}`;
    
    // Update profile avatar
    document.querySelector('.profile-avatar').src = data.avatar;
    
    // Clear and update projects
    const projectsContainer = document.querySelector('.main-content');
    const projectsTitle = projectsContainer.querySelector('h2');
    projectsContainer.innerHTML = ''; // Clear existing content
    projectsContainer.appendChild(projectsTitle); // Re-add the title
    
    data.projects.forEach(project => {
        const projectCard = createProjectCard(project);
        projectsContainer.appendChild(projectCard);
    });

    // Update stats
    const statsBox = document.querySelector('.stats-box');
    statsBox.innerHTML = '<h3>Developer Stats</h3>'; // Reset stats box
    Object.entries(data.stats).forEach(([key, value]) => {
        const statElement = document.createElement('p');
        statElement.textContent = `${key}: ${value}`;
        statsBox.appendChild(statElement);
    });
}

function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    
    // Create title with optional link
    const titleHTML = project.link 
        ? `<h3><a href="${project.link}" target="_blank">${project.name}</a></h3>`
        : `<h3>${project.name}</h3>`;
        
    card.innerHTML = `
        ${titleHTML}
        <p>${project.description}</p>
        <div class="project-stats">
            <span>Technologies: ${project.technologies.join(', ')}</span>
            <span>Completed: ${project.completionDate}</span>
        </div>
    `;
    return card;
}

// Load data when page loads
document.addEventListener('DOMContentLoaded', loadProfileData);