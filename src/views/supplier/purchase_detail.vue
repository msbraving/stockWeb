<template>
  <div class="index">
    <h2 class="title">采购申请单</h2>
    <Form :model="infoForm" :label-width="100">
      <Row>
        <Col span="8">
        <FormItem label="申请日期">
          <div class="form_text">{{'2020-01-13'}}</div>
        </FormItem>
        </Col>
        <Col span="8">
        <FormItem label="申请编号">
          <Select v-model="infoForm.classify">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        </Col>
        <Col span="8">
        <FormItem label="申请人">
          <Select v-model="infoForm.classify">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        </Col>
        <Col span="12">
        <FormItem label="所属公司">
          <Select v-model="infoForm.classify">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        </Col>
        <Col span="12">
        <FormItem label="部门">
          <Select v-model="infoForm.classify">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        </Col>
        <Col span="12">
        <FormItem label="业务大类">
          <Select v-model="infoForm.classify">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        </Col>
        <Col span="12">
        <FormItem label="采购总金额">
          <Select v-model="infoForm.classify">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        </Col>
        <h3>收货地址及联系人</h3>
        <FormItem label="详细地址">
          <Select v-model="infoForm.classify">
            <div class="form_text">{{'2020-01-13'}}</div>
          </Select>
        </FormItem>
        <Col span="8">
        <FormItem label="联系人">
          <div class="form_text">{{'2020-01-13'}}</div>
        </FormItem>
        </Col>
        <Col span="8">
        <FormItem label="手机号">
          <Select v-model="infoForm.classify">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        </Col>
        <Col span="8">
        <FormItem label="固定电话">
          <Select v-model="infoForm.classify">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        </Col>
        <h3>采购清单</h3>
        <Col span="8">
        <FormItem label="供应商">
          <Select v-model="infoForm.classify">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        </Col>
        <Col span="8">
        <FormItem label="供应商地点">
          <Select v-model="infoForm.classify">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        </Col>
        <Col span="24">
        <FormItem :label-width="0">
          <div class="table">
            <Table border :columns="columns1" :data="data1">
              <template slot-scope="{ row, index }" slot="action">
                <Button type="primary" size="small" @click="show(index)">删除</Button>
              </template>
            </Table>
          </div>
        </FormItem>
        </Col>
      </Row>
    </Form>
    <div class="submit_btn">
      <Button type="primary">发货</Button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      infoForm: {},
      cityList: [],
      columns1: [
        {
          title: '申请日期',
          key: 'name',
          align: 'center',
        },
        {
          title: '申请编号',
          key: 'age',
          align: 'center',
        },
        {
          title: '申请人',
          key: 'age',
          align: 'center',
        },
        {
          title: '所属公司',
          key: 'age',
          align: 'center',
        },
        {
          title: '部门',
          key: 'age',
          align: 'center',
        },
        {
          title: '业务大类',
          key: 'age',
          align: 'center',
        },
        {
          title: '采购总金额',
          key: 'age',
          align: 'center',
        },
        {
          title: '状态',
          key: 'age',
          align: 'center',
        },
        {
          title: '操作',
          slot: 'action',
          key: 'age',
          align: 'center',
        },
      ],
      data1: [
        {
          name: 'John Brown',
          age: 18,
          address: 'New York No. 1 Lake Park',
          date: '2016-10-03',
        },
        {
          name: 'Jim Green',
          age: 24,
          address: 'London No. 1 Lake Park',
          date: '2016-10-01',
        },
        {
          name: 'Joe Black',
          age: 30,
          address: 'Sydney No. 1 Lake Park',
          date: '2016-10-02',
        },
        {
          name: 'Jon Snow',
          age: 26,
          address: 'Ottawa No. 2 Lake Park',
          date: '2016-10-04',
        },
      ],
    }
  },
  components: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {},
}
</script>

<style scoped lang="less">
.index {
  background-color: #ffffff;
  padding: 15px;
  .title {
    text-align: center;
    margin-bottom: 20px;
  }
  .submit_btn{
      display: flex;
      justify-content: center;
  }
}
</style>
