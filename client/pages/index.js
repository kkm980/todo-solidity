import WrongNetworkMessage from '../components/WrongNetworkMessage'
import ConnectWalletButton from '../components/ConnectWalletButton'
import TodoList from '../components/TodoList'
import {todos_contract_address} from '../config.js'
import TodosAbi from '../../smart_contract/build/contracts/TodosContract.json'
import {ethers} from 'ethers'
import {useState} from 'react'

/* 
const tasks = [
  { id: 0, taskText: 'clean', isDeleted: false }, 
  { id: 1, taskText: 'food', isDeleted: false }, 
  { id: 2, taskText: 'water', isDeleted: true }
]
*/

export default function Home() {
    const [correctNetwork, setCorrectNetwork]=useState(false);
    const [isUserLoggedIn, setIsUserLoggedIn]=useState(false);
  const [currentAccount, setCurrentAccount]=useState('');
  const[todo, setTodo]=useState('');
  const [todos, setTodos]=useState([]);
  // Calls Metamask to connect wallet on clicking Connect Wallet button
  const connectWallet = async () => {
     try{
       const {ethereum} =window;
       if(!ethereum){
        console.log('Metamask not detected!');
       }
       let chainId = await ethereum.request({method:'eth_chainId'});
       console.log('connected to chain:', chainId);
       const rinkebyChainId='0x4';
       if(chainId !==rinkebyChainId){
         alert('use Rinkeby testnet to connect');
         setCorrectNetwork(false);
         return;
       }else{
        setCorrectNetwork(true);
       }
       const accounts=await ethereum.request({method:'eth_requestAccounts'});
       console.log('Found account', accounts[0]);
       setIsUserLoggedIn(true);
       setCurrentAccount(accounts[0])
     } catch(err){
       console.log(err);
     }
  }

  // Just gets all the tasks from the contract
  const getAllTasks = async () => {

  }

  // Add tasks from front-end onto the blockchain
  const addTask = async e => {
      e.preventDefault();
    let todo={
       TodoText:input,
       isDeleted: false
    }
    try{
      const {ethereum}=window;
      if(ethereum){
        const provider=new ethers.providers.Web3Provider(ethereum);
        const signer=provider.getSigner();
        const TaskContract=new ethers.Contract(
          TaskContractAddress, Task.abi, signer
        )
        TaskContract.addTask(task.taskText, task.isDeleted).then(res=>{
          setTodos([...todos, task])
        })
        .catch(err=>{
          console.log(err);
        })
      }else{
        console.log('ethereum object doesnot exist')
      }
    }catch(e){
      console.log(e);
    }
  }

  // Remove tasks from front-end by filtering it out on our "back-end" / blockchain smart contract
  const deleteTask = key => async () => {

  }

  return (
    <div className='bg-[#97b5fe] h-screen w-screen flex justify-center py-6'>
      {'is user not logged in?' ? <ConnectWalletButton connectWallet={connectWallet}/> :
        'is this the correct network?' ? <TodoList /> : <WrongNetworkMessage />}
    </div>
  )
}

