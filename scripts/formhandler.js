(function (window) {
    "use strict";

    const FORM_SELECTOR = '[data-order="form"]';

    let App = window.App || {};
    let $ = window.jQuery

    function FormHandler(selector){
        if (!selector) {
            throw new Error('No selector provided!');
        }

        this.$formElement = $(selector);
        if (this.$formElement.length == 0){
            throw new Error("Couldn't find element with elector: " + selector)
        }
    }

    FormHandler.prototype.addSubmitHandler = function (func) {
        console.log('setting submit handler for form');
        this.$formElement.on('submit', function (Event) {

            let data = {};
            $(this).serialzeArray().forEach(function (item) {
                data[item.name] = item.value;
                console.log(item.name + ' is ' + item.value);
            });
            console.log(data);
            func(data);

            this.reset();
            this.elements[0].focus();
        });
    };

    FormHandler.prototype.addInputHandler = function (func) {
        console.log('Setting input handler for form');
        this.$formElement.on('input', '[name="emailAddress"]', function (event) {
            let emailAddress = event.target.value;
            console.log(func(emailAddress));
            if (func(emailAddress) == true) {// use validation.js to check email
                event.target.setCustomValidity('');
            } else {
                event.target.setCustomValidity(emailAddress + ' is not an authorized email address!')
            }
        });
    };


    FormHandler.prototype.addSubmitHandler = function (func) {
        console.log('Setting the submit handler for the form...');
        this.$formElement.on('submit', function(event) {
            event.preventDefault();

            let data = {};
            $(this).serializeArray().forEach(function (item){
            data[item.name] = item.value;
            console.log(item.name + ' is; ' + item.value);
            });
            console.log(data);
            func(data);

            this.reset();
            this.elements[0].focus();
        });
    }

    App.FormHandler = FormHandler;
    window.App= App;
})(window);