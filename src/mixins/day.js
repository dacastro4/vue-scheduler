import moment from "moment/moment";

let day = {

    props: {

        locale: {
            default: 'en',
            type: String,
        },

        weekdays: {
            default: () => [
                "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
            ],
            type: Array | Function,
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
        moment.updateLocale(this.locale, {
            weekdays: this.getWeekdays(),
        });

        this.buildDays();
    },

    methods: {

        buildDays() {

            let vm = this,
                startOfWeek = moment(this.weekOf).startOf('week')
            ;

            this.getWeekdays().forEach((day) => {

                let date = startOfWeek.format('YYYY-MM-DD');

                vm.builtDays.push({
                    name: day,
                    date: date,
                });

                startOfWeek.add(1, 'day');
            });

        },

        getWeekdays() {

            if (typeof this.weekdays === 'function') {
                return this.weekdays();
            } else {
                return this.weekdays || [];
            }

        },

    },
};

export default day;