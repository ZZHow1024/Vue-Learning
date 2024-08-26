<template>
  <div class="App">
    <!-- 快捷链接  -->
    <div class="shortcut">
      <div class="wrapper">
        <ul>
          <li><a href="#" class="login">请先登录</a></li>
          <li><a href="#">免费注册</a></li>
          <li><a href="#">我的订单</a></li>
          <li><a href="#">会员中心</a></li>
          <li><a href="#">帮助中心</a></li>
          <li><a href="#">在线客服</a></li>
          <li>
            <a href="#"
              ><span class="iconfont icon-mobile-phone"></span>手机版</a
            >
          </li>
        </ul>
      </div>
    </div>

    <!-- 头部导航  -->
    <div class="header wrapper">
      <!-- logo -->
      <div class="logo">
        <h1>
          <a href="#">小兔鲜儿</a>
        </h1>
      </div>
      <!-- 导航 -->
      <div class="nav">
        <ul>
          <li><a href="#">首页</a></li>
          <li><a href="#">生鲜</a></li>
          <li><a href="#">美食</a></li>
          <li><a href="#">餐厨</a></li>
          <li><a href="#">电器</a></li>
          <li><a href="#">居家</a></li>
          <li><a href="#">洗护</a></li>
          <li><a href="#">孕婴</a></li>
          <li><a href="#">服装</a></li>
        </ul>
      </div>
      <!-- 搜索 -->
      <div class="search">
        <span class="iconfont icon-search"></span>
        <input type="text" placeholder="搜一搜" />
      </div>
      <!-- 购物车 -->
      <div class="cart">
        <span class="iconfont icon-cart-full"></span>
        <i>2</i>
      </div>
    </div>

    <!-- 轮播区域 -->
    <div class="banner">
      <div class="wrapper">
        <!-- 图 -->
        <ul class="pic">
          <li>
            <a href="#"><img src="@/assets/images/banner1.png" alt="" /></a>
          </li>
          <li>
            <a href="#"><img src="@/assets/images/banner1.png" alt="" /></a>
          </li>
        </ul>
        <!-- 侧导航 -->
        <div class="subnav">
          <ul>
            <li>
              <div>
                <span><a href="#">生鲜</a></span>
                <span><a href="#">水果</a><a href="#">蔬菜</a></span>
              </div>
              <i class="iconfont icon-arrow-right-bold"></i>
            </li>
            <li>
              <div>
                <span><a href="#">美食</a></span>
                <span><a href="#">面点</a><a href="#">干果</a></span>
              </div>
              <i class="iconfont icon-arrow-right-bold"></i>
            </li>
            <li>
              <div>
                <span><a href="#">餐厨</a></span>
                <span><a href="#">数码产品</a></span>
              </div>
              <i class="iconfont icon-arrow-right-bold"></i>
            </li>
            <li>
              <div>
                <span><a href="#">电器</a></span>
                <span
                  ><a href="#">床品</a><a href="#">四件套</a
                  ><a href="#">被枕</a></span
                >
              </div>
              <i class="iconfont icon-arrow-right-bold"></i>
            </li>
            <li>
              <div>
                <span><a href="#">居家</a></span>
                <span
                  ><a href="#">奶粉</a><a href="#">玩具</a
                  ><a href="#">辅食</a></span
                >
              </div>
              <i class="iconfont icon-arrow-right-bold"></i>
            </li>
            <li>
              <div>
                <span><a href="#">洗护</a></span>
                <span
                  ><a href="#">洗发</a><a href="#">洗护</a
                  ><a href="#">美妆</a></span
                >
              </div>
              <i class="iconfont icon-arrow-right-bold"></i>
            </li>
            <li>
              <div>
                <span><a href="#">孕婴</a></span>
                <span><a href="#">奶粉</a><a href="#">玩具</a></span>
              </div>
              <i class="iconfont icon-arrow-right-bold"></i>
            </li>
            <li>
              <div>
                <span><a href="#">服饰</a></span>
                <span><a href="#">女装</a><a href="#">男装</a></span>
              </div>
              <i class="iconfont icon-arrow-right-bold"></i>
            </li>
            <li>
              <div>
                <span><a href="#">杂货</a></span>
                <span><a href="#">户外</a><a href="#">图书</a></span>
              </div>
              <i class="iconfont icon-arrow-right-bold"></i>
            </li>
            <li>
              <div>
                <span><a href="#">品牌</a></span>
                <span><a href="#">品牌制造</a></span>
              </div>
              <i class="iconfont icon-arrow-right-bold"></i>
            </li>
          </ul>
        </div>
        <!-- 指示器 -->
        <ol>
          <li class="current"><i></i></li>
          <li><i></i></li>
          <li><i></i></li>
        </ol>
      </div>
    </div>

    <!-- 新鲜好物 -->
    <div class="goods wrapper">
      <div class="title">
        <div class="left">
          <h3>新鲜好物</h3>
          <p>新鲜出炉 品质靠谱</p>
        </div>
        <div class="right">
          <a href="#" class="more"
            >查看全部<span class="iconfont icon-arrow-right-bold"></span
          ></a>
        </div>
      </div>
      <div class="bd">
        <ul>
          <li>
            <a href="#">
              <div class="pic"><img src="@/assets/images/goods1.png" alt="" /></div>
              <div class="txt">
                <h4>KN95级莫兰迪色防护口罩</h4>
                <p>¥ <span>79</span></p>
              </div>
            </a>
          </li>
          <li>
            <a href="#">
              <div class="pic"><img src="@/assets/images/goods2.png" alt="" /></div>
              <div class="txt">
                <h4>KN95级莫兰迪色防护口罩</h4>
                <p>¥ <span>566</span></p>
              </div>
            </a>
          </li>
          <li>
            <a href="#">
              <div class="pic"><img src="@/assets/images/goods3.png" alt="" /></div>
              <div class="txt">
                <h4>法拉蒙高颜值记事本可定制</h4>
                <p>¥ <span>58</span></p>
              </div>
            </a>
          </li>
          <li>
            <a href="#">
              <div class="pic"><img src="@/assets/images/goods4.png" alt="" /></div>
              <div class="txt">
                <h4>科技布布艺沙发</h4>
                <p>¥ <span>3759</span></p>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </div>

    <!-- 热门品牌 -->
    <div class="hot">
      <div class="wrapper">
        <div class="title">
          <div class="left">
            <h3>热门品牌</h3>
            <p>国际经典 品质认证</p>
          </div>
          <div class="button">
            <a href="#"><i class="iconfont icon-arrow-left-bold"></i></a>
            <a href="#"><i class="iconfont icon-arrow-right-bold"></i></a>
          </div>
        </div>
        <div class="bd">
          <ul>
            <li>
              <a href="#">
                <img src="@/assets/images/hot1.png" alt="" />
              </a>
            </li>
            <li>
              <a href="#">
                <img src="@/assets/images/hot2.png" alt="" />
              </a>
            </li>
            <li>
              <a href="#">
                <img src="@/assets/images/hot3.png" alt="" />
              </a>
            </li>
            <li>
              <a href="#">
                <img src="@/assets/images/hot4.png" alt="" />
              </a>
            </li>
            <li>
              <a href="#">
                <img src="@/assets/images/hot5.png" alt="" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    
    <!-- 最新专题 -->
    <div class="topic wrapper">
      <div class="title">
        <div class="left">
          <h3>最新专题</h3>
        </div>
        <div class="right">
          <a href="#" class="more"
            >查看全部<span class="iconfont icon-arrow-right-bold"></span
          ></a>
        </div>
      </div>
      <div class="topic_bd">
        <ul>
          <li>
            <a href="#">
              <div class="pic">
                <img src="@/assets/images/topic1.png" alt="" />
                <div class="info">
                  <div class="left">
                    <h5>吃这些美食才不算辜负自己</h5>
                    <p>餐厨起居洗护好物</p>
                  </div>
                  <div class="right">¥<span>29.9</span>起</div>
                </div>
              </div>
              <div class="txt">
                <div class="left">
                  <p>
                    <span class="iconfont icon-favorites-fill red"></span>
                    <i>1200</i>
                  </p>
                  <p>
                    <span class="iconfont icon-browse"></span>
                    <i>1800</i>
                  </p>
                </div>
                <div class="right">
                  <span class="iconfont icon-comment"></span>
                  <i>246</i>
                </div>
              </div>
            </a>
          </li>
          <li>
            <a href="#">
              <div class="pic">
                <img src="@/assets/images/topic2.png" alt="" />
                <div class="info">
                  <div class="left">
                    <h5>吃这些美食才不算辜负自己</h5>
                    <p>餐厨起居洗护好物</p>
                  </div>
                  <div class="right">¥<span>29.9</span>起</div>
                </div>
              </div>
              <div class="txt">
                <div class="left">
                  <p>
                    <span class="iconfont icon-fabulous"></span>
                    <i>1200</i>
                  </p>
                  <p>
                    <span class="iconfont icon-browse"></span>
                    <i>1800</i>
                  </p>
                </div>
                <div class="right">
                  <span class="iconfont icon-comment"></span>
                  <i>246</i>
                </div>
              </div>
            </a>
          </li>
          <li>
            <a href="#">
              <div class="pic">
                <img src="@/assets/images/topic3.png" alt="" />
                <div class="info">
                  <div class="left">
                    <h5>吃这些美食才不算辜负自己</h5>
                    <p>餐厨起居洗护好物</p>
                  </div>
                  <div class="right">¥<span>29.9</span>起</div>
                </div>
              </div>
              <div class="txt">
                <div class="left">
                  <p>
                    <span class="iconfont icon-fabulous"></span>
                    <i>1200</i>
                  </p>
                  <p>
                    <span class="iconfont icon-browse"></span>
                    <i>1800</i>
                  </p>
                </div>
                <div class="right">
                  <span class="iconfont icon-comment"></span>
                  <i>246</i>
                </div>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </div>

    <!-- 版权底部 -->
    <div class="footer">
      <div class="wrapper">
        <div class="service">
          <ul>
            <li>
              <span></span>
              <p>价格亲民</p>
            </li>
            <li>
              <span></span>
              <p>物流快捷</p>
            </li>
            <li>
              <span></span>
              <p>品质新鲜</p>
            </li>
            <li>
              <span></span>
              <p>售后无忧</p>
            </li>
          </ul>
        </div>
        <div class="help">
          <div class="left">
            <dl>
              <dt>购物指南</dt>
              <dd><a href="#">购物流程</a></dd>
              <dd><a href="#">支付方式</a></dd>
              <dd><a href="#">售后规则</a></dd>
            </dl>
            <dl>
              <dt>配送方式</dt>
              <dd><a href="#">配送运费</a></dd>
              <dd><a href="#">配送范围</a></dd>
              <dd><a href="#">配送时间</a></dd>
            </dl>
            <dl>
              <dt>关于我们</dt>
              <dd><a href="#">平台规则</a></dd>
              <dd><a href="#">联系我们</a></dd>
              <dd><a href="#">问题反馈</a></dd>
            </dl>
            <dl>
              <dt>售后服务</dt>
              <dd><a href="#">售后政策</a></dd>
              <dd><a href="#">退款说明</a></dd>
              <dd><a href="#">取消订单</a></dd>
            </dl>
            <dl>
              <dt>服务热线</dt>
              <dd>
                <a href="#"
                  >在线客服<span class="iconfont icon-customer-service"></span
                ></a>
              </dd>
              <dd><a href="#">客服电话 400-0000-000</a></dd>
              <dd><a href="#">工作时间 周一至周日 8:00-18:00</a></dd>
            </dl>
          </div>
          <div class="right">
            <ul>
              <li>
                <div><img src="@/assets/images/wechat.png" alt="" /></div>
                <p>微信公众号</p>
              </li>
              <li>
                <div><img src="@/assets/images/app.png" alt="" /></div>
                <p>APP下载二维码</p>
              </li>
            </ul>
          </div>
        </div>
        <div class="copyright">
          <p>
            <a href="#">关于我们</a>|<a href="#">帮助中心</a>|<a href="#"
              >售后服务</a
            >|<a href="#">配送与验收</a>|<a href="#">商务合作</a>|<a href="#"
              >搜索推荐</a
            >|<a href="#">友情链接</a>
          </p>
          <p>CopyRight © 小兔鲜</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style></style>
