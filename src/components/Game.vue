<template>
    <div class='game-display'>
        <md-dialog md-open-from="#fab" md-close-to="#fab" ref="dialog2">
            <create-mini-for-game-form @close="closeDialog('dialog2')" :gameId="game.id"></create-mini-for-game-form>
        </md-dialog>

        <div v-if="game.id" class="flex-row">
            <img v-bind:src="transformUrl(game.boxArtUrl)" class='image'>
            <div class='game-details'>
                <h3>Game: {{game.gameName}}</h3>
                <h4>Year Published: {{game.yearPublished}}</h4>
                <h4>Scale: {{game.scale}}</h4>
                <h4>Style: {{game.style}}</h4>
            </div>
        </div>
        <div v-if="minis.length > 0" class="mini-container">
            <Card
                v-for="mini in minis"
                :key="mini.id"
                :details="mini.miniName"
                :imgSrc="mini.miniName"
                @click="navigateToGame(game.id)"
            />
        </div>
        <md-button class="md-fab md-fab-bottom-right" id="fab" @click="openDialog('dialog2')">
            <md-icon>add</md-icon>
        </md-button>
    </div>
</template>

<script>
import { fetchGame } from '../services/games.service'
import { fetchMinisForGame } from '../services/minis.service'
import Card from './Card.vue'
import { transformUrl } from '../utility-scripts/transformurl';
import CreateMiniForGameForm from './CreateMiniForGame.vue';

export default {
  components: { Card, CreateMiniForGameForm },
  name: 'Game',
    created() {
    this.$watch(
        () => { 
            this.fetchData(this.$route.params.id) 
        })
    },
    methods: {
        fetchData(id) {
            fetchGame(id).then(result => this.game = result);
            // fetching minis should also include the filename of an image (first/priority)
            // need to change the object to include that?  Or new api?
            fetchMinisForGame(id).then(result => 
                {
                    this.minis = result;
                });
        },
        transformUrl,
        openDialog(ref) {
            console.log('opening')
            this.$refs[ref].open();
        },
        closeDialog(ref) {
            this.$refs[ref].close();
            this.fetchData(this.$route.params.id) 
        }
    },
    data() {
        return {
            game: {},
            minis: []
        }
    }
}
</script>
<style>
    .mini-container {
        display:flex;
        flex-direction: row;
        flex-wrap: wrap;
    }
    .flex-row {
        display: flex;
        flex-direction: row;
        background: #3ad;
        padding: 15px;
        border-bottom: 2px solid #333;
    }
    .game-details {
        padding-left: 25px;
        text-align: left;
        width: 100%;
    }
    .image {
        border: 1px solid #333;
        box-shadow: 5px 3px 6px #333;
    }
</style>