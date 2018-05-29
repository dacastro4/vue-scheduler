<template>
    <div class="hours-column">
        <span class="day-name">&nbsp;</span>
        <span class="hour-name" v-for="hour in hours">
            {{ hour }}
        </span>
    </div>
</template>

<script>
    import hours from '../mixins/hours'

    export default {
        name: "Hours",

        mixins: [
            hours,
        ]
    }
</script>

<style scoped>

</style>