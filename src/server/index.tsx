import SAMPLE_DATA from "../products";
export function getData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(SAMPLE_DATA.items);
    }, 2000);
  });
}
