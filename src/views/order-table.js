export const initOrderTable = () => {
    console.log("Se ejecuta lógica del Order Table");

    // Event listeners
    const buttons = document.querySelectorAll('.home-button');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            console.log('Botón clickeado');
        });
    });
};
