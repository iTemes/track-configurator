<template>
  <router-view />
</template>

<script>
export default {
  created() {
    console.log(
      "App created dispatch action to restore data from Session Storage"
    );
  },
};
</script>
