<template>
  <taskListCmp :tasklist="taskList" @deleteTask="deleteTaskItem" @markTask="markTaskItem" @editTask="editTaskItem"
    @updateTask="updateTaskItem" @blurTask="blurTaskItem" @clickNodata="clickNoDataItem">
  </taskListCmp>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field ref='taskRef' v-model="task" name="task" placeholder="输入任务项"
        :rules="[{ required: true, message: '请输入任务项' }]" />
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        添加任务
      </van-button>
    </div>
  </van-form>

</template>

<script setup>
import { ref } from 'vue';
import taskListCmp from './components/taskList.vue'
let id = 0
const task = ref('');
const taskRef = ref(null)
let taskList = ref([])
const onSubmit = (values) => {
  taskList.value.push({
    text: values.task,
    checked: false,
    isEdit: false,
    key: id++
  })
  task.value = ''
};
const deleteTaskItem = (key) => {
  taskList.value = taskList.value.filter(item => item.key !== key)
}
function markTaskItem(key) {
  taskList.value = taskList.value.map(item => {
    if (item.key === key) {
      return {
        ...item,
        checked: !item.checked,
        isEdit: false
      }
    } else {
      return item
    }
  })
}
function editTaskItem(key) {
  taskList.value = taskList.value.map(item => {
    if (item.key === key) {
      return {
        ...item,
        isEdit: true,
      }
    } else {
      return {
        ...item,
        isEdit: false
      }
    }
  })
}
function updateTaskItem(text, key) {
  taskList.value = taskList.value.map(item => {
    if (item.key === key) {
      return {
        ...item,
        text: text
      }
    } else {
      return item
    }
  })
}
function blurTaskItem() {
  taskList.value = taskList.value.map(item => {
    return {
      ...item,
      isEdit: false
    }
  })
}
function clickNoDataItem() {
  taskRef.value.focus()
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
  background-color: aliceblue;
  height: 100vh;
  padding: 20px 0;
  box-sizing: border-box;
}
</style>
