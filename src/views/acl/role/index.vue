<template>
  <div>
    <el-card>
      <el-form :inline="true">
        <el-form-item label="用户名">
          <el-input placeholder="请输入用户名" style="width: 230px"></el-input>
          <el-button type="primary">搜索</el-button>
          <el-button type="default">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <el-form>
        <el-form-item>
          <el-button type="primary" @click="handleAdd">添加</el-button>
          <el-button type="danger">批量删除</el-button>
        </el-form-item>
        <el-form-item>
          <el-table>
            <el-table-column type="selection" label="111"></el-table-column>
            <el-table-column label="111"></el-table-column>
            <el-table-column label="111"></el-table-column>
            <el-table-column label="111"></el-table-column>
          </el-table>
        </el-form-item>
        <el-form-item>
          <el-pagination @current-change="" @size-change="" :pager-count="9" v-model:current-page="pageNo"
            v-model:page-size="limit" :page-sizes="[3, 5, 7, 9]" :background="true"
            layout="prev, pager, next, jumper,->,sizes,total" :total="total" />
        </el-form-item>
      </el-form>
    </el-card>
    <el-drawer v-model="drawer" :direction="direction">
      <template #header>
        <h4>添加用户</h4>
      </template>
      <template #default>
        <el-row style="margin: 10px 0px;">
          <el-col :span="3">用户姓名</el-col>
          <el-col :span="18"><el-input placeholder="请输入用户姓名"></el-input></el-col>
        </el-row>
        <el-row style="margin: 10px 0px;">
          <el-col :span="3">用户昵称</el-col>
          <el-col :span="18"><el-input placeholder="请输入用户昵称"></el-input></el-col>
        </el-row>
        <el-row style="margin: 10px 0px;">
          <el-col :span="3">用户密码</el-col>
          <el-col :span="18"><el-input placeholder="请输入用户密码"></el-input></el-col>
        </el-row>
      </template>
      <template #footer>
      </template>
    </el-drawer>
    <el-drawer v-model="drawer1" :direction="direction">
      <template #header>
        <h4>添加角色</h4>
      </template>
      <template #default>
        <el-row style="margin: 10px 0px;">
          <el-col :span="3">用户姓名</el-col>
          <el-col :span="18"><el-input placeholder="请输入用户姓名"></el-input></el-col>
        </el-row>
        <el-row style="margin: 10px 0px;">
          <el-form>
            <el-form-item> <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate"
                @change="handleCheckAllChange">
                Check all
              </el-checkbox>
              <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                <el-checkbox v-for="city in cities" :key="city" :label="city" :value="city">
                  {{ city }}
                </el-checkbox>
              </el-checkbox-group></el-form-item>
          </el-form>
        </el-row>
      </template>
      <template #footer>
        <el-button type="primary" @click="drawer1 = false">确定</el-button>
        <el-button @click="drawer1 = false">取消</el-button>
      </template>
    </el-drawer>
  </div>
</template>

<script setup lang='ts'>

</script>

<style lang="scss" scoped>

</style>
