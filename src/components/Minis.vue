<template>
    <div class='minis-display'>
        <!-- <Card
            v-for="mini in minis"
            :key="mini.id"
            :details="mini.mininame"
        /> -->
        <p>everybody get up it's time to slam now, we've got a real jam going now</p>
    </div>
</template>

<script>
// import Card from './Card.vue'

export default {
  components: {  },
  name: 'Minis',
  data() {
      return {
          minis: []
      }
  }
}
</script>