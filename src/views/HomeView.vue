<!--[X] Форма добавления нового задания -->
<!--[X] Валидация полей формы и эмитов -->
<!--[X] Редактирование задания -->
<!--[X] Удаление задания -->
<!--[X] Приоритезирование задания -->
<!--[X] Дедлайны. Просроченные задания по другому окрашиваются -->
<!--[Х] Разбиваем все на компоненты -->
<!--[X] Автоочистка формы при сохранении -->
<!--[X] Поле ID появляется только при редактировании -->
<!--[X] Анимация добавления/удаления/сортировки -->
<!--[X] Сортировка заданий (дата, тема, просроченные вверху) -->
<!--[Х] Список заданий -->
<!--[X] Ответственный за задание -->
<!--[X] Перенести форму в попап -->
<!--[Х] Фильтр (Просроченные, Выполненные, Важные,) -->
<!--[X] При выборе даты предупреждать если выбрана дата в прошлом -->
<!--[X] Ограничение длины описания и длинных заголовков -->
<!--[X] Открытие полной информации о задании в попапе -->
<!--[X] При открытии полной информации должны быть отображаться все статусы --> 
<!--[ ] Пофиксить анимацию. Перескакивает при удалении элемента из списка-->
<!--[ ] Предупреждение при угрозе потери не сохраненных данных-->
<!--[ ] Проверить очистку объекта данных при закрытии окна редактирования/сохранении/удалении-->

<template>
  <div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-xs-12">
          <acent-block>
            <template v-slot:heading>
              Задания
              <div class="tasksFilter mb-3 form-floating">
                <select class="form-select" id="floatingSelect" v-model="filterParam">
                  <option value="Все" selected>Все</option>
                  <option value="Выполненные">Выполненные</option>
                  <option value="Просроченные">Просроченные</option>
                  <option value="Не назначенные">Не назначенные</option>
                  <option value="В работе">В работе</option>
                </select>
                <label for="floatingSelect">Показывать:</label>
              </div>
              <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Добавить задание
              </button>
            </template>
            <template v-slot:body>
              <todo-list @select-task="selectTask" :tasks="filteredTasks"></todo-list>
            </template>
          </acent-block>
        </div>
      </div>
    </div>
    <modal-block id="exampleModal" aria-labelledby="exampleModalLabel">
      <template v-slot:heading>
        Создание/Редактирование задания
      </template>
      <template v-slot:body>
        <todo-form @add-task="saveTask" @remove-task="removeTask" :selectedTask="selectedTask"></todo-form>
      </template>
    </modal-block>
    <!-- <modal-block id="fullInfoModal" aria-labelledby="fullInfoModalLabel">
    <template v-slot:heading>
      {{this.selectedTask.name}}
    </template>
    <template v-slot:body>
      <task-details :selectedTask="selectedTask"></task-details>
    </template>
  </modal-block> -->
  </div>
</template>

<script>
import TodoForm from '@/components/TodoForm.vue'
import TodoList from '@/components/TodoList.vue'
import AcentBlock from '@/components/AcentBlock.vue'
import ModalBlock from '@/components/ModalBlock.vue'
// import TaskDetails from '@/components/TaskDetails.vue'

export default {
  components: {
    TodoForm,
    TodoList,
    AcentBlock,
    ModalBlock,
    // TaskDetails
  },
  mounted() {
    if(window.localStorage.getItem('tasksList')){
      this.tasks = JSON.parse(window.localStorage.getItem('tasksList'))
      this.filteredTasks = this.tasks
    }
  },
  data() {
    return {
      tasks: [],
      filteredTasks: [],
      selectedTask: {},
      filterParam: 'Все'
    }
  },
  methods: {
    saveTask(task){
      const recivedTask = task
      if(this.tasks.find(t => t.id === recivedTask.id)){
        this.tasks[this.tasks.indexOf(recivedTask)] = recivedTask
        this.tasks = [...this.tasks]
        return
      }
      this.tasks.push(recivedTask)
      this.tasks = [...this.tasks]
      this.selectedTask = {};
    },
    selectTask(id) {
      this.selectedTask = this.tasks.find(t => t.id === id)
    },
    removeTask(id) {
      this.tasks = this.tasks.filter(t => t.id != id)
    }
  },
  watch: {
    tasks(){
      window.localStorage.setItem('tasksList', JSON.stringify(this.tasks));
      this.filteredTasks = [...this.tasks]
    },
    filterParam(){
      if (this.filterParam === 'Все') {
        this.filteredTasks = this.tasks
      } else if (this.filterParam === 'Выполненные') {
        this.filteredTasks = this.tasks.filter(t => t.status === 'Выполнена')
      } else if (this.filterParam === 'Не назначенные') {
        this.filteredTasks = this.tasks.filter(t => t.status === 'Создана')
      } else if (this.filterParam === 'В работе') {
        this.filteredTasks = this.tasks.filter(t => t.status === 'Выполняется')
      } else if (this.filterParam === 'Просроченные') {
        this.filteredTasks = this.tasks.filter(t => new Date() > new Date(t.date))
      }
    }
  }
}
</script>
<style>
 .tasksFilter
 {
  width: 300px;
  height: 30px;
 }
 .tasksFilter label
 {
  font-size: 1rem;
  font-style: italic;
 }
</style>