(function (window) {
    'use strict';
    let App = window.App || {};
    let $ = window.jQuery;
    function CheckList(selector) {
        if (!selector){
            throw new Error('No selector provided');
        }
        this.$element = $(selector);
        if(this.$element.length === 0) {
            throw new Error("Couldn't find element with selector: " + selector);
        }
    }

    CheckList.prototype.removeRow =  function (email) {
        this.$element
            .find('[value="' + email+ '"]')
            .closest('[data-order="checkbox"]')
            .remove();
    }

    function Row(Order) {
        let $div = $('<div></div>', {
            'data-order': 'checkbox',
            'class': 'checkbox'
        });
        let $label = $('<label></label>');

        let $checkbox = $('<input></input>', {
            type: 'checkbox',
            value: Order.emailAddress
        });
        // Orders (Folow the set up below with the name of the option next in line.)
        let description = Order.emailAddress + ' ';
        description += ' (' + Order.Option1 + ')';
        description += ' (' + Order.Option2 + ')';
        description += ' (' + Order.Option3 + ')';
        description += ' (' + Order.Option4 + ')';
        description += ' (' + Order.Option5 + ')';
        description += ' (' + Order.Option6 + ')';
        description += ' (' + Order.Option7 + ')';

        $label.append($checkbox);
        $label.append(description);
        $div.append($label);

        this.$element = $div;
    }

    CheckList.prototype.addClickHandler = function (func) {
        this.$element.on('click', 'input', function(event) {
            var email = event.target.value;
            this.removeRow(email);
            func(email);
        }.bind(this));
    }

    CheckList.prototype.addRow = function (Order) {
        this.removeRow(Order.emailAddress);
        var rowElement = new Row(Order);
        this.$element.append(rowElement.$element);
    }

    App.CheckList = CheckList;
    window.App = App;
})(window);