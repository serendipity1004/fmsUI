$(document).ready(function () {
    $('body').css('visibility', 'visible');
});

$('#next-btn').click(function (e) {
    e.preventDefault();

    location.href = '/first'
});