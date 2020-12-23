import MainPage from "./pages/mainPages";
import React, { useEffect } from 'react';

function App() {

    function registerSw() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            navigator.serviceWorker.register('sw.js').then(function(registration) {
            // Успешная регистрация
            console.log('ServiceWorker registration successful');
            }, function(err) {
            // При регистрации произошла ошибка
            console.log('ServiceWorker registration failed: ', err);
            });
        });
    }
}

function notifyMe() {
return new Promise(function(resolve, reject) {
    const permissionResult = Notification.requestPermission(function(result) {
      // Поддержка устаревшей версии с функцией обратного вызова. Многие браузеры пока поддерживают эту версию
        resolve(result);
        });

        if (permissionResult) {
        permissionResult.then(resolve, reject);
        }
    })
    .then(function(permissionResult) {
        if (permissionResult !== 'granted') {
        throw new Error('Permission not granted.');
        }
    });
}

    // useEffect(() => {
    //     registerSw()
    //     notifyMe()
    // }, [])
    
    return <MainPage />;
}

export default App;
