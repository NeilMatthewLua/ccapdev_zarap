<template>
   <div class="container">
        <!--UPLOAD-->
        <form enctype="multipart/form-data" novalidate v-if="isInitial || isSaving">
            <h5>Upload images</h5>
            <div class="dropbox">
            <input type="file" multiple :name="uploadFieldName" :disabled="isSaving" @change="filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length"
                accept="image/*" class="input-file">
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
            <ul class="list-unstyled">
            <!-- <li v-for="item in uploadedFiles" :key="item.id">
                <img :src="require(`@/${item.path}`)" class="img-responsive img-thumbnail" :alt="item.originalName">
            </li> -->
            </ul>
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
    name: "FileUpload",
    data () {
        return {
            uploadedFiles: [],
            uploadError: null,
            currentStatus: null,
            uploadFieldName: 'photos'
        }
    }, 
    computed: {
      isInitial() {
        return this.currentStatus === STATUS_INITIAL;
      },
      isSaving() {
        return this.currentStatus === STATUS_SAVING;
      },
      isSuccess() {
        return this.currentStatus === STATUS_SUCCESS;
      },
      isFailed() {
        return this.currentStatus === STATUS_FAILED;
      }
    },
    methods: {
      reset() {
        // reset form to initial state
        this.currentStatus = STATUS_INITIAL;
        this.uploadedFiles = [];
        this.uploadError = null;
      },
      async upload(formData) {
        return await axios.post(UPLOAD_ROUTE, formData, {headers: {'Content-Type': 'multipart/form-data' }})
            // get data
            .then(x => x.data)
            .then(x => x.map(img => Object.assign({},
                img, { url: `http://localhost:9090/pictures/${img.id}` })))
      },
      save(formData) {
        // upload data to the server
        this.currentStatus = STATUS_SAVING; 
        let app = this; 
        this.upload(formData)
          // .then(wait(1500)) // DEV ONLY: wait for 1.5s 
          .then(x => {
            app.uploadedFiles = [].concat(x);
            console.log(app.uploadedFiles);
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
    },
    mounted() {
      this.reset();
    },
}
</script>

<style scoped>
    .dropbox {
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

    .img-responsive {
        height: 20px;
        display: inline-block; 
    }
</style>