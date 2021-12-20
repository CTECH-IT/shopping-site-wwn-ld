(function (window) {
    'use strict';

    const FORM_SELECTOR = '[data-order="form"]';
    const CHECKLIST_SELECTOR = '[data-order="checklist"]';
    const SERVER_URL = 'https://saturn.rochesterschools.org/python/JS-remote-datastore/data.json';

    let App = window.App;
    let Storage = App.Storage;
    let DataStore = App.DataStore;
    let RemoteDataStore = App.RemoteDataStore;
    let FormHandler = App.FormHandler;
    let CheckList = App.CheckList;
    let Validation = App.Validation;

    let remoteDS = new RemoteDataStore(SERVER_URL);

    let myStorage = new Storage('001', remoteDS);
    let checklist = new CheckList(CHECKLIST_SELECTOR);
    checklist.addClickHandler(myStorage.deliverOrder.bind(myStorage))
    
    window.myStorage = myStorage;
    remoteDS.getAll(function (Order){
        CheckList = 0;
        myStorage.createOrder(CheckList);
    });

    let formHandler = new FormHandler(FORM_SELECTOR);

    formHandler.addSubmitHandler(function (data) {
        myStorage.createOrder.call(myStorage, data);
        checklist.addRow.call(checklist, data);
    });

    formHandler.addInputHandler(Validation.isCompanyEmail);

})(window);