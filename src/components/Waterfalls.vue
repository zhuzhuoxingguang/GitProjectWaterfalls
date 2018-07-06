<template>
  <scroller 
   class="main"
    :on-refresh="refresh"
    :on-infinite="infinite">
      <div class="waterfalls">
        <ul>
          <li class="photo" v-for="item in waterfallsLeft" :key="item.id + item.albumId+Math.random()">
            <a href="javascrip:;">
              <img :src="item.src" alt="">
            </a>
            <div class="desc-info">
              <p>编号：<span>{{item.albumId}}</span></p>
            </div>
            <div class="thumbnail">
              <div class="thumbnail-desc">
                <p>{{item.title}}</p>
                <span>{{item.thumbnailUrl}}</span>
              </div>
              <div class="praise active">
                <div>
                  <i>赞</i>
                  <span>{{item.albumId}}</span>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <ul>
          <li class="photo" v-for="item in waterfallsRight" :key="item.id + item.albumId+Math.random()">
            <a href="javascrip:;">
              <img :src="item.src" alt="">
            </a>
            <div class="desc-info">
              <p>编号：<span>{{item.albumId}}</span></p>
            </div>
            <div class="thumbnail">
              <div class="thumbnail-desc">
                <p>双语小学</p>
                <span>詹天佑</span>
              </div>
              <div class="praise active">
                <div>
                  <i>赞</i>
                  <span>92</span>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
  </scroller>
</template>

<script>
import axios from "axios";
export default {
  name: 'HelloWorld',
  data() {
    return {
      list: [],
      waterfallsLeft:[],  //  存储在左侧的数据
      waterfallsRight: [],//  存储在右侧的数据
      leftHeight: 0,      //  存储相同宽度情况下，左侧图片的高度
      rightHeight: 0,     //  存储相同宽度情况下，右侧图片的高度
      flag: 0,            //  标志位：检测请求回的数据当中图片是否已经全部加载完毕
      itemsLen: -1,       //  标志位：请求回来的数据条数
      page: 1,            //  无限加载，模拟分页
      pageCount: 10,      //  分页加载每页的条数,
    };
  },
  methods:{
    refresh(done){
      window.location.reload();
    },
    
    infinite(done){
      this.$nextTick(function () { 
        this.getData(done);
      })
    },
    getData(done){
      let _this = this;
      axios.get("https://jsonplaceholder.typicode.com/photos", {page: this.page})
          .then(res=>res.data)
          .then(res => {
            console.log(this.page)
            let counts = res.slice((this.page-1) * this.pageCount, this.page * this.pageCount)
            counts.forEach((item, index) => {
              item.src ='http://cued.xunlei.com/demos/publ/img/P_'+ this.randomNum()+ '.jpg'
            });
            this.page++;
            this.itemsLen = counts.length;
            this.judgeAllLoaded(counts, done)
            
          })
    },
    randomNum(){  // 三位数随机数，162以内
      let random = Math.floor(Math.random() * 162)
      return random = random < 10 ? '00'+random : random < 100 ? '0'+random : ''+random;
    },
    judgeAllLoaded(items, done){   // 判断所有图片是否加载完成
      let _this = this;
      this.$nextTick(function(){
        items.forEach(item => {
          let IMG = new Image();
          IMG.src = item.src;
          IMG.width = 100;
          IMG.onload = function () {  
            _this.flag++;
            if(_this.flag == _this.itemsLen){
              // 这段是标志位，标识这一次的滑动请求完成
              // 之前的这一段是直接放在异步请求函数里面的，产生的结果就是在某些时候，一次滑动会发送一次或者一次以上请求
              // 由于图片加载有异步过程，在所有图片加载完成之后，再标识本次请求结束，避免出现多次请求
              this.bottom = this.bottom + 10;
              if(done) done();
            }
            // 滑动加载之后，恢复标识图片加载完成的数据
            if(_this.flag > _this.itemsLen){
              _this.flag = 1;
            }
            if(_this.leftHeight <= _this.rightHeight){
              _this.leftHeight += IMG.height;
              _this.waterfallsLeft.push(item)
            }else{
              _this.rightHeight += IMG.height;
              _this.waterfallsRight.push(item)
            }
          }
        })
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.main{
  padding: 5px 10px;
  box-sizing: border-box;
}

.waterfalls{
  margin: 0 -5px;
  box-sizing: border-box;
  overflow: hidden;
  ul{
    width: 50%;
    float: left;
    box-sizing: border-box;
    padding: 0 5px;
  }
}
.photo{
  margin-bottom: 0.2rem;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  a{
    display: inline-block;
    img{
      width: 100%;
    }
  }
  .desc-info{
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.3);
    z-index: 2450;
    padding-left: 0.1rem;
    padding-right: 0.1rem;
    p{
      color: #fff;
      font-size: 0.26rem;
      line-height: 1.5;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
}


.thumbnail {
  display: block;
  position: relative;
  padding-right: 0.8rem;
}

.thumbnail-desc {
  padding: 0.1rem;
  line-height: 1.2;
}
.thumbnail-desc > p {
  text-align: left;
  font-size: 0.2rem;
  color: #292929;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.thumbnail-desc > span {
  text-align: left;
  display: block;
  font-size: 0.24rem;
  color: #a1a1a1;
}

.praise {
  display: -webkit-box;
  display: box;
  -webkit-box-align: center;
  -webkit-box-pack: center;
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 0.8rem;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  cursor: pointer;
}
.praise > div {
  text-align: center;
  cursor: pointer;
}
.praise i {
  display: inline-block;
  width: 0.42rem;
  height: 0.38rem;
  line-height: 0.38rem;
  font-size: 0.2rem;
  color: #555;
  border: solid 1px #555;
  border-radius: 4px;
  margin: 0 auto;
}
.praise span {
  display: block;
  line-height: 1.5;
  color: #a1a1a1;
  font-size: 0.24rem;
}

.praise.active i {
  background-color: #ee4520;
  border-color: #ee4520;
  color: #fff;
}

.praise:before {
  content: '';
  width: 1px;
  height: 0.4rem;
  background: #ebebeb;
  position: absolute;
  left: 0;
  top: 50%;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
}

</style>
