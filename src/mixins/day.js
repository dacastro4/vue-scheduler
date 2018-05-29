import moment from "moment/moment";

let day = {

    props: {

        locale: {
            default: 'en',
            type: String,
        },

        days: {
            default: () => [
                "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
            ],
            type: Array|Function,
        }

    },

    data() {
        return {
            //
        };
    },

    created() {
        moment.updateLocale(this.locale, {
            weekdays : this.getWeekdays(),
        });
    },

    methods: {

        getWeekdays() {

            if(typeof this.weekdays === 'function') {
                return this.weekdays();
            } else {
                return this.weekdays;
            }

        },

    },
};

export default day;