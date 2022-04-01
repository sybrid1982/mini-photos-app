<template>
    <div class='mini-display'>
        <v-dialog :fullscreen="$vuetify.breakpoint.xsOnly" width="auto" v-model="dialog">
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                    color="red lighten-1"
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
            <v-card class="add-photo-modal">
                <v-card-title>Add Photo for {{mini.miniName}}</v-card-title>
                <v-file-input 
                    label="Mini Photos" 
                    accept="image/*"
                    @change="selectImage"
                    small-chips
                    v-model="images"
                    ref="file" multiple></v-file-input>
                <img class="preview-box" v-bind:src="previewImage"/>
                <v-spacer></v-spacer>
                <v-card-actions>
                    <v-btn color="blue lighten-3" :disabled="!hasAPhotoSelected()" @click="addPhotosToMini()">Add Photo</v-btn>
                    <v-btn @click="closeDialog()">Cancel</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <div v-if="mini.id" class="flex-row">
            <h1>{{mini.miniName}}</h1>
            <div class='mini-details'>
                <h3>Sculptor: {{mini.sculptor}}</h3>
                <h3>Completion Date: {{mini.completionDate}}</h3>
            </div>
        </div>
        <div v-if="mini && mini.fileNames && mini.fileNames.length > 0" class="photo-row">
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
            loading: false,
            images: [],
            dialog: false
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
            if(!this.images || !this.images.length) {
                this.currentImage = undefined;
                this.previewImage = undefined;
                return;
            }
            this.currentImage = this.images[0];
            this.previewImage = URL.createObjectURL(this.currentImage);
            // TODO: #3 show the preview image for adding mini photos
        },
        closeDialog() {
            this.dialog = false;
            this.images = [];
            this.currentImage = undefined;
            this.previewImage = undefined;
        },
        addPhotosToMini() {
            const miniPhotos = this.images;
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
            this.closeDialog();
        },
        hasAPhotoSelected() {
            if (!this.images) return false;
            return this.images.length > 0;
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
.add-photo-modal {
    width: 300px;
    padding: 0 15px;
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
.preview-box {
    width: 80px;
}
</style>