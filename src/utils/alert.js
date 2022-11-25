import swal from "sweetalert";

export function dialog(config) {
  return new Promise(async (resolve, reject) => {
    const result = await swal({
      confirm: true,
      buttons: {
        confirm: {
          text: "OK",
          value: true,
          visible: true,
          className: "app-btn",
        },
      },
      ...config,
    });

    result ? resolve(result) : reject(result);
  });
}
