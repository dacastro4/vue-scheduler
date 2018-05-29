<template>
    <div v-selectable="selectableFunctions()" data-item=".real-days">
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
            <div class="days-column" v-for="(day, dayKey) in days">
                <span class="day-name">{{ day }}</span>
                <selectable-item v-for="(hour, hourKey) in hours" :key="`${hour}-${day}`" :hour="hour" :hour-key="hourKey"
                            :day="day" :day-key="dayKey" :selecting="selecting" :selected="selected" class="selectable">
                </selectable-item>
            </div>
        </div>
    </div>
</template>

<script>
    import moment from 'moment';
    import selectable, {setSelectableItems} from 'vue-selectable';
    import SelectableItem from './components/SelectableItem.vue';
    import day from './mixins/day'
    import hours from './mixins/hours'

    export default {
        name: "scheduler",
        data() {
            return {
                selected: [],
                selecting: [],
                staticFirstSelected: [],
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
                    selectingSetter: this.selectingSetter,
                    initSelectable: this.initSelectable,
                    resetSelected: this.resetSelected,
                    // selectedProcessDown: this.selectedProcessDown,
                    // selectedProcessUp: this.selectedProcessUp,
                    updateSelectionProcess: this.updateSelectionProcess,
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

            initSelectable(elements) {
                let selected = [];

                _.each(elements, (item, key) => {

                    let dayKey = item.dataset.dayKey,
                        hour = item.dataset.hourKey;

                    selected.push({
                        day: dayKey,
                        hour: hour,
                        selected: false,
                    });
                });

                this.staticFirstSelected = selected;

                return selected;
            },

            selectedProcessUp(elems, existing) {

                console.log('up', elems, existing);


                // return this.initSelectable(this.elems);

            },

            selectedProcessDown(elems, existing) {

                console.log('down', elems, existing);


                // return this.initSelectable(this.elems);

            },

            updateSelectionProcess(elem) {

                return {
                    day: elem.dataset.dayKey,
                    hour: elem.dataset.hour,
                    selected: true,
                };

            },

            resetSelected() {
                return this.staticFirstSelected;
            },

        },


        directives: {
            selectable
        },

        components: {
            SelectableItem,
        }

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