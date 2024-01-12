<script setup lang="ts">
import Config from "chart.js/dist/core/core.config";
// 获取消息条对象
const { snackbarShow, snackbarColor, snackbarText, setSnackbar } =
  useSnackbar();
// 搜索引擎优化
useSeoMeta({
  // 该页面的标题
  title: "商品管理",
  // 社交媒体分享该页面时显示的标题
  ogTitle: "商品管理",
  // 该页面的描述
  description: "同日 MES 系统，商品管理",
  // 社交媒体分享该页面时显示的描述
  ogDescription: "同日 MES 系统，商品管理",
  // 社交媒体分享该页面时显示的图片
  ogImage: "/同日图标.png",
});

let searchMerchandiseCode = ref<any>(null);
let searchMerchandiseName = ref<any>(null);
let searchMerchandiseTypeId = ref<any>(null);
let searchSupplierName = ref<any>(null);
let addMerchandiseName = ref<any>(null);
let addMerchandiseColor = ref<any>(null);
let addMerchandiseWeight = ref<any>(null);
let addMerchandiseDescription = ref<any>(null);
let addMerchandiseHeight = ref<any>(null);
let addMerchandiseLength = ref<any>(null);
let addMerchandiseBrand = ref<any>(null);
let addMerchandiseWidth = ref<any>(null);
let addMerchandiseCost = ref<any>(null);
let addMerchandisePrice = ref<any>(null);
let addType = ref<any>(null);
let delType = ref<any>(null);
let formMerchandiseName = ref<any>(null);
let addMerchandiseTypeName = ref<any>(null);
let addDialog = ref<boolean>(false);
let editDialog = ref<boolean>(false);
let deleteDialog = ref<boolean>(false);
let addMerchandiseTypeDialog = ref<boolean>(false);
let editMerchandiseTypeDialog = ref<boolean>(false);
let deleteMerchandiseTypeDialog = ref<boolean>(false);
let selectedBigType = ref<any>(null);
let selectedMiddleType = ref<any>(null);
let selectedSmallType = ref<any>(null);
let addMerchandiseForm = ref<any>(null);
let text = ref<any>(null);
let textfield = ref<any[]>([
  { label: "商品名称", model: addMerchandiseName },
  {
    label: "商品描述",
    model: addMerchandiseDescription,
  },
  {
    label: "商品品牌",
    model: addMerchandiseBrand,
  },
  {
    label: "商品重量",
    model: addMerchandiseWeight,
  },
  {
    label: "商品宽度",
    model: addMerchandiseLength,
  },
  {
    label: "商品高度",
    model: addMerchandiseHeight,
  },
  {
    label: "商品宽度",
    model: addMerchandiseWidth,
  },
  {
    label: "商品成本",
    model: addMerchandiseCost,
  },
  {
    label: "商品价格",
    model: addMerchandisePrice,
  },
  {
    label: "商品颜色",
    model: addMerchandiseColor,
  },
]);
// 商品大类列表
let productBigCategoryList = ref<any[]>([]);
// 商品中类列表
let productMiddleCategoryList = ref<any[]>([]);
// 商品小类列表
let productSmallCategoryList = ref<any[]>([]);
let supplierList = ref<any[]>([]);
function GetPidDate(item: any) {
  // 使用 Strapi 的过滤语法构建查询参数
  const queryParams = new URLSearchParams({
    "filters[pid][$containsi]": item,
  }).toString();
  return queryParams;
}
// 获取商品大类列表
async function getBigTypeData() {
  // 将查询参数附加到 URL
  const data: any = await useHttp(`/commoditytypes?${GetPidDate("0")}`, "get");
  productBigCategoryList.value = data.data;
}
// 获取商品中类列表
async function getMiddleTypeData(item: any) {
  // 将查询参数附加到 URL
  const data: any = await useHttp(
    `/commoditytypes?${GetPidDate(item.id)}`,
    "get"
  );
  productMiddleCategoryList.value = data.data;
}
// 获取商品小类列表
async function getSmallTypeData(item: any) {
  // 将查询参数附加到 URL
  const data: any = await useHttp(
    `/commoditytypes?${GetPidDate(item.id)}`,
    "get"
  );
  productSmallCategoryList.value = data.data;
}
//商品数据表头
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
let merchandiseList = ref<any[]>([
  {
    commoditycode: "A001",
    commodityname: "电脑桌",
    typeid: "101",
    commodity_description: "适用于办公室的电脑桌",
    suppliername: "办公家具供应商A",
    brand: "办公专家",
    weight: "20kg",
    length: "120cm",
    width: "60cm",
    height: "75cm",
    volume: "0.54m³",
    cost: "200元",
    price: "500元",
    color: "黑色",
  },
  {
    commoditycode: "A002",
    commodityname: "办公椅",
    typeid: "102",
    commodity_description: "人体工学设计的办公椅",
    suppliername: "办公家具供应商B",
    brand: "舒适坐",
    weight: "15kg",
    length: "65cm",
    width: "65cm",
    height: "130cm",
    volume: "0.55m³",
    cost: "150元",
    price: "400元",
    color: "灰色",
  },
  {
    commoditycode: "A003",
    commodityname: "文件柜",
    typeid: "103",
    commodity_description: "大容量文件柜，适合存储大量文件",
    suppliername: "办公家具供应商C",
    brand: "文件守护者",
    weight: "35kg",
    length: "80cm",
    width: "40cm",
    height: "200cm",
    volume: "0.64m³",
    cost: "300元",
    price: "800元",
    color: "白色",
  },
  {
    commoditycode: "A004",
    commodityname: "会议桌",
    typeid: "104",
    commodity_description: "圆形会议桌，可容纳8人",
    suppliername: "办公家具供应商D",
    brand: "会议达人",
    weight: "50kg",
    length: "240cm",
    width: "240cm",
    height: "75cm",
    volume: "4.32m³",
    cost: "500元",
    price: "1500元",
    color: "棕色",
  },
  {
    commoditycode: "A005",
    commodityname: "书架",
    typeid: "105",
    commodity_description: "多层书架，适合图书分类存放",
    suppliername: "办公家具供应商E",
    brand: "知识家",
    weight: "25kg",
    length: "90cm",
    width: "30cm",
    height: "180cm",
    volume: "0.486m³",
    cost: "220元",
    price: "550元",
    color: "原木色",
  },
]);
//新增商品按钮
function showAddDialog() {
  addDialog.value = true;
  selectedBigType.value = null;
  selectedMiddleType.value = null;
  selectedSmallType.value = null;
  productMiddleCategoryList.value = [];
  productSmallCategoryList.value = [];
  getBigTypeData();
}
function showEditDialog(item: any) {}
function showDelDialog(item: any) {}
//添加商品
// async function addMerchandise() {
//   if (!addMerchandiseForm.value) return;
//   addDialog.value = false;
//   let productInfo = {
//     commoditycode: null,
//     commodityname: addMerchandiseName,
//     //商品类别id
//     typeid: null,
//     commodity_description: addMerchandiseDescription,
//     suppliername: searchSupplierName,
//     brand: addMerchandiseBrand,
//     weight: addMerchandiseWeight,
//     length: addMerchandiseLength,
//     width: addMerchandiseWidth,
//     height: addMerchandiseHeight,
//     volume: addMerchandiseLength * addMerchandiseWidth * addMerchandiseHeight,
//     cost: addMerchandiseCost,
//     price: addMerchandisePrice,
//     color: addMerchandiseColor,
//   };
//   const data: any = await useHttp("/commodityinfos", "post", {
//     data: productInfo,
//   });
// }
function addMerchandise() {
  setSnackbar("black", "待开发");
  addDialog.value = false;
}
//删除商品类别
async function delSation() {
  await useHttp(`/commoditytypes/${delType.value.id}`, "delete");
  deleteMerchandiseTypeDialog.value = false;
  setSnackbar("red", "删除成功");
  if (delType.value.pid == "0") {
    getBigTypeData();
  } else {
    getMiddleTypeData(selectedBigType.value);
    getSmallTypeData(selectedMiddleType.value);
  }
}
//添加商品类别
async function addSation() {
  if (!formMerchandiseName.value) return;
  addMerchandiseTypeDialog.value = false;
  let productInfo = ref<any>(null);
  let data = ref<any>(null);
  switch (addType.value) {
    case "big":
      productInfo = {
        categoryname: addMerchandiseTypeName.value,
        pid: "0",
      };
      data = await useHttp("/commoditytypes", "post", {
        data: productInfo,
      });
      getBigTypeData();
      setSnackbar("green", "添加成功");
      break;
    case "middle":
      productInfo = {
        categoryname: addMerchandiseTypeName.value,
        pid: selectedBigType.value.id,
      };
      data = await useHttp("/commoditytypes", "post", {
        data: productInfo,
      });
      getMiddleTypeData(selectedBigType.value);
      setSnackbar("green", "添加成功");
      break;
    case "small":
      productInfo = {
        categoryname: addMerchandiseTypeName.value,
        pid: selectedMiddleType.value.id,
      };
      data = await useHttp("/commoditytypes", "post", {
        data: productInfo,
      });
      getSmallTypeData(selectedMiddleType.value);
      setSnackbar("green", "添加成功");
      break;
  }
}
//获取商品信息
async function getMerchandiseDate() {
  // 使用 Strapi 的过滤语法构建查询参数
  const queryParams = new URLSearchParams({
    "filters[commoditycode][$containsi]": searchMerchandiseCode.value,
    "filters[commodityname][$containsi]": searchMerchandiseName.value,
    "filters[typeid][$containsi]": searchMerchandiseTypeId.value,
    "filters[suppliername][$containsi]": searchSupplierName.value,
  }).toString();

  // 将查询参数附加到 URL
  const data: any = await useHttp(`/commoditytypes?${queryParams}`, "get");
  merchandiseList.value = normalizeStrapiData(data);
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
  searchMerchandiseCode.value = "";
  searchMerchandiseName.value = "";
  searchMerchandiseTypeId.value = "";
  searchSupplierName.value = "";
  getMerchandiseDate();
}
// 不为空
const isNullRule = ref<any[]>([(v: any) => !!v || "该字段不能为空"]);
</script>
<template>
  <v-row class="ma-2">
    <v-col cols="3">
       <v-text-field
        label="商品编码"
        v-model="searchMerchandiseCode"
        variant="outlined"
        density="compact"
        hide-details
      ></v-text-field>
    </v-col>
    <v-col cols="3">
       <v-text-field
        label="商品名称"
        v-model="searchMerchandiseName"
        variant="outlined"
        density="compact"
        hide-details
      ></v-text-field>
    </v-col>
    <v-col cols="3">
       <v-text-field
        label="商品类别id"
        v-model="searchMerchandiseTypeId"
        variant="outlined"
        density="compact"
        hide-details
      ></v-text-field>
    </v-col>
    <v-col cols="3">
       <v-text-field
        label="供应商名称"
        v-model="searchSupplierName"
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
        @click="getMerchandiseDate()"
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
        新增商品
      </v-btn>
    </v-col>
    <v-col cols="12">
      <v-data-table
        hover
        :items-per-page="10"
        :headers="headers"
        :items="merchandiseList"
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
  <!--新增商品 -->
  <v-dialog v-model="addDialog" width="95vw" heighth="50vh">
    <v-card>
      <v-toolbar color="blue">
        <v-toolbar-title> 新增商品 </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="addDialog = false">
          <v-icon>fa-solid fa-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text>
        <v-row>
          <v-col cols="3">
            <v-form v-model="addMerchandiseForm">
              <div v-for="item in textfield">
                <v-text-field
                  :label="item.label"
                  :v-model="item.model"
                  variant="outlined"
                  density="compact"
                  hide-details
                  class="mt-2"
                  :rules="isNullRule"
                >
                </v-text-field>
              </div>
              <v-select
                label="供应商"
                variant="outlined"
                hide-details
                class="mt-2"
                density="compact"
                :items="supplierList"
              >
              </v-select>
            </v-form>
          </v-col>
          <v-col cols="3">
            <div
              style="color: grey"
              class="text-center text-h5 font-weight-medium grey mb-2"
            >
              【一】选择大类
            </div>
            <v-card
              variant="elevated"
              height="530px"
              rounded="xl"
              elevation="3"
              theme="light"
            >
              <v-card-text>
                <v-list
                  lines="one"
                  class="overflow-auto"
                  height="480px"
                  rounded="xl"
                >
                  <v-list-item
                    v-for="(item, index) in productBigCategoryList"
                    :key="index"
                    :value="item"
                    @click="
                      getMiddleTypeData(item),
                        (selectedBigType = item),
                        (selectedMiddleType = null),
                        (productSmallCategoryList = [])
                    "
                    rounded="xl"
                    color="blue-lighten-2"
                  >
                    <v-list-item-content>
                      <v-list-item-title class="text-h6 font-weight-regular">
                        {{ item.categoryname }}
                      </v-list-item-title>
                    </v-list-item-content>
                    <template v-slot:append>
                      <v-icon
                        @click.stop="
                          (deleteMerchandiseTypeDialog = true), (delType = item)
                        "
                        color="red"
                        size="large"
                      >
                        fa-solid fa-trash
                      </v-icon>
                    </template>
                  </v-list-item>
                </v-list>
              </v-card-text>
              <v-card-action>
                <v-btn
                  prepend-icon="fa-solid fa-plus"
                  color="blue"
                  block
                  size="x-large"
                  height="3rem"
                  style="position: absolute; bottom: 0"
                  rounded="xl"
                  @click="
                    (addMerchandiseTypeDialog = true),
                      (addType = 'big'),
                      (addMerchandiseTypeName = null)
                  "
                >
                  新增大类
                </v-btn>
              </v-card-action>
            </v-card>
          </v-col>
          <v-col cols="3">
            <div
              style="color: grey"
              class="text-center text-h5 font-weight-medium grey mb-2"
            >
              【二】选择中类
            </div>
            <v-card
              variant="elevated"
              height="530px"
              rounded="xl"
              elevation="3"
              theme="light"
            >
              <v-card-text>
                <v-list
                  lines="one"
                  class="overflow-auto"
                  height="480px"
                  rounded="xl"
                >
                  <v-list-item
                    v-for="(item, index) in productMiddleCategoryList"
                    :key="index"
                    :value="item"
                    color="blue-lighten-2"
                    @click="getSmallTypeData(item), (selectedMiddleType = item)"
                    rounded="xl"
                  >
                    <v-list-item-content>
                      <v-list-item-title class="text-h6 font-weight-regular">
                        {{ item.categoryname }}
                      </v-list-item-title>
                    </v-list-item-content>
                    <template v-slot:append>
                      <v-icon
                        @click.stop="
                          (deleteMerchandiseTypeDialog = true), (delType = item)
                        "
                        color="red"
                        size="large"
                      >
                        fa-solid fa-trash
                      </v-icon>
                    </template>
                  </v-list-item>
                </v-list>
              </v-card-text>
              <v-card-action>
                <v-btn
                  v-show="selectedBigType !== null"
                  prepend-icon="fa-solid fa-plus"
                  color="blue"
                  block
                  size="x-large"
                  height="3rem"
                  style="position: absolute; bottom: 0"
                  rounded="xl"
                  @click="
                    (addMerchandiseTypeDialog = true),
                      (addType = 'middle'),
                      (addMerchandiseTypeName = null)
                  "
                >
                  新增中类
                </v-btn>
              </v-card-action>
            </v-card>
          </v-col>
          <v-col cols="3">
            <div
              style="color: grey"
              class="text-center text-h5 font-weight-medium mb-2"
            >
              【三】选择小类
            </div>
            <v-card
              variant="elevated"
              height="530px"
              rounded="xl"
              elevation="3"
              theme="light"
            >
              <v-card-text>
                <v-list
                  lines="one"
                  class="overflow-auto"
                  height="480px"
                  rounded="xl"
                >
                  <v-list-item
                    v-for="(item, index) in productSmallCategoryList"
                    :key="index"
                    :value="item"
                    color="blue-lighten-2"
                    rounded="xl"
                    @click="selectedSmallType = item"
                  >
                    <v-list-item-content>
                      <v-list-item-title class="text-h6 font-weight-regular">
                        {{ item.categoryname }}
                      </v-list-item-title>
                    </v-list-item-content>
                    <template v-slot:append>
                      <v-icon
                        @click.stop="
                          (deleteMerchandiseTypeDialog = true), (delType = item)
                        "
                        color="red"
                        size="large"
                      >
                        fa-solid fa-trash
                      </v-icon>
                    </template>
                  </v-list-item>
                </v-list>
              </v-card-text>
              <v-card-action>
                <v-btn
                  v-show="selectedMiddleType !== null"
                  prepend-icon="fa-solid fa-plus"
                  color="blue"
                  block
                  size="x-large"
                  height="3rem"
                  style="position: absolute; bottom: 0"
                  rounded="xl"
                  @click="
                    (addMerchandiseTypeDialog = true),
                      (addType = 'small'),
                      (addMerchandiseTypeName = null)
                  "
                >
                  新增小类
                </v-btn>
              </v-card-action>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
      <div class="d-flex justify-end mr-6 mb-4">
        <v-btn
          color="blue-darken-2"
          size="large"
          class="mr-2"
          @click="addMerchandise()"
        >
          确认
        </v-btn>
        <v-btn color="grey" size="large" @click="addDialog = false">
          取消
        </v-btn>
      </div>
    </v-card>
  </v-dialog>
  <!-- 新增类别 -->
  <v-dialog v-model="addMerchandiseTypeDialog" min-width="400px" width="560px">
    <v-card>
      <v-toolbar color="blue">
        <v-toolbar-title> 新增商品类别 </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="addMerchandiseTypeDialog = false">
          <v-icon>fa-solid fa-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text class="mt-4">
        <v-row>
          <v-col cols="12">
            <v-form v-model="formMerchandiseName">
              <v-text-field
                v-model="addMerchandiseTypeName"
                variant="outlined"
                density="default"
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
          @click="addMerchandiseTypeDialog = false"
        >
          取消
        </v-btn>
      </div>
    </v-card>
  </v-dialog>
  <!-- 删除类别 -->
  <v-dialog
    v-model="deleteMerchandiseTypeDialog"
    min-width="400px"
    width="560px"
  >
    <v-card>
      <v-toolbar color="blue">
        <v-toolbar-title> 删除类别 </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="deleteMerchandiseTypeDialog = false">
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
        <v-btn
          color="grey"
          size="large"
          @click="deleteMerchandiseTypeDialog = false"
        >
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
</template>
<style></style>
