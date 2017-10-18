$(document).ready(function () {
    let renderAll = _renderAll;

    $('.booga-service-table').hide();

    if(!renderAll){
        $('.input-group').each(function (index, item) {
            if (index > 0) {
                $(item).css('visibility', 'hidden')
            }
        });
        $('#booster-run-btn').hide();

    }else {
        let template = JSON.parse(decodeURIComponent(_template));
        $('.title').text(': 성별 30세 월납 가입금액 1,000만(종신: 1억) 기준 샘플 보험료');
        $('.nav-category').each(function (index, item) {
            $(item).removeClass('active');

            if($(item).hasClass('second')){
                $(item).addClass('active');
            }
        });
        console.log(_products)
        if(_products !== undefined && _products!=='undefined'&& _products.length > 0){
            let products = JSON.parse(decodeURIComponent(_products));
            console.log(products)

            $('h5.no-hide').each(function (index, item) {
                for(let i =0; i < products.length; i ++){
                    if($(item).text() === products[i]){
                        $(item).parent().parent().find('.radio').prop('checked', true);
                    }
                }
            });
        }

        console.log(template)
        $('#booster-run-btn').show();
    }

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
        let title = $(titleElement).val().trim();
        if(title === '사업비'){
            $('.modal-content').css('height', '700px');
            $('#screenshot').show();
        }else{
            $('.modal-content').css('height', '360.3px');
            $('#screenshot').hide();
        }
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

$('body').on('click', '.we-hum-ryul-table tr', function (e) {
    e.preventDefault();

    console.log($(this).find('td'))

    let text = $(this).find('td:nth-child(2)').text();

    $('.we-hum-ryul-dropdown').text(text);
    $('.we-hum-ryul-dropdown').append('<img src="/images/arrow.svg" class="arrow"/>');

    $('.we-hum-ryul-table').hide();
});

$('#next-btn').click(function (e) {
    e.preventDefault();

    let dictionary = [
        ': 상품의 컨셉을 선택하세요',
        ': 상품의 세부 유형을 선택하세요',
        ': 성별 30세 월납 가입금액 1,000만(종신: 1억) 기준 샘플 보험료',
        ': 성별 30세 월납 가입금액 1,000만(종신: 1억) 기준 샘플 보험료',
        ': 성별 30세 월납 가입금액 1,000만(종신: 1억) 기준 샘플 보험료',
    ];

    let hiddenRows = [];

    $('.input-group').each(function (index, item) {
        if($(item).css('visibility') === 'hidden'){
            hiddenRows.push(item)
        }
    });

    let visibleRows = 4 - hiddenRows.length;

    $('.title').text(dictionary[visibleRows - 1]);

    if(hiddenRows.length > 0){
        // let visibleRowArr = [];
        // $('.input-group').each(function (index, item) {
        //     let texts = $(item).find('.dropdown-toggle').each(function (index, item) {
        //
        //     })
        // });
        $(hiddenRows[0]).css('visibility', 'visible')
    }

    if(hiddenRows.length === 1){
        $('#booster-run-btn').show();
    }

    if(hiddenRows.length === 3){
        $('.nav-category').each(function (index, item) {
            if($(item).hasClass('active')){
                $(item).removeClass('active');
                $('.second').addClass('active')
            }
        })
    }else if(hiddenRows.length > 3){
        $('.nav-category').each(function (index, item) {
            if($(item).hasClass('active')){
                $(item).removeClass('active');
                $('.first').addClass('active')
            }
        })
    }

    let visibleArray = [];

    $('.result-table').each(function (index, item) {
        if($(item).is(':visible')){
            visibleArray.push(item)
        }
    });

    if(hiddenRows.length === 0 && visibleArray.length !== 0){
        let dictionary = {
            0:'session-one',
            1:'session-two',
            2:'session-three',
            3:'session-four',
            4:'session-five',
            5:'session-six',
            6:'session-seven',
            7:'session-eight'
        };

        let template = {};

        for(let i = 0; i < 8; i ++){
            let className = dictionary[i];

            template[i] = $(`.${className}`).text().trim();

        }

        let checkedArr = [];

        $('.radio').each(function (index, item) {
            if($(item).is(':checked')){
                checkedArr.push($(item).parent().find('h5').text())
            }
        });

        console.log(checkedArr)

        // console.log(template)

        if(checkedArr.length === 0){
            checkedArr = undefined
        }

        $.post('/second', {template, products:checkedArr}, function (returnedData) {
            location.href = '/second'
        })
    }else if(hiddenRows.length === 0 && visibleArray.length === 0){
        alert('Booster FMS 계산을 해주세요')
    }
});

$('#previous-btn').click(function (e) {
    e.preventDefault();

    let visibleRows = [];

    $('.input-group').each(function (index, item) {
        if($(item).css('visibility') === 'visible'){
            visibleRows.push(item)
        }
    });

    $('table').each(function (index, item) {
        if($(item).is(':visible')){
            $(item).hide();
        }
    });

    let dictionary = [
        ': 상품의 컨셉을 선택하세요',
        ': 상품의 세부 유형을 선택하세요',
        ': 성별 30세 월납 가입금액 1,000만 기준 샘플 보험료',
        ': 성별 30세 월납 가입금액 1,000만 기준 샘플 보험료',
        ': 성별 30세 월납 가입금액 1,000만 기준 샘플 보험료',
    ];

    $('.title').text(dictionary[visibleRows.length - 2]);

    if(visibleRows.length > 1){
        $(visibleRows[visibleRows.length - 1]).css('visibility', 'hidden');
    }

    if(visibleRows.length > 2){
        $('.nav-category').each(function (index, item) {
            if($(item).hasClass('active')){
                $(item).removeClass('active');
                $('.second').addClass('active')
            }
        })
    }else if(visibleRows.length === 2){
        $('.nav-category').each(function (index, item) {
            if($(item).hasClass('active')){
                $(item).removeClass('active');
                $('.first').addClass('active')
            }
        })
    }
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
        if($(item).is(':checked') && !$(item).hasClass('not-selected')){
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

$('#modal-confirm-btn').click(function (e) {
    e.preventDefault();

    let dictionary = {
        '사업비':'saupbe-input',
        '예정 이율':'yeajung-eyul'
    };

    let text = $('#modal-input').val().trim();
    let target = $('#modal-title').text().trim();

    $(`.${dictionary[target]}`).text(text).append('<img src="/images/arrow.svg" class="arrow"/>');
    console.log(text)
    console.log(`${dictionary[target]}`);
    $('#input-modal').modal('toggle')
    $('#modal-input').val('');
});

$('#modal-cancel-btn').click(function (e) {
    e.preventDefault();

    $('#input-modal').modal('toggle');
    $('#modal-input').val('');

});

$('#booster-run-btn').click(function (e) {
    e.preventDefault();

    $('table').each(function (index, item) {
        if($(item).is(':visible')){
            $(item).hide()
        }
    });

    let data = [];
    let send = {};

    $('.dropdown-toggle').each(function (index, item) {
        if($(item).hasClass('sang-poom-nae-yong')){
            let innerArr = [];

            $(this).parent().find('.radio').each(function (index, item) {
                if($(item).is(':checked')){
                    innerArr.push($(item).parent().find('h5').text());
                }
            });

            // $(this).parent().find('input:checked').each(function (index, item) {
            //     innerArr.push($(item).parent().find('h5').text().trim());
            // });

            data.push(innerArr)
        }else{
            data.push($(item).text().trim());
        }
    });

    let products = data[2].sort().toString();
    console.log(products);
    console.log(data);

    let dbTrigger = $('.sang-poom-nae-yong').text().trim();

    console.log('dbtrigger')
    console.log(dbTrigger)

    $('.progress').show();

    for(let i = 0; i < 14; i ++){
        setTimeout(function () {
            if(i < 12){
                $('.progress-bar').css('width', i * 10 + '%');

            }else {
                $('.progress').hide();
                $('.progress-bar').css('width', 0);
                if(data[0] === '종신보험'){
                    $('.jong-shin').show();
                }else if(data[0] === '건강보험'){

                    let service = $('.session-two').text().trim();

                    console.log(service)
                    if(service !== '중도자금'){
                        switch(products){
                            case ['암', '뇌출혈', '급성 심근경색'].sort().toString():
                                $('.joongdo-1').show();

                                break;
                            case ['암'].toString():
                                $('.joongdo-2').show();

                                break;

                            case ['뇌출혈'].toString():
                                $('.joongdo-3').show();

                                break;

                            case ['급성 심근경색'].sort().toString():
                                $('.joongdo-4').show();

                                break;

                            case ['뇌출혈', '급성 심근경색'].sort().toString():
                                $('.joongdo-5').show();

                                break;

                            case ['암', '뇌출혈'].sort().toString():
                                $('.joongdo-6').show();

                                break;

                            case ['암', '급성 심근경색'].sort().toString():
                                $('.joongdo-7').show();

                                break;

                            case ['암', '뇌출혈', '급성 심근경색', '입원'].sort().toString():
                                $('.joongdo-8').show();

                                break;

                            case ['암', '뇌출혈', '급성 심근경색', '수술'].sort().toString():
                                $('.joongdo-9').show();

                                break;

                            case ['암', '뇌출혈', '급성 심근경색', '입원', '수술'].sort().toString():
                                $('.joongdo-10').show();

                                break;
                        }

                    }else{
                        switch(products){
                            case ['암', '뇌출혈', '급성 심근경색'].sort().toString():
                                $('.health-1').show();

                                break;
                            case ['암'].toString():
                                $('.health-2').show();

                                break;

                            case ['뇌출혈'].toString():
                                $('.health-3').show();

                                break;

                            case ['급성 심근경색'].sort().toString():
                                $('.health-4').show();

                                break;

                            case ['뇌출혈', '급성 심근경색'].sort().toString():
                                $('.health-5').show();

                                break;

                            case ['암', '뇌출혈'].sort().toString():
                                $('.health-6').show();

                                break;

                            case ['암', '급성 심근경색'].sort().toString():
                                $('.health-7').show();

                                break;

                            case ['암', '뇌출혈', '급성 심근경색', '입원'].sort().toString():
                                $('.health-8').show();

                                break;

                            case ['암', '뇌출혈', '급성 심근경색', '수술'].sort().toString():
                                $('.health-9').show();

                                break;

                            case ['암', '뇌출혈', '급성 심근경색', '입원', '수술'].sort().toString():
                                $('.health-10').show();

                                break;
                        }
                    }

                }

                if(dbTrigger === '산악자전거상해율'){
                    $('table').each(function (index, item) {
                        $(item).hide()
                    });

                    if($('.db-selection').is(':checked')){
                        $('.health-3').show();

                    }else{

                    }
                }
            }
        }, 200 * i)
    }
});

$('#we-hum-ryul-row-trigger').click(function (e) {
    e.preventDefault();

    if($('.db-selection').is(':checked')) {
        $('table').each(function (index, item) {
            $(item).hide();
        });

        $('.we-hum-ryul-table').show();

    }else{
        $('.we-hum-ryul-table').hide();
    }
});

$('.arb-value-category').click(function (e) {
    e.preventDefault();

    $('#arb-value-category-modal').modal('toggle');
});

$('#modal-cancel-btn-arb').click(function (e) {
    e.preventDefault();

    $('#arb-value-category-modal').modal('toggle');
});

$('#modal-confirm-btn-arb').click(function (e) {
    e.preventDefault();

    let text = $('#modal-input-2').val();

    $('.session-two').text(text);
    $(`.session-two`).text(text).append('<img src="/images/arrow.svg" class="arrow"/>');

    $('#arb-value-category-modal').modal('toggle');

});