(function (window) {
    'use strict';

    const FORM_SELECTOR = '[data-coffee-order="form"]';
    const CHECKLIST_SELECTOR = '[data-coffee-order="checklist"]';
    const SERVER_URL = 'https://coffeerun-V2-rest-api.herokuapp.com/api/coffeeorders';

    let App = window.App;
    let Storage = Storage;

    let remoteDS = new RemoteDataStore(SERVER_URL);

    let myStorage = new Storage('001', remoteDS);
    let checklist = new CheckList(CHECKLIST_SELECTOR);
    checklist.addClickHandler(myStorage.deliverOrder.bind(myStorage))
    
    window.myStorage = myStorage;

    let formHandler = new FormHandler(FORM_SELECTOR);

    formHandler.addSubmitHandler(function (data) {
        myStorage.createOrder.call(myStorage, data);
        checklist.addRow.call(checklist, data);
    });

    formHandler.addInputHandler(Validation.isCompanyEmail);

})(window);