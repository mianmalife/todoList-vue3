<template>
  <div class="taskList__box">
    <van-cell-group inset title='任务列表'>
      <div v-if='props.tasklist.length'>
        <div class='cell__box' v-for="item in props.tasklist" :key="item.key">
          <van-swipe-cell :class="item.checked ? 'cell__checked' : ''" ref="swipeCell" @close="closeCell">
            <van-cell v-show='!item.isEdit' :value='item.text' />
            <van-field v-show='item.isEdit' @blur='blurInput' @update:model-value='updateTaskItem' ref="editInput"
              v-model="item.text" placeholder="请输入任务项" />
            <template #left>
              <van-button square type="primary" :disabled='item.checked' text="编辑" @click="editTaskItem(item.key)" />
            </template>
            <template #right>
              <van-button square type="primary" :text="item.checked ? '取消完成' : '已完成'" @click="checkedTask(item.key)" />
              <van-button square type="danger" text="删除" @click="deleteTaskItem(item.key)" />
            </template>
          </van-swipe-cell>
        </div>
      </div>
      <van-cell-group inset v-if='!props.tasklist.length' @click="clickNoDataItem">
        <van-cell value="还没有任务, 添加一个吧~" class="notask" />
      </van-cell-group>
    </van-cell-group>

  </div>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue'
// eslint-disable-next-line
const props = defineProps({
  tasklist: {
    type: Array,
    default: () => []
  }
})
const editInput = ref(null)
const swipeCell = ref(null)
let open = ref(0)
let editKey = ref(null)
// eslint-disable-next-line
const emit = defineEmits(['deleteTask', 'markTask', 'editTask', 'updateTask', 'blurTask', 'clickNodata'])
const deleteTaskItem = (key) => {
  emit('deleteTask', key)
}
const checkedTask = (key) => {
  emit('markTask', key)
}
function editTaskItem(key) {
  open.value = 1
  editKey = key
  emit('editTask', key)
}
function updateTaskItem(value) {
  emit('updateTask', value, editKey)
}
watch(open, (newValue) => {
  if (newValue === 1) {
    nextTick(() => {
      setTimeout(() => {
        editInput.value[editKey].focus()
      }, 500)
    });
  }
})
function closeCell() {
  open.value = 0
}
function blurInput() {
  open.value = 0
  emit('blurTask')
}
function clickNoDataItem() {
  emit('clickNodata')
}
</script>

<style lang="less" scoped>
.taskList__box {
  margin-bottom: 20px;

  .van-cell {
    border-bottom: 1px solid #e1e1e1;
  }

  .cell__box:last-child {
    .van-cell {
      border-bottom: none
    }
  }

  .van-cell-group--inset {
    .notask {
      border-bottom: none;
      padding-left: 0;
      padding-right: 0;

      :deep(.van-cell__value--alone) {
        color: #969799;
      }
    }
  }

  :deep(.cell__checked) {
    text-decoration: line-through;
  }
}
</style>