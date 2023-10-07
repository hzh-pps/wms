export default function useSnackbar() {
  let snackbarShow = ref<boolean>(false);
  let snackbarColor = ref<string>("");
  let snackbarText = ref<string>("");

  // 一个专门用于设置 snackbar 状态的函数
  // 如果不使用这个函数更新 snackbar 状态，而每次都通过 useSnackbar 创建新的 ref，会导致不必要的渲染和内存使用
  function setSnackbar(color: string, text: string) {
    snackbarShow.value = true;
    snackbarColor.value = color;
    snackbarText.value = text;
  }

  return { snackbarShow, snackbarColor, snackbarText, setSnackbar };
}
