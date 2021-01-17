'use strict';
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');

/**
 * 指定した要素の子どもを全て削除する
 * @param {HTMLElement} element HTMLの要素
 */
function removeAllChildren(element) {
    while (element.firstChild) {
      // 子どもの要素があるかぎり削除
      element.removeChild(element.firstChild);
    }
  }

userNameInput.onkeydown = event => {
if (event.key === 'Enter') {
assessmentButton.onclick();
}
};

assessmentButton.onclick = () => {
    //名前を打ち込むバーの中の値（userNameInput.value）をuserNameに代入する
    const userName = userNameInput.value;
    if (userName.length === 0) {
      // 名前が空の時は処理を終了する
      return;
    }
    //上で作成した関数removeAllChildrenを使っている。ここではelementとしてresultDividedを代入している。
    removeAllChildren(resultDivided);
    const header = document.createElement('h3');
    header.innerText = '診断結果';
    resultDivided.appendChild(header);

    //Pタグ作成して、定数paragraphへ代入する
    const paragraph = document.createElement('p');
    //関数assessmentで得られた診断結果を、定数constへ代入する
    const result = assessment(userName);

    //paragraph（Pタグが入っている）のテキストに、result（診断結果）を代入する
    paragraph.innerText = result;
    //paragraph（診断結果が入ったPタグのテキストを、resultDividedの子要素として代入する）
    //resultDividedはgetElementById('result-area')でHTMLと紐付いている。
    resultDivided.appendChild(paragraph);

    //TODO ツイートエリアの作成↓
    removeAllChildren(tweetDivided);
    //aタグを作成して、定数anchorに代入する↓
    const anchor = document.createElement('a');
    //リンク先を定数hrefValueに代入↓
    const hrefValue = 
    'https://twitter.com/intent/tweet?button_hashtag='+
    encodeURIComponent('あなたのいいところ') + '&ref_src=twsrc%5Etfw';
    //定数anchorに、href（属性の名前）を追加し、中身をhrefValueとする↓
    //つまり、anchorにaタグで
    //href = hrefValue('https://twitter.com/intent/tweet?button_hashtag=あなたのいいところ&ref_src=twsrc%5Etfw';)
    //を代入するということ。
    
    //もっとざっくりいうと、anchor＝リンク先、ということ。↓
    anchor.setAttribute('href', hrefValue);
    
    //変数名anchorのクラスの、プロパティ名classNameの値を、'twitter-hashtag-button'にする。↓
    anchor.className = 'twitter-hashtag-button';
    
    //属性data-textを追加し、中身を'診断結果の文章'にする。↓
    anchor.setAttribute('data-text', result);
    
    //変数名anchorのクラスの、プロパティ名innerTextの値を、'Tweet#あなたのいいところ'にする↓
    anchor.innerText = 'Tweet#あなたのいいところ';
    
    //tweetDivided（HTMLの'tweet-area'と紐づいている）にanchor（リンク先）を追加する。↓
    //つまり、HTMLのtweet-areaのところに、リンクを張り付けてるだけ。↓
    tweetDivided.appendChild(anchor);

    //widgets.jsの設定↓

    //定数scriptにscriptタグを作成する↓
    const script = document.createElement('script');

    //script（srcタグ）にsrcという属性名を設定し、中身を'https://platform.twitter.com/widgets.js'にする。
    script.setAttribute('src', 'https://platform.twitter.com/widgets.js')
    
    //script('https://platform.twitter.com/widgets.js')をtweetDivided(HTMLの'tweet-area'に紐づいている)
    tweetDivided.appendChild(script);
};

const answers = [
'{userName}のいいところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
'{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
'{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
'{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。',
'{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
'{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
'{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
'{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。',
'{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
'{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
'{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。',
'{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
'{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
'{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
'{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
'{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。'
];

/**
 * 名前の文字列を渡すと診断結果を返す関数
@param {string} userName
@return {string} 診断結果
*/
function assessment(userName){
    // 全文字のコード番号を取得してそれを足し合わせる
    let sumOfCharCode = 0;
    for(let i = 0; i < userName.length; i++){
        sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
    }

    //文字のコード番号の合計を回答の数で割って添え字の数値を求める
    const index = sumOfCharCode % answers.length;
    let result = answers[index];

    result = result.replace(/\{userName\}/g, userName);
    return result;
}

console.assert(
    assessment('太郎') ===
        '太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。',
        '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
  );

console.assert(
    assessment('太郎') === assessment('太郎'),
    '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。'
  );
