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

    let hiddenRows = [];

    $('.input-group').each(function (index, item) {
        if($(item).css('visibility') === 'hidden'){
            hiddenRows.push(item)
        }
    });

    if(hiddenRows.length > 0){
        $(hiddenRows[0]).css('visibility', 'visible')
    }
});