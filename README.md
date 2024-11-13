# jagu-telop

複数の文字列を同時に変更できるページです。

---
## 使い方(最低限)
1. OBSのカスタムブラウザドックに[テロップ送信用 https://jaguyama.github.io/jagu-telop/telop-render.html](https://jaguyama.github.io/jagu-telop/telop-render.html )を追加
2. 追加ボタンから入力欄を作成しkeyとtextを設定
3. ブラウザソースに[テロップ表示用 https://jaguyama.github.io/jagu-telop/telop-render.html?key={2.で設定したkey}](https://jaguyama.github.io/jagu-telop/telop-render.html?key= )を設定
   
   ex. keyにaaaを設定した場合 https://jaguyama.github.io/jagu-telop/telop-render.html?key=aaa

## CSSの設定方法
```html
    <body>
        <div id="telop">

        </div>
    </body>
```
上記の`<div id="telop">`の中身とクラスを書き換えることで、文字列の変更とアニメーションを実現しています。
`animation`プロパティをもたせた`.intro`と`.outro`をカスタムCSSで設定すると登場/退場アニメーションを設定できます