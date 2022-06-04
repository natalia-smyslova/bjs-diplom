//Подключите строгий режим выполнения кода.
"use strict";

//Создайте объект класса UserForm.
const userForm = new UserForm();

//Присвойте свойству loginFormCallback созданного объекта значение функции, 
//которая в качестве аргумента принимает объект data 
//(объект, который содержит логин и пароль, введённые в форму, и который будет передаваться внутри loginFormAction).


userForm.loginFormCallback = function (data) {
    // console.log('loginFormCallback', data);
    //Функция должна выполнять запрос на сервер для попытки авторизации пользователя 
    //(авторизацию пользователя выполняйте с помощью ApiConnector.login).

    //Передайте в запрос авторизации функцию, которая будет выполняться при попытке авторизации.
    //Посмотрите в консоли, какой объект возвращает сервер.
    ApiConnector.login(data, function (result) {
        // console.log(result);
        if (result.success == false) {
            // throw new Error ("Несуществующий пользователь");
            // throw new Error (result.error);
            userForm.setLoginErrorMessage(result.error);
        }
        else {
            // console.log(data);
            location.reload();
        }
    });
};




//Проделайте аналогичные действия со свойством registerFormCallback.

// Передайте запрос на регистрацию.
// Напишите колбек, который будет выполняться после запроса.
// Выведите ошибку или обновите страницу.

userForm.registerFormCallback = function (data) {
    ApiConnector.register((data), function (result) {
        console.log(result);
        if (result.success == false) {
            userForm.setRegisterErrorMessage(result.error)

        }
        else {
            // console.log(data);
            location.reload();
        }
    });
};