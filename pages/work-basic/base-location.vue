<script setup lang="ts">
useSeoMeta({
  // 该页面的标题
  title: "库位管理",
  // 社交媒体分享该页面时显示的标题
  ogTitle: "库位管理",
  // 该页面的描述
  description: "同日 MES 系统，库位管理",
  // 社交媒体分享该页面时显示的描述
  ogDescription: "同日 MES 系统，库位管理",
  // 社交媒体分享该页面时显示的图片
  ogImage: "/同日图标.png",
});
// 页面缓存
definePageMeta({
  keepalive: true,
});
const router = useRouter();
// 获取消息条对象
const { snackbarShow, snackbarColor, snackbarText, setSnackbar } =
  useSnackbar();
//搜索绑定
let searchWarehouse = ref<any>(null);
let searchPlaceCode = ref<any>(null);
let searchPlaceDesc = ref<any>(null);
let searchAreaCode = ref<any>(null);
let searchContainer = ref<any>(null);
let searchDefaultSku = ref<any>(null);
let searchFlag = ref<any>(null);
let searchIsEmpty = ref<any>(null);
let searchOccupy = ref<any>(null);
let searchPlaceType = ref<any>(null);
let searchDisable = ref<any>(null);
//表头
let headers = ref<any[]>([
  {
    title: "仓库号",
    align: "center",
    key: "warehouse",
    sortable: false,
    filterable: true,
  },
  {
    title: "库位类型",
    align: "center",
    key: "place_type",
    sortable: false,
    filterable: true,
  },
  {
    title: "库位号",
    align: "center",
    key: "place_code",
    sortable: false,
    filterable: true,
  },
  {
    title: "库位名称",
    align: "center",
    key: "place_desc",
    sortable: false,
    filterable: true,
  },
  {
    title: "库区号",
    align: "center",
    key: "area_code",
    sortable: false,
    filterable: true,
  },
  {
    title: "容器号",
    align: "center",
    key: "container_id",
    sortable: false,
    filterable: true,
  },
  {
    title: "占用单据号",
    align: "center",
    key: "occupy_order",
    sortable: false,
    filterable: true,
  },
  {
    title: "默认物料",
    align: "center",
    key: "default_sku",
    sortable: false,
    filterable: true,
  },
  {
    title: "是否为空Y/N",
    align: "center",
    key: "is_empty",
    sortable: false,
    filterable: true,
  },
  {
    title: "是否有任务",
    align: "center",
    key: "flag_has_task",
    sortable: false,
    filterable: true,
  },
  {
    title: "禁用",
    align: "center",
    key: "disable",
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

let wareHouseList = ref<any[]>([
  {
    warehouse: "A",
    place_type: "平面库",
    place_code: "A01-01-01",
    place_desc: "A仓库1区1排1列",
    area_code: "01",
    container_id: "C001",
    occupy_order: "O-00001",
    default_sku: "SKU001",
    is_empty: "Y",
    flag_has_task: "N",
    disable: "否",
  },
  {
    warehouse: "B",
    place_type: "立体库",
    place_code: "B02-02-02",
    place_desc: "B仓库2区2排2列",
    area_code: "02",
    container_id: "C002",
    occupy_order: "O-00002",
    default_sku: "SKU002",
    is_empty: "N",
    flag_has_task: "Y",
    disable: "是",
  },
  {
    warehouse: "C",
    place_type: "冷藏库",
    place_code: "C03-03-03",
    place_desc: "C仓库3区3排3列",
    area_code: "03",
    container_id: "C003",
    occupy_order: "O-00003",
    default_sku: "SKU003",
    is_empty: "Y",
    flag_has_task: "N",
    disable: "否",
  },
  {
    warehouse: "D",
    place_type: "危险品库",
    place_code: "D04-04-04",
    place_desc: "D仓库4区4排4列",
    area_code: "04",
    container_id: "C004",
    occupy_order: "O-00004",
    default_sku: "SKU004",
    is_empty: "N",
    flag_has_task: "Y",
    disable: "是",
  },
  {
    warehouse: "E",
    place_type: "平面库",
    place_code: "E05-05-05",
    place_desc: "E仓库5区5排5列",
    area_code: "05",
    container_id: "C005",
    occupy_order: "O-00005",
    default_sku: "SKU005",
    is_empty: "Y",
    flag_has_task: "N",
    disable: "否",
  },
  {
    warehouse: "F",
    place_type: "立体库",
    place_code: "F06-06-06",
    place_desc: "F仓库6区6排6列",
    area_code: "06",
    container_id: "C006",
    occupy_order: "O-00006",
    default_sku: "SKU006",
    is_empty: "N",
    flag_has_task: "Y",
    disable: "是",
  },
  {
    warehouse: "G",
    place_type: "临时库",
    place_code: "G07-07-07",
    place_desc: "G仓库7区7排7列",
    area_code: "07",
    container_id: "C007",
    occupy_order: "O-00007",
    default_sku: "SKU007",
    is_empty: "Y",
    flag_has_task: "N",
    disable: "否",
  },
  {
    warehouse: "H",
    place_type: "冷藏库",
    place_code: "H08-08-08",
    place_desc: "H仓库8区8排8列",
    area_code: "08",
    container_id: "C008",
    occupy_order: "O-00008",
    default_sku: "SKU008",
    is_empty: "N",
    flag_has_task: "Y",
    disable: "是",
  },
  {
    warehouse: "I",
    place_type: "危险品库",
    place_code: "I09-09-09",
    place_desc: "I仓库9区9排9列",
    area_code: "09",
    container_id: "C009",
    occupy_order: "O-00009",
    default_sku: "SKU009",
    is_empty: "Y",
    flag_has_task: "N",
    disable: "否",
  },
  {
    warehouse: "J",
    place_type: "平面库",
    place_code: "J10-10-10",
    place_desc: "J仓库10区10排10列",
    area_code: "10",
    container_id: "C010",
    occupy_order: "O-00010",
    default_sku: "SKU010",
    is_empty: "N",
    flag_has_task: "Y",
    disable: "是",
  },
]);

let wareHouseList2 = ref<any[]>([]);
//获取数据库内的数据
function getWareHouseDate() {
  wareHouseList2.value = filterWareHouseList();
}
function filterWareHouseList() {
  return wareHouseList.value.filter((item) => {
    return (
      (!searchWarehouse.value ||
        item.warehouse.includes(searchWarehouse.value)) &&
      (!searchPlaceCode.value ||
        item.place_code.includes(searchPlaceCode.value)) &&
      (!searchPlaceDesc.value ||
        item.place_desc.includes(searchPlaceDesc.value)) &&
      (!searchAreaCode.value ||
        item.area_code.includes(searchAreaCode.value)) &&
      (!searchContainer.value ||
        item.container_id.includes(searchContainer.value)) &&
      (!searchDefaultSku.value ||
        item.default_sku.includes(searchDefaultSku.value)) &&
      (!searchOccupy.value || item.occupy_order.includes(searchOccupy.value)) &&
      (!searchPlaceType.value ||
        item.place_type.includes(searchPlaceType.value))
    );
  });
}
//页面加载时,获取数据
onMounted(() => {
  getWareHouseDate();
});
//搜索
function filter() {
  getWareHouseDate();
}
//重置搜素
function resetFilter() {
  searchWarehouse.value = "";
  searchPlaceCode.value = "";
  searchPlaceDesc.value = "";
  searchAreaCode.value = "";
  searchContainer.value = "";
  searchDefaultSku.value = "";
  searchFlag.value = "";
  searchIsEmpty.value = "";
  searchOccupy.value = "";
  searchPlaceType.value = "";
  searchDisable.value = "";
  getWareHouseDate();
}
//控制弹出框
let addDialog = ref<boolean>(false);
let editDialog = ref<boolean>(false);
let delDialog = ref<boolean>(false);
//库位对象
let stationInfo = ref<any>(null);

//将字符串里面的文字转成-,并且个位的数字前面补0
function convertFormat(
  warehouse: string,
  areaCode: string,
  numRow: string,
  numColumn: string,
  numLayer: string
): string {
  return `${warehouse}-${areaCode.padStart(2, "0")}-${numRow.padStart(
    2,
    "0"
  )}-${numColumn.padStart(2, "0")}-${numLayer.padStart(2, "0")}`;
}

//打开新增弹框
function showAddDialog() {
  stationInfo.value = {
    num_cloumn: "",
    num_layer: "",
    num_row: "",
    height: 0,
    width: 0,
    lenth: 0,
    occupy_order: "",
    default_sku: "",
    flag_has_task: "N",
    is_empty: "Y",
    container_id: "",
    area_code: "",
    place_desc: "",
    place_code: "",
    warehouse: "",
    max_weight: "",
    place_type: "",
    disable: "否",
    reserved01: "",
    org_tag: "",
    reserved03: "",
    reserved02: "",
  };

  addDialog.value = true;
}
//点击写入名称
function importName() {
  stationInfo.value.place_desc =
    stationInfo.value.warehouse +
    "仓" +
    stationInfo.value.area_code +
    "区" +
    stationInfo.value.num_row +
    "排" +
    stationInfo.value.num_cloumn +
    "列" +
    stationInfo.value.num_layer +
    "层";
}
//确认新增
async function addSation() {
  stationInfo.value.place_code = convertFormat(
    stationInfo.value.warehouse,
    stationInfo.value.area_code,
    stationInfo.value.num_row.toString(),
    stationInfo.value.num_cloumn.toString(),
    stationInfo.value.num_layer.toString()
  );
  wareHouseList.value.push(stationInfo.value);

  addDialog.value = false;
  getWareHouseDate();
  setSnackbar("blue", "新增成功");
}
//打开修改框
function showEditDialog(item: any) {
  stationInfo.value = { ...item };
  editDialog.value = true;
}
async function editSation() {
  const index = wareHouseList.value.findIndex(
    (item) => item.place_id === stationInfo.value.place_id
  );
  if (index !== -1) {
    wareHouseList.value[index] = { ...stationInfo.value };
  }
  setSnackbar("blue", "修改成功");
  editDialog.value = false;
  getWareHouseDate();
}
//打开删除弹框
function showDelDialog(item: any) {
  stationInfo.value = { ...item };
  delDialog.value = true;
}
//确认删除
async function delSation() {
  const index = wareHouseList.value.findIndex(
    (item) => item.place_id === stationInfo.value.place_id
  );
  if (index !== -1) {
    wareHouseList.value.splice(index, 1);
  }
  setSnackbar("blue", "删除成功");
  getWareHouseDate();
  delDialog.value = false;
}
</script>
<template>
  <v-row class="ma-2">
    <v-col cols="3">
      <v-text-field
        label="库位号"
        v-model="searchPlaceCode"
        variant="outlined"
        density="compact"
        hide-details
        class="mt-2"
      ></v-text-field>
    </v-col>
    <v-col cols="3">
      <v-text-field
        label="仓库名称"
        v-model="searchPlaceDesc"
        variant="outlined"
        density="compact"
        hide-details
        class="mt-2"
      ></v-text-field>
    </v-col>
    <v-col cols="3">
      <v-text-field
        label="占用单据号"
        v-model="searchOccupy"
        variant="outlined"
        density="compact"
        hide-details
        class="mt-2"
      ></v-text-field>
    </v-col>
    <v-col cols="3">
      <v-text-field
        label="库区号"
        v-model="searchAreaCode"
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
        label="默认物料"
        v-model="searchDefaultSku"
        variant="outlined"
        density="compact"
        hide-details
        class="mt-2"
      ></v-text-field>
    </v-col>
    <v-col cols="3">
      <v-select
        label="库位类型"
        v-model="searchPlaceType"
        :items="['平面库', '立体库', '临时库', '虚拟库']"
        variant="outlined"
        density="compact"
        hide-details
        class="mt-2"
      ></v-select>
    </v-col>
    <v-col cols="3">
      <v-select
        label="仓库号"
        v-model="searchWarehouse"
        variant="outlined"
        density="compact"
        :items="['A', 'B', 'C', 'D', 'E', 'F', 'Z']"
        hide-details
        class="mt-2"
      ></v-select>
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
        新增库位
      </v-btn>
    </v-col>
    <v-col>
      <v-data-table
        hover
        :items-per-page="10"
        :headers="headers"
        :items="wareHouseList"
        style="overflow-x: auto; white-space: nowrap"
        fixed-footer
        fixed-header
        height="610"
        no-data-text="没有找到符合的数据"
      >
        <template v-slot:item.action="{ item }">
          <!-- 库位详情 -->
          <!-- <v-icon color="blue" size="small" class="mr-5">
            fa-solid fa-mattress-pillow
          </v-icon> -->
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
    <!-- 新增库位 -->
    <v-dialog v-model="addDialog" min-width="400px" width="560px">
      <v-card>
        <v-toolbar color="blue">
          <v-toolbar-title> 新增库位 </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="addDialog = false">
            <v-icon>fa-solid fa-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text class="mt-4">
          <v-row>
            <v-col cols="12">
              <v-select
                label="仓库类型"
                v-model="stationInfo.place_type"
                :items="['平面库', '立体库', '临时库', '虚拟库']"
                clearable
                hide-details
              ></v-select>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="默认物料"
                v-model="stationInfo.default_sku"
                clearable
                hide-details
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-select
                label="仓库号"
                v-model="stationInfo.warehouse"
                :items="['A', 'B', 'C', 'D', 'E', 'F', 'Z']"
                hide-details
              ></v-select>
            </v-col>
            <v-col cols="6">
              <v-text-field
                label="库区号"
                v-model="stationInfo.area_code"
                hide-details
              ></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-select
                label="排"
                v-model="stationInfo.num_row"
                :items="[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]"
                hide-details
              ></v-select>
            </v-col>
            <v-col cols="4">
              <v-select
                label="列"
                v-model="stationInfo.num_cloumn"
                :items="[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]"
                hide-details
              ></v-select>
            </v-col>
            <v-col cols="4">
              <v-select
                label="层"
                v-model="stationInfo.num_layer"
                :items="[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]"
                hide-details
              ></v-select>
            </v-col>

            <v-col cols="4">
              <v-text-field
                label="长"
                v-model="stationInfo.lenth"
                clearable
                hide-details
              ></v-text-field
            ></v-col>
            <v-col cols="4"
              ><v-text-field
                label="宽"
                v-model="stationInfo.width"
                clearable
                hide-details
              ></v-text-field
            ></v-col>
            <v-col cols="4"
              ><v-text-field
                label="高"
                v-model="stationInfo.height"
                clearable
                hide-details
              ></v-text-field
            ></v-col>
            <v-col cols="12">
              <v-text-field
                label="库位名称"
                v-model="stationInfo.place_desc"
                clearable
                hide-details
                append-inner-icon="fa-solid fa-star"
                @click:append-inner="importName"
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
    <!-- 修改库位 -->
    <v-dialog v-model="editDialog" min-width="400px" width="560px">
      <v-card>
        <v-toolbar color="blue">
          <v-toolbar-title> 修改库位 </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="editDialog = false">
            <v-icon>fa-solid fa-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text class="mt-4">
          <v-row>
            <v-col cols="12">
              <v-select
                label="仓库类型"
                v-model="stationInfo.place_type"
                clearable
                hide-details
                :items="['平面库', '立体库', '临时库', '虚拟库']"
              ></v-select>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="默认物料"
                v-model="stationInfo.default_sku"
                clearable
                hide-details
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-select
                label="仓库号"
                v-model="stationInfo.warehouse"
                :items="['A', 'B', 'C', 'D', 'E', 'F', 'Z']"
                clearable
                hide-details
              ></v-select>
            </v-col>
            <v-col cols="6">
              <v-text-field
                label="库区号"
                v-model="stationInfo.area_code"
                clearable
                hide-details
              ></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-select
                label="排"
                v-model="stationInfo.num_row"
                :items="[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]"
                hide-details
              ></v-select>
            </v-col>
            <v-col cols="4">
              <v-select
                label="列"
                v-model="stationInfo.num_cloumn"
                :items="[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]"
                hide-details
              ></v-select>
            </v-col>
            <v-col cols="4">
              <v-select
                label="层"
                v-model="stationInfo.num_layer"
                :items="[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]"
                hide-details
              ></v-select>
            </v-col>

            <v-col cols="4">
              <v-text-field
                label="长"
                v-model="stationInfo.lenth"
                clearable
                hide-details
              ></v-text-field
            ></v-col>
            <v-col cols="4"
              ><v-text-field
                label="宽"
                v-model="stationInfo.width"
                clearable
                hide-details
              ></v-text-field
            ></v-col>
            <v-col cols="4">
              <v-text-field
                label="高"
                v-model="stationInfo.height"
                clearable
                hide-details
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="库位名称"
                v-model="stationInfo.place_desc"
                clearable
                hide-details
                append-inner-icon="fa-solid fa-star"
                @click:append-inner="importName"
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
    <!-- 删除库位 -->
    <v-dialog v-model="delDialog" min-width="400px" width="560px">
      <v-card>
        <v-toolbar color="blue">
          <v-toolbar-title> 删除库位 </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="delDialog = false">
            <v-icon>fa-solid fa-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text class="text-center">
          您确定要删除【{{ stationInfo.place_desc }}】这一库位吗?
        </v-card-text>
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
    <v-snackbar location="top" v-model="snackbarShow" :color="snackbarColor">
      {{ snackbarText }}
      <template v-slot:actions>
        <v-btn variant="tonal" @click="snackbarShow = false">关闭</v-btn>
      </template>
    </v-snackbar>
  </v-row>
</template>
