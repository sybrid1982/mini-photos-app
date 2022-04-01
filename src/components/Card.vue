<template>
    <div @click="$emit('click')">
        <v-card class='card-body'>
            <v-img v-bind:src="imgSrc" v-bind:alt="details" class='card-image'></v-img>

            <v-card-title class="card-details">{{details}}</v-card-title>
        </v-card>
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