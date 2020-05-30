import { Controller } from './controller';
import { loadPluginCss } from 'app/plugins/sdk';

loadPluginCss({
  dark: 'plugins/echarts-demo-panel/css/grouped.dark.css',
  light: 'plugins/echarts-demo-panel/css/grouped.light.css',
});

export {
  Controller as PanelCtrl
};
