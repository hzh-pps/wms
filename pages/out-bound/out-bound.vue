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
// 获取消息条对象
const { snackbarShow, snackbarColor, snackbarText, setSnackbar } =
  useSnackbar();
// 对话框
let addDialog = ref(false);
let editDialog = ref(false);
let delDialog = ref(false);
let auditDialog = ref(false);
let groupDialog = ref(false);
let shippingDialog = ref(false);
let tab = ref("one");
let headers = ref<any[]>([
  {
    title: "出库单号",
    align: "center",
    key: "out_order",
    sortable: false,
    filterable: true,
  },
  {
    title: "库位",
    align: "center",
    key: "place_code",
    sortable: false,
    filterable: true,
  },
  {
    title: "容器号",
    align: "center",
    key: "container_code",
    sortable: false,
    filterable: true,
  },
  {
    title: "物料编码",
    align: "center",
    key: "sku_code",
    sortable: false,
    filterable: true,
  },
  {
    title: "物料名称",
    align: "center",
    key: "sku_name",
    sortable: false,
    filterable: true,
  },
  {
    title: "物料规格",
    align: "center",
    key: "sku_spec",
    sortable: false,
    filterable: true,
  },

  {
    title: "批次号",
    align: "center",
    key: "batch_lot",
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
let inventoryList = ref<any[]>([
  {
    out_order: "CK20230001",
    place_code: "A01",
    container_code: "CT0001",
    sku_code: "SKU1001",
    sku_name: "物料A",
    sku_spec: "规格型号A",
    batch_lot: "BATCH20230001",
    store_state: "待出库",
  },
  {
    out_order: "CK20230002",
    place_code: "A02",
    container_code: "CT0002",
    sku_code: "SKU1002",
    sku_name: "物料B",
    sku_spec: "规格型号B",
    batch_lot: "BATCH20230002",
    store_state: "待出库",
  },
  {
    out_order: "CK20230003",
    place_code: "A03",
    container_code: "CT0003",
    sku_code: "SKU1003",
    sku_name: "物料C",
    sku_spec: "规格型号C",
    batch_lot: "BATCH20230003",
    store_state: "待出库",
  },
  {
    out_order: "CK20230004",
    place_code: "A04",
    container_code: "CT0004",
    sku_code: "SKU1004",
    sku_name: "物料D",
    sku_spec: "规格型号D",
    batch_lot: "BATCH20230004",
    store_state: "已出库",
  },
  {
    out_order: "CK20230005",
    place_code: "A05",
    container_code: "CT0005",
    sku_code: "SKU1005",
    sku_name: "物料E",
    sku_spec: "规格型号E",
    batch_lot: "BATCH20230005",
    store_state: "已出库",
  },
  {
    out_order: "CK20230006",
    place_code: "A06",
    container_code: "CT0006",
    sku_code: "SKU1006",
    sku_name: "物料F",
    sku_spec: "规格型号F",
    batch_lot: "BATCH20230006",
    store_state: "待出库",
  },
  {
    out_order: "CK20230007",
    place_code: "A07",
    container_code: "CT0007",
    sku_code: "SKU1007",
    sku_name: "物料G",
    sku_spec: "规格型号G",
    batch_lot: "BATCH20230007",
    store_state: "待出库",
  },
  {
    out_order: "CK20230008",
    place_code: "A08",
    container_code: "CT0008",
    sku_code: "SKU1008",
    sku_name: "物料H",
    sku_spec: "规格型号H",
    batch_lot: "BATCH20230008",
    store_state: "待出库",
  },
  {
    out_order: "CK20230009",
    place_code: "A09",
    container_code: "CT0009",
    sku_code: "SKU1009",
    sku_name: "物料I",
    sku_spec: "规格型号I",
    batch_lot: "BATCH20230009",
    store_state: "待出库",
  },
  {
    out_order: "CK20230010",
    place_code: "A10",
    container_code: "CT0010",
    sku_code: "SKU1010",
    sku_name: "物料J",
    sku_spec: "规格型号J",
    batch_lot: "BATCH20230010",
    store_state: "已出库",
  },
  {
    out_order: "CK20230011",
    place_code: "A11",
    container_code: "CT0011",
    sku_code: "SKU1011",
    sku_name: "物料K",
    sku_spec: "规格型号K",
    batch_lot: "BATCH20230011",
    store_state: "完成",
  },
  {
    out_order: "CK20230012",
    place_code: "A12",
    container_code: "CT0012",
    sku_code: "SKU1012",
    sku_name: "物料L",
    sku_spec: "规格型号L",
    batch_lot: "BATCH20230012",
    store_state: "完成",
  },
  {
    out_order: "CK20230013",
    place_code: "A13",
    container_code: "CT0013",
    sku_code: "SKU1013",
    sku_name: "物料M",
    sku_spec: "规格型号M",
    batch_lot: "BATCH20230013",
    store_state: "完成",
  },
  {
    out_order: "CK20230014",
    place_code: "A14",
    container_code: "CT0014",
    sku_code: "SKU1014",
    sku_name: "物料N",
    sku_spec: "规格型号N",
    batch_lot: "BATCH20230014",
    store_state: "完成",
  },
]);
let searchOutOrder = ref<string>("");
let searchPlaceCode = ref<string>("");
let searchSkuName = ref<string>("");
let status = ref<string>("待出库");
onMounted(() => {
  inventoryList2.value = [...inventoryList.value];
  filterInventoryList1();
});
let inventoryList2 = ref<any[]>([]);
function filterInventoryList() {
  return inventoryList2.value.filter((item) => {
    return (
      (!searchOutOrder.value ||
        item.out_order.includes(searchOutOrder.value)) &&
      (!searchPlaceCode.value ||
        item.place_code.includes(searchPlaceCode.value)) &&
      (!searchSkuName.value || item.sku_name.includes(searchSkuName.value)) &&
      (!status.value || item.store_state.includes(status.value))
    );
  });
}
function filter() {
  inventoryList2.value = [...inventoryList.value];
  inventoryList2.value = filterInventoryList();
}
function resetFilter() {
  searchOutOrder.value = "";
  searchPlaceCode.value = "";
  searchSkuName.value = "";
  inventoryList2.value = [...inventoryList.value];
  inventoryList2.value = filterInventoryList();
}
function filterInventoryList1() {
  searchOutOrder.value = "";
  searchPlaceCode.value = "";
  searchSkuName.value = "";
  status.value = "待出库";
  inventoryList2.value = [...inventoryList.value];
  inventoryList2.value = filterInventoryList();
}

let inventoryInfo = ref<any>(null);

// 新增收货单
function showAddDialog() {
  addDialog.value = true;
  inventoryInfo.value = {
    out_order: "",
    place_code: "",
    container_code: "",
    sku_code: "",
    sku_name: "",
    sku_spec: "",
    batch_lot: "BATCH20230001",
    store_state: "待出库",
  };
}
// 确认新增
function addReceipt() {
  inventoryList.value.push(inventoryInfo.value);
  filterInventoryList1();
  addDialog.value = false;
  setSnackbar("green", "新增成功");
}
// 修改出库单
function showEditDialog(item: any) {
  editDialog.value = true;
  inventoryInfo.value = { ...item };
}
// 确认修改
function editReceipt() {
  const index = inventoryList.value.findIndex(
    (item) => item.out_order === inventoryInfo.value.out_order
  );
  if (index !== -1) {
    inventoryList.value[index] = { ...inventoryInfo.value };
  }
  filterInventoryList1();
  editDialog.value = false;
  setSnackbar("green", "修改成功");
}
// 删除出库单
function showDelDialog(item: any) {
  delDialog.value = true;
  inventoryInfo.value = { ...item };
}
function delReceipt() {
  const index = inventoryList.value.findIndex(
    (item) => item.out_order === inventoryInfo.value.out_order
  );
  if (index !== -1) {
    inventoryList.value.splice(index, 1);
  }
  filterInventoryList1();
  delDialog.value = false;
  setSnackbar("green", "删除成功");
}
// 审核
function showAuditDialog(item: any) {
  auditDialog.value = true;
  inventoryInfo.value = { ...item };
}
// 确认审核
function auditReceipt() {
  const index = inventoryList.value.findIndex(
    (item) => item.out_order === inventoryInfo.value.out_order
  );
  if (index !== -1) {
    inventoryList.value[index] = {
      ...inventoryInfo.value,
      store_state: "已出库",
    };
  }
  filterInventoryList1();
  auditDialog.value = false;
  setSnackbar("green", "审核成功");
}
let selected = ref<any[]>([]);
function filterInventoryList2() {
  searchOutOrder.value = "";
  searchPlaceCode.value = "";
  searchSkuName.value = "";
  status.value = "已出库";
  inventoryList2.value = [...inventoryList.value];
  inventoryList2.value = filterInventoryList();
}

function showGroupDialog(item: any) {
  if (selected.value.length === 0) {
    return setSnackbar("black", "请选择要打包的物料");
  }
  groupDialog.value = true;
}
let code = ref<any>(null);
let newDate = new Date().toISOString().substring(0, 10);
let people = ref<any>(null);
// 打包
function groupShelves() {
  if (!code.value || !people.value) {
    return alert("请填写发货单号和客户");
  }
  selected.value.forEach((selectedItem) => {
    const index = inventoryList.value.findIndex(
      (inventoryItem) => inventoryItem.out_order === selectedItem.out_order
    );
    if (index !== -1) {
      inventoryList.value[index].store_state = "完成";
    }
  });
  shippingList.value.push({
    shipping_order: code.value,
    customer_name: people.value,
    shipping_date: newDate,
    shipping_status: "待发货",
  });
  filterInventoryList2();
  groupDialog.value = false;
  selected.value = [];
  code.value = null;
  people.value = null;
  setSnackbar("green", "打包成功");
}
function filterInventoryList3() {
  searchOutOrder.value = "";
  searchPlaceCode.value = "";
  searchSkuName.value = "";
  status.value = "完成";
  inventoryList2.value = [...inventoryList.value];
  inventoryList2.value = filterInventoryList();
}

// 发货单表头
let shipHeader = ref<any[]>([
  {
    title: "发货单号",
    align: "center",
    key: "shipping_order",
    sortable: false,
    filterable: true,
  },

  {
    title: "客户名称",
    align: "center",
    key: "customer_name",
    sortable: false,
    filterable: true,
  },
  {
    title: "发货日期",
    align: "center",
    key: "shipping_date",
    sortable: false,
    filterable: true,
  },
  {
    title: "发货状态",
    align: "center",
    key: "shipping_status",
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
// 发货单数据示例
let shippingList = ref([
  {
    shipping_order: "FH20230001",
    customer_name: "客户A",
    shipping_date: "2023-01-01",
    shipping_status: "已发货",
  },
  {
    shipping_order: "FH20230002",
    customer_name: "客户B",
    shipping_date: "2023-01-02",
    shipping_status: "待发货",
  },
  {
    shipping_order: "FH20230003",
    customer_name: "客户C",
    shipping_date: "2023-01-03",
    shipping_status: "已发货",
  },
  {
    shipping_order: "FH20230004",
    customer_name: "客户D",
    shipping_date: "2023-01-04",
    shipping_status: "待发货",
  },
  {
    shipping_order: "FH20230005",
    customer_name: "客户E",
    shipping_date: "2023-01-05",
    shipping_status: "已发货",
  },
  {
    shipping_order: "FH20230006",
    customer_name: "客户F",
    shipping_date: "2023-01-06",
    shipping_status: "待发货",
  },
  {
    shipping_order: "FH20230007",
    customer_name: "客户G",
    shipping_date: "2023-01-07",
    shipping_status: "已发货",
  },
  {
    shipping_order: "FH20230008",
    customer_name: "客户H",
    shipping_date: "2023-01-08",
    shipping_status: "待发货",
  },
  {
    shipping_order: "FH20230009",
    customer_name: "客户I",
    shipping_date: "2023-01-09",
    shipping_status: "已发货",
  },
  {
    shipping_order: "FH20230010",
    customer_name: "客户J",
    shipping_date: "2023-01-10",
    shipping_status: "待发货",
  },
]);
let shippingInfo = ref<any>(null);
// 发货
function shipping(item: any) {
  shippingInfo.value = { ...item };
  shippingDialog.value = true;
}
// 发货
function shipShelves() {
  if (shippingInfo.value) {
    const index = shippingList.value.findIndex(
      (item) => item.shipping_order === shippingInfo.value.shipping_order
    );
    if (index !== -1) {
      shippingList.value[index].shipping_status = "已发货";
    }
  }
  shippingDialog.value = false;
  setSnackbar("green", "发货成功");
}
</script>
<template>
  <v-row class="ma-2">
    <v-col cols="12">
      <v-card>
        <v-tabs v-model="tab">
          <v-tab value="one" @click="filterInventoryList1">
            <v-icon class="mr-2 mt-1" color="blue-darken-2"
              >fa-solid fa-circle-exclamation</v-icon
            >
            出库制单</v-tab
          >
          <v-tab value="two" @click="filterInventoryList2">
            <v-icon class="mr-2 mt-1" color="blue-darken-2"
              >fa-solid fa-suitcase</v-icon
            >拣货打包
          </v-tab>
          <v-tab value="three">
            <v-icon class="mr-2 mt-1" color="blue-darken-2"
              >fa-regular fa-paste</v-icon
            >发货单
          </v-tab>

          <v-tab value="four" @click="filterInventoryList3">
            <v-icon class="mr-2 mt-1" color="blue-darken-2"
              >fa-solid fa-mobile</v-icon
            >出库记录</v-tab
          >
        </v-tabs>
        <v-card-text>
          <v-window v-model="tab">
            <!-- 出库制单 -->
            <v-window-item value="one">
              <v-row>
                <v-col cols="4">
                   <v-text-field
                    label="出库单号"
                    v-model="searchOutOrder"
                    variant="outlined"
                    density="compact"
                    hide-details
                  ></v-text-field>
                </v-col>
                <v-col cols="4">
                   <v-text-field
                    label="库位"
                    v-model="searchPlaceCode"
                    variant="outlined"
                    density="compact"
                    hide-details
                  ></v-text-field>
                </v-col>
                <v-col cols="4">
                   <v-text-field
                    label="商品名称"
                    v-model="searchSkuName"
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
                    >新增出库单</v-btn
                  >
                </v-col>
                <v-col cols="12">
                  <v-data-table
                    hover
                    :items-per-page="10"
                    :headers="headers"
                    :items="inventoryList2"
                    style="overflow-x: auto; white-space: nowrap"
                    fixed-footer
                    fixed-header
                    height="610"
                    no-data-text="没有找到符合的数据"
                  >
                    <template v-slot:item.action="{ item }">
                      <v-icon
                        color="blue"
                        size="small"
                        class="mr-5"
                        v-show="item.raw.store_state === '待出库'"
                        @click="showAuditDialog(item.raw)"
                      >
                        fa-solid fa-eye
                      </v-icon>
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
                      <v-icon
                        color="red"
                        size="small"
                        @click="showDelDialog(item.raw)"
                      >
                        fa-solid fa-trash
                      </v-icon>
                    </template>
                  </v-data-table>
                </v-col>
              </v-row>
            </v-window-item>
            <!-- 拣货打包 -->
            <v-window-item value="two">
              <v-row>
                <v-col cols="4">
                   <v-text-field
                    label="出库单号"
                    v-model="searchOutOrder"
                    variant="outlined"
                    density="compact"
                    hide-details
                  ></v-text-field>
                </v-col>
                <v-col cols="4">
                   <v-text-field
                    label="库位"
                    v-model="searchPlaceCode"
                    variant="outlined"
                    density="compact"
                    hide-details
                  ></v-text-field>
                </v-col>
                <v-col cols="4">
                   <v-text-field
                    label="商品名称"
                    v-model="searchSkuName"
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
                    @click="showGroupDialog"
                    >打包</v-btn
                  >
                </v-col>
                <v-col cols="12">
                  <v-data-table
                    hover
                    :items-per-page="10"
                    :headers="headers"
                    :items="inventoryList2"
                    v-model="selected"
                    show-select
                    return-object
                    style="overflow-x: auto; white-space: nowrap"
                    fixed-footer
                    fixed-header
                    height="610"
                    no-data-text="没有找到符合的数据"
                  >
                    <template v-slot:item.action="{ item }">
                      <v-icon
                        color="blue"
                        size="small"
                        class="mr-5"
                        v-show="item.raw.store_state === '待出库'"
                        @click="showAuditDialog(item.raw)"
                      >
                        fa-solid fa-eye
                      </v-icon>
                      <!-- 修改 -->
                      <v-icon
                        color="blue"
                        size="small"
                        class="mr-3"
                        v-show="item.raw.store_state === '待出库'"
                        @click="showEditDialog(item.raw)"
                      >
                        fa-solid fa-pen
                      </v-icon>
                      <!-- 删除 -->
                      <v-icon
                        color="red"
                        size="small"
                        v-show="item.raw.store_state === '待出库'"
                        @click="showDelDialog(item.raw)"
                      >
                        fa-solid fa-trash
                      </v-icon>
                    </template>
                  </v-data-table>
                </v-col>
              </v-row>
            </v-window-item>
            <!-- 发货单 -->
            <v-window-item value="three">
              <v-row>
                <v-col cols="4">
                   <v-text-field
                    label="商品名称"
                    variant="outlined"
                    density="compact"
                    hide-details
                  ></v-text-field>
                </v-col>
                <v-col cols="4">
                   <v-text-field
                    label="商品名称"
                    variant="outlined"
                    density="compact"
                    hide-details
                  ></v-text-field>
                </v-col>
                <v-col cols="4">
                   <v-text-field
                    label="商品名称"
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
                    :headers="shipHeader"
                    :items="shippingList"
                    style="overflow-x: auto; white-space: nowrap"
                    fixed-footer
                    fixed-header
                    height="610"
                    no-data-text="没有找到符合的数据"
                  >
                    <template v-slot:item.action="{ item }">
                      <!-- 发货 -->
                      <v-icon
                        color="blue"
                        size="small"
                        class="mr-3"
                        v-if="item.raw.shipping_status === '待发货'"
                        @click.stop="shipping(item.raw)"
                      >
                        fa-solid fa-truck-arrow-right
                      </v-icon>
                      <v-icon color="blue" size="small" class="mr-3" v-else>
                      </v-icon>
                      <!-- 修改 -->
                      <v-icon color="blue" size="small" class="mr-3">
                        fa-solid fa-pen
                      </v-icon>
                      <!-- 删除 -->
                      <v-icon color="red" size="small">
                        fa-solid fa-trash
                      </v-icon>
                    </template>
                  </v-data-table>
                </v-col>
              </v-row>
            </v-window-item>
            <!-- 出库记录 -->
            <v-window-item value="four">
              <v-row>
                <v-col cols="4">
                   <v-text-field
                    label="出库单号"
                    v-model="searchOutOrder"
                    variant="outlined"
                    density="compact"
                    hide-details
                  ></v-text-field>
                </v-col>
                <v-col cols="4">
                   <v-text-field
                    label="库位"
                    v-model="searchPlaceCode"
                    variant="outlined"
                    density="compact"
                    hide-details
                  ></v-text-field>
                </v-col>
                <v-col cols="4">
                   <v-text-field
                    label="商品名称"
                    v-model="searchSkuName"
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
                    :items="inventoryList2"
                    style="overflow-x: auto; white-space: nowrap"
                    fixed-footer
                    fixed-header
                    height="610"
                    no-data-text="没有找到符合的数据"
                  >
                    <template v-slot:item.action="{ item }">
                      <v-icon
                        color="blue"
                        size="small"
                        class="mr-5"
                        v-show="item.raw.store_state === '待出库'"
                        @click="showAuditDialog(item.raw)"
                      >
                        fa-solid fa-eye
                      </v-icon>
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
                      <v-icon
                        color="red"
                        size="small"
                        @click="showDelDialog(item.raw)"
                      >
                        fa-solid fa-trash
                      </v-icon>
                    </template>
                  </v-data-table>
                </v-col>
              </v-row>
            </v-window-item>
          </v-window>
        </v-card-text>
      </v-card>
    </v-col>
    <!-- 新增出库单 -->
    <v-dialog v-model="addDialog" min-width="400px" width="560px">
      <v-card>
        <v-toolbar color="blue">
          <v-toolbar-title> 新增出库单 </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="addDialog = false">
            <v-icon>fa-solid fa-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text class="mt-4">
          <v-row>
            <v-col cols="12">
              <v-text-field
                label="出库单号"
                v-model="inventoryInfo.out_order"
                variant="outlined"
                density="compact"
                hide-details
                class="mt-2"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="物料名"
                v-model="inventoryInfo.sku_name"
                variant="outlined"
                density="compact"
                hide-details
                class="mt-2"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="物料编码"
                v-model="inventoryInfo.sku_code"
                variant="outlined"
                density="compact"
                hide-details
                class="mt-2"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="物料规格"
                v-model="inventoryInfo.sku_spec"
                variant="outlined"
                density="compact"
                hide-details
                class="mt-2"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="批次号"
                v-model="inventoryInfo.batch_lot"
                variant="outlined"
                density="compact"
                hide-details
                class="mt-2"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="库位"
                v-model="inventoryInfo.place_code"
                variant="outlined"
                density="compact"
                hide-details
                class="mt-2"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="容器号"
                v-model="inventoryInfo.container_code"
                variant="outlined"
                density="compact"
                hide-details
                class="mt-2"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="状态"
                readonly
                v-model="inventoryInfo.store_state"
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
    <!-- 修改出库单 -->
    <v-dialog v-model="editDialog" min-width="400px" width="560px">
      <v-card>
        <v-toolbar color="blue">
          <v-toolbar-title> 修改出库单 </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="editDialog = false">
            <v-icon>fa-solid fa-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text class="mt-4">
          <v-row>
            <v-col cols="12">
              <v-text-field
                label="出库单号"
                readonly
                v-model="inventoryInfo.out_order"
                variant="outlined"
                density="compact"
                hide-details
                class="mt-2"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="物料名"
                v-model="inventoryInfo.sku_name"
                variant="outlined"
                density="compact"
                hide-details
                class="mt-2"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="物料编码"
                v-model="inventoryInfo.sku_code"
                variant="outlined"
                density="compact"
                hide-details
                class="mt-2"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="物料规格"
                v-model="inventoryInfo.sku_spec"
                variant="outlined"
                density="compact"
                hide-details
                class="mt-2"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="批次号"
                v-model="inventoryInfo.batch_lot"
                variant="outlined"
                density="compact"
                hide-details
                class="mt-2"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="库位"
                v-model="inventoryInfo.place_code"
                variant="outlined"
                density="compact"
                hide-details
                class="mt-2"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="容器号"
                v-model="inventoryInfo.container_code"
                variant="outlined"
                density="compact"
                hide-details
                class="mt-2"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="状态"
                readonly
                v-model="inventoryInfo.store_state"
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
            @click="editReceipt()"
          >
            确认
          </v-btn>
          <v-btn color="grey" size="large" @click="editDialog = false">
            取消
          </v-btn>
        </div>
      </v-card>
    </v-dialog>
    <!-- 删除出库单 -->
    <v-dialog v-model="delDialog" min-width="400px" width="560px">
      <v-card>
        <v-toolbar color="blue">
          <v-toolbar-title> 删除出库单 </v-toolbar-title>
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
            @click="delReceipt"
          >
            确认
          </v-btn>
          <v-btn color="grey" size="large" @click="delDialog = false">
            取消
          </v-btn>
        </div>
      </v-card>
    </v-dialog>
    <!-- 审核出库单 -->
    <v-dialog v-model="auditDialog" min-width="400px" width="560px">
      <v-card>
        <v-toolbar color="blue">
          <v-toolbar-title> 审核出库单 </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="auditDialog = false">
            <v-icon>fa-solid fa-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text class="mt-4">
          <v-row>
            <v-col cols="12">
              <v-text-field
                label="出库单号"
                readonly
                v-model="inventoryInfo.out_order"
                variant="outlined"
                density="compact"
                hide-details
                class="mt-2"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="物料名"
                readonly
                v-model="inventoryInfo.sku_name"
                variant="outlined"
                density="compact"
                hide-details
                class="mt-2"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="物料编码"
                readonly
                v-model="inventoryInfo.sku_code"
                variant="outlined"
                density="compact"
                hide-details
                class="mt-2"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="物料规格"
                readonly
                v-model="inventoryInfo.sku_spec"
                variant="outlined"
                density="compact"
                hide-details
                class="mt-2"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="批次号"
                readonly
                v-model="inventoryInfo.batch_lot"
                variant="outlined"
                density="compact"
                hide-details
                class="mt-2"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="库位"
                readonly
                v-model="inventoryInfo.place_code"
                variant="outlined"
                density="compact"
                hide-details
                class="mt-2"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="容器号"
                readonly
                v-model="inventoryInfo.container_code"
                variant="outlined"
                density="compact"
                hide-details
                class="mt-2"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="状态"
                readonly
                v-model="inventoryInfo.store_state"
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
            @click="auditReceipt()"
          >
            确认
          </v-btn>
          <v-btn color="grey" size="large" @click="auditDialog = false">
            取消
          </v-btn>
        </div>
      </v-card>
    </v-dialog>
    <!-- 打包发货 -->
    <v-dialog v-model="groupDialog" min-width="400px" width="560px">
      <v-card>
        <v-toolbar color="blue">
          <v-toolbar-title> 打包发货 </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="groupDialog = false">
            <v-icon>fa-solid fa-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text>
          <v-text-field
            label="发货单号"
            v-model="code"
            variant="outlined"
            density="compact"
            class="mt-2"
          ></v-text-field>
          <v-text-field
            label="客户"
            v-model="people"
            variant="outlined"
            density="compact"
            class="mt-2"
          ></v-text-field>
          <v-text-field
            label="日期"
            v-model="newDate"
            type="date"
            variant="outlined"
            density="compact"
            class="mt-2"
          ></v-text-field>
        </v-card-text>
        <div class="d-flex justify-end mr-6 mb-4">
          <v-btn
            color="blue-darken-2"
            size="large"
            class="mr-2"
            @click="groupShelves"
          >
            确认
          </v-btn>
          <v-btn color="grey" size="large" @click="groupDialog = false">
            取消
          </v-btn>
        </div>
      </v-card>
    </v-dialog>

    <!-- 发货 -->
    <v-dialog v-model="shippingDialog" min-width="400px" width="560px">
      <v-card>
        <v-toolbar color="blue">
          <v-toolbar-title> 发货 </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="shippingDialog = false">
            <v-icon>fa-solid fa-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text>
          <v-text-field
            label="发货单号"
            readonly
            v-model="shippingInfo.shipping_order"
            variant="outlined"
            density="compact"
            class="mt-2"
          ></v-text-field>
          <v-text-field
            label="客户"
            readonly
            v-model="shippingInfo.customer_name"
            variant="outlined"
            density="compact"
            class="mt-2"
          ></v-text-field>
          <v-text-field
            label="日期"
            readonly
            v-model="shippingInfo.shipping_date"
            type="date"
            variant="outlined"
            density="compact"
            class="mt-2"
          ></v-text-field>
        </v-card-text>
        <div class="d-flex justify-end mr-6 mb-4">
          <v-btn
            color="blue-darken-2"
            size="large"
            class="mr-2"
            @click="shipShelves"
          >
            确认
          </v-btn>
          <v-btn color="grey" size="large" @click="shippingDialog = false">
            取消
          </v-btn>
        </div>
      </v-card>
    </v-dialog>
  </v-row>
  <v-snackbar location="top" v-model="snackbarShow" :color="snackbarColor">
    {{ snackbarText }}
    <template v-slot:actions>
      <v-btn variant="tonal" @click="snackbarShow = false">关闭</v-btn>
    </template>
  </v-snackbar>
</template>
