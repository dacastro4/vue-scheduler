import moment from 'moment';

let hours = {

    props: {
        interval: {
            default: 1,
            type: Number
        },
        intervalType: {
            default: 'h',
            type: String
        },
        startFrom: {
            default: 0,
            type: Number
        },
        hourFrom: {
            default: '1:00 AM',
            type: String,
        },
        hourTo: {
            default: '11:59 PM',
            type: String,
        },
        hourFormat: {
            default: 'hh:mm A',
            type: String,
        },
    },

    data() {

        return {
            hours: [],
        };

    },

    methods: {

        buildHours() {

            let c = 0,
                start = this.startFrom,
                hour,
                string,
                end = 23,
                weekHourStart = moment(`${this.weekOf} ${this.hourFrom}`, `${this.dateFormat} ${this.hourFormat}`).startOf('week'),
                weekHourEnd = moment(`${this.weekOf} ${this.hourTo}`, `${this.dateFormat} ${this.hourFormat}`).endOf('week')
            ;

            start = weekHourStart.hour();

            if (this.interval < 1) {
              end = weekHourEnd.hour() + this.interval;
            } else {
              end = weekHourEnd.hour();
            }

            for(c = start; c <= end; c += this.interval) {

                hour = weekHourStart;
                string = hour.format(this.hourFormat);

                this.hours.push({
                    text: string,
                });

                hour = weekHourStart.add(this.interval, 'h');

            }


        },

    }
};

export default hours;
