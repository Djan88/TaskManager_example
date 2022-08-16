<template>
  <div class="about">
    <h1>Тестирование</h1>
    <div class="container">
      <div class="container_item container_item-1">1</div>
      <div class="container_item">2</div>
      <div class="container_item">3</div>
      <div class="container_item">4</div>
      <div class="container_item">5</div>
      <div class="container_item">6</div>
      <div class="container_item">7</div>
      <div class="container_item">8</div>
      <div class="container_item">9</div>
    </div>
  </div>
</template>
<style scoped>
.about {}
.container{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: repeat(3, 100px);
  gap: 10px;
}
.container_item {
  background: #eee;
  border: 1px solid green;
}
.container_item:nth-child(odd){
  background: #666;
  color: #fff;
}
.container_item-1
{
  grid-column: 1 / 4;
}
</style>
