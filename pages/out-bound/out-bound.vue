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
        <v-tabs v-model="tab">
          <v-tab value="one">
            <v-icon class="mr-2 mt-1">fa-solid fa-circle-exclamation</v-icon>
            出库制单</v-tab
          >
          <v-tab value="two">
            <v-icon class="mr-2 mt-1">fa-solid fa-layer-group</v-icon>拣货打包
          </v-tab>
          <v-tab value="three">
            <v-icon class="mr-2 mt-1">fa-solid fa-layer-group</v-icon>发货单
          </v-tab>

          <v-tab value="four">
            <v-icon class="mr-2 mt-1">fa-solid fa-mobile</v-icon>出库记录</v-tab
          >
        </v-tabs>
        <v-card-text>
          <v-window v-model="tab">
            <v-window-item value="one">
              <v-row>
                <v-col cols="4">
                   <v-text-field
                    label="商品名称"
                    v-model="searchMerchandiseName"
                    variant="outlined"
                    density="compact"
                    hide-details
                  ></v-text-field>
                </v-col>
                <v-col cols="4">
                   <v-text-field
                    label="商品名称"
                    v-model="searchMerchandiseName"
                    variant="outlined"
                    density="compact"
                    hide-details
                  ></v-text-field>
                </v-col>
                <v-col cols="4">
                   <v-text-field
                    label="商品名称"
                    v-model="searchMerchandiseName"
                    variant="outlined"
                    density="compact"
                    hide-details
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-btn
                    color="blue-darken-2"
                    class="mr-2 mt-2"
                    size="default"
                    @click="filter"
                    >搜索</v-btn
                  >
                  <v-btn
                    color="red"
                    class="mr-2 mt-2"
                    size="default"
                    @click="resetFilter"
                    >重置搜索</v-btn
                  >
                  <v-btn
                    color="blue-darken-2"
                    class="mr-2 mt-2"
                    size="default"
                    @click="resetFilter"
                    >新增收货单</v-btn
                  >
                </v-col>
                <v-col cols="12">
                  <v-data-table
                    hover
                    :items-per-page="10"
                    :headers="headers"
                    :items="inventoryList"
                    style="overflow-x: auto; white-space: nowrap"
                    fixed-footer
                    fixed-header
                    height="610"
                    no-data-text="没有找到符合的数据"
                  ></v-data-table>
                </v-col>
              </v-row>
            </v-window-item>
            <v-window-item value="two">
              <v-row>
                <v-col cols="4">
                   <v-text-field
                    label="商品名称"
                    v-model="searchMerchandiseName"
                    variant="outlined"
                    density="compact"
                    hide-details
                  ></v-text-field>
                </v-col>
                <v-col cols="4">
                   <v-text-field
                    label="商品名称"
                    v-model="searchMerchandiseName"
                    variant="outlined"
                    density="compact"
                    hide-details
                  ></v-text-field>
                </v-col>
                <v-col cols="4">
                   <v-text-field
                    label="商品名称"
                    v-model="searchMerchandiseName"
                    variant="outlined"
                    density="compact"
                    hide-details
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-btn
                    color="blue-darken-2"
                    class="mr-2 mt-2"
                    size="default"
                    @click="filter"
                    >搜索</v-btn
                  >
                  <v-btn
                    color="red"
                    class="mr-2 mt-2"
                    size="default"
                    @click="resetFilter"
                    >重置搜索</v-btn
                  >
                  <v-btn
                    color="blue-darken-2"
                    class="mr-2 mt-2"
                    size="default"
                    @click="resetFilter"
                    >新增收货单</v-btn
                  >
                </v-col>
                <v-col cols="12">
                  <v-data-table
                    hover
                    :items-per-page="10"
                    :headers="headers"
                    :items="inventoryList"
                    style="overflow-x: auto; white-space: nowrap"
                    fixed-footer
                    fixed-header
                    height="610"
                    no-data-text="没有找到符合的数据"
                  ></v-data-table>
                </v-col>
              </v-row>
            </v-window-item>
            <v-window-item value="three">
              <v-row>
                <v-col cols="4">
                   <v-text-field
                    label="商品名称"
                    v-model="searchMerchandiseName"
                    variant="outlined"
                    density="compact"
                    hide-details
                  ></v-text-field>
                </v-col>
                <v-col cols="4">
                   <v-text-field
                    label="商品名称"
                    v-model="searchMerchandiseName"
                    variant="outlined"
                    density="compact"
                    hide-details
                  ></v-text-field>
                </v-col>
                <v-col cols="4">
                   <v-text-field
                    label="商品名称"
                    v-model="searchMerchandiseName"
                    variant="outlined"
                    density="compact"
                    hide-details
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-btn
                    color="blue-darken-2"
                    class="mr-2 mt-2"
                    size="default"
                    @click="filter"
                    >搜索</v-btn
                  >
                  <v-btn
                    color="red"
                    class="mr-2 mt-2"
                    size="default"
                    @click="resetFilter"
                    >重置搜索</v-btn
                  >
                  <v-btn
                    color="blue-darken-2"
                    class="mr-2 mt-2"
                    size="default"
                    @click="resetFilter"
                    >新增收货单</v-btn
                  >
                </v-col>
                <v-col cols="12">
                  <v-data-table
                    hover
                    :items-per-page="10"
                    :headers="headers"
                    :items="inventoryList"
                    style="overflow-x: auto; white-space: nowrap"
                    fixed-footer
                    fixed-header
                    height="610"
                    no-data-text="没有找到符合的数据"
                  ></v-data-table>
                </v-col>
              </v-row>
            </v-window-item>
            <v-window-item value="four">
              <v-row>
                <v-col cols="4">
                   <v-text-field
                    label="商品名称"
                    v-model="searchMerchandiseName"
                    variant="outlined"
                    density="compact"
                    hide-details
                  ></v-text-field>
                </v-col>
                <v-col cols="4">
                   <v-text-field
                    label="商品名称"
                    v-model="searchMerchandiseName"
                    variant="outlined"
                    density="compact"
                    hide-details
                  ></v-text-field>
                </v-col>
                <v-col cols="4">
                   <v-text-field
                    label="商品名称"
                    v-model="searchMerchandiseName"
                    variant="outlined"
                    density="compact"
                    hide-details
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-btn
                    color="blue-darken-2"
                    class="mr-2 mt-2"
                    size="default"
                    @click="filter"
                    >搜索</v-btn
                  >
                  <v-btn
                    color="red"
                    class="mr-2 mt-2"
                    size="default"
                    @click="resetFilter"
                    >重置搜索</v-btn
                  >
                  <v-btn
                    color="blue-darken-2"
                    class="mr-2 mt-2"
                    size="default"
                    @click="resetFilter"
                    >新增收货单</v-btn
                  >
                </v-col>
                <v-col cols="12">
                  <v-data-table
                    hover
                    :items-per-page="10"
                    :headers="headers"
                    :items="inventoryList"
                    style="overflow-x: auto; white-space: nowrap"
                    fixed-footer
                    fixed-header
                    height="610"
                    no-data-text="没有找到符合的数据"
                  ></v-data-table>
                </v-col>
              </v-row>
            </v-window-item>
          </v-window>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
