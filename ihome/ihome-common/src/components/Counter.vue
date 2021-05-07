
<template>
  <div>
    <h3>Counter.vue</h3>
    <div class="num">
      {{ count }}
    </div>
    <button id="btn" @click="httpByAsync">http</button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      count: 0,
    };
  },

  methods: {
    
    async httpByAsync() {
      const res = await axios.get(
        "https://intweb.polyihome.com/sales-api/system/area/getAll"
      );
      this.count = res.data.data.length;
    },
  },
};
</script>