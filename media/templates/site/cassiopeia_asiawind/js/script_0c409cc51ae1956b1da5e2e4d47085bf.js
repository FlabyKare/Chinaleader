jQuery(document).ready(function($){
    
    
    // CACHE
    
    function getCache() {
        const href = $('link[href*="?"]').eq(0).attr('href');
        return href ? href.split('?')[1] : new Date().getTime();
    }
    
    function prepareUrl(url, md5 = getCache()) {
        return url + (url.includes('?') ? '&' : '?') + md5;
    }
    
    function setAttrCache(selector, attr) {
        $(selector).each(function(){
            let e = $(this), eAttr = e.attr(attr);
            e.attr(attr, prepareUrl(eAttr));
        });
    }
    
    setAttrCache('img[src]', 'src');
    setAttrCache('link[rel="shortcut icon"]', 'href');
    
    $('[style*="background"]').each(function(){
        let
            e = $(this),
            bgImage = e.css('background-image'),
            matches = bgImage.match(/url\(["']?([^"']*)["']?\)/);
        if (matches && matches.length > 1) {
            e.css('background-image', 'url(' + prepareUrl(matches[1]) + ')');
        }
    });
    
    
    // MENU
    
    function setMenuFixed() {
        let
            header = $('header').eq(0),
            menu = header ? header.prev('nav') : null,
            menuClone = $('<div />');
        
        if (!menu) {
            return;
        }
        
        menu.removeClass('bg-white').addClass('navbar-fixed');
        menuClone.outerHeight(menu.outerHeight());
        header.prepend(menuClone);
    }
    setMenuFixed();
    
    // PHONE MASK
    
    $('.mask[type="tel"]')
        .mask('+7 (999) 999-99-99')
        .on('click', function(){
            var emptyPosition = $(this).val().indexOf('_');
            if (emptyPosition > -1) {
                $(this).get(0).setSelectionRange(emptyPosition, emptyPosition);
            }
        });
        
    
    
    // ULUGI
    
    $('#scr-dostavka .item, #scr4 .item').each(function(){
        let
            item = $(this),
            btn = $(this).find('.btn'),
            title = $(this).find('.item-title').text().trim();
        
        btn.attr({
            'href': '#usluga',
            'data-bs-toggle': 'modal',
            'onclick': `document.getElementById('input-usluga').value = '${title}';`
        });
    });
    
    function parseMonth(e) {
        switch (e) {
            case 0: return 'января';
            case 1: return 'февраля';
            case 2: return 'марта';
            case 3: return 'апреля';
            case 4: return 'мая';
            case 5: return 'июня';
            case 6: return 'июля';
            case 7: return 'августа';
            case 8: return 'сентября';
            case 9: return 'октября';
            case 10: return 'ноября';
            case 11: return 'декабря';
            default: return '';
        }
        
    }
    
    $('[data-days]').each(function(){
        var
            elem = $(this),
            date = new Date();
        date.setDate(date.getDate() + elem.data('days'));
        elem.html(date.getDate() + " " + parseMonth(date.getMonth()));
    });
    
    
    // FORM
        
    $(document).on('submit', '.form', function(){
        var
            form = $(this),
            btn = form.find('[type="submit"]');
            
        btn.addClass('disabled');
        
        $.ajax({
            type: 'POST',
            url: window.location.href,
            data: form.serialize() + "&sendmail=1",
            success: function(data) {
                if (data) {
                    $(".modal").modal("hide");
                    $("#thankyou").modal("show");
                    form.trigger('reset');
                } else {
                    alert("Возможно, при отправке письма возникла ошибка.");
                }
                console.log(data);
                btn.removeClass('disabled');
            },
            error: function(xhr, str) {
                alert("При отправке заявки возникла ошибка. Пожалуйста, попробуйте позже.");
                console.log(xhr.responseText);
                console.log(str);
                btn.removeClass('disabled');
            }
        });
        
        return false;
        
    });
    
    
    // GALLERY
    
    $('[data-fancybox="gallery"]').each(function(){
        $(this).css('background-image', 'url('+$(this).attr('href')+')').addClass('d-block bg-image ratio ratio-4x3');
    });
    
    $('[data-fancybox="stock"]').each(function(){
        $(this).css('background-image', 'url('+$(this).attr('href')+')').addClass('d-block bg-image ratio ratio-2x3');
    });
    
    $('.stocks.owl-carousel').owlCarousel({
        loop: true,
        autoplay: true,
        center: true,
        margin: 50,
        dots: false,
        nav: true,
        navText: [
            '<img src="/uae/images/arrow-left.png" alt="">',
            '<img src="/uae/images/arrow-right.png" alt="">'
        ],
        responsive: {
            992: {
                items: 3
            },
            767: {
                items: 2
            },
            0: {
                items: 1
            }
        }
    });

    return false;

});