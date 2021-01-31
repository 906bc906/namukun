
new MutationObserver(function(mutations){cut_namu();}).observe(
    document.querySelector("title"),
    { childList: true }
);

function cut_namu() {

    chrome.storage.sync.get("add_link_title", data => { if (data["add_link_title"] === true) {
        let li = document.body.getElementsByClassName("wiki-link-internal");
        for (let b of li) {
            if (b.getAttribute("rel") === "nofollow" || b.textContent == "???" || (b.childElementCount >= 1 && b.children[0].className.indexOf("image") != -1)) continue;
            if (b.getAttribute("title").indexOf(b.textContent) == -1 && b.textContent.indexOf(b.getAttribute("title")) == -1) {
                b.textContent = b.textContent + "(" + b.getAttribute("title") + ")";
            }
        }
    }})

    chrome.storage.sync.get("delete_3dot", data => { if (data["delete_3dot"] === true) {
        var n, a = [], walk = document.createTreeWalker(document, NodeFilter.SHOW_TEXT, null, false);
        while (n = walk.nextNode()) a.push(n);
        for (let b of a) {
            b.nodeValue = b.nodeValue.replace(/\(\.+\)/gi, "");
            b.nodeValue = b.nodeValue.replace(/\([?!]+\)/gi, "");
        }
    }})


    chrome.storage.sync.get("delete_del", data => { if (data["delete_del"] === true) {
        li = document.body.getElementsByTagName("del");
        for (let i = li.length - 1; i >= 0; i--) {
            //if (li[i].previousElementSibling === null) continue;
            if (li[i].previousSibling === null) {
                continue;
            }
            li[i].remove();
        }
    }})

    chrome.storage.sync.get("delete_sidebar", data => { if (data["delete_sidebar"] === true) {
        for (let a of  document.body.getElementsByTagName("aside"))
            a.remove();
    }})
}
