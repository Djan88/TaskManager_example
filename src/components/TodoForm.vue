<template>
  <form class="add-edit-form">
    <div class="form-floating mb-3">
      <input ref="input" v-model="task.name" type="text" class="form-control" :class="{
        'is-invalid': !task.name && this.invalidData === true
      }" id="floatingInput" placeholder="Тема задачи">
      <label for="floatingInput">Тема задачи {{ task.name ? task.name.length : 0}}/150</label>
      <div class="invalid-feedback">
        Пожалуйста укажите тему
      </div>
    </div>
    <div class="form-floating mb-3">
      <textarea v-model="task.body" class="form-control taskBody" :class="{
        'is-invalid': !task.body && this.invalidData === true
      }" placeholder="Описание задачи" id="floatingTextarea"></textarea>
      <label for="floatingInput">Описание задачи {{ task.body ? task.body.length : 0}}/2048</label>
      <div class="invalid-feedback">
        Пожалуйста опишите задачу
      </div>
    </div>
    <div id="deadlineWrap" class="input-group mb-3">
      <span class="input-group-text" id="basic-addon1">Deadline:</span>
      <input v-model="task.date" id="startDate" class="form-control" :class="{
        'is-invalid': !task.date && this.invalidData === true
      }" type="date" />
      <div class="invalid-feedback">
        Пожалуйста укажите "Deadline"
      </div>
    </div>
    <div class="input-group mb-3 form-floating">
      <select class="form-select" id="floatingSelect" :class="{
        'is-invalid': this.task.performs === 'Не выбрано...' && this.invalidData === true
      }" v-model="task.performs">
        <option disabled selected>Не выбрано...</option>
        <option value="Петр Первый">Петр Первый</option>
        <option value="Губка Боб">Губка Боб</option>
        <option value="Анджелина Джоли">Анджелина Джоли</option>
        <option value="Кхалиси Неопалимая Матерь Драконов Королева Андалов и Первых людей">Кхалиси Неопалимая Матерь
          Драконов Королева Андалов и Первых людей</option>
      </select>
      <label for="floatingSelect">Назначить ответственного</label>
      <div class="invalid-feedback">
        Пожалуйста выберите ответственного
      </div>
    </div>
    <div v-show="task.id" class="input-group mb-3">
      <span class="input-group-text" id="basic-addon1">ID:</span>
      <input v-model="task.id" id="startDate" class="form-control" type="number" disabled />
    </div>
    <div class="form-switch mb-3">
      <input v-model="task.forced" class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault">
      <label class="form-check-label" for="flexSwitchCheckDefault">Срочная задача</label>
    </div>
    <div class="input-group mb-3 task-status">
      <div class="form-check">
        <input class="form-check-input" type="radio" name="taskRadio" value="Создана" id="taskRadio1"
          v-model="task.status">
        <label class="form-check-label" for="taskRadio1">
          Создана
        </label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="radio" name="taskRadio" value="Выполняется" id="taskRadio2"
          v-model="task.status" checked>
        <label class="form-check-label" for="taskRadio2">
          Выполняется
        </label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="radio" name="taskRadio" value="Выполнена" v-model="task.status"
          id="taskRadio2">
        <label class="form-check-label" for="taskRadio3">
          Выполнена
        </label>
      </div>
    </div>
    <div v-show="task.id" class="mb-3">
      <div @click="this.removeTask(task.id)" class="removeTask">Удалить задание</div>
    </div>
    <div class="">
      <button type="submit" class="btn btn-primary" @click.prevent="this.addTask()">Сохранить</button>
    </div>
  </form>
</template>
<script>
export default {
  props: {
    selectedTask: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      task: {
        name: '',
        body: '',
        date: '',
        forced: false,
        id: null,
        status: 'Выполняется',
        performs: 'Не выбрано...'
      },
      invalidData: false,
      taskModal: {},
      datePopover: {},
    }
  },
  emits: {
    "add-task": value => typeof value === 'object',
    "remove-task": value => typeof value === 'number'
  },
  mounted(){
    this.setDateForToday()
    this.taskModal = new bootstrap.Modal(document.getElementById('exampleModal'), {
      keyboard: false
    })
    this.datePopover = new bootstrap.Popover(document.getElementById('deadlineWrap'), {
      content: 'Этот день уже настал',
      placement: 'top',
      trigger: 'manual'
    })
  },
  methods: {
    isDataInvalid(){
      if(!this.task.name || !this.task.body || !this.task.date || this.task.performs === 'Не выбрано...'){
        this.invalidData = true
      }
    },
    addTask() {
      this.invalidData = false
      this.isDataInvalid()
      if(this.invalidData === true){
        return
      }
      if(!this.task.id){
        this.task.id = Date.now()
      }
      this.$emit('add-task', this.task)
      this.task = {
        name: '',
        body: '',
        date: '',
        forced: false,
        id: null,
        status: 'Выполняется',
        performs: 'Не выбрано...'
      }
      this.taskModal.hide()
      this.setDateForToday()
    },
    removeTask(id){
      this.$emit('remove-task', id)
      this.task = {
        name: '',
        body: '',
        date: '',
        forced: false,
        id: null,
        status: 'Выполняется',
        performs: 'Не выбрано...'
      }
      this.invalidData = false
      this.taskModal.hide()
      this.setDateForToday()
    },
    setDateForToday(){
      let curDate = new Date();
      curDate.setDate(curDate.getDate() + 1);
      const curMonth = () => {
        if (curDate.getMonth() >= 10) {
          return curDate.getMonth() + 1
        }
        return '0' + (curDate.getMonth() + 1)
      }
      this.task.date = `${curDate.getFullYear()}-${curMonth()}-${curDate.getDate()}`
    }
  },
  computed: {

  },
  watch: {
    selectedTask(){
      this.task = this.selectedTask
    },
    'task.date'(){
      if (new Date() > new Date(this.task.date)) {
        this.datePopover.show()
      } else {
        this.datePopover.hide()
      }
    }
  }
}
</script>
<style>
  .add-edit-form
  {
    padding: 15px;
  }
  .form-check-label
  {
    padding-left: 0.375rem;
  }
  textarea.form-control.taskBody
  {
    min-height: 10rem;
  }
  .task-status
  {
    justify-content: space-between;
  }
  .removeTask
  {
    color: brown;
    cursor: pointer;
  }
</style>