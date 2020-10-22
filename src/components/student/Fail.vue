<template>
  <div>
    <div class="head">
      <img :src="imgUrl" alt="">
    </div>
    <span class="title">[2019-2020-2]南京邮电大学辅导员评议</span>
    <div class="hint">
      <span>你已经提交过啦</span>
      <br>
      <span>刷票是不可以的呢~</span>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      imgUrl: "",
    };
  },
  created() {
    this.getImageUrl();
  },
  methods: {
    async getImageUrl() {
      let res = await this.$http.get("api/getTitle");
      console.log("imgurl", res);
      this.imgUrl = res.data.imgUrl;
    },
  },
};
</script>


<style scoped>
img {
  width: 100%;
}

.title {
  font-weight: 800;
  display: block;
  margin: 10px 40px;
}

.hint {
  margin-left: 40px;
}
</style>