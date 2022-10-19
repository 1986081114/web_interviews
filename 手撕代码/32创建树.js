function Node(data,left, right){
    this.left = left;
    this.right = right;
    this.data = data;
    this.show = function(){
        return this.data
    }
}

function BST(){
    this.root = null
    this.insert = function(data){
        let node = new Node(data,null,null)
        if(this.root == null){
            this.root = node
        }else {
            var current = this.root
            console.log(current)
            var parent;
            while(true){
                parent = current
                if(data< current.data){
                    current = current.left
                    if(current == null){
                        parent.left = node;
                        break
                    }
                }else{
                    current = current.right
                    if(current == null){
                        parent.right = node
                        break
                    }
                }
            }
        }
    }

     this.postOrder = function(node){
        if(node){
            this.postOrder(node.left);
            this.postOrder(node.right);
            console.log(node.show() + " ");
        }
     }

}

var bst = new BST()
var nums = [10,3,18,2,4,13,21,9,8,9];
for(var i = 0;i<nums.length; i++){
    bst.insert(nums[i])
}
bst.postOrder(bst.root)