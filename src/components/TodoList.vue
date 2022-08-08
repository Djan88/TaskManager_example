<template>
  <div class="tasks-list">
    <table v-if="sortedTasks" class="table table-hover">
      <thead class="table-light">
        <tr>
          <th class="sortable" scope="col" @click="tasksSortedBy('name')">Заголовок</th>
          <th class="sortable" scope="col" @click="tasksSortedBy('date')">Deadline</th>
          <th class="sortable" scope="col" @click="tasksSortedBy('body')">Описание</th>
          <th scope="col">Редактирование</th>
        </tr>
      </thead>
      <transition-group name="tasks" tag="tbody">
        <tr v-for="task in sortedTasks" :key="task.id" class="tasks-item" :class="{
          'forced-task': task.forced === true,
          'table-primary': task.status === 'Выполняется',
          'table-success': task.status === 'Выполнена',
        }">
          <td class="task-title">
            <router-link @click="detailTask(task.id)" :to="`/tasks/${task.id}`">
              <span>{{task.name}}</span>
            </router-link>
            <br>
            #{{task.id}}
          </td>
          <td :class="{
            'date-cell__deadline': new Date() > new Date(task.date),
          }" class="date-cell">{{this.formatDate(task.date)}}</td>
          <td>
            <div class="task-body">{{task.body}}</div>
            <div class="perform">{{task.performs}}</div>
          </td>
          <td>
            <button type="button" @click="taskSelection(task.id)" class="btn btn-light" data-bs-toggle="modal"
              data-bs-target="#exampleModal">Изменить</button>
          </td>
        </tr>
      </transition-group>
    </table>
    <div v-if="!this.sortedTasks.length">Нет заданий</div>
  </div>
</template>
<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapGetters(['sortedTasks']),
  },
  methods: {
    ...mapActions(['fetchTasks']),
    ...mapMutations(['updateSortParam', 'selectTask', 'selectDetailTask']),
    formatDate(date){
      const d = new Date(date)
      return `${d.getDate()}.${d.getMonth()+1}.${d.getFullYear()}`
    },
    tasksSortedBy(sortParam){
      this.updateSortParam(sortParam)
    },
    taskSelection(taskId) {
      this.selectTask(taskId)
    },
    detailTask(id){
      this.selectDetailTask(id)
    }
  },
  mounted() {
    this.fetchTasks();
  }
}
</script>
<style>
  th.sortable, .task-title span
  {
    color: rgb(44,123,229);
    cursor: pointer;
  }
  .tasks-list
  {
    padding: 15px;
  }
  .date-cell
  {
    width: 100px;
  }
  .date-cell__deadline
  {
    color: brown!important;
    font-weight: bold;
  }
  .tasks-enter-active,
  .tasks-leave-active {
    transition: all 1s ease;
  }
  .tasks-enter-from,
  .tasks-leave-to {
    opacity: 0;
    transform: translateY(30px);
  }
  .tasks-move {
    transition: transform 0.8s ease;
  }
  .perform 
  {
    font-size: 13px;
    color: rgb(23 79 164);
    font-style: italic;
  }
  .forced-task
  {
    border: 2px solid #0d6efd;
  }
  .task-body, .perform
  {
    max-width: 800px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .task-title
  {
    max-width: 240px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
</style>