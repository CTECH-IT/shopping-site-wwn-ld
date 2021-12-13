(function (window) {
    'use strict';

    let App = window.App || {};
    let Validation = {
        isCompanyEmail: function (email) {
            return /.+@gmail\.com$/.test(email);
        }
        //isCompanyID: function (ID) {
          //  return /001/.test(ID);
        //}
    };

    App.Validation = Validation;
    window.App = App;
})(window);