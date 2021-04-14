
var searchAjaxTimer = null;
$('#search-text').on('input',function(){
    var val = $(this).val();
    if(val){
        clearTimeout(searchAjaxTimer);
        searchAjaxTimer = setTimeout(function(){
            $.ajax({
                url:"https://suggest.taobao.com/sug",
                data:{
                    code: "utf-8",
                    q: "衣服",
                    // _ksTS: "1609047300563_226",
                    callback: "searchResultsRender",
                    // k: "1",
                    // area: "c2c",
                    // bucketid: "14"
                },
                dataType:'jsonp'
            });
        }, 1000)
        
    }
})
// 把复制过来的回调函数名字更换成我们自己在本地设置的
// jQuery中的ajax是通过dataType设置数据传递类型，是jsonp还是ajax，都被封装在名叫ajax方法之中
function searchResultsRender(res){
    // console.log(res);
    var val = $('#search-text').val();
    var data = res.result;
    var str = data.reduce(function(prev, item){
        // 由于当前检索到的所有的数据都是以关键字开头  所以不需要再去查找关键字的位置了  
        var otherStr = item[0].slice(val.length);
        return prev + `<li>
        <a href="#">
            <span class="product-name">${val}<strong>${otherStr}</strong></span>
            <span class="product-number">约${parseInt(item[1])}个商品</span>
        </a>
    </li>`
    },'');
    $('.search-results').html(str).show();
}
// 通过事件委托到父元素身上，因为li消失的时间不确定，不用担心li是何时进行渲染的，冒泡到li上，找到当前区域的value值
$('.search-results').on('click', 'li', function(){
    var val = $(this).find('.product-name').text();
    $('#search-text').val(val);
});
// 移除整个搜索区域就不显示，加个延迟
var hideResultTimer = null;
$('.search-box').mouseleave(function(){
    // 计时器的作用是：到这个时间点将hide函数插入到执行队列中
    hideResultTimer = setTimeout(function(){
        $('.search-results').hide();
    },500);
}).mouseenter(function(){
    // 移开时清理定时器
    clearTimeout(hideResultTimer);
})

var startTime = 0;
var hideLogoTimer = null;
$('.logo').hover(function(){
    clearTimeout(hideLogoTimer);
    startTime = new Date().getTime();
    if(!$('.logo_hover_lk').hasClass('logo_animation_playing')){
        $('.logo_hover_lk').addClass('logo_animation_playing')
                            .css({
                                backgroundImage: 'url(https://img1.360buyimg.com/da/jfs/t1/32282/27/6770/112552/5c90a8b3Ea193c1af/897d05893a77d649.gif?v=' + Math.random() + ')'
                            })
                            .fadeIn();
    }
},function(){
    var nowTime = new Date().getTime();
    if(nowTime - startTime > 4000){
        $('.logo_hover_lk').removeClass('logo_animation_playing').fadeOut();
    }else{
        hideLogoTimer = setTimeout(function () {
            $('.logo_hover_lk').removeClass('logo_animation_playing').fadeOut();
        }, startTime + 4000 - nowTime)
    }
})

$.ajax({
    url:'/hotwords',
    type:'get',
    dataType:'json',
    success:function(res){
        renderHotwords(res.result);
        // console.log(res);
    }
});

function renderHotwords(data){
    var str = data.reduce(function(prev,item,index){
        return prev+`<a href="${item.href}" class="${index === 0 ? 'red' : ''}">${item.word}</a>`;
    },'');
    $('.hotwords').html(str);
}

setInterval(function(){
    $.ajax({
        url:'/recommendwords',
        type:'get',
        dataType:'json',
        success:function(res){
            $('.hotwords > a.red').text(res.text);
        }
    })
},3000);

$.ajax({
    url:'/navitems',
    type:'get',
    dataType:'json',
    success:function(res){
        rednerNavitems(res.result);
    }
});

function rednerNavitems(data){
    var str = data.reduce(function(prev,item,index){
        return prev+`<a href="${item.link}" class="${index < 2 ? 'red' : ''}">${item.name}</a>`;
    },'');
    $('.navitems').html(str);
}

