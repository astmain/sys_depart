import { defineStore, createPinia } from 'pinia';
// @ts-ignore
import piniaPluginPersist from 'pinia-plugin-persist';

export default async function config_pinia({ app, name = 'BUS', state, persist }: { app: any; name: string; state: any; persist: any }) {
    // if (!window['pinia_init_isok']) {
    //     let pinia = createPinia()
    //     pinia.use(piniaPluginPersist)
    //     app.use(pinia)
    //     window['pinia_init_isok'] = true
    // }

    let pinia = createPinia();
    pinia.use(piniaPluginPersist);
    app.use(pinia);

    // @ts-ignore
    const __Store_use = defineStore(name, {
        state: () => state,
        persist: persist,
        // actions: {
        //     increment() {
        //         this.count++
        //     },
        //     decrement() {
        //         this.count--
        //     }
        // },
    });

    const __Store = __Store_use();
    // @ts-ignore
    window[name] = __Store;
    // @ts-ignore
    app.config.globalProperties[name] = __Store;

    //     const __Store = __Store_use();
    //     (window as any)[name] = __Store;
    //    app.config.globalProperties[name] = __Store
}
