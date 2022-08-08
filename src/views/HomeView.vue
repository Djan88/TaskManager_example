<!--[ ] Пофиксить анимацию. Перескакивает при удалении элемента из списка-->
<!--[ ] Предупреждение при угрозе потери не сохраненных данных-->
<!--[ ] Проверить очистку объекта данных при закрытии окна редактирования/сохранении/удалении-->
<!--[ ] Удаление таска вызывает проблему с датой в форме-->

<template>
  <div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-xs-12">
          <acent-block>
            <template v-slot:heading>
              Задания
              <div class="tasksFilter mb-3 form-floating">
                <select class="form-select" id="floatingSelect" @change="tasksFilteredBy($event.target.value)">
                  <option value="Все" selected>Все</option>
                  <option value="Выполненные">Выполненные</option>
                  <option value="Просроченные">Просроченные</option>
                  <option value="Не назначенные">Не назначенные</option>
                  <option value="В работе">В работе</option>
                </select>
                <label for="floatingSelect">Показывать:</label>
              </div>
              <button 
                type="button" 
                class="btn btn-primary" 
                data-bs-toggle="modal" 
                data-bs-target="#exampleModal"
                @click="clearId">
                Добавить задание
              </button>
            </template>
            <template v-slot:body>
              <todo-list></todo-list>
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
        <todo-form></todo-form>
      </template>
    </modal-block>
  </div>
</template>

<script>
import TodoForm from '@/components/TodoForm.vue'
import TodoList from '@/components/TodoList.vue'
import AcentBlock from '@/components/AcentBlock.vue'
import ModalBlock from '@/components/ModalBlock.vue'
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  components: {
    TodoForm,
    TodoList,
    AcentBlock,
    ModalBlock,
  },
  methods: {
    ...mapMutations(['updateFilterParam', 'clearTaskId']),
    tasksFilteredBy(filterParam){
      this.updateFilterParam(filterParam)
    },
    clearId(){
      this.clearTaskId();
    }
  },
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