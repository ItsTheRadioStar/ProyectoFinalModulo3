//const recipeContainer = document.querySelector('.recipe');
//import icons from 'url:../img/icons.svg';
import * as model from './model.js'
import RecipeView from './views/recipeview.js';
import searchView from './views/searchView.js';
import ResultView from './views/ResultView.js';
import paginationView from './views/paginationView.js';

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

/*const renderSpinner = function (parentE1) {
  const markup = `
    <div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div>
  `;
  parentE1.innerHTML = ''; // Cadena vacia para limpiar
  parentE1.insertAdjacentHTML('afterbegin', markup)
}*/



const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    RecipeView.renderSpinner();

    //Llamar al modelo para cargar la receta
    await model.loadRecipe(id);

    RecipeView.render(model.state.recipe);

  } catch (err) {
    //alert(`Ocurrio un error: ${err.message}`);
    RecipeView.renderError();
  }
}

//Llamadas a funciones usadas en avances previos

//showRecipe();// Se quita solo se uso por un momento en el AV1
/*['hashchange', 'load'].forEach(ev =>
  window.addEventListener(ev, controlRecipes)
);*/

///window.addEventListener('hashchange', controlRecipes);
//window.addEventListener('load', controlRecipes);

//Función controlSearchResults

const controlSearchResults = async function () {
  try {
    ResultView.renderSpinner();
    const query = searchView.getQuery();
    if (!query) return;
    await model.loadSearchResults(query);
    ResultView.render(model.state.search.results);
  } catch (err) {
    ResultView.renderError(`${err.message} 💥💥💥💥`);
  }
}



function init() {
  RecipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults)
  paginationView.addHandlerClick(controlPagination);
};

init();
//controlSearchResults();