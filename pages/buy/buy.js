// pages/buy/buy.js
var app = getApp();
var utils = require('/../../utils/time.js');
var util = require('/../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: null,
    image: null,
    price: null,
    address_list: null,
    add_name: null,
    add_phone: null,
    message: null,
    detail: null,
    number: null,
    addrid: null,
    goodsid: null,
    geshu: 1

  },
  jia: function() {
    this.setData({
      geshu: this.data.geshu + 1,
    })
  },
  jian: function() {
    this.setData({
      geshu: this.data.geshu - 1,
    })
  },

  addr: function(res) {
    var that = this;
    that.setData({
      number: res.detail.value
    })
    that.setData({
      add_name: that.data.address_list[that.data.number].Name,
      add_phone: that.data.address_list[that.data.number].Phone,
      detail: that.data.address_list[that.data.number].Detail,
      addrid: that.data.address_list[that.data.number].AddrId
    })
  },
  buy: function(e) {
   // console.log(e)
    var holder = e.detail.value.holder;
    if (!holder) {
      wx.showToast({
        title: '请输入备注',
        icon: 'none',
        duration: 2000,
      })
    } else {
      var times = utils.formatTime(new Date());
      var time = util.formatTime(new Date());
      //    console.log(time)
      //    console.log(times)
      wx.request({
        url: 'http://localhost/shop/buy/buy_addorder.php',
        data: {
          ordernum: times,
          userid: app.userInfo.userid,
          createtime: time,
          money: e.detail.value.price,
          addrid: this.data.addrid,
          message: e.detail.value.holder
        },
        success: function(res) {
          //     console.log(res)
        },
        fail: function(res) {},
        complete: function(res) {},
      })
      wx.request({
        url: 'http://localhost/shop/buy/buy_additem.php',
        data: {
          ordernum: times,
          goodsid: this.data.goodsid,
          num: e.detail.value.geshu
        },
        success: function(res) {
          //     console.log(res)
          if (res.data == "成功") {
            wx.switchTab({
              url: '/pages/shangdian/shangdian',
              success: function(res) {
                wx.showToast({
                  title: '购买成功',
                  icon: 'none',
                  duration: 2000,
                })

                wx.request({
                  url: 'http://localhost/shop/money/select_money (1).php',
                  data: {
                    userid: app.userInfo.userid
                  },
                  success: function(res) {
                    //   console.log(res.data)
                    var moneys = parseInt(e.detail.value.price);
                    wx.request({
                      url: 'http://localhost/shop/money/update_money.php',
                      data: {
                        userid: app.userInfo.userid,
                        money: res.data - moneys
                      },
                      success: function(r) {
                        //  console.log(r)
                      },
                      fail: function(res) {},
                      complete: function(res) {},
                    })
                  },
                  fail: function(res) {},
                  complete: function(res) {},
                })
              },
              fail: function(res) {},
              complete: function(res) {},
            })
          }
        },
        fail: function(res) {},
        complete: function(res) {},
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    //   console.log(options)
    that.setData({
      name: options.name,
      image: options.image,
      price: options.price,
      goodsid: options.goodsid
    })

    wx.request({
      url: 'http://localhost/shop/address/select_addressbyid.php',
      data: {
        userid: app.userInfo.userid
      },
      success: function(res) {
        //  console.log(res)
        that.setData({
          address_list: res.data
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })


    wx.request({
      url: 'http://localhost/shop/address/select_addressbyflug.php',
      data: {
        userid: app.userInfo.userid
      },
      success: function(res) {
        //    console.log(res)
        that.setData({
          add_name: res.data.Name,
          add_phone: res.data.Phone,
          detail: res.data.Detail,
          addrid: res.data.AddrId,
        })

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
   * 生命周期函数--监听页面隐藏
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