<template>
<transition name="modal-fade">
    <div class="modal-backdrop">
        <half-circle-spinner
          :animation-duration="1000"
          :size="60"
          color="var(--default-button-color)"
        />
    </div>
  </transition>
</template>

<script>
  import { HalfCircleSpinner } from 'epic-spinners'
  
  export default {
    name: 'modal',
    components: {
      HalfCircleSpinner
    }
  };
</script>

<style scoped>
  .modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal {
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
  }

  .modal-header,
  .modal-footer {
    padding: 15px;
    display: flex;
  }

  .modal-header {
    border-bottom: 1px solid #eeeeee;
    color: var(--default-button-color);
    justify-content: space-between;
  }

  .modal-footer {
    border-top: 1px solid #eeeeee;
    justify-content: flex-end;
  }

  .modal-body {
    position: relative;
    padding: 20px 10px;
  }

  .btn-close {
    border: none;
    font-size: 20px;
    padding: 20px;
    cursor: pointer;
    font-weight: bold;
    color:  var(--default-button-color);
    background: transparent;
  }

  .btn-red {
    color: white;
    background:  var(--default-button-color);
    border: 1px solid  var(--default-button-color);
    border-radius: 2px;
    padding-left:10px;
    padding-right:10px;
  }
</style>