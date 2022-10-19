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
      let j
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
function bubbleSort(arr){
    for(let i = 0; i< arr.length-1; i++ ){
      for(let j = 0 ; j <arr.length-i-1; j++){
        if(arr[j+1] < arr[j]){
          [arr[j+1],arr[j]] = [arr[j],arr[j+1]]
        }
      }
    }
    return arr
  } 
console.log(bubbleSort(array))

//快速排序： 冒泡排序的一种改进， 第一趟将数组分为两半， 左边部分比当前值都小，右边比当前值大， 递归调用
  //递归快速排序：
  function quickSort(arr){
    if(arr.length<2) return arr
    const cur = arr[arr.length-1]
    const left = arr.filter((v,i) =>v <=cur && i !== arr.length-1)
    const right = arr.filter((v) => v>cur)
    return [...quickSort(left), cur, ...quickSort(right)]
  }
  var sortArray = function(nums, s= 0, e = nums.length - 1) { 
    if(s>e) return;
    let p=nums[s],l = s, r = e;
    while(l<r) {
        while(l<r && nums[r]>=p) r--;
        while(l<r && nums[l]<=p) l++;
        [nums[l],nums[r]] = [nums[r], nums[l]]
    }
    [nums[s], nums[r]] = [nums[r], nums[s]];
    sortArray(nums, s, r-1);
    sortArray(nums, r+1,e);
    return nums;
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


//二分查找
var searchInsert = function(nums, target) {
    const n = nums.length;
    let left = 0, right = n - 1, ans = n;
    while (left <= right) {
        let mid = ((right - left) >> 1) + left;
        if (target <= nums[mid]) {
            ans = mid;
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
    return ans;
};

//根据bil得到比target第一个大的数和第一个等于target的数
function bianrySort(nums, target, bol){
    let left = 0, right = nums.length-1,res = nums.length;
    while(left <=right){
        let mid = (left + right)>>1
        if(nums[mid] >target ||(bol && nums[mid]>=target)){
            right = mid-1
            res = mid
        }else {
            left = mid+1
        }  
    }
    return res
}

// 找比根号x小的数
var mySqrt = function(x) {
    let left = 0
    let right = (x>>1) + 1
    let res= -1
    console.log(res)
    while( left <= right){
       let mid = (left + right) >>1
       if(mid*mid <=x){  
           res = mid
           left = mid+1
       }else {
           right = mid-1
       }
    } 
    return res
};