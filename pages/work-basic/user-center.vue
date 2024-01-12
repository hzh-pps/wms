<script setup lang="ts">
import { number } from "echarts";

//弹框
let dialogAdd = ref(false);
let dialogDelete = ref(false);
let editDialog = ref(false);
let assignDialog = ref(false);
//存储用户信息
let users = ref<any[]>([
  {
    cell_phone: "13800000001",
    user_name: "张三",
    work_no: "001",
    rolenames: "管理员",
    status: true,
  },
  {
    cell_phone: "13800000002",
    user_name: "李四",
    work_no: "002",
    rolenames: "运营",
    status: false,
  },
  {
    cell_phone: "13800000003",
    user_name: "王五",
    work_no: "003",
    rolenames: "开发者",
    status: true,
  },
  {
    cell_phone: "13800000004",
    user_name: "赵六",
    work_no: "004",
    rolenames: "测试",
    status: true,
  },
  {
    cell_phone: "13800000005",
    user_name: "孙七",
    work_no: "005",
    rolenames: "设计师",
    status: false,
  },
  {
    cell_phone: "13800000006",
    user_name: "周八",
    work_no: "006",
    rolenames: "产品经理",
    status: true,
  },
  {
    cell_phone: "13800000007",
    user_name: "吴九",
    work_no: "007",
    rolenames: "运维",
    status: true,
  },
  {
    cell_phone: "13800000008",
    user_name: "郑十",
    work_no: "008",
    rolenames: "HR",
    status: false,
  },
  {
    cell_phone: "13800000009",
    user_name: "钱十一",
    work_no: "009",
    rolenames: "市场",
    status: true,
  },
  {
    cell_phone: "13800000010",
    user_name: "周十二",
    work_no: "010",
    rolenames: "销售",
    status: false,
  },
]);
let headers = ref<any[]>([
  {
    title: "用户手机号",
    key: "cell_phone",
    align: "center",
    sortable: false,
    filterable: true,
  },
  {
    title: "用户名称",
    key: "user_name",
    align: "center",
    sortable: false,
    filterable: true,
  },
  {
    title: "工号",
    key: "work_no",
    align: "center",
    sortable: false,
    filterable: true,
  },
  {
    title: "角色",
    key: "rolenames",
    align: "center",
    sortable: false,
    filterable: true,
  },
  {
    title: "状态",
    key: "status",
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
let searchPhoneNum = ref<any>(null);
let searchName = ref<any>(null);

let userList = ref<any[]>([]);
//获取用户信息
function getUserData() {
  userList.value = filterUserList();
}

function filterUserList() {
  return users.value.filter((item) => {
    return (
      (!searchPhoneNum.value ||
        item.cell_phone.includes(searchPhoneNum.value)) &&
      (!searchName.value || item.user_name.includes(searchName.value))
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
  searchPhoneNum.value = "";
  searchName.value = "";
  getUserData();
}
//用户对象
let userInfo = ref<any>(null);
// //新增用户
// function addUser() {
//   userInfo.value = {
//     user_name: "",
//     password: "",
//     work_no: "",
//     cell_phone: "",
//     login_rp: "PC",
//     status: true,
//   };
//   dialogAdd.value = true;
// }
// //确认新增
// async function addCertain() {
//   const data: any = await useHttp(
//     "/User/A22AddUserRole",
//     "post",
//     userInfo.value
//   );
//   getUserData();
//   dialogAdd.value = false;
// }
//用户修改
function showUpdate(item: any) {
  userInfo.value = { ...item };
  editDialog.value = true;
}
//保存修改
async function editCertain() {
  const index = users.value.findIndex(
    (item) => item.cell_phone === userInfo.value.cell_phone
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
//禁用用户
async function disableUser(item: any) {
  console.log(item);
}
//已选的角色
let roles = ref<any[]>([]);
//存储数据库里面的所有角色数据
let roleList = ref<any[]>([
  {
    role_name: "管理员",
    role_text: "管理系统所有功能",
    status: true,
  },
  {
    role_name: "编辑",
    role_text: "负责内容的创建和编辑",
    status: true,
  },
  {
    role_name: "审核员",
    role_text: "审核内容是否符合发布标准",
    status: false,
  },
  {
    role_name: "游客",
    role_text: "可以浏览内容，无法进行编辑和评论",
    status: true,
  },
  {
    role_name: "运营",
    role_text: "负责网站内容和用户管理",
    status: true,
  },
  {
    role_name: "开发者",
    role_text: "负责系统的开发和维护",
    status: true,
  },
  {
    role_name: "测试员",
    role_text: "对系统功能进行测试",
    status: true,
  },
  {
    role_name: "市场",
    role_text: "负责市场推广和广告运营",
    status: true,
  },
  {
    role_name: "客服",
    role_text: "解答用户咨询，提供帮助",
    status: false,
  },
  {
    role_name: "VIP用户",
    role_text: "享有特殊权限的用户",
    status: true,
  },
]);

//分配角色
function showAssign(item: any) {
  userInfo.value = { ...item };
  assignDialog.value = true;
}

//保存分配
function saveAssign() {
  const index = users.value.findIndex(
    (item) => item.cell_phone === userInfo.value.cell_phone
  );

  if (index !== -1) {
    users.value[index].rolenames = roles.value.join(",");
  }
  console.log(roles.value);
  assignDialog.value = false;
}
</script>
<template>
  <v-row class="ma-2">
    <v-col cols="6">
      <v-text-field
        label="手机号"
        variant="outlined"
        density="compact"
        v-model="searchPhoneNum"
        hide-details
      ></v-text-field>
    </v-col>
    <v-col cols="6">
      <v-text-field
        label="用户名称"
        variant="outlined"
        density="compact"
        v-model="searchName"
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
      <!-- <v-btn color="blue-darken-2" class="mr-2" size="large" @click="addUser">
        新增用户
      </v-btn> -->
    </v-col>
    <v-col cols="12">
      <v-data-table :items="userList" :headers="headers" :items-per-page="10">
        <template v-slot:item.status="{ item }">
          <v-switch
            style="display: inline-block; max-width: 120px"
            v-model="item.raw.status"
            label="启用"
            color="blue"
            hide-details
            inset
            @click="disableUser(item.raw)"
          ></v-switch>
        </template>
        <template v-slot:item.action="{ item }">
          <!-- 角色分配 -->
          <v-icon
            color="blue"
            size="small"
            class="mr-5"
            @click="showAssign(item.raw)"
          >
            fa-solid fa-users-gear
          </v-icon>
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
    <!-- 增加用户 -->
    <!-- <v-dialog v-model="dialogAdd" min-width="400px" width="560px">
      <v-card>
        <v-toolbar color="blue">
          <v-toolbar-title> 新增用户信息 </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="dialogAdd = false">
            <v-icon>fa-solid fa-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text class="mt-4">
          <v-text-field
            label="用户名称"
            v-model="userInfo.user_name"
            clearable
          ></v-text-field>
          <v-text-field
            label="手机号"
            v-model="userInfo.cell_phone"
            clearable
          ></v-text-field>
          <v-text-field
            label="工号"
            v-model="userInfo.work_no"
            clearable
          ></v-text-field>
          <v-text-field
            label="密码"
            v-model="userInfo.password"
            clearable
          ></v-text-field>
          <v-text-field
            label="公司"
            v-model="userInfo.company_name"
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
    </v-dialog> -->
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
          <v-toolbar-title> 修改用户信息 </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="editDialog = false">
            <v-icon>fa-solid fa-close</v-icon>
          </v-btn>
        </v-toolbar>

        <v-card-text class="mt-4">
          <v-text-field
            label="用户名称"
            v-model="userInfo.user_name"
            clearable
          ></v-text-field>
          <v-text-field
            label="工号"
            v-model="userInfo.work_no"
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
    <!-- 给用户分配角色-->
    <v-dialog v-model="assignDialog" min-width="400px" width="560px">
      <v-card>
        <v-toolbar color="blue">
          <v-toolbar-title> 分配角色 </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="assignDialog = false">
            <v-icon>fa-solid fa-close</v-icon>
          </v-btn>
        </v-toolbar>

        <v-card-text class="mt-4">
          <v-select
            label="角色列表"
            v-model="roles"
            clearable
            chips
            :items="roleList"
            item-title="role_name"
            item-value="role_name"
            multiple
          ></v-select>
        </v-card-text>

        <div class="d-flex justify-end mr-6 mb-4">
          <v-btn
            color="blue-darken-2"
            size="large"
            class="mr-2"
            @click="saveAssign()"
          >
            保存分配
          </v-btn>
          <v-btn color="grey" size="large" @click="assignDialog = false">
            取消
          </v-btn>
        </div>
      </v-card>
    </v-dialog>
  </v-row>
</template>
