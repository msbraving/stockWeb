<template>
  <div class="">
    <div class="tipBox">
        因物流管控，部分地区物流受到一定程度影响。为保证店铺正常运营：
（1）发货时限在2021年1月6日00:00:00至2021年1月11日23:59:58期间，店铺收、发件地为河北省石家庄市、邢台市的订单，发货时限可延至2021年1月11日23:59:59；
（2）发货时限在2020年12月3日00:00:00至2021年1月20日23:59:58期间，店铺收、发件地为新疆维吾尔自治区和田地区的订单，发货时限可延至2021年1月20日23:59:59。
    </div>
    <div class="goods-search-wrap">
        <Form ref="completeInfoModal" :label-width="100" label-position="right">
          <Row>
            <Col span="8">
              <FormItem label="产品ID">
                <Input type="text" :maxlength="20" placeholder="产品ID"></Input>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="产品编码">
                <Input type="text" :maxlength="50"  placeholder="产品编码"></Input>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="产品名称">
                <Input type="text" :maxlength="10"  placeholder="产品名称"></Input>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="产品分类">
                <Input type="text" :maxlength="11" placeholder="产品分类"></Input>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="累计销量">
                 <Row>
                    <Col span="11">
                        <Input type="text" :maxlength="11" placeholder=""></Input>
                    </Col>
                    <Col span="2" style="text-align: center">-</Col>
                    <Col span="11">
                        <Input type="text" :maxlength="11" placeholder=""></Input>
                    </Col>
                </Row>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="当前价">
                <Row>
                    <Col span="11">
                        <Input type="text" :maxlength="11" placeholder=""></Input>
                    </Col>
                    <Col span="2" style="text-align: center">-</Col>
                    <Col span="11">
                        <Input type="text" :maxlength="11" placeholder=""></Input>
                    </Col>
                </Row>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="是否预售">
                <Select style="width:100%;" placeholder="请选择">
                    <Option :value="99">全部</Option>
                    <Option value='Y'>启用</Option>
                    <Option value='N'>停用</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="16" style="text-align: right;">
              <div>
                <Button type="primary" @click="search">
                  <Icon type="search"></Icon>查询
                </Button>
                </a>
              </div>
            </Col>
          </Row>
        </Form>
      </div>
      <div>
        <Row>
            <Col span="20">
                <Row>
                    <Col span="11">

                    </Col>
                    <Col span="11">
                        <div class="low-stock-reminder">
                            <span class="low-stock-img"></span>
                            <span class="text">低库存提醒</span>
                            <a>开启</a>
                        </div>
                    </Col>
                </Row>
            </Col>
            <Col span="4">

            </Col>
        </Row>
        <ButtonGroup>
            <Button>全部</Button>
            <Button>在售中</Button>
            <Button>已售罄</Button>
            <Button type="primary">已下架</Button>
        </ButtonGroup>
        <Button type="primary">发布新产品</Button>
        <Button>批量取消预售</Button>
        <Button >批量设置属性</Button>

      </div>
  </div>
</template>

<script>
    export default {
        data () {
            return {
                theme1: 'light'
            }
        },
        mounted () {
            
        },
        methods: {
            
        }
    }
</script>

<style scoped>
    .tipBox {
        width: 100%;
        margin-top: 10px;
        padding: 10px;
        border: 1px solid #ffd888;
        background: #fff7dd;
        overflow: hidden;
        font-size: 12px;
        color: rgba(0,0,0,.8);
    }
   .goods-search-wrap {
        margin-bottom: 24px;
        padding: 20px 0;
        background-color: #f9f9f9;
    }
    .low-stock-reminder {
       text-align:right;
        font-size: 12px;
        color: #333;
    }
    .goods-list .low-stock-reminder .low-stock-img {
        position: absolute;
        left: -10px;
        top: 3px;
        display: inline-block;
        width: 12px;
        height: 12px;
        background: url(//commimg.pddpic.com/mms_static/2019-05-27/f5fe5287-4237-438c-be47-66555323a241.png) no-repeat;
        -moz-background-size: 10px;
        background-size: 10px;
    }
    .goods-list .low-stock-reminder .text {
        margin-left: 6px;
        margin-right: 10px;
    }
</style>
