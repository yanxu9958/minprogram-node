export const wxToast = function(title,type,time){

  /**
   *  type: success loading none
   * */ 
  
  wx.showToast({
      title: title,
      icon: type || 'none',
      duration: time || 2000
  });
}

export const wxLoading = function(title){
  wx.showLoading({
      title: title || '拼命加载中',
      mask: true,
  });
}