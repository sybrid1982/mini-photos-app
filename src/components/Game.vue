<template>
    <div class='game-display'>
        <v-dialog :fullscreen="$vuetify.breakpoint.xsOnly" width="auto" ref="game-form">
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                    color="red lighten-2"
                    fab
                    dark
                    absolute
                    right
                    v-bind="attrs"
                    v-on="on"
                    style="bottom: 16px;"
                    >
                        <v-icon>mdi-plus</v-icon>
                </v-btn>
            </template>
            <create-mini-for-game-form @close="closeDialog('dialog2')" :gameId="game.id"></create-mini-for-game-form>
        </v-dialog>

        <div v-if="game.id && game.id > 0" class="flex-row">
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
                :imgSrc="mini.coverPhoto"
                @click="navigateToMini(mini.id)"
            />
        </div>
        <loading-modal v-if="loading"></loading-modal>
    </div>
</template>

<script>
import { fetchGame } from '../services/games.service'
import { fetchMinisForGame } from '../services/minis.service'
import Card from './Card.vue'
import { transformUrl } from '../utility-scripts/transformurl';
import CreateMiniForGameForm from './CreateMiniForGame.vue';
import LoadingModal from './LoadingModal.vue'

export default {
  components: { Card, CreateMiniForGameForm, LoadingModal },
  name: 'Game',
    created() {
        this.$watch(() => { this.fetchData(this.$route.params.id) })
    },
    methods: {
        fetchData(id) {
            this.loading = true;
            fetchGame(id).then(response => 
                {
                    this.processGame(response)
                    this.loading = false;   
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
        },
        navigateToMini(miniId) {
            this.$router.push(`/mini/${miniId}`)
        },
        processGame(response) {
            if (response && response.id) {
                this.game = response;
                fetchMinisForGame(this.game.id).then(minis => this.processMinisForGame(minis));
            } else {
                // we didn't get a game back
                // TODO: #5 404 page?
                this.game = {
                    id: -1,
                    gameName: "404",
                    boxArtUrl: ""
                }
                this.minis = [];
            }
        },
        processMinisForGame(minis) {
            this.minis = minis.map((mini) => {
                const coverPhoto = mini.fileNames.length ? mini.fileNames[0] : '';
                return {...mini, coverPhoto: this.transformUrl(coverPhoto)}
            })
        }
    },
    data() {
        return {
            game: {},
            minis: [],
            loading: false
        }
    }
}
</script>
<style scoped>
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
        max-height: 300px;
    }
</style>