<script setup lang="ts">
// 搜索引擎优化
useSeoMeta({
  // 该页面的标题
  title: "供应商信息",
  // 社交媒体分享该页面时显示的标题
  ogTitle: "供应商信息",
  // 该页面的描述
  description: "同日 MES 系统，供应商信息",
  // 社交媒体分享该页面时显示的描述
  ogDescription: "同日 MES 系统，供应商信息",
  // 社交媒体分享该页面时显示的图片
  ogImage: "/同日图标.png",
});
let supplierName = ref<any>();
let addSupplierName = ref<any>();
let formAddSupplier=ref<any>(false);
let showAddDialog=ref<boolean>(false);
let addSupplierDialog=ref<boolean>(false);
let supplierDataList=ref<any[]>([]);
//供应商数据表头
let headers = ref<any[]>([
  {
    title: "商品编码",
    align: "center",
    key: "commoditycode",
    sortable: false,
    filterable: true,
  },
  {
    title: "商品名称",
    align: "center",
    key: "commodityname",
    sortable: false,
    filterable: true,
  },
  {
    title: "商品类别id",
    align: "center",
    key: "typeid",
    sortable: false,
    filterable: true,
  },
  {
    title: "商品描述",
    align: "center",
    key: "commodity_description",
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
    title: "品牌",
    align: "center",
    key: "brand",
    sortable: false,
    filterable: true,
  },
  {
    title: "重量",
    align: "center",
    key: "weight",
    sortable: false,
    filterable: true,
  },
  {
    title: "长度",
    align: "center",
    key: "length",
    sortable: false,
    filterable: true,
  },
  {
    title: "高度",
    align: "center",
    key: "width",
    sortable: false,
    filterable: true,
  },
  {
    title: "宽度",
    align: "center",
    key: "height",
    sortable: false,
    filterable: true,
  },
  {
    title: "体积",
    align: "center",
    key: "volume",
    sortable: false,
    filterable: true,
  },
  {
    title: "成本",
    align: "center",
    key: "cost",
    sortable: false,
    filterable: true,
  },
  {
    title: "价格",
    align: "center",
    key: "price",
    sortable: false,
    filterable: true,
  },
  {
    title: "颜色",
    align: "center",
    key: "color",
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
async function getSupplierList() {
  // 使用 Strapi 的过滤语法构建查询参数
  const queryParams = new URLSearchParams({
    "filters[？][$containsi]": supplierName.value,
  }).toString();

  // 将查询参数附加到 URL
  const data: any = await useHttp(`/commoditytypes?${queryParams}`, "get");
  supplierDataList.value = normalizeStrapiData(data);
}
// 新增供应商对话框
function showEditDialog(item:any){

}
//删除供应商
function showDelDialog(item:any){

}
// 确认新增供应商
function addSation(){

}
// 格式化数据
function normalizeStrapiData(strapiResponse: any) {
  return strapiResponse.data.map((item: any) => ({
    id: item.id,
    ...item.attributes,
  }));
} 
//重置搜索
function resetFilter() {
  supplierName.value = "";
  getSupplierList();
}
// 不为空
const isNullRule = ref<any[]>([(v: any) => !!v || "该字段不能为空"]);
</script>
<template>
  <v-row class="ma-2">
    <v-col cols="3">
      <v-btn
        color="blue-darken-2"
        class="mr-2 mt-2"
        size="default"
        @click="getSupplierList"
        >搜索</v-btn
      >
      <v-btn color="red" class="mr-2 mt-2" size="default" @click="resetFilter"
        >重置搜索</v-btn
      >
      <v-btn
        color="blue-darken-2"
        class="mr-2 mt-2"
        size="default"
        @click="showAddDialog"
      >
        新增供应商
      </v-btn>
    </v-col>
    <v-col cols="3">
      <v-text-field
        label="供应商名称"
        v-model="supplierName"
        variant="outlined"
        density="compact"
        hide-details
        class="mt-2"
      ></v-text-field>
    </v-col>
    <v-col cols="12">
      <v-data-table
        hover
        :items-per-page="10"
        :headers="headers"
        :items="supplierDataList"
        style="overflow-x: auto; white-space: nowrap"
        fixed-footer
        fixed-header
        height="610"
        no-data-text="没有找到符合的数据"
      >
        <template v-slot:item.action="{ item }">
          <!-- 修改 -->
          <v-icon
            color="blue"
            size="small"
            class="mr-3"
            @click="showEditDialog(item.raw)"
          >
            fa-solid fa-pen
          </v-icon>
          <!-- 删除 -->
          <v-icon color="red" size="small" @click="showDelDialog(item.raw)">
            fa-solid fa-trash
          </v-icon>
        </template>
      </v-data-table>
    </v-col>
  </v-row>
   <!-- 新增供应商 -->
   <v-dialog v-model="addSupplierDialog" min-width="400px" width="560px">
    <v-card>
      <v-toolbar color="blue">
        <v-toolbar-title> 新增供应商 </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="addSupplierDialog = false">
          <v-icon>fa-solid fa-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text class="mt-4">
        <v-row>
          <v-col cols="12">
            <v-form v-model="formAddSupplier">
              <v-text-field
                v-model="addSupplierName"
                label="供应商名称"
                variant="outlined"
                density="compact"
                class="my-2"
                color="blue"
                autofocus
                :rules="isNullRule"
              ></v-text-field
            ></v-form>
          </v-col>
        </v-row>
      </v-card-text>
      <div class="d-flex justify-end mr-6 mb-4">
        <v-btn
          color="blue-darken-2"
          size="large"
          class="mr-2"
          @click="addSation()"
        >
          确认
        </v-btn>
        <v-btn
          color="grey"
          size="large"
          @click="addSupplierDialog = false"
        >
          取消
        </v-btn>
      </div>
    </v-card>
  </v-dialog>
</template>
