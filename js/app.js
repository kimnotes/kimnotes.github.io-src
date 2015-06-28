var m = require('mithril');
var md = require('markdown-it')({
  html: true,
  linkify: true,
  typographer: true
});

var xhrResponseText = function(xhr) {
   return JSON.stringify(xhr.responseText);
};

var Posts = {
  get: function(id) {
   return m.request({url: "_posts/"+id+".md", method: "GET", extract: xhrResponseText}).then(function(text) {
     Posts.list.push(text);
     //m.render(document.body.section.querySelector("#posts"), Post.view());
   });
 },
  view: function(article) {
    return m("article", m.trust(md.render(article)));
  },
  list: []
}

var config = {}, css = '';
m.request({method: "GET", url: "config.json"})
  .then(function(res) {
    config = res;
    m.mount(document.body, Html);
  });

var Html = {
  controller: function() {
    var cursor = config.last;
    for (var i = 0; i < config.number ; i++ ){
      Posts.get(cursor);
      cursor--;
    }
  },
  view: function(ctrl) {
    return m("div", {class:"container"}, [
      m("h1", config.title),
      m("section", [
        Posts.list.map(function(post, index) {
          return m("article", m.trust(md.render(post)));
        })
      ])
    ]);
  }
};
