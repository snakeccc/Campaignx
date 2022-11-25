// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.4.17;

contract FactoryCampaigns{
         address[] public depaloyed;

         function createCampaign(uint minimum) public{
               address newCampaign = new Compaign(minimum,msg.sender);
               depaloyed.push(newCampaign);
         }

         function getdeployCampaign() public view returns(address[]){
                return depaloyed;
         }

}








contract Compaign{
    
    struct Request{ 
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;

    }

    Request[] public Requests;
    address public  Manager;
    mapping(address => bool) public Approvers;
    uint miniContribution;
    uint public ContributedNumber;



   function Compaign(uint message,address createManager) public {
      // Manager = msg.sender;
      Manager = createManager;
       miniContribution = message;
       
    }



    modifier IsManager(){
        require( Manager == msg.sender);
        _;
    }


    function Contribute()public payable{

        require(msg.value >= miniContribution);
         
        //msg.sender.transfer(value);
         Approvers[msg.sender] = true;
         ContributedNumber++;

    }

    
   function createRequest(
        string description,
        uint256 value,
        address recipient
    ) public IsManager {
        Request memory newRequest = Request({
            description: description,
            value: value,
            recipient: recipient,
            complete: false,
            approvalCount: 0
        });

           Requests.push(newRequest);

    }

    function approvalRequest(uint256 index) public {

        Request storage request = Requests[index];
        require(Approvers[msg.sender]);
        require(!request.approvals[msg.sender]);

        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }

    function finalizeRequest(uint256 index) public IsManager
    {
        Request storage request = Requests[index];
        require(!request.complete);
        require(request.approvalCount >= (ContributedNumber/2));
        request.recipient.transfer(request.value);
        Requests[index].complete = true;

    }




}