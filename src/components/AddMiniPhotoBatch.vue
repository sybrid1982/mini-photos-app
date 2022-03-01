<template>
    <div class='upload-box'>
        <form enctype="multipart/form-data" novalidate v-if="isInitial || isSaving">
            <h1>Upload images</h1>
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
    </div>
</template>

<script>
import { upload } from '../services/file-upload.service';

const STATUS_INITIAL = 0, STATUS_SAVING = 1, STATUS_SUCCESS = 2, STATUS_FAILED = 3;

export default {
  name: 'AddMiniPhotoBatch',
  data() {
      return {
          uploadedFiles:[],
          uploadedError: [],
          currentStatus: null,
          uploadFieldName: 'photos'
      }
  },
  methods: {
    onSubmitMiniature() {
      console.log("submit clicked");
    },
     reset() {
        // reset form to initial state
        this.currentStatus = STATUS_INITIAL;
        this.uploadedFiles = [];
        this.uploadError = null;
      },
      save(formData) {
        // upload data to the server
        this.currentStatus = STATUS_SAVING;

        upload(formData)
          .then(x => {
            this.uploadedFiles = [].concat(x);
            this.currentStatus = STATUS_SUCCESS;
          })
          .catch(err => {
            this.uploadError = err.response;
            this.currentStatus = STATUS_FAILED;
          });
      },
    filesChange(fieldName, files) {
      this.files = files;
      // maybe here we need to do logic about the files?
      const formData = new FormData();

      if(!files.length) return;

      Array
        .from(Array(files.length).keys())
        .map(x => {
            formData.append(fieldName, files[x], files[x].name)
        })
    
      this.save(formData);
    }
  },
  computed: {
    fileCount() {
      return this.files.length;
    },
    isInitial() {
        return this.currentStatus === STATUS_INITIAL
    },
    isSaving() {
        return this.currentStatus === STATUS_SAVING
    },
    isSuccess() {
        return this.currentStatus === STATUS_SUCCESS
    },
    isFailed() {
        return this.currentStatus === STATUS_FAILED
    }
  },
  mounted() {
      this.reset();
  }
}
</script>

<style>
  .dropbox {
    outline: 2px dashed grey; /* the dash box */
    outline-offset: -10px;
    background: lightcyan;
    color: dimgray;
    padding: 10px 10px;
    min-height: 200px; /* minimum height */
    position: relative;
    cursor: pointer;
  }

  .input-file {
    opacity: 0; /* invisible but it's there! */
    width: 100%;
    height: 200px;
    position: absolute;
    cursor: pointer;
  }

  .dropbox:hover {
    background: lightblue; /* when mouse over to the drop zone, change color */
  }

  .dropbox p {
    font-size: 1.2em;
    text-align: center;
    padding: 50px 0;
  }

  .upload-box {
    border: solid 1px black;
    height: 500px;
  }
</style>