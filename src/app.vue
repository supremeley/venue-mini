<style lang="scss">
page {
  background: #ededed;
}
image {
  vertical-align: top;
}

</style>

<script>
import wepy from '@wepy/core';
import vuex from '@wepy/x';
import api from '@/api/index';
import mixins from '@/mixins/index';
import lu from '@/common/utils';

wepy.use(vuex);
wepy.mixin(mixins);

wepy.app({
  onLaunch() {
    lu.login();
  },
});
</script>

<config>
{
  pages: [
    'pages/venue/index',
    
    'pages/home/index',
    'pages/find/index',
    'pages/search/index',
    'pages/mine/index',
    'pages/mine/detail',
    'pages/order/index',
    'pages/order/detail',
    

    'pages/login/index',


  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: '小鹿人',
    navigationBarTextStyle: 'black'
  },
  "tabBar": {
    "color": '#BFC0C4',
    "selectedColor": '#331212',
    "list": [
      {
        "pagePath": "pages/home/index",
        "iconPath": '/static/images/home.png',
        "selectedIconPath": '/static/images/is_home.png',
        "text": "首页"
      },
      {
        "pagePath": "pages/find/index",
        "iconPath": '/static/images/study.png',
        "selectedIconPath": '/static/images/is_study.png',
        "text": "场馆"
      },
      {
        "pagePath": "pages/mine/index",
        "iconPath": '/static/images/mine.png',
        "selectedIconPath": '/static/images/is_mine.png',
        "text": "我的"
      }
    ]
  },
  "permission": {
    "scope.userLocation": {
      "desc": "你的位置信息将用于小程序位置接口的效果展示"
    }
  }
}
</config>
