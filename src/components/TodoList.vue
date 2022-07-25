<template>
  <div class="tasks-list">
    <table v-if="this.tasks.length" class="table table-hover">
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
          <!-- <td class="task-title">
            <span 
              data-bs-toggle="modal"
              data-bs-target="#fullInfoModal"
              @click="selectTask(task.id)">{{task.name}}</span><br>
            #{{task.id}}
          </td> -->
          <td class="task-title">
            <router-link :to="`/tasks/${task.id}`">
              <!-- <span @click="selectTask(task.id)">{{task.name}}</span> -->
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
            <button type="button" @click="selectTask(task.id)" class="btn btn-light" data-bs-toggle="modal"
              data-bs-target="#exampleModal">Изменить</button>
          </td>
        </tr>
      </transition-group>
    </table>
    <div v-if="!this.sortedTasks.length">Нет заданий</div>
  </div>
</template>
<script>

export default {
  components: {
    
  },
  props:{
    tasks: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      sortedTasks: [],
      sortParam: 'date'
    }
  },
  emits: {
    'select-task': value => typeof value === 'number'
  },
  methods: {
    selectTask(id){
      this.$emit('select-task', id)
    },
    formatDate(date){
      const d = new Date(date)
      // console.log(d, Date.now() > d);
      return `${d.getDate()}.${d.getMonth()+1}.${d.getFullYear()}`
    },
    tasksSortedBy(sortParam){
      this.sortParam = sortParam
      if(sortParam === 'date'){
        this.sortedTasks = this.tasks.sort((a,b) => new Date(a.date) - new Date(b.date))
      } else if (sortParam === 'name') {
        this.sortedTasks = this.tasks.sort(function(a,b){
          const first = a.name.toLowerCase()
          const last = b.name.toLowerCase()
          if (first > last) {
            return 1
          }
          if (first < last) {
            return -1
          }
          return 0
        })
      } else if (sortParam === 'body') {
        this.sortedTasks = this.tasks.sort(function(a,b){
          const first = a.body.toLowerCase()
          const last = b.body.toLowerCase()
          if (first > last) {
            return 1
          }
          if (first < last) {
            return -1
          }
          return 0
        })
      }
    }
  },
  watch: {
    tasks(){
      this.tasksSortedBy(this.sortParam)
    }
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