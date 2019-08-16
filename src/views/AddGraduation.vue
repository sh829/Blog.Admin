<template>
    <section style="margin-top:30px">
        <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
                <el-form-item label="姓名" prop="Name" label-width="100px">
                    <el-input v-model="addForm.Name" auto-complete="off" style=""></el-input>
                </el-form-item>
                <el-form-item label="性别" label-width="100px" prop="Sex">
                    <el-radio-group v-model="addForm.Sex">
                        <el-radio class="radio" :label="1">男</el-radio>
                        <el-radio class="radio" :label="0">女</el-radio>
                    </el-radio-group>
                </el-form-item>
                 <el-form-item label="出生年月" label-width="100px" prop="Birthday">
                    <el-date-picker type="month" placeholder="选择日期" v-model="addForm.Birthday"></el-date-picker>
                </el-form-item>
                <el-form-item label="入学年份" prop="StartYear" label-width="100px">
                    <el-input v-model="addForm.StartYear" ></el-input>
                </el-form-item>
                
                <el-form-item label="专业班级" prop="Class" label-width="100px" >
                   <el-select v-model="addForm.Class" placeholder="请选择" prop="Class">
                    <el-option
                    v-for="item in classOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                </el-form-item>
                <el-form-item label="辅导员" label-width="100px">
                    <el-input v-model="addForm.Teacher" :min="0" :max="200"></el-input>
                </el-form-item>
               
                <el-form-item label="籍贯" label-width="100px" prop="Birthplace">
                    <el-input  v-model="addForm.Birthplace"></el-input>
                </el-form-item>
                 <el-form-item label="目前所在城市" label-width="100px" prop="CurrentCity">
                    <el-input  v-model="addForm.CurrentCity"></el-input>
                </el-form-item>
                 <el-form-item label="工作单位名称" label-width="100px" prop="CompanyName">
                    <el-input  v-model="addForm.CompanyName"></el-input>
                </el-form-item>
                 <el-form-item label="职务/职称" label-width="100px" prop="Position">
                    <el-input  v-model="addForm.Position" label-width="100px"></el-input>
                </el-form-item>
                 <el-form-item label="业务范围" label-width="100px" prop="BusinessScope">
                    <el-input  v-model="addForm.BusinessScope"></el-input>
                </el-form-item>
                 <el-form-item label="手机号码" label-width="100px" prop="PhoneNumber">
                    <el-input v-model="addForm.PhoneNumber"></el-input>
                </el-form-item>
                <el-form-item label="电子邮箱" label-width="100px" prop="Email">
                    <el-input  v-model="addForm.Email"></el-input>
                </el-form-item>
                <el-form-item label="是否参加110周年校庆" label-width="170px" prop="IsCelebration">
                   <el-radio-group v-model="addForm.IsCelebration">
                        <el-radio class="radio" :label="1">参加</el-radio>
                        <el-radio class="radio" :label="0">不参加</el-radio>
                    </el-radio-group>
                </el-form-item>
        </el-form>
            <div slot="footer" class="dialog-footer" style="text-align:center;margin:auto">
                <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
            </div>
    </section>
</template>

<script>
    import { MessageBox } from 'mint-ui';
    import {testapi, getGraduationListPage,removeGraduation , addGraduation, editGraduation} from '../api/api';
    export default {
          data() {
              return{
                  addForm:{
                    Name:'',
                    Sex:1,
                    Birthday:'',
                    Class:'',
                    Birthplace:'',
                    CompanyName:'',
                    Position:'',
                    BusinessScope:'',
                    PhoneNumber:'',
                    Email:'',
                    IsCelebration:'',  
                    Teacher:"刘鹏杰",
                    StartYear:2012
                  },
                  addLoading:false,
                  addFormRules: {
                        Name: [
                            {required: true, message: '请输入姓名', trigger: 'blur'}
                        ],
                        Sex: [
                            {required: true, message: '请选择性别', trigger: 'blur'}
                        ],
                        CurrentCity: [
                            {required: true, message: '请输入目前所在城市', trigger: 'blur'}
                        ],
                        Birthday: [
                            {required: true, message: '请选择出生年月', trigger: 'blur'}
                        ],
                        Class: [
                            {required: true, message: '请选择班级', trigger: 'blur'}
                        ],
                        Birthplace: [
                        {required: true, message: '请输入籍贯', trigger: 'blur'}
                        ],
                        CompanyName: [
                            {required: true, message: '请输入单位名称', trigger: 'blur'}
                        ],
                        Position: [
                            {required: true, message: '请输入职务/职称', trigger: 'blur'}
                        ],
                        BusinessScope: [
                            {required: true, message: '请输入业务范围', trigger: 'blur'}
                        ],
                        PhoneNumber: [
                            {required: true, message: '请输入电话号码', trigger: 'blur'}
                        ],
                        Email: [
                            {required: true, message: '请输入邮箱', trigger: 'blur'}
                        ],
                        IsCelebration: [
                            {required: true, message: '请选择是否参加110周年校庆', trigger: 'blur'}
                        ]
                    },
                  classOptions: [{
                        value: '1',
                        label: '安全1201'
                        }, {
                        value: '2',
                        label: '安全1202'
                        }, {
                        value: '3',
                        label: '安全1203'
                        }, {
                        value: '11',
                        label: '安全1204'
                        },{
                        value: '4',
                        label: '安全卓越'
                        },
			{
                        value: '5',
                        label: '安全工业',
			},
                        {value: '6',
                        label: '消防1201'
                        }, 
			{
                        value: '7',
                        label: '消防1202'
                        }, {
                        value: '8',
                        label: '安全连读'
                        }, {
                        value: '9',
                        label: '安全单招1201'
                        }, {
                        value: '10',
                        label: '安全单招1202'
                    }],
              }
          },
          methods:{
            addSubmit:function(){
                this.$refs.addForm.validate((valid)=>{
                    if(valid){
                        MessageBox.confirm('确认提交吗？?').then(action => {
                            this.addLoading = true;
                             let para = Object.assign({}, this.addForm);
                             addGraduation(para).then((res)=>{
                                 
                                if (res.data.success) {
                                    this.addLoading = false;
                                    //NProgress.done();
                                    this.$message({
                                        message: res.data.msg,
                                        type: 'success'
                                    });
                                    this.$refs['addForm'].resetFields();
                                }
                                else {
                                    this.$message({
                                        message: res.data.msg,
                                        type: 'error'
                                    });

                                }
                             })        
                        });
                        // this.$confirm('确认提交吗？', '提示', {}).then(() => {
                        //     debugger
                        //     this.addLoading = true;
                        //      let para = Object.assign({}, this.addForm);
                        //      addGraduation(para).then((res)=>{
                                 
                        //         if (res.data.success) {
                        //             this.addLoading = false;
                        //             //NProgress.done();
                        //             this.$message({
                        //                 message: res.data.msg,
                        //                 type: 'success'
                        //             });
                        //             this.$refs['addForm'].resetFields();
                        //         }
                        //         else {
                        //             this.$message({
                        //                 message: res.data.msg,
                        //                 type: 'error'
                        //             });

                        //         }
                        //      })
                        // })
                    }else{

                    }
                })
            }
          }
    }
</script>

