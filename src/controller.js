import { MetricsPanelCtrl } from 'app/plugins/sdk';
import _ from 'lodash';
import kbn from 'app/core/utils/kbn';
import echarts from './libs/echarts.min';
import * as echarts_demos from './demos';
import './libs/dark';
import './style.css!';

export class Controller extends MetricsPanelCtrl {

    constructor($scope, $injector) {
        super($scope, $injector);
        var demos = [];
        for (let key in echarts_demos) {
            demos.push(key);
        }
        var panelDefaults = {
            IS_UCD: false,
            url: '',
            method: 'POST',
            upInterval: 60000,
            format: 'Year',
            demo: "Line",
            demos: demos,
        };
        _.defaults(this.panel, panelDefaults);

        this.events.on('data-received', this.onDataReceived.bind(this));
        this.events.on('data-error', this.onDataError.bind(this));
        this.events.on('data-snapshot-load', this.onDataReceived.bind(this));
        this.events.on('init-edit-mode', this.onInitEditMode.bind(this));
        this.events.on('panel-initialized', this.render.bind(this));

        this.refreshData();
    }


    onDataReceived(dataList) {
        this.refreshed = true;
        this.render();
        this.refreshed = false;
    }

    onDataError(err) {
        this.series = [];
        this.render();
    }

    onInitEditMode() {
        this.addEditorTab('Option', 'public/plugins/echarts-demo-panel/partials/options.html', 2);
    }


    refreshData() {
        let _this = this, xmlhttp;
        if (window.XMLHttpRequest) {
            xmlhttp = new XMLHttpRequest();
        } else {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        let data = [];
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                _this.customizeData = JSON.parse(xmlhttp.responseText);
                _this.onDataReceived();
            }
        };
        if (this.panel.IS_UCD) {
            xmlhttp.open(_this.panel.method, _this.panel.url, true);
            xmlhttp.send();
        } else {
            xmlhttp = null;
        }
        this.$timeout(() => { this.refreshData(); }, _this.panel.upInterval);
    }

    link(scope, elem, attrs, ctrl) {
        const $panelContainer = elem.find('.echarts_container')[0];
        ctrl.refreshed = true;
        function setHeight() {
            let height = ctrl.height || ctrl.panel.height;
            if (_.isString(height)) {
                height = parseInt(height.replace('px', ''), 10);
            }
            height += 0;
            $panelContainer.style.height = height + 'px';
        }
        setHeight();
        let myChart = echarts.init($panelContainer, 'dark');
        setTimeout(function () {
            myChart.resize();
        }, 1000);
        function render() {
            if (!myChart) {
                return;
            }
            setHeight();
            myChart.resize();
            if (ctrl.refreshed) {
                myChart.clear();
                let option = echarts_demos[ctrl.panel.demo]();
                myChart.setOption(option, true);
            }
        }
        this.events.on('render', function () {
            render();
            ctrl.renderingCompleted();
        });
    }
}

Controller.templateUrl = 'partials/module.html';
