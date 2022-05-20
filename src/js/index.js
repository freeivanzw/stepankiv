$(function () {
    jQuery.fn.dropdown = function (options) {

        var settings = $.extend({
            arrow: '',
            prevent: true,
            onChange: ''
        }, options);
    
        return this.each(function () {
            var $this = $(this);
    
            if ($this.find('.selected').length > 0) {
                $this.find('span:eq(0)')
                    .html($this.find('.selected').text() + settings.arrow)
                    .end()
                    .find('input').val($this.find('.selected a').data('value'))
                    .end()
                    .find('.selected').closest('li').hide();
            }
    
            $this.on('click', '.overflow', function (e) {
                e.preventDefault();
    
                if (!$(this).closest('.dropdown').hasClass('dropdown-open')) {
                    $.when($('.dropdown').each(function () {
                        $(this).removeClass('dropdown-open').find('ul:eq(0)').slideUp();
                    })).then(function () {
                        $this.addClass('dropdown-open').find('ul:eq(0)').slideDown(function () {
                            var h = parseInt($(this).outerHeight(true, true)),
                                top = parseInt($(this).offset()['top']) - parseInt($(document).scrollTop()),
                                wh = parseInt($(window).height());
    
                            if (top + h > wh) {
                                $(this).css({
                                    'max-height': wh - top - 10
                                });
                            } else {
                                $(this).css({
                                    'max-height': 'auto'
                                });
                            }
                        });
                    });
                } else {
                    $this.removeClass('dropdown-open').find('ul:eq(0)').slideUp();
                }
            });
    
            $this.find('ul').eq(0).on('click', 'a', function (e) {
                e.preventDefault();
    
                if (!$(this).hasClass('disabled')) {
                    if (settings.prevent === false) {
                        window.location.href = $(this).attr('href');
                    } else {
                        $(this).closest('ul').find('.selected').removeClass('selected').show().end().end().closest('li').addClass('selected').hide();
                        $this.find('span:eq(0)').html($(this).text() + settings.arrow).end().find('input').val($(this).data('value'));
    
                        $this.removeClass('dropdown-open').find('ul:eq(0)').slideUp();
                        if ($.isFunction(settings.onChange)) settings.onChange($(this));
                    }
                }
            });
        });
    };
    
    $('.test_slider').slick()

    $('.order_delivery').dropdown()

    $('.footer_hidden-wrap .footer_title').on('click', function (e) {
        e.preventDefault();
        $(this).next('.hidden_footer').toggleClass('active')
    })
    
    $('.main_banner').each(function(index, element) {
        if ($(element).find('.banner_slide').length > 1) {
            $(element).slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                dots: true,
                arrows: false,
                infinite: true,
                autoplay: true,
                autoplaySpeed: 4000,
            });
        }
    })

   
})