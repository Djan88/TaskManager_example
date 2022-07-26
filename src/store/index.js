import axios from 'axios'
import { createStore } from 'vuex'

export default createStore({
  state: {
    tasks:[],
    fTasks:[],
    fTasksMod:[],
    filterParam: 'Все',
    sortParam: 'date',
    curTaskId: null,
    selectedTaskId: null
  },
  actions: {
    fetchTasks({commit}){
      let tasks = JSON.parse(window.localStorage.getItem('tasksList'))
      commit('updateTasks', tasks)
    },
    // fetchFromApi(){
    //   axios
    //     .get('https://jsonplaceholder.typicode.com/todos?_limit=20')
    //     .then(response => {
    //       this.state.fTasks = response.data
    //       // console.log(this.state.fTasks);
    //       this.state.fTasksMod = this.state.fTasks.map(task => {
    //         const container = {};
    //         container.id = task.id;
    //         container.name = task.userId + task.title;
    //         container.body = task.title;
    //         container.date = '2022-12-22';
    //         container.forced = false;
    //         container.status = task.completed ? 'Выполнена' : 'Выполняется';
    //         container.performs = 'Сотрудник 1';
    //         return container
    //       })
    //       console.log(this.state.fTasksMod);
    //       this.state.tasks = [...this.state.tasks, ...this.state.fTasksMod]
    //     })
    //     .catch(error => console.log(error));
    // }
  },
  mutations: {
    updateTasks(state,tasks){
      state.tasks = tasks
    },
    selectTask(state, taskId) {
      state.curTaskId = taskId
    },
    clearTaskId(state) {
      state.curTaskId = null
    },
    updateFilterParam(state, filterParam) {
      state.filterParam = filterParam
    },
    updateSortParam(state, sortParam){
      state.sortParam = sortParam
    },
    selectDetailTask(state, taskId) {
      state.selectedTaskId = taskId
    },
    clearDetailTask(state) {
      state.selectedTaskId = null
    },
    saveTask(state, task) {
      if (state.tasks.find(t => t.id === task.id)){
        state.tasks[state.tasks.indexOf(task)] = task
        window.localStorage.setItem('tasksList', JSON.stringify(state.tasks));
        return
      }
      state.tasks.push(task)
      window.localStorage.setItem('tasksList', JSON.stringify(state.tasks));
    },
    removeTask(state, taskId){
      state.tasks = state.tasks.filter(t => t.id != taskId)
      window.localStorage.setItem('tasksList', JSON.stringify(state.tasks));
    },
    modifiedTasks(state){
      // state.fTasksMod = state.fTasks.map(task => {
      //   const container = {};
      //   container.id = task.id;
      //   container.name = task.userId+task.title;
      //   container.body = task.title;
      //   container.date = '2022-12-22';
      //   container.forced = false;
      //   container.status = task.completed ? 'Выполнена' : 'Выполняется';
      //   container.performs = 'Сотрудник 1';
      //   return container
      // })
      // console.log(state.fTasksMod);
    }
  },
  getters: {
    allTasks(state){
      return state.tasks
    },
    currentTask(state){
      if (state.curTaskId === null) {
        return {
          name: '',
          body: '',
          date: '',
          forced: false,
          id: null,
          status: 'Выполняется',
          performs: 'Не выбрано...'
        }
      }
      return state.tasks.find(t => t.id === state.curTaskId)
    },
    filteredTasks(state){
      if (state.filterParam === 'Все') {
        return state.tasks
      } else if (state.filterParam === 'Выполненные') {
        return state.tasks.filter(t => t.status === 'Выполнена')
      } else if (state.filterParam === 'Не назначенные') {
        return state.tasks.filter(t => t.status === 'Создана')
      } else if (state.filterParam === 'В работе') {
        return state.tasks.filter(t => t.status === 'Выполняется')
      } else if (state.filterParam === 'Просроченные') {
        return state.tasks.filter(t => new Date() > new Date(t.date))
      }
    },
    sortedTasks(state, getters){
      if (state.sortParam === 'date') {
        return getters.filteredTasks.sort((a, b) => new Date(a.date) - new Date(b.date))
      } else if (state.sortParam === 'name') {
        return getters.filteredTasks.sort(function (a, b) {
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
      } else if (state.sortParam === 'body') {
        return getters.filteredTasks.sort(function (a, b) {
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
    },
    selectedTask(state, getters){
      if (state.selectedTaskId) {
        return getters.sortedTasks.find(task => task.id === state.selectedTaskId)
      }
    }
  },
  modules: {
  }
})
