import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const formPromise = document.querySelector(".form");

formPromise.addEventListener("submit", function (e) {
    e.preventDefault();
    const delay = formPromise.elements.delay.value; /* saved delay from input*/
    const state = formPromise.elements.state.value; /* saved state from input*/

    const promise = new Promise((resolve, reject) => {  /*create promise*/
        setTimeout(() => {
            if (state === "fulfilled") {
                resolve("Success!");
            } else {
                reject("Error!");
            }
        }, delay);
    });
    promise
        .then((delay) => {
            iziToast.success({
                title: "Success",
                message: `✅ Fulfilled promise in ${delay}ms`, /*message in window*/
            });
            console.log(`✅ Fulfilled promise in ${delay}ms`);  /*Якщо проміс виконується вдало, виводь у консоль наступний рядок - task*/
        })
        .catch((delay) => {
            iziToast.error({
                title: "Error",
                message: `❌ Rejected promise in ${delay}ms`, /*message in window*/
            });
            console.log(`❌ Rejected promise in ${delay}ms`); /*Якщо проміс буде відхилено, то виводь у консоль наступний рядок - task*/
        });
});

