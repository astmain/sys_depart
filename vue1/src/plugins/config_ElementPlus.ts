import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

export async function config_ElementPlus({ app }: { app: any }) {
    app.use(ElementPlus, { size: 'default' });
    // 注册全局组件
    console.log('注册全局组件---ElementPlus', ElementPlus);

    return { ElementPlus };
}
