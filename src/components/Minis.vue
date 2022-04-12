<template>
    <div class='minis-display'>
        <div class="flex-row">
            <Card
                v-for="mini in minis"
                :key="mini.id"
                :details="mini.miniName"
                :imgSrc="transformUrl(mini.coverPhoto)"
                @click="navigateToMini(mini.id)"
            />
        </div>
        <v-btn :disabled="this.page === 1"
            @click="fetchData(page - 1)"
        >Back</v-btn>
        <v-btn :disabled="this.page === this.maxPages"
            @click="fetchData(page + 1)"
        >Next</v-btn>
    </div>
</template>

<script>
import Card from './Card.vue'
import { fetchPaginatedMinis } from '../services/minis.service';
import { transformUrl } from '../utility-scripts/transformurl';

export default {
    components: { Card },
    name: 'Minis',
    created() {
        this.$watch(
            () => { 
                this.fetchData(this.page)
            }
        )
    },
    data() {
        return {
            minis: [],
            page: 1,
            loading: false,
            maxPages: 1
        }
    },
    methods: {
        fetchData(page) {
            this.loading = true;
            fetchPaginatedMinis(page).then(result => {
                this.loading = false;
                console.log(result);
                this.minis = this.processMinisForDisplay(result.minis);
                this.maxPages = result.totalPages;
                this.page = result.currentPage;
                console.log(this.page);
                console.log(this.maxPages);
            })
        },
        processMinisForDisplay(minis) {
            return minis.map((mini) => {
                const coverPhoto = mini.fileNames.length ? mini.fileNames[0] : '';
                return {...mini, coverPhoto: this.transformUrl(coverPhoto)}
            })
        },
        transformUrl,
        navigateToMini(miniId) {
            this.$router.push(`/mini/${miniId}`)
        },

    }
}
</script>
<style scoped>
    .flex-row {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }
</style>