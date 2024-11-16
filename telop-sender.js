let fontOption="",introOption="",outroOption="";

function makeOption(){
    for(const v of fontList){
        fontOption= fontOption+`<option value="${v}" name="${v}">${v}</option>`;
    }
    for(const v of introList){
        introOption= introOption+`<option value="${v[0]}" name="${v[0]}">${v[1]}</option>`;
    }
    for(const v of outroList){
        outroOption= outroOption+`<option value="${v[0]}" name="${v[0]}">${v[1]}</option>`;
        console.log(v);
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
            <details><summary>設定</summary>
                <select name="font-family">${fontOption}</select>
                <input type="number" min="0" id="font-size" value="${DEFAULT_FONT_SIZE}" placeholder="font-size(px)">
                <select name="intro">${introOption}</select>
                <select name="outro">${outroOption}</select>
            </details>
                
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
        let fontFamily=elm["font-family"].value;
        let fontSize =elm["font-size"].value;
        let intro =elm["intro"].value;
        let outro =elm["outro"].value;
        
        let tp =new telop(key,text,fontFamily,fontSize,intro,outro);

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
                    <details><summary>設定</summary>
                        <select name="font-family">${fontOption}</select>
                        <input type="number" min="0" id="font-size" value="${data.fontSize}" placeholder="font-size(px)">
                        <select name="intro">${introOption}</select>
                        <select name="outro">${outroOption}</select>
                    </details>
                </form>
            </li>
        `);
        const elm = telopList.lastElementChild.lastElementChild;
        for (const v of elm["font-family"] ){
            if(v.value==data.fontFamily) v.setAttribute("selected","")
        }
        for (const v of elm["intro"] ){
            if(v.value==data.intro) v.setAttribute("selected","")
        }
        for (const v of elm["outro"] ){
            if(v.value==data.outro) v.setAttribute("selected","")
        }
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
    makeOption()
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

