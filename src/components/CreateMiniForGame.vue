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
    </div>
</template>
<script>
    import { createMiniForGame } from '../services/minis.service';
    import { upload } from '../services/file-upload.service';

    export default {
        name: 'CreateMiniForGameForm',
        props: ['gameId'],
        data: () => ({
            form: {
                miniName: "",
                sculptor: "",
                completionDate: "",
            },
            currentImage: undefined,
            previewImage: undefined,
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
                this.$emit('close');
            }
        }
    }
</script>
<style>
    .create-game-form {
        width: 500px;
        padding: 20px;
        margin: 20px;
        border: 1px solid black;
        border-radius: 4px;
    }
    .short {
        width: 150px;
    }
</style>