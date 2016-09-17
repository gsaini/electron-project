(function($) {
    'use strict';

    var $form = $('form[name="frmSave"]');

    
    /**
     * init application...
     */
    function init(){
        bindEvents();
    }

    
    /**
     * bind events here..
     */
    function bindEvents(){

        // Patient's Full address - other country checkbox change..
        $form.find('.other-country-chkbox').on('change', function(){
            $form.find('.state-selectbox, .district-selectbox').attr('disabled', this.checked);
        });

        // Last Menstrual Period - not known checkbox change..
        $form.find('.not-known').on('change', function(){
            $form.find('.last-menstrual-period-txtbox').attr('disabled', this.checked);
        });

        // set district based on state selection...
        $form.find('.state-selectbox').on('change', function(){
            $.ajax({
                method: 'POST',
                url: 'http://phpgurukul.com/demos/statedistdropdown/get_district.php',
                data: { 'state_id': this.selectedIndex },
                success:function(response){
                    $form.find('.district-selectbox').html(response);
                }
            });
        });

    }
    
    init();

})(window.jQuery);
