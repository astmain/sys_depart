
declare global {
    // interface Window {
    //     BUS: {
    //         count: number;
    //         token: string;
    //         user: { name: string };
    //         bus_unpaid_pay: {
    //             show: boolean;
    //             data: { id: number };
    //         };
    //     };
    // }

    var BUS: {
        count: number;
        token: string;
        user: { name: string };
        bus_unpaid_pay: {
            show: boolean;
            data: { id: number };
        };
    };
}

export {};
