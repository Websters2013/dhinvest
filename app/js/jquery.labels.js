"use strict";
( function(){

    $( function () {

        $.each( $('.site__form'), function () {

            new LabelForm( $(this) );

        } );

    } );

    var LabelForm = function ( obj ) {

        var _self = this,
            _obj = obj,
            _input = _obj.find('input:not([readonly]), textarea');

        var _addEvents = function () {

                _input.on( {
                    focusin: function() {

                        _addClassOnFocus( $(this) );

                    },
                    focusout: function() {

                        _removeClassOnFocusOut( $(this) );
                        _checkOnEmpty( $(this) );

                    }
                } );

            },
            _addClassOnFocus = function( input ) {

               var field = input,
                   inputParent = field.parent();

                inputParent.addClass('site__fields_focus');

            },
            _removeClassOnFocusOut = function( input ) {

                var field = input,
                    inputParent = field.parent();

                inputParent.removeClass('site__fields_focus');

            },
            _checkOnEmpty = function ( input ) {

                var field = input,
                    inputParent = field.parent();

                if( !( field.val() == '' ) ) {

                    inputParent.addClass('site__fields_focus');

                }

            },
            _init = function() {
                _obj[0].obj = _self;
                _addEvents();

                _input.each( function() {

                    _checkOnEmpty( $(this) );

                } );

            };

        _init();
    };

} )();