const url = "/data.json";
async function fetchData(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error.message);
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    const data = await fetchData(url);
    const containerEL = document.querySelector('.container')
    data.forEach(element => {
        containerEL.insertAdjacentHTML("beforeend", `
            
               <div class="item_content">
                <a class="item-img">

                    <h3 class="item-dsc">Занятие: ${element.title}</h3>
                    <div class="txt-box">
                        <p class="item-dsc">Время: ${element.time}</p>
                        <p class="content-font-card">Макс. количество участников: ${element.max}</p>
                        <p class="content-font-card-cur">Количество участников: ${element.current}</p>
                    </div>

                </a>

                <div style="display: inline;" class="add-ok"  id="itm${element.id}">
                    <button type="button" class="btn btn-outline-success add">Записаться</button>
                </div>
                 <div style="display: none;" class="add-decline" id="decline${element.id}">
                 <button type="button" class="btn btn-danger">Отменить запись</button>

                </div>
            </div>         
            <hr>
            `)
        if (localStorage.getItem('itm' + element.id) != null) {

            document.getElementById("itm" + element.id).childNodes[1].setAttribute("disabled", "");
            document.getElementById("decline" + element.id).style.display = 'inline';
            let elem = document.getElementById("itm" + element.id).previousSibling;
            elem.parentNode.querySelector('.content-font-card-cur').textContent = `Количество участников: ${parseInt(element.current) + 1}`;
        }
        if (element.current <= element.max) {
            document.getElementById("itm" + element.id).childNodes[1].setAttribute("disabled", "");
        }

    });
    containerEL.addEventListener("click", function (e) {
        if (e.target.closest(".add-ok") != null) {
            localStorage.setItem(e.target.closest(".add-ok").id, JSON.stringify({ id: e.target.closest(".add-ok").id }));
            location.reload();
        }
    });
    containerEL.addEventListener("click", function (e) {
        if (e.target.closest(".add-decline") != null) {
            localStorage.removeItem('itm' + e.target.closest(".add-decline").id.slice(-1));
            location.reload();
        }
    });
});