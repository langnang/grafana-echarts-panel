'use strict';

System.register([], function (_export, _context) {
    "use strict";

    var Basic_Line_Chart;
    return {
        setters: [],
        execute: function () {
            _export('Basic_Line_Chart', Basic_Line_Chart = function Basic_Line_Chart() {
                return {
                    xAxis: {
                        type: 'category',
                        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        data: [820, 932, 901, 934, 1290, 1330, 1320],
                        type: 'line'
                    }]
                };
            });

            _export('Basic_Line_Chart', Basic_Line_Chart);
        }
    };
});
//# sourceMappingURL=line.js.map
