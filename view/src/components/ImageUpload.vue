<template>
   <div>
    <div class="pictures-container">
      <div class="picture-container" v-for="(picture,index) in this.reviewPictures" :key="index" @click="showModal">
          <img class="picture" :index="index" :src="picture" alt="">
          <div class="zoom-in" :index="index" ><i class="material-icons" :index="index">zoom_in</i></div>
      </div>
    </div>
    <PictureModal :url="this.reviewPictures[zoomedPic]" :isEditable="true"
                  @close="closeModal" @change-pic="this.changePic" @remove-pic="removeSelected"
                  v-show="modalVisible"/>
    <div class="container">
        <!--UPLOAD-->
        <form enctype="multipart/form-data" novalidate v-if="isInitial || isSaving">
            <h5 v-if="!singleUpload">Upload images</h5>
            <h5 v-else :class="{'white-text': !isBlack}" >Upload profile picture</h5>
            <div class="dropbox">
              <div v-if="singleUpload">
                <input type="file" :name="uploadFieldName" :disabled="isSaving" @change="filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length" accept="image/*" class="input-file">
              </div>
              <div v-else>
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
            <h5 :class="{'white-text': !isBlack}" >Uploaded successfully.</h5>
            <p>
            <a @click="reset(false)">Upload again</a>
            </p>
        </div>
        <!--FAILED-->
        <div v-if="isFailed">
            <h5 :class="{'white-text': !isBlack}" >Upload failed.</h5>
            <p>
            <a @click="reset(false)" >Try again</a>
            </p> 
            <pre :class="{'white-text': !isBlack}">{{ uploadError }}</pre>
        </div>
    </div>      
   </div>
</template>

<script>
// This Component Uploads Multiple Images to the Uploads folder found in the backend
import { mapGetters, mapActions, mapMutations} from 'vuex'; 
import axios from 'axios';
import PictureModal from '@/components/PictureModal'; 
const STATUS_INITIAL = 0, STATUS_SAVING = 1, STATUS_SUCCESS = 2, STATUS_FAILED = 3;
// const UPLOAD_ROUTE="/pictures/edit-review-pics"; 
const UPLOAD_ROUTE="/pictures/edit-review-pics"; 
export default {
    name: "ImageUpload",
    components: {
      PictureModal
    },
    data () {
        return {
            uploadError: null,
            currentStatus: null,
            uploadFieldName: 'photos',
            modalVisible: false,
            zoomedPic : 0 
        }
    },
    props: {
        isBlack: {
          type: Boolean,
          default: false 
        },
        singleUpload: Boolean, 
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
        return this.fetchUploadedPics();  
      }
    },
    methods: {
      ...mapGetters(['fetchUploadedPics']),
      ...mapActions(['removePicture','removeUnusedProfilePic']),
      ...mapMutations(['setUploadedPics', 'addUploadedPics']),
      //Hides submit button while uploading 
      toggleSubmit(value) {
        this.$emit('toggleSubmit', value)
      },
      // Resets image container to display initial images 
      reset(completeReset, pics) {
        if(completeReset) {
          this.setUploadedPics([]) 
          if(pics != undefined)
            this.setUploadedPics(pics);  
        }
        this.currentStatus = STATUS_INITIAL;
        this.uploadError = null;
      },
      //Uploads the pictures to the backend 
      async upload(formData) {
        return await axios.post(UPLOAD_ROUTE + `/${this.dest}`, formData, {headers: {'Content-Type': 'multipart/form-data' }})
            //set the data 
            .then(res => res.data)
            .then(res => res.map(img => Object.assign({}, 
                img, { url: `https://zarap.herokuapp.com/static/${this.dest}/${img.filename}` })))
            .catch(err => {
              this.uploadError = err;
              this.currentStatus = STATUS_FAILED;
            })
      },
      //Calls the server to save the pictures 
      save(formData) {
        this.currentStatus = STATUS_SAVING;   
        this.upload(formData)
          .then(x => { 
            let urls = x.map((item) => item.url);  
            this.addUploadedPics(urls); 
            this.currentStatus = STATUS_SUCCESS;
          })
          .catch(err => { 
            this.uploadError = "Server error in saving picture.";
            this.currentStatus = STATUS_FAILED;
            throw err; 
          });
      },
      //Gets the pictures in the form 
      filesChange(fieldName, fileList) {
        const formData = new FormData();
        //No files chosen or Pictures being uploaded is past 5 
        if (!fileList.length || (fileList.length + this.reviewPictures.length) > 5
            || ((fileList.length + this.reviewPictures.length) > 1) && this.singleUpload) {
          if(!fileList.length) {
            this.uploadError = "No Files Selected";
            this.currentStatus = STATUS_FAILED;
          }
          else if((fileList.length + this.reviewPictures.length) > 5) {
            this.uploadError = "Error. Max limit of 5 pictures.";
            this.currentStatus = STATUS_FAILED;
          }
          else if(((fileList.length + this.reviewPictures.length) > 1) && this.singleUpload) {
            this.uploadError = "Error. Only 1 picture allowed.";
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
      //Changes the picture displayed in the modal 
      changePic(direction) {
        this.zoomedPic = (((parseInt(this.zoomedPic) + parseInt(direction)) % this.reviewPictures.length)  + parseInt(this.reviewPictures.length)) % this.reviewPictures.length; 
      },
      //Removes the current picture in modal 
      async removeSelected() { 
        //Remove for single uploads
        let pic = this.reviewPictures[this.zoomedPic];
        if(this.singleUpload) {
          await this.removeUnusedProfilePic(pic)
        }
        //Remove for multiple uploads
        else { 
          await this.removePicture([pic]); 
        }   
      },
    },
    mounted() {
      //Set the pictures shown to the existing pictures from the review 
      this.setUploadedPics(this.existingPics);   
      this.reset(true); 
    }
}
</script>

<style scoped>

    .pictures-container {
        padding: 10px; 
    }

    .picture-container {
        position: relative; 
        z-index: 0; 
        cursor: pointer;
        outline: 2px dashed grey;
        height: 100px; 
        width: 100px; 
        display: inline-block; 
        margin-right: 20px; 
    }

    .picture-container:hover .picture{
        opacity: 0.3
    }

    .picture-container:hover .zoom-in{
        opacity: 1
    }

    .picture {
        z-index: 0; 
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
        width: 100%; 
        z-index: 0 !important; 
        outline: 2px dashed grey; /* the dash box */
        outline-offset: -10px;
        background: lightcyan;
        color: dimgray;
        padding: 10px 10px;
        min-height: 50px; /* minimum height */
        cursor: pointer;
    }
  
    .input-file {
        opacity: 0; /* invisible but it's there! */
        width: 60%;
        height: 100px;
        cursor: pointer;
        position: absolute; 
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