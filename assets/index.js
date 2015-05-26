$(function () {
    $('.toggle').click(function () {
        $('.nav-list').toggleClass('active');
    });

    $(document).on('click', '#navbar li a, .nav-list li a, .navigation a', function (e) {
        var href = $(this).attr('href');
        if (href === '#' || /^http.*/.test(href)) {
            return;
        }
        e.preventDefault();
        $('.nav-list').removeClass('active');
        location.hash = href;
        $('iframe').attr('src', href);
        initNavigation(href);
    });

    var href = location.hash.substring(1) || 'welcome.html';
    $('iframe').attr('src', href);
    initNavigation(href);

    $(window).on('blur',function() {
        $('.dropdown-toggle').parent().removeClass('open');
    });
});

function initNavigation(href) {
    var $el = $('a[href="' + href + '"]'),
        $prev, $next;

    $('.ribbon a').attr('href',
        'https://github.com/wenzhixin/bootstrap-table-examples/blob/master/' + href);

    if (!$el.length) {
        return;
    }
    $prev = $el.parent().prev('li');
    $next = $el.parent().next('li');
    $('.navigation a').hide();

    if ($prev.text()) {
        $('.navigation .previous').show()
            .attr('href', $prev.find('a').attr('href'))
            .find('span').text($prev.text());
    }
    if ($next.text()) {
        $('.navigation .next').show()
            .attr('href', $next.find('a').attr('href'))
            .find('span').text($next.text());
    }
}