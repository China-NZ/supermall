// 导入
import { request1 } from "./request";

export function getDetail(id){
  return request1({
    url:'/detail',
    params:{
      id
    }
  })
}
// 创建一个类 把接口中的属性抽取出来，统一到这个类中，以便详情页去调用
export class Goods {
  constructor(itemInfo, columns, services) {
    this.id = itemInfo.iid;
    this.title = itemInfo.title;
    this.desc = itemInfo.desc;
    this.newPrice = itemInfo.price;
    this.oldPrice = itemInfo.oldPrice;
    this.discount = itemInfo.discountDesc;
    this.columns = columns;
    this.services = services;
    this.realPrice = itemInfo.lowNowPrice;
  }
}

export class GoodsParam{
  constructor(info,rule){
    // 注：images可能没有值(某些商品有值，某些没有值)
    this.image = info.image ? info.image[0]:''
    this.infos = info.set
    this.sizes = rule.tables
  }
}

export class Shop {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.fans = shopInfo.cFans;
    this.sells = shopInfo.cSells;
    this.score = shopInfo.score;
    this.goodsCount = shopInfo.cGoods;
  }
}