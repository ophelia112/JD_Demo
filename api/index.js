// 模拟地址+接口数据格式
Mock.mock('/menu',{
    'data|18':[{
        'titles|2-4':[{
            name:'@cword(2,3)',
            href:'@url("http")'
        }],
        'content':{
            'tabs|2-5':[{
                name:'@cword(2,4)',
                href:'@url("http")'
            }],
            'subs|6-10':[{
                category:'@cword(2,4)',
                href:"#",
                'item|8-20':[{
                    name:'@cword(2,4)',
                    href:'@url("http")'
                }]
            }]
        }
    }]
})

// 搜索栏底下的热词
Mock.mock('/hotwords',{
    'result|8-15':[{
        word: '@cword(2,5)',
        href: '@url("http")'
    }]
});

Mock.mock('/recommendwords',{
    text:'@cword(2,5)'
});

Mock.mock('/navitems',{
    'result|10':[{
        name: '@cword(2,4)',
        link: '@url("http")'
    }]
});