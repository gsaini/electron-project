(function ($) {
    'use strict';
    var fs = require('fs');

    var $form = $('form[name="frmSave"]');


    /**
     * init application...
     */
    function init() {
        bindEvents();
    }


    /**
     * send form data on server.
     * 
     * @param {any} data
     */
    function sendFormData( data ) {
        $.ajax({
            url: "scripts/mail.php",
            type: 'POST',
            data: data,
            success: function (response) {
                console.info(response);
            },
            error: function () {

            }
        });
    }


    /**
     * save form data on file system to send on server when internet will available.
     * 
     * @param {any} data
     */
    function saveFormData(data) {
        var fileName = `${__dirname}/data/${(new Date()).getTime()}.json`;

        fs.writeFile(fileName, JSON.stringify(data), function (err) {
            if (err) {
                console.info("An error ocurred creating the file " + err.message)
            }
            else {
                console.info("The file has been succesfully saved");
            }
        });
    }

    /**
     * process offline data.
     */
    function processOfflineSavedData(){
        var dirname = `${__dirname}/data/`;
        
        fs.readdir(dirname, function(err, fileNames) {
            if (err) {
                console.error(`error on read directory - ${err}`);
                return;
            }

            fileNames.forEach(function(fileName) {
                fs.readFile(dirname + fileName, 'utf-8', function(err, content) {
                    if (err) {
                        console.error( `error on file read - ${err}`);
                        return;
                    }

                    sendFormData( content );
                });
            });
        });
    }

    
    /**
     * on form submit - process form data.
     * 
     * @param {any} event
     * @returns
     */
    function onFormSubmit( event ) {
        event.preventDefault();

        var data = {};
        $form.serializeArray().map(function (x) { data[x.name] = x.value; });

        if (navigator.onLine) {
            sendFormData( data );
        }
        else {
             saveFormData( data );
        }

        return false;
    }

    
    /**
     * on select state - fetch district list.
     */
    function onSelectState() {
        $.ajax({
            method: 'POST',
            url: 'http://phpgurukul.com/demos/statedistdropdown/get_district.php',
            data: { 'state_id': this.selectedIndex },
            success: function (response) {
                $form.find('.district-selectbox').html(response);
            }
        });
    }

    /**
     * bind events here..
     */
    function bindEvents() {

        // Patient's Full address - other country checkbox change..
        $form.find('.other-country-chkbox').on('change', function () {
            $form.find('.state-selectbox, .district-selectbox').attr('disabled', this.checked);
        });

        // Last Menstrual Period - not known checkbox change..
        $form.find('.not-known').on('change', function () {
            $form.find('.last-menstrual-period-txtbox').attr('disabled', this.checked);
        });

        // set district based on state selection...
        $form.find('.state-selectbox').on('change', onSelectState);

        $form.on('submit', onFormSubmit);
        window.addEventListener('online',  processOfflineSavedData);

    }

    init();

})(window.jQuery);
