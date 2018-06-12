import moment from "moment/moment";

let day = {

    props: {

        locale: {
            default: 'en',
            type: String,
        },

        weekdays: {
            default: () => [
                0, 1, 2, 3, 4, 5, 6
            ],
            type: Array | Function,
        },

        dayNames: {
            default: () => [],
            type: Array | Function
        },

        dateFormat: {
            default: 'YYYY-MM-DD',
            type: String,
        },

        weekOf: {
            default: moment().format('YYYY-MM-DD'),
            type: String,
        },

    },

    data() {
        return {
            builtDays: [],
        };
    },

    created() {
        let isFunction = typeof this.dayNames === 'function';

        if (this.dayNames.length || isFunction) {
            moment.updateLocale(this.locale, {
                weekdays: isFunction ? this.dayNames() : (this.dayNames || []),
            });
        }

        this.buildDays();
    },

    methods: {

        buildDays() {

            let vm = this,
                startOfWeek = moment(this.weekOf).startOf('week'),
                selectedDays = this.getWeekdays(),
                d = 0
            ;

            for (d = 0; d <= 6; d++) {

                if (this.inArray(selectedDays, d)) {
                    let date = startOfWeek.weekday(d);

                    vm.builtDays.push({
                        name: date.format('dddd'),
                        date: date.format('YYYY-MM-DD'),
                        key: date.weekday(),
                    });
                }

            }
        },

        getWeekdays() {

            if (typeof this.weekdays === 'function') {
                return this.weekdays();
            } else {
                return this.weekdays || [];
            }

        },

        buildDate(hourVar, end = false) {
            let date = moment(`${this.weekOf} ${hourVar}`, `${this.dateFormat} ${this.hourFormat}`),
                hour = date.hours(),
                min = date.minutes();

            if (end) {
                date.endOf('week')
            } else {
                date.startOf('week')
            }

            date.hours(hour).minutes(min);

            return date;
        },

        inArray(arr, i) {
            let found = false;
            for (let c = 0; c <= arr.length - 1; c++) {
                if (arr.hasOwnProperty(c) && parseInt(arr[c]) === parseInt(i)) {
                    found = true;
                    break;
                }
            }
            return found;
        },

    },
};

export default day;