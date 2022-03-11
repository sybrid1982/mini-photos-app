<template>
    <div>
        <md-dialog md-open-from="#fab" md-close-to="#fab" ref="dialog2">
            <create-game-form @close="closeDialog('dialog2')"></create-game-form>
        </md-dialog>
        <div class='games-display'>
            <Card
                v-for="game in games"
                :key="game.id"
                :details="game.gameName"
                :imgSrc="transformUrl(game.boxArtUrl)"
                @click="navigateToGame(game.id)"
            />
            <md-button class="md-fab md-fab-bottom-right" id="fab" @click="openDialog('dialog2')">
                <md-icon>add</md-icon>
            </md-button>
        </div>
    </div>
</template>

<script>
import Card from './Card.vue'
import CreateGameForm from './CreateGameForm.vue'
import { fetchGames } from '../services/games.service';
import { transformUrl } from '../utility-scripts/transformurl';

export default {
  components: { Card, CreateGameForm },
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
        fetchGames().then(result => this.games = result)
    },
    navigateToGame(event)
    {
        this.$router.push(`games/${event}`)
    },
    transformUrl,
    openDialog(ref) {
        this.$refs[ref].open();
    },
    closeDialog(ref) {
        this.$refs[ref].close();
    }
  },
  data() {
      return {
          games: []
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