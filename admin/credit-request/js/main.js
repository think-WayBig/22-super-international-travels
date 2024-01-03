var MINOVATE = MINOVATE || {};

$(function () {

    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // global inicialization functions
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    MINOVATE.global = {

        init: function () {
            MINOVATE.global.deviceSize();
            MINOVATE.global.layout();
            MINOVATE.global.animsition();
        },

        // device identification function
        deviceSize: function () {
            var jRes = jRespond([
                {
                    label: 'smallest',
                    enter: 0,
                    exit: 479
                }, {
                    label: 'handheld',
                    enter: 480,
                    exit: 767
                }, {
                    label: 'tablet',
                    enter: 768,
                    exit: 991
                }, {
                    label: 'laptop',
                    enter: 992,
                    exit: 1199
                }, {
                    label: 'desktop',
                    enter: 1200,
                    exit: 10000
                }
            ]);
            jRes.addFunc([
                {
                    breakpoint: 'desktop',
                    enter: function () { $body.addClass('device-lg'); },
                    exit: function () { $body.removeClass('device-lg'); }
                }, {
                    breakpoint: 'laptop',
                    enter: function () { $body.addClass('device-md'); },
                    exit: function () { $body.removeClass('device-md'); }
                }, {
                    breakpoint: 'tablet',
                    enter: function () { $body.addClass('device-sm'); },
                    exit: function () { $body.removeClass('device-sm'); }
                }, {
                    breakpoint: 'handheld',
                    enter: function () { $body.addClass('device-xs'); },
                    exit: function () { $body.removeClass('device-xs'); }
                }, {
                    breakpoint: 'smallest',
                    enter: function () { $body.addClass('device-xxs'); },
                    exit: function () { $body.removeClass('device-xxs'); }
                }
            ]);
        },

        layout: function () {
            var defaultHeaderScheme = setup('defaultHeaderScheme'),
                defaultNavbarScheme = setup('defaultNavbarScheme'),
                defaultBrandingScheme = setup('defaultBrandingScheme'),
                defaultColorScheme = setup('defaultColorScheme'),
                defaultHeaderPosition = setup('defaultHeaderPosition'),
                defaultNavbarPosition = setup('defaultNavbarPosition'),
                defaultRightbarVisibility = setup('defaultRightbarVisibility'),
                defaultAppClasses = 'scheme-default ' + defaultColorScheme + ' ' + defaultHeaderPosition + ' ' + defaultRightbarVisibility + ' ' + defaultNavbarPosition + ' ' + defaultHeaderScheme + '';

            $body.addClass(defaultAppClasses);
            $header.addClass(defaultHeaderScheme);
            $branding.addClass(defaultBrandingScheme);
            $sidebar.addClass(defaultNavbarScheme).addClass(defaultNavbarPosition);

            $headerSchemeEl.on('click', function ($event) {
                var scheme = $(this).data('scheme');
                $body.removeClass(defaultHeaderScheme).addClass(scheme);
                $header.removeClass(defaultHeaderScheme).addClass(scheme);
                defaultHeaderScheme = scheme;
                $event.stopPropagation();
                store('defaultHeaderScheme', scheme);
            });

            $brandingSchemeEl.on('click', function ($event) {
                var scheme = $(this).data('scheme');

                $branding.removeClass(defaultBrandingScheme).addClass(scheme);
                defaultBrandingScheme = scheme;
                $event.stopPropagation();
                store('defaultBrandingScheme', scheme);
            });

            $sidebarSchemeEl.on('click', function ($event) {
                var scheme = $(this).data('scheme');

                $body.removeClass(defaultNavbarScheme).addClass(scheme);
                $sidebar.removeClass(defaultNavbarScheme).addClass(scheme);
                defaultNavbarScheme = scheme;
                $event.stopPropagation();
                store('defaultNavbarScheme', scheme);
            });

            $colorSchemeEl.on('click', function ($event) {
                var scheme = $(this).data('scheme');

                $body.removeClass(defaultColorScheme).addClass(scheme);
                defaultColorScheme = scheme;
                $event.stopPropagation();
                store('defaultColorScheme', scheme);
            });

            $fixedHeaderEl.change(function () {
                if ($body.hasClass('header-fixed')) {
                    $body.removeClass('header-fixed').addClass('header-static');
                    store('defaultHeaderPosition', 'header-static');
                } else {
                    $body.removeClass('header-static').addClass('header-fixed');
                    store('defaultHeaderPosition', 'header-fixed');
                }
            });
            $fixedHeaderEl.parent().on('click', function ($event) {
                $event.stopPropagation();
            });

            $fixedAsideEl.change(function () {
                if ($body.hasClass('aside-fixed')) {
                    $body.removeClass('aside-fixed').addClass('aside-static');
                    $sidebar.removeClass('aside-fixed').addClass('aside-static');
                    store('defaultNavbarPosition', 'aside-static');
                } else {
                    $body.removeClass('aside-static').addClass('aside-fixed');
                    $sidebar.removeClass('aside-static').addClass('aside-fixed');
                    store('defaultNavbarPosition', 'aside-fixed');
                }
            });
            $fixedAsideEl.parent().on('click', function ($event) {
                $event.stopPropagation();
            });

            $toggleRightbarEl.on('click', function () {
                if ($body.hasClass('rightbar-hidden')) {
                    $body.removeClass('rightbar-hidden').addClass('rightbar-show');
                    store('defaultRightbarVisibility', 'rightbar-show');
                } else {
                    $body.removeClass('rightbar-show').addClass('rightbar-hidden');
                    store('defaultRightbarVisibility', 'rightbar-hidden');
                }
            });

            if ($app.hasClass('boxed-layout')) {
                $app.parent().addClass('boxed-layout');
            }

            if ($app.hasClass('sidebar-offcanvas')) {
                $app.parent().addClass('sidebar-offcanvas');
            }

            if ($app.hasClass('hz-menu')) {
                $app.parent().addClass('hz-menu');
            }

            if ($app.hasClass('rtl')) {
                $app.parent().addClass('rtl');
            }

        },

        // initialize animsition
        animsition: function () {
            $wrap.animsition({
                inClass: 'fade-in',
                outClass: 'fade-out',
                inDuration: 1500,
                outDuration: 800,
                linkElement: '.animsition-link',
                // e.g. linkElement   :   'a:not([target="_blank"]):not([href^=#])'
                loading: true,
                loadingParentElement: 'body', //animsition wrapper element
                loadingClass: 'animsition-loading',
                unSupportCss: ['animation-duration',
                    '-webkit-animation-duration',
                    '-o-animation-duration'
                ],
                //"unSupportCss" option allows you to disable the "animsition" in case the css property in the array is not supported by your browser.
                //The default setting is to disable the "animsition" in a browser that does not support "animation-duration".

                overlay: false,
                overlayClass: 'animsition-overlay-slide',
                overlayParentElement: 'body'
            });
        }

    };



    /**
       * Store a new settings in the browser
       *
       * @param String name Name of the setting
       * @param String val Value of the setting
       * @returns void
       */
    function store(name, val) {
        if (typeof (Storage) !== "undefined") {
            localStorage.setItem(name, val);
        } else {
            window.alert('Please use a modern browser to properly view this template!');
        }
    }

    /**
     * Get a prestored setting
     *
     * @param String name Name of of the setting
     * @returns String The value of the setting | null
     */
    function get(name) {
        if (typeof (Storage) !== "undefined") {
            return localStorage.getItem(name);
        } else {
            window.alert('Please use a modern browser to properly view this template!');
        }
    }


    function setup(getval) {
        var tmp = get(getval);
        if (tmp) {
            return tmp;
        } else {
            var returnval;
            switch (getval) {
                case 'defaultHeaderScheme':
                    returnval = "scheme-light";
                    break;
                case 'defaultNavbarScheme':
                    returnval = "scheme-light";
                    break;
                case 'defaultBrandingScheme':
                    returnval = "scheme-light";
                    break;
                case 'defaultColorScheme':
                    returnval = "light-scheme-color";
                    break;
                case 'defaultHeaderPosition':
                    returnval = "header-fixed";
                    break;
                case 'defaultNavbarPosition':
                    returnval = "aside-fixed";
                    break;
                case 'defaultRightbarVisibility':
                    returnval = "rightbar-hidden";
            }

            return returnval;
        }


    }


    //!!!!!!!!!!!!!!!!!!!!!!!!!
    // header section functions
    //!!!!!!!!!!!!!!!!!!!!!!!!!

    MINOVATE.header = {

        init: function () {

        }


    };






    //!!!!!!!!!!!!!!!!!!!!!!!!!
    // navbar section functions
    //!!!!!!!!!!!!!!!!!!!!!!!!!

    MINOVATE.navbar = {

        init: function () {
            MINOVATE.navbar.menu();
            MINOVATE.navbar.ripple();
            MINOVATE.navbar.removeRipple();
            MINOVATE.navbar.collapse();
            MINOVATE.navbar.offcanvas();
        },

        menu: function () {
            if ($dropdowns.length > 0) {

                $dropdowns.addClass('dropdown');

                var $submenus = $dropdowns.find('ul >.dropdown');
                $submenus.addClass('submenu');

                $a.append('<i class="fa fa-plus"></i>');

                $a.on('click', function (event) {
                    if ($app.hasClass('sidebar-sm') || $app.hasClass('sidebar-xs') || $app.hasClass('hz-menu')) {
                        return false;
                    }

                    var $this = $(this),
                        $parent = $this.parent('li'),
                        $openSubmenu = $('.submenu.open');

                    if (!$parent.hasClass('submenu')) {
                        $dropdowns.not($parent).removeClass('open').find('ul').slideUp();
                    }

                    $openSubmenu.not($this.parents('.submenu')).removeClass('open').find('ul').slideUp();
                    $parent.toggleClass('open').find('>ul').stop().slideToggle();
                    event.preventDefault();
                });

                $dropdowns.on('mouseenter', function () {
                    $sidebar.addClass('dropdown-open');
                    $controls.addClass('dropdown-open');
                });

                $dropdowns.on('mouseleave', function () {
                    $sidebar.removeClass('dropdown-open');
                    $controls.removeClass('dropdown-open');
                });

                $notDropdownsLinks.on('click', function () {
                    $dropdowns.removeClass('open').find('ul').slideUp();
                });

                var $activeDropdown = $('.dropdown>ul>.active').parent();

                $activeDropdown.css('display', 'block');
            }
        },

        ripple: function () {
            var parent, ink, d, x, y;

            $navigation.find('>li>a').click(function (e) {
                parent = $(this).parent();

                if (parent.find('.ink').length === 0) {
                    parent.prepend('<span class="ink"></span>');
                }

                ink = parent.find('.ink');
                //incase of quick double clicks stop the previous animation
                ink.removeClass('animate');

                //set size of .ink
                if (!ink.height() && !ink.width()) {
                    //use parent's width or height whichever is larger for the diameter to make a circle which can cover the entire element.
                    d = Math.max(parent.outerWidth(), parent.outerHeight());
                    ink.css({ height: d, width: d });
                }

                //get click coordinates
                //logic = click coordinates relative to page - parent's position relative to page - half of self height/width to make it controllable from the center;
                x = e.pageX - parent.offset().left - ink.width() / 2;
                y = e.pageY - parent.offset().top - ink.height() / 2;

                //set the position and add class .animate
                ink.css({ top: y + 'px', left: x + 'px' }).addClass('animate');

                setTimeout(function () {
                    $('.ink').remove();
                }, 600);
            });
        },

        removeRipple: function () {
            $sidebar.find('.ink').remove();
        },

        collapse: function () {
            $collapseSidebarEl.on('click', function (e) {
                if ($app.hasClass('sidebar-sm')) {
                    $app.removeClass('sidebar-sm').addClass('sidebar-xs');

                    store('collapse', 'sidebar-xs');
                }
                else if ($app.hasClass('sidebar-xs')) {
                    $app.removeClass('sidebar-xs');
                    store('collapse', '');
                }
                else {
                    $app.addClass('sidebar-sm');
                    store('collapse', 'sidebar-sm');
                }

                $app.removeClass('sidebar-sm-forced sidebar-xs-forced');
                $app.parent().removeClass('sidebar-sm sidebar-xs');
                MINOVATE.navbar.removeRipple;
                // $window.trigger('resize');
                e.preventDefault();
            });




        },

        offcanvas: function () {
            $offcanvasToggleEl.on('click', function (e) {
                if ($app.hasClass('offcanvas-opened')) {
                    $app.removeClass('offcanvas-opened');
                } else {
                    $app.addClass('offcanvas-opened');
                }
                e.preventDefault();
            });

        }


    };




    //!!!!!!!!!!!!!!!!
    // tiles functions
    //!!!!!!!!!!!!!!!!

    MINOVATE.tiles = {

        init: function () {
            MINOVATE.tiles.toggle();
            MINOVATE.tiles.refresh();
            MINOVATE.tiles.fullscreen();
            MINOVATE.tiles.close();
        },

        toggle: function () {
            $tileToggleEl.on('click', function () {
                var element = $(this);
                var tile = element.parents('.tile');

                tile.toggleClass('collapsed');
                tile.children().not('.tile-header').slideToggle(150);
            });
        },

        refresh: function () {
            $tileRefreshEl.on('click', function () {
                var element = $(this);
                var tile = element.parents('.tile');
                var dropdown = element.parents('.dropdown');

                tile.addClass('refreshing');
                dropdown.trigger('click');

                var t = setTimeout(function () {
                    tile.removeClass('refreshing');
                }, 3000);
            });
        },

        fullscreen: function () {
            $tileFullscreenEl.on('click', function () {
                var element = $(this);
                var tile = element.parents('.tile');
                var dropdown = element.parents('.dropdown');

                screenfull.toggle(tile[0]);
                dropdown.trigger('click');
            });

            if ($tileFullscreenEl.length > 0) {
                $(document).on(screenfull.raw.fullscreenchange, function () {
                    var element = $(screenfull.element);
                    if (screenfull.isFullscreen) {
                        element.addClass('isInFullScreen');
                    } else {
                        $('.tile.isInFullScreen').removeClass('isInFullScreen');
                    }
                });
            }
        },

        close: function () {
            $tileCloseEl.on('click', function () {
                var element = $(this);
                var tile = element.parents('.tile');

                tile.addClass('closed').fadeOut();
            });
        }

    };



    //!!!!!!!!!!!!!!!!
    // extra functions
    //!!!!!!!!!!!!!!!!

    MINOVATE.extra = {

        init: function () {
            MINOVATE.extra.sparklineChart();
            MINOVATE.extra.slimScroll();
            MINOVATE.extra.daterangePicker();
            MINOVATE.extra.easypiechart();
            MINOVATE.extra.chosen();
            MINOVATE.extra.toggleClass();
            MINOVATE.extra.colorpicker();
            MINOVATE.extra.touchspin();
            MINOVATE.extra.datepicker();
            MINOVATE.extra.animateProgress();
            MINOVATE.extra.counter();
            MINOVATE.extra.popover();
            MINOVATE.extra.tooltip();
            MINOVATE.extra.splash();
            MINOVATE.extra.lightbox();
        },

        //initialize sparkline chart on elements
        sparklineChart: function () {

            if ($sparklineEl.length > 0) {
                $sparklineEl.each(function () {
                    var element = $(this);

                    element.sparkline('html', { enableTagOptions: true });
                });
            }

        },

        //initialize slimscroll on elements
        slimScroll: function () {

            if ($slimScrollEl.length > 0) {
                $slimScrollEl.each(function () {
                    var element = $(this);

                    element.slimScroll({ height: '100%' });
                });
            }

        },

        //initialize date range picker on elements
        daterangePicker: function () {

            if ($pickDateEl.length > 0) {
                $pickDateEl.each(function () {
                    var element = $(this);

                    element.find('span').html(moment().subtract(29, 'days').format('MMMM D, YYYY') + ' - ' + moment().format('MMMM D, YYYY'));

                    element.daterangepicker({
                        format: 'MM/DD/YYYY',
                        startDate: moment().subtract(29, 'days'),
                        endDate: moment(),
                        minDate: '01/01/2012',
                        maxDate: '12/31/2015',
                        dateLimit: { days: 60 },
                        showDropdowns: true,
                        showWeekNumbers: true,
                        timePicker: false,
                        timePickerIncrement: 1,
                        timePicker12Hour: true,
                        ranges: {
                            'Today': [moment(), moment()],
                            'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                            'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                            'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                            'This Month': [moment().startOf('month'), moment().endOf('month')],
                            'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
                        },
                        opens: 'left',
                        drops: 'down',
                        buttonClasses: ['btn', 'btn-sm'],
                        applyClass: 'btn-success',
                        cancelClass: 'btn-default',
                        separator: ' to ',
                        locale: {
                            applyLabel: 'Submit',
                            cancelLabel: 'Cancel',
                            fromLabel: 'From',
                            toLabel: 'To',
                            customRangeLabel: 'Custom',
                            daysOfWeek: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
                            monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                            firstDay: 1
                        }
                    }, function (start, end, label) {
                        console.log(start.toISOString(), end.toISOString(), label);
                        element.find('span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
                    });

                });
            }

        },

        easypiechart: function () {
            if ($easypiechartEl.length > 0) {
                $easypiechartEl.each(function () {
                    var element = $(this);
                    element.easyPieChart({
                        onStart: function (value) {
                            if (element.hasClass('animate')) {
                                $(this.el).find('span').countTo({ to: value });
                            }
                        }
                    });
                });
            }
        },

        chosen: function () {
            if ($chosenEl.length > 0) {
                $chosenEl.each(function () {
                    var element = $(this);
                    element.on('chosen:ready', function (e, chosen) {
                        var width = element.css("width");
                        element.next().find('.chosen-choices').addClass('form-control');
                        element.next().css("width", width);
                        element.next().find('.search-field input').css("width", "125px");
                    }).chosen();
                });
            }
        },

        toggleClass: function () {
            $toggleClassEl.on('click', function () {
                var element = $(this),
                    className = element.data('toggle'),
                    type = element.data('type');

                if (type === 'radio') {
                    element.parent().find('.' + className).removeClass(className);
                }

                if (element.hasClass(className)) {
                    element.removeClass(className);
                } else {
                    element.addClass(className);
                }
            });
        },

        colorpicker: function () {
            if ($colorPickerEl.length > 0) {
                $colorPickerEl.each(function () {
                    var element = $(this);
                    element.colorpicker();
                });
            }
        },

        touchspin: function () {
            if ($touchspinEl.length > 0) {
                $touchspinEl.each(function () {
                    var element = $(this);
                    element.TouchSpin();
                });
            }
        },

        datepicker: function () {
            if ($datepickerEl.length > 0) {
                $datepickerEl.each(function () {
                    var element = $(this);
                    var format = element.data('format')
                    element.datetimepicker({
                        format: format
                    });
                });
            }
        },

        animateProgress: function () {
            if ($animateProgressEl.length > 0) {
                $animateProgressEl.each(function () {
                    var element = $(this);
                    var progress = element.data('percentage');

                    element.css('width', progress);
                });
            }
        },

        counter: function () {
            if ($counterEl.length > 0) {
                $counterEl.each(function () {
                    var element = $(this);

                    element.countTo();
                });
            }
        },

        popover: function () {
            $popoverEl = $('[data-toggle="popover"]');
            if ($popoverEl.length > 0) {
                $popoverEl.each(function () {
                    var element = $(this);

                    element.popover();
                });
            }
        },

        tooltip: function () {
            $tooltipEl = $('[data-toggle="tooltip"]');
            if ($tooltipEl.length > 0) {
                $tooltipEl.each(function () {
                    var element = $(this);

                    element.tooltip();
                });
            }
        },

        splash: function () {
            var options = "";
            var target = "";
            $splashEl.on('show.bs.modal', function (e) {
                options = e.relatedTarget.dataset.options;
                target = $(e.target);

                target.addClass(options);
                $body.addClass(options).addClass('splash');
            });
            $splashEl.on('hidden.bs.modal', function () {
                target.removeClass(options);
                $body.removeClass(options).removeClass('splash');
            });
        },

        //initialize magnificPopup lightbox
        lightbox: function () {
            var $lightboxImageEl = $('[data-lightbox="image"]'),
                $lightboxIframeEl = $('[data-lightbox="iframe"]'),
                $lightboxGalleryEl = $('[data-lightbox="gallery"]');

            if ($lightboxImageEl.length > 0) {
                $lightboxImageEl.magnificPopup({
                    type: 'image',
                    closeOnContentClick: true,
                    closeBtnInside: false,
                    fixedContentPos: true,
                    image: {
                        verticalFit: true
                    }
                });
            }

            if ($lightboxIframeEl.length > 0) {
                $lightboxIframeEl.magnificPopup({
                    disableOn: 600,
                    type: 'iframe',
                    removalDelay: 160,
                    preloader: false,
                    fixedContentPos: false
                });
            }

            if ($lightboxGalleryEl.length > 0) {
                $lightboxGalleryEl.each(function () {
                    var element = $(this);

                    if (element.find('a[data-lightbox="gallery-item"]').parent('.clone').hasClass('clone')) {
                        element.find('a[data-lightbox="gallery-item"]').parent('.clone').find('a[data-lightbox="gallery-item"]').attr('data-lightbox', '');
                    }

                    element.magnificPopup({
                        delegate: 'a[data-lightbox="gallery-item"]',
                        type: 'image',
                        closeOnContentClick: true,
                        closeBtnInside: false,
                        fixedContentPos: true,
                        image: {
                            verticalFit: true
                        },
                        gallery: {
                            enabled: true,
                            navigateByImgClick: true,
                            preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
                        }
                    });
                });
            }
        }

    };




    //!!!!!!!!!!!!!!!!!!!!
    // check mobile device
    //!!!!!!!!!!!!!!!!!!!!

    MINOVATE.isMobile = {
        Android: function () {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function () {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function () {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function () {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function () {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function () {
            return (MINOVATE.isMobile.Android() || MINOVATE.isMobile.BlackBerry() || MINOVATE.isMobile.iOS() || MINOVATE.isMobile.Opera() || MINOVATE.isMobile.Windows());
        }
    };



    //!!!!!!!!!!!!!!!!!!!!!!!!!
    // initialize after resize
    //!!!!!!!!!!!!!!!!!!!!!!!!!

    MINOVATE.documentOnResize = {

        init: function () {

            var t = setTimeout(function () {

                MINOVATE.documentOnReady.setSidebar();
                MINOVATE.navbar.removeRipple();

            }, 500);

        }

    };






    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // initialize when document ready
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    MINOVATE.documentOnReady = {

        init: function () {
            MINOVATE.global.init();
            MINOVATE.header.init();
            MINOVATE.navbar.init();
            MINOVATE.documentOnReady.windowscroll();
            MINOVATE.tiles.init();
            MINOVATE.extra.init();
            MINOVATE.documentOnReady.setSidebar();
        },

        // run on window scrolling

        windowscroll: function () {

            $window.on('scroll', function () {


            });
        },


        setSidebar: function () {

            width = $window.width();

            if (width < 992) {
                $app.addClass('sidebar-sm');
            } else {
                $app.removeClass('sidebar-sm sidebar-xs');
            }

            if (width < 768) {
                $app.removeClass('sidebar-sm').addClass('sidebar-xs');
            } else if (width > 992) {
                $app.removeClass('sidebar-sm sidebar-xs');
            } else {
                $app.removeClass('sidebar-xs').addClass('sidebar-sm');
            }

            if ($app.hasClass('sidebar-sm-forced')) {
                $app.addClass('sidebar-sm');
            }

            if ($app.hasClass('sidebar-xs-forced')) {
                $app.addClass('sidebar-xs');
            }

        }

    };







    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // initialize when document load
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    MINOVATE.documentOnLoad = {

        init: function () {

        }

    };






    //!!!!!!!!!!!!!!!!!!!!!!!!!
    // global variables
    //!!!!!!!!!!!!!!!!!!!!!!!!!

    var $window = $(window),
        $body = $('body'),
        $header = $('#header'),
        $branding = $('#header .branding'),
        $sidebar = $('#sidebar'),
        $controls = $('#controls'),
        $app = $('.appWrapper'),
        $navigation = $('#navigation'),
        $sparklineEl = $('.sparklineChart'),
        $slimScrollEl = $('.slim-scroll'),
        $collapseSidebarEl = $('.collapse-sidebar'),
        $wrap = $('#wrap'),
        $offcanvasToggleEl = $('.offcanvas-toggle'),

        //navigation elements
        $dropdowns = $navigation.find('ul').parent('li'),
        $a = $dropdowns.children('a'),
        $notDropdowns = $navigation.children('li').not($dropdowns),
        $notDropdownsLinks = $notDropdowns.children('a'),
        // end of navuigation elements

        $headerSchemeEl = $('.color-schemes .header-scheme'),
        $brandingSchemeEl = $('.color-schemes .branding-scheme'),
        $sidebarSchemeEl = $('.color-schemes .sidebar-scheme'),
        $colorSchemeEl = $('.color-schemes .color-scheme'),
        $fixedHeaderEl = $('#fixed-header'),
        $fixedAsideEl = $('#fixed-aside'),
        $toggleRightbarEl = $('.toggle-right-sidebar'),
        $pickDateEl = $('.pickDate'),

        $tileEl = $('.tile'),
        $tileToggleEl = $('.tile .tile-toggle'),
        $tileRefreshEl = $('.tile .tile-refresh'),
        $tileFullscreenEl = $('.tile .tile-fullscreen'),
        $tileCloseEl = $('.tile .tile-close'),

        $easypiechartEl = $('.easypiechart'),
        $chosenEl = $('.chosen-select'),
        $toggleClassEl = $('.toggle-class'),
        $colorPickerEl = $('.colorpicker'),
        $touchspinEl = $('.touchspin'),
        $datepickerEl = $('.datepicker'),
        $animateProgressEl = $('.animate-progress-bar'),
        $counterEl = $('.counter'),
        $splashEl = $('.splash');


    //!!!!!!!!!!!!!
    // initializing
    //!!!!!!!!!!!!!
    $(document).ready(MINOVATE.documentOnReady.init);
    $window.load(MINOVATE.documentOnLoad.init);
    $window.on('resize', MINOVATE.documentOnResize.init);

    $(function () {
        var tmp = get('collapse');
        if (tmp) {
            $app.addClass(tmp);

            $app.removeClass('sidebar-sm-forced sidebar-xs-forced');
            $app.parent().removeClass('sidebar-sm sidebar-xs');
            MINOVATE.navbar.removeRipple;


        }

    });


    /* Start  active tab bootstrap */
    var url = window.location.href;
    var activeTab = url.substring(url.indexOf("#") + 1);
    $('.nav-tabs a[href="#' + activeTab + '"]').tab('show');
    $('[data-toggle="tab"]').click(function () {
        var active_tab_url = $(this).attr("href");
        window.location.hash = active_tab_url;
    });
    /* End active tab bootstrap */

    /*------------ NAVIGATION MENU ACTIVE SCRIPT---------*/

    $(function () {
        var url = window.location.pathname;
        var activePage = url.substring(url.lastIndexOf('/') + 1);
        $('.ul-open ul li a').each(function () {
            var linkPage = this.href.substring(this.href.lastIndexOf('/') + 1);
            if (activePage === linkPage) {
                $(this).parent().parent().parent().addClass('active open');
                $(this).parent().addClass('active open');
                $(this).parent().parent().css("display", "block");
            }
        });

    });
    $(function () {
        var url = window.location.pathname;
        var activePage = url.substring(url.lastIndexOf('/') + 1);
        $('.not-openable a').each(function () {
            var linkPage = this.href.substring(this.href.lastIndexOf('/') + 1);
            if (activePage === linkPage) {
                $(this).parent().addClass('active');

            }
        });

    });
    /*------------END  NAVIGATION MENU ACTIVE SCRIPT---------*/
});



/*---------------------START ADD PAGE SLUG URL------------*/

function slug_url(val, id) {
    var trimval = val.trim()
    var string = trimval.replace(/[^A-Z0-9]/ig, '-');
    var finalvalue = string.toLowerCase();
    document.getElementById(id).value = finalvalue;
}
/*---------------------END ADD PAGE SLUG URL------------*/


/*------------Start for Custom Confirm box and alert box ---------*/

function confirm_box(text, thisval) {
    var returnval = isobject(thisval);
    if (returnval === true) {
        var link = thisval.getAttribute('href');
        var type = "alink";
    } else if (returnval === false) {
        var link = thisval;
        var type = "form";
    }
    var modal = '<div class="modal-dialog confirmbox modal-sm" role="document">'
        + '<div class="modal-content">'
        + '<div class="modal-body">'
        + '<div class="icon text-center">'
        + '<a href="javascript:void(0)" class="myIcon icon-info icon-ef-6 icon-color">'
        + '<i class="fa fa-exclamation-circle text-yellow big-icon" aria-hidden="true"></i>'
        + '</a>'
        + '</div>'
        + '<div class="boxcontent text-center">'
        + ' <h4>Are you sure?</h4>'
        + '<p>' + text + '</p>'
        + '</div>'
        + '<div class="row">'
        + '<div class="col-xs-6 col-md-6">'
        + '<button class="btn btn-rounded-50p btn-ef btn-ef-2 btn-ef-2-orange btn-ef-2b wh50" data-dismiss="modal">No</button>'
        + '</div>'
        + '<div class="col-xs-6 col-md-6">'
        + '<button class="btn btn-rounded-50p btn-ef btn-ef-2 btn-ef-2-green btn-ef-2a ml-10 wh50 pull-right" onclick="proceed_button(\'' + type + '\',\'' + link + '\')">Yes</button>'
        + '</div>'
        + '</div>'
        + '</div>'
        + '</div>'
        + '</div>';
    $('.confirm-modal').addClass('splash fade splash-2 splash-ef-10');
    $('body').addClass('splash-2 splash-ef-10 splash');
    $('.confirm-modal').modal('show');
    $('.modelcontent').html(modal);
    return false;
}

function proceed_button(type, val) {
    if (type === "alink") {
        window.location.href = val;
    } else if (type === "form") {
        $("#" + val).submit();
    }
}

function alert_box(text) {
    var modal = '<div class="modal-dialog modal-sm alertbox" role="document">'
        + '<div class="modal-content">'
        + '<div class="modal-body">'
        + '<div class="icon text-center">'
        + '<a href="javascript:void(0)" class="myIcon icon-danger icon-ef-5 icon-ef-5d icon-color">'
        + '<i class="fa fa-times-circle text-danger big-icon" aria-hidden="true"></i>'
        + '</a>'
        + '</div>'
        + '<div class="boxcontent text-center">'
        + ' <h4>Oops...</h4>'
        + '<p><strong>' + text + '</strong></p>'
        + '</div>'
        + '<div class="text-center">'
        + '<button class="btn btn-rounded-50p btn-ef btn-ef-2 btn-ef-2-green btn-ef-2a  ml-10 wh50" data-dismiss="modal">OK</button>'
        + '</div>'
        + '</div>'
        + '</div>'
        + '</div>';
    $('.confirm-modal').addClass('splash fade splash-2 splash-ef-10');
    $('body').addClass('splash-2 splash-ef-10 splash');
    $('.confirm-modal').modal('show');
    $('.modelcontent').html(modal);
    return false;
}
/*------------End for Custom Confirm box ---------*/


/*------------Start Checkall Checkbox ---------*/

function ischeckbox(formid) {
    var checkbox = document.getElementsByName('checklist[]');
    var ln = 0;
    for (var i = 0; i < checkbox.length; i++) {
        if (checkbox[i].checked)
            ln++;
    }
    if (ln === 0) {
        alert_box("Please select atleast one checkbox");
    } else {
        confirm_box("Do you want to delete data!", formid);

    }
}

$(document).ready(function () {
    $("#selectall").change(function () {
        $(".checkbox").prop('checked', $(this).prop("checked"));
    });
});

function isselectall(source, target) {
    var checkboxes = document.querySelectorAll('input[type="checkbox"][class=' + target + ']');
    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i] != source)
            checkboxes[i].checked = source.checked;
    }
}

/*------------End Checkall Checkbox ---------*/

function isobject(obj) {
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop))
            return false;
    }
    return true && JSON.stringify(obj) === JSON.stringify({});
}



/*------------------- Start Websecurity page SCRIPT---------*/
$(document).ready(function () {

    if ($("input[name='ip_validate_security']").is(':checked')) {
        $(".boxdiv").show();
    } else {
        $(".boxdiv").hide();
    }

    if ($("input[name='whitelist_all_ip_address']").is(':checked')) {
        $(".boxdiv2").hide();
    } else {
        $(".boxdiv2").show();
    }
    $("input[name='ip_validate_security']").click(function () {
        if ($(this).is(":checked")) {
            $(".boxdiv").show();
        } else {
            $(".boxdiv").hide();
        }
    });

    $("input[name='whitelist_all_ip_address']").click(function () {
        if ($(this).is(":checked")) {
            $(".boxdiv2").hide();
        } else {
            $(".boxdiv2").show();
        }
    });
});

/*------------------- END Websecurity page  SCRIPT---------*/

//load wysiwyg editor
$(function () {
    $('.summernote').summernote({

        height: 350   //set editable area's height
    });
});
//*load wysiwyg editor

/*------------------- Start Image Previwer SCRIPT---------*/

$(function () {

    var imagesPreview = function (input, placeToInsertImagePreview) {
        var $preview = $('.gallery').empty();
        if (input.files) {
            var filesAmount = input.files.length;
            for (i = 0; i < filesAmount; i++) {
                var reader = new FileReader();
                reader.onload = function (event) {

                    $preview.append($("<img/>", { src: event.target.result, height: 100, class: 'img-responsive img_preview ml-10 mb-20' }));
                }
                reader.readAsDataURL(input.files[i]);
            }
        }
    };
    $('#gallery-photo-add').on('change', function () {
        imagesPreview(this, 'div.gallery');
    });




});

/*------------------- END Image Previwer SCRIPT---------*/

/*------------------- Start DSA Change Password SCRIPT---------*/

function randString(id) {
    var dataSet = $(id).attr('data-character-set').split(',');
    var possible = '';
    if ($.inArray('a-z', dataSet) >= 0) {
        possible += 'abcdefghijklmnopqrstuvwxyz';
    }
    if ($.inArray('A-Z', dataSet) >= 0) {
        possible += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    }
    if ($.inArray('0-9', dataSet) >= 0) {
        possible += '0123456789';
    }
    if ($.inArray('#', dataSet) >= 0) {
        possible += '![]{}()%&*$#^<>~@|';
    }
    var text = '';
    for (var i = 0; i < $(id).attr('data-size'); i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

// Create a new password
$(".getNewPass").click(function () {
    var field = $(this).closest('div').find('input[rel="gp"]');
    field.val(randString(field));
});

// Auto Select Pass On Focus
$('input[rel="gp"]').on("click", function () {
    $(this).select();
});


function changepassword_modal(id, company) {
    $(".changepassword-modal").modal('show');
    $('.company_name').html(company);
    $('#input_user_id').val(id);
}

function dsachangepassword() {
    alert("ddddd");
    /* $.post("", function(data){
        document.getElementsByClassName('putairlinelist').innerHTML=data;
    })  */
}
/*------------------- End DSA Change Password SCRIPT---------*/


function isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        alert_box("Please enter numeric value only");
        return false;
    }
    return true;
}




function update_credit_limit(id, company_name) {


    $(".updatecredit-modal").modal('show');
    $('.company_name_name').html(company_name);
    $('#crdituser_user_id').val(id);


}


/*  Start For Flight Deals Js  */
$(function () {

    $(".dj_type").click(function () {
        var get_val = $(this).val();
        if (get_val == "oneway") {
            $(".return_date").prop('disabled', true);

        } else if (get_val == "round") {
            $(".return_date").prop('disabled', false);
        }

    });


    $(".fd_depart_d").datepicker({
        dateFormat: "dd/mm/yy",
        minDate: "0",
        showAnim: "clip",
        changeMonth: true,
        changeYear: true,
        onClose: function (selectedDate) {
            $(".fd_return_d").datepicker("option", "minDate", selectedDate);
        }
    });
    $(".fd_return_d").datepicker({
        dateFormat: "dd/mm/yy",
        minDate: "0",
        showAnim: "clip",
        changeMonth: true,
        changeYear: true,
        onClose: function (selectedDate) {
            $(".fd_depart_d").datepicker("option", selectedDate);
        }
    });
    var hiturl = document.location.origin + '/travelitq/admin/';

    $("[data-from-location]").autocomplete({
        minLength: 0,
        maxResults: 15,
        source: function (request, response) {
            $.ajax({
                url: hiturl + 'Flightdeals/getairport',
                dataType: "json",
                cache: false,
                data: {
                    term: request.term
                },
                success: function (data) {
                    response(data);
                }
            });
        },
        open: function () {
            $(".ui-autocomplete").addClass('ttsautocomplet');
        },
        select: function (event, ui) {
            $("[data-from-location]").val(ui.item.label);
            $("[data-to-location]").focus();
            return false;
        },
        create: function () {
            $(this).data('ui-autocomplete')._renderItem = function (
                ul, item) {
                var cityname = item.city;
                var airportcode = item.airportcode;
                var airportname = item.airportname;
                var country_code = item.country_code;
                var countryName = item.countryName;
                return $("<li>")
                    .data("ui-autocomplete-item", item)
                    .append(
                        "<a>"
                        + "<div class='dest_left'>"
                        + "<i class='fa fa-plane'></i>"
                        + "<samp class='city'>"
                        + cityname
                        + "</samp>"
                        + "<samp class='airpotcode'>&nbsp;("
                        + airportname
                        + ")&nbsp;</samp>"
                        + "</div><div class='flag'><samp>["
                        + airportcode
                        + "]</samp></div>"
                        + "</a>").appendTo(ul);
            };
        }
    }).focus(function () {
        $(this).autocomplete('search', $(this).val())
    });


    $("[data-to-location]").autocomplete({
        minLength: 0,
        maxResults: 15,
        source: function (request, response) {
            $.ajax({
                url: hiturl + 'Flightdeals/getairport',
                dataType: "json",
                cache: false,
                data: {
                    term: request.term
                },
                success: function (data) {
                    response(data);
                }
            });
        },
        open: function () {
            $(".ui-autocomplete").addClass('ttsautocomplet');
        },
        select: function (event, ui) {
            $("[data-to-location]").val(ui.item.label);
            $("[data-depart-date]").focus();
            $("i.swape-city").css({
                "opacity": "1",
                "cursor": "pointer"
            });
            return false;
        },
        create: function () {
            $(this).data('ui-autocomplete')._renderItem = function (
                ul, item) {
                var cityname = item.city;
                var airportcode = item.airportcode;
                var airportname = item.airportname;
                var country_code = item.country_code;
                var countryName = item.countryName;
                return $("<li>")
                    .data("ui-autocomplete-item", item)
                    .append(
                        "<a>"
                        + "<div class='dest_left'>"
                        + "<i class='fa fa-plane'></i>"
                        + "<samp class='city'>"
                        + cityname
                        + "</samp>"
                        + "<samp class='airpotcode'>&nbsp;("
                        + airportname
                        + ")&nbsp;</samp>"
                        + "</div><div class='flag'><samp>["
                        + airportcode
                        + "]</samp></div>"
                        + "</a>").appendTo(ul);
            };
        }
    }).focus(function () {
        $(this).autocomplete('search', $(this).val())
    });

    $("[data-from-location],[data-to-location]").click(function () {
        $(this).select();
    });

});


/*  End For Flight Deals Js  */


/* start copy add js */

function copyadd(privatefareid) {
    var checkbox = document.getElementsByName('checklist[]');
    var ln = 0;
    for (var i = 0; i < checkbox.length; i++) {
        if (checkbox[i].checked) {
            ln++;
            var fare_id_value = checkbox[i].value;
        }
    }

    if (ln === 0) {
        alert_box("Please select  checkbox wchich one copy");
    }

    else if (ln > 1) {
        alert_box("Only  one Fare is copy at time");


    }

    else {

        var a = [];
        a['01'] = "Jan";
        a['02'] = "Feb";
        a['03'] = "Mar";
        a['04'] = "Apr";
        a['05'] = "May";
        a['06'] = "Jun";
        a['07'] = "Jul";
        a['08'] = "Aug";
        a['09'] = "Sep";
        a['10'] = "Oct";
        a['11'] = "Nov";
        a['12'] = "Dec";

        var hiturl = document.location.origin + '/travelitq/admin/';
        $.ajax({
            url: hiturl + 'Flightprivatefare/getfaredetailinfrmation',

            cache: false,
            data: {
                fare_id: fare_id_value,
                priavtefare_id: privatefareid
            },
            success: function (data) {

                var fdata = JSON.parse(data);
                console.log(fdata);
                var departure_date = "";
                $.each(fdata, function (index, value) {
                    if (index == 'date_day' || index == 'date_month' || index == 'date_year') {

                        if (index == 'date_day') {
                            departure_date += value;

                        }
                        if (index == 'date_month') {
                            var month_val = a[value];
                            departure_date += "-" + month_val;

                        }
                        if (index == 'date_year') {
                            departure_date += "-" + value;

                        }
                        $('[name =  "departure_date"]', '#private_fare_list_copyadd').val(departure_date);
                    }

                    else if (index == 'b2b_status' || index == 'b2c_status') {

                        if (index == 'b2b_status' && value == 'Active') {

                            $('[name =  "b2b"]', '#private_fare_list_copyadd').attr('checked', 'checked');
                        }
                        if (index == 'b2c_status' && value == 'Active') {

                            $('[name =  "b2c"]', '#private_fare_list_copyadd').attr('checked', 'checked');
                        }

                    }
                    else {
                        $('[name =  ' + index + ']', '#private_fare_list_copyadd').val(value);
                    }

                });

            }
        });

    }
}



/* End copy add js */

