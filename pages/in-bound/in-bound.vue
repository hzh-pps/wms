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
// 对话框
let addDialog = ref(false);
let editDialog = ref(false);
let deleteDialog = ref(false);

let headers = ref<any[]>([
  {
    title: "收货单号",
    align: "center",
    key: "receipt_number",
    sortable: false,
    filterable: true,
  },
  {
    title: "物料名",
    align: "center",
    key: "sku",
    sortable: false,
    filterable: true,
  },
  {
    title: "物料规格",
    align: "center",
    key: "sku_desc",
    sortable: false,
    filterable: true,
  },
  {
    title: "物料描述",
    align: "center",
    key: "sku_spec",
    sortable: false,
    filterable: true,
  },
  {
    title: "物料数量",
    align: "center",
    key: "sku_qty",
    sortable: false,
    filterable: true,
  },
  {
    title: "批次号",
    align: "center",
    key: "sku_lot",
    sortable: false,
    filterable: true,
  },

  {
    title: "品牌",
    align: "center",
    key: "brand",
    sortable: false,
    filterable: true,
  },
  {
    title: "供应商名称",
    align: "center",
    key: "suppliername",
    sortable: false,
    filterable: true,
  },
  {
    title: "单位",
    align: "center",
    key: "unit_of_measure",
    sortable: false,
    filterable: true,
  },
  {
    title: "物料总重量",
    align: "center",
    key: "sum_weight",
    sortable: false,
    filterable: true,
  },
  {
    title: "状态",
    align: "center",
    key: "store_state",
    sortable: false,
    filterable: true,
  },
  {
    title: "操作",
    align: "center",
    key: "action",
    sortable: false,
    filterable: true,
  },
]);
let searchNumber = ref<any>("");
let searchSku = ref<any>("");
let searchLot = ref<any>("");
// 入库列表
let inventoryList = ref<any[]>([]);
// 获取入库列表
async function getInventoryList() {
  // 使用 Strapi 的过滤语法构建查询参数
  const queryParams = new URLSearchParams({
    "filters[receipt_number][$containsi]": searchNumber.value,
    "filters[sku][$containsi]": searchSku.value,
    "filters[sku_lot][$containsi]": searchLot.value,
  }).toString();

  const data: any = await useHttp(`/deliveryreceipts?${queryParams}`, "get");
  inventoryList.value = normalizeStrapiData(data);
}
// 格式化数据
function normalizeStrapiData(strapiResponse: any) {
  return strapiResponse.data.map((item: any) => ({
    id: item.id,
    ...item.attributes,
  }));
}
//
onMounted(() => {
  getInventoryList();
});
// 过滤
function filter() {
  getInventoryList();
}
// 重置过滤
function resetFilter() {
  searchNumber.value = "";
  searchSku.value = "";
  searchLot.value = "";
  getInventoryList();
}
let inventoryInfo = ref<any>(null);
// 新增收货单
function showAddDialog() {
  addDialog.value = true;
  inventoryInfo.value = {
    sku: "",
    sku_desc: "",
    sku_spec: "",
    sku_qty: "",
    sku_lot: "",
    store_state: "新建",
    brand: "",
    suppliername: "",
    unit_of_measure: "",
    sum_weight: 1,
  };
}
// 新增收货单
async function addReceipt() {
  const data = await useHttp("/deliveryreceipts", "post", {
    data: inventoryInfo.value,
  });
  getInventoryList();
  addDialog.value = false;
}
</script>
<template>
  <v-row class="ma-2">
    <v-col cols="12">
      <v-card>
        <v-tabs v-model="tab">
          <v-tab value="one">
            <v-icon class="mr-2 mt-1">fa-solid fa-circle-exclamation</v-icon>
            收货制单</v-tab
          >
          <v-tab value="two">
            <v-icon class="mr-2 mt-1">fa-solid fa-layer-group</v-icon>组盘上架
          </v-tab>

          <v-tab value="three">
            <v-icon class="mr-2 mt-1">fa-solid fa-mobile</v-icon>入库记录</v-tab
          >
        </v-tabs>
        <v-card-text>
          <v-window v-model="tab">
            <!-- 收货制单 -->
            <v-window-item value="one">
              <v-row>
                <v-col cols="4">
                   <v-text-field
                    label="收货单号"
                    v-model="searchNumber"
                    variant="outlined"
                    density="compact"
                    hide-details
                  ></v-text-field>
                </v-col>
                <v-col cols="4">
                   <v-text-field
                    label="物料名"
                    v-model="searchSku"
                    variant="outlined"
                    density="compact"
                    hide-details
                  ></v-text-field>
                </v-col>
                <v-col cols="4">
                   <v-text-field
                    label="批次号"
                    v-model="searchLot"
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
                    @click="showAddDialog"
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
            <!-- 组盘上架 -->
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
                    >组盘上架</v-btn
                  >
                </v-col>
                <v-col cols="12">
                  <v-data-table
                    hover
                    :items-per-page="10"
                    :headers="headers"
                    :items="inventoryList"
                    v-model="selected"
                    show-select
                    return-object
                    style="overflow-x: auto; white-space: nowrap"
                    fixed-footer
                    fixed-header
                    height="610"
                    no-data-text="没有找到符合的数据"
                  ></v-data-table>
                </v-col>
              </v-row>
            </v-window-item>
            <!-- 入库记录 -->
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
    <!-- 新增类别 -->
    <v-dialog v-model="addDialog" min-width="400px" width="560px">
      <v-card>
        <v-toolbar color="blue">
          <v-toolbar-title> 新增类别 </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="addDialog = false">
            <v-icon>fa-solid fa-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text class="mt-4">
          <v-row>
            <v-col cols="12">
              <v-text-field
                label="物料名"
                v-model="inventoryInfo.sku"
                variant="outlined"
                density="compact"
                hide-details
                class="mt-2"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="物料规格"
                v-model="inventoryInfo.sku_desc"
                variant="outlined"
                density="compact"
                hide-details
                class="mt-2"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                label="物料数量"
                v-model="inventoryInfo.sku_qty"
                variant="outlined"
                density="compact"
                hide-details
                class="mt-2"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                label="单位"
                v-model="inventoryInfo.unit_of_measure"
                variant="outlined"
                density="compact"
                hide-details
                class="mt-2"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="物料描述"
                v-model="inventoryInfo.sku_spec"
                variant="outlined"
                density="compact"
                hide-details
                class="mt-2"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <div class="d-flex justify-end mr-6 mb-4">
          <v-btn
            color="blue-darken-2"
            size="large"
            class="mr-2"
            @click="addReceipt()"
          >
            确认
          </v-btn>
          <v-btn color="grey" size="large" @click="addDialog = false">
            取消
          </v-btn>
        </div>
      </v-card>
    </v-dialog>
    <!-- 修改类别 -->
    <v-dialog v-model="editDialog" min-width="400px" width="560px">
      <v-card>
        <v-toolbar color="blue">
          <v-toolbar-title> 修改类别 </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="editDialog = false">
            <v-icon>fa-solid fa-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text class="mt-4">
          <v-row>
            <v-col cols="12">
              <v-text-field
                label="商品类型名称"
                v-model="productInfo.categoryname"
                variant="outlined"
                density="compact"
                hide-details
                class="mt-2"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="商品类型父级id"
                v-model="productInfo.pid"
                variant="outlined"
                density="compact"
                hide-details
                class="mt-2"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <div class="d-flex justify-end mr-6 mb-4">
          <v-btn
            color="blue-darken-2"
            size="large"
            class="mr-2"
            @click="editSation()"
          >
            确认
          </v-btn>
          <v-btn color="grey" size="large" @click="editDialog = false">
            取消
          </v-btn>
        </div>
      </v-card>
    </v-dialog>
    <!-- 删除类别 -->
    <v-dialog v-model="delDialog" min-width="400px" width="560px">
      <v-card>
        <v-toolbar color="blue">
          <v-toolbar-title> 删除类别 </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="delDialog = false">
            <v-icon>fa-solid fa-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text class="text-center"> 您确定要删除这条数据吗? </v-card-text>
        <div class="d-flex justify-end mr-6 mb-4">
          <v-btn
            color="blue-darken-2"
            size="large"
            class="mr-2"
            @click="delSation()"
          >
            确认
          </v-btn>
          <v-btn color="grey" size="large" @click="delDialog = false">
            取消
          </v-btn>
        </div>
      </v-card>
    </v-dialog>
  </v-row>
</template>
