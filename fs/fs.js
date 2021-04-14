$('.sliderBannerWrapper').swiper({
    width:590,
    height:470,
    list:$('.focus-item__core'),
    times:4000,
    showSpots:true,
    type:'animate',
    isAuto:true,
    changeBtnStatus:'always',
    spotsPosition:"left"
});
$('.sliderRecommendWrapper').swiper({
    width:190,
    height:470,
    list:$('.focus-item__recommend'),
    times:5000,
    showSpots:false,
    type:'fade',
    isAuto:true,
    changeBtnStatus:'hover',
    spotsPosition:"center"
});
// 获取左侧导航的数据
var menuListData = [];
$.ajax({
      url: '/menu',
      type: 'get',
      dataType: 'json',
      success: function (res) {
        renderLeftNavigation(res.data);
        menuListData = res.data;
        console.log(menuListData);
      }
  })

function renderLeftNavigation(data){
    var str = data.reduce(function(prev, item){
        // 两层循环，需要拼接
        return prev+`
        <li>
           ${item.titles.map(function(title,index){
                    return `<a href="${title.href}" class="cate_menu_lk">${title.name}</a>`;
                }).join("/")
            }
        </li>`
    },'');
    $('.fs-menu').html(str);
}

// 因为li是后创建出的，因此不能直接选中li绑定事件，而是采用事件委托的方式
$('.fs-menu').on('mouseenter','li',function(){
    $(this).addClass('cate_menu_on').siblings().removeClass('cate_menu_on');
    var index = $(this).index();//通过index方法获取到li的索引值
    renderMenuContent(menuListData[index].content);
    // console.log(menuListData[index].content.subs)
}).parents().mouseleave(function(){
    $('.cate_menu_content').hide();
    $('.cate_menu_on').removeClass('cate_menu_on');
    
});

function renderMenuContent(data){
    var cateChannel = $('<div class="cate_channel"></div>');
    var cateDetail = $('<div class="cate_detail"></div>');
    var cateChannelStr = data.tabs.reduce(function(prev, item){
        return (prev + `
        <a href="${item.href}" class="cate_channel_lk" clstag="h|keycount|head|category_01b01" target="_blank">${item.name}
            <i class="index-iconfont cate_channel_arrow">&#xe63e;</i>
        </a>`);
    },"");
    var cateDetailStr = data.subs.reduce(function(prev, item){
        return (
            prev+
            `<dl class="cate_detail_item">
                <dt class="cate_detail_tit"">
                        <a href="${item.href}" target="_blank">${item.category}
                <i class="index-iconfont cate_detail_tit_arrow">
                &#xe63e;</i></a>
            </dt>
            <dd class="cate_detail_con">
          ${item.item.map(function (item) {
              return `<a class="cate_detail_con_lk" target="_blank" href="${item.href}">${item.name}</a>`;
            }).join("")}
        </dd>
        </dl>`
        );
    },'');
    
    cateChannel.html(cateChannelStr);
    cateDetail.html(cateDetailStr);
    $(".cate_menu_content")
      .empty()
      .append(cateChannel)
      .append(cateDetail)
      .show();
}


$('.service_frame').mouseenter(function(){
    $('.service_pop').animate({
        top:39
    },0.2);
    $('.service_frame .service_lk').animate({
        top:-28
    },0.2);
    if($(this).hasClass('service_frame2')){
        $(this).find('.service_lk').animate({
            top:-83
        },0.2);
    }
    // 因为有券这个字所以会有变动，效果不是很好
    // if($(this).hasClass('service_frame3')){
    //     $(this).find('.service_lk').animate({
    //         top:-58
    //     },0.2)
    // }

    $(this).addClass('service_frame_on').siblings().removeClass('service_frame_on');
})

$('.service_pop_close').click(function(){
    $('.service_pop').animate({
        top:232
    },0.2);
    $('.service_frame .service_lk').animate({
        top:0
    },0.2);
    $('.service_frame_on').removeClass('service_frame_on');
})