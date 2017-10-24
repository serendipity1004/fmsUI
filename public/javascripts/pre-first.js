$(document).ready(function () {
    $('body').css('visibility', 'visible');
});

$('#next-btn').click(function (e) {
    e.preventDefault();

    let category = $('#category-input').text();
    let service = $('#boo-ga-service-dropdown').text();
    let risk = $('#risk-input').text();

    location.href = '/first?prev_data=true&category=' + category + '&service=' + service + '&risk=' + risk;
});

$('.dropdown-item').click(function (e) {
    e.preventDefault();

    let text = $(this).text();

    let titleElement = $(this).siblings('input');
    let dropdownElement = $(this).parent().parent().find('.dropdown-toggle');

    if (text === '사용자 입력') {
        let title = $(titleElement).val().trim();
        if (title === '사업비') {
            $('.modal-content').css('height', '700px');
            $('#screenshot').show();
        } else {
            $('.modal-content').css('height', '360.3px');
            $('#screenshot').hide();
        }
        console.log(title);
        // $('.modal-title').text(title + ' 사용자 입력');
        $('#modal-title').text(title);
        $('#modal-selected').val(title);
        // $('#actual-title').val(title);

        $('#input-modal').modal('toggle');
    } else if ($(this).hasClass('no-hide')) {

    } else {
        $(dropdownElement).text(text);
        $(dropdownElement).append('<img src="/images/arrow.svg" class="arrow"/>')
    }
});


$('.no-hide').click(function (e) {
    $(this).find('input').prop('checked', !$(this).find('input').prop('checked'));

    let count = 0;
    let topSelected;
    let list = [];

    $('.radio').each(function (index, item) {
        if ($(item).is(':checked') && !$(item).hasClass('not-selected')) {
            count++;
            list.push($(item).parent().find('h5').text())
        }
    });
    if (count > 0) {
        topSelected = list[0];
        count -= 1;
        if (count === 0) {
            $(this).parent().parent().find('.dropdown-toggle').text(topSelected).append('<img src="/images/arrow.svg" class="arrow"/>')
        } else {
            $(this).parent().parent().find('.dropdown-toggle').text(topSelected + '외 ' + count + '개 선택됨').append('<img src="/images/arrow.svg" class="arrow"/>')
        }
    } else {
        $(this).parent().parent().find('.dropdown-toggle').empty().append('<img src="/images/arrow.svg" class="arrow"/>')
    }

});

let bodyEvent;

$('body').click(function (bodyEvent2) {
    console.log('body event')
    bodyEvent = bodyEvent2;
});

$('.sang-poom-nae-yong-parent').on('hide.bs.dropdown', function (e) {
    console.log('hide event')
    console.log($(bodyEvent.target))
    return !$(bodyEvent.target).hasClass('no-hide')
});