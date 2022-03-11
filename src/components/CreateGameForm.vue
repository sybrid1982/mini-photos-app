<template>
    <div class="create-game-form">
        <md-dialog-title>Add Game</md-dialog-title>
        <form enctype="multipart/form-data">
            <md-input-container md-inline>
                <label>Game Name</label>
                <md-input v-model="form.gameName" required></md-input>
            </md-input-container>
            <md-input-container md-inline>
                <label>Year Published</label>
                <md-input v-model="form.yearPublished" required></md-input>
            </md-input-container>
            <md-input-container md-inline>
                <label>Style</label>
                <md-input v-model="form.style" required></md-input>
            </md-input-container>
            <md-input-container md-inline>
                <label>Scale</label>
                <md-input v-model="form.scale" required></md-input>
            </md-input-container>
            <md-input-container>
                <label>Box Art</label>
                <input type="file" @change="selectImage" ref="file">
            </md-input-container>
            <md-button :disabled="validateInputs()" @click="createGame()">Save</md-button>
            <md-button @click="close()">Cancel</md-button>
        </form>
    </div>
</template>
<script>
    import { postGame } from '../services/games.service';
    import { upload } from '../services/file-upload.service';

    export default {
        name: 'CreateGameForm',
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
        }),
        methods: {
            validateInputs()
            {
                if(this.form.gameName.length > 0 && 
                    this.form.yearPublished.length > 0 &&
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
                if(this.currentImage) {
                    let formData = new FormData();
                    formData.append("file", this.currentImage);
                    upload(formData, '/games/photo').then(
                        response => {
                            console.log(response);
                            const filename = response.data.fileName.split('Images/')[1];
                            postGame(this.form, filename)
                        }
                    );
                } else {
                    postGame(this.form, '');
                }
                close();
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