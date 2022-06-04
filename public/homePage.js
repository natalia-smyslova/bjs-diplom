// Выход из личного кабинета

// Создайте объект класса LogoutButton. 

const logoutButton = new LogoutButton();
console.log(logoutButton);

// const Btn = new logoutBtn();
// console.log(Btn);

// В свойство action запишите функцию, которая будет вызывать запрос деавторизации (logout). 

logoutButton.action = function () {
    ApiConnector.logout(function (event) {
        console.log(event);
        // В колбек запроса добавьте проверку: если запрос выполнился успешно,
        // то обновите страницу (с помощью location.reload();).
        if (event.success == true) {
            location.reload();
        }
    });
};



// Получение информации о пользователе

// Выполните запрос на получение текущего пользователя (current), в колбеке которого проверьте ответ:

ApiConnector.current(function (answer) {
    console.log(answer);

    // если ответ успешный, то вызовите метод отображения данных профиля (ProfileWidget.showProfile) 
    // в который передавайте данные ответа от сервера

    if (answer.success == true) {
        ProfileWidget.showProfile(answer.data);
    }
});

// Получение текущих курсов валюты

// Создайте объект типа RatesBoard.

const ratesBoard = new RatesBoard();


// Напишите функцию, которая будет выполнять запрос получения курсов валют.

// let interval = setInterval(func(){}, 1000);

function getRates() {
    ApiConnector.getStocks(function (result) {
        console.log(result);

        // В случае успешного запроса, очищайте таблицу с данными (clearTable) 

        if (result.success == true) {
            ratesBoard.clearTable();

            // и заполняйте её (fillTable) полученными данными.
            ratesBoard.fillTable(result.data);
        }
    })
};

// Вызовите данную функцию для получения текущих валют.
getRates();

// Напишите интервал, который будет многократно выполняться (раз в минуту)
// и вызывать вашу функцию с получением валют.


let interval = setInterval(getRates, 60000);


// Операции с деньгами

// Создайте объект типа MoneyManager

const moneyManager = new MoneyManager();

console.log(moneyManager);

// Реализуйте пополнение баланса:
// Запишите в свойство addMoneyCallback функцию, которая будет выполнять запрос.

moneyManager.addMoneyCallback = function (balance) {
    // Внутри функции выполните запрос на пополнение баланса (addMoney).
    // Используйте аргумент функции свойства addMoneyCallback для передачи данных data в запрос.
    ApiConnector.addMoney(balance, function (result) {
        console.log(balance);
        console.log(result);
        console.log(result.success);
        // После выполнения запроса выполните проверку успешности запроса.
        // В случае успешного запроса отобразите в профиле новые данные о пользователе
        // из данных ответа от сервера (showProfile).

        if (result.success === true) {
            console.log(result);
            ProfileWidget.showProfile(result.data);

            // Также выведите сообщение об успехе или ошибку (причину неудачного действия)
            // пополнении баланса в окне отображения сообщения (setMessage).
            moneyManager.setMessage(result.success, "успешно");
        }
        else {
            moneyManager.setMessage(result.success, result.error);
        }
    });
};

// // Реализуйте конвертирование валюты:

// // Запишите в свойство conversionMoneyCallback функцию, которая будет выполнять запрос.
moneyManager.conversionMoneyCallback = function (newBalance) {
    console.log(newBalance);
    //     // Внутри функции выполните запрос на пополнение баланса (convertMoney)
    //     // Используйте аргумент функции свойства conversionMoneyCallback для передачи данных в запрос.

    ApiConnector.convertMoney(newBalance, function (result) {
        console.log(result);

        if (result.success === true) {
            console.log(result);
            ProfileWidget.showProfile(result.data);

            // Также выведите сообщение об успехе или ошибку (причину неудачного действия)
            // пополнении баланса в окне отображения сообщения (setMessage).
            moneyManager.setMessage(result.success, "успешно");
        }
        else {
            moneyManager.setMessage(result.success, result.error);
        }

    });
}


// // Повторите пункты 2.4-2.7


// // Реализуйте перевод валюты:

// // // Запишите в свойство sendMoneyCallback функцию, которая будет выполнять запрос.
// moneyManager.sendMoneyCallback = function(){
// //     // Внутри функции выполните запрос на пополнение баланса (transferMoney).

//     ApiConnector.transferMoney(transfer, function(){
//         console.log(transfer);
//     });
// };

// // // Используйте аргумент функции свойства sendMoneyCallback для передачи данных в запрос.
// // // Повторите пункты 2.4-2.7




// Работа с избранным

// Создайте объект типа FavoritesWidget

const favoritesWidget = new FavoritesWidget();
// Запросите начальный список избранного:
// Выполните запрос на получение списка избранного (getFavorites).

ApiConnector.getFavorites(function (result) {
    console.log(result);
    // В колбеке запроса проверяйте успешность запроса.
    if (result.success == true) {
        // При успешном запросе очистите текущий список избранного (clearTable)
        favoritesWidget.clearTable();
        // console.log(favoritesWidget.getData());
        console.log(result.data);
        // Отрисуйте полученные данные (fillTable).
        favoritesWidget.fillTable(result.data);
        // Заполните выпадающий список для перевода денег (updateUsersList).
        moneyManager.updateUsersList(result.data);
    }
})

// Реализуйте добавления пользователя в список избранных:

// Запишите в свойство addUserCallback функцию, которая будет выполнять запрос.
favoritesWidget.addUserCallback = function (user) {
    console.log(user);
    // Внутри функции выполните запрос на добавление пользователя (addUserToFavorites).
    // Используйте аргумент функции свойства addUserCallback для передачи данных пользователя в запрос.
    ApiConnector.addUserToFavorites(user, function (result) {
        console.log(result);

        // После выполнения запроса выполните проверку успешности запроса.
        // В случае успеха запроса выполните пункты 2.3-2.5
        // Также выведите сообщение об успехе или ошибку (причину неудачного действия) 
        // добавлении пользователя в окне отображения сообщения (setMessage).

        if (result.success === true) {
            console.log(result);
            // Также выведите сообщение об успехе или ошибку (причину неудачного действия)
            // пополнении баланса в окне отображения сообщения (setMessage).
            favoritesWidget.setMessage(result.success, "успешно");
        }
        else {
            favoritesWidget.setMessage(result.success, result.error);
        }
    });
};

// Реализуйте удаление пользователя из избранного

// Запишите в свойство removeUserCallback функцию, которая будет выполнять запрос.
favoritesWidget.removeUserCallback = function(id){
    console.log(id);
    // Внутри функции выполните запрос на удаление пользователя (removeUserFromFavorites).
    // Используйте аргумент функции свойства removeUserCallback для передачи данных пользователя в запрос.
    ApiConnector.removeUserFromFavorites(id, function(result){
        console.log(result);
        // После запроса выполните пункты 3.4-3.6

        if (result.success === true) {
            console.log(result);
            // Также выведите сообщение об успехе или ошибку (причину неудачного действия)
            // пополнении баланса в окне отображения сообщения (setMessage).
            favoritesWidget.setMessage(result.success, "успешно");
        }
        else {
            favoritesWidget.setMessage(result.success, result.error);
        }
    });
}
