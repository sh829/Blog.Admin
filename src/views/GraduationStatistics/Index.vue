<template>
    <section>
          <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
             <!-- 当一个 form 元素中只有一个输入框时，在该输入框中按下回车应提交该表单。
        如果希望阻止这一默认行为，可以在 <el-form> 标签上添加 @submit.native.prevent -->
            <el-form :inline="true" :model="filters" @submit.native.prevent>
                <el-form-item>
                    <el-input v-model="filters.Name" placeholder="姓名"></el-input>
                </el-form-item>
                 <el-form-item label="专业班级" prop="Class"  label-width="100px" >
                   <el-select v-model="filters.Class" clearable="" placeholder="请选择" prop="Class">
                    <el-option
                    v-for="item in classOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                </el-form-item>
                <el-form-item>
                <el-input v-model="filters.CurrentCity" placeholder="当前城市"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="getGraduations">查询</el-button>
                </el-form-item>
                <!-- <el-form-item>
                    <el-button type="primary" @click="handleAdd">新增</el-button>
                </el-form-item> -->
                 <el-form-item>
                    <el-upload
                        class="upload"
                        action="http://localhost:8081/api/GraduationStatistics/Import"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :before-remove="beforeRemove"
                        multiple
                        :limit="3"
                        :on-exceed="handleExceed"
                        :file-list="fileList">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <span slot="tip" class="el-upload__tip">只能上传excel文件</span>
                    </el-upload>
                  </el-form-item>
            </el-form>
        </el-col>
         <!--列表-->
        <el-table :data="Graduations" highlight-current-row v-loading="listLoading" @selection-change="selsChange"
                  style="width: 100%;">
            <el-table-column type="selection" width="50">
            </el-table-column>
            <el-table-column type="index" width="80">
            </el-table-column>
            <el-table-column prop="Name" label="姓名" width="" sortable>
            </el-table-column>
            <el-table-column prop="Sex" label="性别" width="" :formatter="formatSex" sortable>
            </el-table-column>
            <el-table-column prop="Birthday" label="出生年月" width="" :formatter="formatBirth" sortable>
            </el-table-column>
           <el-table-column prop="StartYear" label="入学年份" width="" sortable>
            </el-table-column>
            <el-table-column prop="ClassName" label="所在班级" width="" sortable>
            </el-table-column>
            <el-table-column prop="Teacher" label="辅导员" width="" sortable>
            </el-table-column>
            <el-table-column prop="Birthplace" label="籍贯" width="" sortable>
            </el-table-column>
            <el-table-column prop="CurrentCity" label="当前所在城市" width="" sortable>
            </el-table-column>
            <el-table-column prop="CompanyName" label="单位名称" width="" sortable>
            </el-table-column>
            <el-table-column prop="Position" label="职务/职称" width="" sortable>
            </el-table-column>
            <el-table-column prop="BusinessScope" label="业务范围" width="" sortable>
            </el-table-column>
            <el-table-column prop="PhoneNumber" label="电话" width="" sortable>
            </el-table-column>
            <el-table-column prop="Email" label="邮箱" width="" sortable>
            </el-table-column>
               <el-table-column prop="IsCelebration" label="是否参加校庆" width="" :formatter="formatCelebration" sortable>
            </el-table-column>
           
            <!-- <el-table-column label="操作" width="150">
                <template scope="scope">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column> -->
        </el-table>
        <!--工具条-->
        <el-col :span="24" class="toolbar">
            <el-pagination layout="total,prev, pager, next" @current-change="handleCurrentChange" :page-size="50"
                           :total="total" style="float:right;">
            </el-pagination>
        </el-col>

    </section>
</template>
<script>
  import util from '../../../util/date'
    import {testapi, getGraduationListPage,removeGraduation , addGraduation, editGraduation} from '../../api/api';
    export default {
        data(){
            return{
                fileList:[],
                listLoading:false,
                Graduations:[],
                sels: [],//列表选中列
                total: 0,
                page: 1,
                filters: {
                    name: '',
                    CurrentCity:'',
                    Class:''
                },
                classOptions: [
                        {
                        value: '1',
                        label: '安全1201'
                        }, 
                        {
                        value: '2',
                        label: '安全1202'
                        }, 
                        {
                        value: '3',
                        label: '安全1203'
                        }, 
                        {
                        value: '11',
                        label: '安全1204'
                        },
                        {
                        value: '4',
                        label: '安全卓越'
                        }, 
                        {
                        value: '5',
                        label: '安全工业'
                        },
                        {
                         value: '6',
                        label: '消防1201'
                        }, 
                        {
                        value: '7',
                        label: '消防1202'
                        }, 
                        {
                        value: '8',
                        label: '安全连读'
                        }, 
                        {
                        value: '9',
                        label: '安全单招1201'
                        }, 
                        {
                        value: '10',
                        label: '安全单招1202'
                    }],

            }
        },
        methods:{
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            beforeRemove(file, fileList) {
                return this.$confirm(`确定移除 ${ file.name }？`);
            },
            handleCurrentChange(val) {
                this.page = val;
                this.getGraduations();
            },
            formatSex: function (row, column) {
                return row.Sex == 1 ? '男' : row.Sex == 0 ? '女' : '未知';
            },
            formatBirth: function (row, column) {
                return (!row.Birthday || row.Birthday == '') ? '' : util.formatDate.format(new Date(row.Birthday), 'yyyy-MM');
            },
            formatCelebration:function(row,column){
                 return row.IsCelebration==true ? '参加' : row.IsCelebration==false  ? '不参加' : '未知';
            },
              //获取用户列表
            getGraduations() {
                let para = {
                    page: this.page,
                    Name: this.filters.Name,
                    Class:this.filters.Class,
                    CurrentCity:this.filters.CurrentCity
                };
                this.listLoading = true;

                testapi();
                //NProgress.start();
                getGraduationListPage(para).then((res) => {
                    debugger
                    this.total = res.data.response.dataCount;
                    this.Graduations = res.data.response.data;
                    this.listLoading = false;
                    //NProgress.done();
                });
            },
            selsChange: function (sels) {
                this.sels = sels;
            },
             //删除
            handleDel: function (index, row) {
                this.$confirm('确认删除该记录吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.listLoading = true;
                    //NProgress.start();
                    let para = {id: row.Id};
                    removeGraduation(para).then((res) => {

                       
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

                        this.getGraduations();
                    });
                }).catch(() => {

                });
            },
        },
        mounted() {
            this.getGraduations();
        }
    }
</script>

