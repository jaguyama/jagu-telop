
const LOCAL_STRAGE_KEY="jaguyama-telop";

class telop{
    constructor(key,text){
        this.key=key;
        this.text=text;
    }
}



function addList(){
    const telopList=document.getElementById("telop-list");
    telopList.insertAdjacentHTML("beforeend",`
    <li>
        <form>
            <input type="text" placeholder="key" name="key">
            <input type="text" placeholder="text" name="text">
            <label><input type="checkbox" name="delete">削除</label>
        </form>
    </li>
    `);
}

function updateList(){
    let ktlist=[] ;
    let telopList=Array.from(document.forms);
    telopList.forEach((elm)=>{
        if(elm["delete"].checked){
            elm.parentNode.remove();
        }
    });
    telopList=Array.from(document.forms);
    telopList.forEach((elm)=>{
        let key = elm["key"].value;
        let text =elm["text"].value;
        let tp =new telop(key,text);
        ktlist.push(tp);
    });

    localStorage.setItem(LOCAL_STRAGE_KEY,JSON.stringify(ktlist));
    document.getElementById("telopDataText").value=JSON.stringify(ktlist);
}

function applyJson(telopData,telopList){
    telopData.forEach((data)=>{
        telopList.insertAdjacentHTML("beforeend",`
            <li>
                <form>
                    <input type="text" placeholder="key" name="key" value="${data.key}"">
                    <input type="text" placeholder="text" name="text" value="${data.text}">
                    <label><input type="checkbox" name="delete">削除</label>
                </form>
            </li>
        `);
    });
    updateList()
}


function loadJson(){
    const telopList=document.getElementById("telop-list");
    const telopData=JSON.parse(document.getElementById("telopDataText").value);
    telopList.innerHTML="";
    applyJson(telopData,telopList);
}

window.onload=function(){

    const addButton=document.getElementById("addButton");
    const apdateButton=document.getElementById("updateButton");
    const loadButton=document.getElementById("loadButton");
    const telopList=document.getElementById("telop-list");
    
    addButton.addEventListener("click",addList);
    updateButton.addEventListener("click",updateList);
    loadButton.addEventListener("click",loadJson);

    telopData=JSON.parse(localStorage.getItem(LOCAL_STRAGE_KEY));
    applyJson(telopData,telopList);
}

