# jagu-telop

複数の文字列を同時に変更できるページです。

---
## 使い方(最低限)
1. OBSのカスタムブラウザドックに[テロップ送信用 https://jaguyama.github.io/jagu-telop/telop-sender.html](https://jaguyama.github.io/jagu-telop/telop-sender.html )を追加
2. 追加ボタンから入力欄を作成しkeyとtextを設定
3. ブラウザソースに[テロップ表示用 https://jaguyama.github.io/jagu-telop/telop-render.html?key={2.で設定したkey}](https://jaguyama.github.io/jagu-telop/telop-render.html?key= )を設定
   
   ex. keyにaaaを設定した場合 https://jaguyama.github.io/jagu-telop/telop-render.html?key=aaa

4. 更新ボタンを押すとテキストの変更が反映されます
5. keyを削除したい場合は削除のチェックボックスにチェックを入れて更新ボタンを押します


---
## CSSの設定方法
```html
    <body>
        <div id="telop">

        </div>
    </body>
```
上記の`<div id="telop">`の中身とクラスを書き換えることで、文字列の変更とアニメーションを実現しています。
`animation`プロパティをもたせた`.intro`と`.outro`をカスタムCSSで設定すると登場/退場アニメーションを設定できます


--
## 追加変更予定
1. エクスポート,インポート機能
2. htmlの構造をもう少し簡便なものに
