<template>
<transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="modal"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
        <header
          class="modal-header"
          id="modalTitle"
        >
          <slot name="header">
            zarap
          </slot>
        </header>
        <section
          class="modal-body"
          id="modalDescription"
        >
          <slot name="body">
            {{message}}
          </slot>
        </section>
        <footer class="modal-footer">
          <slot name="footer">
            <button
              type="button"
              class="btn-red"
              @click="close"
              aria-label="Close modal"
            >
            Cancel  
            </button>
            <button
              type="button"
              class="btn-red"
              @click="confirm"
              aria-label="Close modal"
            >
            Yes  
            </button>
          </slot>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'modal',
    props: {
      message: String
    },
    methods: {
      close() {
        this.$emit('close', false);
      },
      confirm() {
        this.$emit('close', true);
      }
    },
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
    margin-right: 10px;
  }
</style>