


//displays todolist according to the flag set
var items = document.getElementsByTagName('li');
for (var i = 0; i < items.length; i++) {
        items[i].setAttribute('id', i);
        //flag 1 means checked ,0 means unchecked
        items[i].setAttribute('status', items[i].getAttribute('flag'));
        console.log(items[i].getAttribute('flag'));
        if (items[i].getAttribute('status') == 0) {
                items[i].setAttribute('style', 'text-decoration:none');
        }

        else {
                items[i].setAttribute('style', 'text-decoration:line-through');
        }
}


//updates flag when clicked
function update(evt) {
        var item = document.getElementById(evt.id);

        if (item.getAttribute('status') == 0) {
                item.setAttribute('status', '1');
                item.setAttribute('style', 'text-decoration:line-through');
        }

        else {
                item.setAttribute('status', '0');
                item.setAttribute('style', 'text-decoration:none');
        }


        fetch('todo', {
                        headers: {
                                'Content-Type': 'application/json'
                        },

                        method: 'put',
                        body: JSON.stringify({
                                'todo': item.innerHTML,
                                'flag': item.getAttribute('status')
                        })
                })
                .then(response => {
                        if (response.ok) return response.json()
                })
                .then(data => {
                        console.log(data)
                })

}