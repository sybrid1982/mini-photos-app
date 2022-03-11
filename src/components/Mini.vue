<template>
    <div class='mini-display'>
        <!-- <md-dialog md-open-from="#fab" md-close-to="#fab" ref="dialog2">
            <create-mini-for-game-form @close="closeDialog('dialog2')" :gameId="game.id"></create-mini-for-game-form>
        </md-dialog> -->
        <div v-if="mini.id" class="flex-row">
            <h1>{{mini.miniName}}</h1>
            <div class='mini-details'>
                <h3>Sculptor: {{mini.sculptor}}</h3>
                <h3>Completion Date: {{mini.completionDate}}</h3>
            </div>
        </div>
        <div v-if="mini.fileNames.length > 0" class="photo-row">
            <img  v-for="photo in mini.fileNames" :key=photo v-bind:src="transformUrl(photo)">
        </div>
        <!-- <md-button class="md-fab md-fab-bottom-right" id="fab" @click="openDialog('dialog2')">
            <md-icon>add</md-icon>
        </md-button> -->
    </div>
</template>

<script>
import { fetchMiniById } from '../services/minis.service';
import { transformUrl } from '../utility-scripts/transformurl';

export default {
    components: {},
    name: 'Mini',
    data() {
        return { mini: {} }
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
        }
    }
}
</script>

<style>

</style>