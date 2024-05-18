// apiHelper.js

import axios from 'axios';

const apiHelper = axios.create({
    // baseURL: 'http://localhost:3000/api',
    baseURL: 'https://www.jbprof.com/api',
    withCredentials: true,
});

export function getCorsi(minStartDate, maxStartDate, limit) {
    return apiHelper.get('/corsi', {
        params: {
            data_inizio_minima: minStartDate,
            data_inizio_massima: maxStartDate,
            numero_elementi: limit,
        },
    });
}

export function getCorso(id) {
    return apiHelper.get(`/corso?ID_Corsi=${id}`);
}

export function getPhotos(id) {
    return apiHelper.get(`/photo?ID_Corsi=${id}`);
}

export function getDiscipline(id) {
    try {
        return apiHelper.get(`/discipline_corso?ID_Corsi=${id}`);
    } catch (error) {
        console.log(error);
        return [];
    }
}

export function getProfessioni(id) {
    try {
        return apiHelper.get(`/professioni_corso?ID_Corsi=${id}`);
    } catch (error) {
        console.log(error);
        return [];
    }
}

export function getSede(id) {
    return apiHelper.get(`/sede?ID_Sede=${id}`);
}

export function getDate(id) {
    return apiHelper.get(`/calendario?ID_Corsi=${id}`);
}

export function sendContattiMessage(name, email, phone, subject, message) {
    if (!name) return Promise.reject('Nome e cognome non validi');
    if (!email || !email.includes('@')) return Promise.reject('Email non valida');
    if (!phone || phone.length < 4) return Promise.reject('Numero di telefono non valido');
    if (!subject) return Promise.reject('Oggetto non valido');
    if (!message) return Promise.reject('Messaggio non valido');

    return apiHelper.get('/function/contatti', {
        params: {
            Nome: name.split(' ')[0] || name || '',
            Cognome: name.split(' ')[1] || '',
            EMail: email,
            Mobile: phone,
            Oggetto: subject,
            Messaggio: message,
        }
    });
}

export function login(cf, password) {
    // /api/login_utente?username=CODICE_FISCALE_UTENTE&password=PASSSWORD_UTENTE

    return apiHelper.get('/login_utente', {
        params: {
            username: cf,
            password: password,
        },
        withCredentials: true,
    });
}

export function logout(id) {
    setUserInLocalStorage(null);
    // remove "PHPSESSID" cookie
    document.cookie = 'PHPSESSID=; Max-Age=0;';
    setTimeout(() => {
        return apiHelper.get('/logout_utente', {
            params: {
                JBPROF: id,
            },
            withCredentials: true,
        })
    }, 2000);
}

export function checkLogin(id) {
    return apiHelper.get('/check_login', {
        params: {
            JBPROF: id,
        },
        withCredentials: true,
    });
}

export function checkNewLogin() {
    return apiHelper.get('/check_login_with_session', {
        withCredentials: true,
    });
}


export function setUserInLocalStorage(user) {
    localStorage.setItem('user', JSON.stringify(user));
    const expires = new Date(Date.now() + 24 * 60 * 1000);
    localStorage.setItem('user_expires', expires.toISOString());
}

export function getUserFromLocalStorage() {
    if (new Date(localStorage.getItem('user_expires')) < new Date()) {
        console.log('user expired');
        localStorage.removeItem('user');
        localStorage.removeItem('user_expires');
        return null;
    }

    return JSON.parse(localStorage.getItem('user'));
}

export default apiHelper;
