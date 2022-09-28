import faker from "faker";
faker.locale = "es";

function generarProducto() {
    return {
        title: faker.commerce.product(),
        price: faker.commerce.price(),
        thumbnail: faker.image.imageUrl()
    };
};

export { generarProducto };