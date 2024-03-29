const data = [
  { userId: 8, title: 'title1' },
  { userId: 11, title: 'other' },
  { userId: 15, title: null },
  { userId: 19, title: 'title2' }
];

// 查找data中，符合条件的数据，并进行排序
const result = find(data).where({
  "title": /\d$/
}).orderBy('userId', 'desc');

// 输出
console.log(result)
/* [{ userId: 19, title: 'title2' }, { userId: 8, title: 'title1' }]; */

function find(origin) {
  return {
    data: origin,
    where: function (searchObj) {
      console.log(searchObj)
      const keys = Reflect.ownKeys(searchObj)
      console.log(keys)

      for (let i = 0; i < keys.length; i++) {
        console.log(searchObj[keys[i]])
        this.data = this.data.filter(item => searchObj[keys[i]].test(item[keys[i]]))
      }

      return this
    },
    orderBy: function (key, sorter) {
      this.data.sort((a, b) => {
        return sorter === 'desc' ? b[key] - a[key] : a[key] - b[key]
      })

      return this.data
    }
  }
}