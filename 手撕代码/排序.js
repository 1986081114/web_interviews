/*                       平均    最坏     最好    空间      稳定性  
排序：
    插入排序：
         直接插入排序：    n2     n2       n       1         稳定
         希尔排序：        n1.5   n2       n       1         不稳定
    选择排序：
         简单选择排序：    n2      n2      n2       1         不稳定
         堆排序：         nlogn   nlogn    nlogn   1          不稳定
    交换排序：
        冒泡排序：        n2       n2       n       1         wending
         快速排序：       nlogn     n2      nlogn    nlogn      不稳定
    归并排序：
    基数排序：
    归并排序：
*/

//直接插入排序： 将数组中所有元素依次跟前面已经排序好的元素相比较， 如果小，交换 
let array = [9,1,2,5,7,4,8,6,3,5]
   function insertSort(array) {
      let j, temp 
    for(let i = 1; i< array.length; i++) {
        j = i-1;
        current = array[i]
        while(j>=0 && current < array[j]) {
            array[j+1] = array[j]
            j--
        }
        array[j+1] = current;
    }
    return array
   }

   console.log(insertSort(array))

   //希尔排序： 将待排序数组按步长分组， 然后每组元素利用直接插入排序方法排序， 每次将步长减小，循环直到步长等于1完成

   function shellSort(array) {
       //按照步长知道等于1
      for(let step = array.length>>1; step>0; step >>= 1) {
          //根据步长把数组分组
         for(let i = step; i<array.length; i++) {
             let j = i; 
             let current = array[i]
             while(j-step >=0 && current < array[j - step]) {
                 array[j] = array[j-step]
                 j = j-step
             }
             array[j] = current

         }
      }
      return array
   }
   console.log(shellSort(array))

   //选择排序：从原数组找到最小的元素，放在最前面， 然后再从剩下的元素中寻找最小的元素，
   function selectSort(array) {
       for(let i = 0; i<array.length; i++) {
        let min = i;
        for(let j = i+1; j< array.length; j++) {
            if(array[j] < array[min]) {
                min = j
            }
            [array[i],array[min]] = [array[min], array[i]]

        }
       }
       return array
   }
console.log(selectSort(array))

//冒泡排序：比较相邻的元素，如果前一个比后一个大，交换， 第一轮最后一个元素最大，
function bubbleSort(array) {
    for(let i = array.length-1; i>0; i--) {
        for(let j =0; j<i; j++) {
            if(array[j] > array[j+1]) {
                [array[j], array[j+1]] = [array[j+1], array[j]]
            }
        }
    }
    return array
}  
console.log(bubbleSort(array))

//快速排序： 冒泡排序的一种改进， 第一趟将数组分为两半， 左边部分比当前值都小，右边比当前值大， 递归调用
  //递归快速排序：
function quickSort(array) {

}
//归并排序：
function mergeSort(nums) {
  if(nums.length < 2) return nums;
  const mid = parseInt(nums.length / 2);
  let left = nums.slice(0,mid);
  let right = nums.slice(mid);
  return merge(mergeSort(left), mergeSort(right));
  }
  
  function merge(left , right) {   //该函数与快排类似，但是仔细发现，每次left或者right都是要shift掉第一个元素，表示left或者right是会变化的，最后arr.concat，因为不知道left或者right其中一个哪个剩下元素，所以要将剩下的元素给加上
    var arr = [];
    var res = 0;
    while(left.length && right.length) {
      if(left[0] < right[0]) {
        arr.push(left.shift());
        res += 1;
      }else {
        arr.push(right.shift())
      }
    }
    return res;
  }
  console.log('----------')
  console.log(mergeSort( [7,5,6,4]))