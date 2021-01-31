document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('input').forEach((box) => {
        let key = box.dataset.key;
        chrome.storage.sync.get(key, data => {
            if (data[key] === undefined) {
                //first use
                let params = {};
                params[key] = 'true';
                chrome.storage.sync.set(params);
            }
            else if (data[key] === true){
                box.checked = true;
            }
            box.onclick = () => {
                let params = {};
                params[key] = box.checked;
                chrome.storage.sync.set(params);
            }
        })
    })
})