<script setup lang="ts">
useSeoMeta({
  // 该页面的标题
  title: "库存流水",
  // 社交媒体分享该页面时显示的标题
  ogTitle: "库存流水",
  // 该页面的描述
  description: "同日 MES 系统，库存流水",
  // 社交媒体分享该页面时显示的描述
  ogDescription: "同日 MES 系统，库存流水",
  // 社交媒体分享该页面时显示的图片
  ogImage: "/同日图标.png",
});
// 页面缓存
definePageMeta({
  keepalive: false,
});
//表头
let Headers = ref<any[]>([
  {
    title: "类型",
    align: "center",
    key: "type",
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
    title: "物料名称",
    align: "center",
    key: "sku_name",
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
    title: "物料数量",
    align: "center",
    key: "sku_qty",
    sortable: false,
    filterable: true,
  },
  {
    title: "操作时间",
    align: "center",
    key: "date",
    sortable: true,
    filterable: true,
  },
]);
//存储数据库数据
let billList = ref<any[]>([
  {
    type: "in",
    place_code: "A01",
    container_code: "C001",
    sku_name: "螺丝刀",
    sku_code: "10001",
    sku_spec: "型号A",
    batch_lot: "BL20230101",
    sku_qty: 100,
    date: "2023-01-01T08:00:00Z",
  },
  {
    type: "out",
    place_code: "A02",
    container_code: "C002",
    sku_name: "钳子",
    sku_code: "10002",
    sku_spec: "型号B",
    batch_lot: "BL20230102",
    sku_qty: 80,
    date: "2023-01-02T09:00:00Z",
  },
  {
    type: "in",
    place_code: "A03",
    container_code: "C003",
    sku_name: "电钻",
    sku_code: "10003",
    sku_spec: "型号C",
    batch_lot: "BL20230103",
    sku_qty: 50,
    date: "2023-01-03T10:00:00Z",
  },
  {
    type: "out",
    place_code: "A04",
    container_code: "C004",
    sku_name: "锤子",
    sku_code: "10004",
    sku_spec: "型号D",
    batch_lot: "BL20230104",
    sku_qty: 70,
    date: "2023-01-04T11:00:00Z",
  },
  {
    type: "in",
    place_code: "A05",
    container_code: "C005",
    sku_name: "量尺",
    sku_code: "10005",
    sku_spec: "型号E",
    batch_lot: "BL20230105",
    sku_qty: 120,
    date: "2023-01-05T12:00:00Z",
  },
  {
    type: "out",
    place_code: "A06",
    container_code: "C006",
    sku_name: "水平仪",
    sku_code: "10006",
    sku_spec: "型号F",
    batch_lot: "BL20230106",
    sku_qty: 60,
    date: "2023-01-06T13:00:00Z",
  },
  {
    type: "in",
    place_code: "A07",
    container_code: "C007",
    sku_name: "电烙铁",
    sku_code: "10007",
    sku_spec: "型号G",
    batch_lot: "BL20230107",
    sku_qty: 90,
    date: "2023-01-07T14:00:00Z",
  },
  {
    type: "out",
    place_code: "A08",
    container_code: "C008",
    sku_name: "剪刀",
    sku_code: "10008",
    sku_spec: "型号H",
    batch_lot: "BL20230108",
    sku_qty: 110,
    date: "2023-01-08T15:00:00Z",
  },
  {
    type: "in",
    place_code: "A09",
    container_code: "C009",
    sku_name: "手电筒",
    sku_code: "10009",
    sku_spec: "型号I",
    batch_lot: "BL20230109",
    sku_qty: 100,
    date: "2023-01-09T16:00:00Z",
  },
  {
    type: "out",
    place_code: "A10",
    container_code: "C010",
    sku_name: "胶带",
    sku_code: "10010",
    sku_spec: "型号J",
    batch_lot: "BL20230110",
    sku_qty: 150,
    date: "2023-01-10T17:00:00Z",
  },
]);

let billList2 = ref<any[]>([]);
//获取数据库数据
function getBillData() {
  billList2.value = filterBillList();
}
function filterBillList() {
  return billList.value.filter((item) => {
    return (
      (!searchArea.value || item.place_code.includes(searchArea.value)) &&
      (!searchContainer.value ||
        item.container_code.includes(searchContainer.value)) &&
      (!searchName.value || item.sku_name.includes(searchName.value)) &&
      (!searchGg.value || item.sku_spec.includes(searchGg.value)) &&
      (!searchCode.value || item.sku_code.includes(searchCode.value)) &&
      (!searchLot.value || item.batch_lot.includes(searchLot.value))
    );
  });
}

onMounted(() => {
  getBillData();
});
//搜索名称
let searchArea = ref<any>("");
let searchWareHouse = ref<any>("A");
watch(searchWareHouse, function () {
  getBillData();
});
let searchContainer = ref<any>("");
let searchName = ref<any>("");
let searchGg = ref<any>("");
let searchCode = ref<any>("");
let searchLot = ref<any>("");
let date = new Date();
date.setMonth(date.getMonth() - 6);
let searchDateStart = date.toISOString().substring(0, 10);
let searchDateEnd = new Date().toISOString().substring(0, 10);

function filter() {
  getBillData();
}
function resetFilter() {
  searchArea.value = "";
  searchContainer.value = "";
  searchLot.value = "";
  searchCode.value = "";
  searchGg.value = "";
  searchName.value = "";
  searchDateStart = date.toISOString().substring(0, 10);
  searchDateEnd = new Date().toISOString().substring(0, 10);
  getBillData();
}
let tab = ref<string>("one");
</script>
<template>
  <v-row class="ma-2">
    <v-col cols="1">
      <v-tabs v-model="tab" class="mt-2" direction="vertical">
        <v-tab value="one">库存流水</v-tab>
        <v-tab value="two">历时库存</v-tab>
      </v-tabs>
    </v-col>
    <v-col cos="11">
      <v-window v-model="tab">
        <v-window-item value="one">
          <v-row>
            <v-col cols="3">
              <v-text-field
                label="库位"
                v-model="searchArea"
                variant="outlined"
                density="compact"
                hide-details
                class="mt-2"
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                label="容器号"
                v-model="searchContainer"
                variant="outlined"
                density="compact"
                hide-details
                class="mt-2"
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                label="物料名称"
                v-model="searchName"
                variant="outlined"
                density="compact"
                hide-details
                class="mt-2"
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                label="物料规格"
                v-model="searchGg"
                variant="outlined"
                density="compact"
                hide-details
                class="mt-2"
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                label="物料编码"
                v-model="searchCode"
                variant="outlined"
                density="compact"
                hide-details
                class="mt-2"
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                label="批次"
                v-model="searchLot"
                variant="outlined"
                density="compact"
                hide-details
                class="mt-2"
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                label="最早创建时间"
                v-model="searchDateStart"
                type="date"
                variant="outlined"
                density="compact"
                hide-details
                class="mt-2"
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                label="最晚创建时间"
                v-model="searchDateEnd"
                type="date"
                variant="outlined"
                density="compact"
                hide-details
                class="mt-2"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-row>
                <v-col cols="2">
                  <v-btn
                    color="blue-darken-2"
                    class="mr-2 mt-2"
                    size="default"
                    @click="filter"
                    >查询</v-btn
                  >
                  <v-btn
                    color="red"
                    class="mr-2 mt-2"
                    size="default"
                    @click="resetFilter"
                    >重置查询</v-btn
                  >
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12">
              <v-data-table
                hover
                :items-per-page="10"
                :headers="Headers"
                :items="billList2"
                style="overflow-x: auto; white-space: nowrap"
                fixed-footer
                fixed-header
                height="610"
                no-data-text="没有找到符合的数据"
              >
              </v-data-table>
            </v-col>
          </v-row>
        </v-window-item>
        <v-window-item value="two">
          <v-row>
            <v-col cols="3">
              <v-text-field
                label="库位"
                v-model="searchArea"
                variant="outlined"
                density="compact"
                hide-details
                class="mt-2"
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                label="容器号"
                v-model="searchContainer"
                variant="outlined"
                density="compact"
                hide-details
                class="mt-2"
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                label="物料名称"
                v-model="searchName"
                variant="outlined"
                density="compact"
                hide-details
                class="mt-2"
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                label="物料规格"
                v-model="searchGg"
                variant="outlined"
                density="compact"
                hide-details
                class="mt-2"
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                label="物料编码"
                v-model="searchCode"
                variant="outlined"
                density="compact"
                hide-details
                class="mt-2"
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                label="批次"
                v-model="searchLot"
                variant="outlined"
                density="compact"
                hide-details
                class="mt-2"
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                label="最早创建时间"
                v-model="searchDateStart"
                type="date"
                variant="outlined"
                density="compact"
                hide-details
                class="mt-2"
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                label="最晚创建时间"
                v-model="searchDateEnd"
                type="date"
                variant="outlined"
                density="compact"
                hide-details
                class="mt-2"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-row>
                <v-col cols="2">
                  <v-btn
                    color="blue-darken-2"
                    class="mr-2 mt-2"
                    size="default"
                    @click="filter"
                    >查询</v-btn
                  >
                  <v-btn
                    color="red"
                    class="mr-2 mt-2"
                    size="default"
                    @click="resetFilter"
                    >重置查询</v-btn
                  >
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12">
              <v-data-table
                hover
                :items-per-page="10"
                :headers="Headers"
                :items="billList2"
                style="overflow-x: auto; white-space: nowrap"
                fixed-footer
                fixed-header
                height="610"
                no-data-text="没有找到符合的数据"
              >
              </v-data-table>
            </v-col>
          </v-row>
        </v-window-item>
      </v-window>
    </v-col>
  </v-row>
</template>
