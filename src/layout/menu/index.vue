<template>
    <template v-for="(item, index) in menuList" :key="item.path">
        <template v-if="!item.children" :route="{ name:item.name }">
            <el-menu-item :index="item.path" v-if="!item.meta.hidden">
                <el-icon>
                    <component :is="item.meta.icon"></component>
                </el-icon>
                <template #title>
                    <span>{{ item.meta.title }}</span>
                </template>
            </el-menu-item>
        </template>
        <template v-if="item.children && item.children.length == 1">
            <el-menu-item :index="item.children[0].path" v-if="!item.children[0].meta.hidden"
            :route="{ name: item.children[0].name }">
            <el-icon>
                <component :is="item.children[0].meta.icon"></component>
            </el-icon>
                <template #title>
                    <span>{{ item.children[0].meta.title }}</span>
                </template>
            </el-menu-item>
        </template>

        <el-sub-menu v-if="item.children && item.children.length > 1" :index="item.path">
            <template #title>
                <el-icon>
                    <component :is="item.meta.icon"></component>
                </el-icon>
                <span>{{ item.meta.title }}</span>
            </template>
            <Menu :menuList="item.children"></Menu>
        </el-sub-menu>
    </template>
</template>

<script setup lang='ts'>
defineProps(['menuList'])
</script>
<script lang="ts">
export default {
    name: 'Menu'
}
</script>

<style lang="scss" scoped></style>