import { TIMEOUT_SEC } from "./config.js"

//Función para limitar el tiempo de espera

const timeout = function (s) {
    return new Promise(function (_, reject) {
        setTimeout(() => {
            reject(new Error(`La respuesta ha tomado mucho tiempo. Han pasado ${s} segundo(s).`));
        }, s * 1000)
    })
}

// Función para obtener los datos desde la URL, manejar errores y timeouts

export const getJSON = async function (url) {
    try {
        const fetchPro = fetch(url);
        const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
        const data = await res.json();
        if (!res.ok) throw new Error(`${data.message} (${res.status})`);
        return data;
    } catch (error) {
        throw error;
    }
}