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
let searchName = ref<any>("");
let addSupplierName = ref<any>();
let formAddSupplier = ref<any>(false);
let showAddDialog = ref<boolean>(false);
let addSupplierDialog = ref<boolean>(false);
// 示例供应商数据列表
let supplierDataList = ref<any[]>([
  {
    supplierName: "供应商A",
    city: "北京",
    address: "北京市朝阳区某街道123号",
    principal: "张三",
    email: "zhangsan@example.com",
    contact: "13012345678",
  },
  {
    supplierName: "供应商B",
    city: "上海",
    address: "上海市浦东新区另一街道456号",
    principal: "李四",
    email: "lisi@example.com",
    contact: "13112345678",
  },
  {
    supplierName: "供应商C",
    city: "广州",
    address: "广州市天河区那条街789号",
    principal: "王五",
    email: "wangwu@example.com",
    contact: "13212345678",
  },
  {
    supplierName: "供应商D",
    city: "深圳",
    address: "深圳市南山区这条路101号",
    principal: "赵六",
    email: "zhaoliu@example.com",
    contact: "13312345678",
  },
  {
    supplierName: "供应商E",
    city: "成都",
    address: "成都市武侯区那个巷子102号",
    principal: "钱七",
    email: "qianqi@example.com",
    contact: "13412345678",
  },
  {
    supplierName: "供应商F",
    city: "杭州",
    address: "杭州市西湖区某个楼盘103号",
    principal: "孙八",
    email: "sunba@example.com",
    contact: "13512345678",
  },
  {
    supplierName: "供应商G",
    city: "南京",
    address: "南京市鼓楼区那个大厦104号",
    principal: "周九",
    email: "zhoujiu@example.com",
    contact: "13612345678",
  },
  {
    supplierName: "供应商H",
    city: "武汉",
    address: "武汉市江汉区某个商场105号",
    principal: "吴十",
    email: "wushi@example.com",
    contact: "13712345678",
  },
  {
    supplierName: "供应商I",
    city: "重庆",
    address: "重庆市渝中区那条大街106号",
    principal: "郑十一",
    email: "zhengshiyi@example.com",
    contact: "13812345678",
  },
  {
    supplierName: "供应商J",
    city: "西安",
    address: "西安市碑林区这个小区107号",
    principal: "冯十二",
    email: "fengshier@example.com",
    contact: "13912345678",
  },
]);

// 供应商信息表头
let supplierHeaders = ref<any[]>([
  {
    title: "供应商名称",
    align: "center",
    key: "supplierName",
    sortable: false,
    filterable: true,
  },
  {
    title: "所在城市",
    align: "center",
    key: "city",
    sortable: false,
    filterable: true,
  },
  {
    title: "详细地址",
    align: "center",
    key: "address",
    sortable: false,
    filterable: true,
  },
  {
    title: "负责人",
    align: "center",
    key: "principal",
    sortable: false,
    filterable: true,
  },
  {
    title: "Email",
    align: "center",
    key: "email",
    sortable: false,
    filterable: true,
  },
  {
    title: "联系方式",
    align: "center",
    key: "contact",
    sortable: false,
    filterable: true,
  },
]);
onMounted(() => {
  getSupplierList();
});
let supplierDataList2 = ref<any[]>([]);
function getSupplierList() {
  supplierDataList2.value = filterSupplierList();
}

function filterSupplierList() {
  return supplierDataList.value.filter((item) => {
    return !searchName.value || item.supplierName.includes(searchName.value);
  });
}
// 新增供应商对话框
function showEditDialog(item: any) {}
//删除供应商
function showDelDialog(item: any) {}
// 确认新增供应商
function addSation() {}

//重置搜索
function resetFilter() {
  searchName.value = "";
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
        v-model="searchName"
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
        :headers="supplierHeaders"
        :items="supplierDataList2"
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
        <v-btn color="grey" size="large" @click="addSupplierDialog = false">
          取消
        </v-btn>
      </div>
    </v-card>
  </v-dialog>
</template>
