var speed = 100; // Velocità di digitazione
var speed2 = 200; // Velocità di cancellazione
var pauseBetweenWords = 1000; // Pausa tra le parole
var pauseOnWord = 2000; // Pausa quando una parola è completata
var $str = $('#str');
var i = 0;

var messages = [
    "Full Stack Developer",
    "Front-End Developer",
    "Back-End Developer"
];

function typeMessage(message, callback) {
    var pos = 0;

    function type() {
        if (pos < message.length) {
            $str.text($str.text() + message.charAt(pos));
            pos++;
            setTimeout(type, speed);
        } else {
            setTimeout(callback, pauseOnWord);
        }
    }

    type();
}

function eraseMessage(message, callback) {
    var pos = message.length;

    function erase() {
        if (pos >= 0) {
            $str.text(message.substring(0, pos));
            pos--;
            setTimeout(erase, speed2);
        } else {
            setTimeout(callback, pauseBetweenWords);
        }
    }

    erase();
}

function processMessages(index) {
    if (index < messages.length) {
        typeMessage(messages[index], function() {
            eraseMessage(messages[index], function() {
                processMessages((index + 1) % messages.length);
            });
        });
    }
}

// Avvia l'effetto di digitazione con il primo messaggio
$(document).ready(function() {
    processMessages(0);
});

async function checkSiteStatus(url, internalRedirectPath) {
    try {
        // Usa Fetch API per controllare la disponibilità del sito
        const response = await fetch(url, { method: 'GET', mode: 'no-cors' });

        // Anche se mode è impostato su 'no-cors', non è possibile ottenere dettagli sulla risposta
        if (response.ok) {
            console.log('Il sito è raggiungibile.');
        } else {
            console.log(`Codice di stato: ${response.status}`);
        }
    } catch (error) {
        console.error('Errore di connessione:', error);
        // Reindirizza a una pagina interna del tuo sito
        window.location.href = internalRedirectPath;
    }
}

// Esempio di utilizzo
checkSiteStatus('http://127.0.0.1:5500', '/src/page/mini-game.html');
