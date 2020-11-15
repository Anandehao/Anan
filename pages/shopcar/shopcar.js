// pages/shopcar/shopcar.js
var utils = require('/../../utils/time.js');
var util = require('/../../utils/util.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    add_name: null,
    add_phone: null,
    detail: null,
    addrid: null,
    car_list: null,
    price: 0,
    checked: false,
    all: false,
    message: 1,
    qxuan:0
  },

  qxuan: function(e) {
    //   console.log(e)
    this.setData({
      all: !(this.data.all)
    })
    this.setData({
      checked: this.data.all
    })
    this.setData({
      qxuan:1
    })
    //  console.log(this.data.car_list)
    var money = 0;
    for (var i = 0; i < this.data.car_list.length; i++) {
      money += this.data.car_list[i].price * this.data.car_list[i].number
    }
    if (this.data.all == true) {
      this.setData({
        price: money
      })
    } else {
      this.setData({
        price: 0
      })
    }
    //  console.log(money)

  },

  jia: function(e) {
    var that = this;
    //  console.log(e.target.dataset.index);ijmn ifgd
    var index = e.target.dataset.index;
    var num = parseInt((that.data.car_list[index]).number);
    num += 1;
    var array = that.data.car_list;
    array[index].number = num;
    that.setData({
      car_list: array
    })
    wx.request({
      url: 'http://localhost/shop/car/update_number_bycarid.php',
      data: {
        num: num,
        carid: (that.data.car_list[index]).carid
      },
      success: function(res) {
        if (that.data.car_list[index].checked == true) {
          that.setData({
            price: that.data.price + parseFloat(array[index].price)
          })
        }
      },
      fail: function(res) {},
      complete: function(res) {},
    })

  },

  jian: function(e) {
    var that = this;
    //  console.log(e.target.dataset.index);
    var index = e.target.dataset.index;
    var num = parseInt((that.data.car_list[index]).number);
    if (num >= 2) {
      num -= 1;
      var array = that.data.car_list;
      array[index].number = num;
      that.setData({
        car_list: array
      })
      wx.request({
        url: 'http://localhost/shop/car/update_number_bycarid.php',
        data: {
          num: num,
          carid: (that.data.car_list[index]).carid
        },
        success: function(res) {
          if (that.data.car_list[index].checked == true) {
            that.setData({
              price: that.data.price - parseFloat(array[index].price)
            })
          }
        },
        fail: function(res) {},
        complete: function(res) {},
      })
    }
  },

  qingk: function() {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '是否清空购物车',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#c0c0c0',
      confirmText: '确定',
      confirmColor: '#000000',
      success: function(res) {
        console.log(res)
        if (res.confirm == true) {
          wx.request({
            url: 'http://localhost/shop/car/delete_allcar.php',
            data: {
              userid: app.userInfo.userid
            },
            success: function(res) {
              //   console.log(res)
              that.onLoad();
            },
            fail: function(res) {},
            complete: function(res) {},
          })
        }
      },
      fail: function(res) {},
      complete: function(res) {},
    })

  },

  jshuan: function() {
    var that = this;
    var times = utils.formatTime(new Date());
    var time = util.formatTime(new Date());
    var list = that.data.car_list;
    var money = 0;
    for (var i = 0; i < list.length; i++) {
      if (list[i].checked == true && that.data.qxuan==1) {
        money += parseFloat(list[i].price) * parseFloat(list[i].number);
        wx.request({
          url: 'http://localhost/shop/buy/buy_additem.php',
          data: {
            ordernum: times,
            goodsid: list[i].goodsid,
            num: list[i].number
          },
          success: function(res) {
              console.log(res)

          },
          fail: function(res) {},
          complete: function(res) {},
        })
        wx.request({
          url: 'http://localhost/shop/car/delete_car_bycarid.php',
          data: {
            carid: list[i].carid
          },
          success: function(res) {
            //   console.log(res)
            var car_listnew = that.data.car_list;
            for (var j = 0; j < car_listnew.length; j++) {
              car_listnew[j].checked = false;
            }
            that.setData({
              car_list: car_listnew
            })
            that.onLoad();
          },
          fail: function(res) {},
          complete: function(res) {},
        })
      }
    }
    wx.request({
      url: 'http://localhost/shop/buy/buy_addorder.php',
      data: {
        ordernum: times,
        userid: app.userInfo.userid,
        createtime: time,
        money: money,
        addrid: that.data.addrid,
        message: that.data.message
      },
      success: function(res) {
        //   console.log(res)

        wx.request({
          url: 'http://localhost/shop/money/select_money (1).php',
          data: {
            userid: app.userInfo.userid
          },
          success: function(res) {
            //   console.log(res.data)
            var moneys = parseInt(money);
            wx.request({
              url: 'http://localhost/shop/money/update_money.php',
              data: {
                userid: app.userInfo.userid,
                money: res.data - moneys
              },
              success: function(r) {
                //     console.log(r)
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
  },

  radio: function(e) {
    //  console.log(e);
    var car_array = e.detail.value;
    var car_newlist = this.data.car_list;
    for (var i = 0; i < car_newlist.length; i++) {
      car_newlist[i].checked = false;
    }
    for (var j = 0; j < car_array.length; j++) {
      var array = car_array[j];
      car_newlist[array].checked = true
    }
    this.setData({
      car_list: car_newlist
    })
    var money = 0;
    for (var r = 0; r < car_newlist.length; r++) {
      if (car_newlist[r].checked == true) {
        money += parseInt(this.data.car_list[r].price) * parseInt(this.data.car_list[r].number);
      }
      // console.log(money)
      this.setData({
        price: money
      })
    }
  },



  sc: function(e) {
    var that = this;
    //  console.log(e)
    wx.request({
      url: 'http://localhost/shop/car/delete_car_bycarid.php',
      data: {
        carid: e.currentTarget.dataset.carid
      },
      success: function(res) {
        //    console.log(res)
        that.onLoad();
      },
      fail: function(res) {},
      complete: function(res) {},
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    wx.request({
      url: 'http://localhost/shop/car/select_car_byuserid.php',
      data: {
        userid: app.userInfo.userid
      },
      success: function(res) {
        //console.log(res)
        var list = res.data;
        for (var i = 0; i < list.length; i++) {
          list[i].checked = false
        }
        that.setData({
          car_list: list
        })
      },
      fail: function(res) {},
      complete: function(res) {},
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