<template>
    <div class="create-game-form">
        <md-dialog-title>Add Mini</md-dialog-title>
        <form enctype="multipart/form-data">
            <md-input-container md-inline>
                <label>Mini Name</label>
                <md-input v-model="form.miniName" required></md-input>
            </md-input-container>
            <md-input-container md-inline>
                <label>Sculptor</label>
                <md-input v-model="form.sculptor"></md-input>
            </md-input-container>
            <md-input-container md-inline>
                <label>Completion Date</label>
                <md-input v-model="form.completionDate"></md-input>
            </md-input-container>
            <md-input-container>
                <label>Mini Photos</label>
                <input type="file" accept="image/*" @change="selectImage" ref="file" capture="environment" multiple>
            </md-input-container>
            <md-button :disabled="validateInputs()" @click="createMini()">Save</md-button>
            <md-button @click="close()">Cancel</md-button>
        </form>
        <loading-modal v-if="loading"></loading-modal>
    </div>
</template>
<script>
    import { createMiniForGame } from '../services/minis.service';
    import { upload } from '../services/file-upload.service';
    import LoadingModal from './LoadingModal.vue'

    export default {
        name: 'CreateMiniForGameForm',
        components: { LoadingModal },
        props: ['gameId'],
        data: () => ({
            form: {
                miniName: "",
                sculptor: "",
                completionDate: "",
            },
            currentImage: undefined,
            previewImage: undefined,
            loading: false
        }),
        methods: {
            validateInputs()
            {
                if(this.form.miniName.length > 0) 
                {
                    return false;
                }
                return true;
            },
            selectImage()
            {
                this.currentImage = this.$refs.file.files.item(0);
                this.previewImage = URL.createObjectURL(this.currentImage);
                // TODO: #3 show the preview image for adding mini photos
            },
            createMini()
            {
                this.loading = true;
                let completionDateDate
                if(this.form.completionDate.length == 0) {
                    completionDateDate = new Date(); 
                } else {
                    completionDateDate = new Date(this.form.completionDate)
                }
                const mini = {
                    miniName: this.form.miniName,
                    sculptor: this.form.sculptor,
                    completionDate: completionDateDate,
                    gameId: this.gameId
                }
                createMiniForGame(mini).then(response => {
                    const miniPhotos = this.$refs.file.files;
                    if(miniPhotos.length) {
                        for(let i = 0; i < miniPhotos.length; i++) 
                        {
                            let file = miniPhotos.item(i)
                            let formData = new FormData();
                            formData.append("file", file);
                            upload(formData, '/minis/photo/' + response.id)
                        }
                    }
                })
                this.close();
            },
            close()
            {
                this.form = {
                    gameName: "",
                    yearPublished: "",
                    style: "",
                    scale: ""
                }
                this.loading = false;
                this.$emit('close');
            }
        }
    }
</script>
<style>
    .create-game-form {
        width: 270px;
        padding: 20px;
        margin: 20px;
        border: 1px solid black;
        border-radius: 4px;
    }
    .create-game-form md-dialog-title {
        text-align: center;
    }
    .short {
        width: 150px;
    }
</style>