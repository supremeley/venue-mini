
<template>
  <view class="wrap">
    <view class="header">联系信息</view>
    <textarea v-model="content" placeholderClass="placeholder" placeholder="请输入客户联系记录" class="text"></textarea>
    <button class="btn" @click="close">提交联系记录</button>
  </view>
</template>

<script>
import wepy from '@wepy/core';
import api from '@/api/index';

wepy.page({
  data: {
    content: '',
  },
  computed: {},
  methods: {
    async fetchList() {
      const data = {
        current: this.current,
        size: this.size,
        desc: 'create_time',
      };
      const {
        data: { count, data: list },
      } = await api.GET_COURSE_MANAGER_LIST(data);
      // this.list = this.list.concat(list);
      if (count <= this.current * this.size) {
        this.canScroll = false;
      }
    },
  },
});
</script>

<style lang="scss" scoped>
page {
  background: #fff;
}
.wrap {
  padding: 30rpx;
}
.header {
  font-size: 34rpx;
  font-weight: 600;

  margin-bottom: 20rpx;
}
.text {
  width: 100%;
  height: 700rpx;
  padding: 30rpx;

  border: 2rpx solid #f4f4f4;
  border-radius: 10rpx;
}
.placeholder {
  font-size: 34rpx;

  color: #ccc;
}
.btn {
  font-size: 36rpx;
  line-height: 90rpx;

  position: fixed;
  bottom: 120rpx;
  left: 50%;

  width: 630rpx;
  height: 90rpx;

  transform: translate(-50%);

  color: #fff;
  border-radius: 45rpx;
  background: #fe7115;

  &::after {
    border: none;
  }
}

</style>

<config>
{
  navigationBarTitleText: '新增联系记录',
}
</config>
