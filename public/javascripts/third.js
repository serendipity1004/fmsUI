$(document).ready(function () {
    $('.booga-service-table').hide();

    // $('.input-group').each(function (index, item) {
    //     if (index > 0) {
    //         $(item).css('visibility', 'hidden')
    //     }
    // });

    $('body').css('visibility', 'visible')
});

$('.dropdown-item').click(function (e) {
    e.preventDefault();

    let text = $(this).text();

    let titleElement = $(this).siblings('input');
    let dropdownElement = $(this).parent().parent().find('.dropdown-toggle');

    // $('#trigger-element').val(JSON.stringify(dropdownElement));

    // console.log(titleElement);

    if (text === '사용자 입력') {
        let title = $(titleElement).val();
        console.log(title);
        // $('.modal-title').text(title + ' 사용자 입력');
        $('#modal-title').text(title);
        $('#modal-selected').val(title);
        // $('#actual-title').val(title);

        $('#input-modal').modal('toggle');
    }else if($(this).hasClass('no-hide')){

    }else {
        $(dropdownElement).text(text);
        $(dropdownElement).append('<img src="/images/arrow.svg" class="arrow"/>')
    }
});

$('body').on('click', '#booga-service-row-trigger', function (e) {
    e.preventDefault();

    $('table').each(function (index, item) {
        if($(item).is(':visible')){
            $(item).hide()
        }
    });

    $('.booga-service-table').show();
});

$('body').on('click', '.booga-service-table tr', function (e) {
    e.preventDefault();

    console.log($(this).find('td'))

    let text = $(this).find('td:nth-child(2)').text();

    $('#boo-ga-service-dropdown').text(text);
    $('#boo-ga-service-dropdown').append('<img src="/images/arrow.svg" class="arrow"/>');

    $('.booga-service-table').hide();
});

$('#next-btn').click(function (e) {
    e.preventDefault();

    // location.href = '/second'

    // let hiddenRows = [];
    //
    // $('.input-group').each(function (index, item) {
    //     if($(item).css('visibility') === 'hidden'){
    //         hiddenRows.push(item)
    //     }
    // });
    //
    // if(hiddenRows.length > 0){
    //     $(hiddenRows[0]).css('visibility', 'visible')
    // }

});

$('#previous-btn').click(function (e) {
    e.preventDefault();

    location.href = '/second'
});

let bodyEvent;

$('body').click(function (bodyEvent2) {
    console.log('body event')
    bodyEvent = bodyEvent2;
});

$('.no-hide').click(function (e) {
    $(this).find('input').prop('checked', !$(this).find('input').prop('checked'));

    let count = 0;
    let topSelected;
    let list = [];

    $('.radio').each(function (index, item) {
        if($(item).is(':checked')){
            count ++;
            list.push($(item).parent().find('h5').text())
        }
    });
    if (count > 0){
        topSelected = list[0];
        count -=1;
        if(count === 0){
            $(this).parent().parent().find('.dropdown-toggle').text(topSelected).append('<img src="/images/arrow.svg" class="arrow"/>')
        }else{
            $(this).parent().parent().find('.dropdown-toggle').text(topSelected + '외 ' + count + '개 선택됨').append('<img src="/images/arrow.svg" class="arrow"/>')
        }
    }else {
        $(this).parent().parent().find('.dropdown-toggle').empty().append('<img src="/images/arrow.svg" class="arrow"/>')
    }

});

$('.sang-poom-nae-yong-parent').on('hide.bs.dropdown', function (e) {
    console.log('hide event')
    console.log($(bodyEvent.target))
    return !$(bodyEvent.target).hasClass('no-hide')
});

$('.table-btn').click(function (e) {
    e.preventDefault();

    $('table').each(function (index, item) {
        $(item).hide();
    });

    $('.table-btn').each(function (index, item) {
        if($(item).hasClass('active')){
            $(item).removeClass('active')
        }
    });

    if($(this).hasClass('change-table-1')){
        $('.final-table-1').show();

        $('.change-table-1').addClass('active')
    }else if($(this).hasClass('change-table-2')){
        $('.final-table-2').show();

        $('.change-table-2').addClass('active')
    }else{
        $('.final-table-3').show();

        $('.change-table-3').addClass('active')
    }
});