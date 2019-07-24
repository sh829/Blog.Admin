<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
               <!-- 当一个 form 元素中只有一个输入框时，在该输入框中按下回车应提交该表单。
        如果希望阻止这一默认行为，可以在 <el-form> 标签上添加 @submit.native.prevent -->
            <el-form :inline="true" :model="filters" @submit.native.prevent>
                <el-form-item>
                    <el-input v-model="filters.name" placeholder="姓名"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="getAdvisory">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleAdd">新增</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleExport">导出Excel</el-button>
                </el-form-item>
                 <el-form-item>
                    <el-button type="primary" @click="handleImport">导入Excel</el-button>
                </el-form-item>
            </el-form>
        </el-col>
         <!--列表-->
        <el-table :data="advisory" highlight-current-row v-loading="listLoading" @selection-change="selsChange"
                  style="width: 100%;">
            <el-table-column type="selection" width="30">
            </el-table-column>
            <el-table-column type="index" width="40">
            </el-table-column>
             <el-table-column prop="AdvisoryTime" label="咨询日期" width="" sortable>
            </el-table-column>
            <el-table-column prop="Name" label="姓名" width="" sortable>
            </el-table-column>
            <el-table-column prop="PhoneNumber" label="联系方式" width="" >
            </el-table-column>
            <el-table-column prop="Age" label="年龄" width="" sortable>
            </el-table-column>
            <el-table-column prop="ScheduledDate" label="意向日期"  width="" sortable>
            </el-table-column>
            <el-table-column prop="PredictNumber" label="预计人数" width=""  sortable>
            </el-table-column>
            <el-table-column prop="Source" label="来源"  width="" >
            </el-table-column>
            <el-table-column prop="Deposit" label="定金" width="" sortable>
            </el-table-column>
            <el-table-column prop="DepositTime" label="交定金日期"  width="" sortable>
            </el-table-column>
            <el-table-column prop="FirstInfo" label="第一次跟进情况" width=""  sortable>
            </el-table-column>
            <el-table-column prop="SecondInfo" label="第二次跟进情况"  width="" sortable>
            </el-table-column>
            <el-table-column prop="ThirdInfo" label="第三次跟进情况" width="" sortable>
            </el-table-column>
            <el-table-column prop="Remark" label="备注"  width="" >
            </el-table-column>
            <el-table-column label="操作" width="150">
                <template scope="scope">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--工具条-->
        <el-col :span="24" class="toolbar">
            <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
            <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="50"
                           :total="total" style="float:right;">
            </el-pagination>
        </el-col>
        
        <!--编辑界面-->
        <!-- ref 被用来给元素或子组件注册引用信息。引用信息将会注册在父组件的 $refs 对象上。如果在普通的 DOM 元素上使用，
        引用指向的就是 DOM 元素；如果用在子组件上，引用就指向组件实例： -->
        <el-dialog title="编辑" :visible.sync="editFormVisible" v-model="editFormVisible" :close-on-click-modal="false">
            <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
                <el-form-item label="咨询日期" >
                    <el-date-picker type="date" v-model="editForm.AdvisoryTime" placeholder="选择日期"></el-date-picker>
                </el-form-item>
                <el-form-item label="姓名" prop="Name">
                    <el-input v-model="editForm.Name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="联系方式">
                    <el-input v-model="editForm.PhoneNumber" :min="0" :max="200"></el-input>
                </el-form-item>
                 <el-form-item label="年龄">
                    <el-input v-model="editForm.Age" :min="0" :max="200"></el-input>
                </el-form-item>
                 <el-form-item label="意向日期">
                    <el-date-picker type="date" placeholder="选择日期" v-model="editForm.ScheduledDate"></el-date-picker>
                </el-form-item>
                 <el-form-item label="预计人数">
                    <el-input v-model="editForm.PredictNumber" :min="0" :max="200"></el-input>
                </el-form-item>
                 <el-form-item label="来源">
                    <el-input v-model="editForm.Source" :min="0" :max="200"></el-input>
                </el-form-item>
                 <el-form-item label="定金">
                    <el-input-number v-model="editForm.Deposit" :min="0" :max="200"></el-input-number>
                </el-form-item>
                <el-form-item label="交定金日期">
                    <el-date-picker type="date" placeholder="选择日期" v-model="editForm.DepositTime"></el-date-picker>
                </el-form-item>
                 <el-form-item label="第一次跟进情况">
                    <el-input v-model="editForm.FirstInfo" :min="0" :max="200"></el-input>
                </el-form-item>
                  <el-form-item label="第二次跟进情况">
                    <el-input v-model="editForm.SecondInfo" :min="0" :max="200"></el-input>
                </el-form-item>
                  <el-form-item label="第三次跟进情况">
                    <el-input v-model="editForm.ThirdInfo" :min="0" :max="200"></el-input>
                </el-form-item>
                 <el-form-item label="备注" prop="Name">
                    <el-input type="textarea" v-model="editForm.Remark" ></el-input>
                </el-form-item>
               
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="editFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
            </div>
        </el-dialog>

        <!--新增界面-->
        <el-dialog title="新增" :visible.sync="addFormVisible" v-model="addFormVisible" :close-on-click-modal="false">
       
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                <el-tab-pane label="基本信息" name="first">
                    <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
                            <el-form-item label="咨询日期" prop="AdvisoryTime">
                                <el-date-picker type="date" v-model="addForm.AdvisoryTime" placeholder="选择日期"></el-date-picker>
                            </el-form-item>
                            <el-form-item label="姓名" prop="Name">
                                <el-input v-model="addForm.Name" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="联系方式">
                                <el-input v-model="addForm.PhoneNumber" :min="0" :max="200"></el-input>
                            </el-form-item>
                            <el-form-item label="年龄">
                                <el-input v-model="addForm.Age" :min="0" :max="200"></el-input>
                            </el-form-item>
                            <el-form-item label="预定日期">
                                <el-date-picker type="date" placeholder="选择日期" v-model="addForm.ScheduledDate"></el-date-picker>
                            </el-form-item>
                           
                        </el-form>
                        
                </el-tab-pane>
                <el-tab-pane label="派对信息" name="second">
                    <el-form :model="bookInfo" label-width="80px" :rules="addFormRules" ref="addForm">
                            <el-form-item label="实到人数" >
                                <el-input v-model="bookInfo.ActualNumber"></el-input>
                            </el-form-item>
                            <el-form-item label="主题" prop="TopicName">
                                <el-select v-model="bookInfo.TopicName" placeholder="请选择主题">
                                    <el-option :key="0" :label="请选择主题" :value="0"></el-option>
                                    <el-option v-for="item in topics" :key="item.Id" :label="item.Name" :value="item.Id"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="主题色系"> 
                                <el-input v-model="bookInfo.TopicColor" :min="0" :max="200"></el-input>
                            </el-form-item>
                            <el-form-item label="主题套系（价格）" prop="Price">
                                <el-input v-model="bookInfo.Price" :min="0" :max="200"></el-input>
                            </el-form-item>
                             <el-form-item label="自助消费">
                                <el-select v-model="bookInfo.BuffetCost" placeholder="请选择消费套餐">
                                    <el-option :key="0" :label="请选择消费套餐" :value="0"></el-option>
                                    <el-option v-for="item in buffets" :key="item.Id" :label="item.Name" :value="item.Id"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="餐饮消费">
                                <el-input-number v-model="bookInfo.FoodCost" :min="0" :max="200"></el-input-number>
                            </el-form-item>
                             <el-form-item label="总消费">
                                <el-input-number v-model="bookInfo.TotalCost" :min="0" :max="200"></el-input-number>
                            </el-form-item>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="额外项目" name="third">
                    <!--工具条-->
                    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
                        <el-form>
                            <el-form-item>
                                <el-input v-model="filters.name" placeholder="姓名"  style="width: 30%;"></el-input>
                                 <el-button type="primary" @click="getAdvisory" >查询</el-button>
                                 <el-button type="primary" @click="handleAdd">新增</el-button>
                                  <el-button type="primary" @click="handleAdd">删除</el-button>
                            </el-form-item>
                        </el-form>
                    </el-col>
                    <el-table :data="extraProjectInfos" highlight-current-row v-loading="listLoading" @selection-change="selsChange"
                            style="width: 100%;">
                            <el-table-column type="selection" width="30">
                            </el-table-column>
                            <el-table-column type="index" width="40">
                            </el-table-column>
                            <el-table-column prop="Name" label="项目名称" width="" sortable>
                            </el-table-column>
                            <el-table-column prop="Cost" label="费用" width="" >
                            </el-table-column>
                            
                            <el-table-column label="操作" width="150">
                                <template scope="scope">
                                    <el-button size="small" @click="handleExtraProjectEdit(scope.$index, scope.row)">编辑</el-button>
                                    <el-button type="danger" size="small" @click="handleExtraProjectDel(scope.$index, scope.row)">删除</el-button>
                                </template>
                            </el-table-column>
                    </el-table>
                   
                </el-tab-pane>
                <el-tab-pane label="其他套餐外信息" name="fourth">
                    <vxe-toolbar>
                    <template v-slot:buttons>
                        <!-- <vxe-input v-model="filterName" type="search" placeholder="试试全表搜索"></vxe-input> -->
                        <vxe-button @click="$refs.xTable.insert({name: Date.now()})">在第1行插入</vxe-button>
                        <vxe-button @click="$refs.xTable.removeSelecteds()">删除选中</vxe-button>
                        <vxe-button @click="saveExtraProjectList">保存</vxe-button>
                    </template>
                    </vxe-toolbar>
                    <vxe-table
                            border
                            resizable
                            fit
                            auto-resize
                            show-overflow
                            ref="xTable"
                            row-id="id"
                            :data.sync="tableData"
                            :edit-config="{trigger: 'click', mode: 'cell'}"
                            >
                            <vxe-table-column type="selection" width="60"></vxe-table-column>
                            <vxe-table-column type="index" width="60"></vxe-table-column>
                            <vxe-table-column field="Name" title="Name" :edit-render="{name: 'input'}"  ></vxe-table-column>
                            <vxe-table-column field="Cost" title="Cost" :edit-render="{name: 'input'}" ></vxe-table-column>
                          
                    </vxe-table>
                    <vxe-pager
                        :loading="loading"
                        :current-page="tablePage.currentPage"
                        :page-size="tablePage.pageSize"
                        :total="tablePage.totalResult"
                        :layouts="['PrevPage', 'JumpNumber', 'NextPage', 'FullJump', 'Sizes', 'Total']"
                        @page-change="handlePageChange">
                    </vxe-pager>
                </el-tab-pane>
               
            </el-tabs>
            <div slot="footer" class="dialog-footer">
                    <el-button @click.native="addFormVisible = false">取消</el-button>
                    <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
            </div>
           
        </el-dialog>
    </section>
</template>
<script>
    import util from '../../../util/date'
    import {testapi, getPartyAdvisoryInfoListPage , removePartyAdvisoryInfo, editPartyAdvisoryInfo, addPartyAdvisoryInfo} from '../../api/api';
    debugger
    export default {
        data() {
            return {
                tableData: [
                      {Name:"zhangsan",Cost:1},
                       {Name:"zhangsan",Cost:2}
                      ],
                tablePage: {
                currentPage: 1,
                pageSize: 10,
                totalResult: 0
                },
                filters: {
                    name: ''
                },
                activeName: 'first',
                advisory: [],
                //额外项目信息
                extraProjectInfos:[],
                total: 0,
                page: 1,
                listLoading: false,
                sels: [],//列表选中列
                //顾客基本信息
                customInfo:{
                    CustomId: 0,
                    advisoryId:0,
                    AdvisoryTime : '',
                    Name : '',
                    PhoneNumber : '',
                    Age : '',
                    ScheduledDate : ''
                },
                //派对主题字典
                topics:[],
                //自助套餐字典
                buffets:[],
                //派对预定信息
                bookInfo:{
                    ActualNumber:'',
                    TopicName:'',
                    TopicColor:'',
                    Price:'',
                    BuffetCost:'',
                    FoodCost:'',
                    TotalCost:''
                },
                editExtraProjectFormVisible:false,
                addExtraProjectFormVisible:false,
                addDialogFormVisible: false,
                editFormVisible: false,//编辑界面是否显示
                editLoading: false,
                editFormRules: {
                    Name: [
                        {required: true, message: '请输入姓名', trigger: 'blur'}
                    ],
                    AdvisoryTime: [
                        {required: true, message: '请输入咨询日期', trigger: 'blur'}
                    ],
                    PhoneNumber: [
                        {required: true, message: '请输入联系方式', trigger: 'blur'}
                    ]
                },
                //编辑界面数据
                editForm: {
                    CustomId: 0,
                    advisoryId:0,
                    AdvisoryTime : '',
                    Name : '',
                    PhoneNumber : '',
                    Age : '',
                    ScheduledDate : '',
                    PredictNumber : '',
                    Source : '',
                    Deposit : 0,
                    DepositTime : '',
                    FirstInfo : '',
                    SecondInfo : '',
                    ThirdInfo : '',
                    Remark : ''
                },

                addFormVisible: false,//新增界面是否显示
                addLoading: false,
                addFormRules: {
                     Name: [
                        {required: true, message: '请输入姓名', trigger: 'blur'}
                    ],
                    AdvisoryTime: [
                        {required: true, message: '请输入咨询日期', trigger: 'blur'}
                    ],
                    PhoneNumber: [
                        {required: true, message: '请输入联系方式', trigger: 'blur'}
                    ]
                },
                //新增界面数据
                addForm: {
                    Id: 0,
                    AdvisoryTime : '',
                    Name : '',
                    PhoneNumber : '',
                    Age : '',
                    ScheduledDate : '',
                    PredictNumber : '',
                    Source : '',
                    Deposit : 0,
                    DepositTime : '',
                    FirstInfo : '',
                    SecondInfo : '',
                    ThirdInfo : '',
                    Remark : ''
                },
                editExtraProjectFormRules:{
                     Name: [
                        {required: true, message: '请输入项目名称', trigger: 'blur'}
                    ],
                    Cose: [
                        {required: true, message: '请输入费用', trigger: 'blur'}
                    ],
                    
                },
                editExtraProjectForm:{
                    Name:'',
                    Cost:0
                },
                addExtraProjectFormRules:{
                     Name: [
                        {required: true, message: '请输入项目名称', trigger: 'blur'}
                    ],
                    Cose: [
                        {required: true, message: '请输入费用', trigger: 'blur'}
                    ],
                    
                },
                addExtraProjectForm:{
                    Name:'',
                    Cost:0
                }

            }
        },
        methods: {
            handlePageChange ({ currentPage, pageSize }) {
              this.tablePage.currentPage = currentPage
              this.tablePage.pageSize = pageSize
              this.findList()
            },
            saveExtraProjectList:function(){
               
                console.log('保存信息',this.$refs.xTable.getRecordset());
            },
            handleSwitchTab(tab, event) {
                console.log(tab, event);
            },
            //格式化日期
            formatDate: function (row, column) {
                return (!row.birth || row.birth == '') ? '' : util.formatDate.format(new Date(row.birth), 'yyyy-MM-dd');
            },
            handleCurrentChange(val) {
                this.page = val;
                this.getAdvisory();
            },
            //获取用户列表
            getAdvisory() {
                 debugger
                let para = {
                    page: this.page,
                    key: this.filters.name
                };
                this.listLoading = true;

                testapi();
                //NProgress.start();
                getPartyAdvisoryInfoListPage(para).then((res) => {

                    this.total = res.data.response.dataCount;
                    this.advisory = res.data.response.data;
                    this.listLoading = false;
                    //NProgress.done();
                });
            },
            //编辑额外项目信息
            handleExtraProjectEdit:function(index,row){

            },
            //删除额外项目信息
            handleExtraProjectDel:function(index,row){

            },
            //删除
            handleDel: function (index, row) {
                this.$confirm('确认删除该记录吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.listLoading = true;
                    //NProgress.start();
                    let para = {id: row.AdvisoryId};
                    removePartyAdvisoryInfo(para).then((res) => {

                        if (util.isEmt.format(res)) {
                            this.listLoading = false;
                            return;
                        }
                        this.listLoading = false;
                        //NProgress.done();
                        if (res.data.success) {
                            this.$message({
                                message: '删除成功',
                                type: 'success'
                            });

                        } else {
                            this.$message({
                                message: res.data.msg,
                                type: 'error'
                            });
                        }

                        this.getAdvisory();
                    });
                }).catch(() => {

                });
            },
            //显示编辑界面
            handleEdit: function (index, row) {
                this.editFormVisible = true;
                //把当前行的数据给编辑页面
                this.editForm = Object.assign({}, row);

                // getRoleListPage().then((res) => {
                //     this.roles = res.data.response.data;
                // });

            },
            //显示新增界面
            handleAdd() {
                this.addFormVisible = true;
                this.addForm = {
                    Id: 0,
                    AdvisoryTime : '',
                    Name : '',
                    PhoneNumber : '',
                    Age : '',
                    ScheduledDate : '',
                    PredictNumber : '',
                    Source : '',
                    Deposit : 0,
                    DepositTime : '',
                    FirstInfo : '',
                    SecondInfo : '',
                    ThirdInfo : '',
                    Remark : ''
                };
            },
            //编辑
            editSubmit: function () {
                //$refs  一个对象，持有注册过ref属性的所有DOM元素和组件实例
                this.$refs.editForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            this.editLoading = true;
                            //NProgress.start();
                            let para = Object.assign({}, this.editForm);
                            //这个格式化日期还没看出来原因，先放着
                            //para.birth = (!para.birth || para.birth == '') ? util.formatDate.format(new Date(), 'yyyy-MM-dd') : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');

                            editPartyAdvisoryInfo(para).then((res) => {

                                if (util.isEmt.format(res)) {
                                    this.editLoading = false;
                                    return;
                                }
                                if (res.data.success) {
                                    this.editLoading = false;
                                    //NProgress.done();
                                    this.$message({
                                        message: res.data.msg,
                                        type: 'success'
                                    });
                                    //清空editform的数据
                                    this.$refs['editForm'].resetFields();
                                    this.editFormVisible = false;
                                    this.getAdvisory();
                                } else {
                                    this.$message({
                                        message: res.data.msg,
                                        type: 'error'
                                    });

                                }
                            });
                        });
                    }
                });
            },
            //新增
            addSubmit: function () {
                this.$refs.addForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            this.addLoading = true;
                            //NProgress.start();
                            let para = Object.assign({}, this.addForm);
                            //para.birth = (!para.birth || para.birth == '') ? util.formatDate.format(new Date(), 'yyyy-MM-dd') : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
                            addPartyAdvisoryInfo(para).then((res) => {

                                if (util.isEmt.format(res)) {
                                    this.addLoading = false;
                                    return;
                                }

                                if (res.data.success) {
                                    this.addLoading = false;
                                    //NProgress.done();
                                    this.$message({
                                        message: res.data.msg,
                                        type: 'success'
                                    });
                                    this.$refs['addForm'].resetFields();
                                    this.addFormVisible = false;
                                    this.getAdvisory();
                                }
                                else {
                                    this.$message({
                                        message: res.data.msg,
                                        type: 'error'
                                    });

                                }

                            });

                        });
                    }
                });
            },
            selsChange: function (sels) {
                this.sels = sels;
            },
            //导出Excel
            handleExport:function(){
                alert("导出Excel");
            },
            //上传Excel
            handleImport:function(){
                alert("导入Excel");
            },      
            //批量删除
            batchRemove: function () {

                // return;

                var ids = this.sels.map(item => item.Id).toString();
                this.$confirm('确认删除选中记录吗？', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.listLoading = true;
                    //NProgress.start();
                    let para = {ids: ids};

                    batchRemoveUser(para).then((res) => {
                        this.listLoading = false;
                        //NProgress.done();
                        this.$message({
                            message: '该功能未开放',
                            type: 'warning'
                        });
                        console.log(res)
                    });
                }).catch(() => {

                });
            }
        },
        mounted() {
            this.getAdvisory();
        }
    }

</script>

<style scoped>

</style>
