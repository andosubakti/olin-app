/*
    Aunthetication Created in Client Side (Didn't Follow Best Practice, It Should be REST API with HTTP Call to Server Side)
*/

import { dialog } from "../utils/alert";


export default class Auth {
    static login(body) {
        let listUserRegisted = JSON.parse(localStorage.getItem('listUserRegisted'));
        let success = false;

        if (listUserRegisted) {
            if (listUserRegisted.some(user => user.email === body.email)) {
                let userTarget = listUserRegisted.filter(user => user.email === body.email);
                if (userTarget[0].password === body.password) {
                    sessionStorage.setItem('user', JSON.stringify(userTarget[0]));
                    sessionStorage.setItem('token', JSON.stringify("123183217981"));
                    sessionStorage.setItem('permissions', JSON.stringify({ salesAccess: 1, inventoryAccess: 1, purchaseAccess: 1, userManagementAccess: 1 }));

                    success = true;
                } else {
                    dialog({ icon: "error", title: "Password yang anda masukan salah!" })
                }
            } else {
                dialog({ icon: "error", title: "Email belum terdaftar!" })
            }
        } else {
            dialog({ icon: "error", title: "Email belum terdaftar!" })
        }

        return new Promise((resolve, reject) => {
            if(success){
                resolve();
            } else {
                reject();
            }
        })
    }

    static register(body) {
        let listUserRegisted = JSON.parse(localStorage.getItem('listUserRegisted'));

        if (listUserRegisted) {
            if (listUserRegisted.some(user => user.email === body.email)) {
                dialog({ icon: "error", title: "Email telah terdaftar, silahkan login atau daftar menggunakan email lain!" })
            } else {
                listUserRegisted.push({
                    id: listUserRegisted.length+1,
                    ...body
                })
            }
        } else {
            listUserRegisted = [{
                id: 1,
                ...body
            }]
        }

        localStorage.setItem('listUserRegisted', JSON.stringify(listUserRegisted));
    }

    static logout() {
        sessionStorage.clear();
        window.location.reload();
    }

    static isLogin() {
        return !!sessionStorage.getItem('user') && !!sessionStorage.getItem('token') && !!sessionStorage.getItem('permissions');
    }
}