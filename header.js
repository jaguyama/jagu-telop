
const LOCAL_STRAGE_KEY="jaguyama-telop";
const DEFAULT_FONT_SIZE=100;

const fontList=[
    "Noto Sans JP",
    "Zen Old Mincho",
    "Dela Gothic One"
];

const introList=[
    ["introNone","アニメーションなし"],
    ["introFade","フェードイン"],
    ["introSlideToleft","左にスライド"],
    ["introSlideToRight","右にスライド"],
    ["introSlideToUp","上にスライド"],
    ["introSlideToBottom","下にスライド"]
];

const outroList=[
    ["outroNone","アニメーションなし"],
    ["outroFade","フェードアウト"],
    ["outroSlideToleft","左にスライド"],
    ["outroSlideToRight","右にスライド"],
    ["outroSlideToTop","上にスライド"],
    ["outroSlideToBottom","下にスライド"]
];

class telop{
    constructor(key,text,fontFamily,fontSize,intro,outro){
        this.key=key;
        this.text=text;
        this.fontFamily=fontFamily;
        this.fontSize=fontSize;
        this.intro=intro;
        this.outro=outro;
    }
}

