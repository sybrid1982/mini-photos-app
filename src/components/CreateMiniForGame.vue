<template>
    <div class="create-mini-form">
        <v-card class='padded'>
            <v-card-title class="centered">Add Mini</v-card-title>
            <div>
                <form enctype="multipart/form-data">
                    <v-text-field label="Mini Name" v-model="form.miniName" required></v-text-field>
                    <v-text-field label="Sculptor" v-model="form.sculptor"></v-text-field>
                    <v-menu
                        ref="menu"
                        v-model="menu"
                        :close-on-content-click="false"
                        :return-value.sync="form.completionDate"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                v-model="form.completionDate"
                                label="Completion Date"
                                prepend-icon="mdi-calendar"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                            ></v-text-field>
                        </template>
                        <v-date-picker
                        v-model="form.completionDate"
                        no-title
                        scrollable
                        >
                            <v-spacer></v-spacer>
                            <v-btn
                                text
                                color="primary"
                                @click="menu = false"
                            >
                                Cancel
                            </v-btn>
                            <v-btn
                                text
                                color="primary"
                                @click="$refs.menu.save(form.completionDate)"
                            >
                                OK
                            </v-btn>
                        </v-date-picker>
                    </v-menu>
                    <v-file-input 
                        label="Mini Photos" 
                        accept="image/*"
                        @change="selectImage"
                        small-chips
                        v-model="images"
                        ref="file" multiple></v-file-input>
                </form>
                <img class="preview-box" v-bind:src="previewImage"/>
            </div>
            <v-spacer class="space-down"></v-spacer>
            <v-card-actions>
                <v-btn color="blue lighten-3" :disabled="validateInputs()" @click="createMini()">Save</v-btn>
                <v-btn @click="close()">Cancel</v-btn>
            </v-card-actions>
        </v-card>
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
                date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            },
            images: [],
            currentImage: undefined,
            previewImage: undefined,
            loading: false,
            menu: false,
        }),
        methods: {
            validateInputs()
            {
                if(this.form.miniName?.length > 0) 
                {
                    return false;
                }
                return true;
            },
            selectImage()
            {
                if (!this.images || !this.images.length) {
                    this.currentImage = undefined;
                    this.previewImage = undefined;
                    return;
                }
                this.currentImage = this.images[0];
                this.previewImage = URL.createObjectURL(this.currentImage);
                // TODO: #3 show the preview image for adding mini photos
            },
            createMini()
            {
                this.loading = true;
                const mini = {
                    miniName: this.form.miniName,
                    sculptor: this.form.sculptor,
                    completionDate: this.form.completionDate,
                    gameId: this.gameId
                }
                createMiniForGame(mini).then(response => {
                    const miniPhotos = this.images;
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
<style scoped>
    .create-mini-form {
        width: 290px;
    }
    .create-mini-form v-dialog-title {
        text-align: center;
    }
    .padded {
        padding: 0px 15px;
    }
    .space-down {
        padding: 5px;
    }
    .preview-box {
        width: 80px;
    }
</style>