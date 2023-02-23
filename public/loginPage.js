"use strict";

const userForm = new UserForm();

userForm.loginFormCallback = function(data) {
    ApiConnector.login(
        data, (response) => {
            if (response.success) {
                location.reload();
            } else {
                this.setLoginErrorMessage(response.error);
            }
        }
    )
}

userForm.registerFormCallback = function(data) {
    ApiConnector.login(
        data, (response) => {
            if (response.success) {
                location.reload();
            } else {
                this.setLoginErrorMessage(response.error);
            }
        }
    )
}