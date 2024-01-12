<script setup lang="ts">
import Vtree, { VTreeNode, VTreeSearch, VTreeDrop } from "@wsfe/vue-tree";
import "@wsfe/vue-tree/style.css";
//弹框
let dialogAdd = ref(false);
let dialogDelete = ref(false);
let editDialog = ref(false);
let permissionDialog = ref(false);
//存储用户信息
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
let headers = ref<any[]>([
  {
    title: "角色名称",
    key: "role_name",
    align: "center",
    sortable: false,
    filterable: true,
  },
  {
    title: "角色描述",
    key: "role_text",
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

let roleList2 = ref<any[]>([]);

async function getRoleData() {
  roleList2.value = { ...roleList.value };
}
onMounted(() => {
  getRoleData();
});

//用户对象
let roleInfo = ref<any>(null);
//新增角色
function addUser() {
  roleInfo.value = {
    role_name: "",
    role_text: "",
    status: true,
  };
  dialogAdd.value = true;
}
//确认新增
async function addCertain() {
  roleList.value.push(roleInfo.value);
  getRoleData();
  dialogAdd.value = false;
}
//角色修改
function showUpdate(item: any) {
  roleInfo.value = { ...item };
  editDialog.value = true;
}
//保存修改
async function editCertain() {
  const index = roleList.value.findIndex(
    (item) => item.role_id === roleInfo.value.role_id
  );
  if (index !== -1) {
    roleList.value[index] = roleInfo.value;
  }
  getRoleData();
  editDialog.value = false;
}
//角色删除
function showDelete(item: any) {
  roleInfo.value = { ...item };
  dialogDelete.value = true;
}
//确认删除
async function deleteCertain() {
  const index = roleList.value.findIndex(
    (item) => item.role_id === roleInfo.value.role_id
  );
  if (index !== -1) {
    roleList.value.splice(index, 1);
  }
  getRoleData();
  dialogDelete.value = false;
}
//禁用角色
async function disableUser(item: any) {
  console.log(item);
}

//存储当前角色的权限
let rolePerm = ref<any[]>([]);
let select = ref<any[]>([]);
//存储全部页面的权限
let allPerm = ref<any[]>([
  {
    id: 0,
    name: "基础数据",
    parentId: 0,
    path: "/work-basic",
    order: 1,
    icon: "fa-solid fa-gear",
    level: 5,
    children: [
      {
        id: 1,
        name: "权限管理",
        parentId: 2,
        path: "/work-basic/permission-design",
        order: 1,
        icon: "fa-solid fa-gears",
        level: 0,
        children: [],
      },
      {
        id: 5,
        name: "客户信息",
        parentId: 2,
        path: "/work-basic/customer-information",
        order: 1,
        icon: "fa-solid fa-user-tie",
        level: 0,
        children: [],
      },
      {
        id: 6,
        name: "商品管理",
        parentId: 2,
        path: "/work-basic/merchandise-management",
        order: 1,
        icon: "fa-solid fa-cart-shopping",
        level: 0,
        children: [],
      },
      {
        id: 7,
        name: "供应商信息",
        parentId: 2,
        path: "/work-basic/supplier-information",
        order: 1,
        icon: "fa-solid fa-user-shield",
        level: 0,
        children: [],
      },
      {
        id: 10,
        name: "库存管理",
        parentId: 2,
        path: "/work-basic/inventory-management",
        order: 1,
        icon: "fa-solid fa-warehouse",
        level: 0,
        children: [],
      },
      {
        id: 11,
        name: "库位管理",
        parentId: 2,
        path: "/work-basic/base-location",
        order: 1,
        icon: "fa-solid fa-boxes-stacked",
        level: 0,
        children: [],
      },
      {
        id: 14,
        name: "角色管理",
        parentId: 2,
        path: "/work-basic/role-center",
        order: 1,
        icon: "fa-solid fa-user-shield",
        level: 0,
        children: [],
      },
      {
        id: 15,
        name: "用户管理",
        parentId: 2,
        path: "/work-basic/user-center",
        order: 1,
        icon: "fa-solid fa-user",
        level: 0,
        children: [],
      },
    ],
  },

  {
    id: 2,
    name: "入库管理",
    parentId: 0,
    path: "/in-bound",
    order: 1,
    icon: "fa-solid fa-person-shelter",
    level: 1,
    children: [
      {
        id: 8,
        name: "入库流程",
        parentId: 4,
        path: "/in-bound/in-bound",
        order: 1,
        icon: "fa-solid fa-right-to-bracket",
        level: 0,
        children: [],
      },
    ],
  },
  {
    id: 3,
    name: "出库管理",
    parentId: 0,
    path: "/out-bound",
    order: 1,
    icon: "fa-solid fa-person-hiking",
    level: 2,
    children: [
      {
        id: 9,
        name: "出库流程",
        parentId: 3,
        path: "/out-bound/out-bound",
        order: 1,
        icon: "fa-solid fa-right-from-bracket",
        level: 0,
        children: [],
      },
    ],
  },
  {
    id: 4,
    name: "库内操作",
    parentId: 0,
    path: "/warehouse-management",
    order: 1,
    icon: "fa-solid fa-house-laptop",
    level: 3,
    children: [
      {
        id: 16,
        name: "库存移动",
        parentId: 6,
        path: "/warehouse-management/move-within",
        order: 1,
        icon: "fa-solid fa-angles-right",
        level: 0,
        children: [],
      },
      {
        id: 17,
        name: "库存盘点",
        parentId: 6,
        path: "/warehouse-management/inventory-counts",
        order: 1,
        icon: "fa-solid fa-scale-unbalanced",
        level: 0,
        children: [],
      },
      {
        id: 18,
        name: "库存冻结",
        parentId: 6,
        path: "/warehouse-management/Inventory-freeze",
        order: 1,
        icon: "fa-solid fa-snowflake",
        level: 0,
        children: [],
      },
    ],
  },
  {
    id: 12,
    name: "库存流水",
    parentId: 0,
    path: "/inventory-journal",
    order: 1,
    icon: "fa-solid fa-cart-flatbed",
    level: 4,
    children: [
      {
        id: 13,
        name: "库存流水",
        parentId: 15,
        path: "/inventory-journal/inventory-journal",
        order: 1,
        icon: "fa-solid fa-cart-flatbed",
        level: 0,
        children: [],
      },
    ],
  },
]);

//分配权限
function showPermissions(item: any) {
  permissionDialog.value = true;
}

//保存修改
function premCertain() {
  permissionDialog.value = false;
}
</script>

<template>
  <v-row class="ma-2">
    <v-col cols="12">
      <v-btn color="blue-darken-2" class="mr-2" size="large" @click="addUser">
        新增角色
      </v-btn>
    </v-col>
    <v-col cols="12">
      <v-data-table :items="roleList" :headers="headers" :items-per-page="10">
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
          <!-- 权限分配 -->
          <v-icon
            color="blue"
            size="small"
            class="mr-5"
            @click="showPermissions(item.raw)"
          >
            fa-solid fa-gears
          </v-icon>
          <!-- 角色修改 -->
          <v-icon
            color="blue"
            size="small"
            class="mr-3"
            @click="showUpdate(item.raw)"
          >
            fa-solid fa-pen
          </v-icon>
          <!-- 角色删除 -->
          <v-icon color="red" size="small" @click="showDelete(item.raw)">
            fa-solid fa-trash
          </v-icon>
        </template>
      </v-data-table>
    </v-col>
    <!-- 增加角色 -->
    <v-dialog v-model="dialogAdd" min-width="400px" width="560px">
      <v-card>
        <v-toolbar color="blue">
          <v-toolbar-title> 新增角色信息 </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="dialogAdd = false">
            <v-icon>fa-solid fa-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text class="mt-4">
          <v-text-field
            label="角色名称"
            v-model="roleInfo.role_name"
            clearable
          ></v-text-field>
          <v-text-field
            label="角色描述"
            v-model="roleInfo.role_text"
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
    <!-- 删除角色-->
    <v-dialog v-model="dialogDelete" min-width="400px" width="500px">
      <v-card>
        <v-toolbar color="blue">
          <v-toolbar-title> 删除角色信息 </v-toolbar-title>
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
    <!-- 修改角色-->
    <v-dialog v-model="editDialog" min-width="400px" width="560px">
      <v-card>
        <v-toolbar color="blue">
          <v-toolbar-title> 修改角色信息 </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="editDialog = false">
            <v-icon>fa-solid fa-close</v-icon>
          </v-btn>
        </v-toolbar>

        <v-card-text class="mt-4">
          <v-text-field
            label="角色名称"
            v-model="roleInfo.role_name"
            clearable
          ></v-text-field>
          <v-text-field
            label="角色描述"
            v-model="roleInfo.role_text"
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
    <!-- 修改权限-->
    <v-dialog v-model="permissionDialog" min-width="400px" width="560px">
      <v-card>
        <v-toolbar color="blue">
          <v-toolbar-title> 修改角色权限 </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="permissionDialog = false">
            <v-icon>fa-solid fa-close</v-icon>
          </v-btn>
        </v-toolbar>

        <v-card-text style="height: 500px" class="mt-4 overflow-y-auto">
          <Vtree
            :data="allPerm"
            checkable
            v-model="select"
            titleField="name"
            keyField="permission_id"
            :cascade="false"
          />
        </v-card-text>

        <div class="d-flex justify-end mr-6 mb-4">
          <v-btn
            color="blue-darken-2"
            size="large"
            class="mr-2"
            @click="premCertain()"
          >
            保存修改
          </v-btn>
          <v-btn color="grey" size="large" @click="permissionDialog = false">
            取消
          </v-btn>
        </div>
      </v-card>
    </v-dialog>
  </v-row>
</template>
