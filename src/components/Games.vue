<template>
    <div>
        <v-dialog :fullscreen="$vuetify.breakpoint.xsOnly" width="auto" v-model="dialog">
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                    color="red lighten-2"
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
            <create-game-form @close="closeDialog()"></create-game-form>
        </v-dialog>
        <div class='games-display'>
            <Card
                v-for="game in games"
                :key="game.id"
                :details="game.gameName"
                :imgSrc="transformUrl(game.boxArtUrl)"
                @click="navigateToGame(game.id)"
            />
        </div>
        <loading-modal v-if="loading"></loading-modal>
    </div>
</template>

<script>
import Card from './Card.vue'
import CreateGameForm from './CreateGameForm.vue'
import { fetchGames } from '../services/games.service';
import { transformUrl } from '../utility-scripts/transformurl';
import LoadingModal from './LoadingModal.vue';

export default {
  components: { Card, CreateGameForm, LoadingModal },
  name: 'Games',
  created() {
    this.$watch(
        () => { 
            this.fetchData() 
        }
    )
  },
  methods: {
    fetchData() {
        this.loading = true;
        fetchGames().then(result => {
            this.loading = false;
            this.games = result
        })
    },
    navigateToGame(event)
    {
        this.$router.push(`games/${event}`)
    },
    transformUrl,
    closeDialog() {
        this.dialog = false;
    }
  },
  data() {
      return {
          games: [],
          loading: false,
          dialog: false
      }
  }
}
</script>
<style scoped>
    .games-display {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }
</style>