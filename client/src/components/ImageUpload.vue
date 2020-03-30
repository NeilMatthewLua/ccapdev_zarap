<template>
   <div>
     <div class="pictures-container">
        <div class="picture-container" v-for="(picture,index) in existingPics" :key="index" @click="showModal">
            <img class="picture" :index="index" :src="picture" alt="">
            <div class="zoom-in" :index="index" ><i class="material-icons" :index="index">zoom_in</i></div>
        </div>
      </div>
      <PictureModal :url="this.reviewPics[zoomedPic]" :isEditable="true"
                    @close="closeModal()" @change-pic="this.changePic"
                    v-show="modalVisible"/>
   </div>
   <!-- <div class="container"> -->
        <!--UPLOAD-->
        <form enctype="multipart/form-data" novalidate v-if="isInitial || isSaving">
            <h5 v-if="isMultiple">Upload images</h5>
            <h5 v-else :class="{'white-text': !isBlack}" >Upload profile picture</h5>
            <div class="dropbox">
            <div v-if="isMultiple">
              <input type="file" multiple :name="uploadFieldName" :disabled="isSaving" @change="filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length" accept="image/*" class="input-file">
            </div>
            <div v-else>
              <input type="file" :name="uploadFieldName" :disabled="isSaving" @change="filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length" accept="image/*" class="input-file">
            </div>
                <p v-if="isInitial">
                Drag your file(s) here to begin<br> or click to browse
                </p>
                <p v-if="isSaving">
                Uploading {{ fileCount }} files...
                </p>
            </div>
        </form>
        <!--SUCCESS-->
        <div v-if="isSuccess">
            <h5>Uploaded {{ uploadedFiles.length }} file(s) successfully.</h5>
            <p>
            <a href="javascript:void(0)" @click="reset()">Upload again</a>
            </p>
            
        </div>
        <!--FAILED-->
        <div v-if="isFailed">
            <h5>Upload failed.</h5>
            <p>
            <a href="javascript:void(0)" @click="reset()">Try again</a>
            </p>
            <pre>{{ uploadError }}</pre>
        </div>
    </div>      
</template>

<script>
// This Component Uploads Multiple Images to the Uploads folder found in the backend
import axios from 'axios';

const STATUS_INITIAL = 0, STATUS_SAVING = 1, STATUS_SUCCESS = 2, STATUS_FAILED = 3;
const UPLOAD_ROUTE="http://localhost:9090/pictures/upload-multiple"; 
export default {
    name: "ImageUpload",
    data () {
        return {
            uploadedFiles: [],
            uploadError: null,
            currentStatus: null,
            uploadFieldName: 'photos',
            zoomedPic : 0 
        }
    }, 
    props: {
        existingPics: Array, 
        dest: String, //Directory to save the image to 
        isMultiple: Boolean,
        isBlack: Boolean
    },
    computed: {
      isInitial() {
        this.toggleSubmit(true)
        return this.currentStatus === STATUS_INITIAL;
      },
      isSaving() {
        this.toggleSubmit(false)
        return this.currentStatus === STATUS_SAVING;
      },
      isSuccess() {
        this.toggleSubmit(true)
        return this.currentStatus === STATUS_SUCCESS;
      },
      isFailed() {
        return this.currentStatus === STATUS_FAILED;
      }
    },
    methods: {
      toggleSubmit(value) {
        this.$emit('toggleSubmit', value)
      },
      reset() {
        // reset form to initial state
        this.currentStatus = STATUS_INITIAL;
        this.uploadedFiles = [];
        this.uploadError = null;
      },
      async upload(formData) {
        return await axios.post(UPLOAD_ROUTE + `/${this.dest}`, formData, {headers: {'Content-Type': 'multipart/form-data' }})
            // get data
            .then(x => x.data)
            .then(x => x.map(img => Object.assign({}, 
                img, { url: `http://localhost:9090/static/${this.dest}/${img.filename}` })))
      },
      save(formData) {
        // upload data to the server
        this.currentStatus = STATUS_SAVING; 
        let app = this; 
        this.upload(formData)
          .then(x => {
            app.uploadedFiles = [].concat(x);
            // console.log(app.uploadedFiles);
            console.log(this.uploadedFiles)
            this.$emit('file-upload', this.uploadedFiles); //Send uploaded files to parent
            this.currentStatus = STATUS_SUCCESS;
          })
          .catch(err => {
            console.log(err);
            this.uploadError = err.response;
            this.currentStatus = STATUS_FAILED;
          });
      },
      filesChange(fieldName, fileList) {
        // handle file changes
        const formData = new FormData();
        if (!fileList.length) return;
        // append the files to FormData
        Array
          .from(Array(fileList.length).keys())
          .map(x => {
            formData.append(fieldName, fileList[x], fileList[x].name);
          });
        // save it
        this.save(formData);
      },
      showModal(e) {
            this.modalVisible = true; 
            this.zoomedPic = e.target.getAttribute('index'); 
        },
      closeModal() {
          this.modalVisible = false; 
      },
      changePic(direction) {
          this.zoomedPic = ((parseInt(this.zoomedPic) + parseInt(direction)) % this.reviewPics.length 
          + parseInt(this.reviewPics.length)) % this.reviewPics.length; 
      }
    },
    mounted() {
      this.reset();
    },
}
</script>

<style scoped>
    
  
    .input-file {
        opacity: 0; /* invisible but it's there! */
        width: 100%;
        height: 50px;
        position: absolute;
        cursor: pointer;
    }

    .pictures-container {
        padding: 10px; 
    }

    .picture-container {
        cursor: pointer;
        outline: 2px dashed grey;
        height: 100px; 
        width: 100px; 
        display: inline-block; 
        position: relative;
        margin-right: 20px; 
    }

    .picture-container:hover .picture{
        opacity: 0.3
    }

    .picture-container:hover .zoom-in{
        opacity: 1
    }

    .picture {
        opacity: 1;
        height: 100px; 
        width: 100px; 
        transition: .5s ease;
        backface-visibility: hidden;
    }

    .zoom-in {
        font-size: 24px; 
        transition: .5s ease;
        opacity: 0;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        text-align: center;
    }

  
</style>