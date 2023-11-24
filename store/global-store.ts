import { defineStore } from "pinia";

export const usePermissionStore = defineStore("permissionStore", () => {
  // 菜单权限
  const pagePermission = ref([
    {
      id: "",
      pid: "",
      show: true,
      name: "看板",
      path: "/dashboard",
      icon: "fa-solid fa-chart-column",
      children: [
        {
          id: "",
          pid: "",
          show: true,
          parentName: "看板",
          name: "主看板",
          path: "/dashboard/main-dashboard",
          icon: "fa-solid fa-boxes-stacked",
        },
      ],
    },
    {
      id: "",
      pid: "",
      show: true,
      name: "MES",
      path: "/mes",
      icon: "fa-solid fa-table-list",
      children: [
        {
          id: "",
          pid: "",
          show: true,
          parentName: "MES",
          name: "生产工单",
          path: "/mes/work-order-product",
          icon: "fa-solid fa-table-list",
        },
        {
          id: "",
          pid: "",
          show: true,
          parentName: "MES",
          name: "工单排产",
          path: "/mes/work-produce-recode",
          icon: "fa-solid fa-list-ol",
        },
        {
          id: "",
          pid: "",
          show: true,
          parentName: "MES",
          name: "工单进度",
          path: "/mes/work-progress",
          icon: "fa-solid fa-chart-line",
        },
        {
          id: "",
          pid: "",
          show: true,
          parentName: "MES",
          name: "BOM清单",
          path: "/mes/bom-list",
          icon: "fa-solid fa-list",
        },
      ],
    },
    {
      id: "",
      pid: "",
      show: true,
      name: "WMS",
      path: "/wms",
      icon: "fa-solid fa-chart-column",
      children: [
        {
          id: "",
          pid: "",
          show: true,
          parentName: "WMS",
          name: "仓库主页",
          path: "/wms/home",
          icon: "fa-solid fa-gauge",
        },
      ],
    },
    {
      id: "",
      pid: "",
      show: true,
      name: "QMS",
      path: "/qms",
      icon: "fa-solid fa-list-check",
      children: [
        {
          id: "",
          pid: "",
          show: true,
          parentName: "QMS",
          name: "质检单",
          path: "/qms/quality-check-list",
          icon: "fa-solid fa-clipboard-list",
        },
        {
          id: "",
          pid: "",
          show: true,
          parentName: "QMS",
          name: "安东 Andon",
          path: "/qms/andon",
          icon: "fa-solid fa-bars-progress",
        },
        {
          id: "",
          pid: "",
          show: true,
          parentName: "QMS",
          name: "良品统计",
          path: "/qms/good-product-statistic",
          icon: "fa-solid fa-square-poll-vertical",
        },
      ],
    },
    {
      id: "",
      pid: "",
      show: true,
      name: "基础数据",
      path: "/work-basic",
      icon: "fa-solid fa-gear",
      children: [
        {
          id: "",
          pid: "",
          show: true,
          parentName: "基础信息",
          name: "工作中心",
          path: "/work-basic/work-center",
          icon: "fa-solid fa-location-crosshairs",
        },
        {
          id: "",
          pid: "",
          show: true,
          parentName: "基础信息",
          name: "班组信息",
          path: "/work-basic/work-class",
          icon: "fa-solid fa-people-roof",
        },
        {
          id: "",
          pid: "",
          show: true,
          parentName: "MES",
          name: "常用BOM清单",
          path: "/work-basic/bom-design",
          icon: "fa-solid fa-list",
        },
        {
          id: "",
          pid: "",
          show: true,
          parentName: "MES",
          name: "常用工序",
          path: "/work-basic/process-maintenance",
          icon: "fa-solid fa-screwdriver-wrench",
        },
      ],
    },
  ]);

  // 按钮权限
  const buttonPermission = ref<any>(["/->login", "/->register", "/->index"]);

  return { pagePermission, buttonPermission };
});
