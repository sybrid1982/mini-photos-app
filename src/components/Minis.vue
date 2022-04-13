<template>
    <div class='minis-display'>
        <div class="flex-row">
            <Card
                v-for="mini in minis"
                :key="mini.id"
                :details="mini.miniName"
                :imgSrc="mini.coverPhoto"
                @click="navigateToMini(mini.id)"
            />
        </div>
        <div class="button-row">
            <v-btn :disabled="this.page === 1"
                @click="fetchData(page - 1)"
            >Back</v-btn>
            <v-btn :disabled="this.page === this.maxPages"
                @click="fetchData(page + 1)"
            >Next</v-btn>
        </div>
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
        this.fetchData(this.page)

        window.addEventListener('resize', this.handleResize);
        this.handleResize();
    },
    destroyed() {
        window.removeEventListener('resize', this.handleResize);
    },
    data() {
        return {
            minis: [],
            page: 1,
            loading: false,
            maxPages: 1,
            pages: {}
        }
    },
    methods: {
        fetchData(page) {
            if(Object.keys(this.pages).includes(page.toString())) {
                this.minis = this.pages[page];
                return;
            }
            this.loading = true;
            this.fetchMinisPage(page).then(result => {
                this.loading = false;
                this.minis = this.processMinisForDisplay(result.minis);
                this.pages[result.currentPage] = [...this.minis];
                this.maxPages = result.totalPages;
                this.page = result.currentPage;
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
        fetchMinisPage(page) {
            return fetchPaginatedMinis(page);
        },
        handleResize() {

        }
    }
}
</script>
<style scoped>
    .flex-row {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }
    .button-row {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 0px 25px;
    }
</style>