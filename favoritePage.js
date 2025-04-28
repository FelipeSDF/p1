  document.addEventListener('DOMContentLoaded', function() {
    const favoritesContainer = document.getElementById('container-projects');
    favoritesContainer.innerHTML = '';
  
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  
    if (favorites.length === 0) {
      favoritesContainer.innerHTML = '<p>Você ainda não favoritou nenhum projeto.</p>';
      return;
    }
  
    favorites.forEach(project => {
      const projectCard = document.createElement('div');
      projectCard.classList.add('card-project');
  
      projectCard.innerHTML = `
        <figure>
          <img src="${project.imageSrc}" alt="${project.title}">
        </figure>
        <div>
          <div class="name-project">
            <h2>${project.title}</h2>
          </div>
          <div class="description-project">
            <p>${project.description}</p>
          </div>
        </div>
      `;
  
      favoritesContainer.appendChild(projectCard);
    });
  });
  
  document.addEventListener('DOMContentLoaded', function() {
    const favoritesContainer = document.getElementById('container-projects');
    favoritesContainer.innerHTML = '';
  
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  
    if (favorites.length === 0) {
      favoritesContainer.innerHTML = '<p>Você ainda não favoritou nenhum projeto.</p>';
      return;
    }
  
    function renderFavorites() {
      favoritesContainer.innerHTML = '';
  
      if (favorites.length === 0) {
        favoritesContainer.innerHTML = '<p>Você ainda não favoritou nenhum projeto.</p>';
        return;
      }
  
      favorites.forEach((project, index) => {
        const projectCard = document.createElement('div');
        projectCard.classList.add('card-project');
  
        projectCard.innerHTML = `
          <figure>
            <img src="${project.imageSrc}" alt="${project.title}">
          </figure>
          <div>
            <div class="name-project">
              <h2>${project.title}</h2>
            </div>
            <div class="description-project">
              <p>${project.description}</p>
            </div>
            <button class="btn-remove" data-index="${index}">Remover</button>
          </div>
        `;
  
        favoritesContainer.appendChild(projectCard);
      });
  
  
      document.querySelectorAll('.btn-remove').forEach(button => {
        button.addEventListener('click', function() {
          const index = this.getAttribute('data-index');
          favorites.splice(index, 1); 
          localStorage.setItem('favorites', JSON.stringify(favorites)); 
          renderFavorites(); 
        });
      });
    }
  
    renderFavorites();
  });
  