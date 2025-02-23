var App = function () {

    var width = $(window).width();
    var height = $(window).height();
    var xs = 0;
    var sm = 768;
    var md = 992;
    var lg = 1200;

    var plugins = function () {
        $('.page-content .page-block .block-body .social ul li a').prettySocial();
        $('.selectpicker').selectpicker();
        $('.center-image').centerImage();
        $('input[type="checkbox"] , input[type="radio"]').checkRadio();
        $(":input").inputmask();

        if (width > md) {
            $('.has-scroll').niceScroll();
        }

        $('.gallery-list').slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1
                    }
                },
            ]
        });
    };

    var mobileCarSldier = function () {
        if (width < sm) {
            $('section.home-content .car-slider .item').attr('class', 'item active');
            $('section.home-content .car-slider').slick({
                slidesToShow: 1,
                slidesToScroll: 1
            });
        }
    };

    var homeSlider = function () {
        var el = $('section.home-content .box-group-2 .car-slider-button button');
        var item = $('section.home-content .car-slider .item');
        var activeItem = $('section.home-content .car-slider .item.active');
        var nextItem = activeItem.next().length;
        var prevItem = activeItem.prev().length;
        var sliderTime = 3000;

        item.removeClass('animate');

        function prevAnimate(active) {
            active.removeClass('active').addClass('after');

            $.each(active.nextAll(), function (i, val) {
                $(val).attr({
                    class: 'item after after-1'
                });
            });

            $.each(active.prevAll(), function (i, val) {
                if (i == 0) {
                    var className = 'item active'
                }
                else if (i == 1) {
                    var className = 'item before'
                }
                else {
                    var className = 'item before before-1'
                }
                $(val).attr({
                    class: className
                });
            });
        }

        function nextAnimate(active) {
            active.removeClass('active').addClass('before');

            $.each(active.prevAll(), function (i, val) {
                $(val).attr({
                    class: 'item before before-1'
                });
            });

            $.each(active.nextAll(), function (i, val) {
                if (i == 0) {
                    var className = 'item active'
                }
                else if (i == 1) {
                    var className = 'item after'
                }
                else {
                    var className = 'item after after-1'
                }
                $(val).attr({
                    class: className
                });
            });
        }

        el.on('click', function () {
            clearInterval(autoSlider);
            var direction = $(this).attr('data-direction');
            var active = $('section.home-content .car-slider').find('.active');

            if (direction == 'prev') {
                if (active.prev().length > 0) {
                    prevAnimate(active);
                }
            } else {
                if (active.next().length > 0) {
                    nextAnimate(active);
                }
            }
        });

        function autoSlide() {
            var active = $('section.home-content .car-slider').find('.active');
            var direction = $('section.home-content .car-slider').attr('data-auto');
            if (active.next().length == 0) {
                $('section.home-content .car-slider').attr('data-auto', 'prev');
            }
            else if (active.prev().length == 0) {
                $('section.home-content .car-slider').attr('data-auto', 'next');
            }

            if (active.next().length > 0 && direction == 'next') {
                nextAnimate(active);
            }
            else if (active.prev().length > 0 && direction == 'prev') {
                prevAnimate(active);
            }
        }

        var autoSlider = setInterval(autoSlide, sliderTime);
    };


    var datetimepicker = function () {
        var el = $('.dt-picker');
        var start = $('.dt-start');
        var end = $('.dt-end');
        if (el.length > 0) {
            var a = start.val().split(" ");       
            var a = a[0].split('-');
   
        var date = new Date(a[2], (a[1] - 1), a[0]);
        var date2 = new Date();

        start.datetimepicker({
            format: "dd-mm-yyyy hh:ii",
            autoclose: true,
            startDate: date2,
            minView: 1,
            weekStart: 1,
            hoursDisabled: ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "20:00", "21:00", "22:00", "23:00"]
        });

        date.setDate(date.getDate() + 1);
        end.datetimepicker({
            format: "dd-mm-yyyy hh:ii",
            autoclose: true,
            startDate: date,
            minView: 1,
            weekStart: 1,
            hoursDisabled: ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "20:00", "21:00", "22:00", "23:00"]
        });

        start.datetimepicker().on('changeDate', function (res) {
            res.date.setDate(res.date.getDate() + 1);
            end.datetimepicker('setStartDate', res.date);
            end.datetimepicker('show');
            minView: 1
        });
    }
    };

    var otherDeliveryEvent = function () {
        $('.other-delivery .btn-link').on('click', function () {

            $(this).toggleClass('active');
            $('.other-delivery-area').toggle();


        });
    };

    var menuBtnClick = function () {
        $('header.site-head .menu-btn').click(function () {
            if ($(this).hasClass('active')) {
                mobileMenuClose();
            } else {
                mobileMenuOpen();
            }
        });
    };

    var mobileMenuOpen = function () {
        $('header.site-head .right-block').animate({
            'right': 0
        });
        $('.overlay').fadeIn();
        $('body').css({
            'overflow': 'hidden'
        });
        $('header.site-head .menu-btn').addClass('active');
    };

    var mobileMenuClose = function () {
        $('header.site-head .right-block').animate({
            'right': '-280px'
        });
        $('.overlay').fadeOut();
        $('body').css({
            'overflow': 'auto'
        });
        $('header.site-head .menu-btn').removeClass('active');
    };

    var calendarIconClick = function () {
        $('.promo-form .form-group .icon-box').on('click', function () {
            $(this).parent().find('.input-box .dt-picker').datetimepicker('show');
            if ($(this).parent().find('.bootstrap-select').length > 0) {
                $(this).parent().find('.bootstrap-select').trigger('click');
            }
        });
    };

    var otherLocation = function () {
        $('#donus').on('change', function () {
            var checboxStatu = $(this).is(':checked');
            if (checboxStatu) {
                $('.promo-form .promo-form-action .other-delivery-area').show();
            } else {
                $('.promo-form .promo-form-action .other-delivery-area').hide();
            }
        });
    }
    var select = function () {
        $(".select-box select").change(function () {
            deger = $(this).val();
            if (deger >= 1) {
                $(this).closest('.item').addClass('added');
                $(this).closest('.item').find('.option-statu span').text("Eklendi");
            }
            else {
                $(this).closest('.item').removeClass('added')
                $(this).closest('.item').find('.option-statu span').text("Eklenmedi");
            }

        });

        $('.extra-option-list .item').each(function (i, val) {
            if ($('.extra-option-list .item').eq(i).find('select option:selected').val() > 0) {
                $('.extra-option-list .item').eq(i).find('.option-detail .text-box .option-statu span ').text('Eklendi');
                $('.extra-option-list .item').eq(i).addClass('added')
            }
        })
    }

    this.run = function () {
        plugins();
        datetimepicker();
        if (width > sm) {
				homeSlider();
		}
        mobileCarSldier();
        menuBtnClick();
        otherDeliveryEvent();
        calendarIconClick();
        otherLocation();
        select();
    }
};
var ready = new App();

$(function () {
    ready.run();
});