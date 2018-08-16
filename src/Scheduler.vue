<template>
    <div id="scheduler" v-selectable="selectableFunctions()" data-item=".real-days" ref="scheduler" :disabled="disabled"
         :class="{ 'disabled': disabled }">
        <div class="selection"></div>
        <div class="row">
            <div class="info-row">
               <span class="week-number">
                    <slot>
                        Week Number: {{ weekNumber}}
                    </slot>
               </span>
            </div>
        </div>
        <div class="week-row">
            <div class="hours-column">
                <span class="day-name">&nbsp;</span>
                <span class="hour-name" v-for="hour in hours">{{ hour.text }}</span>
            </div>
            <div class="days-column" v-for="(day) in builtDays">
                <span class="day-name">
                    {{ day.name }}
                    <small>{{ day.date }}</small>
                </span>
                <selectable-item v-for="(hour) in hours" :key="`${hour.text}-${day.date}`" :hour="hour.text"
                                 :hour-key="hour.key"
                                 :day="day" :day-key="day.key" :data-date="day.date" :selecting="selecting"
                                 :selected="selected" class="selectable" :selected-text="selectedText"
                                 :selecting-text="selectingText">
                </selectable-item>
            </div>
        </div>
    </div>
</template>

<script>
    import selectable, {setSelectableItems} from 'vue-selectable';
    import SelectableItem from './components/SelectableItem.vue';
    import day from './mixins/day'
    import hours from './mixins/hours'

    export default {
        name: "scheduler",

        props: {
            value: null,
            initial: null,
            selectedText: {
                default: null,
                type: String,
            },
            selectingText: {
                default: null,
                type: String,
            },
            disabled: {
                default: false,
                type: Boolean,
            },
        },

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

            disabledSchedule() {
                return this.disabled;
            },

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
                    disabled: this.disabledSchedule,
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

                if (this.initial.length) {
                    selected = this.initial.map((item) => {
                        item.selected = true;
                        return item;
                    });
                    return selected;
                }

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

        watch: {
            initial(newValues) {
                setSelectableItems(this.$refs.scheduler);
            }
        },

        directives: {
            selectable
        },

        components: {
            SelectableItem,
        }

    }
</script>