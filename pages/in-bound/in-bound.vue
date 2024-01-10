<script setup lang="ts">
// 搜索引擎优化
useSeoMeta({
  // 该页面的标题
  title: "入库管理",
  // 社交媒体分享该页面时显示的标题
  ogTitle: "入库管理",
  // 该页面的描述
  description: "同日 MES 系统，入库管理",
  // 社交媒体分享该页面时显示的描述
  ogDescription: "同日 MES 系统，入库管理",
  // 社交媒体分享该页面时显示的图片
  ogImage: "/同日图标.png",
});
let tab = ref("one");
</script>
<template>
  <v-row class="ma-2">
    <v-col cols="12">
      <v-card>
        <v-tabs v-model="tab" bg-color="blue-darken-2">
          <v-tab value="one">
            <v-icon class="mr-2 mt-1">fa-solid fa-circle-exclamation</v-icon>
            到货通知</v-tab
          >
          <v-tab value="two">
            <v-icon class="mr-2 mt-1">fa-solid fa-layer-group</v-icon>组盘入库
          </v-tab>

          <v-tab value="three">
            <v-icon class="mr-2 mt-1">fa-solid fa-mobile</v-icon>入库清单</v-tab
          >
        </v-tabs>
        <v-card-text>
          <v-window v-model="tab">
            <v-window-item value="one"> 到货通知 </v-window-item>

            <v-window-item value="two"> 组盘入库 </v-window-item>

            <v-window-item value="three"> 入库清单 </v-window-item>
          </v-window>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
