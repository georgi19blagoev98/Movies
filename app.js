window.addEventListener('load', loadHomepage);
function loadHomepage() {
    let mainDiv = document.querySelector('div');
    let mainDivElements = mainDiv.children;
    Array
        .from(mainDivElements)
        .forEach(mainDivElement => {
            if (mainDivElement.tagName === 'SECTION' || mainDivElement.tagName === 'H1') {
                mainDivElement.hidden = true;
            }
        });
    let moviesButton = document.querySelector('a');
    moviesButton.addEventListener('click', loadHomepage);
    let liElements = document.querySelectorAll('li');
    liElements.forEach(element => element.hidden = true);
    let homePageSection = document.getElementById('home-page');
    homePageSection.hidden = false;
    let moviesH1 = document.querySelectorAll('h1')[1];
    moviesH1.hidden = false;
    let moviesSection = document.getElementById('movie');
    moviesSection.hidden = false;
    getAllMovies();
    let user = JSON.parse(sessionStorage.getItem('user'));
    if (!user) {
        let loginLi = liElements[2];
        loginLi.hidden = false;
        let loginButton = document.querySelector('ul').children[2].children[0];
        loginButton.addEventListener('click', login);
        let registerLi = liElements[3];
        registerLi.hidden = false;
        let registerButton = document.querySelector('ul').children[3].children[0];
        registerButton.addEventListener('click', register);
    }
    else {
        let welcomeLi = liElements[0];
        welcomeLi.hidden = false;
        let email = user.email;
        let welcomeButton = document.querySelector('ul').children[0].children[0];
        welcomeButton.textContent = `Welcome, ${email}`;
        let logoutLi = liElements[1];
        logoutLi.hidden = false;
        let logoutButton = document.querySelector('ul').children[1].children[0];
        logoutButton.addEventListener('click', logout);
        let addMovieButton = document.getElementById('add-movie-button');
        addMovieButton.hidden = false;
        let realAddMovieButton = addMovieButton.children[0];
        realAddMovieButton.addEventListener('click', addMovie);
    }
}
async function getAllMovies() {
    let moviesDiv = document.querySelector('#movie div > div > div');
    Array
        .from(moviesDiv.children)
        .forEach(movie => movie.remove());
    let url = 'http://localhost:3030/data/movies';
    let getAllMoviesResponse = await fetch(url);
    let allMovies = await getAllMoviesResponse.json();
    allMovies.forEach(movieInfoObject => {
        let firstDiv = document.createElement('div');
        firstDiv.classList.add('card', 'mb-4');
        let img = document.createElement('img');
        img.classList.add('card-img-top');
        let image = movieInfoObject.img;
        img.src = image;
        img.alt = 'Card image cap';
        img.width = 400;
        firstDiv.appendChild(img);
        let secondDiv = document.createElement('div');
        secondDiv.classList.add('card-body');
        let h4 = document.createElement('h4');
        h4.classList.add('card-title');
        let title = movieInfoObject.title;
        h4.textContent = title;
        secondDiv.appendChild(h4);
        firstDiv.appendChild(secondDiv);
        let thirdDiv = document.createElement('div');
        thirdDiv.classList.add('card-footer');
        let a = document.createElement('a');
        let id = movieInfoObject._id;
        a.href = `#/details/${id}`;
        let button = document.createElement('button');
        button.type = 'button';
        button.classList.add('btn', 'btn-info');
        button.textContent = 'Details';
        button.id = id;
        button.addEventListener('click', viewDetails);
        a.appendChild(button);
        thirdDiv.appendChild(a);
        firstDiv.appendChild(thirdDiv);
        moviesDiv.appendChild(firstDiv);
    });
}
async function viewDetails(e) {
    let user = JSON.parse(sessionStorage.getItem('user'));
    if (user) {
        let mainDiv = document.querySelector('div');
        let mainDivElements = mainDiv.children;
        Array
            .from(mainDivElements)
            .forEach(mainDivElement => {
                if (mainDivElement.tagName === 'SECTION' || mainDivElement.tagName === 'H1') {
                    mainDivElement.hidden = true;
                }
            });
        let liElements = document.querySelectorAll('li');
        liElements.forEach(element => element.hidden = true);
        let welcomeLi = liElements[0];
        welcomeLi.hidden = false;
        let email = user.email;
        let welcomeButton = document.querySelector('ul').children[0].children[0];
        welcomeButton.textContent = `Welcome, ${email}`;
        let logoutLi = liElements[1];
        logoutLi.hidden = false;
        let viewDetailsSection = document.getElementById('movie-example');
        viewDetailsSection.hidden = false;
        let previousMovie = viewDetailsSection.children[0];
        previousMovie.remove();
        let clickedMovie = e.target;
        let id = clickedMovie.id;
        let url = `http://localhost:3030/data/movies/${id}`;
        let getMovieInfoResponse = await fetch(url);
        let movieInfo = await getMovieInfoResponse.json();
        let firstDiv = document.createElement('div');
        firstDiv.classList.add('container');
        let secondDiv = document.createElement('div');
        secondDiv.classList.add('row', 'bg-light', 'text-dark');
        let h1 = document.createElement('h1');
        let title = movieInfo.title;
        h1.textContent = title;
        secondDiv.appendChild(h1);
        let thirdDiv = document.createElement('div');
        thirdDiv.classList.add('col-md-8');
        let img = document.createElement('img');
        img.classList.add('img-thumbnail');
        let image = movieInfo.img;
        img.src = image;
        img.alt = 'Movie';
        thirdDiv.appendChild(img);
        secondDiv.appendChild(thirdDiv);
        let fourthDiv = document.createElement('div');
        fourthDiv.classList.add('col-md-4', 'text-center');
        let h3 = document.createElement('h3');
        h3.classList.add('my-3');
        h3.textContent = 'Description';
        fourthDiv.appendChild(h3);
        let p = document.createElement('p');
        let description = movieInfo.description;
        p.textContent = description;
        fourthDiv.appendChild(p);
        let userId = user._id;
        let ownerId = movieInfo._ownerId;
        if (userId === ownerId) {
            let deleteA = document.createElement('a');
            deleteA.classList.add('btn', 'btn-danger');
            deleteA.href = '#';
            deleteA.textContent = 'Delete';
            deleteA.id = id;
            deleteA.addEventListener('click', deleteMovie);
            fourthDiv.appendChild(deleteA);
            let editA = document.createElement('a');
            editA.classList.add('btn', 'btn-warning');
            editA.href = '#';
            editA.textContent = 'Edit';
            editA.id = id;
            editA.addEventListener('click', editMoviePage);
            fourthDiv.appendChild(editA);
        }
        else {
            let likeA = document.createElement('a');
            likeA.classList.add('btn', 'btn-primary');
            likeA.href = '#';
            likeA.textContent = 'Like';
            likeA.id = id;
            likeA.addEventListener('click', likeMovie);
            fourthDiv.appendChild(likeA);
            let span = document.createElement('span');
            span.classList.add('enrolled-span');
            span.textContent = '';
            span.hidden = true;
            fourthDiv.appendChild(span);
        }
        secondDiv.appendChild(fourthDiv);
        firstDiv.appendChild(secondDiv);
        viewDetailsSection.appendChild(firstDiv);
    }
}
async function deleteMovie(e) {
    let movieDeleteButton = e.target;
    let movieDeleteButtonId = movieDeleteButton.id;
    let url = `http://localhost:3030/data/movies/${movieDeleteButtonId}`;
    let user = JSON.parse(sessionStorage.getItem('user'));
    let token = user.accessToken;
    let deleteMovieResponse = await fetch(url, {
        method: 'DELETE',
        headers: {
            'X-Authorization': token,
        },
    });
    if (deleteMovieResponse.ok) {
        loadHomepage();
    }
    else {
        let error = await deleteMovieResponse.json();
        let message = error.message;
        alert(message);
        return;
    }
}
function editMoviePage(e) {
    let mainDiv = document.querySelector('div');
    let mainDivElements = mainDiv.children;
    Array
        .from(mainDivElements)
        .forEach(mainDivElement => {
            if (mainDivElement.tagName === 'SECTION' || mainDivElement.tagName === 'H1') {
                mainDivElement.hidden = true;
            }
        });
    let liElements = document.querySelectorAll('li');
    liElements.forEach(element => element.hidden = true);
    let welcomeLi = liElements[0];
    welcomeLi.hidden = false;
    let user = JSON.parse(sessionStorage.getItem('user'));
    let email = user.email;
    let welcomeButton = document.querySelector('ul').children[0].children[0];
    welcomeButton.textContent = `Welcome, ${email}`;
    let logoutLi = liElements[1];
    logoutLi.hidden = false;
    let editMovieSection = document.getElementById('edit-movie');
    editMovieSection.hidden = false;
    let editMovieForm = editMovieSection.querySelector('form');
    let id = e.target.id;
    editMovieForm.id = id;
    editMovieForm.addEventListener('submit', editMovie);
}
async function editMovie(e) {
    e.preventDefault();
    let form = e.target;
    let formData = new FormData(form);
    let title = formData.get('title');
    let description = formData.get('description');
    let img = formData.get('imageUrl');
    if (title === '' || description === '' || img === '') {
        alert('All fields must be filled!');
        return;
    }
    let movieId = e.target.id;
    let url = `http://localhost:3030/data/movies/${movieId}`;
    let user = JSON.parse(sessionStorage.getItem('user'));
    let token = user.accessToken;
    let editMovieRequestBody = {
        title,
        description,
        img,
    };
    let body = JSON.stringify(editMovieRequestBody);
    let editMovieResponse = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': token,
        },
        body,
    });
    form.reset();
    if (editMovieResponse.ok) {
        let mainDiv = document.querySelector('div');
        let mainDivElements = mainDiv.children;
        Array
            .from(mainDivElements)
            .forEach(mainDivElement => {
                if (mainDivElement.tagName === 'SECTION' || mainDivElement.tagName === 'H1') {
                    mainDivElement.hidden = true;
                }
            });
        let liElements = document.querySelectorAll('li');
        liElements.forEach(element => element.hidden = true);
        let welcomeLi = liElements[0];
        welcomeLi.hidden = false;
        let user = JSON.parse(sessionStorage.getItem('user'));
        let email = user.email;
        let welcomeButton = document.querySelector('ul').children[0].children[0];
        welcomeButton.textContent = `Welcome, ${email}`;
        let logoutLi = liElements[1];
        logoutLi.hidden = false;
        let viewDetailsSection = document.getElementById('movie-example');
        viewDetailsSection.hidden = false;
        let previousMovie = viewDetailsSection.children[0];
        previousMovie.remove();
        let getMovieInfoResponse = await fetch(url);
        let movieInfo = await getMovieInfoResponse.json();
        let firstDiv = document.createElement('div');
        firstDiv.classList.add('container');
        let secondDiv = document.createElement('div');
        secondDiv.classList.add('row', 'bg-light', 'text-dark');
        let h1 = document.createElement('h1');
        let title = movieInfo.title;
        h1.textContent = title;
        secondDiv.appendChild(h1);
        let thirdDiv = document.createElement('div');
        thirdDiv.classList.add('col-md-8');
        let img = document.createElement('img');
        img.classList.add('img-thumbnail');
        let image = movieInfo.img;
        img.src = image;
        img.alt = 'Movie';
        thirdDiv.appendChild(img);
        secondDiv.appendChild(thirdDiv);
        let fourthDiv = document.createElement('div');
        fourthDiv.classList.add('col-md-4', 'text-center');
        let h3 = document.createElement('h3');
        h3.classList.add('my-3');
        h3.textContent = 'Description';
        fourthDiv.appendChild(h3);
        let p = document.createElement('p');
        let description = movieInfo.description;
        p.textContent = description;
        fourthDiv.appendChild(p);
        let deleteA = document.createElement('a');
        deleteA.classList.add('btn', 'btn-danger');
        deleteA.href = '#';
        deleteA.textContent = 'Delete';
        deleteA.id = movieId;
        deleteA.addEventListener('click', deleteMovie);
        fourthDiv.appendChild(deleteA);
        let editA = document.createElement('a');
        editA.classList.add('btn', 'btn-warning');
        editA.href = '#';
        editA.textContent = 'Edit';
        editA.id = movieId;
        editA.addEventListener('click', editMoviePage);
        fourthDiv.appendChild(editA);
        secondDiv.appendChild(fourthDiv);
        firstDiv.appendChild(secondDiv);
        viewDetailsSection.appendChild(firstDiv);
    }
    else {
        let error = await editMovieResponse.json();
        let message = error.message;
        alert(message);
        return;
    }
}
async function likeMovie(e) {
    e.preventDefault();
    let url = 'http://localhost:3030/data/likes';
    let user = JSON.parse(sessionStorage.getItem('user'));
    let token = user.accessToken;
    let likeButton = e.target;
    let movieId = likeButton.id;
    let likeMovieBody = { movieId };
    let body = JSON.stringify(likeMovieBody);
    let likeMovieResponse = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': token,
        },
        body,
    });
    if (likeMovieResponse.ok) {
        likeButton.remove();
        let viewDetailsSection = document.getElementById('movie-example');
        let span = viewDetailsSection.querySelector('span');
        span.hidden = false;
        let getLikesByMovieIdUrl = `http://localhost:3030/data/likes?where=movieId%3D%22${movieId}%22&distinct=_ownerId&count`;
        let getLikesByMovieIdResponse = await fetch(getLikesByMovieIdUrl);
        let likesByMovieId = await getLikesByMovieIdResponse.json();
        span.textContent = `Liked: ${likesByMovieId}`;
    }
    else {
        let error = await likeMovieResponse.json();
        let message = error.message;
        alert(message);
        return;
    }
}
function login() {
    let mainDiv = document.querySelector('div');
    let mainDivElements = mainDiv.children;
    Array
        .from(mainDivElements)
        .forEach(mainDivElement => {
            if (mainDivElement.tagName === 'SECTION' || mainDivElement.tagName === 'H1') {
                mainDivElement.hidden = true;
            }
        });
    let liElements = document.querySelectorAll('li');
    liElements.forEach(element => element.hidden = true);
    let loginLi = liElements[2];
    loginLi.hidden = false;
    let registerLi = liElements[3];
    registerLi.hidden = false;
    let loginSection = document.getElementById('form-login');
    loginSection.hidden = false;
    let loginForm = loginSection.querySelector('form');
    loginForm.addEventListener('submit', loginUser);
}
async function loginUser(e) {
    e.preventDefault();
    let form = e.target;
    let formData = new FormData(form);
    let email = formData.get('email');
    let password = formData.get('password');
    if (email === '' || password === '') {
        alert('All fields must be filled!');
        return;
    }
    let url = 'http://localhost:3030/users/login';
    let loginRequestBody = {
        email,
        password,
    };
    let body = JSON.stringify(loginRequestBody);
    let loginResponse = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body,
    });
    form.reset();
    if (loginResponse.ok) {
        let loginResult = await loginResponse.json();
        let loggedUser = JSON.stringify(loginResult);
        sessionStorage.setItem('user', loggedUser);
        loadHomepage();
    }
    else {
        let error = await loginResponse.json();
        let message = error.message;
        alert(message);
        return;
    }
}
function register() {
    let mainDiv = document.querySelector('div');
    let mainDivElements = mainDiv.children;
    Array
        .from(mainDivElements)
        .forEach(mainDivElement => {
            if (mainDivElement.tagName === 'SECTION' || mainDivElement.tagName === 'H1') {
                mainDivElement.hidden = true;
            }
        });
    let liElements = document.querySelectorAll('li');
    liElements.forEach(element => element.hidden = true);
    let loginLi = liElements[2];
    loginLi.hidden = false;
    let registerLi = liElements[3];
    registerLi.hidden = false;
    let registerSection = document.getElementById('form-sign-up');
    registerSection.hidden = false;
    let registerForm = registerSection.querySelector('form');
    registerForm.addEventListener('submit', registerUser);
}
async function registerUser(e) {
    e.preventDefault();
    let form = e.target;
    let formData = new FormData(form);
    let email = formData.get('email');
    let regex = /[a-z0-9]+@[a][b][v].[b][g]/gm;
    let isEmailValid = email.match(regex);
    let password = formData.get('password');
    let repeatPassword = formData.get('repeatPassword');
    if (email === '' || password === '' || repeatPassword === '') {
        alert('All fields must be filled!');
        return;
    }
    if (isEmailValid === null || password.length < 6 || password !== repeatPassword) {
        alert('Invalid email/password or passwords don\'t match!');
        return;
    }
    let url = 'http://localhost:3030/users/register';
    let registerRequestBody = {
        email,
        password,
    };
    let body = JSON.stringify(registerRequestBody);
    let registerResponse = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body,
    });
    form.reset();
    if (registerResponse.ok) {
        let registerResult = await registerResponse.json();
        let _createdOn = registerResult._createdOn;
        let _id = registerResult._id;
        let accessToken = registerResult.accessToken;
        let registeredUserObject = {
            email,
            password,
            _createdOn,
            _id,
            accessToken,
        };
        let registeredUser = JSON.stringify(registeredUserObject);
        sessionStorage.setItem('user', registeredUser);
        loadHomepage();
    }
    else {
        let error = await registerResponse.json();
        let message = error.message;
        alert(message);
        return;
    }
}
async function logout() {
    let url = 'http://localhost:3030/users/logout';
    let user = JSON.parse(sessionStorage.getItem('user'));
    let token = user.accessToken;
    let logoutResponse = await fetch(url, {
        headers: {
            'X-Authorization': token,
        },
    });
    if (logoutResponse.ok) {
        sessionStorage.clear();
        login();
    }
    else {
        let error = await logoutResponse.json();
        let message = error.message;
        alert(message);
        return;
    }
}
function addMovie() {
    let mainDiv = document.querySelector('div');
    let mainDivElements = mainDiv.children;
    Array
        .from(mainDivElements)
        .forEach(mainDivElement => {
            if (mainDivElement.tagName === 'SECTION' || mainDivElement.tagName === 'H1') {
                mainDivElement.hidden = true;
            }
        });
    let liElements = document.querySelectorAll('li');
    liElements.forEach(element => element.hidden = true);
    let welcomeLi = liElements[0];
    welcomeLi.hidden = false;
    let user = JSON.parse(sessionStorage.getItem('user'));
    let email = user.email;
    let welcomeButton = document.querySelector('ul').children[0].children[0];
    welcomeButton.textContent = `Welcome, ${email}`;
    let logoutLi = liElements[1];
    logoutLi.hidden = false;
    let addMovieSection = document.getElementById('add-movie');
    addMovieSection.hidden = false;
    let addMovieForm = addMovieSection.querySelector('form');
    addMovieForm.addEventListener('submit', addNewMovie);
}
async function addNewMovie(e) {
    e.preventDefault();
    let form = e.target;
    let formData = new FormData(form);
    let title = formData.get('title');
    let description = formData.get('description');
    let img = formData.get('imageUrl');
    if (title === '' || description === '' || img === '') {
        alert('All fields must be filled!');
        return;
    }
    let url = 'http://localhost:3030/data/movies';
    let user = JSON.parse(sessionStorage.getItem('user'));
    let token = user.accessToken;
    let addMovieRequestBody = {
        title,
        description,
        img,
    };
    let body = JSON.stringify(addMovieRequestBody);
    let addMovieResponse = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': token,
        },
        body,
    });
    form.reset();
    if (addMovieResponse.ok) {
        loadHomepage();
    }
    else {
        let error = await addMovieResponse.json();
        let message = error.message;
        alert(message);
        return;
    }
}