<template>
    <div>
        <v-card class='padded'>
            <v-card-title>Add Game</v-card-title>
            <form enctype="multipart/form-data">
                <v-text-field label="Game Name" v-model="form.gameName" required></v-text-field>
                <v-text-field label="Year Published" v-model="form.yearPublished" required></v-text-field>
                <v-text-field label="Style" v-model="form.style" required></v-text-field>
                <v-text-field label="Scale" v-model="form.scale" required></v-text-field>
                <input type="file" accept="image/*" @change="selectImage" ref="file">
                <v-spacer class="space-down"></v-spacer>
                <v-card-actions>
                    <v-btn :disabled="validateInputs()" @click="createGame()" class='save-button'>Save</v-btn>
                    <v-btn @click="close()">Cancel</v-btn>
                </v-card-actions>
            </form>
        </v-card>
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
            loading: false,
            menu: false
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
<style scoped>
    .create-game-form {
        width: 270px;
        padding: 20px;
        margin: 20px;
        border: 1px solid black;
        border-radius: 4px;
    }
    .padded {
        padding: 0px 15px;
    }
    .create-game-form v-dialog-title {
        text-align: center;
    }

    .short {
        width: 150px;
    }
</style>