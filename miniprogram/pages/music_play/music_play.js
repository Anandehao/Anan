// pages/music_play/music_play.js
var inneraudio = wx.getBackgroundAudioManager();
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    image_1: null,
    tt: 1,
    url: null,
    name: null,
    music: null,
    animation: null,
    hash: null,
    ff1: false,
    time_q: null,
    time_h: null,
    time:null,
    timez:null,
  },

  change:function(e){
    var that=this;
  //  console.log(e.detail.value)
    that.setData({
      time:e.detail.value
    })
    inneraudio.seek(e.detail.value)
  },

  play: function() {
    var that = this;
    that.setData({
      tt: 0
    })

    inneraudio.pause()
  },
  stop: function() {
    var that = this;
    that.setData({
      tt: 1
    })
    inneraudio.play()

  },

  add_notlike: function() {
    var that = this;
    var db = wx.cloud.database();
    db.collection("music_list").where({
      hash: that.data.hash
    }).get({
      success: function(e) {
        console.log(e.data)
        var id = e.data
        var _id = id[0]._id
        db.collection("music_list").doc(_id).remove({
          success: function(res) {
            that.setData({
              ff1: false
            })
          },
        })
      },
    })
  },

  add_like: function() {
    var that = this;
    var db = wx.cloud.database();
    db.collection("music_list").add({
      data: {
        music: that.data.music,
        name: that.data.name,
        url: that.data.url,
        hash: that.data.hash,
        image: that.data.image_1
      },
      success: function() {
        that.setData({
          ff1: true
        })

        wx.showToast({
          title: '收藏成功',
          icon: 'none',
          duration: 1500,
        })
      }
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    //  console.log(options)
    app.hash = options.hash;
    wx.request({
      url: 'http://m.kugou.com/app/i/getSongInfo.php?cmd=playInfo',
      data: {
        hash: options.hash
      },
      success: function(res) {
        console.log(res)
        var time = res.data.timeLength * 1000;
        var im1 = res.data.album_img;
        var im3 = im1.replace('/{size}/', '/');

        wx.cloud.init()
        var db = wx.cloud.database()
        //    console.log(options.hash)
        db.collection('music_list').where({
          hash: options.hash
        }).get({
          success: function(e) {
            //    console.log(e)
            if (e.data.length == 1) {
              that.setData({
                ff1: true
              })
            }
          },
        })
        that.setData({
          hash: options.hash,
          image_1: im3,
          url: res.data.url,
          name: res.data.singerName,
          music: res.data.songName
        })
        var a = wx.createAnimation({
          duration: time,
          timingFunction: "linear",
          delay: 0,
          transformOrigin: "50% 50% 0",
        })
        a.rotate(1080).step();
        that.setData({
          animation: a.export()
        })

        inneraudio.src = res.data.url;
        inneraudio.title = that.data.music;

        var sj = parseInt(res.data.timeLength);
        var miao = sj % 60;
        var fen = parseInt(sj / 60);
        var time_hou = fen + ":" + miao;
        var timez=fen*60+miao;
        //  var time_qian="00"+":"+"00";
        //  console.log(time_qian)
        inneraudio.onTimeUpdate(
          function() {
            // console.log(inneraudio.currentTime)
            var new_sj = inneraudio.currentTime;
            var qian_maio = parseInt(new_sj % 60);
           //  console.log(qian_maio)
            var qian_sfen = parseInt(new_sj % 3600);
           // console.log(qian_sfen)
            var qian_fen = parseInt(qian_sfen / 60);
            //   console.log(qian_fen)
            var time=qian_fen*60+qian_maio;
         //   console.log(time)
            if (qian_maio < 10) {
              
              var qmiao = "0" + qian_maio;
            } else {
              var qmiao = qian_maio;
            }
          //  console.log(qmiao)
            if (qian_fen < 10) {
              var qfen = "0" + qian_fen;
            } else {
              var qfen = qian_fen;
            }
            var time_qian = qfen + ":" + qmiao;
            that.setData({
              time_q: time_qian,
              time_h: time_hou,
              time:time,
              timez:timez
            })
          }
        )
      },
      fail: function(res) {},
      complete: function(res) {},
    })


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },


  /**
   * 生命周期函数--监听页面隐藏]
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})