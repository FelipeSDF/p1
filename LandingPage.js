let btnNext = document.querySelector('.next');
let btnBack = document.querySelector('.back');

let container = document.querySelector('#container-project');
let list = document.querySelector('#container-project .list');
let thumb = document.querySelector('#container-project .thumb');

const navLinks = document.querySelectorAll('#nav-bar a');  

document.addEventListener("DOMContentLoaded", function () {
    const apiUrl = 'https://felipesodre.com.br/api/v1/projects';
  
    
    function getProjects() {
      fetch(apiUrl)
        .then(response => {
          if (!response.ok) {
            throw new Error('Erro ao obter os projetos');
          }
          return response.json();
        })
        .then(projects => {
          displayProjects(projects);
          console.log(projects)
        })
        .catch(error => {
          console.error(error);
        });
    }
  
    
    function displayProjects(projects) {
      if (projects !=''){

        const listContainer = document.querySelector('#container-project .list');
        const thumbContainer = document.querySelector('#container-project .thumb');
    
        
        listContainer.innerHTML = '';
        thumbContainer.innerHTML = '';
    
        
        projects.forEach(project => {
          
          const projectItem = document.createElement('div');
          projectItem.classList.add('list-item');
          
          projectItem.innerHTML = `
            <img src="${project.template}" alt="${project.name}" />
            <div class="content">
              <h2 class="title">${project.name}</h2>
              <p class="description-project">${project.description}</p>
              <button class="btn bnt-learn-more ">Saiba Mais</button>                            
              <button class="btn-favorite">
                <span class="material-symbols-outlined">favorite</span>
            </button>
            </div>
          `;
    
          
          const thumbItem = document.createElement('div');
          thumbItem.classList.add('thumb-item');
    
          thumbItem.innerHTML = `
            <img src="${project.template}" alt="${project.name}" />
            <h3>${project.name}</h3>
          `;
  
        
        listContainer.appendChild(projectItem);
        thumbContainer.appendChild(thumbItem);
      });

      const favoriteButtons = document.querySelectorAll('.btn-favorite');
  
    favoriteButtons.forEach(button => {
      button.addEventListener('click', () => {
        const projectElement = button.closest('.list-item');
        const title = projectElement.querySelector('.title').innerText;
        const description = projectElement.querySelector('.description-project').innerText;
        const imageSrc = projectElement.querySelector('img').getAttribute('src');

        console.log('click')
  
        const project = { title, description, imageSrc };
  
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  
        if (!favorites.find(fav => fav.title === project.title)) {
          favorites.push(project);
          localStorage.setItem('favorites', JSON.stringify(favorites));
          alert('Projeto adicionado aos favoritos!');
        } else {
          alert('Este projeto já foi favoritado.');
        }
      });
    });
    }
    }
    
    getProjects();
  });
  
btnNext.onclick = () => moveItemsOnClick('next');
btnBack.onclick = () => moveItemsOnClick('back');

function moveItemsOnClick(type) {
    let listItems = document.querySelectorAll('.list-item');
    let thumbItems = document.querySelectorAll('.thumb-item');

    if (type === 'next') {
        list.appendChild(listItems[0]);
        thumb.appendChild(thumbItems[0]);
        container.classList.add('next');
    } else {
        list.prepend(listItems[listItems.length - 1]);
        thumb.prepend(thumbItems[thumbItems.length - 1]);
        container.classList.add('back');
    }

    setTimeout(() => {
        container.classList.remove('next');
        container.classList.remove('back');
    }, 1000);
}

let autoPlayInterval;


function startAutoPlay() {
    autoPlayInterval = setInterval(() => {
        moveItemsOnClick('next');
    }, 4000);
}

function stopAutoPlay() {
    clearInterval(autoPlayInterval);
}


startAutoPlay();

container.addEventListener('mouseenter', stopAutoPlay);

container.addEventListener('mouseleave', startAutoPlay);


function toggleMenu() {
    const navBar = document.getElementById('nav-bar')
    navBar.classList.toggle('active')
}


navLinks.forEach(link => {
    link.addEventListener('click', () => {
      const navBar = document.getElementById('nav-bar');
      navBar.classList.remove('active');
    });
  });