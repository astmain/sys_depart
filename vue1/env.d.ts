/// <reference types="vite/client" />

declare module '*.vue' {
    import type { DefineComponent } from 'vue';
    const component: DefineComponent<{}, {}, any>;
    export default component;
}

// declare global {
//     interface Window {
//         BUS: {
//             count: number;
//             token: string;
//             user: { name: string };
//             bus_unpaid_pay: {
//                 show: boolean;
//                 data: { id: number };
//             };
//         };
//     }

//     const BUS: {
//         count: number;
//         token: string;
//         user: { name: string };
//         bus_unpaid_pay: {
//             show: boolean;
//             data: { id: number };
//         };
//     };
// }
