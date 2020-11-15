var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  getuserinfo: function(e) {
    //console.log(e.detail.userInfo.nickName);  //用户名
    // console.log(e.detail.userInfo.avatarUrl); //头像
    wx.login({
      success: function(res) {
       //  console.log(res)
        wx.request({
          url: 'https://api.weixin.qq.com/sns/jscode2session',
          data: {
            appid: app.appid,
            secret: app.secret,
            js_code: res.code,
            grant_type: "grant_type"
          },
          method: 'GET',
          success: function(res) {
        //    console.log(res.data.openid);   //openid
            app.userInfo = {
              username: e.detail.userInfo.nickName,
              userid: res.data.openid,
              headimage: e.detail.userInfo.avatarUrl,
            }
            wx.request({
              url: 'http://localhost/shop/user/login.php',
              data: {
                userid: res.data.openid,
                username: e.detail.userInfo.nickName,
                headimage: e.detail.userInfo.avatarUrl
              },
              method: 'GET',
              dataType: 'json',
              responseType: 'text',
              success: function(res) {
               //  console.log(res.data)
                if (res.data == "成功" || res.data == "老用户") {
                  wx.switchTab({
                    url: '/pages/shangdian/shangdian',
                  })
                } else {
                  wx.showToast({
                    title: '失败',
                    icon: 'none',
                    duration: 2000,
                    mask: true,
                  })
                }
              },
              fail: function(res) {

              },
              complete: function(res) {},
            })

          },


        })
      },
    })

  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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