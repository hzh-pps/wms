<script setup lang="ts">
// 搜索引擎优化
useSeoMeta({
  // 该页面的标题
  title: "出库管理",
  // 社交媒体分享该页面时显示的标题
  ogTitle: "出库管理",
  // 该页面的描述
  description: "同日 MES 系统，出库管理",
  // 社交媒体分享该页面时显示的描述
  ogDescription: "同日 MES 系统，出库管理",
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
            发货单</v-tab
          >
          <v-tab value="two">
            <v-icon class="mr-2 mt-1">fa-solid fa-layer-group</v-icon>待拣货
          </v-tab>
          <v-tab value="three">
            <v-icon class="mr-2 mt-1">fa-solid fa-layer-group</v-icon>已拣货
          </v-tab>

          <v-tab value="four">
            <v-icon class="mr-2 mt-1">fa-solid fa-mobile</v-icon>打包</v-tab
          >
          <v-tab value="five">
            <v-icon class="mr-2 mt-1">fa-solid fa-mobile</v-icon>待出库</v-tab
          >
          <v-tab value="six">
            <v-icon class="mr-2 mt-1">fa-solid fa-mobile</v-icon>出库清单</v-tab
          >
        </v-tabs>
        <v-card-text>
          <v-window v-model="tab">
            <v-window-item value="one"> 发货单 </v-window-item>
            <v-window-item value="two"> 待拣货 </v-window-item>
            <v-window-item value="three"> 已拣货 </v-window-item>
            <v-window-item value="four"> 打包 </v-window-item>
            <v-window-item value="five"> 待出库 </v-window-item>
            <v-window-item value="six"> 出库清单 </v-window-item>
          </v-window>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
