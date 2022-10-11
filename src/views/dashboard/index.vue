<template>
  <div class="dashboard-container">
    <cards />
    <sale />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import sale from "./sale";
import cards from "./cards";
export default {
  name: "Dashboard",
  components: {
    cards,
    sale,
  },
  computed: {
    ...mapGetters(["name"]),
  },
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
}
span {
  margin-right: 5px;
}
</style>
