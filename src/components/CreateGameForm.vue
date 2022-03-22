<template>
    <div class="create-game-form">
        <md-dialog-title>Add Game</md-dialog-title>
        <form enctype="multipart/form-data">
            <md-input-container md-inline>
                <label>Game Name</label>
                <md-input v-model="form.gameName" maximum-scale=1 required></md-input>
            </md-input-container>
            <md-input-container md-inline>
                <label>Year Published</label>
                <md-input v-model="form.yearPublished" maximum-scale=1 required></md-input>
            </md-input-container>
            <md-input-container md-inline>
                <label>Style</label>
                <md-input v-model="form.style" maximum-scale=1 required></md-input>
            </md-input-container>
            <md-input-container md-inline>
                <label>Scale</label>
                <md-input v-model="form.scale" maximum-scale=1 required></md-input>
            </md-input-container>
            <md-input-container>
                <label>Box Art</label>
                <input type="file" accept="image/*" @change="selectImage" ref="file">
            </md-input-container>
            <md-button :disabled="validateInputs()" @click="createGame()" class='save-button'>Save</md-button>
            <md-button @click="close()">Cancel</md-button>
        </form>
        <loading-modal v-if="loading"></loading-modal>
    </div>
</template>
<script>
    import { postGame } from '../services/games.service';
    import { upload } from '../services/file-upload.service';
    import LoadingModal from './LoadingModal.vue';

    export default {
        name: 'CreateGameForm',
        components: { LoadingModal },
        data: () => ({
            form: {
                gameName: "",
                yearPublished: "",
                style: "",
                scale: ""
            },
            boxArt: null,
            currentImage: undefined,
            previewImage: undefined,
            loading: false
        }),
        methods: {
            validateInputs()
            {
                if(this.form.gameName.length > 0 && 
                    this.form.yearPublished.length > 0 &&
                    this.form.yearPublished.length < 5 &&
                    Number(this.form.yearPublished) == this.form.yearPublished &&
                    this.form.style.length > 0 &&
                    this.form.scale.length > 0) 
                {
                    return false;
                }
                return true;
            },
            selectImage()
            {
                this.currentImage = this.$refs.file.files.item(0);
                this.previewImage = URL.createObjectURL(this.currentImage);
                // TODO: #4 show the preview image for adding box art to game
            },
            createGame()
            {
                this.loading = true;
                if(this.currentImage) {
                    let formData = new FormData();
                    formData.append("file", this.currentImage);
                    upload(formData, '/games/photo').then(
                        response => {
                            const filename = response.data.fileURL;
                            postGame(this.form, filename).then(() => {this.loading = false})
                            this.close();
                        }
                    );
                } else {
                    postGame(this.form, '').then(() => {this.loading = false});
                    this.close();
                }
            },
            close()
            {
                this.form = {
                    gameName: "",
                    yearPublished: "",
                    style: "",
                    scale: ""
                }
                this.boxArt = null;
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