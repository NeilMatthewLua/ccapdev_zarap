<template>
   <div>
     <div class="pictures-container">
        <div class="picture-container" v-for="(picture,index) in this.reviewPictures" :key="index" @click="showModal">
            <img class="picture" :index="index" :src="picture" alt="">
            <div class="zoom-in" :index="index" ><i class="material-icons" :index="index">zoom_in</i></div>
        </div>
      </div>
      <PictureModal :url="this.reviewPictures[zoomedPic]" :isEditable="true"
                    @close="closeModal" @change-pic="this.changePic" @remove-pic="removePicture"
                    v-show="modalVisible"/>
    <div class="container">
        <!--UPLOAD-->
        <form enctype="multipart/form-data" novalidate v-if="isInitial || isSaving">
            <h5>Upload images</h5>
            <div class="dropbox">
            <div>
              <input type="file" multiple :name="uploadFieldName" :disabled="isSaving" @change="filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length" accept="image/*" class="input-file">
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
            <h5>Uploaded successfully.</h5>
            <p>
            <a @click="reset(false)">Upload again</a>
            </p>
        </div>
        <!--FAILED-->
        <div v-if="isFailed">
            <h5>Upload failed.</h5>
            <p>
            <a @click="reset(false)">Try again</a>
            </p>
            <pre>{{ uploadError }}</pre>
        </div>
    </div>      
   </div>
</template>

<script>
// This Component Uploads Multiple Images to the Uploads folder found in the backend
import axios from 'axios';
import PictureModal from '@/components/PictureModal'; 
const STATUS_INITIAL = 0, STATUS_SAVING = 1, STATUS_SUCCESS = 2, STATUS_FAILED = 3;
const UPLOAD_ROUTE="http://localhost:9090/pictures/edit-review-pics"; 
export default {
    name: "ImageUpload",
    components: {
      PictureModal
    },
    data () {
        return {
            uploadedFiles: [],
            uploadError: null,
            currentStatus: null,
            uploadFieldName: 'photos',
            modalVisible: false,
            zoomedPic : 0 
        }
    },
    props: {
        existingPics: Array, 
        dest: String, //Directory to save the image to 
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
      },
      reviewPictures() {
        return this.uploadedFiles.map((item) => item); 
      }
    },
    methods: {
      toggleSubmit(value) {
        this.$emit('toggleSubmit', value)
      },
      reset(completeReset) {
        // reset form to initial state
        if(completeReset) {
          this.uploadedFiles = []; 
          this.uploadedFiles = this.existingPics.map((item) => item); 
        }
        this.currentStatus = STATUS_INITIAL;
        this.uploadError = null;
      },
      async upload(formData) {
        return await axios.post(UPLOAD_ROUTE + `/${this.dest}`, formData, {headers: {'Content-Type': 'multipart/form-data' }})
            // get data
            .then(res => res.data)
            .then(res => res.map(img => Object.assign({}, 
                img, { url: `http://localhost:9090/static/${this.dest}/${img.filename}` })))
            .catch(err => {
              this.uploadError = err;
              this.currentStatus = STATUS_FAILED;
            })
      },
      save(formData) {
        // upload data to the server
        this.currentStatus = STATUS_SAVING; 
        let app = this; 
        this.upload(formData)
          .then(x => { 
            let urls = x.map((item) => item.url); 
            app.uploadedFiles = app.uploadedFiles.concat(urls); 
            this.$emit('file-upload', this.uploadedFiles); //Send uploaded files to parent
            this.currentStatus = STATUS_SUCCESS;
          })
          .catch(err => {
            console.log(err); 
            this.uploadError = "Server error in saving picture.";
            this.currentStatus = STATUS_FAILED;
          });
      },
      filesChange(fieldName, fileList) {
        // handle file changes
        const formData = new FormData();
        //No files chosen or Pictures being uploaded is past 5 
        if (!fileList.length || (fileList.length + this.reviewPictures.length) > 5) {
          if(!fileList.length) {
            this.uploadError = "No Files Selected";
            this.currentStatus = STATUS_FAILED;
          }
          if((fileList.length + this.reviewPictures.length) > 5) {
            this.uploadError = "Error. Max limit of 5 pictures.";
            this.currentStatus = STATUS_FAILED;
          }
          return; 
        }
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
        this.zoomedPic = (((parseInt(this.zoomedPic) + parseInt(direction)) % this.reviewPictures.length)  + parseInt(this.reviewPictures.length)) % this.reviewPictures.length; 
      },
      removePicture() {
        this.uploadedFiles.splice(this.zoomedPic,1); 
        this.$emit('file-upload', this.uploadedFiles); 
      }
    },
    mounted() {
      this.uploadedFiles = this.existingPics;  
      this.reset(); 
    }
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

    .dropbox {
        z-index: 0 !important; 
        outline: 2px dashed grey; /* the dash box */
        outline-offset: -10px;
        background: lightcyan;
        color: dimgray;
        padding: 10px 10px;
        min-height: 50px; /* minimum height */
        position: relative;
        cursor: pointer;
    }
  
    .input-file {
        opacity: 0; /* invisible but it's there! */
        width: 100%;
        height: 50px;
        position: absolute;
        cursor: pointer;
    }
  
    .dropbox:hover {
        background: lightblue; /* when mouse over to the drop zone, change color */
    }
    
    .dropbox p {
        font-size: 1.2em;
        text-align: center;
        padding: 10px 0;
    }
  
</style>