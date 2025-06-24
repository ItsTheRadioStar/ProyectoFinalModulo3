import { API_URL, TIMEOUT_SEC, RES_PER_PAGE } from "./config.js";
import { getJSON } from "./helpers.js";

export const state = {
    recipe: {}, //Objeto receta vacío
    search: {
        query: '',
        results: [],
        page: 1,
        resultsPerPage: RES_PER_PAGE
    },
};

export const loadSearchResults = async function (query) {
    try {
        state.search.query = query;
        const data = await getJSON(`${API_URL}?search=${query}`);
        //Se guarda la búsqueda

        //Mapeo de resultados
        state.search.results = data.data.recipes.map(rec => {
            return {
                id: rec.id,
                title: rec.title,
                publisher: rec.publisher,
                image: rec.image_url,
            };
        });


    } catch {
        console.log(`${err} 💥💥💥💥`)
        throw err;
    }
};


export const timeout = function (s) {
    return new Promise(function (_, reject) {
        setTimeout(function () {
            reject(new Error(`Request took too long! Timeout after ${s} second`));
        }, s * 1000);
    });
};



export const loadRecipe = async function (id) {
    try {
        const data = await getJSON(`${API_URL}${id}`)
        const { recipe } = data.data

        state.recipe = {
            id: data.data.recipe.id,
            title: data.data.recipe.title,
            publisher: data.data.recipe.publisher,
            sourceUrl: data.data.recipe.source_url,
            image: data.data.recipe.image_url,
            servings: data.data.recipe.servings,
            cookTime: data.data.recipe.cooking_time,
            ingredients: data.data.recipe.ingredients,
        };

        //console.log('Receta cargada en el modelo', state.recipe); //Log para comprobar que funcione

    } catch (err) {
        //alert(`Ocurrio un error ${err.message} 💥💥💥💥`);
        throw err;
    }

}

//Función del avance 4
export const getSearchResultsPage = function (page = state.search.page) {
    state.search.page = page;
    const start = (page - 1) * state.search.resultsPerPage;
    const end = page * state.search.resultsPerPage;
    return state.search.results.slice(start, end);
}
