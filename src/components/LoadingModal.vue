<template>
    <div class="modal-page-block">
        <div class="modal-container">
            <h2>Please Wait</h2>
        </div>
    </div>
</template>

<script>
export default {
    name: 'LoadingModal'
}
</script>

<style scoped>
    .modal-page-block {
        z-index: 50;
        background-color: rgba(33,33,33,0.5);
        
        position: fixed;
        bottom: 0;
        right: 0;
        left: 0;
        top: 0;
    }
    .modal-container {
        background-color: white;
        border: 1px solid black;
        border-radius: 4px;
        text-align: center;
        position: relative;
        top: 45%;
    }
</style>