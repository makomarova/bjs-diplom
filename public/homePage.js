const logoutButton = new LogoutButton();
logoutButton.action = function(){
    ApiConnector.logout(answer =>{
        if (answer){
            location.reload();
        }
    });
}

ApiConnector.current(answer =>{
    if(answer.success){
        ProfileWidget.showProfile(answer.data);
    }
})

const ratesBoard = new RatesBoard();
const getRates = function(){
    ApiConnector.getStocks(answer => {
        if(answer.success){
            ratesBoard.clearTable();
           ratesBoard.fillTable(answer.data);
        }
    });
}
getRates();
setInterval(getRates, 60000);

const moneyManager = new MoneyManager();
moneyManager.addMoneyCallback = function(data){
    ApiConnector.addMoney(data, answer => {
        if(answer.success){
            ProfileWidget.showProfile(answer.data);
            moneyManager.setMessage(true, 'Пополнение прошло успешно!');
        } else {
            moneyManager.setMessage(false, 'Пополнение не удалось:\n' + answer.error);
        }
    });
}

moneyManager.conversionMoneyCallback = function(data){
    ApiConnector.convertMoney(data, answer => {
        if(answer.success){
            ProfileWidget.showProfile(answer.data);
            moneyManager.setMessage(true, 'Конвертация прошла успешно!');
        } else {
            moneyManager.setMessage(false, 'Конвертация не удалось:\n' + answer.error);
        }
    });
}

moneyManager.sendMoneyCallback  = function(data){
    ApiConnector.transferMoney(data, answer => {
        if(answer.success){
            ProfileWidget.showProfile(answer.data);
            moneyManager.setMessage(true, 'Перевод прошел успешно!');
        } else {
            moneyManager.setMessage(false, 'Перевод не удался:\n' + answer.error);
        }
    });
}

const favoritesWidget = new FavoritesWidget();
ApiConnector.getFavorites(answer => {
    if(answer.success){
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(answer.data);
        moneyManager.updateUsersList(answer.data);
    }
});

favoritesWidget.addUserCallback   = function(data){
    ApiConnector.addUserToFavorites(data, answer => {
        if(answer.success){
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(answer.data);
            favoritesWidget.setMessage(true, 'Пользователь успешно добавлен в избранные!');
            moneyManager.updateUsersList(answer.data);
        } else {
            favoritesWidget.setMessage(false, 'Добавление пользователя в избранные не удалось:\n' + answer.error);
        }
    });
}

favoritesWidget.removeUserCallback  = function(data){
    ApiConnector.removeUserFromFavorites(data, answer => {
        if(answer.success){
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(answer.data);
            favoritesWidget.setMessage(true, 'Пользователь успешно удален из избранных!');
            moneyManager.updateUsersList(answer.data);
        } else {
            favoritesWidget.setMessage(false, 'Удаление пользователя из избранных не удалось:\n' + answer.error);
        }
    });
}