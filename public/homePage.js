const logoutButton = new LogoutButton();

logoutButton.action = () => {
    ApiConnector.logout(response => {
        if (response.success) {
            location.reload();
        }
    })
};


ApiConnector.current((response) => {
    if (response.success) {
        ProfileWidget.showProfile(response.data);
    }
});


const ratesBoard = new RatesBoard();

const getStocks = () => {
    ApiConnector.getStocks(response => {
        if (response.success) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(response.data);
        }
    })
};

getStocks();

setInterval(getStocks, 60000);


const moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = data => {
    ApiConnector.addMoney( data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, 'Балланс пополнен.');
        } else {
            moneyManager.setMessage(response.success, response.error);
        }
    } );
};

moneyManager.conversionMoneyCallback = data => {
    ApiConnector.convertMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, 'Конвертирование валюты выполнено.');
        } else {
            moneyManager.setMessage(response.success, response.error);
        }
    } );
};

moneyManager.sendMoneyCallback = data => {
    ApiConnector.transferMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, 'Перевод валюты выполнен.');
        } else {
            moneyManager.setMessage(response.success, response.error);
        }
    } );
};


const favoritesWidget = new FavoritesWidget;

ApiConnector.getFavorites( response => {
    if (response.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
    }
} );

favoritesWidget.addUserCallback = data => {
    ApiConnector.addUserToFavorites(data, response => {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            favoritesWidget.setMessage(response.success, `Пользователь ${data} добавлен в список избранных.`);
        } else {
            favoritesWidget.setMessage(response.success, response.error);
        }
    } );
}; 

favoritesWidget.removeUserCallback = id => {
    ApiConnector.removeUserFromFavorites(id, response => {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            favoritesWidget.setMessage(response.success, `Пользователь ${id} удалён из списка избранных.`);
        } else {
            favoritesWidget.setMessage(response.success, response.error);
        }
    })
};