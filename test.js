let folder = {
    size: 2000,
    name: 'folder',
    'other object': 'folder',
    del: 123
}

console.log(folder.name)
console.log(folder['other object'])

let sizeKey = 'size'
console.log(folder[sizeKey], folder['na' + 'me'])

console.log(folder)
delete folder.del
console.log(folder)