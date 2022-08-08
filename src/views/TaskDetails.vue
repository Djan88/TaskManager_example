<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-xs-12">
        <button class="btn btn-small btn-primary" @click="$router.back(), clearDetail()">Назад</button>
      </div>
      <div class="col-xs-12">
        {{ selectedTask.name }}
        <div class="fullTaskInfo">
          <div class="taskId"><b>ID:</b> {{ selectedTask.id }}</div>
          <div class="taskExp" :class="{
            'date-cell__deadline': new Date() > new Date(selectedTask.date),
          }">
            <b>Выполнить до:</b> {{ selectedTask.date }}
          </div>
          <div class="taskPerformer"><b>Ответственный:</b> {{ selectedTask.performs }}</div>
          <h6>Описание задачи: </h6>
          <div class="taskBody">{{ selectedTask.body }}</div>
          <div class="taskStatus" :class="{
            'taskStatus__inProgress': selectedTask.status === 'Выполняется',
            'taskStatus__done': selectedTask.status === 'Выполнена',
          }">{{ selectedTask.status }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  computed: {
    ...mapGetters(['selectedTask']),
  },
  methods: {
    ...mapMutations(['clearDetailTask']),
    clearDetail(){
      this.clearDetailTask()
    }
  },
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