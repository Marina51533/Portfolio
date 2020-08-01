$(document).ready(function() {
    $('.header_burger').click(function() {
        $('.header_burger, .header_menu,.btn_top').toggleClass('active');
        $('body').toggleClass('lock');
    });

    $('.header_menu').click(function() {
        $('.header_burger, .header_menu. btn_top').removeClass('active');
        $('body').removeClass('lock');
    });
});
$(function() {
    $(".btn_tex_header ").mouseover(function(e) {
        // положение элемента
        var pos = $(this).offset();
        var elem_left = pos.left;
        var elem_top = pos.top;
        // положение курсора внутри элемента
        var Xinner = e.pageX - elem_left;
        var Yinner = e.pageY - elem_top;
        $(this).find(".btn_hover").css({
            "left": Xinner,
            "top": Yinner
        })
    });
});