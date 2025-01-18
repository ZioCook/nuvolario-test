//const draggableContainer = document.querySelector(".draggable-container");

document.addEventListener("DOMContentLoaded", () => {
    const swapy = Swapy.createSwapy(document.body, {
        animation: "dynamic",
        swapMode: "drop",
    });

    swapy.onBeforeSwap((event) => {
        const to = event.toSlot;
        const toElement = document.querySelector(`[data-swapy-slot="${to}"]`);
        const slotValue = toElement?.getAttribute("data-value");
        const draggableElement = document.querySelector(
            `[data-swapy-item="${event.draggingItem}"]`
        );
        const draggableValue = draggableElement?.getAttribute("data-value");

        return slotValue === draggableValue;
    });

    swapy.onSwapStart((event) => {

 //       setTimeout(() => {
   //         draggableContainer.style.removeProperty('overflow-y');
  //      }, 800);
        console.log("Inizio del trascinamento:", event.draggingItem);
    });

    swapy.onSwap((event) => {
        console.log("drag completato");

        const toSlot = event.toSlot;
        const toElement = document.querySelector(`[data-swapy-slot="${toSlot}"]`);
        if (toElement) {
            toElement.classList.add("populated");
        }
    });

    swapy.onSwapEnd((event) => {
 //       setTimeout(() => {
 //           draggableContainer.style.overflowY = 'scroll';
 //       }, 400);
        console.log("Fine del trascinamento:", event.draggingItem);
        
        // Log dello stato finale degli elementi
        console.log("Nuovo stato della mappa slot-item:", event.slotItemMap.asObject);
        console.log("La mappa è cambiata?", event.hasChanged);
    });
});