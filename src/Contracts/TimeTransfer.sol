// // SPDX-License-Identifier: GPL-3.0

// pragma solidity >=0.7.0 <0.9.0;

// contract TimeDeposit {
//     address public payable  owner;
//     struct Transaction {
//             uint256 amount;
//             uint256 timestamp;
//         }
//     // Mapping cho biết tổng tiền đã gửi
//     mapping(address => uint256) public deposits; 
//     // Mapping cho struct Transaction, cho biết chi tiết một lần giao dịch
//     mapping(address => Transaction[]) public transactions;
    
 
//     // Send to SM addr
//     function deposit(address _addr, uint256 amount ) public payable {
//         transactions[_addr].push(Transaction(amount, block.timestamp));
//         deposits[_addr] += amount;
        
//     }

//     // User withdraw
//     function withdraw(address _addr ,uint256 amount) public {
//         require(deposits[_addr] >= amount, "Not enough tokens");
//         require(transactions[_addr].length > 0, "No transactions found");

//         Transaction storage lastTransaction = transactions[_addr][transactions[_addr].length - 1];

//         // Phần trăm lãi suất
//         uint256 interestPercentage;

//         if (block.timestamp >= lastTransaction.timestamp && block.timestamp <= lastTransaction.timestamp + 10 seconds) {
//             interestPercentage = 80;
//         } else if (block.timestamp > lastTransaction.timestamp + 10 seconds && block.timestamp <= lastTransaction.timestamp + 20 seconds) {
//             interestPercentage = 90;
//         } else {
//             interestPercentage = 100; // Không lãi suất
//         }

//         uint256 interestAmount = (amount * interestPercentage) / 100; // Send back số tiền cần rút
//         uint256 penaltyAmount = amount - interestAmount; // Số tiền phạt 

//         deposits[_addr] -= amount; // Trừ tiền ra khỏi tài khoản người rút

//         payable(_addr).transfer(interestAmount); // Chuyển số tiền lãi suất về người rút
//         payable(owner).transfer(penaltyAmount); // Chuyển số tiền phạt về tài khoản chủ
//     }

//     function getBalance(address _add) public view returns (uint256) {
//         return deposits[_add];
//     }

// }
