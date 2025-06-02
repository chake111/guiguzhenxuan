<template>
  <div>
    <el-card>
      <div class="box">
        <el-image class="avatar" :src="userStore.avatar"></el-image>
        <div class="bottom">
          <h3 class="title">
            {{ getTime() }}好,{{ userStore.username }}
          </h3>
          <p class="subtitle">欢迎来到{{ setting.title }}</p>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import { getTime } from '@/utils/time';
import setting from '@/setting.ts';

let userStore = useUserStore();

</script>

<style scoped>
.box {
  display: flex;
  ;
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}



.bottom {
  margin-left: 20px;

  .title {
    font-size: 30px;
    font-weight: 900;
    color: #333;
    margin-bottom: 30px;
  }

  .subtitle {
    font-style: italic;
    color: skyblue;
  }
}
</style>
