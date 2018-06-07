<template>
    <div id="scheduler" v-selectable="selectableFunctions()" data-item=".real-days">
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
                <span class="hour-name" v-for="hour in hours">{{ hour.text }}</span>
            </div>
            <div class="days-column" v-for="(day, dayKey) in builtDays">
                <span class="day-name">
                    {{ day.name }}
                    <small>{{ day.date }}</small>
                </span>
                <selectable-item v-for="(hour, hourKey) in hours" :key="`${hour.text}-${day}`" :hour="hour.text"
                                 :hour-key="hourKey"
                                 :day="day" :day-key="dayKey" :data-date="day.date" :selecting="selecting"
                                 :selected="selected" class="selectable">
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

        props: [
            'value'
        ],

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
                    selectedProcessDown: this.selectedProcessDown,
                    selectedProcessUp: this.selectedProcessUp,
                    updateSelectionProcess: this.updateSelectionProcess,
                    multiSelection: this.multiSelection,
                };
            },

            selectedGetter() {
                return this.selected;
            },

            selectedSetter(v) {
                this.$emit('input', v);
                this.selected = v;
            },

            selectingSetter(v) {
                this.selecting = v;
            },

            initSelectable(elements) {
                let selected = [];

                _.each(elements, (item, key) => {
                    selected.push({
                        day: item.dataset.dayKey,
                        hour: item.dataset.hourKey,
                        date: item.dataset.date,
                        selected: false,
                    });
                });

                this.staticFirstSelected = selected;

                return [];
            },

            selectedProcessUp(elems) {
                return elems;
            },

            selectedProcessDown(elems, selecting, existing) {

                // console.log('down', elems, selecting, existing);

                // elems.forEach(e => {
                //     console.log(e.classList);
                // e.classList.hasOwnProperty('selecting');
                // });

                // existing.push(elem);


                // return this.initSelectable(this.elems);

            },

            updateSelectionProcess(elem) {

                return {
                    day: elem.dataset.dayKey,
                    hour: elem.dataset.hourKey,
                    date: elem.dataset.date,
                    selected: true,
                };

            },

            resetSelected() {
                return [];
            },

            multiSelection(selected, selecting) {
                let s = (typeof selected === 'object' ? selected : []),
                    skip = [];

                s = _.reject(s, selectedItem => {
                    let inArray = this.dateInArray(selecting, selectedItem);
                    if (inArray) {
                        skip.push(selectedItem);
                        return true;
                    } else {
                        return false;
                    }
                });

                selecting = _.reject(selecting, selectingItem => {
                    return this.dateInArray(s, selectingItem) || this.dateInArray(skip, selectingItem);
                });

                if (selecting.length) {
                    selecting.forEach(selectingItem => {
                        if (!_.includes(s, selectingItem)) {
                            s.push(selectingItem);
                        }
                    });
                }

                return s;
            },

            dateInArray(array, date) {

                let found = false;

                array.forEach(item => {
                    if (date.date === item.date && date.day === item.day && date.hour === item.hour) {
                        found = true;
                        return false;
                    }
                });

                return found;
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
        background-color: yellow !important;
    }

    .selectable.selected {
        background-color: orange !important;
    }
</style>