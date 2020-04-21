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
            @click="close"
          >
            <slot name="header">
              CLOSE
            </slot>
        </header>
        <section class="modal-body"
          :data-id="true"
          id="modalDescription"
        >
          <a @click="changeLeft()" class="nav-trigger"><i class="material-icons">keyboard_arrow_left</i></a>
          <div class="img-container">
            <img class="img" :src="url" alt="">
          </div>
          <a @click="changeRight()" class="nav-trigger"><i class="material-icons">keyboard_arrow_right</i></a>
        </section>
        <footer class="modal-footer" @click="removePicture" v-if="isEditable">
          <slot name="footer">
            <a class="remove-picture">REMOVE PICTURE </a>
          </slot>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'PictureModal',
    props: {
      url: String,
      isEditable : {
        type: Boolean, 
        default: false 
      } 
    },
    methods: {
      close(e) {
        if(!e.target.dataset.id)
          this.$emit('close');
      },
      changeLeft() {
        this.$emit('change-pic', -1);
      },
      changeRight() {
        this.$emit('change-pic', 1);
      },
      removePicture() {
        this.$emit('remove-pic'); 
        this.$emit('close');
      }
    },
  };
</script>

<style scoped>
  .img-container {
    display: flex; 
    flex-direction: row;
    justify-content: center;
    align-content: stretch;
    width: 100%;  
    height: 45vh; 
  }

  .img {
    height: auto; 
    width: 100%; 
    object-fit: contain;
  }

  .nav-trigger {
    display: table-cell; 
    text-align: center;
    vertical-align: middle;
    cursor: pointer; 
    transition: background-color 0.4s ease-in-out;
    box-sizing: border-box; 
    height: 100%; 
    width: 20%; 
  }

  .nav-trigger:hover {
    background-color : rgba(0, 0, 0, .3)
  }

  .modal-footer,
  .modal-header {
    text-align: center;
    padding: 15px;
    color: var(--default-button-color);
  }

  .modal-backdrop {
    z-index: 5 !important; 
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
    position: relative; 
    z-index: 9999; 
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
  }

  .modal-header {
    cursor: pointer; 
    border-bottom: 1px solid #eeeeee;
    transition: background-color 0.4s ease-in-out;
    justify-content: space-between;
  }

  .modal-header:hover {
    background-color : rgba(0, 0, 0, .3)
  }

  .modal-body {
    z-index: 3;
    display: table; 
    position: relative;
    padding: 20px 10px;
  }

  .remove-picture {
    display: block; 
    text-align: center; 
    cursor: pointer; 
    width: 100%;
    padding: 20px; 
    color: red; 
  }

  .modal-footer {
    cursor: pointer; 
    border-top: 1px solid #eeeeee;
    transition: background-color 0.4s ease-in-out;
    color: var(--default-button-color);
    justify-content: space-between;
  }

  .modal-footer:hover {
    background-color : rgba(0, 0, 0, .3)
  }
</style>