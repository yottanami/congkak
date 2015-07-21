'use strict';

function getRandomInt(min, max) {
    min = min * 10;
    max = max * 10;
    return Math.floor(((Math.random() * (max - min + 1)) + min) / 10);
}

function changePlayerTurnAnimation(){
    $('#playerTurnReport').removeClass('animated flip');
    setTimeout(function() {
        $('#playerTurnReport').addClass('animated flip');
    }, 700);
}

function initializeGameAnimation (){
    $(document).ready(function(){
        $('.ball').hide();
        $('.board').hide();
        setTimeout(function() {
            $('.board').show();
            $('.board').removeClass('animated bounceInLeft');
            $('.board').addClass('animated bounceInLeft');
            $('.ball').show();
            $('.ball').removeClass('animated bounce');
            $('.ball').addClass('animated bounce');
        }, 700);
    });
}

function showWinnerAnimation(){
    $('#winnerReport').removeClass('animated zoomInRight  bounceOutUp');
    $('#winnerReport').show();
    $('#winnerReport').addClass('animated zoomInRight');
}

function hideWinnerAnimation(){
    $('#winnerReport').removeClass('animated bounceOutUp zoomInRight');
    $('#winnerReport').addClass('animated bounceOutUp');
}
