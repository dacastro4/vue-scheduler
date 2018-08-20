<template>
    <div class="real-days" :class="{ selected: isSelected, selecting: isSelecting }"
         :data-day-key="dayKey" :data-hour="hour" :data-hour-key="hourKey">
        <span class="day-hour">
            <span class="selected-text" v-if="isSelected && selectedText">{{ selectedText }}</span>
            <span class="selected-text" v-if="isSelecting && selectingText">{{ selectingText }}</span>
        </span>
    </div>
</template>

<script>
    export default {
        name: "selectable-item",

        props: ['day', 'dayKey', 'hour', 'hourKey', 'selectedText', 'selectingText', 'selected', 'selecting'],

        computed: {

            isSelected() {
                let vm = this,
                    $el = this.$el,
                    exists = false;

                if (!$el || ($el && !$el.classList.contains('disabled') && !$el.hasAttribute('disabled'))) {
                    _.forEach(this.selected, (item) => {
                        if ((item.day).toString() === (vm.dayKey).toString() && (item.hour).toString() === (vm.hourKey).toString() && item.selected === true) {
                            exists = true;
                            return false;
                        }
                    });
                }

                return exists;

            },

            isSelecting() {
                let vm = this,
                    $el = this.$el,
                    exists = false;

                if (!$el || ($el && !$el.classList.contains('disabled') && !$el.hasAttribute('disabled'))) {
                    _.forEach(this.selecting, (item) => {
                        if ((item.day).toString() === (vm.dayKey).toString() && (item.hour).toString() === (vm.hourKey).toString()) {
                            exists = true;
                            return false;
                        }
                    });
                }
                return exists;
            },

        },
    }
</script>