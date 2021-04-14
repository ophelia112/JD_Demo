(function () {
    // 构造轮播图对象的构造函数，用于存储轮播图的信息，参数
    function Swiper(options, wrap) {
        this.width = options.width || 300;
        this.height = options.height || 250;
        this.list = options.list || [];
        this.times = options.times || 5000;
        this.showSpots = (options.showSpots === undefined || options.showSpots === null) ? true : options.showSpots;
        this.type = options.type || 'fade';
        this.isAuto = (options.isAuto === undefined || options.isAuto === null) ? true : options.isAuto;
        this.changeBtnStatus = options.changeBtnStatus || 'always';
        this.spotsPosition = options.spotsPosition || 'left';

        this.len = this.list.length;
        this.wrap = wrap;
        // 当前显示的图片索引值
        this.nowIndex = 0;
        this.isPlaying = false;
        this.swiperWrapper = null;
        this.timer = null;
    }

    // 这些方法都直接添加在原型链之上
    // 初始化轮播图
    Swiper.prototype.init = function () {
        // 创建轮播图结构
        // 方法一
        // var dom = this.createDom();
        // this.wrap.append(dom);// 将轮播图结构添加到包裹层之上
        // 方法二
        this.createDom();
        // 初始化轮播图样式
        this.initStyle();
        // 添加轮播图功能
        this.bindEvent();
        if(this.isAuto){
            this.autoChange();
        }
    }
    // 创建轮播图结构
    Swiper.prototype.createDom = function () {
        var swiperWrapper = $('<div class="my-swiper-wrapper"></div>');
        this.swiperWrapper = swiperWrapper;
        var swiperContent = $('<ul class="my-swiper-content"></ul>');
        var swiperSpots = $('<div class="my-swiper-spots"></div>');
        // 插入轮播图
        for (var i = 0; i < this.len; i++) {
            $('<li class="my-swiper-item"></li>').html(this.list[i]).appendTo(swiperContent);
            $('<span></span>').appendTo(swiperSpots);
        }
        if (this.type === 'animate') {
            $('<li class="my-swiper-item"></li>').html($(this.list[0]).clone()).appendTo(swiperContent);
        }
        var leftBtn = $('<div class="my-swiper-btn my-swiper-lbtn">&#xe628;</div>');
        var rightBtn = $('<div class="my-swiper-btn my-swiper-rbtn">&#xe625;</div>');
        swiperWrapper.append(swiperContent)
            .append(leftBtn)
            .append(rightBtn)
            .append(swiperSpots)
            .addClass('my-swiper-' + this.type)
            .appendTo(this.wrap);

        $(this.wrap).find('.my-swiper-wrapper').find('.my-swiper-spots').css({
            textAlign: this.spotsPosition
        }).find('span').eq(this.nowIndex).addClass('my-swiper-current');
        // 方法一
        // return swiperWrapper;
        

    }
    // 初始化轮播图样式
    Swiper.prototype.initStyle = function () {
        // 注意点：$括号内第二个参数可以限制作用域，提高寻找效率，不至于在全页面寻找该标签,我们要寻找的是当前包裹层下面的my-swiper-wrapper
        $('.my-swiper-wrapper', this.wrap).css({
            width: this.width,
            height: this.height
        }).find('.my-swiper-content').css({
            width: this.type === 'animate' ? this.width * (this.len + 1) : this.width,
            height: this.height
        }).find('.my-swiper-item').css({
            width: this.width,
            height: this.height
        });
        if (!this.showSpots) {
            $(this.wrap).find('.my-swiper-wrapper').find('.my-swiper-spots').hide();
        }
        switch (this.changeBtnStatus) {
            case 'hide':
                $(this.wrap).find('.my-swiper-wrapper').find('.my-swiper-btn').hide();
                break;
            case 'hover':
                $(this.wrap).find('.my-swiper-wrapper').hover(function () {
                    $('.my-swiper-btn').fadeIn()
                }, function () {
                    $('.my-swiper-btn').fadeOut()
                }).find('.my-swiper-btn').hide();
                break;
            default:
                break;
        }

    }
    // 添加轮播图功能
    Swiper.prototype.bindEvent = function () {
        var self = this;
        this.swiperWrapper
        // 鼠标移入当前轮播图区域的时候 不需要自动轮播 
            .mouseenter(function(){
                clearInterval(self.timer);
            })
            .mouseleave(function(){
                if(self.isAuto){
                    self.autoChange();
                }
            })
            .find('.my-swiper-lbtn').click(function () {
                if(self.isPlaying){
                    return false;
                }
                self.isPlaying = true;
                if (self.type === 'animate') {
                    if (self.nowIndex === 0) {
                        // 判断当前显示的图片是不是索引值为0的图片如果是那么下一次显示的是最后一张图片
                        $(self.wrap).find('.my-swiper-wrapper').find('.my-swiper-content').css({
                            // len值没有因为添加了一个li就改变，还是原来的所以不用减1
                            left: -self.width * (self.len)
                        })
                        self.nowIndex = self.len - 1;
                    } else {
                        self.nowIndex--;
                    }
                } else if (self.type === 'fade') {
                    if (self.nowIndex === 0) {
                        self.nowIndex = self.len - 1;
                    } else {
                        self.nowIndex--;
                    }
                }

                self.change();
            })
            .end()
            .find('.my-swiper-rbtn').click(function () {
                if(self.isPlaying){
                    return false;
                }
                self.isPlaying = true;
                if (self.type === 'animate') {
                    // 如果当前显示的是后面的第一张图片 那么轮播图瞬间变化到前面第一张图片的位置  继续轮播
                    if (self.nowIndex === self.len) {
                        // 注意使用self哦
                        $(self.wrap).find('.my-swiper-wrapper').find('.my-swiper-content').css({
                            left: 0
                        })
                        self.nowIndex = 1;
                    } else {
                        self.nowIndex++;
                    }
                } else if (self.type === 'fade') {
                    // 如果当前是淡入淡出的效果  那么判断当前显示的是不是最后一张图片  是的话 下一次显示第0号图片
                    if (self.nowIndex === self.len - 1) {
                        self.nowIndex = 0;
                    } else {
                        self.nowIndex++;
                    }
                }

                self.change();
            })
            .end()
            .find('.my-swiper-spots > span').mouseenter(function(){
                if (self.isPlaying) {
                    return false;
                } 
                self.isPlaying = true;
                // 关键一步，每次在这里通过jQuery取到当前span的索引值
                var index = $(this).index();
                self.nowIndex = index;
                self.change();
            })
    }

    Swiper.prototype.change = function () {
        var self = this;
        if (this.type === 'fade') {
            this.swiperWrapper.find('.my-swiper-item').eq(this.nowIndex).fadeIn(function(){               
                self.isPlaying = false;
            }).siblings().fadeOut();
        } else if (this.type === 'animate') {
            $(this.wrap).find('.my-swiper-wrapper').find('.my-swiper-content').animate({
                left: -this.nowIndex * this.width
            },function(){
                self.isPlaying = false;
            });
        }
        this.swiperWrapper.find('.my-swiper-spots > span').eq(self.nowIndex % self.len).addClass('my-swiper-current').siblings('span').removeClass('my-swiper-current');
        
        
    }

    Swiper.prototype.autoChange = function(){
        var self = this;
        this.timer = setInterval(function(){
            self.swiperWrapper.find('.my-swiper-rbtn').click();
        }, this.times);
    }

    $.fn.extend({
        swiper: function (options) {
            // 将包裹这个轮播图的对象传递进来，就是我们一开始定义的div.wrapper
            var obj = new Swiper(options, this);
            obj.init();
        }
    })
}())