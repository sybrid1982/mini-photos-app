<template>
    <div class='mini-display'>
        <!-- <md-dialog md-open-from="#fab" md-close-to="#fab" ref="dialog2">
            <create-mini-for-game-form @close="closeDialog('dialog2')" :gameId="game.id"></create-mini-for-game-form>
        </md-dialog> -->
        <p>Mini component loaded</p>
        <div v-if="mini.id" class="flex-row">
            <h3>Mini: {{mini.miniName}}</h3>
            <div class='mini-details'>
            </div>
        </div>
        <div v-if="mini.file > 0" class="photo-row">
        </div>
        <!-- <md-button class="md-fab md-fab-bottom-right" id="fab" @click="openDialog('dialog2')">
            <md-icon>add</md-icon>
        </md-button> -->
    </div>
</template>

<script>
export default {
    components: {},
    name: 'Mini',
    data() {
        return { mini: {} }
    }
}
</script>

<style>
.flex-row {
    display: flex;
    flex-direction: row;
}
</style>