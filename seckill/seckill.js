$('.seckill-list').swiper({
    list: $('.seckill-list-item'),
    type: 'animate',
    times: 10000,
    showSpots: false,
    isAuto: true,
    changeBtnStatus: 'always',
    width: 800,
    height: 260
})

$('.seckill-brand').swiper({
    list: $('.brand-item'),
    type: 'animate',
    times: 2000,
    isAuto: true,
    spotsPosition: 'center',
    changeBtnStatus: 'hide',
    width: 180,
    height: 240
});

var startTime = new Date('2021-01-30 20:00').getTime();

var endTime = startTime + 2 * 60 * 60 * 1000;
var startHour = new Date(startTime).getHours();
if(startHour < 10){
    startHour = '0' + startHour;
}
$('.countdown-desc > strong').text(startHour + ':00');
var timer = setInterval(function(){
    var nowTime = new Date().getTime();
    var disTime = endTime - nowTime;
    if(disTime < 0 ){
        $('.timmer__unit--hour').text('00');
        $('.timmer__unit--minute').text('00');
        $('.timmer__unit--second').text('00');
        clearInterval(timer);
        return false;
    }
    var hour = parseInt(disTime / 1000 / 60 / 60);
    var minute = parseInt(disTime / 1000 / 60 % 60);
    var second = parseInt(disTime / 1000 % 60);
    if(hour < 10){
        hour = '0' + hour;
    }
    if(minute < 10){
        minute = '0' + minute;
    }
    if(second < 10){
        second = '0' + second;
    }
    $('.timmer__unit--hour').text(hour);
        $('.timmer__unit--minute').text(minute);
        $('.timmer__unit--second').text(second);
},1000);