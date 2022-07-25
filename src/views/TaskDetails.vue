<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-xs-12">
        <button class="btn btn-small btn-primary" @click="$router.back()">Назад</button>
      </div>
      <div class="col-xs-12">
        {{ this.taskItem.name }}
        <div class="fullTaskInfo">
          <div class="taskId"><b>ID:</b> {{ this.taskItem.id }}</div>
          <div class="taskExp" :class="{
            'date-cell__deadline': new Date() > new Date(this.taskItem.date),
          }">
            <b>Выполнить до:</b> {{ this.taskItem.date }}
          </div>
          <div class="taskPerformer"><b>Ответственный:</b> {{ this.taskItem.performs }}</div>
          <h6>Описание задачи: </h6>
          <div class="taskBody">{{ this.taskItem.body }}</div>
          <div class="taskStatus" :class="{
            'taskStatus__inProgress': this.taskItem.status === 'Выполняется',
            'taskStatus__done': this.taskItem.status === 'Выполнена',
          }">{{ this.taskItem.status }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  mounted() {
    if (window.localStorage.getItem('tasksList')) {
      this.tasks = JSON.parse(window.localStorage.getItem('tasksList'))
      this.currentTask()
    }
  },
  data() {
    return{
      tasks:[],
      taskItem: {}
    }
  },
  methods: {
    currentTask() {
      this.taskItem = this.tasks.find(task => task.id === this.id)
    },
  },
  computed: {
    
  }
}
</script>
<style>
h6 {
  font-weight: bold;
}

.taskStatus {
  position: relative;
  padding-left: 30px;
}

.taskStatus:before {
  content: '';
  border: 1px solid black;
  background: #fff;
  border-radius: 50%;
  display: inline-block;
  width: 20px;
  height: 20px;
  position: absolute;
  left: 0;
  top: 1px;
}

.taskStatus.taskStatus__inProgress:before {
  background: rgb(44, 123, 229);
}

.taskStatus.taskStatus__done:before {
  background: green;
}
</style>