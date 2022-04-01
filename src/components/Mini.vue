<template>
    <div class='mini-display'>
        <v-dialog :fullscreen="$vuetify.breakpoint.xsOnly" width="auto" ref="game-form">
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                    color="red lighten-2"
                    fab
                    dark
                    absolute
                    style="bottom: 16px;"
                    right
                    v-bind="attrs"
                    v-on="on"
                    >
                        <v-icon>mdi-plus</v-icon>
                </v-btn>
            </template>
            <v-card>
                <v-card-title>Add Photo for {{mini.miniName}}</v-card-title>
                <div class="input-container">
                    <label for="file">Mini Photos</label>
                    <input type="file" accept="image/*" @change="selectImage" ref="file" multiple>
                </div>
                <v-btn :disabled="hasAPhotoSelected()" @click="addPhotosToMini()">Add Photo</v-btn>
            </v-card>
        </v-dialog>
        <div v-if="mini.id" class="flex-row">
            <h1>{{mini.miniName}}</h1>
            <div class='mini-details'>
                <h3>Sculptor: {{mini.sculptor}}</h3>
                <h3>Completion Date: {{mini.completionDate}}</h3>
            </div>
        </div>
        <div v-if="mini.fileNames.length > 0" class="photo-row">
            <img v-for="photo in mini.fileNames" :key=photo v-bind:src="transformUrl(photo)" class="image">
        </div>
        <loading-modal v-if="loading"></loading-modal>
    </div>
</template>

<script>
import { fetchMiniById } from '../services/minis.service';
import { transformUrl } from '../utility-scripts/transformurl';
import { upload } from '../services/file-upload.service';

export default {
    components: {},
    name: 'Mini',
    data() {
        return { 
            mini: {},
            currentImage: undefined,
            previewImage: undefined,
            loading: false
        }
    },
    created() {
        this.$watch(() => { this.fetchData(this.$route.params.id) })
    },
    methods: {
        fetchData(miniId) {
            fetchMiniById(miniId).then(mini => this.mini = mini)
        },
        transformUrl(uri) {
            return transformUrl(uri);
        },
        selectImage()
        {
            this.currentImage = this.$refs.file.files.item(0);
            this.previewImage = URL.createObjectURL(this.currentImage);
            // TODO: #3 show the preview image for adding mini photos
        },
        openDialog(ref) {
            this.$refs[ref].open();
        },
        closeDialog(ref) {
            this.$refs[ref].close();
        },
        addPhotosToMini() {
            const miniPhotos = this.$refs.file.files;
            if(miniPhotos.length) {
                this.loading = true;
                for(let i = 0; i < miniPhotos.length; i++) 
                {
                    let file = miniPhotos.item(i)
                    let formData = new FormData();
                    formData.append("file", file);
                    upload(formData, '/minis/photo/' + this.mini.id).then(() => { this.loading = false; })
                }
            }
        },
        hasAPhotoSelected() {
            if (!this.$refs) return false;
            if (!this.$refs.file) return false;
            if (!this.$refs.file.files) return false;
            return this.$refs.file.files.length > 0;
        }
    }
}
</script>
<style scoped>
.photo-row {
    display: flex;
    flex-direction: row;
    padding: 15px;
    flex-wrap: wrap;
}
.photo-row img.image {
    max-width: 250px;
    margin: 10px;
    box-shadow: 5px 3px 6px #333;
}
.modal-box {
    display: block;
    width: 300px;
    height: 200px;
    border-radius: 4px;
}
.input-container {
    padding: 14px;
}

h2 {
    text-align: center;
    border-bottom: 1px solid lightgray;
    padding-bottom: 14px;
    margin-bottom: 5px;
}
.short {
    width: 250px !important;
}
</style>