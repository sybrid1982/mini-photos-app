<template>
    <div @click="$emit('click')">
        <md-card class='card-body'>
            <md-card-media class="card-image">
                <div class='image-container'>
                    <img v-bind:src="imgSrc" v-bind:alt="details" class='card-image'>
                </div>
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
        height: 330px;
        cursor: pointer;
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
    .image-container {
        border-radius: 6px 6px 0 0;
        height: 250px; /*to preserve the aspect ratio of the image*/
        display: flex;
    }
    .card-image {
        height: 250px;
        align-self: center;
    }
</style>