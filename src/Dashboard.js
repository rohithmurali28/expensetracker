import React, { Component } from 'react';
import './App.css';
import {DrawerTitle, Main,Heading, Recent,Row,Type, RightPanel,Header, TemplateOuter, TemplateInner, TypesWrapper,Username, Remove, TypeName } from './Styles';
import FontAwesome from 'react-fontawesome';
import {Modal, Button, List, Drawer, Icon, message, Input} from 'antd';
import { StorageKeys } from './Constants';
import moment from 'moment';
import { Redirect } from 'react-router-dom';
export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible:false,
      expense:0,
      drawerVisible:false,
      expenseType:"",
      custom:false,
    }
  }
  handleOk = (e) => {

    let expenseHistory = JSON.parse(localStorage.getItem(StorageKeys.EXPENSES));
    let id=Math.floor((Math.random() * 10000) + 1);
    let time = moment().format();
    console.log(time);
    let obj = {
      id:id,
      type:this.state.type?this.state.type:this.state.expenseType,
      value:this.state.expense,
      time:time,
    }
    
    if(expenseHistory)
      expenseHistory.push(obj);
    else
      expenseHistory = [obj];
      localStorage.setItem(StorageKeys.EXPENSES,JSON.stringify(expenseHistory));
      message.success('Expense Saved');
      this.setState({visible: false, expenseType:"", expense:0, type:"", custom:false});
  }

  handleCancel = (e) => {
    this.setState({ visible: false, expense:0, type:"", custom:false });
  }
  handleChange = (ev) =>{
    let inputValue = ev.target.value;
    this.setState({expense:inputValue})
  }
  removeEntry = (index) =>{
    let expenses = localStorage.getItem(StorageKeys.EXPENSES);
    if(expenses){
      expenses = JSON.parse(expenses);
      expenses.splice(index,1);
      localStorage.setItem(StorageKeys.EXPENSES,JSON.stringify(expenses));
      message.error('Expense Deleted');
      this.forceUpdate();
    }
  }
  
  onClose = () =>this.setState({drawerVisible:false, expense:0})
  render() {
    let expenseNameArray=["Custom","Medical","Shopping","Educational","Food","Furniture","Electrical","Cosmetic","Tax","Fuel","Maintenance"];
    let expenseIcons = ["inr","heartbeat","cart-plus","bookmark","coffee","bed","anchor","female","envelope","taxi","home"]
    
    let template=[];
    for(let i=0;i<10;i++)
      template.push(this.ExpenseTemplate(expenseNameArray[i],expenseIcons[i]))
    let credentials = JSON.parse(localStorage.getItem(StorageKeys.CREDENTIALS)) 
    if(credentials===null)
      return <Redirect to="/"/>
    let username = credentials.username;
    let modalTitle = this.state.custom?"":this.state.expenseType;
    return (
      <Main>
        <Header>
          <Icon style={{marginLeft:20}} type={"menu-unfold"} 
            onClick={()=>this.setState({drawerVisible:true})}/>
          <Heading>
            Expense Tracker
          </Heading>
          <Username>
            {username}
          </Username>
        </Header>
        <Drawer
          title={<DrawerTitle>Transaction History<Icon type="menu-fold" onClick={()=>this.setState({drawerVisible:false})}/></DrawerTitle>}
          closable={false}
          placement="left"
          onClose={this.onClose}
          visible={this.state.drawerVisible}
          width={350}
        >
          <this.TotalExpense/>
          <Recent>
            Previous Transactions
          </Recent>
          <this.RecentExpenses/>
          
        </Drawer>
        <RightPanel>
          <TypesWrapper>
            {template}
          </TypesWrapper>
        </RightPanel>
        <Modal
          title={"Add "+modalTitle+" Expense"}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>Cancel</Button>,
            <Button key="submit" type="primary" onClick={this.handleOk}>
              Save
            </Button>
          ]}
        >
          <Row><TypeName>Current Expense</TypeName> <input type="number" style={{width:"50%"}} onChange = {this.handleChange} value={this.state.expense} autoFocus/></Row>
          {this.state.custom===true?
            <Row><TypeName>Expense Type</TypeName> <Input style={{width:"50%"}} value={this.state.expenseType} onChange={(ev)=>this.setState({expenseType:ev.target.value})}/></Row>:
            ""
          }
        </Modal>
      </Main>
    );
  }
  ExpenseTemplate = (expenseName, singleExpenseIcon) => {

    return (
      <TemplateOuter key={expenseName} 
        onClick={()=>this.setState({expenseType:expenseName==="Custom"?"":expenseName, custom:expenseName==="Custom"?true:false, visible:true})}>
        <TemplateInner>
          <FontAwesome style={{color:expenseName==="Custom"?"blue":"#a74826"}} size="3x" name={singleExpenseIcon}/>
        </TemplateInner>
        {expenseName}
      </TemplateOuter>
    );
  }
  TotalExpense = () =>{
    let expenses = localStorage.getItem(StorageKeys.EXPENSES);
    if(expenses){
      expenses = JSON.parse(expenses); 
      let startOfDay = moment().startOf('day').fromNow();
      let startOfWeek = moment().startOf('week').fromNow();
      let startOfMonth = moment().startOf('month').fromNow();
      let startOfYear = moment().startOf('year').fromNow();
      let dailyExpense = expenses.reduce((total, obj)=>{
        if(obj.time<startOfDay)
          return total+parseInt(obj.value);
      },0);
      let weeklyExpense = expenses.reduce((total, obj)=>{
        if(obj.time<startOfWeek)
          return total+parseInt(obj.value);
      },0);
      let monthlyExpense = expenses.reduce((total, obj)=>{
        if(obj.time<startOfMonth)
          return total+parseInt(obj.value);
      },0);
      let yearlyExpense = expenses.reduce((total, obj)=>{
        if(obj.time<startOfYear)
          return total+parseInt(obj.value);
      },0);
      return (
        <div>
          Today's expense {dailyExpense}<br/>
          Week's expense {weeklyExpense}<br/>
          Month's expense {monthlyExpense}<br/>
          Yearly's expense {yearlyExpense}
        </div>
      );
    }
    else return "";
  }
  RecentExpenses = () =>{
    let expenses = localStorage.getItem(StorageKeys.EXPENSES);
    if(expenses)
      expenses = JSON.parse(expenses);
    else expenses = [];
    return (
      <List
        bordered
        dataSource={expenses}
        renderItem={(item,index) => (<List.Item key={index}><Row><Type>{item.type}</Type>₹{item.value}
          <Remove type="close" onClick={()=>this.removeEntry(index)}/></Row></List.Item>)}
      />
    )
  }
}



