( function(){

    var globalScrollFlag = true;

    $(function () {

        $('.site__header').each(function () {

            new Menu( $(this) );

        } );



    } );

    var Menu = function (obj) {

        //private properties
        var _self = this,
            _obj = obj,
            _window = $(window),
            _action = false,
            _lastPos,
            _header = _obj,
            _headerHeight = _header.innerHeight(),
            _showBtn = _obj.find('.site__header-btn'),
            _closeBtn = _obj.find('.site__menu-close'),
            _menu = _obj.find('.site__menu'),
            _site = $('.site'),
            _dom = $( 'html' ),
            siteScrollTop,
            _lastScrollTop = 0;

        //private methods
        var _addEvents = function () {

                _showBtn.on({
                    click: function () {

                        _openMenu($(this));

                    }
                });
                _closeBtn.on({
                    click: function () {

                        _closeMenu();

                        return false;

                    }
                });
                _window.on( {
                    scroll: function ( e ) {
                        _fixedHeader();
                        _action = _window.scrollTop() >= _headerHeight;


                        if( _window.scrollTop() == 0 ) {
                            _header.removeClass('site__header_hidden');
                        }

                    },
                    DOMMouseScroll: function (e) {

                        var delta = e.originalEvent.detail;

                        if (delta) {
                            var direction = (delta > 0) ? 1 : -1;

                            _checkScroll(direction);

                        }

                    },
                    mousewheel: function (e) {

                        var delta = e.originalEvent.wheelDelta;

                        if (delta) {
                            var direction = (delta > 0) ? -1 : 1;

                            _checkScroll(direction);

                        }

                    },
                    touchmove: function (e) {

                        var currentPos = e.originalEvent.touches[0].clientY;

                        if (currentPos > _lastPos) {

                            _checkScroll(-1);


                        } else if (currentPos < _lastPos) {

                            _checkScroll(1);

                        }

                        _lastPos = currentPos;

                    },
                    keydown: function (e) {
                        switch (e.which) {

                            case 32:
                                _checkScroll(1);
                                break;
                            case 33:
                                _checkScroll(-1);
                                break;
                            case 34 :
                                _checkScroll(1);
                                break;
                            case 35 :
                                _checkScroll(1);
                                break;
                            case 36 :
                                _checkScroll(-1);
                                break;
                            case 38:
                                _checkScroll(-1);
                                break;
                            case 40:
                                _checkScroll(1);
                                break;

                            default:
                                return;
                        }
                    },
                    resize: function() {

                        if( _window.width()>=1024 ) {

                            _site.css( {
                                'height': ''
                            } );

                            setTimeout( function() {

                                if( _site.height() > _window.height() ) {
                                    _dom.css( {
                                        'overflow-y': ''
                                    } );
                                }

                            }, 10);

                        }

                    }
                } );

            },
            _checkScroll = function (direction) {

                if (direction > 0 && !_header.hasClass('site__header_hidden') && !_showBtn.hasClass('opened') && _action ) {

                    _header.addClass('site__header_hidden');

                }

                if (direction < 0 && _header.hasClass('site__header_hidden') && !_showBtn.hasClass('opened') && _action && globalScrollFlag) {

                    _header.removeClass('site__header_hidden');

                }

            },
            _fixedHeader = function () {

                if (_window.scrollTop() > _headerHeight + 150  ) {

                    _header.addClass('fixed');

                } else {


                    _header.removeClass('fixed');

                }

            },
            _openMenu = function (elem) {

                var curItem = elem;

                if (curItem.hasClass('opened')) {

                    curItem.removeClass('opened');
                    _menu.removeClass('opened');

                } else {

                    curItem.addClass('opened');
                    _menu.addClass('opened');

                }

                siteScrollTop = _window.scrollTop();


                setTimeout( function() {

                    if( _site.height() > _window.height() ) {
                        _dom.css( {
                            'overflow-y': 'scroll'
                        } );
                    }

                    setTimeout( function() {

                        _site.css( {
                            'height': '100%'
                        } );

                    }, 10);

                }, 300);

            },
            _closeMenu = function () {

                _showBtn.removeClass('opened');
                _menu.removeClass('opened');


                _site.css( {
                    'height': ''
                } );

                setTimeout( function() {

                    if( _site.height() > _window.height() ) {
                        _dom.css( {
                            'overflow-y': ''
                        } );
                    }

                    _window.scrollTop( siteScrollTop );

                }, 10);

            },
            _init = function () {
                _obj[0].obj = _self;
                _addEvents();
                _fixedHeader();
            };

        _init();
    };

} )();