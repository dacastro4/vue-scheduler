import moment from 'moment';

let hours = {

    props: {
        interval: {
            default: 1,
            type: Number
        },
        startFrom: {
            default: 0,
            type: Number
        },
        hourFormat: {
            default: 'hh:mm A',
            type: String,
        }
    },

    data() {

        return {
            hours: [],
        };

    },

    methods: {

        buildHours() {

            //TODO: Allow set min and max hour
            let c = 0,
                start = this.startFrom,
                end = 23,
                startTime = moment().set('hour', start).set('minute', 0);

            for(c = start; c <= end; c += this.interval) {

                let hour = startTime.add(this.interval, 'h'),
                    string = hour.format(this.hourFormat);

                this.hours.push(string);

            }


        },

    }
};

export default hours;