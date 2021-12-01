(function (window) {
    'use strict';

    let App  = window.App || {};

    function Storage(storageId, db){
        this.storageId = storageId;
        this.db = db;
    }

    Storage.prototype.createOrder = function (order) {
        console.log('Adding order for ' + order.emailAddress);
        this.db.add(order.emailAddress, order);
    }

    Storage.prototype.deliverOrder = function (customerId) {
        console.log(customerId + " has picked up their order.");
        this.db.remove(customerId);
    }

    Storage.prototype.printOrders = function() {

        let customerIdArray = Object.keys(this.db.getAll());

        console.log('Storage#' + this.storageId + ' has pending orders:');
        customerIdArray.forEach(function (id) {
            console.log(this.db.get(id));
        }.bind(this));
    }

    App.Storage = Storage;
    window.App = App;

}) (window);