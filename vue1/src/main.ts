import { app } from './layout/App.ts';
import * as plugins from './plugins/plugins.ts';

import Store from './Store.ts';

import './plugins/tailwind.css';
import './plugins/uno_css.ts';

//  formkit
import { plugin, defaultConfig } from '@formkit/vue';
import '@formkit/themes/genesis';

export const api_axios = await plugins.config_api_axios({ name: 'api_axios', baseURL: 'http://127.0.0.1:30001' });

async function main() {
    await plugins.config_ElementPlus({ app });
    await plugins.config_pinia({ app, name: Store.name, state: Store.state, persist: Store.persist });
    await plugins.config_api_axios({ name: 'api_axios', baseURL: 'http://127.0.0.1:30001' });
    app.use(plugin, defaultConfig());
    app.mount('#app');
}
main();
