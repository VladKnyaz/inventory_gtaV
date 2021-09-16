
const backpack = document.querySelector('.backpack');
const cells = document.querySelectorAll('.block')
const bag = document.querySelector('.bag');
let menu_context = document.createElement('div');
// Подготовка img для перетаскивания
document.querySelector('.item').setAttribute('draggable', 'true');

menu_context.className = 'menu_actions';
menu_context.innerHTML = `
<button class="btn_action">Использовать</button>
<button class="btn_action">Выкинуть</button>
<button class="btn_action">Передать</button>
        `

if (!bag.childElementCount) {
    backpack.style.display = 'none';
}

cells.forEach((block)=> {
    block.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        if (block.firstElementChild) {
            block.append(menu_context)
            document.addEventListener('click', () => {
                menu_context.remove()
            });
        }
        else {
            return
        }
    });
    if (block.classList[1] == 'block_clothes' || 'block_clothes_big') {
        if (block.firstElementChild) {
            block.classList.add('bg')
        }
        else {
            block.classList.remove('bg')
        }
    }
});
function updateCells () {
    cells.forEach((cell)=> {
        if (cell.classList[1] == 'block_clothes' || 'block_clothes_big') {
            cell.classList.remove('bg')
            if (cell.firstElementChild) {
                cell.classList.add('bg')
            }
            else {
                // console.log(cell.classList);
                cell.classList.remove('bg')
            }
        }
    });
}

setInterval(() => {
    updateCells()
}, 0);
// Drag and Drop
const items = document.querySelectorAll('.item');
items.forEach((item) => {
    item.addEventListener('click', moveItem);
    // item.addEventListener('contextmenu', moveItem);
    item.setAttribute('draggable', false);
});
  
let current_slot = null;
let status_click = false;
let current_itemId = null;
let current_itemType = null;
let current_itemValue = null;

function moveItem(event) {
    event.preventDefault();
    const item = this;
    let waitItem = null;

    let ghostItem = item.cloneNode(true);
    ghostItem.setAttribute('class', 'ghostItem');
    item.classList.add('invisible');

    let shiftX = ghostItem.getBoundingClientRect().left + 20;
    let shiftY = ghostItem.getBoundingClientRect().top + 20;

    ghostItem.style.position = 'absolute';
    ghostItem.style.zIndex = 1000;
    document.body.append(ghostItem);

    ghostItem.onclick = function (event) {
        if (current_itemId == 14) return;
        if (current_itemId >= 5 && current_itemId <= 14) {
           
            if (item.className == 'item type_clothes invisible' ) {
                
            }
            else return
        }
        if (current_itemId && current_itemId != item.parentNode.id) {
            let area = document.getElementById(current_itemId);
            let free_space = !!!area.firstElementChild;

            if (free_space) {
                arr = area.id.split(' ');
                if (arr.length == 2) {
                    if (arr[1] == item.id) {
                        console.log('ок');
                        area.append(item);
                    }
                    else {
                        return;
                    }
                }
                else {
                    area.append(item);
                }
            } else if (current_itemType == item.id) {
                // console.log(current_itemType);
                // let destiny = area.firstElementChild.lastElementChild.innerHTML;
                // let origin = item.lastElementChild.innerHTML;      
                // let total = parseInt(destiny) + parseInt(origin);
                // area.firstElementChild.lastElementChild.innerHTML = total;
                // item.remove();
            } else {
                // item.parentNode.append(area.firstElementChild);
                // console.log(item.parentNode.append(area.firstElementChild));
                // area.append(item);
            }
        }
        item && item.classList.remove('invisible');
        ghostItem.remove();
        status_click = !status_click;
    };

    status_click = !status_click;

    if (status_click) {
        moveAt(event.pageX, event.pageY);
    }

    function moveAt(pageX, pageY) {
        ghostItem.style.left = pageX - shiftX + 'px';
        ghostItem.style.top = pageY - shiftY + 'px';
    }

    function onMouseMove(event) {
        if (status_click) {
            moveAt(event.pageX, event.pageY);
        }
        ghostItem.hidden = true;
        let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
        ghostItem.hidden = false;

        if (!elemBelow) return;
        let droppableBelow = elemBelow.closest('.block');
        if (current_slot != droppableBelow) {
        if (current_slot) {
            leaveDroppable(current_slot);
        }
        current_slot = droppableBelow;
        if (current_slot) {
            enterDroppable(current_slot);
        }
        }
    }
    document.addEventListener('mousemove', onMouseMove);
}

function enterDroppable(elem) {
  current_itemId = elem.id;
  if (elem.firstElementChild) {
    current_itemType = elem.firstElementChild.id;
    child = elem.firstElementChild;
  }
}

function leaveDroppable(elem) {
  current_itemId = null;
  current_itemType = null;
  current_itemValue = null;
  free_space = false;
}



// Drag and Drop

