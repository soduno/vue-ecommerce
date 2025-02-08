<template>
    <div class="main-cover image-cover" :style="'background-image: url('+ imageCover +')'">
        <div class="grid-small text-left margin-center">
            <div class="capture">
                <h1>{{textCover}}</h1>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props: ['textCover', 'imageCover']
    }
</script>
