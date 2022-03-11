// 网易云接口信息详情见最下方
var app = new Vue({
    el: '#player',
    data: {
        // 查询得关键词
        query: '',
        // 歌曲数组
        musicList: [],
        // 歌曲地址
        musicUrl: '',
        // 歌曲封面
        musicCover: '',
        // 热门评论
        hotComments: [],
        // 动画播放状态
        isPlaying: false,
    },
    methods: {
        // 查询歌曲
        searchMusic: function() {
            var that = this;
            axios.get('https://autumnfish.cn/search?keywords=' + this.query).then(
                function(response) {
                    that.musicList = response.data.result.songs;
                },
                function(err) {}

            )
        },
        // 歌曲搜索接口有返回歌曲ID
        // 点击播放歌曲和切歌
        changeMusic: function(musicID) {
            var that = this;
            axios.get('https://autumnfish.cn/song/url?id=' + musicID).then(
                function(response) {
                    that.musicUrl = response.data.data[0].url
                },
                function(err) {}

            );
            axios.get('https://autumnfish.cn/song/detail?ids=' + musicID).then(
                function(response) {
                    that.musicCover = response.data.songs[0].al.picUrl;
                },
                function(err) {}
            );

            axios.get('https://autumnfish.cn/comment/hot?type=0&id=' + musicID).then(
                function(response) {
                    that.hotComments = response.data.hotComments;
                },
                function(err) {}
            );
        },
        play: function() {
            this.isPlaying = true;
        },
        pause: function() {
            this.isPlaying = false;
        }

    }
})

/*
  1:歌曲搜索接口
    请求地址:https://autumnfish.cn/search
    请求方法:get
    请求参数:keywords(查询关键字)
    响应内容:歌曲搜索结果

  2:歌曲url获取接口
    请求地址:https://autumnfish.cn/song/url
    请求方法:get
    请求参数:id(歌曲id)
    响应内容:歌曲url地址
  3.歌曲详情获取
    请求地址:https://autumnfish.cn/song/detail
    请求方法:get
    请求参数:ids(歌曲id)
    响应内容:歌曲详情(包括封面信息)
  4.热门评论获取
    请求地址:https://autumnfish.cn/comment/hot?type=0
    请求方法:get
    请求参数:id(歌曲id,地址中的type固定为0)
    响应内容:歌曲的热门评论
*/