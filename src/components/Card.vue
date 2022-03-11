<template>
    <div @click="$emit('click')">
        <md-card class='card-body'>
            <md-card-media class="card-image">
                <img v-bind:src="imgSrc" v-bind:alt="details" class='card-image'>
            </md-card-media>

            <md-card-header class="card-details">
                <div class="md-title">{{details}}</div>
            </md-card-header>
        </md-card>
    </div>
</template>
<script>
export default {
    name: 'Card',
    props: ['details', 'imgSrc']
}
</script>
<style scoped>
    .card-body {
        margin: 25px;
        width: 250px;
        height: 308px;
        cursor: pointer;
    }
    .card-image {
        height: 250px;
    }
    .card-details {
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .card-details p {
        font-weight: bold;
    }
    img {
        width : 250px;
        border-radius: 6px 6px 0 0;
        height: auto; /*to preserve the aspect ratio of the image*/
    }
</style>