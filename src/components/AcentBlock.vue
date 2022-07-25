<template>
  <div class="acent-block">
    <h5>
      <slot name="heading"></slot>
    </h5>
    <slot name="body"></slot>
  </div>
</template>
<script>
export default {
  
}
</script>
<style>
  h5
  {
    background: rgb(249,250,253);
    padding: 15px;
    border-top-left-radius: 0.375rem;
    border-top-right-radius: 0.375rem;
    display: flex;
    justify-content: space-between;
  }
  .acent-block
  {
    border-radius: 0.375rem;
    background: #fff;
    margin-bottom: 15px;
    box-shadow: 0 7px 14px 0 rgba(65,69,88,0.1),0 3px 6px 0 rgba(0,0,0,0.07)
  }
</style>