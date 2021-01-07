let M = {
  articles: null,
};

let C = {
  init: function () {
    V.init();
  },

  loadData: function () {
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
      if (xhr.status == 200 && xhr.readyState == 4) {
        let data = JSON.parse(xhr.responseText);
        M.articles = data.channel.item;
      }
    };

    xhr.open("get", "./php/index.php?flux=https://www.francebleu.fr/rss/limousin/a-la-une.xml");
    xhr.send();
  },
};

let V = {
  checkbox: undefined,
  ul: undefined,
  init: function () {
    V.ul = document.querySelector(".articleContainer");
    V.checkbox = document.querySelectorAll("input");

    V.checkbox.forEach((checkbox) => {
      checkbox.addEventListener("change", () => {
        V.clear();
        V.printArticles();
      });
    });
  },

  clear: function () {
    V.ul.innerHTML = "";
  },

  printArticles: function () {
    M.articles.forEach((article) => {
      let li = document.createElement("li");
      V.ul.appendChild(li);
      let p = document.createElement("p");
      p.textContent = article.title;
      li.appendChild(p);
      let img = document.createElement("img");
      img.src = article.enclosure["@attributes"].url;
      li.appendChild(img);
    });
  },
};

C.init();

C.loadData();
