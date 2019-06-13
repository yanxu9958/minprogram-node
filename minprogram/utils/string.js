export const getSystem = () => {
  var res = wx.getSystemInfoSync();
  if(res.system.indexOf('iOS') > -1){
      return 'iOS'
  }else {
      return 'Android'
  }
}

export const objToSearch = function (obj) {

  let newSearch = '?';

  for (let item in obj) {
      obj[item] = encodeURIComponent(obj[item]);
      newSearch = `${newSearch}${item}=${obj[item]}&`
  }
  return newSearch
};
