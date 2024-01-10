<script setup lang="ts">
// 搜索引擎优化
useSeoMeta({
  // 该页面的标题
  title: "商品类别设置",
  // 社交媒体分享该页面时显示的标题
  ogTitle: "商品类别设置",
  // 该页面的描述
  description: "同日 MES 系统，商品类别设置",
  // 社交媒体分享该页面时显示的描述
  ogDescription: "同日 MES 系统，商品类别设置",
  // 社交媒体分享该页面时显示的图片
  ogImage: "/同日图标.png",
});
// 不采用布局
definePageMeta({
  layout: "default",
});
// 对话框
let addDialog = ref<boolean>(false);
let editDialog = ref<boolean>(false);
let delDialog = ref<boolean>(false);
// 表头
let headers = ref<any[]>([
  {
    title: "id",
    align: "center",
    key: "id",
    sortable: false,
    filterable: true,
  },
  {
    title: "商品类型名称",
    align: "center",
    key: "categoryname",
    sortable: false,
    filterable: true,
  },
  {
    title: "父级id",
    align: "center",
    key: "pid",
    sortable: false,
    filterable: true,
  },
  {
    title: "创建人",
    align: "center",
    key: "creator",
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
// 商品类别列表
let productCategoryList = ref<any[]>([]);

// 获取商品类别列表
async function getProductData() {
  // 使用 Strapi 的过滤语法构建查询参数
  const queryParams = new URLSearchParams({
    "filters[pid][$containsi]": searchPid.value,
    "filters[categoryname][$containsi]": searchName.value,
  }).toString();

  // 将查询参数附加到 URL
  const data: any = await useHttp(`/commoditytypes?${queryParams}`, "get");
  productCategoryList.value = normalizeStrapiData(data);
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
  getProductData();
});
// 搜索
function filter() {
  getProductData();
}
// 重置搜索
function resetFilter() {
  searchName.value = "";
  searchPid.value = "";
  getProductData();
}

let searchName = ref<any>("");
let searchPid = ref<any>("");

let productInfo = ref<any>(null);
// 新增商品类别
function showAddDialog() {
  addDialog.value = true;
  productInfo.value = {
    categoryname: "",
    pid: "",
  };
}
// 确认新增
async function addSation() {
  const data: any = await useHttp("/commoditytypes", "post", {
    data: productInfo.value,
  });
  addDialog.value = false;
  getProductData();
}

// 修改商品类别
function showEditDialog(item: any) {
  editDialog.value = true;
  productInfo.value = item;
}
// 确认修改
async function editSation() {
  const data = await useHttp(`/commoditytypes/${productInfo.value.id}`, "put", {
    data: productInfo.value,
  });
  getProductData();
  editDialog.value = false;
}

// 删除商品类别
function showDelDialog(item: any) {
  delDialog.value = true;
  productInfo.value = item;
}
// 确认删除
async function delSation() {
  const data = await useHttp(
    `/commoditytypes/${productInfo.value.id}`,
    "delete"
  );
  getProductData();
  delDialog.value = false;
}
</script>
<template>
  <v-row class="ma-2">
    <v-col cols="6">
      <v-text-field
        label="商品类型名称"
        v-model="searchName"
        variant="outlined"
        density="compact"
        hide-details
        class="mt-2"
      ></v-text-field>
    </v-col>
    <v-col cols="6">
      <v-text-field
        label="商品类别父级id"
        v-model="searchPid"
        variant="outlined"
        density="compact"
        hide-details
        class="mt-2"
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
      <v-btn color="red" class="mr-2 mt-2" size="default" @click="resetFilter"
        >重置搜索</v-btn
      >
      <v-btn
        color="blue-darken-2"
        class="mr-2 mt-2"
        size="default"
        @click="showAddDialog"
      >
        新增类别
      </v-btn>
    </v-col>
    <v-col cols="12">
      <v-data-table
        hover
        :items-per-page="10"
        :headers="headers"
        :items="productCategoryList"
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
          @click="addSation()"
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
</template>
