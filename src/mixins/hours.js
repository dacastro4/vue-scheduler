'use strict';

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
        hourFrom: {
            default: '12:00 AM',
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
            weekNumber: 1,
        };

    },

    methods: {

        buildHours() {

            let c = 0,
                start = 0,
                hour,
                string,
                end = 23,
                weekHourStart = this.buildDate(this.hourFrom),
                weekHourEnd = this.buildDate(this.hourTo, true)
            ;

            start = weekHourStart.hour();

            this.weekNumber = weekHourStart.week();

            if (this.interval < 1) {
                end = weekHourEnd.hour() + this.interval;
            } else {
                end = weekHourEnd.hour();
            }

            end += weekHourEnd.minute() * 1 / 60;
            start += weekHourStart.minute() * 1 / 60;

            for (c = start; c <= end; c += this.interval) {

                hour = weekHourStart;
                string = hour.format(this.hourFormat);

                this.hours.push({
                    text: string,
                    key: c / this.interval,
                });
                hour = weekHourStart.add(this.interval, 'h');

            }

        },

    }
};

export default hours;
