

module.exports=function (oldcart) {
    this.Items=oldcart.Items||{};
    this.totalPrice=oldcart.totalPrice||0;
    this.totalQty=oldcart.totalQty||0;

    this.add=function (item,id) {
        var storedItem=this.Items[id];
        if(!storedItem)
        {
            storedItem=this.Items[id]={item:item,qty:0,price:0,ide:id};
        }
        storedItem.qty++;
        storedItem.price=(storedItem.item.price)*(storedItem.qty);
        this.totalQty++;
        this.totalPrice+=storedItem.item.price;
    }
    
    this.remove=function (item,id) {
        this.totalPrice-=(this.Items[id].item.price);
        this.totalQty--;
        this.Items[id].price-=this.Items[id].item.price;
        if(this.Items[id].qty==1){
            delete(this.Items[id]);
        }
        else{
            this.Items[id].qty--;
        }


    }

    this.generateArray=function () {
        var arr=[];
        for(var id in this.Items){
            arr.push(this.Items[id]);
        }
        return arr;
    }
}