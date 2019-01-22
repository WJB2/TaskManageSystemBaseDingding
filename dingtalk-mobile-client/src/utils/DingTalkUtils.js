import DingTalkMobile from 'dingtalk-jsapi';



function goBack(){//设置返回上级

  DingTalkMobile.biz.navigation.goBack({
    onSuccess:(res)=>{console.log( )},
    onFail:(err)=>{console.log( )}
  })

}

function showToast(text){
  DingTalkMobile.device.notification.toast({
    icon:'',
    text:text,
    duration:1,
    delay:1,
    onSuccess:(res)=>{console.log( )},
    onFail:(err)=>{console.log( )}

  })
}

function enableBounce(){
  DingTalkMobile.ui.webViewBounce.enable()
}

function disableBounce(){
  DingTalkMobile.ui.webViewBounce.disable()
}

function hidePreloader(){
  DingTalkMobile.device.notification.hidePreloader({
    onSuccess:(res)=>{console.log( )},
    onFail:(err)=>{console.log( )}
  })
}

function closeBrower(){
  console.log('我应该返回的')
  DingTalkMobile.biz.navigation.close({
    onSuccess:function(result){

    },
    onFail:function(err){

    }
  })
}

async function isIos(){

  const handleRequestMobile = function(params){
    return new Promise(function(resolve, reject){
      DingTalkMobile.device.base.getPhoneInfo({
        onSuccess: (result) => {
          resolve(result);
        },
        onFail: () => {
          reject();
        }
      });
    });
  }

  const phoneInfo=await handleRequestMobile();

  console.log(phoneInfo)

  if(phoneInfo.brand.search("iPhone")>=0){
    return true;
  }else{
    return false;
  }

}

export default{

  goBack,
  showToast,
  disableBounce,
  enableBounce,
  hidePreloader,
  closeBrower,
  isIos

}
