<script setup lang="ts">
// 搜索引擎优化
useSeoMeta({
  // 该页面的标题
  title: "客户信息",
  // 社交媒体分享该页面时显示的标题
  ogTitle: "客户信息",
  // 该页面的描述
  description: "同日 MES 系统，客户信息",
  // 社交媒体分享该页面时显示的描述
  ogDescription: "同日 MES 系统，客户信息",
  // 社交媒体分享该页面时显示的图片
  ogImage: "/同日图标.png",
});
import { number } from "echarts";

//弹框
let dialogAdd = ref(false);
let dialogDelete = ref(false);
let editDialog = ref(false);
let assignDialog = ref(false);
//存储用户信息
let users = ref<any[]>([
  {
    user_name: "客户1",
    city: "北京",
    rolenames: "朝阳区大望路1号",
    user: "张三",
  },
  {
    user_name: "客户2",
    city: "上海",
    rolenames: "浦东新区世纪大道2号",
    user: "李四",
  },
  {
    user_name: "客户3",
    city: "广州",
    rolenames: "天河区体育西路3号",
    user: "王五",
  },
  {
    user_name: "客户4",
    city: "深圳",
    rolenames: "南山区科技园4号",
    user: "赵六",
  },
  {
    user_name: "客户5",
    city: "成都",
    rolenames: "武侯区天府大道5号",
    user: "周七",
  },
  {
    user_name: "客户6",
    city: "杭州",
    rolenames: "西湖区湖滨路6号",
    user: "吴八",
  },
  {
    user_name: "客户7",
    city: "南京",
    rolenames: "玄武区中山路7号",
    user: "郑九",
  },
  {
    user_name: "客户8",
    city: "武汉",
    rolenames: "江汉区解放大道8号",
    user: "钱十",
  },
  {
    user_name: "客户9",
    city: "西安",
    rolenames: "碑林区南关正街9号",
    user: "孙十一",
  },
  {
    user_name: "客户10",
    city: "苏州",
    rolenames: "姑苏区人民路10号",
    user: "李十二",
  },
  {
    user_name: "客户11",
    city: "重庆",
    rolenames: "渝中区解放碑11号",
    user: "周十三",
  },
  {
    user_name: "客户12",
    city: "天津",
    rolenames: "和平区南京路12号",
    user: "吴十四",
  },
  {
    user_name: "客户13",
    city: "沈阳",
    rolenames: "沈河区北站路13号",
    user: "郑十五",
  },
  {
    user_name: "客户14",
    city: "大连",
    rolenames: "中山区人民路14号",
    user: "钱十六",
  },
  {
    user_name: "客户15",
    city: "青岛",
    rolenames: "市南区香港中路15号",
    user: "孙十七",
  },
  {
    user_name: "客户16",
    city: "济南",
    rolenames: "历下区经十路16号",
    user: "李十八",
  },
  {
    user_name: "客户17",
    city: "哈尔滨",
    rolenames: "道里区中央大街17号",
    user: "周十九",
  },
  {
    user_name: "客户18",
    city: "长春",
    rolenames: "朝阳区人民大街18号",
    user: "吴二十",
  },
  {
    user_name: "客户19",
    city: "合肥",
    rolenames: "庐阳区长江中路19号",
    user: "郑二十一",
  },
  {
    user_name: "客户20",
    city: "福州",
    rolenames: "鼓楼区五四路20号",
    user: "郑二十二",
  },
]);
let headers = ref<any[]>([
  {
    title: "客户名称",
    key: "user_name",
    align: "center",
    sortable: false,
    filterable: true,
  },
  {
    title: "所在城市",
    key: "city",
    align: "center",
    sortable: false,
    filterable: true,
  },
  {
    title: "详细地址",
    key: "rolenames",
    align: "center",
    sortable: false,
    filterable: true,
  },
  {
    title: "负责人",
    key: "user",
    align: "center",
    sortable: false,
    filterable: true,
  },
  {
    title: "操作",
    key: "action",
    align: "center",
    sortable: false,
    filterable: true,
  },
]);
let searchName = ref<any>(null);
let searchAdd = ref<any>(null);

let userList = ref<any[]>([]);
//获取客户信息
function getUserData() {
  userList.value = [...users.value];
  userList.value = filterUserList();
}
function filterUserList() {
  return userList.value.filter((item) => {
    return (
      (!searchName.value || item.user_name.includes(searchName.value)) &&
      (!searchAdd.value || item.rolenames.includes(searchAdd.value))
    );
  });
}
onMounted(() => {
  getUserData();
});
//查询用户
function filter() {
  getUserData();
}
//重置查询
function resetFilter() {
  searchName.value = "";
  searchAdd.value = "";
  getUserData();
}
//用户对象
let userInfo = ref<any>(null);
//新增用户
function addUser() {
  userInfo.value = {
    user_name: "",
    city: "",
    rolenames: "",
    user: "",
  };
  dialogAdd.value = true;
}
//确认新增
async function addCertain() {
  users.value.push(userInfo.value);
  getUserData();
  dialogAdd.value = false;
}
//用户修改
function showUpdate(item: any) {
  userInfo.value = { ...item };
  editDialog.value = true;
}
//保存修改
async function editCertain() {
  const index = users.value.findIndex(
    (item) => item.user_name === userInfo.value.user_name
  );
  if (index !== -1) {
    users.value[index] = { ...userInfo.value };
  }
  getUserData();
  editDialog.value = false;
}
//用户删除
function showDelete(item: any) {
  userInfo.value = { ...item };
  dialogDelete.value = true;
}
//确认删除
async function deleteCertain() {
  const index = users.value.findIndex(
    (item) => item.user_name === userInfo.value.user_name
  );
  if (index !== -1) {
    users.value.splice(index, 1);
  }
  getUserData();
  dialogDelete.value = false;
}
</script>
<template>
  <v-row class="ma-2">
    <v-col cols="6">
      <v-text-field
        label="客户名称"
        variant="outlined"
        density="compact"
        v-model="searchName"
        hide-details
      ></v-text-field>
    </v-col>
    <v-col cols="6">
      <v-text-field
        label="详细地址"
        variant="outlined"
        density="compact"
        v-model="searchAdd"
        hide-details
      ></v-text-field>
    </v-col>
    <v-col cols="12">
      <v-btn color="blue-darken-2" class="mr-2" size="large" @click="filter">
        查询
      </v-btn>
      <v-btn color="red" class="mr-2" size="large" @click="resetFilter">
        重置
      </v-btn>
      <v-btn color="blue-darken-2" class="mr-2" size="large" @click="addUser">
        新增用户
      </v-btn>
    </v-col>
    <v-col cols="12">
      <v-data-table :items="userList" :headers="headers" :items-per-page="10">
        <template v-slot:item.action="{ item }">
          <!-- 用户修改 -->
          <v-icon
            color="blue"
            size="small"
            class="mr-3"
            @click="showUpdate(item.raw)"
          >
            fa-solid fa-pen
          </v-icon>
          <!-- 用户删除 -->
          <v-icon color="red" size="small" @click="showDelete(item.raw)">
            fa-solid fa-trash
          </v-icon>
        </template>
      </v-data-table>
    </v-col>
    <!-- 增加客户 -->
    <v-dialog v-model="dialogAdd" min-width="400px" width="560px">
      <v-card>
        <v-toolbar color="blue">
          <v-toolbar-title> 增加客户 </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="dialogAdd = false">
            <v-icon>fa-solid fa-close</v-icon>
          </v-btn>
        </v-toolbar>

        <v-card-text class="mt-4">
          <v-text-field
            label="客户名称"
            v-model="userInfo.user_name"
            clearable
          ></v-text-field>
          <v-text-field
            label="所在城市"
            v-model="userInfo.city"
            clearable
          ></v-text-field>
          <v-text-field
            label="详细地址"
            v-model="userInfo.rolenames"
            clearable
          ></v-text-field>
          <v-text-field
            label="负责人"
            v-model="userInfo.user"
            clearable
          ></v-text-field>
        </v-card-text>
        <div class="d-flex justify-end mr-6 mb-4">
          <v-btn
            color="blue-darken-2"
            size="large"
            class="mr-2"
            @click="addCertain()"
          >
            确认
          </v-btn>
          <v-btn color="grey" size="large" @click="dialogAdd = false">
            取消
          </v-btn>
        </div>
      </v-card>
    </v-dialog>
    <!-- 删除用户-->
    <v-dialog v-model="dialogDelete" min-width="400px" width="500px">
      <v-card>
        <v-toolbar color="blue">
          <v-toolbar-title> 删除用户信息 </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="dialogDelete = false">
            <v-icon>fa-solid fa-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text>确定删除这条用户信息吗?</v-card-text>
        <div class="d-flex justify-end mr-6 mb-4 mt-3">
          <v-btn
            color="blue-darken-2"
            size="large"
            class="mr-2"
            @click="deleteCertain()"
          >
            确认
          </v-btn>
          <v-btn color="grey" size="large" @click="dialogDelete = false">
            取消
          </v-btn>
        </div>
      </v-card>
    </v-dialog>
    <!-- 修改用户-->
    <v-dialog v-model="editDialog" min-width="400px" width="560px">
      <v-card>
        <v-toolbar color="blue">
          <v-toolbar-title> 修改客户信息 </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="editDialog = false">
            <v-icon>fa-solid fa-close</v-icon>
          </v-btn>
        </v-toolbar>

        <v-card-text class="mt-4">
          <v-text-field
            label="客户名称"
            v-model="userInfo.user_name"
            clearable
          ></v-text-field>
          <v-text-field
            label="所在城市"
            v-model="userInfo.city"
            clearable
          ></v-text-field>
          <v-text-field
            label="详细地址"
            v-model="userInfo.rolenames"
            clearable
          ></v-text-field>
          <v-text-field
            label="负责人"
            v-model="userInfo.user"
            clearable
          ></v-text-field>
        </v-card-text>

        <div class="d-flex justify-end mr-6 mb-4">
          <v-btn
            color="blue-darken-2"
            size="large"
            class="mr-2"
            @click="editCertain()"
          >
            确认修改
          </v-btn>
          <v-btn color="grey" size="large" @click="editDialog = false">
            取消
          </v-btn>
        </div>
      </v-card>
    </v-dialog>
  </v-row>
</template>
