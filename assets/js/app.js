const listaTweets = document.getElementById('lista-tweets');

function agregarTweetLocalStorage(tweet) {
    let tweets;
    tweets =obtenerTweetsLocalStorage();
    // añadir el nuevo tweets
    tweets.push(tweet);
    localStorage.setItem('tweets', JSON.stringify(tweets));
}
// comprobar que haya elementos en localStorage, retorna un arreglo
function obtenerTweetsLocalStorage() {
    let tweets;
    
    if (localStorage.getItem('tweets')=== null){
        tweets = [];
    } else {
        tweets = JSON.parse(localStorage.getItem('tweets'));
    }
    return tweets;
}

// Añadir tweets del formulario
function agregarTweet(e) {
    e.preventDefault();
    const tweet = document.getElementById('tweet').value;
    const botonBorrar = document.createElement('a');
    botonBorrar.classList ='borrar-tweet';
    botonBorrar.innerText = 'X';
    // crear elemento y añadir a la lista
    const li = document.createElement('li');
    li.innerText = tweet;
    // añade el boton de borrar el tweet
    li.appendChild(botonBorrar);
    // añade el tweet a la lista 
    listaTweets.appendChild(li);
    // añadir al localStorage
    agregarTweetLocalStorage(tweet);
    // console.log(tweet);
}
function borrarTweet(e) {
    e.preventDefault();
    // console.log('diste click en la lista');
    if (e.target.className ==='borrar-tweet'){
        // console.log('diste click en eliminar');
        (e.target.parentElement.remove());
        // alert('tweet eliminado')
        // localStorage.removeItem
        borrarTweetLocalStore(e.target.parentElement.innerText);
        // console.log();
    }
}
function borrarTweetLocalStore(tweet) {
    let tweets, tweetBorrar;
    // elimina la X del tweet
    tweetBorrar = tweet.substring(0,tweet.length-1);
    tweets =obtenerTweetsLocalStorage();
    tweets.forEach(function (tweet,index) {
        if( tweetBorrar ===tweet){
            tweets.splice(index,1)
        }
    });

    localStorage.setItem('tweets',JSON.stringify(tweets));
    console.log(tweets);
}

// mostrar datos de localstorage en la lista
function localStorageListo() {
    let tweets;
    tweets = obtenerTweetsLocalStorage();
    // console.log(tweets);
    // leemos los tweets del vector
    tweets.forEach(function(tweet){
        const botonBorrar = document.createElement('a');
        botonBorrar.classList = 'borrar-tweet';
        botonBorrar.innerText = 'X';
        
        const li = document.createElement('li');
        li.innerText =tweet;
        li.appendChild(botonBorrar);
        listaTweets.appendChild(li);
    })
}
// event listeners

function eventListeners() {
    // cuando se envia el formulario
    document.querySelector('#formulario').addEventListener('submit',agregarTweet);
    // borrar tweets
    listaTweets.addEventListener('click',borrarTweet);
    // contenido cargado
    document.addEventListener('DOMContentLoaded',localStorageListo)

}
eventListeners();