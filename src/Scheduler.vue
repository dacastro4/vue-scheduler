<template>
    <div v-selectable="selectableFunctions()">
        <div class="selection"></div>

        <div class="row">
            <div class="info-row">
               <span class="week-number">
                    Week Number: 1
               </span>
            </div>
        </div>
        <div class="week-row">
            <div class="hours-column">
                <span class="day-name">&nbsp;</span>
                <span class="hour-name" v-for="hour in hours">{{ hour }}</span>
            </div>
            <div class="days-column" v-for="day in days">
                <span class="day-name">{{ day }}</span>
                <div class="real-days" v-for="hour in hours">
                    <span class="day-hour" :data-day="day" :data-hour="hour">

                    </span>
                </div>
            </div>
        </div>
        <div v-for="(item, key) in items"
             :class="{ selected: !!selected[key], selecting: !!selecting[key] }"
             class="selectable">{{ item }}
        </div>
    </div>
</template>

<script>
    import moment from 'moment';
    import selectable from 'vue-selectable';
    import day from './mixins/day'
    import hours from './mixins/hours'

    export default {
        name: "scheduler",
        data() {
            return {
                selected: [],
                selecting: [],
                items: [
                    'abc',
                    'bcd',
                    'cde',
                    'asd'
                ],
            }
        },

        mixins: [
            day,
            hours,
        ],

        created() {

            this.buildHours();

        },

        methods: {

            selectableFunctions() {
                return {
                    selectedGetter: this.selectedGetter,
                    selectedSetter: this.selectedSetter,
                    selectingSetter: this.selectingSetter
                };
            },

            selectedGetter() {
                return this.selected;
            },

            selectedSetter(v) {
                this.selected = v;
            },

            selectingSetter(v) {
                this.selecting = v;
            },
        },





        directives: {
            selectable
        },

    }
</script>

<style scoped>
    .selection {
        position: absolute;
        border: 1px dotted #000;
        z-index: 9999;
        top: 0;
        left: 0;
        cursor: default;
        display: none;
    }

    .container {
        position: relative;
        width: 500px;
        height: 1500px;
        background: #f0f0f0;
    }

    .selectable {
        width: 200px;
        height: 50px;
        background-color: purple;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .selectable.selecting {
        background-color: yellow;
    }

    .selectable.selected {
        background-color: orange;
    }
</style>