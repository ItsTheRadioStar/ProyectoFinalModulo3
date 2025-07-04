const recipeContainer = document.querySelector('.recipe');
const timeout = function(s) {
    return new Promise(function(_, reject) {
        setTimeout(function() {
            reject(new Error(`Request took too long! Timeout after ${s} second`));
        }, s * 1000);
    });
}; // https://forkify-api.herokuapp.com/v2
 ///////////////////////////////////////

//# sourceMappingURL=Proyecto Final Módulo 3 - Version 2.62406edb.js.map
