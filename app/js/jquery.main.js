( function(){

    var globalScrollFlag = true;

    $(window).on("load", function() {

        new Preloader( $('.preloader') );

    } );

    $(function () {

        $('.site__header').each(function () {

            new Menu( $(this) );

        } );

        $('.site__menu').each(function () {

            new ScrollPanel($(this));

        } );

        $('.hero .btn').each(function () {

            new ScrollDown($(this));

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

                    if( !_menu.hasClass('opened') ) {
                        _header.removeClass('fixed');
                    }

                }

            },
            _openMenu = function (elem) {

                var curItem = elem;

                if (curItem.hasClass('opened')) {

                    curItem.removeClass('opened');
                    _menu.removeClass('opened');
                    _obj.removeClass('opened');

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

                            _window.scrollTop( siteScrollTop );

                        }, 10);


                    }

                } else {

                    curItem.addClass('opened');
                    _menu.addClass('opened');
                    _obj.addClass('opened');

                    siteScrollTop = _window.scrollTop();

                    if( _window.width()>=1024 ) {

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


                    }


                }


            },
            _closeMenu = function () {

                _showBtn.removeClass('opened');
                _menu.removeClass('opened');

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

                        _window.scrollTop( siteScrollTop );

                    }, 10);

                }

            },
            _init = function () {
                _obj[0].obj = _self;
                _addEvents();
                _fixedHeader();
            };

        _init();
    };

    var Preloader = function (obj) {

        //private properties
        var _self = this,
            _window = $( window ),
            _html = $('html'),
            _preloader = obj,
            _body = $('body');

        //private methods
        var _addEvents = function () {


            },
            _init = function () {

                _body[0].preloader = _self;
                _addEvents();
                _showSite();

            },
            _showSite = function() {

                setTimeout(function(){

                    _preloader.addClass( 'preloader_loaded' );

                },500);

                setTimeout(function(){

                    _html.css( {
                        'overflow-y': 'auto'
                    } );

                    _preloader.remove();

                },800);
            };

        //public properties

        //public methods


        _init();
    };

    var ScrollPanel = function ( obj ) {

        var _self = this,
            _obj = obj,
            _links = _obj.find('[data-href]'),
            _body = $('body'),
            _window = $(window),
            _dom =  $( 'html, body'),
            _header = $('.site__header');

        var _addEvents = function () {

                _window.on( {
                    resize: function () {

                        _changeActive();

                    },
                    'scroll': function () {

                        _changeActive();

                    }

                } );
                _links.on( {
                    click: function() {

                        var curItem = $( this ),
                            newClass = curItem.attr('data-href'),
                            nextItemTop = $( '.' + newClass  ).offset().top;

                        var heightHeader = _header.innerHeight();

                        $('.site__menu a').removeClass('active');
                        curItem.addClass('active');

                        _dom.stop( true, false );
                        _dom.animate( {
                            scrollTop: nextItemTop + 60

                        }, {
                            duration: 500,
                            progress: function () {
                                globalScrollFlag = false;
                                _header.addClass( 'site__header_hidden' );
                                heightHeader = _header.innerHeight();
                            },
                            complete: function () {

                                setTimeout( function() {
                                    globalScrollFlag = false;
                                }, 200 );

                                setTimeout( function() {
                                    globalScrollFlag = true
                                }, 500 );

                            }
                        } );

                        _header.find('.site__header-btn').removeClass('opened');
                        _header.removeClass('opened');

                        return false;

                    }
                } );

            },
            _changeActive = function () {

                var scrollTop = _window.scrollTop(),
                    item = _body.find('[data-scroll="scroll"]'),
                    itemPos = item.offset().top;

                for(var i = 0; i < item.length; i++ ) {

                    var cur = $(item[i]),
                        itemCur = $(item[i]).offset().top - _header.outerHeight(true),
                        itemHeight = $(item[i]).outerHeight(true),
                        curClass = cur.attr('class').split(' '),
                        curLink = _links.filter("[data-href="+curClass[0]+"]");

                    if( scrollTop > itemCur - 20 ) {

                        _links.removeClass('active');
                        curLink.addClass('active');

                    }
                    if( scrollTop > ( itemCur + itemHeight ) ) {

                        _links.removeClass('active');

                    }
                    if( scrollTop < $(item[i]).offset().top ) {

                        curLink.removeClass('active');

                    }
                }
            },
            _init = function() {
                _obj[0].obj = _self;
                _addEvents();
            };

        _init();
    };

    var ScrollDown = function ( obj ) {

        var _self = this,
            _obj = obj,
            _dom =  $( 'html, body'),
            _header = $('.site__header');

        var _addEvents = function () {

                _obj.on( {
                    click: function() {

                        var curItem = $( this ),
                            nextItemTop = curItem.parents('.hero').next().offset().top;

                        var heightHeader = _header.innerHeight();

                        _dom.stop( true, false );
                        _dom.animate( {
                            scrollTop: nextItemTop + 60
                        }, {
                            duration: 500,
                            progress: function () {
                                globalScrollFlag = false;
                                _header.addClass( 'site__header_hidden' );
                                heightHeader = _header.innerHeight();
                            },
                            complete: function () {

                                setTimeout( function() {
                                    globalScrollFlag = false;
                                }, 200 );

                                setTimeout( function() {
                                    globalScrollFlag = true
                                }, 500 );

                            }
                        } );

                        return false;

                    }
                } );

            },
            _init = function() {
                _obj[0].obj = _self;
                _addEvents();
            };

        _init();
    };

} )();